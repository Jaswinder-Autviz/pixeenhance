import { PresetSize } from './types';

export const PRESET_SIZES: PresetSize[] = [
  // Social Media
  {
    id: 'ig-square',
    category: 'Social',
    name: 'Instagram Square (1:1)',
    width: 1080,
    height: 1080,
    aspectRatioLabel: '1:1',
    description: '1080 × 1080 px — Recommended for feed posts'
  },
  {
    id: 'ig-portrait',
    category: 'Social',
    name: 'Instagram Portrait (4:5)',
    width: 1080,
    height: 1350,
    aspectRatioLabel: '4:5',
    description: '1080 × 1350 px — Maximum vertical feed screen estate'
  },
  {
    id: 'ig-landscape',
    category: 'Social',
    name: 'Instagram Landscape (1.91:1)',
    width: 1080,
    height: 566,
    aspectRatioLabel: '1.91:1',
    description: '1080 × 566 px — Horizontal feed photo'
  },
  {
    id: 'yt-thumb',
    category: 'Social',
    name: 'YouTube Thumbnail (16:9)',
    width: 1280,
    height: 720,
    aspectRatioLabel: '16:9',
    description: '1280 × 720 px — HD video thumbnail requirement'
  },

  // Displays & Monitors
  {
    id: 'display-1080p',
    category: 'Display',
    name: 'Full HD 1080p',
    width: 1920,
    height: 1080,
    aspectRatioLabel: '16:9',
    description: '1920 × 1080 px — Standard desktop & TV monitor'
  },
  {
    id: 'display-2k',
    category: 'Display',
    name: '2K QHD 1440p',
    width: 2560,
    height: 1440,
    aspectRatioLabel: '16:9',
    description: '2560 × 1440 px — High resolution desktop displays'
  },
  {
    id: 'display-4k',
    category: 'Display',
    name: '4K Ultra HD',
    width: 3840,
    height: 2160,
    aspectRatioLabel: '16:9',
    description: '3840 × 2160 px — 4K UHD video and wallpaper'
  },

  // Print & Publishing
  {
    id: 'a4-portrait',
    category: 'Print',
    name: 'A4 Portrait (300 DPI)',
    width: 2480,
    height: 3508,
    aspectRatioLabel: '1:1.41',
    description: '2480 × 3508 px — ISO 216 A4 print document standard'
  },
  {
    id: 'a4-landscape',
    category: 'Print',
    name: 'A4 Landscape (300 DPI)',
    width: 3508,
    height: 2480,
    aspectRatioLabel: '1.41:1',
    description: '3508 × 2480 px — ISO 216 A4 landscape print'
  },
  {
    id: 'print-6x9',
    category: 'Print',
    name: '6×9 Book Cover / Photo (2:3)',
    width: 1800,
    height: 2700,
    aspectRatioLabel: '2:3',
    description: '1800 × 2700 px (300 DPI) — Standard trade paperback & photo ratio'
  }
];
