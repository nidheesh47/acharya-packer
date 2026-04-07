// components/change-password/PasswordRequirements.jsx
export const PasswordRequirements = ({ requirements }) => {
  const reqList = [
    { key: "length", text: "8+ characters" },
    { key: "uppercase", text: "Uppercase" },
    { key: "lowercase", text: "Lowercase" },
    { key: "number", text: "Number" },
    { key: "special", text: "Special character (!@#$%^&*)" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 text-xs mt-2 sm:mt-3">
      {reqList.map((req) => (
        <div
          key={req.key}
          className={`flex items-center gap-1.5 sm:gap-2 ${
            requirements[req.key] ? "text-green-600" : "text-gray-400"
          }`}
        >
          <div
            className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full ${
              requirements[req.key] ? "bg-green-500" : "bg-gray-300"
            }`}
          />
          <span className="text-xs">{req.text}</span>
        </div>
      ))}
    </div>
  );
};