import { Shield, CheckCircle } from "lucide-react";

export function SecurityProtocolsCard() {
  const protocols = [
    {
      title: "Shop-Scoped Access",
      description: "User only has access to your shop's data"
    },
    {
      title: "Email Verification",
      description: "All credentials are sent via secure email"
    },
    {
      title: "One-Time Password",
      description: "First login requires password reset"
    }
  ];

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-lg font-bold text-white">Security Protocols</h3>
        </div>
        <div className="space-y-3">
          {protocols.map((protocol, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 bg-white/10 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white text-sm">{protocol.title}</p>
                <p className="text-xs text-gray-300 mt-1">{protocol.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}