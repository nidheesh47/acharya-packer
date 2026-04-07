export function WelcomeBanner({ admin, today, todayPerformance }) {
  return (
    <div className="w-full mb-6 sm:mb-8">
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-xl sm:rounded-2xl p-5 sm:p-8 text-white shadow-xl w-full">
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6">
            <div className="min-w-0 flex-1">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2 truncate">
                Welcome back, {admin?.name || "Packer"}! 👋
              </h2>
              <p className="text-blue-100 text-sm sm:text-base">
                {today?.date ? `${today.date}` : "Ready to start packing!"}
              </p>
            </div>
            <div className="flex gap-4 sm:gap-6 flex-shrink-0">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold">{todayPerformance.totalScans || 0}</div>
                <div className="text-xs sm:text-sm text-blue-200 whitespace-nowrap">Today's Scans</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold">{today?.total_orders || 0}</div>
                <div className="text-xs sm:text-sm text-blue-200 whitespace-nowrap">Orders Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold">{todayPerformance.efficiency || 0}%</div>
                <div className="text-xs sm:text-sm text-blue-200 whitespace-nowrap">Efficiency</div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-36 sm:w-48 h-36 sm:h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24"></div>
      </div>
    </div>
  );
}