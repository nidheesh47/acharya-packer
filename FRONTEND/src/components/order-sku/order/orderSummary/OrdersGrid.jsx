import OrderCard from './OrderCard';
import Pagination from './Pagination';
import { Package } from 'lucide-react';

export default function OrdersGrid({
  orders,
  selectedOrders,
  toggleOrderSelection,
  handleViewOrder,
  handleEditOrder,
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
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl border border-slate-200 p-8 sm:p-12 text-center">
        <Package className="h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-3 sm:mb-4 text-slate-300" />
        <p className="text-lg sm:text-xl font-medium text-slate-900">No orders found</p>
        <p className="text-sm sm:text-base text-slate-600 mt-2">Try adjusting your search criteria or filters</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">
        {orders.map((order) => (
          <OrderCard
            key={order._id}
            order={order}
            isSelected={selectedOrders.has(order._id)}
            onSelect={() => toggleOrderSelection(order._id)}
            onView={() => handleViewOrder(order)}
            onEdit={() => handleEditOrder(order)}
            onQuickAction={(action) => handleQuickAction(order, action)}
          />
        ))}
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
    </>
  );
}