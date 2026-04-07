// components/common/LoadingSpinner.jsx
export const LoadingSpinner = ({ size = "md", color = "purple" }) => {
  const sizes = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12"
  };
  
  const colors = {
    purple: "text-purple-600",
    blue: "text-blue-600",
    green: "text-green-600"
  };
  
  return (
    <div className="flex justify-center items-center">
      <div className={`animate-spin rounded-full border-b-2 ${sizes[size]} ${colors[color]}`} />
    </div>
  );
};