import { Building2, Hash, Globe } from "lucide-react";

export function TrackingInfoTab({ order, setOrder }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Shipping Carrier
          </label>
          <div className="relative">
            <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              placeholder="FedEx, UPS, DHL"
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={order.tracking_company}
              onChange={(e) => setOrder({ ...order, tracking_company: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Tracking Number
          </label>
          <div className="relative">
            <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              placeholder="TRK123456789"
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={order.tracking_number}
              onChange={(e) => setOrder({ ...order, tracking_number: e.target.value })}
            />
          </div>
        </div>

        <div className="md:col-span-2 space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Tracking URL
          </label>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="url"
              placeholder="https://tracking.example.com/..."
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={order.tracking_url}
              onChange={(e) => setOrder({ ...order, tracking_url: e.target.value })}
            />
          </div>
        </div>
      </div>
    </div>
  );
}