// pages/AdminLogin.jsx
import { useAdminLogin } from "../hooks/useAdminLogin";
import { BrandingSection } from "./BrandingSection";
import { FeatureGrid } from "./FeatureGrid";
import { StatsDisplay } from "./StatsDisplay";
import { TrustIndicators } from "./TrustIndicators";
import { MobileHeader } from "./MobileHeader";
import { LoginForm } from "./LoginForm";
import { Footer } from "./Footer";
import { ConfirmationAlert } from "./ConfirmationAlert";
import { ForgotPasswordModal } from "./ForgotPasswordModal";

export default function AdminLogin() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    error,
    showPassword,
    setShowPassword,
    rememberMe,
    setRememberMe,
    mounted,
    showForgotModal,
    resetEmail,
    setResetEmail,
    resetLoading,
    resetMessage,
    resetError,
    showConfirmAlert,
    handleSubmit,
    handleForgotPasswordClick,
    handleConfirmReset,
    handleResetPassword,
    closeModals,
    clearError,
  } = useAdminLogin();

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-100 via-purple-50 to-indigo-100">
      <div
        className={`relative w-full min-h-screen flex items-center justify-center p-4 transition-opacity duration-500 ${mounted ? "opacity-100" : "opacity-0"}`}
      >
        <div className="w-full max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Side - Branding & Features */}
            <div className="space-y-8">
              <BrandingSection />
              <FeatureGrid />
              <StatsDisplay />
              <TrustIndicators />
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full max-w-md mx-auto lg:mx-0 lg:ml-auto">
              <MobileHeader />

              <LoginForm
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                loading={loading}
                error={error}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                rememberMe={rememberMe}
                setRememberMe={setRememberMe}
                onSubmit={handleSubmit}
                onForgotPassword={handleForgotPasswordClick}
                clearError={clearError}
              />

              <Footer />
            </div>
          </div>
        </div>
      </div>

      <ConfirmationAlert
        isOpen={showConfirmAlert}
        onClose={closeModals}
        onConfirm={handleConfirmReset}
      />

      <ForgotPasswordModal
        isOpen={showForgotModal}
        email={resetEmail}
        setEmail={setResetEmail}
        loading={resetLoading}
        message={resetMessage}
        error={resetError}
        onSubmit={handleResetPassword}
        onClose={closeModals}
      />

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }

        @media (max-width: 640px) {
          input,
          button {
            font-size: 16px !important;
          }
        }
      `}</style>
    </div>
  );
}
