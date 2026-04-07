// components/bulk-import/UploadProgress.jsx
import { Loader2 } from "lucide-react";

export const UploadProgress = ({ progress, processingStep }) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin text-purple-600" />
          <span className="text-sm font-medium text-gray-600">{processingStep}</span>
        </div>
        <span className="text-sm font-bold text-purple-600">{Math.round(progress)}%</span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};