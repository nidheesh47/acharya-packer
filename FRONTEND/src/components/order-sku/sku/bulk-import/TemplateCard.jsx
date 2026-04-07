// components/bulk-import/TemplateCard.jsx
import { FileText, Download, ExternalLink, AlertTriangle } from "lucide-react";
import { BundleFormatExample } from "./BundleFormatExample";

const TEMPLATE_URL = "https://docs.google.com/spreadsheets/d/169TnbHtfi8WQq2z5JChE4ZXGxGoXAmxUkeI7Mmz7jVQ/edit";

export const TemplateCard = () => {
  const notes = [
    "Keep column headers unchanged",
    "SKU codes must be unique",
    "Product name is required",
    "Maximum file size: 100MB",
    "Supported: CSV, XLS, XLSX"
  ];

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl">
            <FileText className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-gray-800">Template & Guidelines</h3>
            <p className="text-xs text-gray-500">Follow the format for best results</p>
          </div>
        </div>

        <a
          href={TEMPLATE_URL}
          target="_blank"
          rel="noreferrer"
          className="group block mb-4"
        >
          <div className="bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg p-4 transition-all duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <Download className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Download Template</p>
                  <p className="text-xs text-gray-500">CSV / Excel format</p>
                </div>
              </div>
              <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
            </div>
          </div>
        </a>

        <BundleFormatExample />

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg">
              <AlertTriangle className="h-4 w-4 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-amber-800 text-sm mb-2">Important Notes</p>
              <ul className="space-y-1.5">
                {notes.map((note, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-amber-700">
                    <div className="w-1 h-1 bg-amber-500 rounded-full mt-1.5"></div>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};