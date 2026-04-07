import { AlertCircle } from "lucide-react";

export function StatusMessage({ message, error, theme }) {
  if (!message && !error) return null;

  return (
    <div className="mt-4">
      {message && (
        <div className={`p-2 sm:p-3 rounded-xl text-xs sm:text-sm ${
          message.includes("⚠️") ? `${theme.warningBg} ${theme.warningText}` : 
          message.includes("✅") ? `${theme.successBg} ${theme.successText}` : 
          `${theme.successBg}`
        }`}>
          <span className="break-words">{message}</span>
        </div>
      )}
      {error && (
        <div className={`p-2 sm:p-3 rounded-xl text-xs sm:text-sm ${theme.errorBg} ${theme.errorText}`}>
          <AlertCircle className="h-4 w-4 inline mr-1 flex-shrink-0" />
          <span className="break-words">{error}</span>
        </div>
      )}
    </div>
  );
}