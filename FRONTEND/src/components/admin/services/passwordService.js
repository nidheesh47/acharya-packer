// services/passwordService.js
const API_BASE = import.meta.env.VITE_APP_URL;

export const passwordService = {
  async changePassword(token, oldPassword, newPassword) {
    const response = await fetch(`${API_BASE}/api/auth/change-password`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        oldPassword,
        newPassword,
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.error || "Password update failed");
    }

    return data;
  },
};
