import { FileText, Truck, Package } from "lucide-react";

export function OrderFormTabs({ activeTab, onTabChange, itemCount }) {
  const tabs = [
    { id: "order", label: "Order Details", icon: FileText },
    { id: "tracking", label: "Tracking Info", icon: Truck },
    { id: "items", label: `Items (${itemCount})`, icon: Package }
  ];

  return (
    <div className="flex border-b border-gray-200 bg-gray-50">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex-1 px-6 py-4 text-sm font-medium transition-all relative ${
              activeTab === tab.id
                ? "text-indigo-600 bg-white"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Icon className="h-4 w-4" />
              {tab.label}
            </div>
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500"></div>
            )}
          </button>
        );
      })}
    </div>
  );
}