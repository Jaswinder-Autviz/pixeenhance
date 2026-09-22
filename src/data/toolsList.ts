export type ToolCategory =
  | 'Compress'
  | 'Resize'
  | 'Convert'
  | 'Crop & Edit'
  | 'Social Media'
  | 'PDF Tools'
  | 'Utilities';

export interface ToolItem {
  id: string;
  slug: string;
  name: string;
  category: ToolCategory;
  shortDescription: string;
  icon: string;
  badge?: string;
  popular?: boolean;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  subtitle: string;
  features: string[];
  howToUse: string[];
  supportedFormats: string[];
  faqs: Array<{ question: string; answer: string }>;
  relatedSlugs: string[];
}

export const TOOLS_LIST: ToolItem[] = [
  // 1. Image Compressor
  {
    id: 'image-compressor',
    slug: '/image-compressor',
    name: 'Image Compressor',
    category: 'Convert',
    popular: true,
    badge: 'High Savings',
    shortDescription: 'Reduce image file sizes up to 85% without sacrificing visual fidelity. Fast & free.',
    icon: 'Minimize2',
    metaTitle: 'Free Image Compressor Online | PixEnhance',
    metaDescription: 'Compress JPG, PNG and WebP images online for free. Reduce image file size instantly with maximum quality and complete privacy.',
    h1: 'Free Online Image Compressor',
    subtitle: 'Compress JPEG, PNG, and WebP images with instant savings, maximum quality, and total privacy.',
    features: [
      'Lossy and visually lossless compression algorithms',
      'Target KB file size solver with automatic binary search',
      'Interactive side-by-side or split before/after comparison',
      'Instant download with zero waiting delay'
    ],
    howToUse: [
      'Upload or drag and drop any JPG, PNG, or WebP image.',
      'Adjust the compression quality slider or specify a target file size in KB.',
      'Review the real-time file size reduction and visual preview.',
      'Click Download Compressed Image to save the optimized file.'
    ],
    supportedFormats: ['JPG / JPEG', 'PNG', 'WebP'],
    faqs: [
      {
        question: 'Are my pictures uploaded or stored anywhere?',
        answer: 'Never. All compression takes place securely on your device. Your files stay strictly on your system and are never saved or shared.'
      },
      {
        question: 'Will compressing my image decrease its pixel dimensions?',
        answer: 'No. Compression optimizes the encoded color information and quantizes pixel data without changing the width or height.'
      },
      {
        question: 'How does the target file size feature work?',
        answer: 'PixEnhance runs an intelligent precision search across encoding qualities to accurately hit your requested target size.'
      }
    ],
    relatedSlugs: ['image-resizer', 'image-quality', 'jpg-to-webp', 'png-to-jpg']
  },

  // 2. Image Resizer
  {
    id: 'image-resizer',
    slug: '/image-resizer',
    name: 'Image Resizer',
    category: 'Resize',
    popular: true,
    badge: 'Precision',
    shortDescription: 'Scale images to custom pixel dimensions or preset percentages with aspect ratio lock.',
    icon: 'Maximize2',
    metaTitle: 'Free Image Resizer Online — Scale Photos by Pixels | PixEnhance',
    metaDescription: 'Resize images online for free. Change dimensions by width, height, percentage, or popular resolution presets with aspect ratio lock.',
    h1: 'Online Image Resizer',
    subtitle: 'Scale photos to exact dimensions or popular resolutions with high-precision bicubic interpolation.',
    features: [
      'Custom pixel width and height adjustment',
      'Aspect ratio lock with automatic dimension calculations',
      'One-click presets: 25%, 50%, 75%, FHD 1080p, 4K, 720p',
      'Multi-format export: preserve original, or output to WebP/PNG/JPG'
    ],
    howToUse: [
      'Select or drop your image into the resizer.',
      'Enter your desired width or height, or pick a preset percentage.',
      'Keep the aspect ratio lock checked to avoid stretching.',
      'Download your resized image instantly.'
    ],
    supportedFormats: ['JPG', 'PNG', 'WebP', 'GIF (first frame)', 'SVG'],
    faqs: [
      {
        question: 'Can I enlarge an image without losing quality?',
        answer: 'PixEnhance utilizes multi-pass canvas smoothing to minimize pixelation when enlarging, but downscaling is always sharper than upscaling.'
      },
      {
        question: 'What happens if I unlock the aspect ratio?',
        answer: 'Unlocking allows you to enter independent width and height values, which will stretch or condense the image into the exact canvas size.'
      }
    ],
    relatedSlugs: ['image-compressor', 'aspect-ratio-calculator', 'a4-image-resizer', 'instagram-image-resizer']
  },

  // 3. JPG to PNG
  {
    id: 'jpg-to-png',
    slug: '/jpg-to-png',
    name: 'JPG to PNG',
    category: 'Convert',
    popular: true,
    badge: 'Lossless',
    shortDescription: 'Convert JPEG/JPG images to lossless PNG format directly in your browser.',
    icon: 'FileImage',
    metaTitle: 'Convert JPG to PNG Online Free — Lossless High-Speed Converter | PixEnhance',
    metaDescription: 'Convert JPG to PNG online for free. Transform lossy JPEG images into crisp lossless PNGs with complete privacy and instant download.',
    h1: 'JPG to PNG Converter',
    subtitle: 'Fast, secure online conversion from JPEG to lossless PNG format.',
    features: [
      'High-fidelity conversion with zero quality loss',
      'Lossless 24-bit RGB PNG rendering',
      'Preserves original pixel dimensions',
      'Batch-ready high speed'
    ],
    howToUse: [
      'Upload your JPG or JPEG file.',
      'The conversion to PNG happens instantly in your browser.',
      'Inspect the side-by-side preview and resolution details.',
      'Click Download PNG to save.'
    ],
    supportedFormats: ['JPG', 'JPEG'],
    faqs: [
      {
        question: 'Why convert JPG to PNG?',
        answer: 'PNG uses lossless compression, preventing further quality degradation when editing, saving diagrams, or preparing images for design tools.'
      },
      {
        question: 'Does converting JPG to PNG make the file size larger?',
        answer: 'Yes, PNG is lossless and stores uncompressed or deflate-compressed pixel data, which is typically larger than lossy JPEG.'
      }
    ],
    relatedSlugs: ['png-to-jpg', 'jpg-to-webp', 'image-compressor']
  },

  // 4. PNG to JPG
  {
    id: 'png-to-jpg',
    slug: '/png-to-jpg',
    name: 'PNG to JPG',
    category: 'Convert',
    popular: true,
    badge: 'Small Size',
    shortDescription: 'Convert PNG to JPG with custom background color selector for transparent areas.',
    icon: 'Repeat',
    metaTitle: 'Convert PNG to JPG Online Free — Custom Background Fill | PixEnhance',
    metaDescription: 'Convert PNG images to JPG format for free. Choose background color for transparent pixels and adjust output quality locally in your browser.',
    h1: 'PNG to JPG Converter',
    subtitle: 'Convert transparent PNG files into compact JPEGs with custom background color fill.',
    features: [
      'Custom background color selector (white, black, custom hex) for alpha transparency',
      'Adjustable JPEG compression quality slider',
      'Significantly smaller file sizes for photographs',
      'Instant local canvas rendering'
    ],
    howToUse: [
      'Drop or select your PNG image.',
      'Choose the background color to replace transparent areas (default is pure white).',
      'Select your desired JPEG quality level.',
      'Click Download JPG.'
    ],
    supportedFormats: ['PNG'],
    faqs: [
      {
        question: 'What happens to transparent pixels in PNG when converted to JPG?',
        answer: 'Since the JPEG format does not support transparency (alpha channel), PixEnhance cleanly fills transparent pixels with your chosen background color.'
      }
    ],
    relatedSlugs: ['jpg-to-png', 'png-to-webp', 'image-compressor']
  },

  // 5. JPG to WebP
  {
    id: 'jpg-to-webp',
    slug: '/jpg-to-webp',
    name: 'JPG to WebP',
    category: 'Convert',
    popular: true,
    badge: 'Next-Gen',
    shortDescription: 'Convert JPG to modern WebP format for faster website loading speeds.',
    icon: 'Sparkles',
    metaTitle: 'Convert JPG to WebP Online Free — Next-Gen Web Optimization | PixEnhance',
    metaDescription: 'Convert JPG images to next-generation WebP format online for free. Reduce file sizes by 30-40% while preserving visual clarity.',
    h1: 'JPG to WebP Converter',
    subtitle: 'Transform standard JPEGs into next-gen WebP images to speed up web pages and improve Core Web Vitals.',
    features: [
      'Reduces file sizes by an extra 25-35% compared to JPEG',
      'Full control over WebP quality encoding',
      'Universal browser support across modern platforms',
      'Runs 100% offline in browser'
    ],
    howToUse: [
      'Upload your JPG image.',
      'Set the WebP quality level (80-85% is recommended for web).',
      'See instant file size savings calculation.',
      'Download your optimized WebP image.'
    ],
    supportedFormats: ['JPG', 'JPEG'],
    faqs: [
      {
        question: 'Is WebP better than JPG for websites?',
        answer: 'Yes. Google designed WebP specifically for the modern web. It provides identical or superior image quality at substantially smaller file sizes.'
      }
    ],
    relatedSlugs: ['webp-to-jpg', 'png-to-webp', 'image-compressor']
  },

  // 6. PNG to WebP
  {
    id: 'png-to-webp',
    slug: '/png-to-webp',
    name: 'PNG to WebP',
    category: 'Convert',
    badge: 'Transparent',
    shortDescription: 'Convert PNG to WebP while retaining full alpha transparency with 30%+ savings.',
    icon: 'Layers',
    metaTitle: 'Convert PNG to WebP Online Free — Retain Transparency | PixEnhance',
    metaDescription: 'Convert PNG to WebP online for free. Keep full alpha transparency while reducing file size drastically in your browser.',
    h1: 'PNG to WebP Converter',
    subtitle: 'Convert PNG files to next-generation WebP while keeping transparent backgrounds intact.',
    features: [
      'Preserves transparent alpha channel perfectly',
      'Drastically smaller file sizes than standard PNG',
      'High-performance instant rendering',
      'Ideal for website logos, icons, and UI assets'
    ],
    howToUse: [
      'Upload your transparent or opaque PNG file.',
      'Adjust the WebP compression quality slider.',
      'Preview the transparent canvas output.',
      'Download your WebP file.'
    ],
    supportedFormats: ['PNG'],
    faqs: [
      {
        question: 'Does WebP support transparency like PNG?',
        answer: 'Yes! WebP fully supports 8-bit alpha transparency with much better compression ratios than PNG.'
      }
    ],
    relatedSlugs: ['jpg-to-webp', 'png-to-jpg', 'image-compressor']
  },

  // 7. WebP to JPG
  {
    id: 'webp-to-jpg',
    slug: '/webp-to-jpg',
    name: 'WebP to JPG',
    category: 'Convert',
    shortDescription: 'Convert modern WebP images back into universally compatible JPG format.',
    icon: 'RefreshCw',
    metaTitle: 'Convert WebP to JPG Online Free — Universal Compatibility | PixEnhance',
    metaDescription: 'Convert WebP images to JPG online for free. Make modern WebP images compatible with older photo viewers, printers, and legacy applications.',
    h1: 'WebP to JPG Converter',
    subtitle: 'Convert modern WebP files into universally recognized JPG photos with customizable quality.',
    features: [
      'Universal compatibility with all operating systems and photo editors',
      'Custom background color selector for transparent WebP images',
      'Adjustable JPEG quality compression',
      'Zero waiting delay and instant export'
    ],
    howToUse: [
      'Upload your WebP file.',
      'Select your desired background fill color and quality.',
      'Review the preview and download the converted JPG.'
    ],
    supportedFormats: ['WebP'],
    faqs: [
      {
        question: 'Why convert WebP to JPG?',
        answer: 'Some older desktop software, legacy photo print kiosks, or specific upload forms only accept JPG files.'
      }
    ],
    relatedSlugs: ['jpg-to-webp', 'png-to-jpg', 'image-resizer']
  },

  // 8. Image Cropper
  {
    id: 'image-cropper',
    slug: '/image-cropper',
    name: 'Image Cropper',
    category: 'Crop & Edit',
    popular: true,
    badge: 'Interactive',
    shortDescription: 'Crop images interactively with aspect ratio presets (1:1, 4:3, 16:9, Free).',
    icon: 'Crop',
    metaTitle: 'Free Online Image Cropper — Interactive Aspect Ratio Crop | PixEnhance',
    metaDescription: 'Crop images online for free. Interactive crop box with 1:1, 4:3, 3:4, 16:9, and custom aspect ratio presets. Fast, precise, and free.',
    h1: 'Interactive Image Cropper',
    subtitle: 'Trim unwanted outer areas and frame your photos with precision aspect ratios.',
    features: [
      'Interactive draggable crop window with live dimension coordinates',
      'Preset ratios: Freeform, 1:1 Square, 4:3 Standard, 3:4 Portrait, 16:9 Widescreen',
      'Real-time live crop preview',
      'Lossless pixel extraction'
    ],
    howToUse: [
      'Select an image to crop.',
      'Choose an aspect ratio preset or select Free Crop.',
      'Drag and position the crop area over your subject.',
      'Click Crop & Download to save the result.'
    ],
    supportedFormats: ['JPG', 'PNG', 'WebP'],
    faqs: [
      {
        question: 'Does cropping reduce the resolution of the remaining area?',
        answer: 'No. PixEnhance extracts original uncompressed pixels from the cropped region without re-sampling or blurring.'
      }
    ],
    relatedSlugs: ['image-resizer', 'instagram-image-resizer', 'image-rotator', 'aspect-ratio-calculator']
  },

  // 9. Image Rotator
  {
    id: 'image-rotator',
    slug: '/image-rotator',
    name: 'Image Rotator',
    category: 'Crop & Edit',
    shortDescription: 'Rotate images 90° clockwise, counter-clockwise, or 180° upside down.',
    icon: 'RotateCw',
    metaTitle: 'Rotate Image Online Free — 90° and 180° Image Rotator | PixEnhance',
    metaDescription: 'Rotate images online for free. Turn photos 90 degrees left, 90 degrees right, or 180 degrees with instant real-time preview.',
    h1: 'Online Image Rotator',
    subtitle: 'Fix sideways or upside-down photos with simple one-click 90° and 180° rotation.',
    features: [
      'Rotate 90° clockwise (right)',
      'Rotate 90° counter-clockwise (left)',
      'Rotate 180° (upside down)',
      'Automatically swaps canvas width and height for vertical orientations'
    ],
    howToUse: [
      'Upload your photo.',
      'Click the 90° Left, 90° Right, or 180° rotation button.',
      'Preview the orientation change.',
      'Click Download to save the rotated photo.'
    ],
    supportedFormats: ['JPG', 'PNG', 'WebP'],
    faqs: [
      {
        question: 'Why are some smartphone photos sideways when transferred to a PC?',
        answer: 'Phones often store orientation in EXIF metadata. PixEnhance physically reorients the pixel canvas so it appears correctly everywhere.'
      }
    ],
    relatedSlugs: ['image-flipper', 'image-cropper', 'image-resizer']
  },

  // 10. Image Flipper
  {
    id: 'image-flipper',
    slug: '/image-flipper',
    name: 'Image Flipper',
    category: 'Crop & Edit',
    shortDescription: 'Mirror images horizontally or invert them vertically with one click.',
    icon: 'FlipHorizontal',
    metaTitle: 'Flip Image Online Free — Mirror & Invert Photos | PixEnhance',
    metaDescription: 'Flip images horizontally and vertically online for free. Mirror selfie photos or invert pictures directly in your browser without uploading.',
    h1: 'Online Image Flipper',
    subtitle: 'Mirror images horizontally or invert them vertically with instant local canvas rendering.',
    features: [
      'Flip Horizontal (mirror effect, perfect for front-facing camera selfies)',
      'Flip Vertical (upside-down inversion)',
      'Combine horizontal and vertical flipping',
      'Lossless pixel manipulation'
    ],
    howToUse: [
      'Upload your image.',
      'Click Flip Horizontal or Flip Vertical.',
      'Check the live mirrored preview.',
      'Download your flipped image.'
    ],
    supportedFormats: ['JPG', 'PNG', 'WebP'],
    faqs: [
      {
        question: 'Will flipping an image affect its quality or resolution?',
        answer: 'Not at all. Flipping only reverses the coordinate mapping of existing pixels without recompression artifacts.'
      }
    ],
    relatedSlugs: ['image-rotator', 'image-cropper', 'image-resizer']
  },

  // 11. Image Dimensions Checker
  {
    id: 'image-dimensions',
    slug: '/image-dimensions',
    name: 'Image Dimensions Checker',
    category: 'Utilities',
    badge: 'Inspector',
    shortDescription: 'Inspect width, height, aspect ratio, file size, megapixels, and dominant colors.',
    icon: 'Info',
    metaTitle: 'Check Image Dimensions Online Free — Pixels, DPI & Colors | PixEnhance',
    metaDescription: 'Inspect image dimensions online for free. View exact width, height, aspect ratio, megapixels, file size, and dominant color palette locally.',
    h1: 'Image Dimensions & Color Checker',
    subtitle: 'Deeply inspect pixel dimensions, megapixels, aspect ratios, and extract dominant color palettes.',
    features: [
      'Exact pixel width and height readout',
      'Aspect ratio breakdown (simplified fraction and decimal)',
      'Total Megapixels (MP) computation',
      'Dominant color palette extraction with one-click HEX copy'
    ],
    howToUse: [
      'Select or drop any image file.',
      'Inspect the comprehensive technical metrics table.',
      'Click on any extracted color swatch to copy its HEX code.'
    ],
    supportedFormats: ['JPG', 'PNG', 'WebP', 'GIF', 'SVG'],
    faqs: [
      {
        question: 'How are the dominant colors calculated?',
        answer: 'PixEnhance samples pixels evenly across the canvas and groups color frequencies into a quantized palette.'
      }
    ],
    relatedSlugs: ['aspect-ratio-calculator', 'image-resizer', 'image-quality']
  },

  // 12. Aspect Ratio Calculator
  {
    id: 'aspect-ratio-calculator',
    slug: '/aspect-ratio-calculator',
    name: 'Aspect Ratio Calculator',
    category: 'Utilities',
    popular: true,
    shortDescription: 'Calculate aspect ratios and solve missing dimensions for screens and designs.',
    icon: 'Calculator',
    metaTitle: 'Aspect Ratio Calculator Online Free — Dimensions & Resizing | PixEnhance',
    metaDescription: 'Calculate aspect ratios and solve missing image dimensions online for free. Popular presets for 16:9, 4:3, 1:1, 9:16, 21:9 with instant math.',
    h1: 'Aspect Ratio Calculator',
    subtitle: 'Determine aspect ratios from dimensions, calculate missing widths/heights, and explore industry presets.',
    features: [
      'Bi-directional ratio solver: enter W & H to get ratio, or lock ratio to calculate missing dimension',
      'Common media presets: 16:9 (HD/4K), 4:3 (SD), 1:1 (Square), 9:16 (Stories/Reels), 21:9 (Ultrawide)',
      'Greatest Common Divisor (GCD) simplified fraction reduction',
      'Image drag-and-drop to auto-populate dimensions'
    ],
    howToUse: [
      'Enter original Width and Height to find the simplified aspect ratio.',
      'Enter a target Width or Height in the solver to calculate the corresponding dimension.',
      'Optionally drop an image file to auto-read its resolution.'
    ],
    supportedFormats: ['Any dimensions or image file'],
    faqs: [
      {
        question: 'What is the aspect ratio of 1920x1080?',
        answer: '1920x1080 simplifies to 16:9, which equals a decimal ratio of 1.78:1.'
      }
    ],
    relatedSlugs: ['image-resizer', 'image-dimensions', 'youtube-thumbnail-resizer', 'instagram-image-resizer']
  },

  // 13. A4 Image Resizer
  {
    id: 'a4-image-resizer',
    slug: '/a4-image-resizer',
    name: 'A4 Image Resizer',
    category: 'Resize',
    badge: '210 × 297 mm',
    shortDescription: 'Format and resize photos to standard A4 dimensions (210×297 mm) at 300 DPI or 150 DPI.',
    icon: 'Printer',
    metaTitle: 'Resize Image to A4 Size Online Free — 300 DPI Print Ready | PixEnhance',
    metaDescription: 'Resize images to A4 paper size online for free. Convert photos to 2480x3508 pixels at 300 DPI print quality or 150 DPI screen quality.',
    h1: 'A4 Image Resizer (Print Ready)',
    subtitle: 'Prepare photographs and documents for standard A4 paper printing at crisp 300 DPI resolution.',
    features: [
      'A4 Portrait (210 × 297 mm) and A4 Landscape (297 × 210 mm) modes',
      '300 DPI High-Resolution Print Preset (2480 × 3508 px)',
      '150 DPI Web/Draft Print Preset (1240 × 1754 px)',
      'Fitting choices: Fit with margins, Fill/Crop, or Stretch'
    ],
    howToUse: [
      'Upload your image.',
      'Select Portrait or Landscape orientation.',
      'Choose 300 DPI (for sharp paper printing) or 150 DPI.',
      'Select your framing mode and download the print-ready image.'
    ],
    supportedFormats: ['JPG', 'PNG', 'WebP'],
    faqs: [
      {
        question: 'What is the exact pixel resolution of A4 at 300 DPI?',
        answer: 'At standard 300 DPI print quality, an A4 page is exactly 2480 × 3508 pixels.'
      }
    ],
    relatedSlugs: ['a3-image-resizer', 'a5-image-resizer', 'image-resizer']
  },

  // A0 Image Resizer
  {
    id: 'a0-image-resizer',
    slug: '/a0-image-resizer',
    name: 'A0 Image Resizer',
    category: 'Resize',
    badge: '841 × 1189 mm',
    shortDescription: 'Resize photos for large A0 architectural blueprints, banners, and billboard posters.',
    icon: 'Printer',
    metaTitle: 'Resize Image to A0 Size Online Free — 841 × 1189 mm Print Ready | PixEnhance',
    metaDescription: 'Resize images to A0 paper size online for free. Prepare photos and blueprints for 841x1189 mm large-format printing.',
    h1: 'A0 Image Resizer (Large Format)',
    subtitle: 'Scale photos for massive A0 paper posters, CAD drawings, and architectural blueprints.',
    features: [
      'Standard A0 dimensions: 841 × 1189 mm',
      'High-resolution print export for large format plotters',
      'Portrait and Landscape orientation options',
      'Fit (with margins) and Fill (borderless cover) modes'
    ],
    howToUse: [
      'Upload your image.',
      'Choose orientation and framing.',
      'Download your print-ready A0 image.'
    ],
    supportedFormats: ['JPG', 'PNG', 'WebP'],
    faqs: [
      {
        question: 'What are A0 dimensions in millimeters?',
        answer: 'An A0 sheet is exactly 841 × 1189 mm (33.1 × 46.8 inches).'
      }
    ],
    relatedSlugs: ['a1-image-resizer', 'a2-image-resizer', 'a4-image-resizer']
  },

  // A1 Image Resizer
  {
    id: 'a1-image-resizer',
    slug: '/a1-image-resizer',
    name: 'A1 Image Resizer',
    category: 'Resize',
    badge: '594 × 841 mm',
    shortDescription: 'Resize photos for A1 architectural drawings, CAD banners, and exhibition posters.',
    icon: 'Printer',
    metaTitle: 'Resize Image to A1 Size Online Free — 594 × 841 mm Print Ready | PixEnhance',
    metaDescription: 'Resize images to A1 paper size online for free. Scale photos to 594x841 mm for posters and CAD drawings.',
    h1: 'A1 Image Resizer',
    subtitle: 'Format images for A1 technical drawings, exhibition displays, and medium posters.',
    features: [
      'Standard A1 dimensions: 594 × 841 mm',
      'High-precision scaling for architectural sheets',
      'Portrait and Landscape modes',
      'Lossless pixel preservation'
    ],
    howToUse: [
      'Upload your photo.',
      'Select orientation and DPI quality.',
      'Click Download A1 Image.'
    ],
    supportedFormats: ['JPG', 'PNG', 'WebP'],
    faqs: [
      {
        question: 'What are A1 dimensions in millimeters?',
        answer: 'A1 paper measures 594 × 841 mm (23.4 × 33.1 inches).'
      }
    ],
    relatedSlugs: ['a0-image-resizer', 'a2-image-resizer', 'a4-image-resizer']
  },

  // A2 Image Resizer
  {
    id: 'a2-image-resizer',
    slug: '/a2-image-resizer',
    name: 'A2 Image Resizer',
    category: 'Resize',
    badge: '420 × 594 mm',
    shortDescription: 'Resize photos for A2 art prints, medium posters, and calendar displays.',
    icon: 'Printer',
    metaTitle: 'Resize Image to A2 Size Online Free — 420 × 594 mm Print Ready | PixEnhance',
    metaDescription: 'Resize images to A2 paper size online for free. Convert photos to 420x594 mm for art prints and posters.',
    h1: 'A2 Image Resizer',
    subtitle: 'Prepare photographs for A2 posters, fine art prints, and display boards.',
    features: [
      'Standard A2 dimensions: 420 × 594 mm',
      '300 DPI and 150 DPI quality presets',
      'Portrait and Landscape modes',
      'Instant high-speed export'
    ],
    howToUse: [
      'Select your image.',
      'Configure orientation and fitting strategy.',
      'Download your A2 print file.'
    ],
    supportedFormats: ['JPG', 'PNG', 'WebP'],
    faqs: [
      {
        question: 'What are A2 dimensions in millimeters?',
        answer: 'A2 paper measures 420 × 594 mm (16.5 × 23.4 inches).'
      }
    ],
    relatedSlugs: ['a1-image-resizer', 'a3-image-resizer', 'a4-image-resizer']
  },

  // A3 Image Resizer
  {
    id: 'a3-image-resizer',
    slug: '/a3-image-resizer',
    name: 'A3 Image Resizer',
    category: 'Resize',
    badge: '297 × 420 mm',
    shortDescription: 'Resize photos for A3 double-A4 sheets, ledger, tabloid, diagrams, and charts.',
    icon: 'Printer',
    metaTitle: 'Resize Image to A3 Size Online Free — 297 × 420 mm Print Ready | PixEnhance',
    metaDescription: 'Resize images to A3 paper size online for free. Convert photos to 3508x4960 pixels at 300 DPI for ledger and double-A4 printing.',
    h1: 'A3 Image Resizer',
    subtitle: 'Scale photos for A3 spreadsheets, visual charts, presentation folders, and double-A4 prints.',
    features: [
      'Standard A3 dimensions: 297 × 420 mm (Double A4 size)',
      '300 DPI Print Preset (3508 × 4960 px)',
      '150 DPI Standard Preset (1754 × 2480 px)',
      'Portrait and Landscape modes'
    ],
    howToUse: [
      'Upload your image.',
      'Choose Portrait or Landscape orientation.',
      'Click Download A3 Image.'
    ],
    supportedFormats: ['JPG', 'PNG', 'WebP'],
    faqs: [
      {
        question: 'How does A3 compare to A4 size?',
        answer: 'A3 is exactly twice the size of A4. When folded in half, an A3 sheet equals an A4 sheet.'
      }
    ],
    relatedSlugs: ['a4-image-resizer', 'a2-image-resizer', 'image-resizer']
  },

  // A5 Image Resizer
  {
    id: 'a5-image-resizer',
    slug: '/a5-image-resizer',
    name: 'A5 Image Resizer',
    category: 'Resize',
    badge: '148 × 210 mm',
    shortDescription: 'Resize photos for A5 booklets, flyers, leaflets, notepads, and invitations.',
    icon: 'Printer',
    metaTitle: 'Resize Image to A5 Size Online Free — 148 × 210 mm Print Ready | PixEnhance',
    metaDescription: 'Resize images to A5 paper size online for free. Convert photos to 1748x2480 pixels at 300 DPI for flyers and booklets.',
    h1: 'A5 Image Resizer',
    subtitle: 'Format photographs for A5 flyers, brochures, greeting cards, and booklet prints.',
    features: [
      'Standard A5 dimensions: 148 × 210 mm (Half A4 size)',
      '300 DPI High-Res Print (1748 × 2480 px)',
      'Portrait and Landscape orientation',
      'Fit and Fill border modes'
    ],
    howToUse: [
      'Upload your image.',
      'Select orientation and framing.',
      'Download your A5 print image.'
    ],
    supportedFormats: ['JPG', 'PNG', 'WebP'],
    faqs: [
      {
        question: 'What is A5 paper used for?',
        answer: 'A5 is the most popular size for flyers, leaflets, promotional handouts, notepads, and small books.'
      }
    ],
    relatedSlugs: ['a4-image-resizer', 'a6-image-resizer', 'image-resizer']
  },

  // A6 Image Resizer
  {
    id: 'a6-image-resizer',
    slug: '/a6-image-resizer',
    name: 'A6 Image Resizer',
    category: 'Resize',
    badge: '105 × 148 mm',
    shortDescription: 'Resize photos for standard A6 postcards, greeting cards, and pocket photo prints.',
    icon: 'Printer',
    metaTitle: 'Resize Image to A6 Size Online Free — 105 × 148 mm Postcard Print | PixEnhance',
    metaDescription: 'Resize images to A6 postcard size online for free. Convert photos to 1240x1748 pixels at 300 DPI for postcards and small prints.',
    h1: 'A6 Image Resizer (Postcard Size)',
    subtitle: 'Scale photos for standard A6 postcards, pocket prints, and greeting invitations.',
    features: [
      'Standard A6 dimensions: 105 × 148 mm (Quarter A4 size)',
      '300 DPI Postcard Print (1240 × 1748 px)',
      'Portrait and Landscape modes',
      'High-fidelity print export'
    ],
    howToUse: [
      'Upload your image.',
      'Choose orientation.',
      'Download your A6 postcard file.'
    ],
    supportedFormats: ['JPG', 'PNG', 'WebP'],
    faqs: [
      {
        question: 'Is A6 the standard postcard size?',
        answer: 'Yes, A6 (105 × 148 mm) is the standard international postcard and pocket photo size.'
      }
    ],
    relatedSlugs: ['a5-image-resizer', 'a7-image-resizer', 'passport-photo-resizer']
  },

  // A7 Image Resizer
  {
    id: 'a7-image-resizer',
    slug: '/a7-image-resizer',
    name: 'A7 Image Resizer',
    category: 'Resize',
    badge: '74 × 105 mm',
    shortDescription: 'Resize photos for A7 mini flyers, pocket calendars, labels, and product tags.',
    icon: 'Printer',
    metaTitle: 'Resize Image to A7 Size Online Free — 74 × 105 mm Pocket Print | PixEnhance',
    metaDescription: 'Resize images to A7 paper size online for free. Scale photos to 874x1240 pixels at 300 DPI for mini cards and product tags.',
    h1: 'A7 Image Resizer (Pocket Size)',
    subtitle: 'Scale photos for pocket calendars, mini promo cards, labels, and price tags.',
    features: [
      'Standard A7 dimensions: 74 × 105 mm (One-eighth A4 size)',
      '300 DPI Print Preset (874 × 1240 px)',
      'Portrait and Landscape modes',
      'Compact card framing'
    ],
    howToUse: [
      'Upload your image.',
      'Select orientation.',
      'Download your A7 image.'
    ],
    supportedFormats: ['JPG', 'PNG', 'WebP'],
    faqs: [
      {
        question: 'What are A7 dimensions in millimeters?',
        answer: 'A7 paper measures exactly 74 × 105 mm (2.9 × 4.1 inches).'
      }
    ],
    relatedSlugs: ['a6-image-resizer', 'a5-image-resizer', 'passport-photo-resizer']
  },

  // 14. Passport Photo Resizer
  {
    id: 'passport-photo-resizer',
    slug: '/passport-photo-resizer',
    name: 'Passport Photo Resizer',
    category: 'Resize',
    popular: true,
    badge: 'Biometric',
    shortDescription: 'Resize photos for US, UK, Schengen, and international passport & visa standards.',
    icon: 'UserCheck',
    metaTitle: 'Passport Photo Resizer Online Free — US 2x2, UK 35x45mm | PixEnhance',
    metaDescription: 'Resize passport and visa photos online for free. US 2x2 inch, UK/EU 35x45mm, and international biometric standards with 4x6 print sheet.',
    h1: 'Passport & Visa Photo Resizer',
    subtitle: 'Format portrait photos to official passport requirements with biometric face guides and 4x6 print grids.',
    features: [
      'Official presets: US / India Visa (2×2 in / 600×600 px), UK/EU/Schengen (35×45 mm), Canada (50×70 mm)',
      'Biometric face alignment oval overlay guide',
      'Clean background color replacement (white, light blue, off-white)',
      'Print Sheet Generator: Creates a 4×6 inch multi-photo sheet for cheap retail printing'
    ],
    howToUse: [
      'Upload a clear, forward-facing portrait photo.',
      'Select your target country passport preset.',
      'Align your head and eyes inside the biometric guideline oval.',
      'Download your single passport photo or generate a 4×6 print sheet.'
    ],
    supportedFormats: ['JPG', 'PNG'],
    faqs: [
      {
        question: 'Can I print these at a local pharmacy or photo kiosk?',
        answer: 'Yes! Use the "Generate 4×6 Sheet" feature to print 6 passport photos on a standard 4×6 print for pennies.'
      }
    ],
    relatedSlugs: ['a4-image-resizer', 'image-cropper', 'image-resizer']
  },

  // 15. Instagram Image Resizer
  {
    id: 'instagram-image-resizer',
    slug: '/instagram-image-resizer',
    name: 'Instagram Image Resizer',
    category: 'Social Media',
    popular: true,
    badge: 'Social',
    shortDescription: 'Optimize photos for Instagram Feed (Square & Portrait) and Stories/Reels.',
    icon: 'Camera',
    metaTitle: 'Instagram Image Resizer Online Free — Square, Portrait & Stories | PixEnhance',
    metaDescription: 'Resize images for Instagram for free. Perfect dimensions for Square (1080x1080), Portrait (1080x1350), Landscape (1080x566), and Stories (1080x1920).',
    h1: 'Instagram Image Resizer',
    subtitle: 'Format photos for Instagram feed, portrait carousels, and 9:16 stories without ugly automatic cropping.',
    features: [
      'Square Post preset: 1080 × 1080 px (1:1)',
      'Portrait Feed preset: 1080 × 1350 px (4:5 optimal engagement)',
      'Landscape Feed preset: 1080 × 566 px (1.91:1)',
      'Story / Reel preset: 1080 × 1920 px (9:16)',
      'Smart background options: Blurred photo border or solid white/black'
    ],
    howToUse: [
      'Upload the picture you want to post to Instagram.',
      'Select your desired Instagram layout format.',
      'Choose whether to crop or fit with a stylish blurred background.',
      'Download your Instagram-ready photo.'
    ],
    supportedFormats: ['JPG', 'PNG', 'WebP'],
    faqs: [
      {
        question: 'Which Instagram size gets the most engagement?',
        answer: 'Portrait (1080 × 1350 px, 4:5 ratio) takes up the most vertical screen space on mobile phones, resulting in higher engagement.'
      }
    ],
    relatedSlugs: ['youtube-thumbnail-resizer', 'whatsapp-dp-resizer', 'image-cropper', 'aspect-ratio-calculator']
  },

  // 16. YouTube Thumbnail Resizer
  {
    id: 'youtube-thumbnail-resizer',
    slug: '/youtube-thumbnail-resizer',
    name: 'YouTube Thumbnail Resizer',
    category: 'Social Media',
    shortDescription: 'Resize thumbnails to 1280x720 HD with under-2MB file size optimization.',
    icon: 'Video',
    metaTitle: 'YouTube Thumbnail Resizer Online Free — 1280x720 16:9 | PixEnhance',
    metaDescription: 'Resize YouTube thumbnails online for free. Standard 1280x720 pixels, 16:9 aspect ratio, with under-2MB size validation and safe zone guide.',
    h1: 'YouTube Thumbnail Resizer',
    subtitle: 'Create sharp 1280 × 720 HD thumbnails that stay strictly under YouTube’s 2MB upload limit.',
    features: [
      'Exact 1280 × 720 px (16:9) YouTube recommendation',
      'Automatic under-2MB file size compression check',
      'Duration badge safe-zone preview (bottom right corner)',
      'High-quality sharpen and contrast boost'
    ],
    howToUse: [
      'Upload your video thumbnail artwork.',
      'Verify that important text is outside the bottom-right timestamp zone.',
      'The tool resizes and ensures the file is under 2MB.',
      'Download your YouTube thumbnail.'
    ],
    supportedFormats: ['JPG', 'PNG', 'WebP'],
    faqs: [
      {
        question: 'What is YouTube’s thumbnail size limit?',
        answer: 'YouTube accepts JPG, GIF, or PNG under 2MB with a minimum width of 640 pixels. 1280 × 720 is the ideal resolution.'
      }
    ],
    relatedSlugs: ['instagram-image-resizer', 'whatsapp-dp-resizer', 'aspect-ratio-calculator']
  },

  // 17. WhatsApp DP Resizer
  {
    id: 'whatsapp-dp-resizer',
    slug: '/whatsapp-dp-resizer',
    name: 'WhatsApp DP Resizer',
    category: 'Social Media',
    shortDescription: 'Fit full pictures into WhatsApp Profile Picture (DP) without awkward cropping.',
    icon: 'MessageCircle',
    metaTitle: 'WhatsApp DP Resizer Online Free — Full Photo No Crop | PixEnhance',
    metaDescription: 'Resize full photos for WhatsApp profile picture (DP) without cropping. Circular avatar preview mask and aesthetic blurred background fill.',
    h1: 'WhatsApp DP Resizer (No Crop)',
    subtitle: 'Fit your entire landscape or portrait photo into WhatsApp’s square profile picture with circular avatar preview.',
    features: [
      '1080 × 1080 px high-resolution square canvas',
      'Interactive circular avatar mask preview matching WhatsApp UI',
      'No-crop padding with modern blurred photo background or solid fill',
      'Sharp face centering'
    ],
    howToUse: [
      'Upload your full-length or wide photo.',
      'Use the circular mask preview to ensure your face is perfectly centered.',
      'Choose a blurred photo background or solid neutral fill.',
      'Download your ready-to-use WhatsApp DP.'
    ],
    supportedFormats: ['JPG', 'PNG', 'WebP'],
    faqs: [
      {
        question: 'Why does WhatsApp force me to crop rectangular photos?',
        answer: 'WhatsApp profile photos must be square (1:1). PixEnhance pads rectangular photos with elegant background blur so you never lose any part of your picture.'
      }
    ],
    relatedSlugs: ['instagram-image-resizer', 'passport-photo-resizer', 'image-cropper']
  },

  // 18. Image Quality Adjuster
  {
    id: 'image-quality',
    slug: '/image-quality',
    name: 'Image Quality Adjuster',
    category: 'Utilities',
    shortDescription: 'Fine-tune JPEG and WebP compression quality with real-time visual feedback.',
    icon: 'Sliders',
    metaTitle: 'Image Quality Adjuster Online Free — Real-Time Visualizer | PixEnhance',
    metaDescription: 'Adjust image quality online for free. Fine-tune JPEG and WebP compression levels (1-100%) with live size estimation and instant download.',
    h1: 'Image Quality Adjuster',
    subtitle: 'Fine-tune compression levels with instant side-by-side visual feedback and live byte-savings readout.',
    features: [
      'Precise 1% to 100% quality slider',
      'Switch between JPEG and next-gen WebP encodings',
      'Real-time file size estimation and reduction percentage',
      'Preserves original pixel dimensions'
    ],
    howToUse: [
      'Upload your image.',
      'Drag the quality slider to find the perfect balance of visual clarity and file size.',
      'Switch between JPEG and WebP formats to compare efficiency.',
      'Download your tuned image.'
    ],
    supportedFormats: ['JPG', 'PNG', 'WebP'],
    faqs: [
      {
        question: 'What is the sweet spot for web image quality?',
        answer: 'For most web photographs, a quality setting between 75% and 85% reduces file size by up to 70% while remaining visually indistinguishable from the original.'
      }
    ],
    relatedSlugs: ['image-compressor', 'jpg-to-webp', 'image-dimensions']
  },

  // 19. Image to Base64
  {
    id: 'image-to-base64',
    slug: '/image-to-base64',
    name: 'Image to Base64',
    category: 'Utilities',
    badge: 'Developer',
    shortDescription: 'Convert images to Base64 Data URIs, HTML img tags, and CSS background snippets.',
    icon: 'Code2',
    metaTitle: 'Image to Base64 Converter Online Free — Data URI & HTML Tags | PixEnhance',
    metaDescription: 'Convert images to Base64 Data URIs online for free. Generate HTML img tags, CSS background snippets, and copy or download raw Base64 strings.',
    h1: 'Image to Base64 Converter',
    subtitle: 'Encode images into clean Base64 data strings for inline HTML, CSS, emails, and web development.',
    features: [
      'Generates standard Data URI: data:image/...;base64,...',
      'Ready-to-use HTML tag snippet: <img src="..." />',
      'Ready-to-use CSS snippet: background-image: url(...)',
      'One-click clipboard copy with visual feedback & .txt download'
    ],
    howToUse: [
      'Upload any image file (JPG, PNG, WebP, SVG, GIF, ICO).',
      'Inspect the encoded Base64 string and character length.',
      'Copy the raw Base64, HTML snippet, or CSS snippet to your clipboard.',
      'Optionally download the string as a text file.'
    ],
    supportedFormats: ['JPG', 'PNG', 'WebP', 'SVG', 'GIF', 'ICO'],
    faqs: [
      {
        question: 'When should I use Base64 for images?',
        answer: 'Base64 is great for small icons, email templates, and eliminating extra HTTP requests for critical above-the-fold UI assets.'
      }
    ],
    relatedSlugs: ['base64-to-image', 'image-dimensions']
  },

  // 20. Base64 to Image
  {
    id: 'base64-to-image',
    slug: '/base64-to-image',
    name: 'Base64 to Image',
    category: 'Utilities',
    badge: 'Decoder',
    shortDescription: 'Decode Base64 strings and Data URIs into downloadable PNG, JPG, or WebP files.',
    icon: 'FileCode',
    metaTitle: 'Base64 to Image Decoder Online Free — Download PNG & JPG | PixEnhance',
    metaDescription: 'Decode Base64 strings and Data URIs into images online for free. Auto-detect image MIME type, preview in browser, and download as PNG, JPG, or WebP.',
    h1: 'Base64 to Image Decoder',
    subtitle: 'Paste Base64 encoded strings or Data URIs to decode, preview, and download as image files.',
    features: [
      'Accepts raw Base64 strings or full Data URIs (data:image/...;base64,...)',
      'Automatic MIME type detection (PNG, JPEG, WebP, SVG, GIF)',
      'Live image preview with dimensions and file size calculation',
      'One-click download in original detected format or PNG'
    ],
    howToUse: [
      'Paste your Base64 string or Data URI into the text area.',
      'The tool validates the string and renders the decoded image instantly.',
      'Inspect the image preview and resolution.',
      'Click Download Image.'
    ],
    supportedFormats: ['Base64 strings', 'Data URIs'],
    faqs: [
      {
        question: 'Does my Base64 string need the "data:image/..." header?',
        answer: 'Either format works! PixEnhance automatically parses both full Data URIs and raw Base64 character strings.'
      }
    ],
    relatedSlugs: ['image-to-base64', 'image-dimensions']
  },

  // 21. Image to PDF
  {
    id: 'image-to-pdf',
    slug: '/image-to-pdf',
    name: 'Image to PDF',
    category: 'PDF Tools',
    popular: true,
    badge: 'Multi-Select',
    shortDescription: 'Convert JPG, PNG, and WebP images into a single, clean PDF document in seconds.',
    icon: 'FileText',
    metaTitle: 'Image to PDF Converter Online Free — Convert JPG & PNG to PDF | PixEnhance',
    metaDescription: 'Convert images to PDF online for free. Combine multiple JPG, PNG, and WebP files into a single PDF document. Choose A4, Letter, or Fit with customizable margins.',
    h1: 'Image to PDF Converter',
    subtitle: 'Convert and merge your photos into high-quality PDF documents directly in your browser. 100% private.',
    features: [
      'Multi-image support: combine multiple pictures into one multi-page PDF',
      'Page size presets: A4 (210×297mm), US Letter, or Fit to Image resolution',
      'Orientation options: Auto-detect, Portrait, or Landscape',
      'Customizable margin spacing: Full bleed, Compact, or Standard margins'
    ],
    howToUse: [
      'Upload or drag & drop one or multiple JPG, PNG, or WebP images.',
      'Reorder pages using the arrow buttons or remove unwanted pictures.',
      'Configure page size (A4/Letter), orientation, and margin settings.',
      'Click Generate & Download PDF to save your document instantly.'
    ],
    supportedFormats: ['JPG', 'PNG', 'WebP', 'SVG'],
    faqs: [
      {
        question: 'Can I combine multiple photos into a single PDF document?',
        answer: 'Yes! You can add multiple images, reorder them to your preferred page sequence, and export them as a single multi-page PDF.'
      },
      {
        question: 'Are my pictures uploaded or saved to create the PDF?',
        answer: 'Never. All PDF compilation and image formatting happens directly on your device with complete privacy.'
      },
      {
        question: 'What page sizes are supported?',
        answer: 'PixEnhance supports standard international A4, US Letter, and an auto-fit mode that perfectly matches the original image dimensions.'
      }
    ],
    relatedSlugs: ['jpg-to-pdf', 'png-to-pdf', 'compress-pdf', 'pdf-converter']
  },

  // 22. Bulk Image Resizer
  {
    id: 'bulk-image-resizer',
    slug: '/bulk-image-resizer',
    name: 'Bulk Image Resizer',
    category: 'Resize',
    popular: true,
    badge: 'Batch / ZIP',
    shortDescription: 'Resize dozens of images at once by percentage or pixel dimensions with ZIP export.',
    icon: 'Maximize2',
    metaTitle: 'Free Bulk Image Resizer Online — Batch Resize Photos | PixEnhance',
    metaDescription: 'Batch resize multiple images online for free. Scale dozens of JPG, PNG, and WebP images simultaneously and download as a ZIP file.',
    h1: 'Bulk Image Resizer',
    subtitle: 'Resize dozens of photos simultaneously with aspect ratio lock and one-click ZIP download.',
    features: [
      'Multi-file batch scaling by percentage (25%, 50%, 75%, 200%)',
      'Maximum width & height boundary constraint',
      'Exact dimension resizing with aspect ratio lock',
      'Instant batch ZIP download with ultra-fast compression'
    ],
    howToUse: [
      'Drop multiple images or click Select Images (Bulk).',
      'Choose your scaling mode: percentage, max dimension, or exact pixels.',
      'Click Resize All Images to process the batch in your browser.',
      'Download individual resized files or click Download All as ZIP.'
    ],
    supportedFormats: ['JPG', 'PNG', 'WebP', 'SVG', 'BMP'],
    faqs: [
      {
        question: 'How many images can I resize at once?',
        answer: 'You can select dozens of images at once. Everything processes smoothly without any waiting queues or limits.'
      },
      {
        question: 'Can I download all resized images together?',
        answer: 'Yes! Click "Download All as ZIP" to package all resized photos into a single .zip file instantly.'
      }
    ],
    relatedSlugs: ['image-resizer', 'image-compressor', 'image-converter']
  },

  // 23. Crop Image (Alias & Route)
  {
    id: 'crop-image',
    slug: '/crop-image',
    name: 'Crop Image',
    category: 'Crop & Edit',
    popular: true,
    badge: 'Popular',
    shortDescription: 'Crop JPG, PNG, or WebP images to custom dimensions or standard aspect ratios.',
    icon: 'Crop',
    metaTitle: 'Crop Image Online Free — Precision Photo Cropper | PixEnhance',
    metaDescription: 'Crop photos online for free. Cut out unwanted areas with custom aspect ratios (1:1, 16:9, 4:3) directly in your browser.',
    h1: 'Online Crop Image Tool',
    subtitle: 'Cut, trim, and frame your photos with precision aspect ratio presets.',
    features: [
      'Custom freeform crop box with handles',
      'Standard aspect ratios: 1:1 Square, 16:9, 4:3, 3:2, 9:16',
      'Social media presets: Instagram Post, Story, Profile, YouTube Banner',
      'Full resolution lossless crop export'
    ],
    howToUse: [
      'Upload your image or paste from clipboard.',
      'Drag crop handles or select an aspect ratio preset.',
      'Preview your cropped frame in real-time.',
      'Click Download Cropped Image.'
    ],
    supportedFormats: ['JPG', 'PNG', 'WebP'],
    faqs: [
      {
        question: 'Does cropping reduce image quality?',
        answer: 'No, cropping extracts the exact pixel area you selected without degrading visual fidelity.'
      }
    ],
    relatedSlugs: ['image-cropper', 'image-resizer', 'flip-image']
  },

  // 24. Collage Maker
  {
    id: 'collage-maker',
    slug: '/collage-maker',
    name: 'Collage Maker',
    category: 'Crop & Edit',
    popular: true,
    badge: 'Grids & Borders',
    shortDescription: 'Combine multiple photos into beautiful collage grids with customizable borders and spacing.',
    icon: 'LayoutGrid',
    metaTitle: 'Free Online Collage Maker — Photo Grid Creator | PixEnhance',
    metaDescription: 'Create stunning photo collages online for free. Arrange 2 to 9 photos in modern grid layouts with customizable borders and margins.',
    h1: 'Free Online Photo Collage Maker',
    subtitle: 'Combine your favorite pictures into modern photo grids with custom margins, borders, and aspect ratios.',
    features: [
      'Multi-photo upload (2 to 9 pictures)',
      'Popular grid layouts: 50/50 splits, 2×2, 3×3, featured hero grids',
      'Aspect ratio presets: 1:1 Square, 4:5 Instagram, 16:9 Landscape, 9:16 Story',
      'Sliders for photo gap spacing, rounded corners, and outer borders',
      'Color palette selector for background styling'
    ],
    howToUse: [
      'Select 2 to 9 photos from your device.',
      'Pick an aspect ratio (1:1, 4:5, 16:9, 9:16) and layout variation.',
      'Adjust photo spacing, corner roundness, and background color.',
      'Click Download Photo Collage to export your high-res design.'
    ],
    supportedFormats: ['JPG', 'PNG', 'WebP'],
    faqs: [
      {
        question: 'What is the maximum resolution of the exported collage?',
        answer: 'PixEnhance renders collages at high resolution (up to 1920×1920px), perfect for printing or social media.'
      }
    ],
    relatedSlugs: ['image-cropper', 'image-resizer', 'meme-generator']
  },

  // 25. Flip Image (Alias & Route)
  {
    id: 'flip-image',
    slug: '/flip-image',
    name: 'Flip Image',
    category: 'Crop & Edit',
    shortDescription: 'Mirror images horizontally or vertically in one click without quality loss.',
    icon: 'FlipHorizontal',
    metaTitle: 'Flip Image Online Free — Mirror Photos Horizontally & Vertically | PixEnhance',
    metaDescription: 'Flip images horizontally or vertically online for free. Mirror selfie photos, reverse text, and flip orientation directly in your browser.',
    h1: 'Online Flip Image Tool',
    subtitle: 'Mirror and flip your pictures horizontally or vertically with instant real-time preview.',
    features: [
      'Horizontal mirror flip (ideal for selfies and front-facing cameras)',
      'Vertical upside-down flip',
      'Lossless pixel preservation',
      'Multi-format export: JPG, PNG, and WebP'
    ],
    howToUse: [
      'Select your image or drop it into the tool.',
      'Click Flip Horizontally or Flip Vertically.',
      'Click Download Flipped Image.'
    ],
    supportedFormats: ['JPG', 'PNG', 'WebP'],
    faqs: [
      {
        question: 'Does flipping alter the pixel dimensions?',
        answer: 'No, flipping only mirrors the pixel coordinate axis while keeping width, height, and resolution identical.'
      }
    ],
    relatedSlugs: ['image-flipper', 'rotate-image', 'image-rotator']
  },

  // 26. Rotate Image (Alias & Route)
  {
    id: 'rotate-image',
    slug: '/rotate-image',
    name: 'Rotate Image',
    category: 'Crop & Edit',
    shortDescription: 'Rotate images by 90°, 180°, 270°, or any custom angle with high precision.',
    icon: 'RotateCw',
    metaTitle: 'Rotate Image Online Free — Turn Photos 90°, 180°, 270° | PixEnhance',
    metaDescription: 'Rotate images online for free. Fix sideways photos, turn 90 degrees clockwise or counterclockwise, or set custom rotation angles.',
    h1: 'Online Rotate Image Tool',
    subtitle: 'Fix sideways pictures or rotate to custom angles with auto-expanding canvas.',
    features: [
      'Quick 90° clockwise and counterclockwise rotation',
      '180° upside-down rotation',
      'Custom angle slider (-180° to +180°)',
      'Transparent or custom background fill'
    ],
    howToUse: [
      'Upload your image.',
      'Click 90° CW or 90° CCW, or drag the rotation slider.',
      'Download your rotated image.'
    ],
    supportedFormats: ['JPG', 'PNG', 'WebP'],
    faqs: [
      {
        question: 'Why do my phone photos open sideways?',
        answer: 'Cameras embed EXIF orientation tags that some software ignores. This tool permanently rotates pixel data so it displays correctly everywhere.'
      }
    ],
    relatedSlugs: ['image-rotator', 'flip-image', 'image-cropper']
  },

  // 27. Image Enlarger
  {
    id: 'image-enlarger',
    slug: '/image-enlarger',
    name: 'Image Enlarger',
    category: 'Resize',
    popular: true,
    badge: '2× 4× 8×',
    shortDescription: 'Enlarge low-resolution photos 2×, 4×, or 8× with edge-preserving detail enhancement.',
    icon: 'ZoomIn',
    metaTitle: 'Free Image Enlarger Online — Upscale Photos 2×, 4×, 8× | PixEnhance',
    metaDescription: 'Enlarge small images online for free without pixelation. Upscale low-res photos by 200%, 400%, or 800% with high-fidelity sharpening.',
    h1: 'Online Image Enlarger',
    subtitle: 'Upscale small photos by 2×, 4×, or 8× with bicubic interpolation and edge-directed sharpening.',
    features: [
      '2×, 4×, and 8× enlargement factors',
      'Edge-preserving detail recovery & unsharp mask filter',
      'Interactive before/after split slider comparison',
      'Lossless PNG and high-quality JPEG export'
    ],
    howToUse: [
      'Upload any low-resolution image.',
      'Select 2×, 4×, or 8× enlargement factor.',
      'Slide the comparison divider to check image clarity.',
      'Click Download Enlarged Image.'
    ],
    supportedFormats: ['JPG', 'PNG', 'WebP'],
    faqs: [
      {
        question: 'How does the enlarger preserve edge sharpness?',
        answer: 'PixEnhance combines high-precision bicubic resampling with a local unsharp masking pass to prevent blurry edges.'
      }
    ],
    relatedSlugs: ['image-resizer', 'bulk-image-resizer', 'image-quality']
  },

  // 28. Color Picker
  {
    id: 'color-picker',
    slug: '/color-picker',
    name: 'Color Picker',
    category: 'Utilities',
    popular: true,
    badge: 'Eyedropper',
    shortDescription: 'Sample exact pixel colors from any photo with a magnifying eyedropper & palette extractor.',
    icon: 'Pipette',
    metaTitle: 'Image Color Picker Online — Eyedropper & Palette Extractor | PixEnhance',
    metaDescription: 'Pick colors from images online. Use the interactive magnifying eyedropper to get HEX, RGB, and HSL codes, or extract dominant palettes.',
    h1: 'Online Image Color Picker',
    subtitle: 'Hover and click any pixel to get HEX, RGB, HSL color codes and auto-generate harmonious palettes.',
    features: [
      'Interactive pixel magnifying loupe on hover',
      'Instant HEX, RGB, and HSL conversion with one-click copy',
      'Automatic extraction of top 8 dominant harmonious colors',
      'One-click Export Palette as CSS variables'
    ],
    howToUse: [
      'Upload any image or screenshot.',
      'Hover over the image to view magnified pixels and hex codes.',
      'Click to lock the color and copy HEX, RGB, or HSL values.',
      'Browse the auto-extracted dominant palette below.'
    ],
    supportedFormats: ['JPG', 'PNG', 'WebP', 'SVG'],
    faqs: [
      {
        question: 'Can I copy colors directly to my clipboard?',
        answer: 'Yes! Click the copy icon next to HEX, RGB, or HSL to copy values instantly.'
      }
    ],
    relatedSlugs: ['image-dimensions', 'image-quality', 'image-to-base64']
  },

  // 29. Meme Generator
  {
    id: 'meme-generator',
    slug: '/meme-generator',
    name: 'Meme Generator',
    category: 'Crop & Edit',
    popular: true,
    badge: 'Templates',
    shortDescription: 'Create viral memes with customizable top & bottom captions, Impact font, and templates.',
    icon: 'Smile',
    metaTitle: 'Free Meme Generator Online — Make Custom Memes | PixEnhance',
    metaDescription: 'Create custom memes online for free. Add top and bottom text with classic Impact font, customize outline stroke, or choose from meme templates.',
    h1: 'Online Meme Generator',
    subtitle: 'Add custom captions to your pictures or popular meme templates with classic outlined text.',
    features: [
      'Upload custom photos or choose from popular meme templates',
      'Classic Impact font with bold black outline stroke',
      'Custom font sizes, text colors, and stroke widths',
      'ALL CAPS toggle for authentic meme formatting',
      'High-resolution PNG download with zero watermarks'
    ],
    howToUse: [
      'Upload your image or choose a template preset.',
      'Type your top and bottom captions.',
      'Adjust font size, text colors, and outline stroke.',
      'Click Download Meme (PNG) to share instantly.'
    ],
    supportedFormats: ['JPG', 'PNG', 'WebP'],
    faqs: [
      {
        question: 'Are there any watermarks on the generated memes?',
        answer: 'Zero watermarks! PixEnhance is 100% free and never adds logos or branding to your images.'
      }
    ],
    relatedSlugs: ['collage-maker', 'image-cropper', 'image-resizer']
  },

  // 30. Image Converter
  {
    id: 'image-converter',
    slug: '/image-converter',
    name: 'Image Converter',
    category: 'Convert',
    popular: true,
    badge: 'All Formats',
    shortDescription: 'Universal image converter for JPG, PNG, WebP, SVG, BMP, and ICO formats with batch mode.',
    icon: 'Repeat',
    metaTitle: 'Free Image Converter Online — Convert JPG, PNG, WebP, SVG | PixEnhance',
    metaDescription: 'Convert images online for free. Transform JPG, PNG, WebP, SVG, BMP, and ICO files in batch with customizable compression and ZIP download.',
    h1: 'Universal Image Converter',
    subtitle: 'Convert single or batch images between JPG, PNG, WebP, SVG, BMP, and ICO formats in your browser.',
    features: [
      'Universal format support: JPG, PNG, WebP, SVG, BMP, ICO',
      'Batch conversion: upload dozens of files and convert simultaneously',
      'Quality control slider for lossy formats',
      'Single-click ZIP download for converted batches'
    ],
    howToUse: [
      'Upload one or multiple images.',
      'Select your target format and adjust quality.',
      'Click Convert All Images.',
      'Download individual converted files or download all as a ZIP archive.'
    ],
    supportedFormats: ['JPG', 'PNG', 'WebP', 'SVG', 'BMP', 'ICO', 'HEIC'],
    faqs: [
      {
        question: 'Is there a file size limit for conversion?',
        answer: 'There are no artificial file limits or quotas. You can convert as many files as you need for free.'
      }
    ],
    relatedSlugs: ['jpg-to-png', 'png-to-jpg', 'webp-to-jpg', 'heic-to-jpg']
  },

  // 31. PDF to JPG
  {
    id: 'pdf-to-jpg',
    slug: '/pdf-to-jpg',
    name: 'PDF to JPG',
    category: 'PDF Tools',
    popular: true,
    badge: 'High DPI',
    shortDescription: 'Extract every page from your PDF into high-resolution JPG images with batch ZIP export.',
    icon: 'FileImage',
    metaTitle: 'PDF to JPG Converter Online Free — Convert PDF Pages to JPG | PixEnhance',
    metaDescription: 'Convert PDF to JPG online for free. Extract all pages from your PDF documents into high-resolution JPEG images. Fast, private, and 100% free.',
    h1: 'PDF to JPG Converter',
    subtitle: 'Extract every page of your PDF documents into crystal-clear JPG photos directly on your device.',
    features: [
      'High-resolution page rendering (up to 300 DPI)',
      'Page-by-page visual grid preview',
      'Download individual pages or all pages as a ZIP file',
      '100% private: files never leave your device'
    ],
    howToUse: [
      'Drop your PDF document into the upload zone.',
      'Preview every page rendered in the browser.',
      'Click JPG on any individual page or click Download All Pages (JPG ZIP).'
    ],
    supportedFormats: ['PDF'],
    faqs: [
      {
        question: 'Are my PDF documents uploaded or stored anywhere?',
        answer: 'Never. PDF pages are parsed and rendered directly on your device with complete privacy.'
      }
    ],
    relatedSlugs: ['pdf-to-png', 'pdf-to-gif', 'image-to-pdf', 'compress-pdf']
  },

  // 32. HEIC to JPG
  {
    id: 'heic-to-jpg',
    slug: '/heic-to-jpg',
    name: 'HEIC to JPG',
    category: 'Convert',
    popular: true,
    badge: 'iPhone / Apple',
    shortDescription: 'Convert Apple iPhone & iPad HEIC/HEIF photos to standard JPG images directly in browser.',
    icon: 'Camera',
    metaTitle: 'HEIC to JPG Converter Online Free — Convert Apple Photos to JPEG | PixEnhance',
    metaDescription: 'Convert HEIC to JPG online for free. Transform Apple iPhone and iPad HEIF photos into standard JPEG format directly on your device.',
    h1: 'HEIC to JPG Converter',
    subtitle: 'Convert Apple HEIC/HEIF photos to universal JPG format with zero cloud uploads.',
    features: [
      'Instant high-efficiency HEIC/HEIF decoding',
      'Batch conversion of multiple iPhone photos',
      'Preserve full photo resolution',
      'Download individual JPGs or batch ZIP archive'
    ],
    howToUse: [
      'Select HEIC or HEIF files from your Apple device or PC.',
      'Adjust the output quality slider.',
      'Click Convert All Images.',
      'Download your converted JPG files.'
    ],
    supportedFormats: ['HEIC', 'HEIF', 'JPG'],
    faqs: [
      {
        question: 'What is a HEIC file?',
        answer: 'HEIC (High Efficiency Image Container) is Apple default image format on iOS. Converting to JPG makes photos compatible with Windows, Android, and websites.'
      }
    ],
    relatedSlugs: ['image-converter', 'jpg-to-png', 'bulk-image-resizer']
  },

  // 33. SVG Converter
  {
    id: 'svg-converter',
    slug: '/svg-converter',
    name: 'SVG Converter',
    category: 'Convert',
    shortDescription: 'Convert SVG vector files to PNG/JPG at custom resolutions or raster images to SVG.',
    icon: 'Code',
    metaTitle: 'SVG Converter Online Free — Convert SVG to PNG, JPG & Image to SVG | PixEnhance',
    metaDescription: 'Convert SVG to PNG or JPG at high resolutions, or vectorize raster images into SVG vectors online for free. 100% browser-based.',
    h1: 'SVG Converter',
    subtitle: 'Scale and export SVG vector graphics to high-res PNG/JPG, or vectorize raster art into SVG.',
    features: [
      'Convert SVG to PNG, JPG, or WebP at 1×, 2×, or 4× resolution',
      'Trace PNG & JPG images into scalable vector SVG paths',
      'Copy raw SVG code with one click',
      'Preserve transparency in PNG exports'
    ],
    howToUse: [
      'Upload an SVG vector or raster image.',
      'Choose your resolution scale (1×, 2×, 4×) and output format.',
      'Download your converted file or copy the raw SVG code.'
    ],
    supportedFormats: ['SVG', 'PNG', 'JPG', 'WebP'],
    faqs: [
      {
        question: 'Can I export SVG to 4K resolution?',
        answer: 'Yes! Because SVG is vector-based, you can scale it up to 4× resolution (4K) with razor-sharp lines and zero blur.'
      }
    ],
    relatedSlugs: ['png-to-svg', 'image-converter', 'jpg-to-png']
  },

  // 34. PDF to PNG
  {
    id: 'pdf-to-png',
    slug: '/pdf-to-png',
    name: 'PDF to PNG',
    category: 'PDF Tools',
    badge: 'Lossless',
    shortDescription: 'Extract PDF pages into lossless, crystal-clear PNG images with transparency support.',
    icon: 'FileImage',
    metaTitle: 'PDF to PNG Converter Online Free — Extract Crisp PNG Pages | PixEnhance',
    metaDescription: 'Convert PDF to PNG online for free. Extract PDF document pages as crisp, lossless PNG images. Perfect for diagrams, text, and graphics.',
    h1: 'PDF to PNG Converter',
    subtitle: 'Extract every page of your PDF documents into lossless, crisp PNG photos directly in your browser.',
    features: [
      'Lossless pixel rendering for text, diagrams, and illustrations',
      'High DPI page rendering',
      'Download individual PNGs or all pages in a single ZIP file',
      '100% private and confidential processing'
    ],
    howToUse: [
      'Drop your PDF document into the upload zone.',
      'Preview every rendered page.',
      'Download individual PNG pages or download all pages as a ZIP.'
    ],
    supportedFormats: ['PDF'],
    faqs: [
      {
        question: 'Why choose PNG over JPG for PDF pages?',
        answer: 'PNG uses lossless compression, which prevents compression artifacts around text, line art, and diagrams.'
      }
    ],
    relatedSlugs: ['pdf-to-jpg', 'pdf-to-gif', 'png-to-pdf', 'compress-pdf']
  },

  // 35. PNG to SVG
  {
    id: 'png-to-svg',
    slug: '/png-to-svg',
    name: 'PNG to SVG',
    category: 'Convert',
    popular: true,
    badge: 'Vectorize',
    shortDescription: 'Vectorize raster PNG logos, icons, and artwork into scalable SVG vector paths.',
    icon: 'Sparkles',
    metaTitle: 'PNG to SVG Converter Online Free — Vectorize Raster Images | PixEnhance',
    metaDescription: 'Convert PNG to SVG online for free. Trace bitmap PNG logos, signatures, and artwork into crisp, resolution-independent vector SVG graphics.',
    h1: 'PNG to SVG Vector Converter',
    subtitle: 'Trace pixelated PNG logos, signatures, and icons into infinite-resolution vector SVG paths.',
    features: [
      'Automatic vector contour tracing of bitmap images',
      'B&W Silhouette and Multi-color Palette tracing modes',
      'Adjustable luminance threshold and color complexity',
      'Instant Copy Raw SVG Code or Download .SVG file'
    ],
    howToUse: [
      'Upload your PNG logo, icon, or drawing.',
      'Choose between Color Palette or B&W Silhouette tracing.',
      'Fine-tune the threshold or color complexity slider.',
      'Download your crisp .SVG vector graphic.'
    ],
    supportedFormats: ['PNG', 'JPG', 'WebP'],
    faqs: [
      {
        question: 'What types of images work best for PNG to SVG?',
        answer: 'Logos, icons, signatures, silhouettes, line art, and illustrations produce the cleanest vector results.'
      }
    ],
    relatedSlugs: ['svg-converter', 'image-converter', 'jpg-to-png']
  },

  // 36. Compress PDF
  {
    id: 'compress-pdf',
    slug: '/compress-pdf',
    name: 'Compress PDF',
    category: 'PDF Tools',
    popular: true,
    badge: 'Up to -75%',
    shortDescription: 'Reduce PDF file size up to 75% directly in your browser without uploading your files.',
    icon: 'Minimize2',
    metaTitle: 'Compress PDF Online Free — Reduce PDF File Size | PixEnhance',
    metaDescription: 'Compress PDF files online for free. Reduce PDF file size up to 75% instantly. Fast, private, and completely free.',
    h1: 'Compress PDF Online',
    subtitle: 'Shrink large PDF documents for email and sharing with smart stream optimization.',
    features: [
      'Three compression presets: Extreme (~70%), Balanced (~50%), and Light (~30%)',
      'Real-time file size comparison and savings percentage',
      'Downsamples embedded images while preserving page layout',
      '100% private: PDF data is processed strictly in your browser'
    ],
    howToUse: [
      'Upload your large PDF document.',
      'Select your preferred compression level (Balanced recommended).',
      'Click Compress PDF Document.',
      'Download your optimized, smaller PDF.'
    ],
    supportedFormats: ['PDF'],
    faqs: [
      {
        question: 'How does online PDF compression work?',
        answer: 'PixEnhance optimizes embedded raster images and recompiles page streams using standard ISO PDF encoders directly in memory.'
      }
    ],
    relatedSlugs: ['pdf-converter', 'image-to-pdf', 'pdf-to-jpg']
  },

  // 37. PDF Converter
  {
    id: 'pdf-converter',
    slug: '/pdf-converter',
    name: 'PDF Converter',
    category: 'PDF Tools',
    popular: true,
    badge: 'All-in-One',
    shortDescription: 'All-in-one PDF hub to convert PDF to JPG/PNG/GIF and images to PDF.',
    icon: 'FileText',
    metaTitle: 'Free PDF Converter Online — Convert PDF to Images & Images to PDF | PixEnhance',
    metaDescription: 'All-in-one PDF converter online for free. Convert PDF to JPG, PNG, GIF, and transform photos into multi-page PDF documents.',
    h1: 'All-in-One PDF Converter',
    subtitle: 'Convert PDF documents to images, images to PDF, and compress PDF files in your browser.',
    features: [
      'Convert PDF to JPG, PNG, and animated GIF',
      'Convert single and batch images to multi-page PDF',
      'Compress PDF file sizes',
      'Completely private, fast, and 100% free'
    ],
    howToUse: [
      'Select a conversion workflow or upload your PDF.',
      'Configure format and layout preferences.',
      'Download your converted documents or images.'
    ],
    supportedFormats: ['PDF', 'JPG', 'PNG', 'WebP'],
    faqs: [
      {
        question: 'Is this PDF converter free?',
        answer: 'Yes! All PDF tools in PixEnhance are 100% free with unlimited conversions and no sign-up required.'
      }
    ],
    relatedSlugs: ['image-to-pdf', 'pdf-to-jpg', 'compress-pdf', 'pdf-to-png']
  },

  // 38. JPG to PDF
  {
    id: 'jpg-to-pdf',
    slug: '/jpg-to-pdf',
    name: 'JPG to PDF',
    category: 'PDF Tools',
    popular: true,
    badge: 'Multi-Select',
    shortDescription: 'Convert single or batch JPG photos into a single, clean multi-page PDF document.',
    icon: 'FileText',
    metaTitle: 'JPG to PDF Converter Online Free — Combine Multiple JPGs to PDF | PixEnhance',
    metaDescription: 'Convert JPG to PDF online for free. Select multiple JPG and JPEG photos at once to combine into a high-quality multi-page PDF document.',
    h1: 'JPG to PDF Converter',
    subtitle: 'Combine single or multiple JPG images into clean PDF documents directly in your browser.',
    features: [
      'Batch selection: pick dozens of JPGs at once with multi-file drop',
      'Reorder pages with up/down arrows',
      'Page size presets: A4 (210×297mm), US Letter, or Fit to Image resolution',
      'Orientation and margin controls'
    ],
    howToUse: [
      'Select multiple JPG images or drop them into the tool.',
      'Arrange the page order to your liking.',
      'Set your page size, orientation, and margin preferences.',
      'Click Generate & Download PDF.'
    ],
    supportedFormats: ['JPG', 'JPEG'],
    faqs: [
      {
        question: 'Can I select multiple JPG images at once?',
        answer: 'Yes! Use Shift or Ctrl to select multiple JPG photos in the file dialog, or drag and drop multiple files at once.'
      }
    ],
    relatedSlugs: ['png-to-pdf', 'image-to-pdf', 'pdf-to-jpg', 'compress-pdf']
  },

  // 39. PNG to PDF
  {
    id: 'png-to-pdf',
    slug: '/png-to-pdf',
    name: 'PNG to PDF',
    category: 'PDF Tools',
    popular: true,
    badge: 'Multi-Select',
    shortDescription: 'Convert single or batch PNG screenshots and graphics into a multi-page PDF document.',
    icon: 'FileText',
    metaTitle: 'PNG to PDF Converter Online Free — Combine Multiple PNGs to PDF | PixEnhance',
    metaDescription: 'Convert PNG to PDF online for free. Merge multiple PNG images and screenshots into a single clean PDF document in your browser.',
    h1: 'PNG to PDF Converter',
    subtitle: 'Merge PNG photos, diagrams, and screenshots into clean PDF documents directly in your browser.',
    features: [
      'Multi-select PNG images at once with batch drop',
      'Automatic white background fill for transparent PNG graphics',
      'Page reordering and orientation controls',
      'A4, US Letter, and Fit-to-image dimensions'
    ],
    howToUse: [
      'Select multiple PNG files or drop them together.',
      'Review page sequence and rearrange if needed.',
      'Choose your page size (A4, Letter, Fit) and margins.',
      'Download your compiled PDF document.'
    ],
    supportedFormats: ['PNG'],
    faqs: [
      {
        question: 'What happens to transparent backgrounds in PNGs?',
        answer: 'PixEnhance automatically fills transparent areas with a clean white background so your PDF documents look professional.'
      }
    ],
    relatedSlugs: ['jpg-to-pdf', 'image-to-pdf', 'pdf-to-png', 'compress-pdf']
  },

  // 40. PDF to GIF
  {
    id: 'pdf-to-gif',
    slug: '/pdf-to-gif',
    name: 'PDF to GIF',
    category: 'PDF Tools',
    badge: 'Animated',
    shortDescription: 'Turn PDF document pages into an animated GIF slideshow presentation.',
    icon: 'Play',
    metaTitle: 'PDF to GIF Converter Online Free — Create Animated GIF from PDF | PixEnhance',
    metaDescription: 'Convert PDF to animated GIF online for free. Turn PDF pages into a looping animated slideshow with customizable frame delays in your browser.',
    h1: 'PDF to Animated GIF Converter',
    subtitle: 'Turn PDF presentation pages into a looping animated GIF directly on your device.',
    features: [
      'Extract and animate all PDF pages into a single GIF',
      'Customizable frame delay slider (0.5s to 3.0s per slide)',
      'Infinite looping animation support',
      'High-speed animated GIF compilation'
    ],
    howToUse: [
      'Upload your PDF document.',
      'Preview rendered page frames.',
      'Set your slide delay speed.',
      'Click Download Animated GIF.'
    ],
    supportedFormats: ['PDF'],
    faqs: [
      {
        question: 'Will the animated GIF loop continuously?',
        answer: 'Yes, the compiled GIF includes Netscape 2.0 loop headers for continuous infinite looping in all browsers and chat apps.'
      }
    ],
    relatedSlugs: ['pdf-to-jpg', 'pdf-to-png', 'pdf-converter']
  },

  // 41. PDF to Word (.docx)
  {
    id: 'pdf-to-word',
    slug: '/pdf-to-word',
    name: 'PDF to Word',
    category: 'PDF Tools',
    popular: true,
    badge: 'DOCX',
    shortDescription: 'Convert PDF documents to editable Microsoft Word (.docx) files with clean formatting and total privacy.',
    icon: 'FileText',
    metaTitle: 'PDF to Word Converter Online Free — Convert PDF to DOCX | PixEnhance',
    metaDescription: 'Convert PDF to editable Word (.docx) online for free. Extract paragraphs, text formatting, and tables directly in your browser with zero file uploads.',
    h1: 'Convert PDF to Word (.docx) Online Free',
    subtitle: 'Transform PDF documents into fully editable Microsoft Word files with clean formatting. 100% private and free.',
    features: [
      'Export directly to genuine Microsoft Word (.docx) OpenXML format',
      'Extract text, headings, bullet lists, and paragraphs with clean layout',
      'Interactive side-by-side text preview and editing before export',
      'Multi-page support with automatic page break preservation',
      'Completely private with zero data leaks'
    ],
    howToUse: [
      'Upload or drop your PDF document into the converter.',
      'Wait a moment while the engine extracts text and structure.',
      'Review the editable live preview and choose your preferred font/formatting.',
      'Click Download Word (.docx) to save your editable document.'
    ],
    supportedFormats: ['PDF (.pdf)', 'Word (.docx)'],
    faqs: [
      {
        question: 'Are my confidential PDF documents uploaded or saved anywhere?',
        answer: 'No. PixEnhance parses and converts your documents directly on your device. Your confidential files stay strictly private.'
      },
      {
        question: 'Can I open the downloaded .docx file in Microsoft Word and Google Docs?',
        answer: 'Yes! The generated file is a standard ISO-compliant OpenXML (.docx) package compatible with Microsoft Word, Google Docs, LibreOffice, and Apple Pages.'
      },
      {
        question: 'Does it support multi-page PDF documents?',
        answer: 'Yes, multi-page PDFs are fully supported and will include proper page break separations in the resulting Word document.'
      }
    ],
    relatedSlugs: ['word-to-pdf', 'image-to-pdf', 'compress-pdf', 'pdf-to-jpg']
  },

  // 42. Word to PDF
  {
    id: 'word-to-pdf',
    slug: '/word-to-pdf',
    name: 'Word to PDF',
    category: 'PDF Tools',
    popular: true,
    badge: 'PDF',
    shortDescription: 'Convert Microsoft Word (.docx) documents to crisp, printable PDF files directly in your browser.',
    icon: 'FileText',
    metaTitle: 'Word to PDF Converter Online Free — Convert DOCX to PDF | PixEnhance',
    metaDescription: 'Convert Word (.docx) files to PDF online for free. Clean formatting, A4 & US Letter page setups, 100% private and free.',
    h1: 'Convert Word (.docx) to PDF Online Free',
    subtitle: 'Convert DOCX Word documents into professional, high-DPI PDF documents with complete privacy.',
    features: [
      'Converts Microsoft Word (.docx) documents directly to standard ISO PDF',
      'High-resolution typography with A4 and US Letter page presets',
      'Custom margin adjustment (Normal, Narrow, Wide)',
      'Real-time paginated document preview before downloading',
      'Complete privacy — all files stay safe on your device'
    ],
    howToUse: [
      'Drag and drop your Microsoft Word (.docx) file into the converter.',
      'Preview the rendered pages and adjust page size or margins if needed.',
      'Click Download PDF Document to save the generated PDF instantly.'
    ],
    supportedFormats: ['Word (.docx)', 'PDF (.pdf)'],
    faqs: [
      {
        question: 'Is it safe to convert private Word files with PixEnhance?',
        answer: 'Absolutely. Unlike other cloud converter websites, PixEnhance unpacks and renders your Word document locally using JavaScript and Canvas. No data is sent over the internet.'
      },
      {
        question: 'What page sizes are supported for the output PDF?',
        answer: 'You can choose between ISO standard A4 (210 × 297 mm) and US Letter (8.5 × 11 inches) with portrait or landscape orientation.'
      }
    ],
    relatedSlugs: ['pdf-to-word', 'image-to-pdf', 'compress-pdf', 'pdf-to-png']
  },

  // 43. Code Converter
  {
    id: 'code-converter',
    slug: '/code-converter',
    name: 'Code Converter',
    category: 'Utilities',
    popular: true,
    badge: 'Dev Suite',
    shortDescription: 'Convert code to beautiful images (Carbon style) and transform between JSON, TypeScript, YAML, HTML, JSX & CSS.',
    icon: 'Code2',
    metaTitle: 'Free Online Code Converter & Code to Image Studio | PixEnhance',
    metaDescription: 'Convert code snippets to beautiful PNG/SVG images with macOS window frames, or transform code between JSON, TypeScript interfaces, YAML, HTML, JSX, and CSS.',
    h1: 'Free Online Code Converter & Code to Image Studio',
    subtitle: 'Generate stunning social code images (Carbon & Ray style) and convert code between TypeScript, JSON, YAML, JSX, and CSS with instant privacy.',
    features: [
      'Code to Image Studio: Export high-res PNG and vector SVG code mockups',
      'Mac window chrome, line numbers, padding, and 8+ designer gradient backgrounds',
      'Popular themes: One Dark Pro, Dracula, Night Owl, Cyberpunk, and Monokai',
      'JSON to TypeScript Interfaces & Types auto-generator',
      'Bidirectional JSON ⇄ YAML converter',
      'HTML to JSX / React converter with attribute and style mapping',
      'CSS to React Style Object converter & JSON Formatter/Minifier',
      '100% private processing — code never leaves your device'
    ],
    howToUse: [
      'Select your mode: Code to Image Studio or Code & Data Converter.',
      'Paste or type your code into the interactive editor.',
      'Configure themes, gradients, or target language formats.',
      'Click Download PNG, Save SVG, or Copy Converted Code to your clipboard.'
    ],
    supportedFormats: ['TypeScript', 'JavaScript', 'JSON', 'YAML', 'HTML', 'JSX', 'CSS', 'Python', 'PNG', 'SVG'],
    faqs: [
      {
        question: 'Is my source code or data uploaded or stored anywhere?',
        answer: 'Never. PixEnhance processes everything privately on your device. Your confidential code, API keys, and schemas remain strictly private.'
      },
      {
        question: 'What image formats can I export my code snippet as?',
        answer: 'You can export high-definition 2× Retina PNG images or scalable vector SVG files, or copy the rendered image directly to your clipboard.'
      },
      {
        question: 'How does the JSON to TypeScript converter work?',
        answer: 'It parses any valid JSON object or array and automatically constructs nested TypeScript interfaces and types with accurate primitives.'
      }
    ],
    relatedSlugs: ['code-to-image', 'image-to-base64', 'base64-to-image', 'color-picker']
  },

  // 44. Code to Image Converter
  {
    id: 'code-to-image',
    slug: '/code-to-image',
    name: 'Code to Image Converter',
    category: 'Utilities',
    popular: true,
    badge: 'Carbon Style',
    shortDescription: 'Generate beautiful, shareable screenshots of your code snippets with macOS window frames and gradient backgrounds.',
    icon: 'Code2',
    metaTitle: 'Code to Image Converter Online — Create Beautiful Code Snippets | PixEnhance',
    metaDescription: 'Turn code into beautiful images online for free. Carbon & Ray.so style code screenshots with dark themes, custom gradients, and macOS frames.',
    h1: 'Code to Image Converter',
    subtitle: 'Create elegant, high-resolution code screenshots for Twitter, documentation, blogs, and presentations directly in your browser.',
    features: [
      'Carbon & Ray.so style code snippet mockup generator',
      'Export to Retina 2× PNG and vector SVG',
      'One-click copy image to system clipboard',
      'Customizable background gradients, padding, and font sizes',
      'Dracula, One Dark, Monokai, and Night Owl syntax themes',
      '100% private, secure, and instant'
    ],
    howToUse: [
      'Paste your code snippet into the editor.',
      'Choose your preferred syntax theme and background gradient.',
      'Adjust canvas padding and toggle line numbers or window controls.',
      'Download your high-res PNG image or copy directly to clipboard.'
    ],
    supportedFormats: ['PNG', 'SVG', 'TypeScript', 'JavaScript', 'Python', 'HTML', 'CSS', 'JSON', 'Rust', 'Go'],
    faqs: [
      {
        question: 'Can I use the exported images in commercial presentations or blog posts?',
        answer: 'Yes! All exported code images are 100% free with no watermarks and full commercial rights.'
      },
      {
        question: 'How do I copy the generated code picture to my clipboard?',
        answer: 'Simply click the "Copy Image" button and paste directly into Slack, Twitter/X, Notion, or Google Docs.'
      }
    ],
    relatedSlugs: ['code-converter', 'image-to-base64', 'base64-to-image', 'collage-maker']
  }
];

export const TOOL_MAP = new Map(
  TOOLS_LIST.flatMap((t) => [
    [t.id, t],
    [t.slug.replace(/^\//, ''), t],
  ])
);

