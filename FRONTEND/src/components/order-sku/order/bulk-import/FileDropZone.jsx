import { Upload, FileText, RefreshCw } from "lucide-react";

export function FileDropZone({ 
  file, 
  dragActive, 
  onDragEnter, 
  onDragLeave, 
  onDragOver, 
  onDrop, 
  onFileSelect 
}) {
  return (
    <div
      className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
        dragActive
          ? "border-purple-500 bg-purple-50"
          : file
          ? "border-purple-300 bg-purple-50"
          : "border-gray-300 hover:border-purple-400 hover:bg-gray-50"
      }`}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <div className="max-w-xs mx-auto">
        <div className={`p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center ${
          file 
            ? "bg-gradient-to-r from-purple-500 to-indigo-500"
            : "bg-purple-100"
        }`}>
          {file ? (
            <FileText className="h-8 w-8 text-white" />
          ) : (
            <Upload className="h-8 w-8 text-purple-600" />
          )}
        </div>
        
        <p className="font-medium text-gray-800 mb-2">
          {file ? file.name : "Drop your file here or click to browse"}
        </p>
        {file && (
          <p className="text-sm text-gray-500 mb-4">
            {(file.size / 1024).toFixed(1)} KB • Ready to upload
          </p>
        )}
        {!file && (
          <p className="text-sm text-gray-500 mb-4">
            CSV, XLS, or XLSX files (max 10MB)
          </p>
        )}
        
        <label
          htmlFor="file-upload"
          className={`cursor-pointer inline-flex items-center gap-2 px-6 py-3 font-medium rounded-lg transition-all shadow-sm ${
            file
              ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
              : "bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:from-purple-600 hover:to-indigo-600"
          }`}
        >
          {file ? (
            <>
              <RefreshCw className="h-4 w-4" />
              Change File
            </>
          ) : (
            <>
              <Upload className="h-4 w-4" />
              Choose File
            </>
          )}
        </label>
        <input
          id="file-upload"
          type="file"
          accept=".csv,.xls,.xlsx"
          onChange={(e) => onFileSelect(e.target.files[0])}
          className="hidden"
        />
      </div>
    </div>
  );
}