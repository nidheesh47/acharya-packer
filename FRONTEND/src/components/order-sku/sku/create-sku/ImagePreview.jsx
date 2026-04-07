import { Eye, Loader2, AlertCircle, CheckCircle, ExternalLink } from "lucide-react";

export function ImagePreview({ previewUrl, imageLoading, imageError }) {
  if (!previewUrl) return null;

  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
        <Eye className="h-4 w-4" />
        Image Preview
      </label>
      <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="relative group">
            <div className="relative h-40 w-40 rounded-lg overflow-hidden border-2 border-gray-300 shadow-sm">
              {imageLoading ? (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                  <Loader2 className="h-8 w-8 text-purple-600 animate-spin" />
                </div>
              ) : imageError ? (
                <div className="absolute inset-0 flex items-center justify-center bg-red-50">
                  <AlertCircle className="h-12 w-12 text-red-400" />
                </div>
              ) : (
                <img
                  src={previewUrl}
                  alt="Product preview"
                  className="w-full h-full object-cover"
                  onLoad={() => {}}
                  onError={() => {}}
                />
              )}
            </div>
            <div className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm">
              Preview
            </div>
          </div>
          <div className="flex-1">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
              imageError ? 'bg-red-100 text-red-700' : 
              imageLoading ? 'bg-blue-100 text-blue-700' : 
              'bg-green-100 text-green-700'
            }`}>
              {imageError ? (
                <>
                  <AlertCircle className="h-4 w-4" />
                  Failed to load
                </>
              ) : imageLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4" />
                  Image loaded successfully
                </>
              )}
            </div>
            <a
              href={previewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-3 text-sm text-purple-600 hover:text-purple-700 font-medium"
            >
              <ExternalLink className="h-4 w-4" />
              Open full image
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}