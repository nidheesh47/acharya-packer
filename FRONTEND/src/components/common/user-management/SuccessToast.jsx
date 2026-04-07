import { CheckCircle } from "lucide-react";

export function SuccessToast({ message }) {
  return (
    <div className="fixed top-16 sm:top-20 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-[90%] sm:max-w-md px-2 sm:px-4">
      <div className="bg-green-50 border-l-4 border-green-500 rounded-lg sm:rounded-xl shadow-xl p-3 sm:p-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="p-1 sm:p-1.5 bg-green-100 rounded-lg">
            <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
          </div>
          <p className="text-sm sm:text-base text-green-800 font-medium">{message}</p>
        </div>
      </div>
    </div>
  );
}