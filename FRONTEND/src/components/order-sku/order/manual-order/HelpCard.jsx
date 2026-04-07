import { Info, CheckCircle, Plus, Tag, AlertTriangle } from "lucide-react";

export function HelpCard() {
  const tips = [
    { icon: CheckCircle, text: "Click on any product in the catalog to automatically add it with quantity 1", color: "text-green-500" },
    { icon: Plus, text: "If SKU already exists, clicking it again will increment the quantity", color: "text-blue-500" },
    { icon: Tag, text: "Custom SKUs will be created automatically if not in catalog", color: "text-amber-500" },
    { icon: AlertTriangle, text: "Duplicate SKUs in the same order are not allowed", color: "text-red-500" }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-amber-100 rounded-xl">
          <Info className="h-5 w-5 text-amber-600" />
        </div>
        <h3 className="text-lg font-bold text-gray-800">Quick Tips</h3>
      </div>
      
      <div className="space-y-3">
        {tips.map((tip, index) => {
          const Icon = tip.icon;
          return (
            <div key={index} className="flex items-start gap-2">
              <Icon className={`h-4 w-4 ${tip.color} mt-0.5`} />
              <p className="text-sm text-gray-600">{tip.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}