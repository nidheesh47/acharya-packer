import { Globe } from "lucide-react";

export function ShopInfoCard({ shopDomain }) {
  if (!shopDomain) return null;

  return (
    <div className="mb-8 p-4 bg-gray-100 rounded-lg border border-gray-200">
      <div className="flex items-center gap-3">
        <Globe className="h-5 w-5 text-indigo-500" />
        <div>
          <p className="text-xs text-gray-500">Shop Domain</p>
          <p className="font-medium text-gray-800">{shopDomain}</p>
        </div>
      </div>
    </div>
  );
}