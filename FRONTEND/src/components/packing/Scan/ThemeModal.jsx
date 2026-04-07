import { Palette, X, Check, Sun, Moon, Sunset, Waves, Leaf, Mountain, Heart, Sparkles } from "lucide-react";
import { BACKGROUND_THEMES } from "../constants/scanConstants";

const iconMap = {
  Sun: Sun,
  Moon: Moon,
  Sunset: Sunset,
  Waves: Waves,
  Leaf: Leaf,
  Mountain: Mountain,
  Heart: Heart,
  Sparkles: Sparkles
};

export function ThemeModal({ isOpen, onClose, currentTheme, onSelectTheme }) {
  if (!isOpen) return null;

  const ThemeIcon = ({ iconName }) => {
    const Icon = iconMap[iconName] || Sun;
    return <Icon className="h-6 w-6" />;
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex justify-between">
          <h3 className="text-xl font-bold text-white flex items-center">
            <Palette className="h-5 w-5 mr-2" />
            Choose Theme
          </h3>
          <button onClick={onClose} className="text-white/80 hover:text-white">
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(BACKGROUND_THEMES).map(([key, t]) => (
              <button
                key={key}
                onClick={() => {
                  onSelectTheme(key);
                  onClose();
                }}
                className={`relative overflow-hidden rounded-xl ${currentTheme === key ? 'ring-4 ring-blue-500' : ''}`}
              >
                <div className={`h-32 ${t.bg} p-4`}>
                  <div className="flex justify-between">
                    <ThemeIcon iconName={t.iconName} />
                    <span className="text-2xl">{t.emoji}</span>
                  </div>
                  <div className="absolute bottom-2 left-2 right-2">
                    <div className={`${t.bgCard} rounded-lg p-2`}>
                      <p className={`text-xs font-medium ${t.textColor}`}>{t.name}</p>
                    </div>
                  </div>
                </div>
                {currentTheme === key && (
                  <div className="absolute top-2 right-2 bg-blue-500 rounded-full p-1">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}