import { useUserManagement } from "../hooks/useUserManagement";
import { LoadingState } from "./LoadingState";
import { ErrorState } from "./ErrorState";
import { SuccessToast } from "./SuccessToast";
import { LogoutWarning } from "./LogoutWarning";
import { Header } from "./Header";
import { StatsCards } from "./StatsCards";
import { SearchFilter } from "./SearchFilter";
import { UsersGrid } from "./UsersGrid";
import { SecurityNotice } from "./SecurityNotice";
import { EditProfileModal } from "./EditProfileModal";

export default function UserManagement() {
  const {
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
    fetchUsers,
    handleDelete,
    handleSelfEdit,
    togglePasswordVisibility
  } = useUserManagement();

  if (loading) return <LoadingState mounted={mounted} />;

  const handleEditClick = (user) => {
    setOriginalEditData({
      email: user.email,
      shop_domain: user.shop_domain || "",
      webhook_secret: user.webhook_secret || "",
    });
    setEditData({
      email: user.email,
      old_password: "",
      new_password: "",
      shop_domain: user.shop_domain || "",
      webhook_secret: user.webhook_secret || "",
    });
    setEditOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className={`min-h-screen bg-gray-50 transition-opacity duration-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
      <div className="relative px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 max-w-7xl mx-auto">
        {successMessage && <SuccessToast message={successMessage} />}
        {logoutWarning && <LogoutWarning warning={logoutWarning} />}

        <Header 
          users={users}
          currentUserRole={currentUserRole}
          onRefresh={fetchUsers}
        />

        <StatsCards users={users} />

        <SearchFilter 
          searchTerm={searchTerm}
          selectedRole={selectedRole}
          onSearchChange={setSearchTerm}
          onRoleChange={setSelectedRole}
        />

        {error && <ErrorState error={error} onRetry={fetchUsers} />}

        <UsersGrid 
          users={filteredUsers}
          currentUserRole={currentUserRole}
          actionLoading={actionLoading}
          onEdit={handleEditClick}
          onDelete={handleDelete}
        />

        <SecurityNotice />

        <EditProfileModal 
          isOpen={editOpen}
          editData={editData}
          showPassword={showPassword}
          actionLoading={actionLoading}
          onClose={() => setEditOpen(false)}
          onChange={handleEditChange}
          onTogglePassword={togglePasswordVisibility}
          onSubmit={handleSelfEdit}
        />
      </div>

      <style jsx>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
        
        .animate-shrink {
          animation: shrink 3s linear;
        }
        
        @media (max-width: 640px) {
          input, button, select, textarea {
            font-size: 16px !important;
          }
          
          button, 
          [role="button"],
          input[type="submit"] {
            min-height: 44px;
          }
        }
      `}</style>
    </div>
  );
}