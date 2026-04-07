import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const API_BASE = import.meta.env.VITE_APP_URL;

export function useUserManagement() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [error, setError] = useState("");
  const [editOpen, setEditOpen] = useState(false);
  const [editData, setEditData] = useState({
    email: "",
    old_password: "",
    new_password: "",
    shop_domain: "",
    webhook_secret: "",
  });
  const [originalEditData, setOriginalEditData] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [showPassword, setShowPassword] = useState({
    old_password: false,
    new_password: false,
  });
  const [logoutWarning, setLogoutWarning] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [currentUserRole, setCurrentUserRole] = useState(null);
  const [mounted, setMounted] = useState(false);

  const fetchUsers = async (token) => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/auth/users/by-shop`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch users");
      setUsers(data.users || data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (user) => {
    if (
      !confirm(
        `Are you sure you want to delete ${user.name} (${user.role})? This action cannot be undone.`,
      )
    )
      return;
    setActionLoading(user.admin_id);

    let url = "";
    if (user.role === "logistics") url = "/api/logistics/delete";
    if (user.role === "packing") url = "/api/packing/delete";

    try {
      const token = localStorage.getItem("auth_token");
      const res = await fetch(`${API_BASE}${url}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ admin_id: user.admin_id }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Delete failed");

      setUsers(users.filter((u) => u.admin_id !== user.admin_id));
      setSuccessMessage(`${user.name} has been deleted successfully`);
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (e) {
      alert(e.message);
    } finally {
      setActionLoading(null);
    }
  };

  const hasSensitiveUpdates = (originalData, newData) => {
    const sensitiveFields = [
      "email",
      "shop_domain",
      "webhook_secret",
      "new_password",
    ];
    return sensitiveFields.some((field) => {
      if (field === "new_password") {
        return newData.new_password && newData.new_password.trim() !== "";
      }
      return originalData[field] !== newData[field];
    });
  };

  const handleSelfEdit = async (e) => {
    e.preventDefault();
    setActionLoading("edit");

    if (editData.new_password && !editData.old_password) {
      alert("Current password is required to set a new password");
      setActionLoading(null);
      return;
    }

    try {
      const token = localStorage.getItem("auth_token");
      const res = await fetch(`${API_BASE}/api/admin/edit`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editData),
      });

      const data = await res.json();

      if (!res.ok) {
        if (
          data.error ===
          "This email address is already connected to another account."
        ) {
          alert(
            "❌ This email address is already in use by another account. Please use a different email.",
          );
        } else if (
          data.error ===
          "This shop domain is already linked to another account."
        ) {
          alert(
            "❌ This shop domain is already linked to another account. Please use a different domain.",
          );
        } else {
          throw new Error(data.error || "Update failed");
        }
        setActionLoading(null);
        return;
      }

      const sensitiveUpdated = hasSensitiveUpdates(originalEditData, editData);

      if (sensitiveUpdated) {
        const updatedFields = [];
        if (originalEditData.email !== editData.email)
          updatedFields.push("Email");
        if (originalEditData.shop_domain !== editData.shop_domain)
          updatedFields.push("Shop Domain");
        if (originalEditData.webhook_secret !== editData.webhook_secret)
          updatedFields.push("Webhook Secret");
        if (editData.new_password && editData.new_password.trim() !== "")
          updatedFields.push("Password");

        const fieldsMessage = updatedFields.join(", ");
        setEditOpen(false);
        setSuccessMessage(
          `✅ ${updatedFields.length > 1 ? "Fields" : "Field"} updated successfully!`,
        );

        setTimeout(() => {
          setSuccessMessage("");
          setLogoutWarning({
            message: `Your ${fieldsMessage} ${updatedFields.length > 1 ? "have" : "has"} been updated. For security reasons, you will be logged out from all sessions.`,
            type: "sensitive_update",
          });
          setTimeout(() => {
            localStorage.removeItem("auth_token");
            navigate("/user/login", {
              replace: true,
              state: {
                message:
                  "Your account information has been updated. Please log in again.",
              },
            });
          }, 3000);
        }, 1500);
      } else {
        setEditOpen(false);
        setSuccessMessage("✅ Profile updated successfully!");
        setTimeout(() => setSuccessMessage(""), 3000);
        await fetchUsers(token);
      }
    } catch (e) {
      alert(e.message);
    } finally {
      setActionLoading(null);
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  useEffect(() => {
    setMounted(true);
    const token = localStorage.getItem("auth_token");
    if (!token) {
      navigate("/user/login", { replace: true });
      return;
    }

    const adminData = localStorage.getItem("admin");
    if (adminData) {
      try {
        const parsed = JSON.parse(adminData);
        setCurrentUserRole(parsed.role);
      } catch (e) {
        console.error("Failed to parse admin data", e);
      }
    }

    fetchUsers(token);
  }, [navigate]);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase());

    if (selectedRole === "all") return matchesSearch;
    return matchesSearch && user.role === selectedRole;
  });

  return {
    users,
    loading,
    actionLoading,
    error,
    editOpen,
    editData,
    originalEditData,
    searchTerm,
    selectedRole,
    showPassword,
    logoutWarning,
    successMessage,
    currentUserRole,
    mounted,
    filteredUsers,
    setSearchTerm,
    setSelectedRole,
    setEditOpen,
    setEditData,
    setOriginalEditData,
    setShowPassword,
    setSuccessMessage,
    setLogoutWarning,
    fetchUsers: () => fetchUsers(localStorage.getItem("auth_token")),
    handleDelete,
    handleSelfEdit,
    togglePasswordVisibility,
  };
}
