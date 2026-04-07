import { useOrderScan } from "../hooks/useOrderScan";
import { ControlButtons } from "./ControlButtons";
import { ScanHeader } from "./ScanHeader";
import { PendingItemsPanel } from "./PendingItemsPanel";
import { CurrentScanArea } from "./CurrentScanArea";
import { CompletedItemsPanel } from "./CompletedItemsPanel";
import { EmptyState } from "./EmptyState";
import { RecentScans } from "./RecentScans";
import { SuccessModal } from "./SuccessModal";
import { ConfirmationModal } from "./ConfirmationModal";
import { SoundModal } from "./SoundModal";
import { ThemeModal } from "./ThemeModal";
import { RefreshCw, LayoutDashboard, LogOut } from "lucide-react";

export default function OrderScanPage() {
  const {
    input, setInput,
    order,
    loading,
    message,
    error,
    scanMode,
    admin,
    showSuccessModal, setShowSuccessModal,
    completedOrder,
    nextItemToScan,
    scannedItems,
    showThemeModal, setShowThemeModal,
    currentTheme, setCurrentTheme,
    expandedBundles, setExpandedBundles,
    showSoundModal, setShowSoundModal,
    selectedSounds, setSelectedSounds,
    isHeaderVisible, setIsHeaderVisible,
    isFullscreen, setIsFullscreen,
    showNewScanConfirm, setShowNewScanConfirm,
    showDashboardConfirm, setShowDashboardConfirm,
    showLogoutConfirm, setShowLogoutConfirm,
    theme,
    inputRef,
    audioRef,
    handleAutoScan,
    resetScanner,
    handleNewScan,
    handleDashboard,
    handleLogout,
    toggleHeaderVisibility,
    getCompletionPercentage,
    toggleBundleExpand
  } = useOrderScan();

  const handleSoundSelect = (category, soundId) => {
    setSelectedSounds(prev => ({ ...prev, [category]: soundId }));
  };

  if (!selectedSounds) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500">
        <div className="bg-white/90 p-8 rounded-2xl">
          <Loader2 className="h-12 w-12 animate-spin text-purple-600 mx-auto" />
          <p className="text-gray-700 mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen w-full ${theme.bg}`}>
      <SuccessModal
        completedOrder={completedOrder}
        scannedItems={scannedItems}
        theme={theme}
        onClose={() => setShowSuccessModal(false)}
        onNewScan={resetScanner}
      />

      <ConfirmationModal
        isOpen={showNewScanConfirm}
        onClose={() => setShowNewScanConfirm(false)}
        onConfirm={resetScanner}
        title="Start New Scan"
        message="Current progress will be cleared."
        icon={RefreshCw}
        theme={theme}
      />

      <ConfirmationModal
        isOpen={showDashboardConfirm}
        onClose={() => setShowDashboardConfirm(false)}
        onConfirm={handleDashboard}
        title="Go to Dashboard"
        message="Progress will be saved."
        icon={LayoutDashboard}
        theme={theme}
      />

      <ConfirmationModal
        isOpen={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
        onConfirm={handleLogout}
        title="Logout"
        message="Unsaved progress will be lost."
        icon={LogOut}
        theme={theme}
      />

      <ThemeModal
        isOpen={showThemeModal}
        onClose={() => setShowThemeModal(false)}
        currentTheme={currentTheme}
        onSelectTheme={setCurrentTheme}
      />

      <SoundModal
        isOpen={showSoundModal}
        onClose={() => setShowSoundModal(false)}
        selectedSounds={selectedSounds}
        onSelectSound={handleSoundSelect}
        audioRef={audioRef}
        theme={theme}
      />

      <ControlButtons
        isFullscreen={isFullscreen}
        onToggleFullscreen={setIsFullscreen}
        onToggleHeader={toggleHeaderVisibility}
        isHeaderVisible={isHeaderVisible}
      />

      <ScanHeader
        admin={admin}
        theme={theme}
        onShowSoundModal={() => setShowSoundModal(true)}
        onNewScan={handleNewScan}
        onDashboard={handleDashboard}
        onLogout={handleLogout}
        isHeaderVisible={isHeaderVisible}
      />

      <div className={`w-full min-h-screen ${isHeaderVisible ? 'pt-14 sm:pt-16 md:pt-20' : 'pt-0'}`}>
        <div className="p-2 sm:p-3 md:p-4">
          {order ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4">
              <div className="lg:col-span-3 order-2 lg:order-1">
                <PendingItemsPanel
                  items={order.items}
                  expandedBundles={expandedBundles}
                  onToggleBundle={toggleBundleExpand}
                  theme={theme}
                />
              </div>

              <div className="lg:col-span-6 order-1 lg:order-2">
                <CurrentScanArea
                  order={order}
                  inputRef={inputRef}
                  input={input}
                  onInputChange={setInput}
                  scanMode={scanMode}
                  nextItemToScan={nextItemToScan}
                  loading={loading}
                  message={message}
                  error={error}
                  theme={theme}
                  getCompletionPercentage={getCompletionPercentage}
                  onManualInput={() => {
                    const val = prompt(scanMode === "order" ? "Enter Order Barcode:" : scanMode === "tracking" ? "Enter Tracking Number:" : "Enter Product SKU:");
                    if (val) setInput(val);
                  }}
                  onScan={handleAutoScan}
                />
              </div>

              <div className="lg:col-span-3 order-3">
                <CompletedItemsPanel
                  scannedItems={scannedItems}
                  theme={theme}
                />
              </div>
            </div>
          ) : (
            <div>
              <EmptyState
                inputRef={inputRef}
                input={input}
                onInputChange={setInput}
                loading={loading}
                error={error}
                onScan={handleAutoScan}
                theme={theme}
              />
              <RecentScans scanHistory={[]} theme={theme} />
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .overflow-y-auto::-webkit-scrollbar { width: 3px; }
        .overflow-y-auto::-webkit-scrollbar-track { background: rgba(255,255,255,0.1); border-radius: 10px; }
        .overflow-y-auto::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.3); border-radius: 10px; }
        * { -webkit-tap-highlight-color: transparent; }
        .transition-all { transition-property: transform; transition-duration: 300ms; }
      `}</style>
    </div>
  );
}

// Import missing icon
import { Loader2 } from "lucide-react";