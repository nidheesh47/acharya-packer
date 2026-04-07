// components/sku-summary/SKUGrid.jsx
import { SKUCard } from "./SKUCard";

export const SKUGrid = ({ skus, ordered, packed, pending }) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      {skus.map((sku) => (
        <SKUCard
          key={sku}
          sku={sku}
          ordered={ordered[sku] || 0}
          packed={packed[sku] || 0}
          pending={pending[sku] || 0}
        />
      ))}
    </div>
  );
};