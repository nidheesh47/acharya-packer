import { useLogisticsSignup } from "../hooks/useLogisticsSignup";
import { LogisticsSignupHeader } from "./LogisticsSignupHeader";
import { LogisticsForm } from "./LogisticsForm";
import { StatusMessages } from "./StatusMessages";
import { StatsCard } from "./StatsCard";
import { SecurityProtocolsCard } from "./SecurityProtocolsCard";
import { RecentUsersCard } from "./RecentUsersCard";
import { Activity, Zap, Headphones, Truck } from "lucide-react";

// Map icon strings to actual components
const iconMap = {
  Activity: Activity,
  Zap: Zap,
  Headphones: Headphones,
  Truck: Truck
};

export default function LogisticsSignup() {
  const {
    name, setName,
    email, setEmail,
    loading,
    error,
    success,
    recentUsers,
    mounted,
    stats,
    handleSubmit
  } = useLogisticsSignup();

  return (
    <div className={`min-h-screen bg-gray-50 transition-opacity duration-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
      <div className="relative px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
        <LogisticsSignupHeader />

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <StatusMessages error={error} success={success} />
            <LogisticsForm 
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
            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-3">
              {stats.map((stat, idx) => {
                const Icon = iconMap[stat.icon];
                return (
                  <StatsCard
                    key={idx}
                    value={stat.value}
                    label={stat.label}
                    icon={Icon}
                    color={stat.color}
                  />
                );
              })}
            </div>

            <SecurityProtocolsCard />
            <RecentUsersCard recentUsers={recentUsers} />
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