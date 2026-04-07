import React, { useState } from "react";
import { Search, Filter, FilterIcon } from "lucide-react";
import { DATE_RANGES, FULFILLMENT_STATUSES, TRACKING_OPTIONS } from "../constants/orderConstants";

export default function OrdersFilters({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  advancedFilters,
  setAdvancedFilters,
  showAdvancedFilters,
  setShowAdvancedFilters,
  resetAdvancedFilters,
}) {
  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl border border-slate-200 p-4 sm:p-6 mb-6">
      <div className="flex flex-col lg:flex-row gap-3 sm:gap-5">
        {/* Search */}
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-slate-400" />
            <input
              className="w-full pl-9 sm:pl-11 pr-3 sm:pr-4 py-2.5 sm:py-3.5 bg-slate-50 border border-slate-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all duration-300 text-slate-700 placeholder-slate-400 text-sm sm:text-base"
              placeholder="Search orders, customers, SKUs, tracking..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </div>
        </div>

        {/* Quick Filters */}
        <div className="flex flex-wrap gap-2 sm:gap-3">
          <div className="relative flex-1 sm:flex-none">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
              }}
              className="pl-9 pr-8 py-2.5 sm:py-3.5 border border-slate-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 appearance-none bg-white shadow-sm text-sm sm:text-base"
            >
              <option value="all">All Status</option>
              <option value="pending">🟡 Pending</option>
              <option value="items_scanned">🔵 Items Scanned</option>
              <option value="tracking_label_pending">🟣 Tracking Pending</option>
              <option value="scanned">🟢 Completed</option>
              <option value="cancelled">🔴 Cancelled</option>
            </select>
          </div>

          <button
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className="inline-flex items-center px-3 sm:px-4 py-2.5 sm:py-3.5 text-sm font-medium text-slate-700 bg-slate-100 border border-slate-300 rounded-lg sm:rounded-xl hover:bg-slate-200 transition-colors"
          >
            <FilterIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
            <span className="hidden sm:inline">Advanced</span>
            <span className="sm:hidden">Filters</span>
          </button>
        </div>
      </div>

      {/* Advanced Filters */}
      {showAdvancedFilters && (
        <div className="mt-4 sm:mt-6 p-4 sm:p-5 bg-slate-50 rounded-lg sm:rounded-xl border border-slate-200">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h3 className="font-medium text-slate-900 text-sm sm:text-base">Advanced Filters</h3>
            <button onClick={resetAdvancedFilters} className="text-xs sm:text-sm text-indigo-600 hover:text-indigo-700">
              Reset All
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1 sm:mb-2">Date Range</label>
              <select
                value={advancedFilters.dateRange}
                onChange={(e) => setAdvancedFilters((prev) => ({ ...prev, dateRange: e.target.value }))}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
              >
                {DATE_RANGES.map(range => (
                  <option key={range.value} value={range.value}>{range.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1 sm:mb-2">Amount Range</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={advancedFilters.minAmount}
                  onChange={(e) => setAdvancedFilters((prev) => ({ ...prev, minAmount: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={advancedFilters.maxAmount}
                  onChange={(e) => setAdvancedFilters((prev) => ({ ...prev, maxAmount: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1 sm:mb-2">Has Tracking</label>
              <select
                value={advancedFilters.hasTracking}
                onChange={(e) => setAdvancedFilters((prev) => ({ ...prev, hasTracking: e.target.value }))}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
              >
                {TRACKING_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1 sm:mb-2">Fulfillment</label>
              <select
                value={advancedFilters.fulfillmentStatus}
                onChange={(e) => setAdvancedFilters((prev) => ({ ...prev, fulfillmentStatus: e.target.value }))}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
              >
                {FULFILLMENT_STATUSES.map(status => (
                  <option key={status.value} value={status.value}>{status.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}