import { Menu, Maximize2, Minimize2 } from "lucide-react";

export function ControlButtons({ isFullscreen, onToggleFullscreen, onToggleHeader, isHeaderVisible }) {
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    onToggleFullscreen();
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex gap-2">
      <button 
        onClick={onToggleHeader} 
        className="p-2 rounded-lg bg-white/20 border border-white/30 text-white shadow-lg" 
        title={isHeaderVisible ? "Hide Header" : "Show Header"}
      >
        <Menu className="h-5 w-5" />
      </button>
      <button 
        onClick={toggleFullscreen} 
        className="p-2 rounded-lg bg-white/20 border border-white/30 text-white shadow-lg"
      >
        {isFullscreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
      </button>
    </div>
  );
}