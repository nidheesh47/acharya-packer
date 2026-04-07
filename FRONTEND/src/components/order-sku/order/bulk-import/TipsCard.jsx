import { Sparkles, Check } from "lucide-react";

export function TipsCard() {
  const tips = [
    "Use the exact column names as in the template",
    "Don't modify the header row",
    "Keep date formats consistent (YYYY-MM-DD)",
    "Ensure SKUs exist in your catalog"
  ];

  return (
    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-6 shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="h-5 w-5 text-yellow-300" />
        <h3 className="text-white font-bold">Pro Tips</h3>
      </div>
      <ul className="space-y-3">
        {tips.map((tip, index) => (
          <li key={index} className="flex items-start gap-2 text-sm text-white/90">
            <Check className="h-4 w-4 text-green-300 mt-0.5 flex-shrink-0" />
            <span>{tip}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}