import { ShieldCheck, Key, Mail, Lock } from "lucide-react";

export function InfoCard() {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
      <div className="flex items-start gap-4">
        <div className="p-2.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg shadow-sm">
          <ShieldCheck className="h-5 w-5 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-blue-800 mb-2">Secure Account Creation</h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-2 text-sm text-blue-700">
              <Key className="h-4 w-4" />
              <span>Auto-generated secure password</span>
            </li>
            <li className="flex items-center gap-2 text-sm text-blue-700">
              <Mail className="h-4 w-4" />
              <span>Credentials sent via encrypted email</span>
            </li>
            <li className="flex items-center gap-2 text-sm text-blue-700">
              <Lock className="h-4 w-4" />
              <span>Password change required on first login</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}