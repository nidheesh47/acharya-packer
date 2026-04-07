import { usePackingSignup } from "../hooks/usePackingSignup";
import { LoadingState } from "./LoadingState";
import { SignupHeader } from "./SignupHeader";
import { StatusMessages } from "./StatusMessages";
import { SignupForm } from "./SignupForm";
import { StatsCards } from "./StatsCards";
import { FeaturesCard } from "./FeaturesCard";
import { RecentUsersCard } from "./RecentUsersCard";
import { InfoCard } from "./InfoCard";

export default function PackingSignup() {
  const {
    name, setName,
    email, setEmail,
    loading,
    error,
    success,
    recentUsers,
    mounted,
    userRole,
    stats,
    features,
    handleSubmit
  } = usePackingSignup();

  if (loading && !success) {
    return <LoadingState mounted={mounted} />;
  }

  return (
    <div className={`min-h-screen bg-gray-50 transition-opacity duration-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
      <div className="relative px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
        <SignupHeader userRole={userRole} />

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <StatusMessages error={error} success={success} />
            <SignupForm 
              name={name}
              setName={setName}
              email={email}
              setEmail={setEmail}
              loading={loading}
              onSubmit={handleSubmit}
            />
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            <StatsCards stats={stats} />
            <FeaturesCard features={features} />
            <RecentUsersCard recentUsers={recentUsers} />
            <InfoCard />
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 640px) {
          input, button {
            font-size: 16px !important;
          }
        }
        
        @media (max-width: 640px) {
          button, 
          [role="button"],
          input[type="submit"] {
            min-height: 44px;
          }
          
          input, select, textarea {
            min-height: 44px;
          }
        }
      `}</style>
    </div>
  );
}