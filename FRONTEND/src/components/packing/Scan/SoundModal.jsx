import { Volume2, X, Check } from "lucide-react";
import { SOUND_OPTIONS } from "../constants/scanConstants";

export function SoundModal({ isOpen, onClose, selectedSounds, onSelectSound, audioRef, theme }) {
  if (!isOpen) return null;

  const playSoundPreview = (url) => {
    if (audioRef.current) {
      audioRef.current.src = url;
      audioRef.current.play().catch(() => {});
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className={`bg-gradient-to-r from-${theme.accentColor}-600 to-${theme.accentColor}-700 p-4 flex justify-between`}>
          <h3 className="text-xl font-bold text-white flex items-center">
            <Volume2 className="h-5 w-5 mr-2" />
            Choose Scan Sounds
          </h3>
          <button onClick={onClose} className="text-white/80 hover:text-white">
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {Object.entries(SOUND_OPTIONS).map(([cat, sounds]) => (
            <div key={cat} className="border-b border-gray-200 pb-4 mb-4 last:border-0">
              <h4 className="text-lg font-semibold text-gray-800 capitalize mb-3">
                {cat} Sounds
              </h4>
              <div className="grid grid-cols-1 gap-2">
                {sounds.map(sound => {
                  const Icon = sound.icon;
                  const selected = selectedSounds?.[cat] === sound.id;
                  return (
                    <button
                      key={sound.id}
                      onClick={() => {
                        onSelectSound(cat, sound.id);
                        playSoundPreview(sound.url);
                      }}
                      className={`flex justify-between p-3 rounded-xl border-2 ${
                        selected ? 'border-purple-500 bg-purple-50' : 'border-gray-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`h-5 w-5 ${selected ? 'text-purple-600' : 'text-gray-500'}`} />
                        <span className={selected ? 'text-purple-700' : 'text-gray-700'}>
                          {sound.name}
                        </span>
                      </div>
                      {selected && <Check className="h-5 w-5 text-purple-600" />}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}