import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const APP_URL = import.meta.env.VITE_APP_URL;

export function useCreateSKU() {
  const navigate = useNavigate();

  // Form states
  const [sku, setSku] = useState("");
  const [productName, setProductName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [skuType, setSkuType] = useState("simple");
  const [bundleItems, setBundleItems] = useState([]);
  
  // UI states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [recentSkus, setRecentSkus] = useState([]);
  const [imageLoading, setImageLoading] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [autoCreateResult, setAutoCreateResult] = useState(null);
  
  // SKU list for bundle dropdown
  const [availableSkus, setAvailableSkus] = useState([]);
  const [loadingSkus, setLoadingSkus] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(null);
  const [showNewSkuForm, setShowNewSkuForm] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchSkus = async () => {
      const token = localStorage.getItem("auth_token");
      if (!token) return;

      setLoadingSkus(true);
      try {
        const response = await fetch(`${APP_URL}/api/sku/list`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (data.success) {
          const filteredSkus = data.skus.filter(s => 
            s.sku_type !== "bundle" && s.sku !== sku
          );
          setAvailableSkus(filteredSkus);
        }
      } catch (error) {
        console.error("Failed to fetch SKUs:", error);
      } finally {
        setLoadingSkus(false);
      }
    };

    if (skuType === "bundle") {
      fetchSkus();
    }
  }, [skuType, sku]);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const adminRaw = localStorage.getItem("admin");

    if (!token || !adminRaw) {
      navigate("/user/login", { replace: true });
      return;
    }
  }, [navigate]);

  useEffect(() => {
    if (imageUrl && isValidUrl(imageUrl)) {
      setImageLoading(true);
      setImageError(false);
      setPreviewUrl(imageUrl);
      const timer = setTimeout(() => {
        setImageLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setPreviewUrl("");
      setImageLoading(false);
    }
  }, [imageUrl]);

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const addBundleItem = () => {
    setBundleItems([...bundleItems, { 
      sku: "", 
      quantity: 1,
      product_name: "",
      image_url: "",
      is_new: false 
    }]);
  };

  const removeBundleItem = (index) => {
    setBundleItems(bundleItems.filter((_, i) => i !== index));
    if (showDropdown === index) {
      setShowDropdown(null);
    }
    if (showNewSkuForm === index) {
      setShowNewSkuForm(null);
    }
  };

  const updateBundleItem = (index, field, value) => {
    const updated = [...bundleItems];
    updated[index][field] = field === 'quantity' ? parseInt(value) || 1 : value;
    setBundleItems(updated);
  };

  const selectSkuFromList = (index, selectedSku) => {
    const updated = [...bundleItems];
    updated[index].sku = selectedSku.sku;
    updated[index].product_name = selectedSku.product_name;
    updated[index].image_url = selectedSku.image_url || "";
    updated[index].is_new = false;
    setBundleItems(updated);
    setShowDropdown(null);
    setShowNewSkuForm(null);
  };

  const toggleNewSkuForm = (index) => {
    setShowNewSkuForm(showNewSkuForm === index ? null : index);
    setShowDropdown(null);
  };

  const filteredAvailableSkus = availableSkus.filter(s => 
    s.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.product_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setAutoCreateResult(null);

    if (!sku.trim()) {
      setError("SKU code is required");
      return;
    }
    if (!productName.trim()) {
      setError("Product name is required");
      return;
    }
    if (!imageUrl.trim()) {
      setError("Image URL is required");
      return;
    }
    if (!isValidUrl(imageUrl)) {
      setError("Please enter a valid image URL");
      return;
    }

    if (skuType === "bundle") {
      if (bundleItems.length === 0) {
        setError("Bundle must contain at least one item");
        return;
      }

      const invalidItems = bundleItems.filter(item => !item.sku.trim());
      if (invalidItems.length > 0) {
        setError("All bundle items must have a SKU");
        return;
      }

      const skus = bundleItems.map(item => item.sku);
      if (new Set(skus).size !== skus.length) {
        setError("Duplicate SKUs are not allowed in a bundle");
        return;
      }
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("auth_token");

      const payload = {
        sku: sku.trim(),
        product_name: productName.trim(),
        image_url: imageUrl.trim(),
        sku_type: skuType,
        ...(skuType === "bundle" && {
          bundle_items: bundleItems.map(item => ({
            sku: item.sku.trim().toUpperCase(),
            quantity: item.quantity,
            product_name: item.product_name?.trim() || undefined,
            image_url: item.image_url?.trim() || undefined
          }))
        })
      };

      const response = await fetch(`${APP_URL}/api/sku/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.error || "SKU creation failed");
      }

      setSuccess(data.message);
      
      if (data.auto_created_skus) {
        setAutoCreateResult(data.auto_created_skus);
      }
      
      setRecentSkus(prev => [{
        sku: sku.trim(),
        product_name: productName.trim(),
        image_url: imageUrl.trim(),
        sku_type: skuType,
        bundle_items: bundleItems,
        auto_created: data.auto_created_skus?.length || 0,
        created: new Date().toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      }, ...prev.slice(0, 2)]);
      
      setSku("");
      setProductName("");
      setImageUrl("");
      setPreviewUrl("");
      setSkuType("simple");
      setBundleItems([]);
      setSearchTerm("");
      setShowDropdown(null);
      setShowNewSkuForm(null);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const clearForm = () => {
    setSku("");
    setProductName("");
    setImageUrl("");
    setPreviewUrl("");
    setSkuType("simple");
    setBundleItems([]);
    setError("");
    setSuccess("");
    setAutoCreateResult(null);
    setImageError(false);
    setSearchTerm("");
    setShowDropdown(null);
    setShowNewSkuForm(null);
  };

  return {
    // States
    sku, setSku,
    productName, setProductName,
    imageUrl, setImageUrl,
    skuType, setSkuType,
    bundleItems,
    loading,
    error,
    success,
    previewUrl,
    recentSkus,
    imageLoading,
    imageError,
    autoCreateResult,
    availableSkus,
    loadingSkus,
    searchTerm, setSearchTerm,
    showDropdown, setShowDropdown,
    showNewSkuForm,
    mounted,
    
    // Actions
    addBundleItem,
    removeBundleItem,
    updateBundleItem,
    selectSkuFromList,
    toggleNewSkuForm,
    handleSubmit,
    clearForm,
    filteredAvailableSkus: filteredAvailableSkus,
    isValidUrl
  };
}