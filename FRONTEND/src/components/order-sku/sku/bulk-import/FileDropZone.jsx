// components/bulk-import/FileDropZone.jsx
import { UploadCloud, CheckCircle, RefreshCcw, Upload } from "lucide-react";
import { formatFileSize } from "../utils/fileUtils";

export const FileDropZone = ({
  file,
  dragActive,
  onDragEnter,
  onDragLeave,
  onDragOver,
  onDrop,
  onFileSelect,
  fileInputRef
}) => {
  return (
    <div
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onClick={() => fileInputRef.current?.click()}
      className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 cursor-pointer ${
        dragActive
          ? "border-purple-500 bg-purple-50"
          : file
          ? "border-green-400 bg-green-50"
          : "border-gray-300 hover:border-purple-400 hover:bg-gray-50"
      }`}
    >
      <div className="max-w-xs mx-auto">
        <div className={`p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center ${
          file 
            ? "bg-gradient-to-r from-green-500 to-emerald-500"
            : "bg-purple-100"
        }`}>
          {file ? (
            <CheckCircle className="h-8 w-8 text-white" />
          ) : (
            <UploadCloud className="h-8 w-8 text-purple-600" />
          )}
        </div>
        
        <p className="font-medium text-gray-800 mb-2">
          {file ? file.name : "Drop your file here or click to browse"}
        </p>
        {file && (
          <p className="text-sm text-gray-500 mb-4">
            {formatFileSize(file.size)} • {file.name.split('.').pop().toUpperCase()}
          </p>
        )}
        {!file && (
          <p className="text-sm text-gray-500 mb-4">
            CSV, XLS, or XLSX files (max 100MB)
          </p>
        )}
        
        <div
          className={`cursor-pointer inline-flex items-center gap-2 px-6 py-3 font-medium rounded-lg transition-all shadow-sm ${
            file
              ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
              : "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700"
          }`}
        >
          {file ? (
            <>
              <RefreshCcw className="h-4 w-4" />
              Change File
            </>
          ) : (
            <>
              <Upload className="h-4 w-4" />
              Choose File
            </>
          )}
        </div>
        <input
          id="file-upload"
          ref={fileInputRef}
          type="file"
          accept=".csv,.xls,.xlsx"
          onChange={onFileSelect}
          className="hidden"
        />
      </div>
    </div>
  );
};