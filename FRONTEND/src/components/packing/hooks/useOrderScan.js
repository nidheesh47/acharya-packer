import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router";
import { processOrderItems, calculateScanProgress, findNextItemToScan, getScannedItems } from "../utils/scanUtils";
import { SOUND_OPTIONS, BACKGROUND_THEMES } from "../constants/scanConstants";

const API_BASE = import.meta.env.VITE_APP_URL;

export function useOrderScan() {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const scanTimeoutRef = useRef(null);
  const refreshTriggeredRef = useRef(false);
  const audioRef = useRef(null);
  
  const [input, setInput] = useState("");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [scanHistory, setScanHistory] = useState([]);
  const [scanMode, setScanMode] = useState("order");
  const [admin, setAdmin] = useState(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);
  const [nextItemToScan, setNextItemToScan] = useState(null);
  const [scannedItems, setScannedItems] = useState([]);
  const [showThemeModal, setShowThemeModal] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('serene');
  const [expandedBundles, setExpandedBundles] = useState({});
  const [showSoundModal, setShowSoundModal] = useState(false);
  const [selectedSounds, setSelectedSounds] = useState(null);
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showNewScanConfirm, setShowNewScanConfirm] = useState(false);
  const [showDashboardConfirm, setShowDashboardConfirm] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const theme = BACKGROUND_THEMES[currentTheme] || BACKGROUND_THEMES.serene;

  const playSound = useCallback((type) => {
    if (!soundEnabled || !audioRef.current || !selectedSounds) return;
    const soundId = selectedSounds[type];
    const sound = SOUND_OPTIONS[type]?.find(s => s.id === soundId);
    if (sound) {
      try { 
        audioRef.current.src = sound.url; 
        audioRef.current.volume = 0.5; 
        audioRef.current.play().catch(() => {}); 
      } catch {}
    }
  }, [soundEnabled, selectedSounds]);

  const handleOrderLoaded = useCallback((data) => {
    refreshTriggeredRef.current = false;
    const processedItems = processOrderItems(data.order.items || []);
    const allItemsScanned = processedItems.every(i => i.is_bundle ? i.bundle_components?.every(comp => comp.fully_scanned) : i.fully_scanned);
    const trackingScanned = data.order.tracking_scan_status === "scanned";
    
    setOrder({
      order_name: data.order.order_name,
      order_scan_status: data.order.order_scan_status,
      tracking_scan_status: data.order.tracking_scan_status,
      tracking_number: data.order.tracking_number,
      carrier: data.order.carrier,
      items: processedItems,
      progress: { ...data.order.progress, items_scanned: allItemsScanned },
      raw_items: data.order.items
    });

    const expanded = {};
    processedItems.forEach(i => { if (i.is_bundle) expanded[i.sku] = true; });
    setExpandedBundles(expanded);
    setScannedItems(getScannedItems(processedItems));
    setNextItemToScan(findNextItemToScan(processedItems));
    
    if (allItemsScanned && trackingScanned) {
      setScanMode("order");
      setMessage(`✅ Order ${data.order.order_name} complete!`);
      playSound("complete");
      setCompletedOrder({ ...data.order, items: processedItems });
      setShowSuccessModal(true);
    } else if (allItemsScanned && !trackingScanned) {
      setScanMode("tracking");
      setMessage(`⚠️ All items scanned! Scan tracking label`);
      playSound("warning");
    } else {
      setScanMode("sku");
      const pending = processedItems.reduce((c, i) => c + (i.is_bundle ? (i.bundle_components?.filter(comp => !comp.fully_scanned).length || 0) : (i.fully_scanned ? 0 : 1)), 0);
      setMessage(`✅ Order ${data.order.order_name} loaded - ${scannedItems.length}/${processedItems.length} scanned, ${pending} remaining`);
      playSound("success");
    }
  }, [playSound, scannedItems.length]);

  const handleItemScanned = useCallback((data) => {
    setOrder(prev => {
      if (!prev) return prev;
      if (data.items) {
        const processed = processOrderItems(data.items);
        const allScanned = processed.every(i => i.is_bundle ? i.bundle_components?.every(c => c.fully_scanned) : i.fully_scanned);
        if (allScanned) { setScanMode("tracking"); setMessage("🎉 All items scanned! Scan tracking label"); playSound("success"); }
        else { setMessage(`✅ SKU ${data.sku} scanned`); playSound("scan"); }
        const expanded = { ...expandedBundles };
        processed.forEach(i => { if (i.is_bundle && !expanded[i.sku]) expanded[i.sku] = true; });
        setExpandedBundles(expanded);
        setScannedItems(getScannedItems(processed));
        setNextItemToScan(findNextItemToScan(processed));
        return { ...prev, items: processed, scan_status: allScanned ? "items_scanned" : "pending" };
      }
      
      let updated = [...prev.items];
      for (let i = 0; i < updated.length; i++) {
        const item = updated[i];
        if (item.is_bundle && item.bundle_components) {
          const idx = item.bundle_components.findIndex(c => c.sku === data.sku);
          if (idx !== -1) {
            const comp = { ...item.bundle_components[idx] };
            comp.scanned_qty = (comp.scanned_qty || 0) + 1;
            comp.pending_qty = Math.max(0, comp.ordered_qty - comp.scanned_qty);
            comp.fully_scanned = comp.scanned_qty >= comp.ordered_qty;
            item.bundle_components[idx] = comp;
            item.fully_scanned = item.bundle_components.every(c => c.fully_scanned);
            item.scanned_qty = item.bundle_components.filter(c => c.fully_scanned).length;
            item.pending_qty = item.bundle_components.filter(c => !c.fully_scanned).length;
            break;
          }
        } else if (item.sku === data.sku) {
          item.scanned_qty = (item.scanned_qty || 0) + 1;
          item.pending_qty = Math.max(0, item.ordered_qty - item.scanned_qty);
          item.fully_scanned = item.scanned_qty >= item.ordered_qty;
          break;
        }
      }
      
      const allScanned = updated.every(i => i.is_bundle ? i.bundle_components?.every(c => c.fully_scanned) : i.fully_scanned);
      if (allScanned) { setScanMode("tracking"); setMessage("🎉 All items scanned! Scan tracking label"); playSound("success"); }
      else { setMessage(`✅ SKU ${data.sku} scanned`); playSound("scan"); }
      
      const expanded = { ...expandedBundles };
      updated.forEach(i => { if (i.is_bundle && !expanded[i.sku]) expanded[i.sku] = true; });
      setExpandedBundles(expanded);
      setScannedItems(getScannedItems(updated));
      setNextItemToScan(findNextItemToScan(updated));
      
      return { ...prev, items: updated, scan_status: allScanned ? "items_scanned" : "pending" };
    });
  }, [playSound, expandedBundles]);

  const handleTrackingScanned = useCallback(() => {
    setOrder(prev => prev ? { ...prev, scan_status: "scanned", tracking_scan_status: "scanned" } : prev);
    setMessage("✅ Tracking scanned! Order complete");
    playSound("complete");
  }, [playSound]);

  const handleAutoScan = useCallback(async () => {
    if (!input.trim() || loading || order?.scan_status === "scanned") return;
    
    setLoading(true);
    setError("");
    setMessage("");
    
    const token = localStorage.getItem("auth_token");
    if (!token) { 
      navigate("/user/login", { replace: true }); 
      setLoading(false);
      return; 
    }
    
    let payload = {};
    if (scanMode === "order") payload = { order_barcode: input.trim() };
    else if (scanMode === "sku") payload = { sku: input.trim() };
    else if (scanMode === "tracking") payload = { tracking_number: input.trim() };
    
    try {
      const res = await fetch(`${API_BASE}/api/direct/order/scan`, {
        method: "POST", 
        headers: { 
          "Content-Type": "application/json", 
          Authorization: `Bearer ${token}` 
        }, 
        body: JSON.stringify(payload)
      });
      
      if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || `Scan failed`);
      
      const data = await res.json();
      if (!data.success) throw new Error(data.error || "Scan failed");
      
      switch(data.mode) {
        case "order_loaded": 
          handleOrderLoaded(data); 
          break;
        case "item_scanned": 
          handleItemScanned(data); 
          break;
        case "tracking_scanned": 
          handleTrackingScanned(data); 
          break;
        default: 
          throw new Error("Unknown response");
      }
      
      setInput("");
      
    } catch (err) {
      setError(err.message);
      playSound("error");
    } finally {
      setLoading(false);
    }
  }, [input, loading, order?.scan_status, scanMode, navigate, handleOrderLoaded, handleItemScanned, handleTrackingScanned, playSound]);

  // Auto-scan effect
  useEffect(() => {
    if (!input.trim()) return;
    
    if (scanTimeoutRef.current) {
      clearTimeout(scanTimeoutRef.current);
    }
    
    scanTimeoutRef.current = setTimeout(() => {
      if (input.trim() && !loading && order?.scan_status !== "scanned") {
        handleAutoScan();
      }
    }, 300);
    
    return () => {
      if (scanTimeoutRef.current) {
        clearTimeout(scanTimeoutRef.current);
      }
    };
  }, [input, loading, order?.scan_status, handleAutoScan]);

  // Refocus input after loading
  useEffect(() => {
    if (!loading && order?.scan_status !== "scanned") {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [loading, order?.scan_status]);

  const resetScanner = useCallback(() => {
    setOrder(null); 
    setInput(""); 
    setScanMode("order"); 
    setMessage(""); 
    setError("");
    setNextItemToScan(null); 
    setScannedItems([]); 
    setExpandedBundles({}); 
    refreshTriggeredRef.current = false;
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);

  const handleNewScan = useCallback(() => {
    if (order) setShowNewScanConfirm(true);
    else resetScanner();
  }, [order, resetScanner]);

  const handleDashboard = useCallback(() => {
    if (order) setShowDashboardConfirm(true);
    else navigate("/admin/dashboard");
  }, [order, navigate]);

  const handleLogout = useCallback(() => setShowLogoutConfirm(true), []);

  const toggleHeaderVisibility = useCallback(() => setIsHeaderVisible(prev => !prev), []);

  const getCompletionPercentage = useCallback(() => calculateScanProgress(order?.items), [order]);

  const toggleBundleExpand = useCallback((sku) => {
    setExpandedBundles(prev => ({ ...prev, [sku]: !prev[sku] }));
  }, []);

  // Load saved preferences
  useEffect(() => {
    const savedTheme = localStorage.getItem('scan_theme');
    if (savedTheme && BACKGROUND_THEMES[savedTheme]) setCurrentTheme(savedTheme);
    
    const savedSounds = localStorage.getItem('scan_sounds');
    if (savedSounds) {
      try {
        const parsed = JSON.parse(savedSounds);
        if (parsed && typeof parsed === 'object') setSelectedSounds(parsed);
        else setSelectedSounds({ success: 'success1', scan: 'scan1', error: 'error1', warning: 'warning1', complete: 'complete1' });
      } catch { setSelectedSounds({ success: 'success1', scan: 'scan1', error: 'error1', warning: 'warning1', complete: 'complete1' }); }
    } else {
      setSelectedSounds({ success: 'success1', scan: 'scan1', error: 'error1', warning: 'warning1', complete: 'complete1' });
    }
  }, []);

  useEffect(() => { if (currentTheme) localStorage.setItem('scan_theme', currentTheme); }, [currentTheme]);
  useEffect(() => { if (selectedSounds) localStorage.setItem('scan_sounds', JSON.stringify(selectedSounds)); }, [selectedSounds]);

  // Auth effect
  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const adminData = localStorage.getItem("admin");
    if (!token) { navigate("/user/login", { replace: true }); return; }
    if (adminData) {
      try {
        const parsed = JSON.parse(adminData);
        setAdmin(parsed);
        if (parsed.role === "admin" || parsed.role === "logistics") { navigate("/unauthorized", { replace: true }); return; }
      } catch { setError("Invalid user data"); setTimeout(() => navigate("/user/login"), 2000); }
    }
    if (!audioRef.current) audioRef.current = new Audio();
  }, [navigate]);

  // Success modal effect
  useEffect(() => {
    if (order?.scan_status === "scanned" && !refreshTriggeredRef.current) {
      refreshTriggeredRef.current = true;
      const totalItems = order.items?.length || 0;
      const scannedCount = order.items?.filter(i => i.is_bundle ? i.bundle_components?.every(comp => comp.fully_scanned) : i.fully_scanned).length || 0;
      setScanHistory(prev => [{ orderId: order.order_name, timestamp: new Date().toLocaleTimeString(), items: scannedCount, totalItems }, ...prev.slice(0, 4)]);
      setCompletedOrder(order);
      setShowSuccessModal(true);
      playSound("complete");
      setTimeout(() => { setShowSuccessModal(false); resetScanner(); }, 2500);
    }
  }, [order, playSound, resetScanner]);

  return {
    input, setInput,
    order,
    loading,
    message,
    error,
    scanMode,
    admin,
    soundEnabled, setSoundEnabled,
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
  };
}