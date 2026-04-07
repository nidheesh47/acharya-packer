import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router";
import { calculateItemTotals, getSkuDetails, formatDate } from "../utils/utils";

const API_BASE = import.meta.env.VITE_APP_URL;

export function useManualOrder() {
  const navigate = useNavigate();

  const [skus, setSkus] = useState([]);
  const [filteredSkus, setFilteredSkus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [skuFilter, setSkuFilter] = useState("all");
  const [orderError, setOrderError] = useState("");
  const [orderSuccess, setOrderSuccess] = useState("");
  const [showSkuPreview, setShowSkuPreview] = useState(false);
  const [skuStats, setSkuStats] = useState(null);
  const [activeTab, setActiveTab] = useState("order");

  const [order, setOrder] = useState({
    order_name: "",
    email: "",
    phone: "",
    tracking_company: "",
    tracking_number: "",
    tracking_url: "",
    fulfillment_status: "manual",
    notes: "",
    priority: "normal",
  });

  const [items, setItems] = useState([
    { sku: "", quantity: 1, skuDetails: null, customSku: false },
  ]);

  const fetchSkus = useCallback(async (token) => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/sku/list`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to fetch SKUs");

      const data = await res.json();
      const skusData = data.skus || [];
      setSkus(skusData);
      setFilteredSkus(skusData);
      calculateSkuStats(skusData);
    } catch (error) {
      console.error("Error loading SKUs:", error);
      setOrderError("Failed to load product catalog");
    } finally {
      setLoading(false);
    }
  }, []);

  const calculateSkuStats = (skuList) => {
    const totalSkus = skuList.length;
    const skusWithImages = skuList.filter((s) => s.image_url).length;
    const skusWithoutImages = totalSkus - skusWithImages;

    setSkuStats({
      total: totalSkus,
      withImages: skusWithImages,
      withoutImages: skusWithoutImages,
      imagePercentage:
        totalSkus > 0 ? Math.round((skusWithImages / totalSkus) * 100) : 0,
    });
  };

  useEffect(() => {
    let filtered = skus;

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter(
        (sku) =>
          sku.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (sku.product_name?.toLowerCase() || "").includes(
            searchTerm.toLowerCase(),
          ),
      );
    }

    if (skuFilter === "with_images") {
      filtered = filtered.filter((sku) => sku.image_url);
    } else if (skuFilter === "no_images") {
      filtered = filtered.filter((sku) => !sku.image_url);
    } else if (skuFilter === "recent") {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      filtered = filtered.filter(
        (sku) => sku.createdAt && new Date(sku.createdAt) > thirtyDaysAgo,
      );
    }

    setFilteredSkus(filtered);
  }, [searchTerm, skus, skuFilter]);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const adminData = localStorage.getItem("admin");

    if (!token || !adminData) {
      navigate("/user/login");
      return;
    }

    const parsedAdmin = JSON.parse(adminData);
    if (!["admin", "logistics"].includes(parsedAdmin.role)) {
      navigate("/dashboard");
      return;
    }

    fetchSkus(token);
  }, [navigate, fetchSkus]);

  const addItem = () => {
    setItems([
      ...items,
      { sku: "", quantity: 1, skuDetails: null, customSku: false },
    ]);
  };

  const removeItem = (index) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const updateItem = (index, field, value) => {
    const copy = [...items];

    if (field === "sku") {
      const skuDetails = skus.find((s) => s.sku === value);
      copy[index] = {
        ...copy[index],
        sku: value,
        skuDetails: skuDetails || null,
        customSku: !skuDetails && value.trim() !== "",
      };
    } else {
      copy[index] = { ...copy[index], [field]: value };
    }

    setItems(copy);
  };

  const addProductFromCatalog = (skuCode) => {
    const existingItemIndex = items.findIndex((item) => item.sku === skuCode);

    if (existingItemIndex !== -1) {
      const updatedItems = [...items];
      const currentQuantity = updatedItems[existingItemIndex].quantity || 1;
      updatedItems[existingItemIndex].quantity = currentQuantity + 1;
      setItems(updatedItems);

      setOrderSuccess(`Added 1 more ${skuCode} to existing item`);
      setTimeout(() => setOrderSuccess(""), 2000);
    } else {
      const emptyItemIndex = items.findIndex((item) => !item.sku);

      if (emptyItemIndex !== -1) {
        const updatedItems = [...items];
        updatedItems[emptyItemIndex] = {
          sku: skuCode,
          quantity: 1,
          skuDetails: skus.find((s) => s.sku === skuCode) || null,
          customSku: false,
        };
        setItems(updatedItems);
      } else {
        setItems([
          ...items,
          {
            sku: skuCode,
            quantity: 1,
            skuDetails: skus.find((s) => s.sku === skuCode) || null,
            customSku: false,
          },
        ]);
      }

      setOrderSuccess(`Added ${skuCode} to order with quantity 1`);
      setTimeout(() => setOrderSuccess(""), 2000);
    }
  };

  const addCustomSku = (index) => {
    const copy = [...items];
    copy[index] = {
      ...copy[index],
      sku: "",
      skuDetails: null,
      customSku: true,
    };
    setItems(copy);
  };

  const selectFromCatalog = (index) => {
    const copy = [...items];
    copy[index] = {
      ...copy[index],
      sku: "",
      skuDetails: null,
      customSku: false,
    };
    setItems(copy);
  };

  const totals = calculateItemTotals(items);

  const validateForm = () => {
    setOrderError("");

    if (!order.order_name.trim()) {
      setOrderError("Order number is required");
      return false;
    }

    if (items.length === 0) {
      setOrderError("At least one line item is required");
      return false;
    }

    let hasValidItems = false;
    for (const item of items) {
      if (item.sku.trim() !== "" && item.quantity > 0) {
        hasValidItems = true;
        break;
      }
    }

    if (!hasValidItems) {
      setOrderError(
        "At least one valid line item with SKU and quantity is required",
      );
      return false;
    }

    for (const item of items) {
      if (
        item.sku.trim() !== "" &&
        (!item.quantity || Number(item.quantity) <= 0)
      ) {
        setOrderError(
          "Each line item must have a valid quantity (greater than 0)",
        );
        return false;
      }
    }

    const skusInOrder = items
      .filter((i) => i.sku.trim() !== "")
      .map((i) => i.sku);
    const uniqueSkus = new Set(skusInOrder);
    if (skusInOrder.length !== uniqueSkus.size) {
      setOrderError("Duplicate SKUs found in order items");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setSubmitting(true);
    setOrderError("");
    setOrderSuccess("");

    const token = localStorage.getItem("auth_token");
    if (!token) {
      navigate("/user/login");
      return;
    }

    const adminData = JSON.parse(localStorage.getItem("admin") || "{}");

    const formData = new FormData();

    Object.entries(order).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    const validItems = items.filter(
      (item) => item.sku.trim() !== "" && item.quantity > 0,
    );

    validItems.forEach((item, i) => {
      formData.append(`line_items[${i}][sku]`, item.sku.trim());
      formData.append(`line_items[${i}][quantity]`, item.quantity);
    });

    formData.append("created_by_admin_id", adminData.admin_id || "system");
    formData.append("created_by_role", adminData.role || "admin");
    formData.append("created_by_name", adminData.name || "Manual Entry");

    try {
      const res = await fetch(`${API_BASE}/api/order/add`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.error?.includes("already exists")) {
          setOrderError(
            `Order number "${order.order_name}" already exists. Please use a unique order number.`,
          );
        } else if (res.status === 409) {
          setOrderError(
            "This order number already exists. Please choose a different order number.",
          );
        } else {
          setOrderError(
            data.error || "Failed to create order. Please try again.",
          );
        }
        return;
      }

      setOrderSuccess(`✅ Order "${order.order_name}" created successfully!`);

      setTimeout(() => {
        setOrder({
          order_name: "",
          email: "",
          phone: "",
          tracking_company: "",
          tracking_number: "",
          tracking_url: "",
          fulfillment_status: "manual",
          notes: "",
          priority: "normal",
        });
        setItems([
          { sku: "", quantity: 1, skuDetails: null, customSku: false },
        ]);
        setOrderSuccess("");
        setOrderError("");
      }, 2000);
    } catch (error) {
      setOrderError("Network error: " + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const exportSkuList = () => {
    const csvContent = [
      ["SKU", "Product Name", "Image URL", "Created Date"],
      ...skus.map((sku) => [
        sku.sku,
        sku.product_name || "N/A",
        sku.image_url || "N/A",
        formatDate(sku.createdAt),
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `sku_catalog_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return {
    // State
    skus,
    filteredSkus,
    loading,
    submitting,
    searchTerm,
    setSearchTerm,
    skuFilter,
    setSkuFilter,
    orderError,
    setOrderError,
    orderSuccess,
    setOrderSuccess,
    showSkuPreview,
    setShowSkuPreview,
    skuStats,
    activeTab,
    setActiveTab,
    order,
    setOrder,
    items,
    setItems,
    totals,

    // Functions
    addItem,
    removeItem,
    updateItem,
    addProductFromCatalog,
    addCustomSku,
    selectFromCatalog,
    handleSubmit,
    exportSkuList,
    formatDate,
  };
}
