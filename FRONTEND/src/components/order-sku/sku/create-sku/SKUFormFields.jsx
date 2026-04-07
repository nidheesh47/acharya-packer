import { Tag, Key, FileText, Package as PackageIcon, Camera, Link as LinkIcon } from "lucide-react";

export function SKUFormFields({ 
  skuType, 
  sku, onSkuChange, 
  productName, onProductNameChange, 
  imageUrl, onImageUrlChange,
  disabled 
}) {
  return (
    <>
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
          <Tag className="h-4 w-4" />
          {skuType === 'bundle' ? 'Bundle Code' : 'SKU Code'}
          <span className="text-red-500">*</span>
        </label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Key className="h-5 w-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
          </div>
          <input
            type="text"
            value={sku}
            onChange={(e) => onSkuChange(e.target.value.toUpperCase())}
            placeholder={skuType === 'bundle' ? "e.g. BUNDLE-001, GIFT-SET" : "e.g. HW-001, ABC-2024"}
            className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 uppercase"
            disabled={disabled}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
          <FileText className="h-4 w-4" />
          {skuType === 'bundle' ? 'Bundle Name' : 'Product Name'}
          <span className="text-red-500">*</span>
        </label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <PackageIcon className="h-5 w-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
          </div>
          <input
            type="text"
            value={productName}
            onChange={(e) => onProductNameChange(e.target.value)}
            placeholder={skuType === 'bundle' ? "Enter bundle name" : "Enter product name"}
            className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            disabled={disabled}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
          <Camera className="h-4 w-4" />
          {skuType === 'bundle' ? 'Bundle Image URL' : 'Product Image URL'}
          <span className="text-red-500">*</span>
        </label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <LinkIcon className="h-5 w-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
          </div>
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => onImageUrlChange(e.target.value)}
            placeholder="https://example.com/product-image.jpg"
            className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            disabled={disabled}
          />
        </div>
      </div>
    </>
  );
}