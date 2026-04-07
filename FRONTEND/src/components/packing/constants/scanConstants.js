import { Music, Music2, Volume1, Waves, Leaf, Mountain, Heart, Sparkles, Sun, Moon, Sunset } from "lucide-react";

export const SOUND_OPTIONS = {
  success: [
    { id: 'success1', name: 'Success Chime', url: 'https://cdn.jsdelivr.net/gh/AcharyaIT/Sound-Effect-Scan-page@main/success-Sounds/freesound_community-success-48018.mp3', icon: Music },
    { id: 'success2', name: 'Happy Bell', url: 'https://cdn.jsdelivr.net/gh/AcharyaIT/Sound-Effect-Scan-page@main/success-Sounds/freesound_community-success-fanfare-trumpets-6185.mp3', icon: Music2 },
    { id: 'success3', name: 'Triumph', url: 'https://cdn.jsdelivr.net/gh/AcharyaIT/Sound-Effect-Scan-page@main/success-Sounds/mrstokes302-success-videogame-sfx-423626.mp3', icon: Volume1 }
  ],
  scan: [
    { id: 'scan1', name: 'Beep', url: 'https://cdn.jsdelivr.net/gh/AcharyaIT/Sound-Effect-Scan-page@main/scan-Sounds/edr-percussive-wave-01-471672.mp3', icon: Music },
    { id: 'scan2', name: 'Click', url: 'https://cdn.jsdelivr.net/gh/AcharyaIT/Sound-Effect-Scan-page@main/scan-Sounds/freesound_community-doorscan-102283.mp3', icon: Music2 },
    { id: 'scan3', name: 'Pip', url: 'https://cdn.jsdelivr.net/gh/AcharyaIT/Sound-Effect-Scan-page@main/scan-Sounds/freesound_community-prompt-user-for-response-85808.mp3', icon: Volume1 }
  ],
  error: [
    { id: 'error1', name: 'Buzz', url: 'https://cdn.jsdelivr.net/gh/AcharyaIT/Sound-Effect-Scan-page@main/error-Sounds/freesound_community-windows-error-sound-effect-35894.mp3', icon: Music },
    { id: 'error2', name: 'Error Tone', url: 'https://cdn.jsdelivr.net/gh/AcharyaIT/Sound-Effect-Scan-page@main/error-Sounds/u_8iuwl7zrk0-error-170796.mp3', icon: Music2 },
    { id: 'error3', name: 'Failed', url: 'https://cdn.jsdelivr.net/gh/AcharyaIT/Sound-Effect-Scan-page@main/error-Sounds/universfield-error-011-352286.mp3', icon: Volume1 }
  ],
  warning: [
    { id: 'warning1', name: 'Alert', url: 'https://cdn.jsdelivr.net/gh/AcharyaIT/Sound-Effect-Scan-page@main/warning-Sounds/freesound_community-beep-warning-6387.mp3', icon: Music },
    { id: 'warning2', name: 'Caution', url: 'https://cdn.jsdelivr.net/gh/AcharyaIT/Sound-Effect-Scan-page@main/warning-Sounds/freesound_community-warning-sound-6686.mp3', icon: Music2 },
    { id: 'warning3', name: 'Notice', url: 'https://cdn.jsdelivr.net/gh/AcharyaIT/Sound-Effect-Scan-page@main/warning-Sounds/ribhavagrawal-horror-warning-230511.mp3', icon: Volume1 }
  ],
  complete: [
    { id: 'complete1', name: 'Fanfare', url: 'https://cdn.jsdelivr.net/gh/AcharyaIT/Sound-Effect-Scan-page@main/complete-Sounds/36505577-smooth-completed-notify-274735.mp3', icon: Music },
    { id: 'complete2', name: 'Celebration', url: 'https://cdn.jsdelivr.net/gh/AcharyaIT/Sound-Effect-Scan-page@main/complete-Sounds/36505577-smooth-completed-notify-starting-alert-274739.mp3', icon: Music2 },
    { id: 'complete3', name: 'Success Fanfare', url: 'https://cdn.jsdelivr.net/gh/AcharyaIT/Sound-Effect-Scan-page@main/complete-Sounds/freesound_community-level-win-6416.mp3', icon: Volume1 }
  ]
};

export const BACKGROUND_THEMES = {
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
    scannedCodeBg: "bg-green-500/30"
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
    scannedCodeBg: "bg-green-500/30"
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
    scannedCodeBg: "bg-green-600/30"
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
    scannedCodeBg: "bg-green-500/40"
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
    scannedCodeBg: "bg-green-400/40"
  }
};