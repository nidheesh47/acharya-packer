import { Link } from "react-router";
import { ArrowLeft, Truck, ShieldCheck } from "lucide-react";

export function LogisticsSignupHeader() {
  return (
    <div className="mb-8">
      <Link
        to="/admin/list"
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600 bg-white px-4 py-2 rounded-lg transition-all duration-200 mb-6 group hover:shadow-sm"
      >
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
        Back to User Management
      </Link>

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="relative bg-gradient-to-r from-blue-500 to-indigo-600 p-3 rounded-2xl shadow-md">
            <Truck className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
              Create Logistics Account
            </h1>
            <p className="text-gray-600 mt-1">Add new logistics team members with secure access</p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <div className="px-4 py-3 bg-blue-100 text-blue-700 text-sm font-semibold rounded-lg border border-blue-200 flex items-center gap-2">
            <ShieldCheck className="h-4 w-4" />
            ADMIN PRIVILEGE REQUIRED
          </div>
        </div>
      </div>
    </div>
  );
}