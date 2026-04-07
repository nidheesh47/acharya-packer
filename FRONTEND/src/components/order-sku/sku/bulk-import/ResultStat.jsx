// components/bulk-import/ResultStat.jsx
export const ResultStat = ({ label, value, color, icon }) => {
  const colors = {
    blue: "bg-blue-50 border-blue-200 text-blue-600",
    green: "bg-green-50 border-green-200 text-green-600",
    amber: "bg-amber-50 border-amber-200 text-amber-600",
    red: "bg-red-50 border-red-200 text-red-600"
  };
  
  return (
    <div className={`${colors[color]} rounded-lg p-4 border`}>
      <div className="flex items-center justify-between mb-2">
        <div className="p-1.5 bg-white rounded-lg">
          {icon}
        </div>
        <span className={`text-2xl font-bold ${colors[color].split(' ').pop()}`}>{value}</span>
      </div>
      <p className="text-sm font-medium text-gray-700">{label}</p>
    </div>
  );
};