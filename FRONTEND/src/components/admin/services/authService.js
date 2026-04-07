// services/authService.js
const API_BASE = import.meta.env.VITE_APP_URL;

export const authService = {
  async adminLogin(email, password) {
    const response = await fetch(`${API_BASE}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.error || "Invalid credentials");
    }

    return data;
  },

  async resetPassword(email) {
    const response = await fetch(`${API_BASE}/api/auth/reset-password`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to reset password");
    }

    return data;
  },
};
