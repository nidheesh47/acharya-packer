import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { 
  Package, CheckCircle, XCircle,
  RefreshCw, Barcode, Zap, Clock, Loader2,
  Scan, Check, ShoppingCart, Eye, Grid, List, Hash,
  Filter, MousePointer, BarChart, Maximize2, Minimize2,
  ChevronDown, ArrowDown, Truck, QrCode,
  AlertCircle, ArrowRight, Tag, Box,
  AlertTriangle, Info, SkipForward,
  Home, Shield, User, LogOut, Layers,
  ChevronRight, Volume2, VolumeX, Award, LayoutDashboard,
  Sparkles, Palette, Sun, Moon, Sunset, Waves, Leaf,
  Mountain, Heart, X, Layers as BundleIcon, Grid3x3,
  Music, Music2, Volume1, VolumeX as VolumeMute,
  Menu, HelpCircle
} from "lucide-react";

const API_BASE = import.meta.env.VITE_APP_URL;

// Sound options from the provided data
const SOUND_OPTIONS = {
  success: [
    {
      id: 'success1',
      name: 'Success Chime',
      url: 'https://cdn.jsdelivr.net/gh/AcharyaIT/Sound-Effect-Scan-page@main/success-Sounds/freesound_community-success-48018.mp3',
      icon: Music
    },
    {
      id: 'success2',
      name: 'Happy Bell',
      url: 'https://cdn.jsdelivr.net/gh/AcharyaIT/Sound-Effect-Scan-page@main/success-Sounds/freesound_community-success-fanfare-trumpets-6185.mp3',
      icon: Music2
    },
    {
      id: 'success3',
      name: 'Triumph',
      url: 'https://cdn.jsdelivr.net/gh/AcharyaIT/Sound-Effect-Scan-page@main/success-Sounds/mrstokes302-success-videogame-sfx-423626.mp3',
      icon: Volume1
    }
  ],
  scan: [
    {
      id: 'scan1',
      name: 'Beep',
      url: 'https://cdn.jsdelivr.net/gh/AcharyaIT/Sound-Effect-Scan-page@main/scan-Sounds/edr-percussive-wave-01-471672.mp3',
      icon: Music
    },
    {
      id: 'scan2',
      name: 'Click',
      url: 'https://cdn.jsdelivr.net/gh/AcharyaIT/Sound-Effect-Scan-page@main/scan-Sounds/freesound_community-doorscan-102283.mp3',
      icon: Music2
    },
    {
      id: 'scan3',
      name: 'Pip',
      url: 'https://cdn.jsdelivr.net/gh/AcharyaIT/Sound-Effect-Scan-page@main/scan-Sounds/freesound_community-prompt-user-for-response-85808.mp3',
      icon: Volume1
    }
  ],
  error: [
    {
      id: 'error1',
      name: 'Buzz',
      url: 'https://cdn.jsdelivr.net/gh/AcharyaIT/Sound-Effect-Scan-page@main/error-Sounds/freesound_community-windows-error-sound-effect-35894.mp3',
      icon: Music
    },
    {
      id: 'error2',
      name: 'Error Tone',
      url: 'https://cdn.jsdelivr.net/gh/AcharyaIT/Sound-Effect-Scan-page@main/error-Sounds/u_8iuwl7zrk0-error-170796.mp3',
      icon: Music2
    },
    {
      id: 'error3',
      name: 'Failed',
      url: 'https://cdn.jsdelivr.net/gh/AcharyaIT/Sound-Effect-Scan-page@main/error-Sounds/universfield-error-011-352286.mp3',
      icon: Volume1
    }
  ],
  warning: [
    {
      id: 'warning1',
      name: 'Alert',
      url: 'https://cdn.jsdelivr.net/gh/AcharyaIT/Sound-Effect-Scan-page@main/warning-Sounds/freesound_community-beep-warning-6387.mp3',
      icon: Music
    },
    {
      id: 'warning2',
      name: 'Caution',
      url: 'https://cdn.jsdelivr.net/gh/AcharyaIT/Sound-Effect-Scan-page@main/warning-Sounds/freesound_community-warning-sound-6686.mp3',
      icon: Music2
    },
    {
      id: 'warning3',
      name: 'Notice',
      url: 'https://cdn.jsdelivr.net/gh/AcharyaIT/Sound-Effect-Scan-page@main/warning-Sounds/ribhavagrawal-horror-warning-230511.mp3',
      icon: Volume1
    }
  ],
  complete: [
    {
      id: 'complete1',
      name: 'Fanfare',
      url: 'https://cdn.jsdelivr.net/gh/AcharyaIT/Sound-Effect-Scan-page@main/complete-Sounds/36505577-smooth-completed-notify-274735.mp3',
      icon: Music
    },
    {
      id: 'complete2',
      name: 'Celebration',
      url: 'https://cdn.jsdelivr.net/gh/AcharyaIT/Sound-Effect-Scan-page@main/complete-Sounds/36505577-smooth-completed-notify-starting-alert-274739.mp3',
      icon: Music2
    },
    {
      id: 'complete3',
      name: 'Success Fanfare',
      url: 'https://cdn.jsdelivr.net/gh/AcharyaIT/Sound-Effect-Scan-page@main/complete-Sounds/freesound_community-level-win-6416.mp3',
      icon: Volume1
    }
  ]
};

// Background themes
const BACKGROUND_THEMES = {
  serene: {
    name: "Serene Blue",
    gradient: "from-blue-400 via-indigo-300 to-purple-300",
    textColor: "text-gray-800",
    textMuted: "text-gray-600",
    textWhite: "text-white",
    bgCard: "bg-white/90",
    bgCardHover: "hover:bg-white/95",
    borderColor: "border-white/50",
    accentColor: "blue",
    emoji: "🌊",
    icon: Sun,
    description: "Calm ocean vibes",
    successBg: "bg-green-500/20",
    successBorder: "border-green-500/30",
    successText: "text-green-700",
    warningBg: "bg-yellow-500/20",
    warningBorder: "border-yellow-500/30",
    warningText: "text-yellow-700",
    errorBg: "bg-red-500/20",
    errorBorder: "border-red-500/30",
    errorText: "text-red-700",
    infoBg: "bg-blue-500/20",
    infoBorder: "border-blue-500/30",
    infoText: "text-blue-700",
    scannedBg: "bg-green-500/20",
    scannedBorder: "border-green-400/30",
    scannedText: "text-green-700",
    scannedTextMuted: "text-green-600",
    scannedCodeBg: "bg-green-500/30",
    scannedIconColor: "text-green-600"
  },
  sunset: {
    name: "Golden Sunset",
    gradient: "from-orange-300 via-pink-300 to-purple-400",
    textColor: "text-gray-800",
    textMuted: "text-gray-700",
    textWhite: "text-white",
    bgCard: "bg-white/90",
    bgCardHover: "hover:bg-white/95",
    borderColor: "border-white/50",
    accentColor: "orange",
    emoji: "🌅",
    icon: Sunset,
    description: "Warm evening glow",
    successBg: "bg-green-500/20",
    successBorder: "border-green-500/30",
    successText: "text-green-700",
    warningBg: "bg-yellow-500/20",
    warningBorder: "border-yellow-500/30",
    warningText: "text-yellow-700",
    errorBg: "bg-red-500/20",
    errorBorder: "border-red-500/30",
    errorText: "text-red-700",
    infoBg: "bg-blue-500/20",
    infoBorder: "border-blue-500/30",
    infoText: "text-blue-700",
    scannedBg: "bg-green-500/20",
    scannedBorder: "border-green-400/30",
    scannedText: "text-green-700",
    scannedTextMuted: "text-green-600",
    scannedCodeBg: "bg-green-500/30",
    scannedIconColor: "text-green-600"
  },
  forest: {
    name: "Forest Mist",
    gradient: "from-green-400 via-emerald-300 to-teal-400",
    textColor: "text-gray-800",
    textMuted: "text-gray-700",
    textWhite: "text-white",
    bgCard: "bg-white/90",
    bgCardHover: "hover:bg-white/95",
    borderColor: "border-white/50",
    accentColor: "green",
    emoji: "🌳",
    icon: Leaf,
    description: "Fresh woodland energy",
    successBg: "bg-green-600/20",
    successBorder: "border-green-600/30",
    successText: "text-green-800",
    warningBg: "bg-yellow-600/20",
    warningBorder: "border-yellow-600/30",
    warningText: "text-yellow-800",
    errorBg: "bg-red-600/20",
    errorBorder: "border-red-600/30",
    errorText: "text-red-800",
    infoBg: "bg-blue-600/20",
    infoBorder: "border-blue-600/30",
    infoText: "text-blue-800",
    scannedBg: "bg-green-600/20",
    scannedBorder: "border-green-600/30",
    scannedText: "text-green-800",
    scannedTextMuted: "text-green-700",
    scannedCodeBg: "bg-green-600/30",
    scannedIconColor: "text-green-700"
  },
  lavender: {
    name: "Lavender Fields",
    gradient: "from-purple-300 via-pink-200 to-blue-200",
    textColor: "text-gray-800",
    textMuted: "text-gray-700",
    textWhite: "text-white",
    bgCard: "bg-white/90",
    bgCardHover: "hover:bg-white/95",
    borderColor: "border-white/50",
    accentColor: "purple",
    emoji: "🌸",
    icon: Heart,
    description: "Soft and relaxing",
    successBg: "bg-green-500/20",
    successBorder: "border-green-500/30",
    successText: "text-green-700",
    warningBg: "bg-yellow-500/20",
    warningBorder: "border-yellow-500/30",
    warningText: "text-yellow-700",
    errorBg: "bg-red-500/20",
    errorBorder: "border-red-500/30",
    errorText: "text-red-700",
    infoBg: "bg-blue-500/20",
    infoBorder: "border-blue-500/30",
    infoText: "text-blue-700",
    scannedBg: "bg-green-500/20",
    scannedBorder: "border-green-400/30",
    scannedText: "text-green-700",
    scannedTextMuted: "text-green-600",
    scannedCodeBg: "bg-green-500/30",
    scannedIconColor: "text-green-600"
  },
  morning: {
    name: "Morning Light",
    gradient: "from-yellow-200 via-orange-200 to-pink-200",
    textColor: "text-gray-800",
    textMuted: "text-gray-700",
    textWhite: "text-white",
    bgCard: "bg-white/90",
    bgCardHover: "hover:bg-white/95",
    borderColor: "border-white/50",
    accentColor: "yellow",
    emoji: "☀️",
    icon: Sun,
    description: "Bright and energizing",
    successBg: "bg-green-500/20",
    successBorder: "border-green-500/30",
    successText: "text-green-700",
    warningBg: "bg-yellow-500/20",
    warningBorder: "border-yellow-500/30",
    warningText: "text-yellow-700",
    errorBg: "bg-red-500/20",
    errorBorder: "border-red-500/30",
    errorText: "text-red-700",
    infoBg: "bg-blue-500/20",
    infoBorder: "border-blue-500/30",
    infoText: "text-blue-700",
    scannedBg: "bg-green-500/20",
    scannedBorder: "border-green-400/30",
    scannedText: "text-green-700",
    scannedTextMuted: "text-green-600",
    scannedCodeBg: "bg-green-500/30",
    scannedIconColor: "text-green-600"
  },
  midnight: {
    name: "Midnight Calm",
    gradient: "from-indigo-900 via-purple-900 to-pink-800",
    textColor: "text-white",
    textMuted: "text-gray-200",
    textWhite: "text-white",
    bgCard: "bg-gray-900/80",
    bgCardHover: "hover:bg-gray-900/90",
    borderColor: "border-white/20",
    accentColor: "indigo",
    emoji: "🌙",
    icon: Moon,
    description: "Deep peaceful night",
    successBg: "bg-green-500/30",
    successBorder: "border-green-400/40",
    successText: "text-green-200",
    warningBg: "bg-yellow-500/30",
    warningBorder: "border-yellow-400/40",
    warningText: "text-yellow-200",
    errorBg: "bg-red-500/30",
    errorBorder: "border-red-400/40",
    errorText: "text-red-200",
    infoBg: "bg-blue-500/30",
    infoBorder: "border-blue-400/40",
    infoText: "text-blue-200",
    scannedBg: "bg-green-500/30",
    scannedBorder: "border-green-400/40",
    scannedText: "text-green-200",
    scannedTextMuted: "text-green-300",
    scannedCodeBg: "bg-green-500/40",
    scannedIconColor: "text-green-300"
  },
  aurora: {
    name: "Northern Lights",
    gradient: "from-green-500 via-blue-500 to-purple-600",
    textColor: "text-white",
    textMuted: "text-gray-100",
    textWhite: "text-white",
    bgCard: "bg-gray-900/80",
    bgCardHover: "hover:bg-gray-900/90",
    borderColor: "border-white/20",
    accentColor: "green",
    emoji: "✨",
    icon: Sparkles,
    description: "Magical aurora borealis",
    successBg: "bg-green-400/30",
    successBorder: "border-green-300/40",
    successText: "text-green-100",
    warningBg: "bg-yellow-400/30",
    warningBorder: "border-yellow-300/40",
    warningText: "text-yellow-100",
    errorBg: "bg-red-400/30",
    errorBorder: "border-red-300/40",
    errorText: "text-red-100",
    infoBg: "bg-blue-400/30",
    infoBorder: "border-blue-300/40",
    infoText: "text-blue-100",
    scannedBg: "bg-green-400/30",
    scannedBorder: "border-green-300/40",
    scannedText: "text-green-100",
    scannedTextMuted: "text-green-200",
    scannedCodeBg: "bg-green-400/40",
    scannedIconColor: "text-green-200"
  },
  desert: {
    name: "Desert Dunes",
    gradient: "from-amber-300 via-orange-200 to-yellow-200",
    textColor: "text-gray-800",
    textMuted: "text-gray-700",
    textWhite: "text-white",
    bgCard: "bg-white/90",
    bgCardHover: "hover:bg-white/95",
    borderColor: "border-white/50",
    accentColor: "amber",
    emoji: "🏜️",
    icon: Mountain,
    description: "Warm sandy tones",
    successBg: "bg-green-500/20",
    successBorder: "border-green-500/30",
    successText: "text-green-700",
    warningBg: "bg-yellow-500/20",
    warningBorder: "border-yellow-500/30",
    warningText: "text-yellow-700",
    errorBg: "bg-red-500/20",
    errorBorder: "border-red-500/30",
    errorText: "text-red-700",
    infoBg: "bg-blue-500/20",
    infoBorder: "border-blue-500/30",
    infoText: "text-blue-700",
    scannedBg: "bg-green-500/20",
    scannedBorder: "border-green-400/30",
    scannedText: "text-green-700",
    scannedTextMuted: "text-green-600",
    scannedCodeBg: "bg-green-500/30",
    scannedIconColor: "text-green-600"
  },
  ocean: {
    name: "Deep Ocean",
    gradient: "from-cyan-500 via-blue-600 to-indigo-700",
    textColor: "text-white",
    textMuted: "text-gray-200",
    textWhite: "text-white",
    bgCard: "bg-gray-900/80",
    bgCardHover: "hover:bg-gray-900/90",
    borderColor: "border-white/20",
    accentColor: "cyan",
    emoji: "🌊",
    icon: Waves,
    description: "Deep blue tranquility",
    successBg: "bg-green-400/30",
    successBorder: "border-green-300/40",
    successText: "text-green-100",
    warningBg: "bg-yellow-400/30",
    warningBorder: "border-yellow-300/40",
    warningText: "text-yellow-100",
    errorBg: "bg-red-400/30",
    errorBorder: "border-red-300/40",
    errorText: "text-red-100",
    infoBg: "bg-blue-400/30",
    infoBorder: "border-blue-300/40",
    infoText: "text-blue-100",
    scannedBg: "bg-green-400/30",
    scannedBorder: "border-green-300/40",
    scannedText: "text-green-100",
    scannedTextMuted: "text-green-200",
    scannedCodeBg: "bg-green-400/40",
    scannedIconColor: "text-green-200"
  }
};

export default function OrderScanPage() {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const scanTimeoutRef = useRef(null);
  const refreshTriggeredRef = useRef(false);
  const audioRef = useRef(null);
  const headerRef = useRef(null);
  
  const [input, setInput] = useState("");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [scanHistory, setScanHistory] = useState([]);
  const [scanMode, setScanMode] = useState("order");
  const [autoSubmitDelay] = useState(300);
  const [admin, setAdmin] = useState(null);
  const [shopDomain, setShopDomain] = useState("");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);
  const [nextItemToScan, setNextItemToScan] = useState(null);
  const [scannedItems, setScannedItems] = useState([]);
  const [showThemeModal, setShowThemeModal] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('ocean');
  const [expandedBundles, setExpandedBundles] = useState({});
  const [showSoundModal, setShowSoundModal] = useState(false);
  const [selectedSounds, setSelectedSounds] = useState(null);
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Confirmation modals state
  const [showNewScanConfirm, setShowNewScanConfirm] = useState(false);
  const [showDashboardConfirm, setShowDashboardConfirm] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // Fullscreen handling
  useEffect(() => {
    const enableFullscreen = () => {
      const docEl = document.documentElement;
      if (docEl.requestFullscreen) {
        docEl.requestFullscreen();
        setIsFullscreen(true);
      }
    };
    
    enableFullscreen();
    
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Load saved preferences
  useEffect(() => {
    const savedTheme = localStorage.getItem('scan_theme');
    if (savedTheme && BACKGROUND_THEMES[savedTheme]) {
      setCurrentTheme(savedTheme);
    }
    
    const savedSounds = localStorage.getItem('scan_sounds');
    if (savedSounds) {
      try {
        const parsedSounds = JSON.parse(savedSounds);
        if (parsedSounds && typeof parsedSounds === 'object') {
          setSelectedSounds(parsedSounds);
        } else {
          setSelectedSounds({
            success: 'success1',
            scan: 'scan1',
            error: 'error1',
            warning: 'warning1',
            complete: 'complete1'
          });
        }
      } catch (err) {
        console.error("Error parsing saved sounds:", err);
        setSelectedSounds({
          success: 'success1',
          scan: 'scan1',
          error: 'error1',
          warning: 'warning1',
          complete: 'complete1'
        });
      }
    } else {
      setSelectedSounds({
        success: 'success1',
        scan: 'scan1',
        error: 'error1',
        warning: 'warning1',
        complete: 'complete1'
      });
    }
  }, []);

  // Save theme preference
  useEffect(() => {
    if (currentTheme) {
      localStorage.setItem('scan_theme', currentTheme);
    }
  }, [currentTheme]);

  // Save sound preferences
  useEffect(() => {
    if (selectedSounds) {
      localStorage.setItem('scan_sounds', JSON.stringify(selectedSounds));
    }
  }, [selectedSounds]);

  // Get current theme colors
  const theme = selectedSounds ? (BACKGROUND_THEMES[currentTheme] || BACKGROUND_THEMES.ocean) : BACKGROUND_THEMES.ocean;

  // Authentication check
  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const adminData = localStorage.getItem("admin");

    if (!token) {
      navigate("/user/login", { replace: true });
      return;
    }

    if (adminData) {
      try {
        const parsedAdmin = JSON.parse(adminData);
        setAdmin(parsedAdmin);
        
        // Role-based access control
        switch (parsedAdmin.role) {
          case "admin":
            navigate("/unauthorized", { replace: true });
            return;
          case "logistics":
            navigate("/unauthorized", { replace: true });
            return;
          case "packing":
            // Allowed - continue
            if (parsedAdmin.shop_domain) {
              setShopDomain(parsedAdmin.shop_domain);
            }
            break;
          default:
            navigate("/dashboard", { replace: true });
            return;
        }
      } catch (err) {
        console.error("Error parsing admin data:", err);
        setError("Invalid user data. Please log in again.");
        setTimeout(() => navigate("/user/login"), 2000);
        return;
      }
    }
    
    checkActiveOrderProgress();
    
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }
  }, [navigate]);
  
  // Auto focus management
  useEffect(() => {
    if (order?.scan_status === "scanned") {
      inputRef.current?.blur();
    } else {
      inputRef.current?.focus();
    }

    return () => {
      if (scanTimeoutRef.current) {
        clearTimeout(scanTimeoutRef.current);
      }
    };
  }, [order, loading, scanMode]);

  // Auto-submit on barcode scan
  useEffect(() => {
    if (!input.trim()) return;

    if (scanTimeoutRef.current) {
      clearTimeout(scanTimeoutRef.current);
    }

    scanTimeoutRef.current = setTimeout(() => {
      if (input.trim() && !loading && order?.scan_status !== "scanned") {
        handleAutoScan();
      }
    }, autoSubmitDelay);

    return () => {
      if (scanTimeoutRef.current) {
        clearTimeout(scanTimeoutRef.current);
      }
    };
  }, [input]);

  // Auto refresh after success
  useEffect(() => {
    if (order?.scan_status === "scanned" && !refreshTriggeredRef.current) {
      refreshTriggeredRef.current = true;
      const totalItems = order.items?.length || 0;
      const scannedCount = order.items?.filter(i => {
        if (i.is_bundle) {
          return i.bundle_components?.every(comp => comp.fully_scanned);
        }
        return i.fully_scanned;
      }).length || 0;
      
      setScanHistory(prev => [{
        orderId: order.order_name,
        timestamp: new Date().toLocaleTimeString(),
        items: scannedCount,
        totalItems: totalItems
      }, ...prev.slice(0, 4)]);
      
      setCompletedOrder(order);
      setShowSuccessModal(true);
      playSound("complete");
      
      setTimeout(() => {
        setShowSuccessModal(false);
        resetScanner();
      }, 5000);
    }
  }, [order]);

  // Check active order progress
  async function checkActiveOrderProgress() {
    const token = localStorage.getItem("auth_token");
    if (!token) return;

    try {
      const res = await fetch(`${API_BASE}/api/direct/order/scan`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({}),
      });

      const data = await res.json();
      if (res.ok && data.mode === "progress_check") {
        handleOrderLoaded(data);
      }
    } catch (err) {
      console.log("No active order found");
    }
  }

  // Process items to show bundles with their components
  const processOrderItems = (items) => {
    if (!items) return [];
    
    const processedItems = [];
    const bundleGroups = {};
    
    items.forEach(item => {
      if (item.source_info?.type === 'bundle_main') {
        bundleGroups[item.sku] = {
          ...item,
          bundle_components: []
        };
      }
    });
    
    items.forEach(item => {
      if (item.source_info?.type === 'bundle_component') {
        const bundleSku = item.source_info.bundle_sku;
        if (bundleGroups[bundleSku]) {
          bundleGroups[bundleSku].bundle_components.push(item);
        }
      } else if (item.source_info?.type === 'regular') {
        processedItems.push(item);
      }
    });
    
    Object.values(bundleGroups).forEach(bundle => {
      const allComponentsScanned = bundle.bundle_components.every(c => c.fully_scanned);
      bundle.fully_scanned = allComponentsScanned;
      bundle.scanned_qty = bundle.bundle_components.filter(c => c.fully_scanned).length;
      bundle.pending_qty = bundle.bundle_components.filter(c => !c.fully_scanned).length;
      bundle.is_bundle = true;
      processedItems.push(bundle);
    });
    
    return processedItems;
  };

  // Handle order loaded
  function handleOrderLoaded(data) {
    refreshTriggeredRef.current = false;
    
    const processedItems = processOrderItems(data.order.items || []);
    
    const allItemsScanned = processedItems.every(item => {
      if (item.is_bundle) {
        return item.bundle_components?.every(comp => comp.fully_scanned) || false;
      }
      return item.fully_scanned;
    });
    
    const trackingScanned = data.order.tracking_scan_status === "scanned";
    
    setOrder({
      order_name: data.order.order_name,
      order_scan_status: data.order.order_scan_status,
      tracking_scan_status: data.order.tracking_scan_status,
      tracking_number: data.order.tracking_number,
      carrier: data.order.carrier,
      items: processedItems,
      progress: {
        ...data.order.progress,
        items_scanned: allItemsScanned
      },
      raw_items: data.order.items
    });

    // Expand all bundles by default
    const initialExpandedState = {};
    processedItems.forEach(item => {
      if (item.is_bundle) {
        initialExpandedState[item.sku] = true;
      }
    });
    setExpandedBundles(initialExpandedState);
    
    const scanned = [];
    processedItems.forEach(item => {
      if (item.is_bundle && item.bundle_components) {
        const hasScannedComponents = item.bundle_components.some(comp => comp.scanned_qty > 0);
        if (hasScannedComponents) {
          scanned.push({
            ...item,
            display_qty: item.bundle_components.filter(comp => comp.fully_scanned).length,
            total_qty: item.bundle_components.length
          });
        }
      } else if (item.scanned_qty > 0) {
        scanned.push({
          ...item,
          display_qty: item.scanned_qty,
          total_qty: item.ordered_qty
        });
      }
    });
    setScannedItems(scanned);
    
    if (allItemsScanned && trackingScanned) {
      setScanMode("order");
      setMessage(`✅ Order ${data.order.order_name} is already complete!`);
      playSound("complete");
      setCompletedOrder({
        ...data.order,
        items: processedItems
      });
      setShowSuccessModal(true);
    } else if (allItemsScanned && !trackingScanned) {
      setScanMode("tracking");
      setMessage(`⚠️ All items scanned! Order ${data.order.order_name} needs tracking scan`);
      playSound("warning");
    } else {
      setScanMode("sku");
      const pendingCount = processedItems.reduce((count, item) => {
        if (item.is_bundle) {
          return count + (item.bundle_components?.filter(comp => !comp.fully_scanned).length || 0);
        }
        return count + (item.fully_scanned ? 0 : 1);
      }, 0);
      
      const scannedCount = scanned.length;
      const totalItems = processedItems.reduce((total, item) => {
        if (item.is_bundle) {
          return total + 1;
        }
        return total + 1;
      }, 0);
      
      setMessage(`✅ Order ${data.order.order_name} loaded - ${scannedCount}/${totalItems} items scanned, ${pendingCount} remaining`);
      playSound("success");
    }
  }

  // Handle item scanned
  function handleItemScanned(data) {
    setOrder((prev) => {
      if (!prev) return prev;

      if (data.items) {
        const processedItems = processOrderItems(data.items);
        const allItemsScanned = processedItems.every(i => {
          if (i.is_bundle) {
            return i.bundle_components?.every(comp => comp.fully_scanned) || false;
          }
          return i.fully_scanned;
        });
        
        if (allItemsScanned) {
          setScanMode("tracking");
          setMessage("🎉 All items scanned! Now scan the tracking label");
          playSound("success");
        } else {
          setMessage(`✅ SKU ${data.sku} scanned`);
          playSound("scan");
        }

        highlightScannedItem(data.sku);

        // Ensure all bundles remain expanded
        const updatedExpandedState = { ...expandedBundles };
        processedItems.forEach(item => {
          if (item.is_bundle && !updatedExpandedState[item.sku]) {
            updatedExpandedState[item.sku] = true;
          }
        });
        setExpandedBundles(updatedExpandedState);

        const scanned = [];
        processedItems.forEach(item => {
          if (item.is_bundle && item.bundle_components) {
            const hasScannedComponents = item.bundle_components.some(comp => comp.scanned_qty > 0);
            if (hasScannedComponents) {
              scanned.push({
                ...item,
                display_qty: item.bundle_components.filter(comp => comp.fully_scanned).length,
                total_qty: item.bundle_components.length
              });
            }
          } else if (item.scanned_qty > 0) {
            scanned.push({
              ...item,
              display_qty: item.scanned_qty,
              total_qty: item.ordered_qty
            });
          }
        });
        setScannedItems(scanned);

        return {
          ...prev,
          items: processedItems,
          scan_status: allItemsScanned ? "items_scanned" : "pending",
        };
      }

      let updatedItems = [...prev.items];
      let scannedSku = data.sku;

      for (let i = 0; i < updatedItems.length; i++) {
        const item = updatedItems[i];
        
        if (item.is_bundle && item.bundle_components) {
          const componentIndex = item.bundle_components.findIndex(comp => comp.sku === scannedSku);
          if (componentIndex !== -1) {
            const component = { ...item.bundle_components[componentIndex] };
            const newScannedQty = (component.scanned_qty || 0) + 1;
            const newPendingQty = Math.max(0, component.ordered_qty - newScannedQty);
            
            component.scanned_qty = newScannedQty;
            component.pending_qty = newPendingQty;
            component.fully_scanned = newScannedQty >= component.ordered_qty;
            
            item.bundle_components[componentIndex] = component;
            
            const allComponentsScanned = item.bundle_components.every(comp => comp.fully_scanned);
            item.fully_scanned = allComponentsScanned;
            item.scanned_qty = item.bundle_components.filter(comp => comp.fully_scanned).length;
            item.pending_qty = item.bundle_components.filter(comp => !comp.fully_scanned).length;
            break;
          }
        } else if (item.sku === scannedSku) {
          const newScannedQty = (item.scanned_qty || 0) + 1;
          const newPendingQty = Math.max(0, item.ordered_qty - newScannedQty);
          
          item.scanned_qty = newScannedQty;
          item.pending_qty = newPendingQty;
          item.fully_scanned = newScannedQty >= item.ordered_qty;
          break;
        }
      }

      const allItemsScanned = updatedItems.every(i => {
        if (i.is_bundle) {
          return i.bundle_components?.every(comp => comp.fully_scanned) || false;
        }
        return i.fully_scanned;
      });
      
      if (allItemsScanned) {
        setScanMode("tracking");
        setMessage("🎉 All items scanned! Now scan the tracking label");
        playSound("success");
      } else {
        setMessage(`✅ SKU ${data.sku} scanned`);
        playSound("scan");
      }

      highlightScannedItem(data.sku);

      // Ensure all bundles remain expanded
      const updatedExpandedState = { ...expandedBundles };
      updatedItems.forEach(item => {
        if (item.is_bundle && !updatedExpandedState[item.sku]) {
          updatedExpandedState[item.sku] = true;
        }
      });
      setExpandedBundles(updatedExpandedState);

      const scanned = [];
      updatedItems.forEach(item => {
        if (item.is_bundle && item.bundle_components) {
          const hasScannedComponents = item.bundle_components.some(comp => comp.scanned_qty > 0);
          if (hasScannedComponents) {
            scanned.push({
              ...item,
              display_qty: item.bundle_components.filter(comp => comp.fully_scanned).length,
              total_qty: item.bundle_components.length
            });
          }
        } else if (item.scanned_qty > 0) {
          scanned.push({
            ...item,
            display_qty: item.scanned_qty,
            total_qty: item.ordered_qty
          });
        }
      });
      setScannedItems(scanned);

      return {
        ...prev,
        items: updatedItems,
        scan_status: allItemsScanned ? "items_scanned" : "pending",
      };
    });
  }

  // Handle tracking scanned
  function handleTrackingScanned(data) {
    setOrder((prev) => {
      if (!prev) return prev;
      
      return {
        ...prev,
        scan_status: "scanned",
        tracking_scan_status: "scanned"
      };
    });
    
    setMessage("✅ Tracking scanned! Order complete");
    playSound("complete");
  }

  // Play sound
  const playSound = (type) => {
    if (!soundEnabled || !audioRef.current || !selectedSounds) return;
    
    const soundId = selectedSounds[type];
    const soundOption = SOUND_OPTIONS[type]?.find(s => s.id === soundId);
    
    if (soundOption) {
      try {
        audioRef.current.src = soundOption.url;
        audioRef.current.volume = 0.5;
        audioRef.current.play().catch(err => console.log("Audio play failed:", err));
      } catch (error) {
        console.log("Audio feedback not available");
      }
    }
  };

  // Highlight scanned item
  const highlightScannedItem = (sku) => {
    const itemElement = document.querySelector(`[data-sku="${sku}"]`);
    if (itemElement) {
      itemElement.classList.add("scan-highlight");
      setTimeout(() => {
        itemElement.classList.remove("scan-highlight");
      }, 1000);
    }
  };

  // Handle auto scan
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
    if (scanMode === "order") {
      payload = { order_barcode: input.trim() };
    } else if (scanMode === "sku") {
      payload = { sku: input.trim() };
    } else if (scanMode === "tracking") {
      payload = { tracking_number: input.trim() };
    }

    try {
      const res = await fetch(`${API_BASE}/api/direct/order/scan`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `Scan failed: ${res.status}`);
      }

      const data = await res.json();
      
      if (!data.success) {
        throw new Error(data.error || "Scan operation failed");
      }

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
          throw new Error("Unknown response mode");
      }
    } catch (err) {
      console.error("Scan error:", err);
      setError(err.message);
      playSound("error");
    } finally {
      setInput("");
      setLoading(false);
      if (order?.scan_status !== "scanned") {
        setTimeout(() => {
          inputRef.current?.focus();
        }, 100);
      }
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

  // Confirmation handlers
  const handleNewScan = () => {
    if (order) {
      setShowNewScanConfirm(true);
    } else {
      resetScanner();
    }
  };

  const confirmNewScan = () => {
    resetScanner();
    setShowNewScanConfirm(false);
  };

  const handleDashboard = () => {
    if (order) {
      setShowDashboardConfirm(true);
    } else {
      navigate("/admin/dashboard");
    }
  };

  const confirmDashboard = () => {
    setShowDashboardConfirm(false);
    navigate("/admin/dashboard");
  };

  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("admin");
    setShowLogoutConfirm(false);
    navigate("/user/login", { replace: true });
  };

  const getCompletionPercentage = () => {
    if (!order || !order.items?.length) return 0;
    
    let totalOrdered = 0;
    let totalScanned = 0;
    
    order.items.forEach(item => {
      if (item.is_bundle && item.bundle_components) {
        item.bundle_components.forEach(comp => {
          totalOrdered += comp.ordered_qty || 0;
          totalScanned += comp.scanned_qty || 0;
        });
      } else {
        totalOrdered += item.ordered_qty || 0;
        totalScanned += item.scanned_qty || 0;
      }
    });
    
    return Math.round((totalScanned / totalOrdered) * 100);
  };

  const handleManualInput = () => {
    const value = prompt(
      scanMode === "order" ? "Enter Order Barcode:" :
      scanMode === "tracking" ? "Enter Tracking Number:" :
      "Enter Product SKU:"
    );
    if (value) {
      setInput(value);
    }
  };

  const toggleBundleExpand = (bundleSku) => {
    setExpandedBundles(prev => ({
      ...prev,
      [bundleSku]: !prev[bundleSku]
    }));
  };

  const toggleHeaderVisibility = () => {
    setIsHeaderVisible(!isHeaderVisible);
  };

  // Update next item to scan
  useEffect(() => {
    if (order && order.items) {
      const findNextItem = () => {
        for (const item of order.items) {
          if (item.is_bundle) {
            const nextComponent = item.bundle_components?.find(comp => !comp.fully_scanned);
            if (nextComponent) {
              return {
                ...nextComponent,
                is_part_of_bundle: true,
                bundle_name: item.product_name,
                bundle_sku: item.sku
              };
            }
          } else if (!item.fully_scanned) {
            return item;
          }
        }
        return null;
      };

      const nextItem = findNextItem();
      setNextItemToScan(nextItem);
    } else {
      setNextItemToScan(null);
    }
  }, [order]);

  // Sound Modal Component
  const SoundModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn backdrop-blur-sm" onClick={() => setShowSoundModal(false)}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 overflow-hidden transform animate-slideIn" onClick={(e) => e.stopPropagation()}>
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 flex items-center justify-between">
          <h3 className="text-xl font-bold text-white flex items-center">
            <Volume2 className="h-5 w-5 mr-2" />
            Choose Scan Sounds
          </h3>
          <button
            onClick={() => setShowSoundModal(false)}
            className="text-white/80 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          <div className="space-y-6">
            {Object.entries(SOUND_OPTIONS).map(([category, sounds]) => (
              <div key={category} className="border-b border-gray-200 pb-4 last:border-0">
                <h4 className="text-lg font-semibold text-gray-800 capitalize mb-3">
                  {category} Sounds
                </h4>
                <div className="grid grid-cols-1 gap-2">
                  {sounds.map((sound) => {
                    const Icon = sound.icon;
                    const isSelected = selectedSounds?.[category] === sound.id;
                    
                    return (
                      <button
                        key={sound.id}
                        onClick={() => {
                          setSelectedSounds(prev => ({
                            ...prev,
                            [category]: sound.id
                          }));
                          if (audioRef.current) {
                            audioRef.current.src = sound.url;
                            audioRef.current.play().catch(err => console.log("Test play failed"));
                          }
                        }}
                        className={`flex items-center justify-between p-3 rounded-xl border-2 transition-all ${
                          isSelected 
                            ? 'border-purple-500 bg-purple-50' 
                            : 'border-gray-200 hover:border-purple-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className={`h-5 w-5 ${isSelected ? 'text-purple-600' : 'text-gray-500'}`} />
                          <span className={`font-medium ${isSelected ? 'text-purple-700' : 'text-gray-700'}`}>
                            {sound.name}
                          </span>
                        </div>
                        {isSelected && (
                          <Check className="h-5 w-5 text-purple-600" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-500 text-center">
              Click any sound to test and select. Changes are saved automatically.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  // Theme Modal Component
  const ThemeModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn backdrop-blur-sm" onClick={() => setShowThemeModal(false)}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 overflow-hidden transform animate-slideIn" onClick={(e) => e.stopPropagation()}>
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex items-center justify-between">
          <h3 className="text-xl font-bold text-white flex items-center">
            <Palette className="h-5 w-5 mr-2" />
            Choose Background Theme
          </h3>
          <button
            onClick={() => setShowThemeModal(false)}
            className="text-white/80 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(BACKGROUND_THEMES).map(([key, themeOption]) => {
              const Icon = themeOption.icon;
              const isSelected = currentTheme === key;
              
              return (
                <button
                  key={key}
                  onClick={() => {
                    setCurrentTheme(key);
                    setShowThemeModal(false);
                  }}
                  className={`relative group overflow-hidden rounded-xl transition-all transform hover:scale-105 ${
                    isSelected ? 'ring-4 ring-blue-500 ring-offset-2' : ''
                  }`}
                >
                  <div className={`h-32 bg-gradient-to-br ${themeOption.gradient} p-4`}>
                    <div className="flex items-center justify-between">
                      <Icon className={`h-6 w-6 ${themeOption.textColor}`} />
                      <span className="text-2xl">{themeOption.emoji}</span>
                    </div>
                    <div className="absolute bottom-2 left-2 right-2">
                      <div className={`${themeOption.bgCard} rounded-lg p-2 backdrop-blur-sm`}>
                        <p className={`text-xs font-medium ${themeOption.textColor}`}>
                          {themeOption.name}
                        </p>
                        <p className={`text-[10px] ${themeOption.textMuted}`}>
                          {themeOption.description}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {isSelected && (
                    <div className="absolute top-2 right-2 bg-blue-500 rounded-full p-1">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );

  // Confirmation Modal Component
  const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message, icon: Icon }) => {
    if (!isOpen) return null;
    
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn backdrop-blur-sm" onClick={onClose}>
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden transform animate-slideIn" onClick={(e) => e.stopPropagation()}>
          <div className={`bg-gradient-to-r from-${theme.accentColor}-500 to-${theme.accentColor}-600 p-6 text-center`}>
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
              {Icon && <Icon className="h-8 w-8 text-white" />}
            </div>
            <h2 className="text-xl font-bold text-white mb-2">{title}</h2>
            <p className="text-white/80 text-sm">{message}</p>
          </div>
          <div className="p-6">
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className={`flex-1 px-4 py-2 bg-gradient-to-r from-${theme.accentColor}-500 to-${theme.accentColor}-600 text-white rounded-lg font-medium hover:from-${theme.accentColor}-600 hover:to-${theme.accentColor}-700 transition-all`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Completed Bundle Item Component - UPDATED to show scanned_qty/ordered_qty like regular products
  const CompletedBundleItem = ({ bundle }) => (
    <div className={`p-2 ${theme.scannedBg} backdrop-blur rounded-xl border ${theme.scannedBorder}`}>
      <div className="flex items-center gap-2 mb-2">
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
          <code className={`text-[8px] ${theme.scannedCodeBg} px-1 py-0.5 rounded ${theme.scannedTextMuted}`}>
            {bundle.sku}
          </code>
        </div>
        {/* UPDATED: Show scanned_qty/total_qty like regular products */}
        <span className={`text-[10px] font-bold ${theme.scannedText}`}>
          {bundle.bundle_components?.filter(c => c.fully_scanned).length || 0}/{bundle.bundle_components?.length || 0}
        </span>
      </div>
      
      <div className="ml-8 space-y-2 mt-2">
        {bundle.bundle_components?.map((comp, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <div className="w-6 h-6 bg-white/20 rounded overflow-hidden flex-shrink-0">
              {comp.image_url ? (
                <img 
                  src={comp.image_url} 
                  alt={comp.product_name}
                  className="w-full h-full object-contain p-0.5"
                />
              ) : (
                <Package className={`w-full h-full p-1 ${comp.fully_scanned ? theme.scannedIconColor : theme.textMuted}`} />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-[9px] font-medium ${comp.fully_scanned ? theme.scannedText : theme.textMuted} truncate`}>
                {comp.product_name}
              </p>
              <div className="flex items-center justify-between">
                <code className={`text-[7px] ${comp.fully_scanned ? theme.scannedCodeBg : theme.bgCard} bg-opacity-30 px-1 py-0.5 rounded ${comp.fully_scanned ? theme.scannedTextMuted : theme.textMuted}`}>
                  {comp.sku}
                </code>
                {/* UPDATED: Show scanned_qty/ordered_qty for components too */}
                <span className={`text-[8px] font-bold ${comp.fully_scanned ? 'text-green-400' : theme.textMuted}`}>
                  {comp.scanned_qty || 0}/{comp.ordered_qty || 1}
                </span>
              </div>
            </div>
            {comp.fully_scanned && (
              <Check className={`h-3 w-3 text-green-400 flex-shrink-0`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );

  // Completed Regular Item Component
  const CompletedItem = ({ item }) => (
    <div className={`p-2 ${theme.scannedBg} backdrop-blur rounded-xl border ${theme.scannedBorder}`}>
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-white/20 rounded-lg overflow-hidden flex-shrink-0 border ${theme.scannedBorder}">
          {item.image_url ? (
            <img 
              src={item.image_url} 
              alt={item.product_name}
              className="w-full h-full object-contain p-1"
            />
          ) : (
            <Package className={`w-full h-full p-2 ${theme.scannedIconColor}`} />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className={`text-xs font-medium ${theme.scannedText} truncate`}>
            {item.product_name || "Unknown Product"}
          </p>
          <div className="flex items-center justify-between mt-1">
            <code className={`text-[9px] ${theme.scannedCodeBg} px-1 py-0.5 rounded ${theme.scannedTextMuted}`}>
              {item.sku}
            </code>
            <span className={`text-sm font-bold ${item.display_qty === item.total_qty ? 'text-green-400' : theme.scannedText}`}>
              {item.display_qty || 0}/{item.total_qty || 1}
              {item.display_qty < item.total_qty && (
                <span className="ml-1 text-[8px] text-yellow-400">(partial)</span>
              )}
            </span>
          </div>
        </div>
        {item.display_qty === item.total_qty ? (
          <Check className={`h-4 w-4 text-green-400 flex-shrink-0`} />
        ) : (
          <div className="h-4 w-4 rounded-full border-2 border-yellow-400 flex-shrink-0" />
        )}
      </div>
    </div>
  );

  if (!selectedSounds) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500">
        <div className="bg-white/90 backdrop-blur-md rounded-2xl p-8 shadow-2xl">
          <Loader2 className="h-12 w-12 animate-spin text-purple-600 mx-auto mb-4" />
          <p className="text-gray-700">Loading preferences...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen w-full relative overflow-hidden transition-all duration-500 bg-gradient-to-br ${theme.gradient}`}>
      {/* Success Modal */}
      {showSuccessModal && completedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn backdrop-blur-sm" onClick={() => setShowSuccessModal(false)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden transform animate-slideIn" onClick={(e) => e.stopPropagation()}>
            <div className={`bg-gradient-to-r from-${theme.accentColor}-500 to-${theme.accentColor}-600 p-6 text-center`}>
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-4">
                <Award className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Order Complete!</h2>
              <p className="text-white/80">Successfully scanned and packed</p>
            </div>
            <div className="p-6">
              <div className="text-center mb-6">
                <p className="text-3xl font-bold text-gray-900 mb-2">{completedOrder.order_name}</p>
                <p className="text-gray-600">has been completely scanned and packed</p>
              </div>
              
              <div className="bg-green-50 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Items scanned:</span>
                  <span className="font-bold text-green-700">
                    {scannedItems.length}/{completedOrder.items?.length || 0}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className={`bg-gradient-to-r from-${theme.accentColor}-500 to-${theme.accentColor}-600 h-2.5 rounded-full`}
                    style={{ width: '100%' }}
                  />
                </div>
              </div>
              
              <div className="flex justify-center">
                <button
                  onClick={() => {
                    setShowSuccessModal(false);
                    resetScanner();
                  }}
                  className={`px-6 py-3 bg-gradient-to-r from-${theme.accentColor}-600 to-${theme.accentColor}-700 text-white rounded-xl font-medium hover:from-${theme.accentColor}-700 hover:to-${theme.accentColor}-800 transition-all`}
                >
                  Start New Scan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modals */}
      <ConfirmationModal
        isOpen={showNewScanConfirm}
        onClose={() => setShowNewScanConfirm(false)}
        onConfirm={confirmNewScan}
        title="Start New Scan"
        message="Starting a new scan will clear the current order progress. Are you sure you want to continue?"
        icon={RefreshCw}
      />

      <ConfirmationModal
        isOpen={showDashboardConfirm}
        onClose={() => setShowDashboardConfirm(false)}
        onConfirm={confirmDashboard}
        title="Go to Dashboard"
        message="You will be redirected to the dashboard. Current scan progress will be saved. Are you sure you want to continue?"
        icon={LayoutDashboard}
      />

      <ConfirmationModal
        isOpen={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
        onConfirm={confirmLogout}
        title="Logout"
        message="Are you sure you want to logout? Any unsaved progress will be lost."
        icon={LogOut}
      />

      {/* Theme Modal */}
      {showThemeModal && <ThemeModal />}
      
      {/* Sound Modal */}
      {showSoundModal && <SoundModal />}

      {/* Control Buttons Container */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-row gap-2">
        {/* Toggle Header Button */}
        <button
          onClick={toggleHeaderVisibility}
          className="p-1.5 sm:p-2 md:p-2.5 rounded-lg bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 transition-all shadow-lg"
          title={isHeaderVisible ? "Hide Header" : "Show Header"}
        >
          <Menu className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
        </button>

        {/* Toggle Fullscreen Button */}
        <button
          onClick={toggleFullscreen}
          className="p-1.5 sm:p-2 md:p-2.5 rounded-lg bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 transition-all shadow-lg"
          title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
        >
          {isFullscreen ? (
            <Minimize2 className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
          ) : (
            <Maximize2 className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
          )}
        </button>
      </div>

      {/* Header */}
      <div 
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 transform ${
          isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className={`w-full ${theme.bgCard} backdrop-blur-md border-b ${theme.borderColor} shadow-lg px-3 sm:px-4 md:px-6 py-3 sm:py-4`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className={`bg-gradient-to-r from-${theme.accentColor}-400 to-${theme.accentColor}-500 p-2 sm:p-3 rounded-xl shadow-lg`}>
                <Scan className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-white" />
              </div>
              <div>
                <h1 className={`text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold ${theme.textColor}`}>
                  Order Packing Scanner
                </h1>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              <button
                onClick={() => setShowThemeModal(true)}
                className={`inline-flex items-center px-2 sm:px-3 py-1.5 sm:py-2 ${theme.bgCard} backdrop-blur-sm ${theme.textColor} rounded-lg text-xs sm:text-sm font-medium hover:bg-opacity-80 transition-all border ${theme.borderColor}`}
              >
                <Palette className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="hidden xs:inline">Theme</span>
                <span className="ml-1 text-base sm:text-lg">{BACKGROUND_THEMES[currentTheme].emoji}</span>
              </button>
              
              <button
                onClick={() => setShowSoundModal(true)}
                className={`inline-flex items-center px-2 sm:px-3 py-1.5 sm:py-2 ${theme.bgCard} backdrop-blur-sm ${theme.textColor} rounded-lg text-xs sm:text-sm font-medium hover:bg-opacity-80 transition-all border ${theme.borderColor}`}
              >
                <Volume2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="hidden xs:inline">Sounds</span>
              </button>
              
              {admin && (
                <div className={`${theme.bgCard} backdrop-blur-sm px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg border ${theme.borderColor}`}>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <User className={`h-3 w-3 sm:h-4 sm:w-4 ${theme.textMuted}`} />
                    <span className={`font-medium ${theme.textColor} truncate max-w-[60px] sm:max-w-[100px] md:max-w-[150px] text-xs sm:text-sm`}>{admin.name}</span>
                    <span className={`px-1.5 sm:px-2 py-0.5 sm:py-1 bg-gradient-to-r from-${theme.accentColor}-400 to-${theme.accentColor}-500 text-white text-[10px] sm:text-xs font-medium rounded-full hidden sm:inline`}>
                      {admin.role}
                    </span>
                  </div>
                </div>
              )}
              
              <button
                onClick={handleNewScan}
                className={`inline-flex items-center px-2 sm:px-3 py-1.5 sm:py-2 bg-gradient-to-r from-${theme.accentColor}-500 to-${theme.accentColor}-600 text-white rounded-lg text-xs sm:text-sm font-medium hover:from-${theme.accentColor}-600 hover:to-${theme.accentColor}-700 transition-all transform hover:scale-105 active:scale-95 shadow-lg border ${theme.borderColor}`}
              >
                <RefreshCw className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="hidden xs:inline">New Scan</span>
              </button>
              
              <button
                onClick={handleDashboard}
                className="inline-flex items-center px-2 sm:px-3 py-1.5 sm:py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg text-xs sm:text-sm font-medium hover:from-yellow-600 hover:to-orange-600 transition-all transform hover:scale-105 active:scale-95 shadow-lg border border-white/20"
              >
                <LayoutDashboard className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="hidden xs:inline">Dashboard</span>
              </button>

              <button
                onClick={handleLogout}
                className="inline-flex items-center px-2 sm:px-3 py-1.5 sm:py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg text-xs sm:text-sm font-medium hover:from-red-600 hover:to-pink-600 transition-all transform hover:scale-105 active:scale-95 shadow-lg border border-white/20"
              >
                <LogOut className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="hidden xs:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Rest of the component remains the same */}
      <div className={`w-full min-h-screen transition-all duration-300 ${isHeaderVisible ? 'pt-16 sm:pt-20 md:pt-24' : 'pt-0'}`}>
        <div className="w-full p-2 sm:p-3 md:p-4 lg:p-6">
          {/* The rest of your existing JSX remains unchanged */}
          {order ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
              {/* Left Column - Pending Items */}
              <div className="lg:col-span-3 order-2 lg:order-1">
                <div className={`${theme.bgCard} backdrop-blur-md rounded-xl sm:rounded-2xl shadow-2xl border ${theme.borderColor} h-auto lg:h-[calc(100vh-100px)] overflow-hidden sticky top-4`}>
                  <div className={`bg-gradient-to-r from-${theme.accentColor}-500 to-${theme.accentColor}-600 p-2 sm:p-3 md:p-4`}>
                    <h3 className="text-white font-bold flex items-center text-xs sm:text-sm md:text-base">
                      <Package className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                      Pending Items
                    </h3>
                    <p className="text-white/80 text-[8px] sm:text-[10px] md:text-xs mt-0.5 sm:mt-1">
                      {order.items?.filter(i => {
                        if (i.is_bundle) {
                          return i.bundle_components?.some(comp => !comp.fully_scanned);
                        }
                        return !i.fully_scanned;
                      }).length || 0} items left to scan
                    </p>
                  </div>
                  
                  <div className="overflow-y-auto max-h-[250px] sm:max-h-[300px] lg:max-h-[calc(100%-80px)] p-1.5 sm:p-2 md:p-3 space-y-1.5 sm:space-y-2 md:space-y-3">
                    {order.items?.map((item, idx) => {
                      if (item.is_bundle) {
                        const pendingComponents = item.bundle_components?.filter(comp => !comp.fully_scanned) || [];
                        const totalComponents = item.bundle_components?.length || 0;
                        const scannedComponents = item.bundle_components?.filter(comp => comp.fully_scanned).length || 0;
                        
                        if (pendingComponents.length === 0) return null;
                        
                        return (
                          <div 
                            key={idx}
                            className={`p-1.5 sm:p-2 md:p-3 rounded-xl border-2 transition-all ${theme.bgCard} bg-opacity-50 border ${theme.borderColor} ${theme.bgCardHover}`}
                          >
                            <div 
                              className="flex items-center gap-1.5 sm:gap-2 cursor-pointer"
                              onClick={() => toggleBundleExpand(item.sku)}
                            >
                              <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center">
                                {item.image_url ? (
                                  <img 
                                    src={item.image_url} 
                                    alt={item.product_name}
                                    className="w-full h-full object-contain p-0.5"
                                  />
                                ) : (
                                  <BundleIcon className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white" />
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-0.5 sm:gap-1 flex-wrap">
                                  <p className={`text-[9px] sm:text-[10px] md:text-xs font-medium ${theme.textColor} truncate`}>
                                    {item.product_name}
                                  </p>
                                  <span className="px-0.5 sm:px-1 py-0.5 bg-purple-500/30 text-purple-700 text-[6px] sm:text-[7px] md:text-[8px] font-bold rounded-full border border-purple-500/30 whitespace-nowrap">
                                    BUNDLE
                                  </span>
                                </div>
                                <div className="flex items-center justify-between mt-0.5">
                                  <code className={`text-[6px] sm:text-[7px] md:text-[10px] ${theme.bgCard} bg-opacity-30 px-0.5 sm:px-1 py-0.5 rounded ${theme.textMuted}`}>
                                    {item.sku}
                                  </code>
                                  {/* UPDATED: Show scanned_qty/total_qty for bundles too */}
                                  <span className={`text-[8px] sm:text-[10px] md:text-sm font-bold text-${theme.accentColor}-400`}>
                                    {scannedComponents}/{totalComponents}
                                  </span>
                                </div>
                              </div>
                              <ChevronRight className={`h-2 w-2 sm:h-3 sm:w-3 md:h-4 md:w-4 ${theme.textMuted} transition-transform flex-shrink-0 ${expandedBundles[item.sku] ? 'rotate-90' : ''}`} />
                            </div>

                            {expandedBundles[item.sku] && (
                              <div className="mt-1 sm:mt-2 md:mt-3 space-y-1 sm:space-y-2">
                                {item.bundle_components
                                  ?.filter(comp => !comp.fully_scanned)
                                  .map((comp, compIdx) => (
                                    <div 
                                      key={compIdx}
                                      data-sku={comp.sku}
                                      className={`p-1 sm:p-1.5 md:p-2 rounded-lg border ${theme.borderColor} ${theme.bgCard} bg-opacity-30`}
                                    >
                                      <div className="flex items-center gap-1 sm:gap-2">
                                        <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-white/10 rounded-lg overflow-hidden flex-shrink-0">
                                          {comp.image_url ? (
                                            <img 
                                              src={comp.image_url} 
                                              alt={comp.product_name}
                                              className="w-full h-full object-contain p-0.5"
                                            />
                                          ) : (
                                            <Package className={`w-full h-full p-0.5 ${theme.textMuted}`} />
                                          )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                          <div className="flex items-center justify-between gap-1 sm:gap-2">
                                            <p className={`text-[8px] sm:text-[9px] md:text-xs ${theme.textColor} truncate`}>
                                              {comp.product_name}
                                            </p>
                                            {/* UPDATED: Show scanned_qty/ordered_qty for components */}
                                            <span className={`text-[8px] sm:text-[10px] md:text-sm font-bold ${theme.textColor} flex-shrink-0`}>
                                              {comp.scanned_qty || 0}/{comp.ordered_qty || 1}
                                            </span>
                                          </div>
                                          <code className={`text-[6px] sm:text-[7px] md:text-[8px] ${theme.bgCard} bg-opacity-30 px-0.5 py-0.5 rounded ${theme.textMuted} inline-block mt-0.5`}>
                                            {comp.sku}
                                          </code>
                                        </div>
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
                            className={`p-1.5 sm:p-2 md:p-3 rounded-xl border-2 transition-all ${theme.bgCard} bg-opacity-50 border ${theme.borderColor} ${theme.bgCardHover}`}
                          >
                            <div className="flex items-center gap-1.5 sm:gap-2">
                              <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-white/10 rounded-lg overflow-hidden flex-shrink-0">
                                {item.image_url ? (
                                  <img 
                                    src={item.image_url} 
                                    alt={item.product_name}
                                    className="w-full h-full object-contain p-0.5"
                                  />
                                ) : (
                                  <Package className={`w-full h-full p-1 ${theme.textMuted}`} />
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-1 sm:gap-2">
                                  <p className={`text-[9px] sm:text-[10px] md:text-xs font-medium ${theme.textColor} truncate`}>
                                    {item.product_name || "Unknown Product"}
                                  </p>
                                  <span className={`text-[8px] sm:text-[10px] md:text-sm font-bold ${theme.textColor} flex-shrink-0`}>
                                    {item.scanned_qty || 0}/{item.ordered_qty || 1}
                                  </span>
                                </div>
                                <code className={`text-[6px] sm:text-[7px] md:text-[10px] ${theme.bgCard} bg-opacity-30 px-0.5 sm:px-1 py-0.5 rounded ${theme.textMuted} inline-block mt-0.5`}>
                                  {item.sku}
                                </code>
                              </div>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    })}
                    
                    {order.items?.filter(i => {
                      if (i.is_bundle) {
                        return i.bundle_components?.some(comp => !comp.fully_scanned);
                      }
                      return !i.fully_scanned;
                    }).length === 0 && (
                      <div className="text-center py-4 sm:py-6 md:py-8">
                        <CheckCircle className={`h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 ${theme.textMuted} mx-auto mb-2 sm:mb-3`} />
                        <p className={`text-xs sm:text-sm ${theme.textMuted}`}>All items scanned!</p>
                        <p className={`text-[10px] sm:text-xs ${theme.textMuted} mt-1 sm:mt-2`}>Scan tracking label to complete</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Middle Column - Current Item to Scan */}
              <div className="lg:col-span-6 order-1 lg:order-2">
                <div className={`${theme.bgCard} backdrop-blur-md rounded-xl sm:rounded-2xl shadow-2xl border ${theme.borderColor} overflow-hidden`}>
                  <div className={`bg-gradient-to-r from-${theme.accentColor}-500 via-${theme.accentColor}-400 to-${theme.accentColor}-500 p-3 sm:p-4 md:p-6`}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3 mb-2 sm:mb-4">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="bg-white/20 p-1.5 sm:p-2 md:p-3 rounded-xl">
                          <Barcode className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-8 lg:w-8 text-white" />
                        </div>
                        <div>
                          <h2 className="text-sm sm:text-base md:text-lg lg:text-2xl font-bold text-white">
                            Order: {order.order_name}
                          </h2>
                        </div>
                      </div>
                      
                      <div className="bg-white/20 px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-lg backdrop-blur self-start sm:self-auto">
                        <span className="text-white font-bold text-xs sm:text-sm md:text-base">
                          Progress: {getCompletionPercentage()}%
                        </span>
                      </div>
                    </div>

                    <div className="w-full bg-white/20 rounded-full h-1 sm:h-1.5 md:h-2 mb-3 sm:mb-4">
                      <div 
                        className={`bg-gradient-to-r from-yellow-300 to-green-300 h-1 sm:h-1.5 md:h-2 rounded-full transition-all duration-500`}
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
                            ? "Scan tracking label barcode..."
                            : nextItemToScan 
                              ? `Scan: ${nextItemToScan.sku} (${nextItemToScan.pending_qty || 1} left)`
                              : "Scan product SKU barcode..."
                        }
                        className="w-full px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 pr-20 sm:pr-24 md:pr-32 rounded-xl text-xs sm:text-sm md:text-lg focus:ring-4 focus:ring-purple-300 border-2 border-white/50 bg-white/95 placeholder-gray-500"
                        disabled={loading || order?.scan_status === "scanned"}
                        autoComplete="off"
                        autoFocus
                      />
                      
                      <div className="absolute right-1.5 sm:right-2 top-1/2 transform -translate-y-1/2 flex gap-1 sm:gap-2">
                        <button
                          onClick={handleManualInput}
                          className="px-1.5 sm:px-2 md:px-4 py-1 sm:py-1.5 md:py-2 bg-white/20 text-white rounded-lg text-[10px] sm:text-xs md:text-sm font-medium hover:bg-white/30 transition-all whitespace-nowrap"
                        >
                          Manual
                        </button>
                        
                        <button
                          onClick={() => handleAutoScan()}
                          disabled={loading || !input.trim()}
                          className="px-2 sm:px-3 md:px-6 py-1 sm:py-1.5 md:py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg text-[10px] sm:text-xs md:text-sm font-medium hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 transition-all transform hover:scale-105 active:scale-95 whitespace-nowrap"
                        >
                          {loading ? <Loader2 className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 animate-spin" /> : "Scan"}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Next Item Display */}
                  <div className="p-2 sm:p-3 md:p-5">
                    {nextItemToScan ? (
                      <div className="text-center">
                        <div className={`${theme.bgCard} bg-opacity-30 backdrop-blur border-2 sm:border-4 ${theme.borderColor} rounded-xl sm:rounded-2xl mb-2 sm:mb-3 md:mb-4`}>
                          <div className="h-32 sm:h-48 md:h-64 lg:h-80 w-full flex items-center justify-center p-2 sm:p-4">
                            {nextItemToScan.image_url ? (
                              <img
                                src={nextItemToScan.image_url}
                                alt={nextItemToScan.product_name}
                                className="max-h-full max-w-full object-contain"
                              />
                            ) : (
                              <div className="flex flex-col items-center">
                                <Package className={`h-16 w-16 sm:h-24 sm:w-24 md:h-32 md:w-32 lg:h-48 lg:w-48 ${theme.textMuted}`} />
                                <p className={`mt-1 sm:mt-2 md:mt-4 text-xs sm:text-sm md:text-lg ${theme.textMuted}`}>No image available</p>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3 md:gap-4 mb-2 sm:mb-3 md:mb-4">
                          <div className={`${theme.bgCard} bg-opacity-30 backdrop-blur rounded-xl p-1.5 sm:p-2 md:p-3 flex-1`}>
                            <code className={`text-xs sm:text-sm md:text-base lg:text-xl xl:text-2xl font-bold ${theme.textColor} font-mono tracking-wider bg-white/10 rounded-lg inline-block px-1.5 sm:px-2 py-0.5 sm:py-1 break-all`}>
                              {nextItemToScan.sku}
                            </code>
                          </div>
                          
                          <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-6">
                            <div className={`${theme.bgCard} bg-opacity-30 backdrop-blur px-1.5 sm:px-2 md:px-3 py-1 sm:py-1.5 md:py-2 rounded-xl text-center`}>
                              <span className={`text-[8px] sm:text-[9px] md:text-xs ${theme.textMuted} block mb-0.5 sm:mb-1`}>Left</span>
                              <span className={`text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold ${theme.textColor}`}>
                                {nextItemToScan.pending_qty || 1}
                              </span>
                            </div>
                            
                            <div className={`${theme.bgCard} bg-opacity-30 backdrop-blur px-1.5 sm:px-2 md:px-3 py-1 sm:py-1.5 md:py-2 rounded-xl text-center`}>
                              <span className={`text-[8px] sm:text-[9px] md:text-xs ${theme.textMuted} block mb-0.5 sm:mb-1`}>Total</span>
                              <span className={`text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold ${theme.textColor}`}>
                                {nextItemToScan.ordered_qty}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        {nextItemToScan.is_part_of_bundle && (
                          <p className={`text-[10px] sm:text-xs md:text-sm ${theme.textMuted}`}>
                            Part of bundle: <span className="font-bold text-purple-400">{nextItemToScan.bundle_name}</span>
                          </p>
                        )}
                      </div>
                    ) : scanMode === "tracking" ? (
                      <div className="text-center py-4 sm:py-6 md:py-8 lg:py-12">
                        <div className={`${theme.infoBg} backdrop-blur border-2 sm:border-4 ${theme.infoBorder} rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 max-w-md mx-auto`}>
                          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mb-2 sm:mb-3 md:mb-4 lg:mb-6">
                            <Check className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-white" />
                          </div>
                          <h2 className={`text-base sm:text-lg md:text-xl lg:text-2xl font-bold ${theme.textColor} mb-1 sm:mb-2 md:mb-3 lg:mb-4`}>
                            All Items Scanned!
                          </h2>
                          <p className={`text-[10px] sm:text-xs md:text-sm ${theme.textMuted} mb-2 sm:mb-3 md:mb-4 lg:mb-6`}>
                            All items have been scanned. Now scan the tracking label to complete the order.
                          </p>
                          <div className={`${theme.bgCard} bg-opacity-30 backdrop-blur rounded-xl p-2 sm:p-3 md:p-4`}>
                            <p className={`text-[8px] sm:text-[10px] md:text-sm ${theme.textMuted} mb-1 sm:mb-2`}>Tracking Number:</p>
                            <code className={`text-xs sm:text-sm md:text-base lg:text-xl font-bold ${theme.textColor} font-mono break-all`}>
                              {order.tracking_number || "Ready to scan"}
                            </code>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-4 sm:py-6 md:py-8 lg:py-12">
                        <Package className={`h-8 w-8 sm:h-12 sm:w-12 md:h-16 md:w-16 ${theme.textMuted} mx-auto mb-2 sm:mb-3 md:mb-4`} />
                        <h3 className={`text-sm sm:text-base md:text-lg lg:text-xl font-bold ${theme.textColor} mb-1 sm:mb-2`}>No Items to Scan</h3>
                        <p className={`text-[10px] sm:text-xs md:text-sm ${theme.textMuted}`}>All items have been scanned successfully</p>
                      </div>
                    )}

                    {(message || error) && (
                      <div className="mt-3 sm:mt-4 md:mt-6 space-y-1.5 sm:space-y-2 md:space-y-3">
                        {message && (
                          <div className={`p-2 sm:p-3 md:p-4 rounded-xl backdrop-blur text-[10px] sm:text-xs md:text-sm ${
                            message.includes("⚠️") 
                              ? `${theme.warningBg} border ${theme.warningBorder} ${theme.warningText}`
                              : message.includes("✅") 
                                ? `${theme.successBg} border ${theme.successBorder} ${theme.successText}`
                                : `${theme.infoBg} border ${theme.infoBorder} ${theme.infoText}`
                          }`}>
                            <div className="flex items-center">
                              {message.includes("⚠️") && <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 flex-shrink-0" />}
                              {message.includes("✅") && <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 flex-shrink-0" />}
                              {!message.includes("⚠️") && !message.includes("✅") && <Info className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 flex-shrink-0" />}
                              <span className="break-words">{message}</span>
                            </div>
                          </div>
                        )}
                        {error && (
                          <div className={`p-2 sm:p-3 md:p-4 ${theme.errorBg} backdrop-blur border ${theme.errorBorder} rounded-xl ${theme.errorText} text-[10px] sm:text-xs md:text-sm`}>
                            <div className="flex items-center">
                              <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 flex-shrink-0" />
                              <span className="break-words">{error}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column - Completed Items */}
              <div className="lg:col-span-3 order-3">
                <div className={`${theme.bgCard} backdrop-blur-md rounded-xl sm:rounded-2xl shadow-2xl border ${theme.borderColor} h-auto lg:h-[calc(100vh-100px)] overflow-hidden sticky top-4`}>
                  <div className={`bg-gradient-to-r from-${theme.accentColor}-500 to-${theme.accentColor}-600 p-2 sm:p-3 md:p-4`}>
                    <h3 className="text-white font-bold flex items-center text-xs sm:text-sm md:text-base">
                      <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                      Completed Items
                    </h3>
                    <p className="text-white/80 text-[8px] sm:text-[10px] md:text-xs mt-0.5 sm:mt-1">
                      {scannedItems.length} items scanned
                    </p>
                  </div>
                  
                  <div className="overflow-y-auto max-h-[250px] sm:max-h-[300px] lg:max-h-[calc(100%-80px)] p-1.5 sm:p-2 md:p-3 space-y-1.5 sm:space-y-2 md:space-y-3">
                    {scannedItems.length > 0 ? (
                      scannedItems.map((item, idx) => (
                        item.is_bundle ? (
                          <CompletedBundleItem key={idx} bundle={item} />
                        ) : (
                          <CompletedItem key={idx} item={item} />
                        )
                      ))
                    ) : (
                      <div className="text-center py-4 sm:py-6 md:py-8">
                        <Package className={`h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 ${theme.textMuted} mx-auto mb-2 sm:mb-3`} />
                        <p className={`text-xs sm:text-sm ${theme.textMuted}`}>No items scanned yet</p>
                        <p className={`text-[10px] sm:text-xs ${theme.textMuted} mt-1 sm:mt-2`}>Scan items to see them here</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center min-h-[calc(100vh-150px)] sm:min-h-[calc(100vh-180px)]">
              <div className="max-w-2xl w-full px-2 sm:px-4">
                <div className={`${theme.bgCard} backdrop-blur-md rounded-xl sm:rounded-2xl shadow-2xl border ${theme.borderColor} p-4 sm:p-6 md:p-8`}>
                  <div className="text-center mb-4 sm:mb-6 md:mb-8">
                    <div className={`inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-r from-${theme.accentColor}-400 to-${theme.accentColor}-500 rounded-full mb-3 sm:mb-4`}>
                      <Barcode className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-white" />
                    </div>
                    <h2 className={`text-xl sm:text-2xl md:text-3xl font-bold ${theme.textColor} mb-1 sm:mb-2`}>Ready to Scan</h2>
                    <p className={`text-xs sm:text-sm md:text-base ${theme.textMuted}`}>Scan an order barcode to begin packing</p>
                  </div>

                  <div className="relative mb-4 sm:mb-6">
                    <input
                      ref={inputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Scan order barcode here..."
                      className="w-full px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 pr-20 sm:pr-24 md:pr-32 rounded-xl text-xs sm:text-sm md:text-lg focus:ring-4 focus:ring-purple-300 border-2 border-white/50 bg-white/95 placeholder-gray-500"
                      autoFocus
                    />
                    
                    <div className="absolute right-1.5 sm:right-2 top-1/2 transform -translate-y-1/2">
                      <button
                        onClick={() => handleAutoScan()}
                        disabled={loading || !input.trim()}
                        className={`px-2 sm:px-3 md:px-6 py-1 sm:py-1.5 md:py-2 bg-gradient-to-r from-${theme.accentColor}-500 to-${theme.accentColor}-600 text-white rounded-lg text-[10px] sm:text-xs md:text-sm font-medium hover:from-${theme.accentColor}-600 hover:to-${theme.accentColor}-700 disabled:opacity-50 transition-all transform hover:scale-105 active:scale-95 whitespace-nowrap`}
                      >
                        {loading ? <Loader2 className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 animate-spin" /> : "Scan"}
                      </button>
                    </div>
                  </div>

                  {error && (
                    <div className={`p-2 sm:p-3 md:p-4 ${theme.errorBg} backdrop-blur border ${theme.errorBorder} rounded-xl ${theme.errorText} mb-3 sm:mb-4 text-[10px] sm:text-xs md:text-sm`}>
                      <div className="flex items-center">
                        <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 flex-shrink-0" />
                        <span className="break-words">{error}</span>
                      </div>
                    </div>
                  )}
                </div>

                {scanHistory.length > 0 && (
                  <div className={`mt-4 sm:mt-6 md:mt-8 ${theme.bgCard} backdrop-blur-md rounded-xl sm:rounded-2xl shadow-2xl border ${theme.borderColor} p-3 sm:p-4 md:p-6`}>
                    <h3 className={`text-sm sm:text-base md:text-lg font-bold ${theme.textColor} mb-2 sm:mb-3 md:mb-4 flex items-center`}>
                      <Clock className={`h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 mr-1 sm:mr-2 ${theme.textMuted}`} />
                      Recent Scans
                    </h3>
                    
                    <div className="space-y-1.5 sm:space-y-2 md:space-y-3">
                      {scanHistory.map((scan, idx) => (
                        <div key={idx} className={`flex items-center justify-between p-1.5 sm:p-2 md:p-3 ${theme.bgCard} bg-opacity-30 backdrop-blur rounded-xl border ${theme.borderColor}`}>
                          <div>
                            <p className={`text-[10px] sm:text-xs md:text-sm font-medium ${theme.textColor}`}>{scan.orderId}</p>
                            <p className={`text-[8px] sm:text-[9px] md:text-xs ${theme.textMuted}`}>{scan.timestamp}</p>
                          </div>
                          <span className={`text-[8px] sm:text-[9px] md:text-xs ${theme.textMuted}`}>
                            {scan.items}/{scan.totalItems} items
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .scan-highlight {
          animation: highlight-pulse 1s ease;
          box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.5);
          z-index: 10;
          position: relative;
        }
        
        @keyframes highlight-pulse {
          0% { box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.7); transform: scale(1); }
          50% { box-shadow: 0 0 0 15px rgba(139, 92, 246, 0.3); transform: scale(1.02); }
          100% { box-shadow: 0 0 0 0 rgba(139, 92, 246, 0); transform: scale(1); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideIn {
          from { transform: translateY(-50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease;
        }
        
        .animate-slideIn {
          animation: slideIn 0.4s ease;
        }
        
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        
        .hover\\:scale-105:hover {
          transform: scale(1.05);
        }
        
        .active\\:scale-95:active {
          transform: scale(0.95);
        }
        
        .overflow-y-auto::-webkit-scrollbar {
          width: 3px;
          height: 3px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 10px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }
        
        .backdrop-blur {
          backdrop-filter: blur(10px);
        }
        
        .backdrop-blur-md {
          backdrop-filter: blur(20px);
        }
        
        .backdrop-blur-sm {
          backdrop-filter: blur(5px);
        }

        /* Extra small devices (phones, 480px and down) */
        @media (max-width: 480px) {
          .xs\\:inline {
            display: inline;
          }
        }
      `}</style>
    </div>
  );
}