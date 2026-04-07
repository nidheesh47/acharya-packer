// components/sku-summary/SKUTable.jsx
import { FileText, Box, PackageCheck, PackageX, Activity } from "lucide-react";
import { SortableTh } from "./SortableTh";
import { SKURow } from "./SKURow";

export const SKUTable = ({ skus, ordered, packed, pending, sortConfig, onSort }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <SortableTh 
                label="SKU Code" 
                sortKey="sku" 
                currentSort={sortConfig}
                onClick={() => onSort("sku")}
                icon={<FileText className="h-4 w-4" />}
              />
              <SortableTh 
                label="Ordered" 
                sortKey="ordered" 
                currentSort={sortConfig}
                onClick={() => onSort("ordered")}
                icon={<Box className="h-4 w-4" />}
              />
              <SortableTh 
                label="Packed" 
                sortKey="packed" 
                currentSort={sortConfig}
                onClick={() => onSort("packed")}
                icon={<PackageCheck className="h-4 w-4" />}
              />
              <SortableTh 
                label="Pending" 
                sortKey="pending" 
                currentSort={sortConfig}
                onClick={() => onSort("pending")}
                icon={<PackageX className="h-4 w-4" />}
              />
              <SortableTh 
                label="Progress" 
                sortKey="completion" 
                currentSort={sortConfig}
                onClick={() => onSort("completion")}
                icon={<Activity className="h-4 w-4" />}
              />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {skus.map((sku) => (
              <SKURow
                key={sku}
                sku={sku}
                ordered={ordered[sku] || 0}
                packed={packed[sku] || 0}
                pending={pending[sku] || 0}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};