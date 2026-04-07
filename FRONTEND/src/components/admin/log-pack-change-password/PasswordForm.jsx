// components/change-password/PasswordForm.jsx
import { PasswordInput } from "./PasswordInput";
import { PasswordStrengthMeter } from "./PasswordStrengthMeter";
import { PasswordRequirements } from "./PasswordRequirements";
import { FormButton } from "./FormButton";

export const PasswordForm = ({
  oldPassword,
  setOldPassword,
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
  showOldPassword,
  setShowOldPassword,
  showNewPassword,
  setShowNewPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  loading,
  passwordStrength,
  passwordRequirements,
  getStrengthColor,
  getStrengthText,
  getStrengthBgColor,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4 sm:space-y-6">
      {/* Old Password */}
      <PasswordInput
        label="Current Password"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
        placeholder="Enter current password"
        type="current"
        showPassword={showOldPassword}
        onToggleShow={() => setShowOldPassword(!showOldPassword)}
      />

      {/* New Password Section */}
      <div className="space-y-3 sm:space-y-4">
        <PasswordInput
          label="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Create strong password"
          type="new"
          showPassword={showNewPassword}
          onToggleShow={() => setShowNewPassword(!showNewPassword)}
        />

        {newPassword && (
          <>
            <PasswordStrengthMeter
              strength={passwordStrength}
              getStrengthColor={getStrengthColor}
              getStrengthText={getStrengthText}
              getStrengthBgColor={getStrengthBgColor}
            />
            <PasswordRequirements requirements={passwordRequirements} />
          </>
        )}
      </div>

      {/* Confirm Password */}
      <PasswordInput
        label="Confirm New Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Re-enter new password"
        type="confirm"
        showPassword={showConfirmPassword}
        onToggleShow={() => setShowConfirmPassword(!showConfirmPassword)}
        error={
          confirmPassword && newPassword && newPassword !== confirmPassword
            ? "Passwords do not match"
            : null
        }
        success={
          confirmPassword && newPassword && newPassword === confirmPassword
            ? "Passwords match"
            : null
        }
      />

      <FormButton loading={loading}>
        Update Password & Sign Out
      </FormButton>
    </form>
  );
};