// components/change-password/PasswordStrengthMeter.jsx
export const PasswordStrengthMeter = ({ 
  strength, 
  getStrengthColor, 
  getStrengthText,
  getStrengthBgColor 
}) => {
  if (strength === 0) return null;

  return (
    <div className="space-y-2 sm:space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-gray-600">Password Strength</span>
        <span className={`text-xs font-bold ${getStrengthBgColor()}`}>
          {getStrengthText()}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2 overflow-hidden">
        <div
          className={`h-1.5 sm:h-2 rounded-full ${getStrengthColor()} transition-all duration-500`}
          style={{ width: `${(strength / 5) * 100}%` }}
        />
      </div>
    </div>
  );
};