import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import {
  Package,
  CheckCircle,
  XCircle,
  RefreshCw,
  Barcode,
  Zap,
  Clock,
  Loader2,
  Scan,
  Check,
  ShoppingCart,
  Eye,
  Grid,
  List,
  Hash,
  Filter,
  MousePointer,
  BarChart,
  Maximize2,
  Minimize2,
  ChevronDown,
  ArrowDown,
  Truck,
  QrCode,
  AlertCircle,
  ArrowRight,
  Tag,
  Box,
  AlertTriangle,
  Info,
  SkipForward,
  Home,
  Shield,
  User,
  LogOut,
  Layers,
  ChevronRight,
  Volume2,
  VolumeX,
  Award,
  LayoutDashboard,
  Sparkles,
  Palette,
  Sun,
  Moon,
  Sunset,
  Waves,
  Leaf,
  Mountain,
  Heart,
  X,
  Layers as BundleIcon,
  Grid3x3,
  Music,
  Music2,
  Volume1,
  VolumeX as VolumeMute,
  Menu,
  HelpCircle,
} from "lucide-react";

const API_BASE = import.meta.env.VITE_APP_URL;

// Sound options
const SOUND_OPTIONS = {
  success: [
    {
      id: "success1",
      name: "Success Chime",
      url: "https://cdn.jsdelivr.net/gh/AcharyaIT/Sound-Effect-Scan-page@main/success-Sounds/freesound_community-success-48018.mp3",
      icon: Music,
    },
    {
      id: "success2",
      name: "Happy Bell",
      url: "https://cdn.jsdelivr.net/gh/AcharyaIT/Sound-Effect-Scan-page@main/success-Sounds/freesound_community-success-fanfare-trumpets-6185.mp3",
      icon: Music2,
    },
    {
      id: "success3",
      name: "Triumph",
      url: "https://cdn.jsdelivr.net/gh/AcharyaIT/Sound-Effect-Scan-page@main/success-Sounds/mrstokes302-success-videogame-sfx-423626.mp3",
      icon: Volume1,
    },
  ],
  scan: [
    {
      id: "scan1",
      name: "Beep",
      url: "https://cdn.jsdelivr.net/gh/AcharyaIT/Sound-Effect-Scan-page@main/scan-Sounds/edr-percussive-wave-01-471672.mp3",
      icon: Music,
    },
    {
      id: "scan2",
      name: "Click",
      url: "https://cdn.jsdelivr.net/gh/AcharyaIT/Sound-Effect-Scan-page@main/scan-Sounds/freesound_community-doorscan-102283.mp3",
      icon: Music2,
    },
    {
      id: "scan3",
      name: "Pip",
      url: "https://cdn.jsdelivr.net/gh/AcharyaIT/Sound-Effect-Scan-page@main/scan-Sounds/freesound_community-prompt-user-for-response-85808.mp3",
      icon: Volume1,
    },
  ],
  error: [
    {
      id: "error1",
      name: "Buzz",
      url: "https://cdn.jsdelivr.net/gh/AcharyaIT/Sound-Effect-Scan-page@main/error-Sounds/freesound_community-windows-error-sound-effect-35894.mp3",
      icon: Music,
    },
    {
      id: "error2",
      name: "Error Tone",
      url: "https://cdn.jsdelivr.net/gh/AcharyaIT/Sound-Effect-Scan-page@main/error-Sounds/u_8iuwl7zrk0-error-170796.mp3",
      icon: Music2,
    },
    {
      id: "error3",
      name: "Failed",
      url: "https://cdn.jsdelivr.net/gh/AcharyaIT/Sound-Effect-Scan-page@main/error-Sounds/universfield-error-011-352286.mp3",
      icon: Volume1,
    },
  ],
  warning: [
    {
      id: "warning1",
      name: "Alert",
      url: "https://cdn.jsdelivr.net/gh/AcharyaIT/Sound-Effect-Scan-page@main/warning-Sounds/freesound_community-beep-warning-6387.mp3",
      icon: Music,
    },
    {
      id: "warning2",
      name: "Caution",
      url: "https://cdn.jsdelivr.net/gh/AcharyaIT/Sound-Effect-Scan-page@main/warning-Sounds/freesound_community-warning-sound-6686.mp3",
      icon: Music2,
    },
    {
      id: "warning3",
      name: "Notice",
      url: "https://cdn.jsdelivr.net/gh/AcharyaIT/Sound-Effect-Scan-page@main/warning-Sounds/ribhavagrawal-horror-warning-230511.mp3",
      icon: Volume1,
    },
  ],
  complete: [
    {
      id: "complete1",
      name: "Fanfare",
      url: "https://cdn.jsdelivr.net/gh/AcharyaIT/Sound-Effect-Scan-page@main/complete-Sounds/36505577-smooth-completed-notify-274735.mp3",
      icon: Music,
    },
    {
      id: "complete2",
      name: "Celebration",
      url: "https://cdn.jsdelivr.net/gh/AcharyaIT/Sound-Effect-Scan-page@main/complete-Sounds/36505577-smooth-completed-notify-starting-alert-274739.mp3",
      icon: Music2,
    },
    {
      id: "complete3",
      name: "Success Fanfare",
      url: "https://cdn.jsdelivr.net/gh/AcharyaIT/Sound-Effect-Scan-page@main/complete-Sounds/freesound_community-level-win-6416.mp3",
      icon: Volume1,
    },
  ],
};

// Static gradient mapping for Tailwind (fixes the white background issue)
const ACCENT_GRADIENTS = {
  blue: {
    bg: "from-blue-100 to-blue-300",
    button: "from-blue-100 to-blue-400",
    solid: "from-blue-500 to-blue-600",
    light: "from-blue-400 to-blue-500",
  },
  orange: {
    bg: "from-orange-100 to-orange-300",
    button: "from-orange-100 to-orange-400",
    solid: "from-orange-500 to-orange-600",
    light: "from-orange-400 to-orange-500",
  },
  green: {
    bg: "from-green-100 to-green-300",
    button: "from-green-100 to-green-400",
    solid: "from-green-500 to-green-600",
    light: "from-green-400 to-green-500",
  },
  indigo: {
    bg: "from-indigo-100 to-indigo-300",
    button: "from-indigo-100 to-indigo-400",
    solid: "from-indigo-500 to-indigo-600",
    light: "from-indigo-400 to-indigo-500",
  },
  cyan: {
    bg: "from-cyan-100 to-cyan-300",
    button: "from-cyan-100 to-cyan-400",
    solid: "from-cyan-500 to-cyan-600",
    light: "from-cyan-400 to-cyan-500",
  },
};

const BACKGROUND_THEMES = {
  serene: {
    name: "Serene Blue",
    bg: "bg-gradient-to-br from-blue-400 via-indigo-300 to-purple-300",
    textColor: "text-gray-800",
    textMuted: "text-gray-600",
    bgCard: "bg-white/90",
    borderColor: "border-white/50",
    accentColor: "blue",
    emoji: "🌊",
    iconName: "Waves",
    successBg: "bg-green-500/20",
    successBorder: "border-green-500/30",
    successText: "text-green-700",
    warningBg: "bg-yellow-500/20",
    warningText: "text-yellow-700",
    errorBg: "bg-red-500/20",
    errorText: "text-red-700",
    scannedBg: "bg-green-500/20",
    scannedText: "text-green-700",
    scannedCodeBg: "bg-green-500/30",
  },
  sunset: {
    name: "Golden Sunset",
    bg: "bg-gradient-to-br from-orange-300 via-pink-300 to-purple-400",
    textColor: "text-gray-800",
    textMuted: "text-gray-700",
    bgCard: "bg-white/90",
    borderColor: "border-white/50",
    accentColor: "orange",
    emoji: "🌅",
    iconName: "Sunset",
    successBg: "bg-green-500/20",
    successBorder: "border-green-500/30",
    successText: "text-green-700",
    warningBg: "bg-yellow-500/20",
    warningText: "text-yellow-700",
    errorBg: "bg-red-500/20",
    errorText: "text-red-700",
    scannedBg: "bg-green-500/20",
    scannedText: "text-green-700",
    scannedCodeBg: "bg-green-500/30",
  },
  forest: {
    name: "Forest Mist",
    bg: "bg-gradient-to-br from-green-400 via-emerald-300 to-teal-400",
    textColor: "text-gray-800",
    textMuted: "text-gray-700",
    bgCard: "bg-white/90",
    borderColor: "border-white/50",
    accentColor: "green",
    emoji: "🌳",
    iconName: "Leaf",
    successBg: "bg-green-600/20",
    successBorder: "border-green-600/30",
    successText: "text-green-800",
    warningBg: "bg-yellow-600/20",
    warningText: "text-yellow-800",
    errorBg: "bg-red-600/20",
    errorText: "text-red-800",
    scannedBg: "bg-green-600/20",
    scannedText: "text-green-800",
    scannedCodeBg: "bg-green-600/30",
  },
  midnight: {
    name: "Midnight Calm",
    bg: "bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800",
    textColor: "text-white",
    textMuted: "text-gray-200",
    bgCard: "bg-gray-900/80",
    borderColor: "border-white/20",
    accentColor: "indigo",
    emoji: "🌙",
    iconName: "Moon",
    successBg: "bg-green-500/30",
    successBorder: "border-green-400/40",
    successText: "text-green-200",
    warningBg: "bg-yellow-500/30",
    warningText: "text-yellow-200",
    errorBg: "bg-red-500/30",
    errorText: "text-red-200",
    scannedBg: "bg-green-500/30",
    scannedText: "text-green-200",
    scannedCodeBg: "bg-green-500/40",
  },
  ocean: {
    name: "Deep Ocean",
    bg: "bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-700",
    textColor: "text-white",
    textMuted: "text-gray-200",
    bgCard: "bg-gray-900/80",
    borderColor: "border-white/20",
    accentColor: "cyan",
    emoji: "🌊",
    iconName: "Waves",
    successBg: "bg-green-400/30",
    successBorder: "border-green-300/40",
    successText: "text-green-100",
    warningBg: "bg-yellow-400/30",
    warningText: "text-yellow-100",
    errorBg: "bg-red-400/30",
    errorText: "text-red-100",
    scannedBg: "bg-green-400/30",
    scannedText: "text-green-100",
    scannedCodeBg: "bg-green-400/40",
  },
};

export default function OrderScanPage() {
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
  const [currentTheme, setCurrentTheme] = useState("serene");
  const [expandedBundles, setExpandedBundles] = useState({});
  const [showSoundModal, setShowSoundModal] = useState(false);
  const [selectedSounds, setSelectedSounds] = useState(null);
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const [showNewScanConfirm, setShowNewScanConfirm] = useState(false);
  const [showDashboardConfirm, setShowDashboardConfirm] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // Fullscreen
  useEffect(() => {
    const enableFullscreen = () => {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      }
    };
    enableFullscreen();
    const handleFullscreenChange = () =>
      setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  // Load saved preferences
  useEffect(() => {
    const savedTheme = localStorage.getItem("scan_theme");
    if (savedTheme && BACKGROUND_THEMES[savedTheme])
      setCurrentTheme(savedTheme);

    const savedSounds = localStorage.getItem("scan_sounds");
    if (savedSounds) {
      try {
        const parsed = JSON.parse(savedSounds);
        if (parsed && typeof parsed === "object") setSelectedSounds(parsed);
        else
          setSelectedSounds({
            success: "success1",
            scan: "scan1",
            error: "error1",
            warning: "warning1",
            complete: "complete1",
          });
      } catch {
        setSelectedSounds({
          success: "success1",
          scan: "scan1",
          error: "error1",
          warning: "warning1",
          complete: "complete1",
        });
      }
    } else {
      setSelectedSounds({
        success: "success1",
        scan: "scan1",
        error: "error1",
        warning: "warning1",
        complete: "complete1",
      });
    }
  }, []);

  useEffect(() => {
    if (currentTheme) localStorage.setItem("scan_theme", currentTheme);
  }, [currentTheme]);
  useEffect(() => {
    if (selectedSounds)
      localStorage.setItem("scan_sounds", JSON.stringify(selectedSounds));
  }, [selectedSounds]);

  const theme = BACKGROUND_THEMES[currentTheme] || BACKGROUND_THEMES.serene;
  const gradient = ACCENT_GRADIENTS[theme.accentColor] || ACCENT_GRADIENTS.blue;

  // Auth check
  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const adminData = localStorage.getItem("admin");
    if (!token) {
      navigate("/user/login", { replace: true });
      return;
    }
    if (adminData) {
      try {
        const parsed = JSON.parse(adminData);
        setAdmin(parsed);
        if (parsed.role === "admin" || parsed.role === "logistics") {
          navigate("/unauthorized", { replace: true });
          return;
        }
      } catch {
        setError("Invalid user data");
        setTimeout(() => navigate("/user/login"), 2000);
      }
    }
    checkActiveOrderProgress();
    if (!audioRef.current) audioRef.current = new Audio();
  }, [navigate]);

  useEffect(() => {
    if (order?.scan_status === "scanned") inputRef.current?.blur();
    else inputRef.current?.focus();
    return () => {
      if (scanTimeoutRef.current) clearTimeout(scanTimeoutRef.current);
    };
  }, [order, loading, scanMode]);

  useEffect(() => {
    if (!input.trim()) return;
    if (scanTimeoutRef.current) clearTimeout(scanTimeoutRef.current);
    scanTimeoutRef.current = setTimeout(() => {
      if (input.trim() && !loading && order?.scan_status !== "scanned")
        handleAutoScan();
    }, 300);
    return () => {
      if (scanTimeoutRef.current) clearTimeout(scanTimeoutRef.current);
    };
  }, [input]);

  useEffect(() => {
    if (order?.scan_status === "scanned" && !refreshTriggeredRef.current) {
      refreshTriggeredRef.current = true;
      const totalItems = order.items?.length || 0;
      const scannedCount =
        order.items?.filter((i) =>
          i.is_bundle
            ? i.bundle_components?.every((comp) => comp.fully_scanned)
            : i.fully_scanned,
        ).length || 0;
      setScanHistory((prev) => [
        {
          orderId: order.order_name,
          timestamp: new Date().toLocaleTimeString(),
          items: scannedCount,
          totalItems,
        },
        ...prev.slice(0, 4),
      ]);
      setCompletedOrder(order);
      setShowSuccessModal(true);
      playSound("complete");
      setTimeout(() => {
        setShowSuccessModal(false);
        resetScanner();
      }, 2500);
    }
  }, [order]);

  async function checkActiveOrderProgress() {
    const token = localStorage.getItem("auth_token");
    if (!token) return;
    try {
      const res = await fetch(`${API_BASE}/api/packing/scan`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({}),
      });
      const data = await res.json();
      if (res.ok && data.mode === "progress_check") handleOrderLoaded(data);
    } catch {
      /* silent */
    }
  }

  const processOrderItems = (items) => {
    if (!items) return [];
    const processed = [];
    const bundleGroups = {};
    items.forEach((item) => {
      if (item.source_info?.type === "bundle_main")
        bundleGroups[item.sku] = { ...item, bundle_components: [] };
    });
    items.forEach((item) => {
      if (item.source_info?.type === "bundle_component") {
        const bundleSku = item.source_info.bundle_sku;
        if (bundleGroups[bundleSku])
          bundleGroups[bundleSku].bundle_components.push(item);
      } else if (item.source_info?.type === "regular") processed.push(item);
    });
    Object.values(bundleGroups).forEach((bundle) => {
      const allScanned = bundle.bundle_components.every((c) => c.fully_scanned);
      bundle.fully_scanned = allScanned;
      bundle.scanned_qty = bundle.bundle_components.filter(
        (c) => c.fully_scanned,
      ).length;
      bundle.pending_qty = bundle.bundle_components.filter(
        (c) => !c.fully_scanned,
      ).length;
      bundle.is_bundle = true;
      processed.push(bundle);
    });
    return processed;
  };

  function handleOrderLoaded(data) {
    refreshTriggeredRef.current = false;
    const processedItems = processOrderItems(data.order.items || []);
    const allItemsScanned = processedItems.every((i) =>
      i.is_bundle
        ? i.bundle_components?.every((comp) => comp.fully_scanned)
        : i.fully_scanned,
    );
    const trackingScanned = data.order.tracking_scan_status === "scanned";

    setOrder({
      order_name: data.order.order_name,
      order_scan_status: data.order.order_scan_status,
      tracking_scan_status: data.order.tracking_scan_status,
      tracking_number: data.order.tracking_number,
      carrier: data.order.carrier,
      items: processedItems,
      progress: { ...data.order.progress, items_scanned: allItemsScanned },
      raw_items: data.order.items,
    });

    const expanded = {};
    processedItems.forEach((i) => {
      if (i.is_bundle) expanded[i.sku] = true;
    });
    setExpandedBundles(expanded);

    const scanned = [];
    processedItems.forEach((i) => {
      if (i.is_bundle && i.bundle_components?.some((c) => c.scanned_qty > 0)) {
        scanned.push({
          ...i,
          display_qty: i.bundle_components.filter((c) => c.fully_scanned)
            .length,
          total_qty: i.bundle_components.length,
        });
      } else if (i.scanned_qty > 0) {
        scanned.push({
          ...i,
          display_qty: i.scanned_qty,
          total_qty: i.ordered_qty,
        });
      }
    });
    setScannedItems(scanned);

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
      const pending = processedItems.reduce(
        (c, i) =>
          c +
          (i.is_bundle
            ? i.bundle_components?.filter((comp) => !comp.fully_scanned)
                .length || 0
            : i.fully_scanned
              ? 0
              : 1),
        0,
      );
      setMessage(
        `✅ Order ${data.order.order_name} loaded - ${scanned.length}/${processedItems.length} scanned, ${pending} remaining`,
      );
      playSound("success");
    }
  }

  function handleItemScanned(data) {
    setOrder((prev) => {
      if (!prev) return prev;
      if (data.items) {
        const processed = processOrderItems(data.items);
        const allScanned = processed.every((i) =>
          i.is_bundle
            ? i.bundle_components?.every((c) => c.fully_scanned)
            : i.fully_scanned,
        );
        if (allScanned) {
          setScanMode("tracking");
          setMessage("🎉 All items scanned! Scan tracking label");
          playSound("success");
        } else {
          setMessage(`✅ SKU ${data.sku} scanned`);
          playSound("scan");
        }
        const expanded = { ...expandedBundles };
        processed.forEach((i) => {
          if (i.is_bundle && !expanded[i.sku]) expanded[i.sku] = true;
        });
        setExpandedBundles(expanded);
        const scanned = [];
        processed.forEach((i) => {
          if (
            i.is_bundle &&
            i.bundle_components?.some((c) => c.scanned_qty > 0)
          )
            scanned.push({
              ...i,
              display_qty: i.bundle_components.filter((c) => c.fully_scanned)
                .length,
              total_qty: i.bundle_components.length,
            });
          else if (i.scanned_qty > 0)
            scanned.push({
              ...i,
              display_qty: i.scanned_qty,
              total_qty: i.ordered_qty,
            });
        });
        setScannedItems(scanned);
        return {
          ...prev,
          items: processed,
          scan_status: allScanned ? "items_scanned" : "pending",
        };
      }

      let updated = [...prev.items];
      for (let i = 0; i < updated.length; i++) {
        const item = updated[i];
        if (item.is_bundle && item.bundle_components) {
          const idx = item.bundle_components.findIndex(
            (c) => c.sku === data.sku,
          );
          if (idx !== -1) {
            const comp = { ...item.bundle_components[idx] };
            comp.scanned_qty = (comp.scanned_qty || 0) + 1;
            comp.pending_qty = Math.max(0, comp.ordered_qty - comp.scanned_qty);
            comp.fully_scanned = comp.scanned_qty >= comp.ordered_qty;
            item.bundle_components[idx] = comp;
            item.fully_scanned = item.bundle_components.every(
              (c) => c.fully_scanned,
            );
            item.scanned_qty = item.bundle_components.filter(
              (c) => c.fully_scanned,
            ).length;
            item.pending_qty = item.bundle_components.filter(
              (c) => !c.fully_scanned,
            ).length;
            break;
          }
        } else if (item.sku === data.sku) {
          item.scanned_qty = (item.scanned_qty || 0) + 1;
          item.pending_qty = Math.max(0, item.ordered_qty - item.scanned_qty);
          item.fully_scanned = item.scanned_qty >= item.ordered_qty;
          break;
        }
      }

      const allScanned = updated.every((i) =>
        i.is_bundle
          ? i.bundle_components?.every((c) => c.fully_scanned)
          : i.fully_scanned,
      );
      if (allScanned) {
        setScanMode("tracking");
        setMessage("🎉 All items scanned! Scan tracking label");
        playSound("success");
      } else {
        setMessage(`✅ SKU ${data.sku} scanned`);
        playSound("scan");
      }

      const expanded = { ...expandedBundles };
      updated.forEach((i) => {
        if (i.is_bundle && !expanded[i.sku]) expanded[i.sku] = true;
      });
      setExpandedBundles(expanded);

      const scanned = [];
      updated.forEach((i) => {
        if (i.is_bundle && i.bundle_components?.some((c) => c.scanned_qty > 0))
          scanned.push({
            ...i,
            display_qty: i.bundle_components.filter((c) => c.fully_scanned)
              .length,
            total_qty: i.bundle_components.length,
          });
        else if (i.scanned_qty > 0)
          scanned.push({
            ...i,
            display_qty: i.scanned_qty,
            total_qty: i.ordered_qty,
          });
      });
      setScannedItems(scanned);

      return {
        ...prev,
        items: updated,
        scan_status: allScanned ? "items_scanned" : "pending",
      };
    });
  }

  function handleTrackingScanned() {
    setOrder((prev) =>
      prev
        ? { ...prev, scan_status: "scanned", tracking_scan_status: "scanned" }
        : prev,
    );
    setMessage("✅ Tracking scanned! Order complete");
    playSound("complete");
  }

  const playSound = (type) => {
    if (!soundEnabled || !audioRef.current || !selectedSounds) return;
    const soundId = selectedSounds[type];
    const sound = SOUND_OPTIONS[type]?.find((s) => s.id === soundId);
    if (sound) {
      try {
        audioRef.current.src = sound.url;
        audioRef.current.volume = 0.5;
        audioRef.current.play().catch(() => {});
      } catch {}
    }
  };

  async function handleAutoScan() {
    if (!input.trim() || loading || order?.scan_status === "scanned") return;
    setLoading(true);
    setError("");
    setMessage("");
    const token = localStorage.getItem("auth_token");
    if (!token) {
      navigate("/user/login", { replace: true });
      return;
    }

    let payload = {};
    if (scanMode === "order") payload = { order_barcode: input.trim() };
    else if (scanMode === "sku") payload = { sku: input.trim() };
    else if (scanMode === "tracking")
      payload = { tracking_number: input.trim() };

    try {
      const res = await fetch(`${API_BASE}/api/packing/scan`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok)
        throw new Error(
          (await res.json().catch(() => ({}))).error || `Scan failed`,
        );
      const data = await res.json();
      if (!data.success) throw new Error(data.error || "Scan failed");
      switch (data.mode) {
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
    } catch (err) {
      setError(err.message);
      playSound("error");
    } finally {
      setInput("");
      setLoading(false);
      if (order?.scan_status !== "scanned")
        setTimeout(() => inputRef.current?.focus(), 100);
    }
  }

  const resetScanner = () => {
    setOrder(null);
    setInput("");
    setScanMode("order");
    setMessage("");
    setError("");
    setNextItemToScan(null);
    setScannedItems([]);
    setExpandedBundles({});
    refreshTriggeredRef.current = false;
    inputRef.current?.focus();
  };

  const handleNewScan = () =>
    order ? setShowNewScanConfirm(true) : resetScanner();
  const confirmNewScan = () => {
    resetScanner();
    setShowNewScanConfirm(false);
  };
  const handleDashboard = () =>
    order ? setShowDashboardConfirm(true) : navigate("/admin/dashboard");
  const confirmDashboard = () => {
    setShowDashboardConfirm(false);
    navigate("/admin/dashboard");
  };
  const handleLogout = () => setShowLogoutConfirm(true);
  const confirmLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("admin");
    setShowLogoutConfirm(false);
    navigate("/user/login", { replace: true });
  };

  const getCompletionPercentage = () => {
    if (!order?.items?.length) return 0;
    let totalOrdered = 0,
      totalScanned = 0;
    order.items.forEach((i) => {
      if (i.is_bundle && i.bundle_components) {
        i.bundle_components.forEach((c) => {
          totalOrdered += c.ordered_qty || 0;
          totalScanned += c.scanned_qty || 0;
        });
      } else {
        totalOrdered += i.ordered_qty || 0;
        totalScanned += i.scanned_qty || 0;
      }
    });
    return Math.round((totalScanned / totalOrdered) * 100);
  };

  const handleManualInput = () => {
    const val = prompt(
      scanMode === "order"
        ? "Enter Order Barcode:"
        : scanMode === "tracking"
          ? "Enter Tracking Number:"
          : "Enter Product SKU:",
    );
    if (val) setInput(val);
  };

  const toggleBundleExpand = (sku) =>
    setExpandedBundles((prev) => ({ ...prev, [sku]: !prev[sku] }));
  const toggleHeaderVisibility = () => setIsHeaderVisible(!isHeaderVisible);

  useEffect(() => {
    if (order?.items) {
      const findNext = () => {
        for (const i of order.items) {
          if (i.is_bundle) {
            const next = i.bundle_components?.find((c) => !c.fully_scanned);
            if (next)
              return {
                ...next,
                is_part_of_bundle: true,
                bundle_name: i.product_name,
                bundle_sku: i.sku,
              };
          } else if (!i.fully_scanned) return i;
        }
        return null;
      };
      setNextItemToScan(findNext());
    } else setNextItemToScan(null);
  }, [order]);

  // Modals
  const SoundModal = () => (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={() => setShowSoundModal(false)}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 flex justify-between">
          <h3 className="text-xl font-bold text-white flex items-center">
            <Volume2 className="h-5 w-5 mr-2" />
            Choose Scan Sounds
          </h3>
          <button
            onClick={() => setShowSoundModal(false)}
            className="text-white/80"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {Object.entries(SOUND_OPTIONS).map(([cat, sounds]) => (
            <div
              key={cat}
              className="border-b border-gray-200 pb-4 mb-4 last:border-0"
            >
              <h4 className="text-lg font-semibold text-gray-800 capitalize mb-3">
                {cat} Sounds
              </h4>
              <div className="grid grid-cols-1 gap-2">
                {sounds.map((sound) => {
                  const Icon = sound.icon;
                  const selected = selectedSounds?.[cat] === sound.id;
                  return (
                    <button
                      key={sound.id}
                      onClick={() => {
                        setSelectedSounds((prev) => ({
                          ...prev,
                          [cat]: sound.id,
                        }));
                        if (audioRef.current) {
                          audioRef.current.src = sound.url;
                          audioRef.current.play().catch(() => {});
                        }
                      }}
                      className={`flex justify-between p-3 rounded-xl border-2 ${selected ? "border-purple-500 bg-purple-50" : "border-gray-200"}`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon
                          className={`h-5 w-5 ${selected ? "text-purple-600" : "text-gray-500"}`}
                        />
                        <span
                          className={
                            selected ? "text-purple-700" : "text-gray-700"
                          }
                        >
                          {sound.name}
                        </span>
                      </div>
                      {selected && (
                        <Check className="h-5 w-5 text-purple-600" />
                      )}
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

  const ThemeModal = () => {
    const ThemeIcon = ({ iconName }) => {
      switch (iconName) {
        case "Sun":
          return <Sun className="h-6 w-6" />;
        case "Moon":
          return <Moon className="h-6 w-6" />;
        case "Sunset":
          return <Sunset className="h-6 w-6" />;
        case "Waves":
          return <Waves className="h-6 w-6" />;
        case "Leaf":
          return <Leaf className="h-6 w-6" />;
        case "Mountain":
          return <Mountain className="h-6 w-6" />;
        case "Heart":
          return <Heart className="h-6 w-6" />;
        case "Sparkles":
          return <Sparkles className="h-6 w-6" />;
        default:
          return <Sun className="h-6 w-6" />;
      }
    };

    return (
      <div
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        onClick={() => setShowThemeModal(false)}
      >
        <div
          className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex justify-between">
            <h3 className="text-xl font-bold text-white flex items-center">
              <Palette className="h-5 w-5 mr-2" />
              Choose Theme
            </h3>
            <button
              onClick={() => setShowThemeModal(false)}
              className="text-white/80"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="p-6 max-h-[70vh] overflow-y-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(BACKGROUND_THEMES).map(([key, t]) => (
                <button
                  key={key}
                  onClick={() => {
                    setCurrentTheme(key);
                    setShowThemeModal(false);
                  }}
                  className={`relative overflow-hidden rounded-xl ${currentTheme === key ? "ring-4 ring-blue-500" : ""}`}
                >
                  <div className={`h-32 ${t.bg} p-4`}>
                    <div className="flex justify-between">
                      <ThemeIcon iconName={t.iconName} />
                      <span className="text-2xl">{t.emoji}</span>
                    </div>
                    <div className="absolute bottom-2 left-2 right-2">
                      <div className={`${t.bgCard} rounded-lg p-2`}>
                        <p className={`text-xs font-medium ${t.textColor}`}>
                          {t.name}
                        </p>
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
  };

  // Fixed ConfirmationModal using static gradient
  const ConfirmationModal = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    icon: Icon,
  }) => {
    if (!isOpen) return null;
    return (
      <div
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className={`bg-gradient-to-r ${gradient.bg} p-6 text-center`}>
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
              <Icon className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">{title}</h2>
            <p className="text-white/80 text-sm">{message}</p>
          </div>
          <div className="p-6 flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className={`flex-1 px-4 py-2 bg-gradient-to-r ${gradient.button} text-white rounded-lg font-medium`}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    );
  };

  const CompletedBundleItem = ({ bundle }) => (
    <div
      className={`p-2 ${theme.scannedBg} rounded-xl border ${theme.successBorder} break-words`}
    >
      <div className="flex items-center gap-2 mb-2 flex-wrap">
        <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center">
          {bundle.image_url ? (
            <img
              src={bundle.image_url}
              alt={bundle.product_name}
              className="w-full h-full object-contain p-1"
            />
          ) : (
            <BundleIcon className="h-4 w-4 text-white" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className={`text-xs font-medium ${theme.scannedText} truncate`}>
            {bundle.product_name}
          </p>
          <code
            className={`text-[8px] ${theme.scannedCodeBg} px-1 py-0.5 rounded ${theme.textMuted} break-all`}
          >
            {bundle.sku}
          </code>
        </div>
        <span
          className={`text-[10px] font-bold ${theme.scannedText} flex-shrink-0`}
        >
          {bundle.bundle_components?.filter((c) => c.fully_scanned).length || 0}
          /{bundle.bundle_components?.length || 0}
        </span>
      </div>
      <div className="ml-8 space-y-2">
        {bundle.bundle_components?.map((comp, idx) => (
          <div key={idx} className="flex items-center gap-2 flex-wrap">
            <div className="w-6 h-6 bg-white/20 rounded overflow-hidden flex-shrink-0">
              {comp.image_url ? (
                <img
                  src={comp.image_url}
                  className="w-full h-full object-contain p-0.5"
                />
              ) : (
                <Package
                  className={`w-full h-full p-1 ${comp.fully_scanned ? theme.scannedText : theme.textMuted}`}
                />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p
                className={`text-[9px] font-medium ${comp.fully_scanned ? theme.scannedText : theme.textMuted} truncate`}
              >
                {comp.product_name}
              </p>
              <div className="flex flex-wrap items-center justify-between gap-1">
                <code
                  className={`text-[7px] ${comp.fully_scanned ? theme.scannedCodeBg : theme.bgCard} px-1 py-0.5 rounded break-all`}
                >
                  {comp.sku}
                </code>
                <span
                  className={`text-[8px] font-bold ${comp.fully_scanned ? "text-green-400" : theme.textMuted} flex-shrink-0`}
                >
                  {comp.scanned_qty || 0}/{comp.ordered_qty || 1}
                </span>
              </div>
            </div>
            {comp.fully_scanned && (
              <Check className="h-3 w-3 text-green-400 flex-shrink-0" />
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const CompletedItem = ({ item }) => (
    <div
      className={`p-2 ${theme.scannedBg} rounded-xl border ${theme.successBorder} break-words`}
    >
      <div className="flex items-center gap-2 flex-wrap">
        <div className="w-10 h-10 bg-white/20 rounded-lg overflow-hidden flex-shrink-0">
          {item.image_url ? (
            <img
              src={item.image_url}
              className="w-full h-full object-contain p-1"
            />
          ) : (
            <Package className={`w-full h-full p-2 ${theme.scannedText}`} />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className={`text-xs font-medium ${theme.scannedText} truncate`}>
            {item.product_name || "Unknown"}
          </p>
          <div className="flex flex-wrap items-center justify-between gap-1 mt-1">
            <code
              className={`text-[9px] ${theme.scannedCodeBg} px-1 py-0.5 rounded ${theme.textMuted} break-all`}
            >
              {item.sku}
            </code>
            <span
              className={`text-sm font-bold ${item.display_qty === item.total_qty ? "text-green-400" : theme.scannedText} flex-shrink-0`}
            >
              {item.display_qty || 0}/{item.total_qty || 1}
            </span>
          </div>
        </div>
        {item.display_qty === item.total_qty ? (
          <Check className="h-4 w-4 text-green-400 flex-shrink-0" />
        ) : (
          <div className="h-4 w-4 rounded-full border-2 border-yellow-400 flex-shrink-0" />
        )}
      </div>
    </div>
  );

  if (!selectedSounds)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500">
        <div className="bg-white/90 p-8 rounded-2xl">
          <Loader2 className="h-12 w-12 animate-spin text-purple-600 mx-auto" />
          <p className="text-gray-700 mt-4">Loading...</p>
        </div>
      </div>
    );

  return (
    <div className={`min-h-screen w-full ${theme.bg}`}>
      {/* Success Modal (Order Complete) - Fixed gradients */}
      {showSuccessModal && completedOrder && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowSuccessModal(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-auto overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`bg-gradient-to-r ${gradient.bg} p-6 text-center`}>
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-4">
                <Award className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Order Complete!
              </h2>
              <p className="text-white/80">Successfully scanned and packed</p>
            </div>
            <div className="p-6">
              <p className="text-3xl font-bold text-center text-gray-900 mb-2 break-words">
                {completedOrder.order_name}
              </p>
              <p className="text-center text-gray-600 mb-4">
                has been completely scanned and packed
              </p>
              <div className="bg-green-50 rounded-xl p-4 mb-6">
                <div className="flex justify-between mb-2 flex-wrap gap-2">
                  <span className="text-sm text-gray-600">Items scanned:</span>
                  <span className="font-bold text-green-700">
                    {scannedItems.length}/{completedOrder.items?.length || 0}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className={`bg-gradient-to-r ${gradient.solid} h-2.5 rounded-full`}
                    style={{ width: "100%" }}
                  />
                </div>
              </div>
              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  resetScanner();
                }}
                className={`w-full py-3 bg-gradient-to-r ${gradient.solid} text-white rounded-xl font-medium`}
              >
                Start New Scan
              </button>
            </div>
          </div>
        </div>
      )}

      <ConfirmationModal
        isOpen={showNewScanConfirm}
        onClose={() => setShowNewScanConfirm(false)}
        onConfirm={confirmNewScan}
        title="Start New Scan"
        message="Current progress will be cleared."
        icon={RefreshCw}
      />
      <ConfirmationModal
        isOpen={showDashboardConfirm}
        onClose={() => setShowDashboardConfirm(false)}
        onConfirm={confirmDashboard}
        title="Go to Dashboard"
        message="Progress will be saved."
        icon={LayoutDashboard}
      />
      <ConfirmationModal
        isOpen={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
        onConfirm={confirmLogout}
        title="Logout"
        message="Unsaved progress will be lost."
        icon={LogOut}
      />
      {showThemeModal && <ThemeModal />}
      {showSoundModal && <SoundModal />}

      {/* Control Buttons */}
      <div className="fixed bottom-4 right-4 z-50 flex gap-2">
        <button
          onClick={toggleHeaderVisibility}
          className="p-2 rounded-lg bg-white/20 border border-white/30 text-white shadow-lg"
          title={isHeaderVisible ? "Hide Header" : "Show Header"}
        >
          <Menu className="h-5 w-5" />
        </button>
        <button
          onClick={toggleFullscreen}
          className="p-2 rounded-lg bg-white/20 border border-white/30 text-white shadow-lg"
        >
          {isFullscreen ? (
            <Minimize2 className="h-5 w-5" />
          ) : (
            <Maximize2 className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Header - Hidden by default */}
      <div
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isHeaderVisible ? "translate-y-0" : "-translate-y-full"}`}
      >
        <div
          className={`w-full ${theme.bgCard} border-b ${theme.borderColor} shadow-lg px-3 sm:px-4 py-2 sm:py-3`}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3">
            <div className="flex items-center gap-2 sm:gap-3">
              <div
                className={`bg-gradient-to-r from-${theme.accentColor}-400 to-${theme.accentColor}-500 p-1.5 sm:p-2 rounded-lg sm:rounded-xl`}
              >
                <Scan className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <h1
                className={`text-base sm:text-lg md:text-xl font-bold ${theme.textColor}`}
              >
                Order Packing Scanner
              </h1>
            </div>
            <div className="flex flex-wrap gap-1.5 sm:gap-2 w-full sm:w-auto">
              <button
                onClick={() => setShowSoundModal(true)}
                className={`px-2 sm:px-3 py-1 sm:py-1.5 ${theme.bgCard} ${theme.textColor} rounded-lg text-xs sm:text-sm border ${theme.borderColor}`}
              >
                <Volume2 className="h-3 w-3 sm:h-4 sm:w-4 inline mr-1" />
                Sounds
              </button>
              {admin && (
                <div
                  className={`px-2 sm:px-3 py-1 sm:py-1.5 ${theme.bgCard} rounded-lg border ${theme.borderColor}`}
                >
                  <User
                    className={`h-3 w-3 sm:h-4 sm:w-4 inline mr-1 ${theme.textMuted}`}
                  />
                  <span className={`text-xs sm:text-sm ${theme.textColor}`}>
                    {admin.name}
                  </span>
                </div>
              )}
              <button
                onClick={handleNewScan}
                className={`px-2 sm:px-3 py-1 sm:py-1.5 bg-gradient-to-r from-${theme.accentColor}-100 to-${theme.accentColor}-600 ${theme.textColor} rounded-lg text-xs sm:text-sm`}
              >
                <RefreshCw className="h-3 w-3 sm:h-4 sm:w-4 inline mr-1" />
                New
              </button>
              <button
                onClick={handleDashboard}
                className="px-2 sm:px-3 py-1 sm:py-1.5 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg text-xs sm:text-sm"
              >
                <LayoutDashboard className="h-3 w-3 sm:h-4 sm:w-4 inline mr-1" />
                Dashboard
              </button>
              <button
                onClick={handleLogout}
                className="px-2 sm:px-3 py-1 sm:py-1.5 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg text-xs sm:text-sm"
              >
                <LogOut className="h-3 w-3 sm:h-4 sm:w-4 inline mr-1" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`w-full min-h-screen ${isHeaderVisible ? "pt-14 sm:pt-16 md:pt-20" : "pt-0"}`}
      >
        <div className="p-2 sm:p-3 md:p-4">
          {order ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4">
              {/* Pending Items */}
              <div className="lg:col-span-3 order-2 lg:order-1">
                <div
                  className={`${theme.bgCard} rounded-xl shadow-2xl border ${theme.borderColor} h-auto lg:h-[calc(100vh-100px)] overflow-hidden sticky top-4`}
                >
                  <div
                    className={`bg-gradient-to-r from-${theme.accentColor}-500 to-${theme.accentColor}-600 p-2 sm:p-3`}
                  >
                    <h3 className="text-white font-bold flex items-center text-sm sm:text-base">
                      <Package className="h-4 w-4 mr-2" />
                      Pending Items
                    </h3>
                    <p className="text-white/80 text-[10px] sm:text-xs">
                      {order.items?.filter((i) =>
                        i.is_bundle
                          ? i.bundle_components?.some((c) => !c.fully_scanned)
                          : !i.fully_scanned,
                      ).length || 0}{" "}
                      left
                    </p>
                  </div>
                  <div className="overflow-y-auto max-h-[300px] sm:max-h-[400px] lg:max-h-[calc(100%-80px)] p-2 sm:p-3 space-y-2">
                    {order.items?.map((item, idx) => {
                      if (item.is_bundle) {
                        const pending =
                          item.bundle_components?.filter(
                            (c) => !c.fully_scanned,
                          ) || [];
                        const total = item.bundle_components?.length || 0;
                        const scanned =
                          item.bundle_components?.filter((c) => c.fully_scanned)
                            .length || 0;
                        if (!pending.length) return null;
                        return (
                          <div
                            key={idx}
                            className={`p-2 rounded-xl border ${theme.borderColor} ${theme.bgCard} break-words`}
                          >
                            <div
                              className="flex items-center gap-2 cursor-pointer flex-wrap"
                              onClick={() => toggleBundleExpand(item.sku)}
                            >
                              <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center flex-shrink-0">
                                {item.image_url ? (
                                  <img
                                    src={item.image_url}
                                    className="w-full h-full object-contain p-1"
                                  />
                                ) : (
                                  <BundleIcon className="h-4 w-4 text-white" />
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p
                                  className={`text-xs font-medium ${theme.textColor} truncate`}
                                >
                                  {item.product_name}
                                </p>
                                <code
                                  className={`text-[8px] ${theme.bgCard} px-1 py-0.5 rounded ${theme.textMuted} break-all`}
                                >
                                  {item.sku}
                                </code>
                              </div>
                              <span
                                className={`text-sm font-bold ${theme.textColor} flex-shrink-0`}
                              >
                                {scanned}/{total}
                              </span>
                              <ChevronRight
                                className={`h-3 w-3 ${theme.textMuted} flex-shrink-0 ${expandedBundles[item.sku] ? "rotate-90" : ""}`}
                              />
                            </div>
                            {expandedBundles[item.sku] && (
                              <div className="mt-2 space-y-1">
                                {pending.map((comp, ci) => (
                                  <div
                                    key={ci}
                                    data-sku={comp.sku}
                                    className={`p-1.5 rounded-lg border ${theme.borderColor} break-words`}
                                  >
                                    <div className="flex items-center gap-2 flex-wrap">
                                      <div className="w-6 h-6 bg-white/10 rounded overflow-hidden flex-shrink-0">
                                        {comp.image_url ? (
                                          <img
                                            src={comp.image_url}
                                            className="w-full h-full object-contain p-0.5"
                                          />
                                        ) : (
                                          <Package className="w-full h-full p-1 text-gray-400" />
                                        )}
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <p
                                          className={`text-[10px] ${theme.textColor} truncate`}
                                        >
                                          {comp.product_name}
                                        </p>
                                        <code
                                          className={`text-[7px] ${theme.bgCard} px-1 rounded break-all`}
                                        >
                                          {comp.sku}
                                        </code>
                                      </div>
                                      <span
                                        className={`text-sm font-bold ${theme.textColor} flex-shrink-0`}
                                      >
                                        {comp.scanned_qty || 0}/
                                        {comp.ordered_qty || 1}
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      } else if (!item.fully_scanned) {
                        return (
                          <div
                            key={idx}
                            data-sku={item.sku}
                            className={`p-2 rounded-xl border ${theme.borderColor} ${theme.bgCard} break-words`}
                          >
                            <div className="flex items-center gap-2 flex-wrap">
                              <div className="w-8 h-8 bg-white/10 rounded overflow-hidden flex-shrink-0">
                                {item.image_url ? (
                                  <img
                                    src={item.image_url}
                                    className="w-full h-full object-contain p-1"
                                  />
                                ) : (
                                  <Package className="w-full h-full p-1 text-gray-400" />
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p
                                  className={`text-xs font-medium ${theme.textColor} truncate`}
                                >
                                  {item.product_name || "Unknown"}
                                </p>
                                <code
                                  className={`text-[8px] ${theme.bgCard} px-1 py-0.5 rounded ${theme.textMuted} break-all`}
                                >
                                  {item.sku}
                                </code>
                              </div>
                              <span
                                className={`text-sm font-bold ${theme.textColor} flex-shrink-0`}
                              >
                                {item.scanned_qty || 0}/{item.ordered_qty || 1}
                              </span>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    })}
                    {order.items?.filter((i) =>
                      i.is_bundle
                        ? i.bundle_components?.some((c) => !c.fully_scanned)
                        : !i.fully_scanned,
                    ).length === 0 && (
                      <div className="text-center py-6">
                        <CheckCircle className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-500">
                          All items scanned!
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Current Scan Area */}
              <div className="lg:col-span-6 order-1 lg:order-2">
                <div
                  className={`${theme.bgCard} rounded-xl shadow-2xl border ${theme.borderColor} overflow-hidden`}
                >
                  <div
                    className={`bg-gradient-to-r from-${theme.accentColor}-500 to-${theme.accentColor}-500 p-3 sm:p-4`}
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3">
                      <h2 className="text-white font-bold text-sm sm:text-base break-words">
                        Order: {order.order_name}
                      </h2>
                      <div className="bg-white/20 px-2 sm:px-3 py-1 rounded-lg">
                        <span className="text-white font-bold text-xs sm:text-sm">
                          Progress: {getCompletionPercentage()}%
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2 mb-4">
                      <div
                        className={`bg-yellow-300 h-2 rounded-full`}
                        style={{ width: `${getCompletionPercentage()}%` }}
                      />
                    </div>
                    <div className="relative">
                      <input
                        ref={inputRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={
                          scanMode === "order"
                            ? "Scan order barcode..."
                            : scanMode === "tracking"
                              ? "Scan tracking label..."
                              : nextItemToScan
                                ? `Scan: ${nextItemToScan.sku}`
                                : "Scan SKU..."
                        }
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 pr-28 rounded-xl text-sm sm:text-base border-2 border-white/50 bg-white/95"
                        disabled={loading || order?.scan_status === "scanned"}
                        autoFocus
                      />
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1 sm:gap-2">
                        <button
                          onClick={handleManualInput}
                          className="px-2 sm:px-3 py-1 bg-white/20 text-white rounded-lg text-xs sm:text-sm"
                        >
                          Manual
                        </button>
                        <button
                          onClick={() => handleAutoScan()}
                          disabled={loading || !input.trim()}
                          className="px-3 sm:px-4 py-1 bg-purple-600 text-white rounded-lg text-xs sm:text-sm disabled:opacity-50"
                        >
                          {loading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            "Scan"
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="p-2 sm:p-2 md:p-2">
                    {nextItemToScan ? (
                      <div className="text-center">
                        <div className="bg-white/10 rounded-xl p-1 sm:p-1 flex-1 w-full">
                          <code className="text-sm sm:text-base md:text-lg lg:text-xl font-bold font-mono break-all">
                            {nextItemToScan.product_name}
                          </code>
                        </div>
                        <div
                          className={`bg-white/10 border-2 ${theme.borderColor} rounded-xl mb-4 overflow-hidden`}
                        >
                          <div className="h-48 sm:h-64 md:h-80 lg:h-96 w-full flex items-center justify-center p-4 sm:p-2">
                            {nextItemToScan.image_url ? (
                              <img
                                src={nextItemToScan.image_url}
                                alt={nextItemToScan.product_name}
                                className="max-h-full max-w-full object-contain"
                              />
                            ) : (
                              <div className="flex flex-col items-center">
                                <Package className="h-24 w-24 sm:h-32 sm:w-32 md:h-40 md:w-40 text-gray-400" />
                                <p className="text-xs sm:text-sm text-gray-500 mt-2">
                                  No image available
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 mb-3">
                          <div className="bg-white/10 rounded-xl p-2 sm:p-3 flex-1 w-full">
                            <code className="text-sm sm:text-base md:text-lg lg:text-xl font-bold font-mono break-all">
                              {nextItemToScan.sku}
                            </code>
                          </div>
                          <div className="flex gap-3 sm:gap-4">
                            <div className="bg-white/10 px-3 sm:px-4 py-2 rounded-xl text-center">
                              <span className="text-[10px] sm:text-xs text-gray-400 block">
                                Pending
                              </span>
                              <span className="text-xl sm:text-2xl md:text-3xl font-bold">
                                {nextItemToScan.pending_qty || 1}
                              </span>
                            </div>
                            <div className="bg-white/10 px-3 sm:px-4 py-2 rounded-xl text-center">
                              <span className="text-[10px] sm:text-xs text-gray-400 block">
                                Total
                              </span>
                              <span className="text-xl sm:text-2xl md:text-3xl font-bold">
                                {nextItemToScan.ordered_qty}
                              </span>
                            </div>
                          </div>
                        </div>
                        {nextItemToScan.is_part_of_bundle && (
                          <p className="text-xs sm:text-sm text-purple-400 break-words">
                            Part of bundle: {nextItemToScan.bundle_name}
                          </p>
                        )}
                      </div>
                    ) : scanMode === "tracking" ? (
                      <div className="text-center py-6 sm:py-8">
                        <div className="bg-green-500/20 border-2 border-green-500/30 rounded-xl p-4 sm:p-6 max-w-md mx-auto">
                          <div className="w-16 h-16 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <Check className="h-8 w-8 text-white" />
                          </div>
                          <h2 className="text-lg sm:text-xl font-bold mb-2">
                            All Items Scanned!
                          </h2>
                          <p className="text-xs sm:text-sm mb-4">
                            Scan tracking label to complete order.
                          </p>
                          <div className="bg-white/10 rounded-xl p-3">
                            <p className="text-[10px] sm:text-xs text-gray-400 mb-1">
                              Tracking Number:
                            </p>
                            <code className="text-sm sm:text-base md:text-lg font-bold break-all">
                              {order.tracking_number || "Ready to scan"}
                            </code>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-6 sm:py-8">
                        <Package className="h-16 w-16 text-gray-400 mx-auto mb-3" />
                        <h3 className="text-base sm:text-lg font-bold">
                          No Items to Scan
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-500">
                          All items scanned successfully
                        </p>
                      </div>
                    )}
                    {(message || error) && (
                      <div className="mt-4">
                        {message && (
                          <div
                            className={`p-2 sm:p-3 rounded-xl text-xs sm:text-sm ${message.includes("⚠️") ? `${theme.warningBg} ${theme.warningText}` : message.includes("✅") ? `${theme.successBg} ${theme.successText}` : `${theme.successBg}`}`}
                          >
                            <span className="break-words">{message}</span>
                          </div>
                        )}
                        {error && (
                          <div
                            className={`p-2 sm:p-3 rounded-xl text-xs sm:text-sm ${theme.errorBg} ${theme.errorText}`}
                          >
                            <AlertCircle className="h-4 w-4 inline mr-1 flex-shrink-0" />
                            <span className="break-words">{error}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Completed Items */}
              <div className="lg:col-span-3 order-3">
                <div
                  className={`${theme.bgCard} rounded-xl shadow-2xl border ${theme.borderColor} h-auto lg:h-[calc(100vh-100px)] overflow-hidden sticky top-4`}
                >
                  <div
                    className={`bg-gradient-to-r from-${theme.accentColor}-500 to-${theme.accentColor}-600 p-2 sm:p-3`}
                  >
                    <h3 className="text-white font-bold flex items-center text-sm sm:text-base">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Completed Items
                    </h3>
                    <p className="text-white/80 text-[10px] sm:text-xs">
                      {scannedItems.length} items scanned
                    </p>
                  </div>
                  <div className="overflow-y-auto max-h-[300px] sm:max-h-[400px] lg:max-h-[calc(100%-80px)] p-2 sm:p-3 space-y-2">
                    {scannedItems.length > 0 ? (
                      scannedItems.map((item, idx) =>
                        item.is_bundle ? (
                          <CompletedBundleItem key={idx} bundle={item} />
                        ) : (
                          <CompletedItem key={idx} item={item} />
                        ),
                      )
                    ) : (
                      <div className="text-center py-6">
                        <Package className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-500">
                          No items scanned yet
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center min-h-[80vh]">
              <div className="max-w-2xl w-full px-2 sm:px-4">
                <div
                  className={`${theme.bgCard} rounded-2xl shadow-2xl border ${theme.borderColor} p-4 sm:p-6 md:p-8`}
                >
                  <div className="text-center mb-4 sm:mb-6">
                    <div
                      className={`inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r from-${theme.accentColor}-400 to-${theme.accentColor}-500 rounded-full mb-3 sm:mb-4`}
                    >
                      <Barcode className="h-10 w-10 sm:h-12 sm:w-12 text-white" />
                    </div>
                    <h2
                      className={`text-xl sm:text-2xl font-bold ${theme.textColor}`}
                    >
                      Ready to Scan
                    </h2>
                    <p className={`text-xs sm:text-sm ${theme.textMuted}`}>
                      Scan an order barcode to begin packing
                    </p>
                  </div>
                  <div className="relative">
                    <input
                      ref={inputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Scan order barcode here..."
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 pr-24 rounded-xl text-sm sm:text-base border-2 border-white/50 bg-white/95"
                      autoFocus
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2">
                      <button
                        onClick={() => handleAutoScan()}
                        disabled={loading || !input.trim()}
                        className={`px-3 sm:px-4 py-1.5 bg-gradient-to-r from-${theme.accentColor}-300 to-${theme.accentColor}-600 ${theme.textColor} rounded-lg text-xs sm:text-sm `}
                      >
                        {loading ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          "Scan"
                        )}
                      </button>
                    </div>
                  </div>
                  {error && (
                    <div
                      className={`mt-4 p-2 sm:p-3 rounded-xl text-xs sm:text-sm ${theme.errorBg} ${theme.errorText}`}
                    >
                      <AlertCircle className="h-4 w-4 inline mr-1" />
                      <span className="break-words">{error}</span>
                    </div>
                  )}
                </div>
                {scanHistory.length > 0 && (
                  <div
                    className={`mt-4 sm:mt-6 ${theme.bgCard} rounded-xl shadow-2xl border ${theme.borderColor} p-3 sm:p-4`}
                  >
                    <h3
                      className={`font-bold mb-2 sm:mb-3 flex items-center text-sm sm:text-base`}
                    >
                      <Clock className="h-4 w-4 mr-1" />
                      Recent Scans
                    </h3>
                    {scanHistory.map((scan, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between items-center p-2 border-b last:border-0 flex-wrap gap-2"
                      >
                        <div>
                          <p className="text-xs sm:text-sm font-medium break-words">
                            {scan.orderId}
                          </p>
                          <p className="text-[10px] sm:text-xs text-gray-500">
                            {scan.timestamp}
                          </p>
                        </div>
                        <span className="text-[10px] sm:text-xs text-gray-500 flex-shrink-0">
                          {scan.items}/{scan.totalItems} items
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .overflow-y-auto::-webkit-scrollbar {
          width: 3px;
        }
        .overflow-y-auto::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 10px;
        }
        * {
          -webkit-tap-highlight-color: transparent;
        }
        .transition-all {
          transition-property: transform;
          transition-duration: 300ms;
        }
      `}</style>
    </div>
  );
}
