// components/sku-summary/SortableTh.jsx
import { ChevronUp, ChevronDown } from "lucide-react";

export const SortableTh = ({ label, sortKey, currentSort, onClick, icon }) => {
  const isActive = currentSort.key === sortKey;
  
  return (
    <th
      onClick={onClick}
      className="p-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-all duration-150 group"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon && <span className="text-gray-500 group-hover:text-indigo-600 transition-colors">{icon}</span>}
          <span className="group-hover:text-indigo-700">{label}</span>
        </div>
        <div className="flex flex-col">
          <ChevronUp className={`h-3 w-3 -mb-1 ${
            isActive && currentSort.direction === 'asc' 
              ? 'text-indigo-600' 
              : 'text-gray-400'
          }`} />
          <ChevronDown className={`h-3 w-3 ${
            isActive && currentSort.direction === 'desc' 
              ? 'text-indigo-600' 
              : 'text-gray-400'
          }`} />
        </div>
      </div>
    </th>
  );
};