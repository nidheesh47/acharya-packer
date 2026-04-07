import { Sparkle, Info } from "lucide-react";

export function NewSKUForm({ index, item, onUpdate }) {
  return (
    <div className="mt-3 p-4 bg-white border-2 border-purple-200 rounded-lg">
      <div className="flex items-center gap-2 mb-3">
        <div className="p-1.5 bg-purple-100 rounded">
          <Sparkle className="h-4 w-4 text-purple-600" />
        </div>
        <h4 className="font-medium text-purple-800">Create New Component SKU</h4>
      </div>
      
      <div className="space-y-3">
        <div>
          <input
            type="text"
            value={item.sku}
            onChange={(e) => onUpdate(index, "sku", e.target.value.toUpperCase())}
            placeholder="Enter NEW SKU only"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div>
          <input
            type="text"
            value={item.product_name || ''}
            onChange={(e) => onUpdate(index, 'product_name', e.target.value)}
            placeholder="Product name"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500"
          />
        </div>
        
        <div>
          <input
            type="url"
            value={item.image_url || ''}
            onChange={(e) => onUpdate(index, 'image_url', e.target.value)}
            placeholder="Image URL (optional)"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500"
          />
        </div>
        
        <div className="flex items-center gap-2 text-xs text-purple-600 bg-purple-50 p-2 rounded-lg">
          <Info className="h-4 w-4" />
          <span>This SKU will be automatically created when you save the bundle</span>
        </div>
      </div>
    </div>
  );
}