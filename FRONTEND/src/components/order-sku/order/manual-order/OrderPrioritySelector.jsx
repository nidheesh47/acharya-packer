import { Star } from "lucide-react";

export function OrderPrioritySelector({ order, setOrder }) {
  return (
    <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-md">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl">
          <Star className="h-5 w-5 text-white" />
        </div>
        <div>
          <p className="text-xs text-gray-500">Order Priority</p>
          <div className="flex items-center gap-2 mt-1">
            <select
              className="text-sm font-semibold bg-transparent border border-gray-200 rounded-lg px-2 py-1 focus:ring-2 focus:ring-indigo-500"
              value={order.priority}
              onChange={(e) => setOrder({ ...order, priority: e.target.value })}
            >
              <option value="normal">Normal</option>
              <option value="high">High Priority</option>
              <option value="urgent">Urgent</option>
              <option value="express">Express</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}