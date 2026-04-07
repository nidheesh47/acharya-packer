import OrderRow from './OrderRow';
import Pagination from './Pagination';
import { Package } from 'lucide-react';

export default function OrdersTable({
  orders,
  selectedOrders,
  selectAll,
  toggleOrderSelection,
  toggleSelectAll,
  handleViewOrder,
  handleEditOrder,
  handleViewLogs,
  handleQuickAction,
  totalPages,
  page,
  setPage,
  pageSize,
  setPageSize,
  filteredOrdersLength
}) {
  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-12 text-center">
        <Package className="h-16 w-16 mx-auto mb-4 text-slate-300" />
        <p className="text-xl font-medium text-slate-900">No orders found</p>
        <p className="text-base text-slate-600 mt-2">Try adjusting your search criteria or filters</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-slate-50 to-slate-100">
            <tr>
              <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                <div className="flex items-center">
                  <button 
                    onClick={toggleSelectAll} 
                    className={`mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 border rounded-xl flex items-center justify-center transition-all ${selectAll ? "bg-gradient-to-r from-indigo-500 to-purple-600 border-indigo-600" : "border-slate-300 hover:border-indigo-400"}`}
                  >
                    {selectAll && <Check className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-white" />}
                  </button>
                  Order Details
                </div>
              </th>
              <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider hidden sm:table-cell">
                Customer & Shipping
              </th>
              <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Status & Progress
              </th>
              <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider hidden lg:table-cell">
                Tracking & Items
              </th>
              <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider hidden xl:table-cell">
                Recent Activity
              </th>
              <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {orders.map((order) => (
              <OrderRow
                key={order._id}
                order={order}
                isSelected={selectedOrders.has(order._id)}
                onSelect={() => toggleOrderSelection(order._id)}
                onView={() => handleViewOrder(order)}
                onEdit={() => handleEditOrder(order)}
                onViewLogs={() => handleViewLogs(order)}
                onQuickAction={(action) => handleQuickAction(order, action)}
              />
            ))}
          </tbody>
        </table>
      </div>
      
      <Pagination
        totalPages={totalPages}
        currentPage={page}
        onPageChange={setPage}
        pageSize={pageSize}
        onPageSizeChange={setPageSize}
        totalItems={filteredOrdersLength}
        currentItems={orders.length}
      />
    </div>
  );
}