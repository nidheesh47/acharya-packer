import { BarChart3, CheckCircle, X, Database, TrendingUp } from "lucide-react";
import { SummaryStatCard } from "./SummaryStatCard";
import { ShopInfoCard } from "./ShopInfoCard";
import { ErrorDetailsList } from "./ErrorDetailsList";

export function ImportSummary({ result }) {
  if (!result) return null;

  const successRate = result.total_rows > 0 
    ? Math.round((result.created_count / result.total_rows) * 100) 
    : 0;

  const stats = [
    {
      label: "Successful Orders",
      value: result.created_count,
      icon: CheckCircle,
      bgColor: "bg-emerald-50 border-emerald-200",
      iconBgColor: "bg-emerald-100",
      iconColor: "text-emerald-600"
    },
    {
      label: "Failed Rows",
      value: result.failed_count,
      icon: X,
      bgColor: "bg-red-50 border-red-200",
      iconBgColor: "bg-red-100",
      iconColor: "text-red-600"
    },
    {
      label: "Total Rows",
      value: result.total_rows,
      icon: Database,
      bgColor: "bg-blue-50 border-blue-200",
      iconBgColor: "bg-blue-100",
      iconColor: "text-blue-600"
    },
    {
      label: "Success Rate",
      value: `${successRate}%`,
      icon: TrendingUp,
      bgColor: "bg-purple-50 border-purple-200",
      iconBgColor: "bg-purple-100",
      iconColor: "text-purple-600"
    }
  ];

  return (
    <div className="border-t border-gray-200 bg-gray-50">
      <div className="p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl">
            <BarChart3 className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Import Summary</h3>
            <p className="text-sm text-gray-500">Detailed breakdown of your import</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, idx) => (
            <SummaryStatCard key={idx} {...stat} />
          ))}
        </div>

        <ShopInfoCard shopDomain={result.shop_domain} />
        <ErrorDetailsList errors={result.errors} />

        {result.created_count > 0 && (
          <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium text-green-800">Import Complete</p>
                <p className="text-sm text-green-700">
                  Successfully created {result.created_count} order{result.created_count !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}