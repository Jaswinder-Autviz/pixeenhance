export interface SEOLandingPage {
  slug: string;
  tool: 'image-compressor' | 'image-resizer' | 'converter' | 'social-resizer' | 'passport-resizer';
  toolConfig?: {
    initialTargetSize?: string;
    sourceType?: 'jpg' | 'png' | 'webp';
    targetType?: 'jpg' | 'png' | 'webp';
    platform?: 'instagram' | 'youtube' | 'whatsapp';
  };
  title: string;
  description: string;
  h1: string;
  category: string;
  badge?: string;
  intro: string;
  features: string[];
  howToUse: Array<{
    step: number;
    title: string;
    description: string;
  }>;
  usefulInfo: {
    heading: string;
    paragraphs: string[];
    table?: {
      headers: string[];
      rows: string[][];
    };
  };
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  relatedLinks: Array<{
    title: string;
    slug: string;
    description: string;
  }>;
  cta: {
    title: string;
    description: string;
    buttonText: string;
    buttonHref: string;
  };
}

export const SEO_LANDING_PAGES: SEOLandingPage[] = [
  // 1. /compress-jpg
  {
    slug: 'compress-jpg',
    tool: 'image-compressor',
    title: 'Compress JPG Online Free — Optimize JPG Size | PixEnhance',
    description: 'Compress JPG and JPEG photos online for free. Optimize image file size up to 85% with visually lossless clarity. No upload limits, 100% private in-browser compression.',
    h1: 'Compress JPG Images Online Free',
    category: 'Image Compression',
    badge: 'Up to 85% Reduction',
    intro: 'Reduce JPG and JPEG file sizes quickly and securely directly in your browser. PixEnhance uses advanced local quantization to trim unnecessary metadata and color redundancies while keeping your photos sharp, colorful, and visually identical.',
    features: [
      'Compress JPG files up to 85% without noticeable quality loss',
      'Interactive side-by-side comparison before downloading',
      'Target KB file size solver with automatic binary search',
      '100% private client-side processing — files never leave your device'
    ],
    howToUse: [
      {
        step: 1,
        title: 'Upload JPG File',
        description: 'Drag and drop or select your JPG or JPEG image from your phone or computer.'
      },
      {
        step: 2,
        title: 'Tune Quality or Target Size',
        description: 'Adjust the visual quality slider or select a target file size preset.'
      },
      {
        step: 3,
        title: 'Inspect Live Savings',
        description: 'Review the instant before-and-after savings calculation and preview.'
      },
      {
        step: 4,
        title: 'Download Optimized Image',
        description: 'Click Download Compressed Image to save your optimized JPG instantly.'
      }
    ],
    usefulInfo: {
      heading: 'How JPG Compression Works Without Sacrificing Visual Quality',
      paragraphs: [
        'JPEG (Joint Photographic Experts Group) utilizes lossy discrete cosine transform (DCT) encoding. Standard digital cameras and mobile phones save photos with excessive chroma information and heavy embedded EXIF metadata that the human eye cannot discern on screen.',
        'PixEnhance analyzes the high-frequency color variations and optimizes the quantization matrix locally on your machine. By discarding invisible redundancies while protecting edge contrasts and facial details, file sizes decrease by 60% to 85% with zero perceivable change in photo quality.',
        'This optimization accelerates page loading speeds, lowers bandwidth consumption, and ensures seamless photo sharing across email attachments and web upload portals.'
      ],
      table: {
        headers: ['Quality Preset', 'Avg Compression', 'Recommended Use Case'],
        rows: [
          ['High (85%–90%)', '40% – 60% savings', 'Portfolio photography, print preparation'],
          ['Medium (70%–80%)', '65% – 80% savings', 'Websites, e-commerce, social media'],
          ['Low (50%–65%)', '80% – 90% savings', 'Email attachments, fast preview thumbnails']
        ]
      }
    },
    faqs: [
      {
        question: 'Will compressing my JPG make the image blurry?',
        answer: 'No. PixEnhance defaults to visually lossless compression thresholds that retain sharp lines, vibrant colors, and crisp text without introducing blur or pixelation.'
      },
      {
        question: 'Is there a file size limit or daily upload quota?',
        answer: 'There are no limits. You can compress as many JPG photos as you need completely free with zero restrictions.'
      },
      {
        question: 'Are my JPG photos uploaded to any external servers?',
        answer: 'Never. All compression runs strictly inside your web browser using HTML5 Canvas decoders. Your photos remain 100% private on your device.'
      }
    ],
    relatedLinks: [
      { title: 'Compress JPG to 100KB', slug: 'compress-jpg-to-100kb', description: 'Strictly limit JPG size under 100 KB' },
      { title: 'Compress JPG to 50KB', slug: 'compress-jpg-to-50kb', description: 'Target 50KB limit for job forms' },
      { title: 'Compress PNG', slug: 'compress-png', description: 'Reduce PNG size while keeping transparency' },
      { title: 'JPG to WebP', slug: 'jpg-to-webp', description: 'Convert to next-gen WebP for maximum savings' },
      { title: 'Resize JPG', slug: 'resize-jpg', description: 'Scale JPEG pixel dimensions proportionally' }
    ],
    cta: {
      title: 'Need to Scale Dimensions Too?',
      description: 'Easily resize your JPG to exact pixel width and height with aspect ratio lock.',
      buttonText: 'Try Image Resizer',
      buttonHref: '/resize-image'
    }
  },

  // 2. /compress-png
  {
    slug: 'compress-png',
    tool: 'image-compressor',
    title: 'Compress PNG Online Free — Lossless & Fast | PixEnhance',
    description: 'Compress PNG images online for free without losing alpha transparency or sharpness. Fast client-side optimization with instant download and zero watermark.',
    h1: 'Compress PNG Images Online Free',
    category: 'Image Compression',
    badge: 'Retains Transparency',
    intro: 'Compress heavy PNG graphics, logos, screenshots, and artwork directly in your browser. PixEnhance preserves full 8-bit alpha transparency while compressing deflate blocks to dramatically reduce PNG payload sizes.',
    features: [
      'Preserves 100% alpha transparency for transparent logos and graphics',
      'Reduces PNG file size by up to 70% with intelligent color quantization',
      'Ideal for website icons, user interface graphics, and app assets',
      'Zero server upload — instant client-side processing'
    ],
    howToUse: [
      {
        step: 1,
        title: 'Select PNG File',
        description: 'Drop your transparent or opaque PNG image into the upload box.'
      },
      {
        step: 2,
        title: 'Choose Compression Level',
        description: 'Adjust the slider to balance palette depth and byte savings.'
      },
      {
        step: 3,
        title: 'Verify Transparency',
        description: 'Inspect the checkered canvas preview to verify transparency is preserved.'
      },
      {
        step: 4,
        title: 'Download Optimized PNG',
        description: 'Click Download to save your lightweight, high-clarity PNG file.'
      }
    ],
    usefulInfo: {
      heading: 'Understanding PNG Color Quantization & Transparency Preservation',
      paragraphs: [
        'Portable Network Graphics (PNG) is a lossless format that often uses 32 bits per pixel (24-bit RGB plus an 8-bit alpha channel). This uncompressed representation makes PNGs 4 to 10 times larger than JPEGs for photographs or complex graphics.',
        'PixEnhance utilizes median-cut color quantization to optimize redundant color palettes into high-efficiency 8-bit indexed structures while keeping alpha gradients completely smooth.',
        'This drastically lowers the download footprint of web logos, illustrations, and transparent UI components without introducing jagged edge artifacts.'
      ]
    },
    faqs: [
      {
        question: 'Does compressing a PNG remove the transparent background?',
        answer: 'No! PixEnhance fully respects the alpha transparency channel, ensuring your background remains completely transparent.'
      },
      {
        question: 'Why are PNG files generally larger than JPG files?',
        answer: 'PNG was engineered for lossless data storage where every single pixel is preserved exactly. JPG uses lossy approximation which achieves smaller file sizes.'
      }
    ],
    relatedLinks: [
      { title: 'Compress JPG', slug: 'compress-jpg', description: 'Compress JPEG photos with high savings' },
      { title: 'PNG to WebP', slug: 'png-to-webp', description: 'Convert PNG to WebP with transparency' },
      { title: 'Resize PNG', slug: 'resize-png', description: 'Scale transparent PNG dimensions' },
      { title: 'PNG to JPG', slug: 'png-to-jpg', description: 'Convert PNG to compact JPG with custom fill' }
    ],
    cta: {
      title: 'Looking for Even Smaller Web Assets?',
      description: 'Convert your transparent PNG to next-generation WebP for up to 35% extra savings.',
      buttonText: 'Convert PNG to WebP',
      buttonHref: '/png-to-webp'
    }
  },

  // 3. /compress-webp
  {
    slug: 'compress-webp',
    tool: 'image-compressor',
    title: 'Compress WebP Online Free — Fast Optimizer | PixEnhance',
    description: 'Compress WebP images online for free. Further Optimize next-generation WebP files to pass Google PageSpeed and Core Web Vitals with flying colors.',
    h1: 'Compress WebP Images Online Free',
    category: 'Image Compression',
    badge: 'Next-Gen Speed',
    intro: 'Maximize your website loading speed by optimizing modern WebP images. PixEnhance fine-tunes WebP compression coefficients right inside your browser for ultra-fast, lightweight web performance.',
    features: [
      'Boost Google PageSpeed Insights & Core Web Vitals (LCP)',
      'Supports lossy and lossless WebP formats with full alpha transparency',
      'Significantly lowers CDN and cloud storage hosting costs',
      'No registration, watermarks, or file limits'
    ],
    howToUse: [
      {
        step: 1,
        title: 'Upload WebP Image',
        description: 'Drop your WebP file into the optimizer.'
      },
      {
        step: 2,
        title: 'Set Target Quality',
        description: 'Select between 75% and 85% for optimal web performance.'
      },
      {
        step: 3,
        title: 'Review Compression',
        description: 'Check the real-time savings percentage and visual inspector.'
      },
      {
        step: 4,
        title: 'Save WebP',
        description: 'Download the optimized WebP image instantly.'
      }
    ],
    usefulInfo: {
      heading: 'Why Optimizing WebP is Crucial for Core Web Vitals',
      paragraphs: [
        'WebP, developed by Google, uses predictive coding and block-based compression to encode images. Even so, many image editing applications export WebP files at maximum 100% quality, leading to unnecessarily large file weights.',
        'Compressing WebP images down to 80-85% quality eliminates redundant macroblocks while keeping visual quality indistinguishable from the source. This drastically improves Largest Contentful Paint (LCP) scores in Google Lighthouse.'
      ]
    },
    faqs: [
      {
        question: 'Is WebP universally supported across all browsers?',
        answer: 'Yes! WebP is supported across more than 97% of modern web browsers including Google Chrome, Apple Safari, Mozilla Firefox, and Microsoft Edge.'
      },
      {
        question: 'Can WebP images have transparent backgrounds?',
        answer: 'Yes, WebP supports full 8-bit alpha transparency with significantly higher compression ratios than legacy PNG.'
      }
    ],
    relatedLinks: [
      { title: 'WebP to PNG', slug: 'webp-to-png', description: 'Convert WebP back to lossless PNG' },
      { title: 'WebP to JPG', slug: 'webp-to-jpg', description: 'Convert WebP to universal JPG format' },
      { title: 'Compress JPG', slug: 'compress-jpg', description: 'Optimize JPEG photos online' }
    ],
    cta: {
      title: 'Need Universal Compatibility?',
      description: 'Convert your WebP file to standard JPG or PNG for older systems and desktop software.',
      buttonText: 'Convert WebP to PNG',
      buttonHref: '/webp-to-png'
    }
  },

  // 4. /compress-jpg-to-50kb
  {
    slug: 'compress-jpg-to-50kb',
    tool: 'image-compressor',
    toolConfig: { initialTargetSize: '50kb' },
    title: 'Compress JPG to 50KB Online Free | PixEnhance',
    description: 'Compress JPG images to 50KB online for free. Strictly target file size under 50 KB for job application portals, SSC, UPSC, and passport uploads.',
    h1: 'Compress JPG to 50KB Online Free',
    category: 'Image Compression',
    badge: 'Under 50 KB',
    intro: 'Compress JPG photos to strictly under 50KB for government job forms, examination portals, college admissions, and visa portals that enforce a rigid 50 KB file size ceiling.',
    features: [
      'Automatic precision search to guarantee file size under 50 KB',
      'Preserves facial details, signatures, and document legibility',
      'Pre-configured 50KB solver preset — no manual guesswork',
      '100% private client-side processing with zero server uploads'
    ],
    howToUse: [
      {
        step: 1,
        title: 'Upload JPG',
        description: 'Drop your passport photo, signature, or document scan.'
      },
      {
        step: 2,
        title: '50KB Preset Activated',
        description: 'The Under 50 KB target preset is automatically selected.'
      },
      {
        step: 3,
        title: 'Verify File Size',
        description: 'Confirm the output file size is strictly below 50 KB.'
      },
      {
        step: 4,
        title: 'Download Image',
        description: 'Download your submission-ready JPG file.'
      }
    ],
    usefulInfo: {
      heading: 'Why Government & Examination Portals Require JPGs Under 50KB',
      paragraphs: [
        'Large registration portals (such as SSC, UPSC, IBPS, state entrance exams, and consular visa portals) handle millions of simultaneous applicants. To prevent database storage overload and ensure fast page loads, portal systems enforce strict file size limits typically between 20KB and 50KB.',
        'PixEnhance utilizes an automated iterative binary search over JPEG quality coefficients. It tests successive encoding steps to find the highest possible visual clarity that strictly stays beneath 50 KB (51,200 bytes).'
      ],
      table: {
        headers: ['Portal Type', 'Typical File Limit', 'PixEnhance Compatibility'],
        rows: [
          ['Job / Exam Applications (UPSC, SSC)', '20 KB – 50 KB', 'Fully Compatible'],
          ['Passport & Visa Portals', '50 KB – 100 KB', 'Fully Compatible'],
          ['University Admissions', 'Under 50 KB or 100 KB', 'Fully Compatible']
        ]
      }
    },
    faqs: [
      {
        question: 'Will text on identity cards and certificates remain legible under 50KB?',
        answer: 'Yes! PixEnhance preserves high text contrast so that names, dates of birth, and identity numbers remain clear and legible.'
      },
      {
        question: 'What if my JPG is already smaller than 50KB?',
        answer: 'If your file is already under 50KB, PixEnhance will not artificially inflate or degrade it.'
      }
    ],
    relatedLinks: [
      { title: 'Compress JPG to 100KB', slug: 'compress-jpg-to-100kb', description: 'Compress JPG under 100 KB' },
      { title: 'Compress JPG to 200KB', slug: 'compress-jpg-to-200kb', description: 'Compress JPG under 200 KB' },
      { title: 'Compress JPG', slug: 'compress-jpg', description: 'General JPG compression tool' },
      { title: 'Passport Photo Resizer', slug: 'passport-photo-resizer', description: 'Resize photos to biometric 2x2 or 35x45mm' }
    ],
    cta: {
      title: 'Need Exact Dimensions for Your Application?',
      description: 'Prepare photos for international passports and visas with official dimension presets.',
      buttonText: 'Passport Photo Resizer',
      buttonHref: '/passport-photo-resizer'
    }
  },

  // 5. /compress-jpg-to-100kb
  {
    slug: 'compress-jpg-to-100kb',
    tool: 'image-compressor',
    toolConfig: { initialTargetSize: '100kb' },
    title: 'Compress JPG to 100KB Online Free | PixEnhance',
    description: 'Compress JPG images to 100KB online for free. Reduce JPEG file size strictly below 100 KB with studio clarity. Ideal for online submissions and email attachments.',
    h1: 'Compress JPG to 100KB Online Free',
    category: 'Image Compression',
    badge: 'Under 100 KB',
    intro: 'Reduce large multi-megabyte JPG photos to under 100KB with pixel-sharp quality. PixEnhance intelligently balances compression tables to produce a clean, lightweight image below 100 KB.',
    features: [
      'Strict target file size solver under 100 KB (102,400 bytes)',
      'Sharp text, accurate skin tones, and vivid color preservation',
      'Runs 100% locally in your browser with complete privacy',
      'No registration, watermarks, or file limits'
    ],
    howToUse: [
      {
        step: 1,
        title: 'Upload Image',
        description: 'Drop any large JPG photo into the upload area.'
      },
      {
        step: 2,
        title: 'Automatic Solver',
        description: 'The 100 KB preset calculates the optimal quality factor.'
      },
      {
        step: 3,
        title: 'Preview',
        description: 'Inspect the side-by-side preview to verify visual quality.'
      },
      {
        step: 4,
        title: 'Download',
        description: 'Click Download to receive your JPG under 100 KB.'
      }
    ],
    usefulInfo: {
      heading: 'The 100KB Standard: Balancing High Resolution with Fast Loading',
      paragraphs: [
        'A 100KB image file is the gold standard across web design, email marketing campaigns, and digital application portals. At 100KB, images download almost instantly even on 3G cellular connections while preserving sufficient pixel density for high-DPI displays.',
        'PixEnhance achieves this by pruning redundant EXIF headers, thumbnail tracks, and fine-tuning quantization tables without squishing pixel dimensions.'
      ]
    },
    faqs: [
      {
        question: 'Can I compress a 10MB camera photo to 100KB?',
        answer: 'Yes! PixEnhance can optimize multi-megabyte camera photos into lightweight files under 100KB.'
      },
      {
        question: 'Does this tool change my photo pixel dimensions?',
        answer: 'No. Compression optimizes the byte encoding without altering your width or height in pixels.'
      }
    ],
    relatedLinks: [
      { title: 'Compress JPG to 50KB', slug: 'compress-jpg-to-50kb', description: 'Compress JPG strictly under 50 KB' },
      { title: 'Compress JPG to 200KB', slug: 'compress-jpg-to-200kb', description: 'Compress JPG under 200 KB' },
      { title: 'Compress JPG', slug: 'compress-jpg', description: 'General JPG compression tool' },
      { title: 'Resize Image to 1080x1080', slug: 'resize-image-to-1080x1080', description: 'Resize to square 1080x1080 canvas' }
    ],
    cta: {
      title: 'Need to Scale Dimensions as Well?',
      description: 'Format your photo dimensions to exact pixels or popular social media standards.',
      buttonText: 'Resize Image',
      buttonHref: '/resize-image'
    }
  },

  // 6. /compress-jpg-to-200kb
  {
    slug: 'compress-jpg-to-200kb',
    tool: 'image-compressor',
    toolConfig: { initialTargetSize: '200kb' },
    title: 'Compress JPG to 200KB Online Free | PixEnhance',
    description: 'Compress JPG images to 200KB online for free. Optimize high-resolution DSLR and smartphone photos under 200 KB while maintaining crystal clear detail.',
    h1: 'Compress JPG to 200KB Online Free',
    category: 'Image Compression',
    badge: 'Under 200 KB',
    intro: 'Downscale heavy camera photos into manageable files under 200KB without visible artifacts. Ideal for website banners, portfolio galleries, and upload portals requiring under 200 KB.',
    features: [
      'Precision target solver under 200 KB (204,800 bytes)',
      'Retains maximum high-DPI detail and photographic sharpness',
      'Effortlessly handles 15MB+ raw phone and DSLR uploads',
      'Safe and private local execution in your web browser'
    ],
    howToUse: [
      {
        step: 1,
        title: 'Upload Large JPG',
        description: 'Drop your high-resolution JPG or JPEG photo.'
      },
      {
        step: 2,
        title: 'Target 200KB Applied',
        description: 'The 200 KB target preset computes the optimal encoding.'
      },
      {
        step: 3,
        title: 'Compare Savings',
        description: 'Verify that the output size is strictly below 200 KB.'
      },
      {
        step: 4,
        title: 'Download Image',
        description: 'Save your compressed, high-clarity photo.'
      }
    ],
    usefulInfo: {
      heading: 'Why 200KB is Ideal for E-Commerce & Web Hero Images',
      paragraphs: [
        'Web development performance benchmarks recommend keeping individual full-width banner images under 200KB to ensure fast First Contentful Paint (FCP). Photos exceeding 500KB significantly degrade mobile bounce rates and search rankings.',
        'With PixEnhance, you can maintain rich colors, textures, and depth in your photography while meeting strict 200 KB ceilings.'
      ]
    },
    faqs: [
      {
        question: 'Will 200KB compression cause color banding in skies or gradients?',
        answer: 'No. Our encoder preserves smooth color gradations without coarse stepping or banding artifacts.'
      }
    ],
    relatedLinks: [
      { title: 'Compress JPG to 100KB', slug: 'compress-jpg-to-100kb', description: 'Compress JPG under 100 KB' },
      { title: 'Compress JPG', slug: 'compress-jpg', description: 'General JPG compression tool' },
      { title: 'Resize Image to 1920x1080', slug: 'resize-image-to-1920x1080', description: 'Scale to Full HD 16:9' }
    ],
    cta: {
      title: 'Prepare Images for Modern Displays',
      description: 'Scale your image to Full HD 1920x1080 widescreen with aspect ratio lock.',
      buttonText: 'Resize to 1920x1080',
      buttonHref: '/resize-image-to-1920x1080'
    }
  },

  // 7. /resize-image
  {
    slug: 'resize-image',
    tool: 'image-resizer',
    title: 'Resize Image Online Free — Photo Resizer | PixEnhance',
    description: 'Resize images online for free. Scale width and height in pixels or percentage, lock aspect ratios, and export to JPG, PNG, or WebP with instant local processing.',
    h1: 'Free Online Image Resizer',
    category: 'Image Resizing',
    badge: 'Pixel Precision',
    intro: 'Scale pictures to exact pixel dimensions, percentage scales, or popular resolution standards. PixEnhance provides bicubic canvas resampling to ensure clean edges and prevent aspect ratio warping.',
    features: [
      'Custom pixel width and height adjustment with real-time recalculation',
      'Proportional aspect ratio lock prevents unwanted image distortion',
      'Quick resolution presets: Full HD 1080p, 4K, 720p, 50%, 25%',
      'Multi-format export: save as JPG, PNG, or modern WebP'
    ],
    howToUse: [
      {
        step: 1,
        title: 'Upload Photo',
        description: 'Drop any JPG, PNG, or WebP image into the resizer.'
      },
      {
        step: 2,
        title: 'Enter Dimensions',
        description: 'Input your desired width or height, or pick a percentage preset.'
      },
      {
        step: 3,
        title: 'Keep Aspect Ratio Locked',
        description: 'Ensure the lock icon is active to maintain natural proportions.'
      },
      {
        step: 4,
        title: 'Export Resized Image',
        description: 'Choose your preferred export format and download.'
      }
    ],
    usefulInfo: {
      heading: 'Understanding Aspect Ratios and High-Quality Resampling',
      paragraphs: [
        'Resizing an image involves recalculating the grid of pixels that compose the image. When downscaling, pixels are blended using mathematical convolution filters (bicubic interpolation) to preserve sharpness without aliasing.',
        'Locking the aspect ratio ensures that when you adjust width, height automatically calculates proportionately according to W / H = original ratio. This prevents awkward stretching or squishing.'
      ],
      table: {
        headers: ['Common Standard', 'Dimensions', 'Primary Usage'],
        rows: [
          ['Full HD (1080p)', '1920 × 1080 px (16:9)', 'Displays, YouTube, Desktop Wallpapers'],
          ['Square Post', '1080 × 1080 px (1:1)', 'Instagram Feed, Avatars, Product Tiles'],
          ['Vertical Story', '1080 × 1920 px (9:16)', 'Instagram Stories, TikTok, YouTube Shorts'],
          ['HD (720p)', '1280 × 720 px (16:9)', 'YouTube Thumbnails, Web Banners']
        ]
      }
    },
    faqs: [
      {
        question: 'Can I enlarge an image without losing sharpness?',
        answer: 'Enlarging an image interpolates existing pixel data. Downscaling always produces sharper results, but PixEnhance uses multi-pass bicubic smoothing to minimize pixelation when enlarging.'
      },
      {
        question: 'What happens if I unlock the aspect ratio?',
        answer: 'Unlocking allows you to enter independent width and height values, which stretches or condenses the photo to match the exact canvas.'
      }
    ],
    relatedLinks: [
      { title: 'Resize JPG', slug: 'resize-jpg', description: 'Scale JPEG images with aspect ratio lock' },
      { title: 'Resize PNG', slug: 'resize-png', description: 'Scale PNG graphics with transparency' },
      { title: 'Resize to 1080x1080', slug: 'resize-image-to-1080x1080', description: 'Scale to square 1:1 format' },
      { title: 'Resize to 1920x1080', slug: 'resize-image-to-1920x1080', description: 'Scale to 16:9 Full HD' },
      { title: 'Compress JPG', slug: 'compress-jpg', description: 'Reduce JPEG file size' }
    ],
    cta: {
      title: 'Need to Reduce File Size After Resizing?',
      description: 'Compress your newly resized image up to 85% with our free image compressor.',
      buttonText: 'Compress Image',
      buttonHref: '/image-compressor'
    }
  },

  // 8. /resize-jpg
  {
    slug: 'resize-jpg',
    tool: 'image-resizer',
    title: 'Resize JPG Online Free — Scale JPEG Images | PixEnhance',
    description: 'Resize JPG images online for free. Adjust JPEG pixel dimensions with precision bicubic resampling and proportional aspect ratio locking.',
    h1: 'Resize JPG Images Online Free',
    category: 'Image Resizing',
    badge: 'JPEG Scaling',
    intro: 'Change the width and height of your JPEG photos without stretching or distortion. PixEnhance recalculates pixel dimensions with high-precision canvas interpolation for professional results.',
    features: [
      'Precision JPEG downscaling and upscaling in your browser',
      'Aspect ratio lock prevents squishing or distorted proportions',
      'One-click dimension presets for mobile, web, and printing',
      'Instant download with zero watermark and complete privacy'
    ],
    howToUse: [
      {
        step: 1,
        title: 'Upload JPG',
        description: 'Select your JPEG or JPG photo.'
      },
      {
        step: 2,
        title: 'Specify Dimensions',
        description: 'Type target width or height in pixels.'
      },
      {
        step: 3,
        title: 'Check Lock',
        description: 'Verify aspect ratio lock is enabled.'
      },
      {
        step: 4,
        title: 'Save Image',
        description: 'Download the resized JPG.'
      }
    ],
    usefulInfo: {
      heading: 'How Bicubic Interpolation Keeps Resized JPEGs Sharp',
      paragraphs: [
        'When resizing JPG images, nearest-neighbor scaling produces jagged stair-stepping edges. PixEnhance employs 16-point bicubic interpolation to sample adjacent pixel color coordinates smoothly.',
        'This produces natural color transitions, sharp text lines, and crisp photographic clarity whether you scale down a 48MP smartphone shot or scale up a graphic.'
      ]
    },
    faqs: [
      {
        question: 'Will resizing a JPG reduce its file size?',
        answer: 'Yes! Reducing pixel dimensions dramatically reduces the total pixel count, resulting in much smaller file sizes.'
      }
    ],
    relatedLinks: [
      { title: 'Resize Image', slug: 'resize-image', description: 'Universal image resizer' },
      { title: 'Resize PNG', slug: 'resize-png', description: 'Scale PNG graphics' },
      { title: 'Compress JPG', slug: 'compress-jpg', description: 'Compress JPEG file size' },
      { title: 'JPG to WebP', slug: 'jpg-to-webp', description: 'Convert JPG to WebP' }
    ],
    cta: {
      title: 'Compress Your Resized JPG',
      description: 'Optimize your newly resized photo for web speed with instant byte savings.',
      buttonText: 'Compress JPG',
      buttonHref: '/compress-jpg'
    }
  },

  // 9. /resize-png
  {
    slug: 'resize-png',
    tool: 'image-resizer',
    title: 'Resize PNG Online Free — Transparent Scale | PixEnhance',
    description: 'Resize PNG images online for free while keeping transparent backgrounds intact. Scale pixel dimensions for icons, logos, and digital graphics.',
    h1: 'Resize PNG Images Online Free',
    category: 'Image Resizing',
    badge: 'Transparent Safe',
    intro: 'Scale transparent PNG photos and graphic assets without losing background transparency or crisp vectors. PixEnhance preserves full 32-bit RGBA channels throughout resizing.',
    features: [
      '100% preservation of transparent background alpha channel',
      'Crisp sub-pixel interpolation for logos and vector icons',
      'Aspect ratio lock prevents distortion and logo stretching',
      'Fast client-side rendering with no remote server uploads'
    ],
    howToUse: [
      {
        step: 1,
        title: 'Upload PNG',
        description: 'Drop your transparent or opaque PNG file.'
      },
      {
        step: 2,
        title: 'Enter Target Size',
        description: 'Set your new width or height in pixels.'
      },
      {
        step: 3,
        title: 'Preview Output',
        description: 'Check transparent canvas edges in the preview.'
      },
      {
        step: 4,
        title: 'Download PNG',
        description: 'Save your resized transparent PNG.'
      }
    ],
    usefulInfo: {
      heading: 'Preserving Crisp Vector Edges and Alpha Transparency in PNGs',
      paragraphs: [
        'Resizing PNG images containing transparency requires careful treatment of semi-transparent boundary pixels (anti-aliasing). Naive resizers can introduce a dark or white fringe around icons.',
        'PixEnhance calculates premultiplied alpha color blending to ensure that transparent silhouettes stay clean and crisp against any background.'
      ]
    },
    faqs: [
      {
        question: 'Will my resized PNG keep its transparent background?',
        answer: 'Yes! All transparent areas and translucent drop shadows are fully preserved.'
      }
    ],
    relatedLinks: [
      { title: 'Compress PNG', slug: 'compress-png', description: 'Compress PNG file size' },
      { title: 'Resize Image', slug: 'resize-image', description: 'Universal image resizer' },
      { title: 'PNG to WebP', slug: 'png-to-webp', description: 'Convert PNG to WebP' },
      { title: 'PNG to JPG', slug: 'png-to-jpg', description: 'Convert PNG to JPG' }
    ],
    cta: {
      title: 'Need to Compress Your PNG?',
      description: 'Optimize your newly resized PNG while keeping transparency 100% intact.',
      buttonText: 'Compress PNG',
      buttonHref: '/compress-png'
    }
  },

  // 10. /resize-image-to-1080x1080
  {
    slug: 'resize-image-to-1080x1080',
    tool: 'image-resizer',
    title: 'Resize Image to 1080x1080 Online (1:1) | PixEnhance',
    description: 'Resize images to 1080x1080 pixels online for free. Format photos into a crisp 1:1 square canvas for Instagram posts, Facebook avatars, and profile pictures.',
    h1: 'Resize Image to 1080x1080 Online Free',
    category: 'Image Resizing',
    badge: '1:1 Square Format',
    intro: 'Convert any landscape or portrait photo into the universal 1080 × 1080 pixel square standard. The definitive resolution for Instagram feed posts, social avatars, and digital product catalogs.',
    features: [
      'Exact 1080 × 1080 px resolution output',
      'Universal 1:1 square aspect ratio standard',
      'Prevents uneven cropping on Instagram and social media apps',
      'High-definition export in JPG, PNG, or WebP'
    ],
    howToUse: [
      {
        step: 1,
        title: 'Select Photo',
        description: 'Upload any photo or artwork.'
      },
      {
        step: 2,
        title: 'Scale to 1080x1080',
        description: 'Enter 1080 for width and 1080 for height.'
      },
      {
        step: 3,
        title: 'Check Proportions',
        description: 'Ensure your subject is centered and framed cleanly.'
      },
      {
        step: 4,
        title: 'Download Square Image',
        description: 'Save your 1080x1080 photo ready for social sharing.'
      }
    ],
    usefulInfo: {
      heading: 'Why 1080x1080 is the Universal Social Media Standard',
      paragraphs: [
        'Introduced by Instagram and adopted across Meta, X (Twitter), LinkedIn, and e-commerce platforms, 1080 × 1080 pixels at 1:1 aspect ratio provides the ideal balance of pixel density and loading speed.',
        'Resizing your photos to exactly 1080x1080 ensures your feed posts display with maximum sharpness and avoids aggressive client-side compression by social media uploaders.'
      ]
    },
    faqs: [
      {
        question: 'Will 1080x1080 work for Instagram profile pictures?',
        answer: 'Yes! 1080x1080 is the ideal high-resolution source for Instagram circular avatars, Facebook profile photos, and WhatsApp DPs.'
      }
    ],
    relatedLinks: [
      { title: 'Resize Image for Instagram', slug: 'resize-image-for-instagram', description: 'Social resizer with blurred padding' },
      { title: 'Instagram Post Resizer', slug: 'instagram-post-resizer', description: 'Square & portrait Instagram resizer' },
      { title: 'Resize to 1920x1080', slug: 'resize-image-to-1920x1080', description: 'Full HD 16:9 resizer' },
      { title: 'Compress JPG to 100KB', slug: 'compress-jpg-to-100kb', description: 'Compress under 100 KB' }
    ],
    cta: {
      title: 'Need Blurred Padding to Avoid Cropping?',
      description: 'Use our Instagram Resizer to fit full portrait or landscape photos into square canvas without cropping.',
      buttonText: 'Instagram Resizer',
      buttonHref: '/resize-image-for-instagram'
    }
  },

  // 11. /resize-image-to-1920x1080
  {
    slug: 'resize-image-to-1920x1080',
    tool: 'image-resizer',
    title: 'Resize Image to 1920x1080 Online (16:9) | PixEnhance',
    description: 'Resize images to 1920x1080 Full HD online for free. Scale photos to 16:9 widescreen dimensions for wallpapers, video thumbnails, and display screens.',
    h1: 'Resize Image to 1920x1080 Online Free',
    category: 'Image Resizing',
    badge: '1080p Full HD',
    intro: 'Transform pictures into Full HD (1920 × 1080 pixels) with a crisp 16:9 widescreen ratio. Perfect for desktop wallpapers, presentation slides, YouTube video assets, and digital signage.',
    features: [
      'Full HD 1080p industry standard (1920 × 1080 px)',
      'Universal 16:9 widescreen aspect ratio',
      'Bicubic canvas smoothing eliminates pixelation and blurring',
      'Export as high-quality JPG, PNG, or WebP'
    ],
    howToUse: [
      {
        step: 1,
        title: 'Select Photo',
        description: 'Upload your wallpaper or graphic.'
      },
      {
        step: 2,
        title: 'Set 1920x1080',
        description: 'Enter 1920 width and 1080 height.'
      },
      {
        step: 3,
        title: 'Preview',
        description: 'Review the 16:9 widescreen framing.'
      },
      {
        step: 4,
        title: 'Download',
        description: 'Download your Full HD 1080p image.'
      }
    ],
    usefulInfo: {
      heading: 'The Significance of 1920x1080 (16:9) Resolution',
      paragraphs: [
        '1920 × 1080 (also known as 1080p or Full High Definition) consists of over 2.07 million pixels. It remains the dominant resolution for desktop monitors, televisions, laptop screens, PowerPoint presentations, and streaming video.',
        'Resizing graphics to exactly 1920x1080 ensures borderless playback on screens without awkward black letterbox bars.'
      ]
    },
    faqs: [
      {
        question: 'Can I use a 1920x1080 image as a YouTube thumbnail?',
        answer: 'Yes! While YouTube standard thumbnails are 1280x720, 1920x1080 uses the exact same 16:9 aspect ratio at higher resolution and works great if file size is under 2MB.'
      }
    ],
    relatedLinks: [
      { title: 'YouTube Thumbnail Resizer', slug: 'resize-image-for-youtube-thumbnail', description: 'Scale to 1280x720 for YouTube' },
      { title: 'YouTube Banner Resizer', slug: 'youtube-banner-resizer', description: 'Scale to 2560x1440 channel art' },
      { title: 'Resize to 1080x1080', slug: 'resize-image-to-1080x1080', description: 'Scale to 1:1 square' },
      { title: 'Compress JPG to 200KB', slug: 'compress-jpg-to-200kb', description: 'Compress under 200 KB' }
    ],
    cta: {
      title: 'Creating YouTube Thumbnails?',
      description: 'Format photos directly to official 1280x720 YouTube specifications.',
      buttonText: 'YouTube Thumbnail Resizer',
      buttonHref: '/resize-image-for-youtube-thumbnail'
    }
  },

  // 12. /resize-image-for-instagram
  {
    slug: 'resize-image-for-instagram',
    tool: 'social-resizer',
    toolConfig: { platform: 'instagram' },
    title: 'Resize Image for Instagram Online Free | PixEnhance',
    description: 'Resize images for Instagram online for free. Format photos for 1:1 square (1080x1080), 4:5 portrait (1080x1350), and 9:16 story (1080x1920) without cropping.',
    h1: 'Resize Image for Instagram Online Free',
    category: 'Social Media',
    badge: 'No Crop Padding',
    intro: 'Fit full-size photos into Instagram without unexpected automatic cropping. PixEnhance formats your pictures for Square (1080×1080), Portrait (1080×1350), Landscape (1080×566), and Stories (1080×1920) with blurred background padding.',
    features: [
      'Presets for Instagram Square (1:1), Portrait (4:5), and Story (9:16)',
      'Aesthetic blurred matching background mode prevents cutoffs',
      'White, black, or custom color background border options',
      'Instant download ready for direct Instagram app posting'
    ],
    howToUse: [
      {
        step: 1,
        title: 'Upload Photo',
        description: 'Drop any horizontal, vertical, or panoramic photo.'
      },
      {
        step: 2,
        title: 'Pick Instagram Preset',
        description: 'Choose Square (1080x1080), Portrait (1080x1350), or Story (1080x1920).'
      },
      {
        step: 3,
        title: 'Select Background Fill',
        description: 'Choose Blur, White, Black, or Crop to frame your photo.'
      },
      {
        step: 4,
        title: 'Download & Post',
        description: 'Save your perfectly formatted Instagram photo.'
      }
    ],
    usefulInfo: {
      heading: 'Mastering Instagram Aspect Ratios: Feed vs Story',
      paragraphs: [
        'Instagram supports three primary aspect ratios in the feed: 1:1 Square (1080×1080 px), 4:5 Vertical Portrait (1080×1350 px), and 1.91:1 Landscape (1080×566 px). Stories and Reels require 9:16 (1080×1920 px).',
        'If you upload a photo outside these dimensions, Instagram forcibly crops the outer edges. PixEnhance places your full image inside the frame and fills the extra space with a stylish blurred mirror of the photo.'
      ]
    },
    faqs: [
      {
        question: 'Which Instagram format gets the most engagement?',
        answer: 'The 4:5 Portrait format (1080×1350 px) occupies the largest vertical area on smartphone screens, generating higher user view time and engagement.'
      },
      {
        question: 'How do I prevent Instagram from reducing my photo quality?',
        answer: 'Pre-resizing your photo to exactly 1080px width before uploading prevents Instagram servers from executing aggressive lossy recompression.'
      }
    ],
    relatedLinks: [
      { title: 'Instagram Post Resizer', slug: 'instagram-post-resizer', description: 'Format feed posts' },
      { title: 'Instagram Story Resizer', slug: 'instagram-story-resizer', description: 'Format 9:16 vertical stories' },
      { title: 'Resize to 1080x1080', slug: 'resize-image-to-1080x1080', description: 'Scale to square canvas' },
      { title: 'Compress JPG', slug: 'compress-jpg', description: 'Optimize photo file size' }
    ],
    cta: {
      title: 'Want Full 9:16 Vertical Stories?',
      description: 'Convert horizontal and square photos into full-screen 1080x1920 Instagram stories.',
      buttonText: 'Instagram Story Resizer',
      buttonHref: '/instagram-story-resizer'
    }
  },

  // 13. /resize-image-for-youtube-thumbnail
  {
    slug: 'resize-image-for-youtube-thumbnail',
    tool: 'social-resizer',
    toolConfig: { platform: 'youtube' },
    title: 'YouTube Thumbnail Resizer (1280x720) | PixEnhance',
    description: 'Resize images for YouTube thumbnails online for free. Convert any photo to 1280x720 pixels (16:9 aspect ratio) under 2MB for maximum video CTR.',
    h1: 'Resize Image for YouTube Thumbnail Online Free',
    category: 'Social Media',
    badge: '1280 × 720 px Standard',
    intro: 'Format pictures to YouTube\'s exact thumbnail requirements: 1280 × 720 pixels, 16:9 aspect ratio, and under 2MB file size. Ensure your video covers look sharp on mobile and desktop.',
    features: [
      'Official YouTube 1280 × 720 px thumbnail dimensions',
      'Strict 16:9 widescreen aspect ratio',
      'Keeps file size strictly under YouTube\'s 2MB ceiling',
      'Crisp text readability and high contrast preservation'
    ],
    howToUse: [
      {
        step: 1,
        title: 'Upload Thumbnail Image',
        description: 'Drop your video cover photo or artwork.'
      },
      {
        step: 2,
        title: 'Automatic 1280x720',
        description: 'The tool automatically formats to 1280 × 720 (16:9).'
      },
      {
        step: 3,
        title: 'Adjust Framing',
        description: 'Inspect the preview to ensure focal subject is prominent.'
      },
      {
        step: 4,
        title: 'Save & Upload to YouTube',
        description: 'Download your YouTube-ready thumbnail instantly.'
      }
    ],
    usefulInfo: {
      heading: 'YouTube Thumbnail Guidelines for High Click-Through Rates (CTR)',
      paragraphs: [
        'YouTube specifies 1280 × 720 pixels with a minimum width of 640 pixels, 16:9 aspect ratio, and a maximum file size of 2MB (formats: JPG, GIF, or PNG).',
        'Over 70% of YouTube views occur on mobile devices. Resizing your image with crisp contrast and clear focal points ensures text remains legible even in miniature search recommendation feeds.'
      ]
    },
    faqs: [
      {
        question: 'What is the maximum file size for a YouTube thumbnail?',
        answer: 'YouTube permits thumbnails up to 2MB in file size. PixEnhance outputs high-quality images well under this limit.'
      }
    ],
    relatedLinks: [
      { title: 'YouTube Banner Resizer', slug: 'youtube-banner-resizer', description: 'Scale channel art to 2560x1440' },
      { title: 'Resize to 1920x1080', slug: 'resize-image-to-1920x1080', description: 'Full HD widescreen scaling' },
      { title: 'Compress JPG', slug: 'compress-jpg', description: 'Optimize JPEG thumbnails' }
    ],
    cta: {
      title: 'Need Channel Banner Art As Well?',
      description: 'Format your YouTube channel banner to the official 2560x1440 pixel size.',
      buttonText: 'YouTube Banner Resizer',
      buttonHref: '/youtube-banner-resizer'
    }
  },

  // 14. /webp-to-png
  {
    slug: 'webp-to-png',
    tool: 'converter',
    toolConfig: { sourceType: 'webp', targetType: 'png' },
    title: 'WebP to PNG Converter Online Free | PixEnhance',
    description: 'Convert WebP images to lossless PNG format online for free. Preserve transparent backgrounds and extract full-fidelity graphics instantly.',
    h1: 'WebP to PNG Converter Online Free',
    category: 'Image Conversion',
    badge: 'Lossless & Transparent',
    intro: 'Convert modern WebP pictures into lossless PNG format with total preservation of alpha transparency. Perfect for opening WebP files in legacy image editors, design suites, and print workflows.',
    features: [
      'Lossless 24-bit RGB + 8-bit Alpha PNG output',
      'Full transparent background preservation with zero degradation',
      'Instant local in-browser conversion with zero server wait',
      'Batch conversion support with full data privacy'
    ],
    howToUse: [
      {
        step: 1,
        title: 'Upload WebP Image',
        description: 'Drop your .webp file into the conversion zone.'
      },
      {
        step: 2,
        title: 'Automatic Conversion',
        description: 'The engine converts WebP pixel data to lossless PNG.'
      },
      {
        step: 3,
        title: 'Inspect Preview',
        description: 'Verify dimensions and transparent areas.'
      },
      {
        step: 4,
        title: 'Download PNG',
        description: 'Click Download PNG to save your converted image.'
      }
    ],
    usefulInfo: {
      heading: 'Why Convert WebP to PNG?',
      paragraphs: [
        'While WebP is ideal for websites, many legacy desktop graphic applications, older Photoshop versions, and video editing suites do not support WebP natively.',
        'Converting WebP to PNG restores full compatibility across every desktop editor, office suite, and print printer while preserving transparent layers without loss.'
      ]
    },
    faqs: [
      {
        question: 'Will converting WebP to PNG preserve transparency?',
        answer: 'Yes! All 8-bit alpha transparent channels in your WebP are seamlessly translated into the PNG structure.'
      },
      {
        question: 'Why is the converted PNG larger in file size than the WebP?',
        answer: 'WebP uses advanced predictive lossy or lossless compression. PNG uses standard Deflate compression, resulting in larger, universally compatible files.'
      }
    ],
    relatedLinks: [
      { title: 'WebP to JPG', slug: 'webp-to-jpg', description: 'Convert WebP to universal JPG' },
      { title: 'PNG to WebP', slug: 'png-to-webp', description: 'Convert PNG to next-gen WebP' },
      { title: 'Compress PNG', slug: 'compress-png', description: 'Compress PNG file size' }
    ],
    cta: {
      title: 'Need Universal JPG Format Instead?',
      description: 'Convert your WebP photo to standard JPEG format for universal photo viewers.',
      buttonText: 'WebP to JPG',
      buttonHref: '/webp-to-jpg'
    }
  },

  // 15. /instagram-post-resizer
  {
    slug: 'instagram-post-resizer',
    tool: 'social-resizer',
    toolConfig: { platform: 'instagram' },
    title: 'Instagram Post Resizer Online Free | PixEnhance',
    description: 'Resize photos for Instagram feed posts online for free. Convert pictures to 1080x1080 square or 1080x1350 vertical portrait with custom border fills.',
    h1: 'Instagram Post Resizer Online Free',
    category: 'Social Media',
    badge: 'Feed Ready',
    intro: 'Optimize your photos specifically for the Instagram feed. Switch between 1:1 Square (1080×1080) and 4:5 Vertical Portrait (1080×1350) to occupy maximum screen real estate and maximize follower engagement.',
    features: [
      '1080 × 1080 px Square & 1080 × 1350 px Portrait presets',
      '4:5 vertical mode provides 37% more smartphone screen space',
      'Aesthetic blurred background border mode prevents edge clipping',
      'High-clarity export ready for immediate posting'
    ],
    howToUse: [
      {
        step: 1,
        title: 'Upload Image',
        description: 'Drop your photo into the resizer.'
      },
      {
        step: 2,
        title: 'Pick Square or Portrait',
        description: 'Select 1080x1080 Square or 1080x1350 Portrait.'
      },
      {
        step: 3,
        title: 'Choose Style',
        description: 'Select blurred padding or solid color border.'
      },
      {
        step: 4,
        title: 'Download Post',
        description: 'Save your completed Instagram feed photo.'
      }
    ],
    usefulInfo: {
      heading: 'The Power of 4:5 Vertical Posts on Instagram',
      paragraphs: [
        'A 4:5 vertical post (1080 × 1350 pixels) is the tallest format allowed in the Instagram feed. It occupies almost the entirety of the mobile phone screen as users scroll, giving your photo 37% more visual space than a square post and 139% more than a landscape post.',
        'Using PixEnhance to fit landscape photos into 4:5 vertical canvas with blurred borders gives you maximum screen dominance without cropping out details.'
      ]
    },
    faqs: [
      {
        question: 'Will this tool stretch or distort my face?',
        answer: 'No. The image aspect ratio is strictly preserved; empty borders are filled with your choice of blur or color.'
      }
    ],
    relatedLinks: [
      { title: 'Instagram Story Resizer', slug: 'instagram-story-resizer', description: 'Format 9:16 vertical stories' },
      { title: 'Resize Image for Instagram', slug: 'resize-image-for-instagram', description: 'Universal Instagram resizer' },
      { title: 'Resize to 1080x1080', slug: 'resize-image-to-1080x1080', description: 'Scale to square canvas' }
    ],
    cta: {
      title: 'Formatting Stories or Reels Too?',
      description: 'Prepare photos for full-screen 9:16 Instagram Stories with zero cutoffs.',
      buttonText: 'Instagram Story Resizer',
      buttonHref: '/instagram-story-resizer'
    }
  },

  // 16. /instagram-story-resizer
  {
    slug: 'instagram-story-resizer',
    tool: 'social-resizer',
    toolConfig: { platform: 'instagram' },
    title: 'Instagram Story & Reel Resizer Free | PixEnhance',
    description: 'Resize images for Instagram stories and reels online for free. Fit horizontal or square photos into 1080x1920 vertical canvas without distortion.',
    h1: 'Instagram Story Resizer Online Free',
    category: 'Social Media',
    badge: '9:16 Full Screen',
    intro: 'Fit photos into full-screen 1080 × 1920 vertical format for Instagram Stories and Reels. Add clean blurred background borders so your subject remains completely in frame without zoom-in cutoffs.',
    features: [
      'Standard 1080 × 1920 px (9:16 aspect ratio) output',
      'Full-screen vertical story framing for smartphones',
      'Smart blurred canvas background mode keeps full image visible',
      'Works instantly in your browser with no app downloads'
    ],
    howToUse: [
      {
        step: 1,
        title: 'Upload Photo',
        description: 'Drop any horizontal or square image.'
      },
      {
        step: 2,
        title: 'Story Mode Activated',
        description: 'The canvas formats automatically to 1080x1920.'
      },
      {
        step: 3,
        title: 'Adjust Padding',
        description: 'Review the soft blurred background border.'
      },
      {
        step: 4,
        title: 'Download Story',
        description: 'Save your full-screen story image.'
      }
    ],
    usefulInfo: {
      heading: 'Overcoming the Automatic Story Crop Penalty',
      paragraphs: [
        'When you share a landscape or square photo to Instagram Stories, the app either leaves harsh black bars or forcibly zooms in, cutting off heads, feet, and surroundings.',
        'PixEnhance centers your photo and fills top and bottom margins with an elegant frosted blur of the image itself, creating a cohesive, magazine-quality presentation.'
      ]
    },
    faqs: [
      {
        question: 'Does this work for TikTok and YouTube Shorts as well?',
        answer: 'Yes! TikTok and YouTube Shorts use the identical 1080 × 1920 (9:16) specification.'
      }
    ],
    relatedLinks: [
      { title: 'Instagram Post Resizer', slug: 'instagram-post-resizer', description: 'Feed post resizer' },
      { title: 'WhatsApp Image Resizer', slug: 'whatsapp-image-resizer', description: 'WhatsApp DP resizer' },
      { title: 'Resize Image for Instagram', slug: 'resize-image-for-instagram', description: 'General Instagram resizer' }
    ],
    cta: {
      title: 'Need Square Feed Posts Too?',
      description: 'Format photos for 1:1 square Instagram feeds with pixel precision.',
      buttonText: 'Instagram Post Resizer',
      buttonHref: '/instagram-post-resizer'
    }
  },

  // 17. /youtube-banner-resizer
  {
    slug: 'youtube-banner-resizer',
    tool: 'image-resizer',
    title: 'YouTube Banner Resizer Online Free | PixEnhance',
    description: 'Resize images for YouTube banner and channel art online for free. Scale photos to 2560x1440 pixels with safe area guidelines for mobile and TV.',
    h1: 'YouTube Banner Resizer Online Free',
    category: 'Social Media',
    badge: '2560 × 1440 px Channel Art',
    intro: 'Resize artwork to YouTube\'s official channel banner standard: 2560 × 1440 pixels. Ensure your banner looks magnificent on smart TVs, desktop monitors, and mobile smartphones without cutoffs.',
    features: [
      'Official 2560 × 1440 px YouTube channel banner specification',
      'Accommodates central 1546 × 423 px mobile safe zone',
      'High-definition rendering with bicubic scaling',
      'Completely free with zero watermarks or registration'
    ],
    howToUse: [
      {
        step: 1,
        title: 'Upload Banner Art',
        description: 'Drop your channel artwork or background.'
      },
      {
        step: 2,
        title: 'Scale to 2560x1440',
        description: 'Set width to 2560 and height to 1440.'
      },
      {
        step: 3,
        title: 'Check Safe Area',
        description: 'Ensure text and logos sit in the central safe area.'
      },
      {
        step: 4,
        title: 'Download Banner',
        description: 'Save your YouTube channel header image.'
      }
    ],
    usefulInfo: {
      heading: 'Understanding YouTube Banner Dimensions & Safe Areas',
      paragraphs: [
        'YouTube displays channel banners across radically different devices: 2560 × 1440 on 4K TVs, 2560 × 423 on desktop browsers, and 1546 × 423 on smartphones.',
        'Resizing to 2560 × 1440 while keeping key branding elements in the center ensures your channel header looks professional everywhere.'
      ]
    },
    faqs: [
      {
        question: 'What is the maximum file size for a YouTube banner?',
        answer: 'YouTube permits channel banners up to 6MB. PixEnhance outputs clean high-DPI files well within this limit.'
      }
    ],
    relatedLinks: [
      { title: 'YouTube Thumbnail Resizer', slug: 'resize-image-for-youtube-thumbnail', description: 'Scale to 1280x720 thumbnails' },
      { title: 'Resize to 1920x1080', slug: 'resize-image-to-1920x1080', description: 'Full HD widescreen resizer' },
      { title: 'Facebook Image Resizer', slug: 'facebook-image-resizer', description: 'Facebook cover resizer' }
    ],
    cta: {
      title: 'Need Video Thumbnails Too?',
      description: 'Format photos directly to official 1280x720 YouTube thumbnail specifications.',
      buttonText: 'YouTube Thumbnail Resizer',
      buttonHref: '/resize-image-for-youtube-thumbnail'
    }
  },

  // 18. /facebook-image-resizer
  {
    slug: 'facebook-image-resizer',
    tool: 'image-resizer',
    title: 'Facebook Image Resizer Online Free | PixEnhance',
    description: 'Resize images for Facebook online for free. Optimize photos for Facebook feed posts (1200x630), cover photos (820x312), and profile pictures.',
    h1: 'Facebook Image Resizer Online Free',
    category: 'Social Media',
    badge: 'Facebook Optimized',
    intro: 'Scale pictures to Facebook\'s recommended specifications. Whether preparing a 1200 × 630 link preview post, an 820 × 312 page cover, or a high-res profile photo, PixEnhance ensures crisp display without Facebook\'s aggressive recompression.',
    features: [
      'Optimized for Facebook shared feed posts (1200 × 630 px)',
      'Page cover dimensions (820 × 312 px) and profile photos (180 × 180 px)',
      'Aspect ratio lock keeps photos balanced and proportional',
      'Fast client-side rendering with no data uploads'
    ],
    howToUse: [
      {
        step: 1,
        title: 'Upload Image',
        description: 'Drop your photo or banner graphic.'
      },
      {
        step: 2,
        title: 'Input Dimensions',
        description: 'Enter 1200x630 for post or 820x312 for cover.'
      },
      {
        step: 3,
        title: 'Preview',
        description: 'Verify the framing in the live preview.'
      },
      {
        step: 4,
        title: 'Download',
        description: 'Save your Facebook-ready image.'
      }
    ],
    usefulInfo: {
      heading: 'Recommended Facebook Photo Sizes for Crisp Feeds',
      paragraphs: [
        'Facebook strongly compresses uploaded images. Uploading images at exact dimensions (1200 × 630 for shared posts, 820 × 312 for desktop covers) prevents double-compression artifacts and maintains visual punch in news feeds.'
      ]
    },
    faqs: [
      {
        question: 'Should I upload JPG or PNG to Facebook?',
        answer: 'For graphics containing text or logos, PNG prevents compression fuzz. For photographs, high-quality JPG is recommended.'
      }
    ],
    relatedLinks: [
      { title: 'LinkedIn Image Resizer', slug: 'linkedin-image-resizer', description: 'LinkedIn banner and post resizer' },
      { title: 'Resize Image for Instagram', slug: 'resize-image-for-instagram', description: 'Instagram image resizer' },
      { title: 'WhatsApp Image Resizer', slug: 'whatsapp-image-resizer', description: 'WhatsApp DP resizer' }
    ],
    cta: {
      title: 'Need to Resize for LinkedIn Too?',
      description: 'Format photos for professional LinkedIn company banners and posts.',
      buttonText: 'LinkedIn Resizer',
      buttonHref: '/linkedin-image-resizer'
    }
  },

  // 19. /linkedin-image-resizer
  {
    slug: 'linkedin-image-resizer',
    tool: 'image-resizer',
    title: 'LinkedIn Image Resizer Online Free | PixEnhance',
    description: 'Resize images for LinkedIn online for free. Scale photos for LinkedIn feed posts (1200x627), company cover banners (1128x191), and professional avatars.',
    h1: 'LinkedIn Image Resizer Online Free',
    category: 'Social Media',
    badge: 'Professional Standards',
    intro: 'Prepare professional photos and graphics for LinkedIn. Format shared posts (1200 × 627 px), personal background banners (1584 × 396 px), and company banners (1128 × 191 px) for a polished executive presence.',
    features: [
      'LinkedIn feed post standard (1200 × 627 px)',
      'Personal profile banners (1584 × 396 px) and company covers (1128 × 191 px)',
      'Maintains sharp typography and corporate logos',
      'Private in-browser processing with no signups'
    ],
    howToUse: [
      {
        step: 1,
        title: 'Upload Image',
        description: 'Drop your corporate photo, banner, or post asset.'
      },
      {
        step: 2,
        title: 'Enter Target Size',
        description: 'Enter 1200x627 for post or 1584x396 for personal banner.'
      },
      {
        step: 3,
        title: 'Check Proportions',
        description: 'Ensure profile picture space doesn\'t cover key text.'
      },
      {
        step: 4,
        title: 'Download Image',
        description: 'Save your polished LinkedIn asset.'
      }
    ],
    usefulInfo: {
      heading: 'Optimizing Visual Presence on LinkedIn',
      paragraphs: [
        'LinkedIn shared feed posts display best at 1200 × 627 pixels (1.91:1 ratio). Personal profile backgrounds measure 1584 × 396 pixels. Keeping your headshot and typography within standard safe zones ensures maximum legibility across desktop and mobile LinkedIn apps.'
      ]
    },
    faqs: [
      {
        question: 'What is the best format for LinkedIn profile pictures?',
        answer: 'A square 400 × 400 px or 1080 × 1080 px image in JPG or PNG format produces the sharpest circular avatar on LinkedIn.'
      }
    ],
    relatedLinks: [
      { title: 'Facebook Image Resizer', slug: 'facebook-image-resizer', description: 'Facebook post & cover resizer' },
      { title: 'Resize Image to 1080x1080', slug: 'resize-image-to-1080x1080', description: 'Square avatar resizer' },
      { title: 'Compress JPG', slug: 'compress-jpg', description: 'Compress photo file size' }
    ],
    cta: {
      title: 'Need a Square Avatar for Your Profile?',
      description: 'Format your professional headshot into a clean 1080x1080 square canvas.',
      buttonText: 'Resize to 1080x1080',
      buttonHref: '/resize-image-to-1080x1080'
    }
  },

  // 20. /whatsapp-image-resizer
  {
    slug: 'whatsapp-image-resizer',
    tool: 'social-resizer',
    toolConfig: { platform: 'whatsapp' },
    title: 'WhatsApp Image & DP Resizer Online Free | PixEnhance',
    description: 'Resize photos for WhatsApp DP and Status online for free. Fit full-size rectangular photos into square WhatsApp profile pictures without unwanted cropping.',
    h1: 'WhatsApp Image Resizer Online Free',
    category: 'Social Media',
    badge: 'Full DP No Crop',
    intro: 'Fit full-length portraits and landscape memories into WhatsApp DP without cropping out friends or backgrounds. PixEnhance adds smooth blurred or colored borders to create a perfect square avatar.',
    features: [
      'Fit full photo into square WhatsApp DP without cropping',
      'Smart blurred matching background border mode',
      'Solid white or black border options for minimalist aesthetic',
      'Instant download directly to your mobile phone or PC'
    ],
    howToUse: [
      {
        step: 1,
        title: 'Upload Photo',
        description: 'Drop any horizontal or vertical picture.'
      },
      {
        step: 2,
        title: 'Full DP Fitted',
        description: 'The image is fitted into a 1:1 square frame.'
      },
      {
        step: 3,
        title: 'Select Background Fill',
        description: 'Choose matching blur, white, or black borders.'
      },
      {
        step: 4,
        title: 'Download & Set as DP',
        description: 'Save and upload directly as your WhatsApp profile photo.'
      }
    ],
    usefulInfo: {
      heading: 'How to Set Full WhatsApp DP Without Cropping',
      paragraphs: [
        'WhatsApp natively requires square (1:1) profile pictures. When you upload a rectangular picture, WhatsApp forces you to crop either the top/bottom or the sides.',
        'PixEnhance places your complete picture in the center of a 1080 × 1080 canvas and extends the borders with a harmonized frosted glass blur of the photo itself. You get to show the full image with zero loss.'
      ]
    },
    faqs: [
      {
        question: 'Will this fit my entire group photo as WhatsApp DP?',
        answer: 'Yes! Wide group photos fit completely across the horizontal axis with gentle blurred filler on top and bottom.'
      }
    ],
    relatedLinks: [
      { title: 'Instagram Post Resizer', slug: 'instagram-post-resizer', description: 'Instagram post resizer' },
      { title: 'Resize to 1080x1080', slug: 'resize-image-to-1080x1080', description: 'Square avatar resizer' },
      { title: 'Compress JPG to 50KB', slug: 'compress-jpg-to-50kb', description: 'Compress photo under 50KB' }
    ],
    cta: {
      title: 'Need High Quality Square Headshots?',
      description: 'Format photos to crisp 1080x1080 square canvas for Instagram, WhatsApp, and profiles.',
      buttonText: 'Resize to 1080x1080',
      buttonHref: '/resize-image-to-1080x1080'
    }
  },

  // 21. /visa-photo-resizer
  {
    slug: 'visa-photo-resizer',
    tool: 'passport-resizer',
    title: 'Visa Photo Resizer Online Free (300 DPI) | PixEnhance',
    description: 'Resize and format photos for visa applications online for free. Presets for US Visa (2x2 in / 600x600 px), Schengen Visa (35x45 mm), and international standards.',
    h1: 'Visa Photo Resizer Online Free (Official Standards)',
    category: 'Print / Document',
    badge: 'Consular Standards',
    intro: 'Format your photos to strict consular visa specifications. PixEnhance provides biometric framing presets for US Visas, Schengen European Visas, UK, Canada, and Asian visas at crisp 300 DPI print quality.',
    features: [
      'US Visa preset: 2 × 2 inches (600 × 600 px @ 300 DPI)',
      'Schengen Visa, UK & EU preset: 35 × 45 mm (413 × 531 px @ 300 DPI)',
      'Biometric face alignment and chin-to-crown centering guidelines',
      'Download single digital submission file or multi-photo print grid'
    ],
    howToUse: [
      {
        step: 1,
        title: 'Upload Portrait',
        description: 'Drop a clear front-facing portrait photo.'
      },
      {
        step: 2,
        title: 'Select Visa Country',
        description: 'Choose US Visa (2x2 in), Schengen (35x45mm), or Asian Visa.'
      },
      {
        step: 3,
        title: 'Align Face',
        description: 'Position your head within the biometric guide.'
      },
      {
        step: 4,
        title: 'Download Visa Photo',
        description: 'Save your digital file or 4x6 inch printable photo sheet.'
      }
    ],
    usefulInfo: {
      heading: 'Official Visa Photo Specifications by Country',
      paragraphs: [
        'Consular authorities reject thousands of visa applications due to non-compliant photo dimensions, incorrect head ratios, or low resolution.',
        'US Visa (Department of State): 2 × 2 inches (51 × 51 mm), square ratio, head between 1 and 1 3/8 inches from chin to top of hair.',
        'Schengen Visa (European Union): 35 × 45 mm, head occupies 70–80% of photo height (32–36 mm).'
      ],
      table: {
        headers: ['Country / Region', 'Dimensions (mm / in)', 'Digital Pixels @ 300 DPI'],
        rows: [
          ['United States & India Visa', '2 × 2 in (51 × 51 mm)', '600 × 600 px'],
          ['Schengen Area (EU), UK', '35 × 45 mm', '413 × 531 px'],
          ['Canada Visa', '50 × 70 mm', '590 × 826 px'],
          ['China & Asian Visas', '33 × 48 mm', '390 × 567 px']
        ]
      }
    },
    faqs: [
      {
        question: 'Can I print this visa photo on standard photo paper?',
        answer: 'Yes! PixEnhance allows you to export a standard 4 × 6 inch photo sheet with multiple aligned copies ready for pharmacy or local photo printing.'
      },
      {
        question: 'Are digital uploads accepted for US DS-160 online forms?',
        answer: 'Yes! The US preset exports a square 600 × 600 px JPEG strictly meeting the DS-160 upload criteria.'
      }
    ],
    relatedLinks: [
      { title: 'Passport Photo Resizer', slug: 'passport-photo-resizer', description: 'Biometric passport photo resizer' },
      { title: 'A4 Image Resizer', slug: 'a4-image-resizer', description: 'Scale document to standard A4' },
      { title: 'Compress JPG to 50KB', slug: 'compress-jpg-to-50kb', description: 'Compress photo under 50KB' },
      { title: 'Resize Image', slug: 'resize-image', description: 'General image resizer' }
    ],
    cta: {
      title: 'Need to Print on Standard Paper?',
      description: 'Prepare photos and documents for crisp A4 paper printing at 300 DPI.',
      buttonText: 'A4 Image Resizer',
      buttonHref: '/a4-image-resizer'
    }
  }
,

  // 21. /ssc-photo-resizer
  {
    slug: 'ssc-photo-resizer',
    tool: 'image-compressor',
    toolConfig: { initialTargetSize: '50kb' },
    title: 'SSC Photo and Signature Resizer Online Free (20KB - 50KB) | PixEnhance',
    description: 'Resize and compress photo (20KB - 50KB) and signature (10KB - 20KB) for SSC CGL, CHSL, MTS, GD, and CPO online applications without blur or rejection.',
    h1: 'SSC Photo & Signature Resizer Online Free',
    category: 'Govt Exam Tools',
    badge: 'SSC CGL / CHSL / MTS',
    intro: 'Prepare your photograph and signature strictly according to Staff Selection Commission (SSC) official guidelines. Scale images to 3.5cm × 4.5cm and clamp file size between 20KB and 50KB with zero pixelation.',
    features: [
      'Compress photo strictly between 20 KB and 50 KB',
      'Compress signature strictly between 10 KB and 20 KB',
      'Exact 3.5 cm × 4.5 cm (138 × 177 px) aspect ratio alignment',
      'Runs locally in browser: total data privacy for personal photos'
    ],
    howToUse: [
      { step: 1, title: 'Upload Photo or Signature', description: 'Drag and drop your camera photo or scanned signature.' },
      { step: 2, title: 'Set Target File Size', description: 'Select 50KB for photo or 20KB for signature.' },
      { step: 3, title: 'Check Live Preview', description: 'Verify facial clarity and contrast before saving.' },
      { step: 4, title: 'Instant Download', description: 'Download the optimized JPG ready for the SSC portal.' }
    ],
    usefulInfo: {
      heading: 'Official SSC Portal Photo & Signature Guidelines',
      paragraphs: [
        'The Staff Selection Commission strictly mandates that candidate photographs must be between 20KB and 50KB, while scanned signatures must be between 10KB and 20KB.',
        'Photos with caps, spectacles, masks, or uneven background shadows are automatically rejected by SSC pre-screening software.',
        'Use pure black or dark blue ink on white paper for signature scans to ensure high optical contrast.'
      ],
      table: {
        headers: ['Document Type', 'Allowed Size', 'Dimensions (cm / px)', 'Allowed Formats'],
        rows: [
          ['Passport Photo', '20 KB – 50 KB', '3.5 cm × 4.5 cm (138 × 177 px)', 'JPG / JPEG only'],
          ['Candidate Signature', '10 KB – 20 KB', '4.0 cm × 2.0 cm (140 × 60 px)', 'JPG / JPEG only'],
          ['Background Color', 'Plain White / Light', 'Shadowless uniform lighting', 'No patterns']
        ]
      }
    },
    faqs: [
      { question: 'What is the exact photo size for SSC CGL and CHSL?', answer: 'The photo must be between 20KB and 50KB with dimensions of 3.5 cm width by 4.5 cm height in JPG/JPEG format.' },
      { question: 'Why does the SSC portal reject my signature?', answer: 'Signatures are rejected if the file size is under 10KB or over 20KB, or if the background has grey shadow patches. PixEnhance enhances contrast to prevent this.' },
      { question: 'Is my personal photo stored on your server?', answer: 'No. All processing happens entirely inside your web browser via HTML5 Canvas. Your photo is never uploaded to any cloud server.' }
    ],
    relatedLinks: [
      { title: 'Compress JPG to 20KB', slug: 'compress-jpg-to-20kb', description: 'Target strictly under 20KB' },
      { title: 'Compress JPG to 50KB', slug: 'compress-jpg-to-50kb', description: 'Target strictly under 50KB' },
      { title: 'Visa & Passport Resizer', slug: 'visa-photo-resizer', description: 'Official biometric presets' }
    ],
    cta: {
      title: 'Need to Compress Signature to 10KB?',
      description: 'Use our dedicated signature compressor for exact 10KB to 20KB files.',
      buttonText: 'Compress to 20KB',
      buttonHref: '/compress-jpg-to-20kb'
    }
  },

  // 22. /rrb-photo-resizer
  {
    slug: 'rrb-photo-resizer',
    tool: 'image-compressor',
    toolConfig: { initialTargetSize: '50kb' },
    title: 'Railway RRB Photo & Signature Resizer (ALP, NTPC, Group D) | PixEnhance',
    description: 'Resize and compress photo (20KB - 50KB) and signature (10KB - 20KB) for Railway Recruitment Board (RRB ALP, NTPC, Group D, Technician) online forms.',
    h1: 'Railway RRB Photo & Signature Resizer Online',
    category: 'Govt Exam Tools',
    badge: 'RRB ALP / NTPC / Group D',
    intro: 'Official Railway Recruitment Board (RRB) photo and signature resizer. Ensure your application photos meet strict Railway specifications: 35mm × 45mm, clear white background, and file size between 20KB and 50KB.',
    features: [
      'Optimized for RRB ALP, NTPC, Group D & RPF portals',
      'Guaranteed file size between 20KB and 50KB',
      'Supports JPG and JPEG formats required by Indian Railways',
      'Zero server upload: safe for aadhaar and identity photos'
    ],
    howToUse: [
      { step: 1, title: 'Upload Your Photo', description: 'Select your recent color passport photo with clear background.' },
      { step: 2, title: 'Select RRB Mode', description: 'Pick 50KB for photo or 20KB for signature.' },
      { step: 3, title: 'Review Quality', description: 'Check that eyes, ears, and shoulders are clearly visible.' },
      { step: 4, title: 'Download Instantly', description: 'Get the compliant file ready for the Railway portal.' }
    ],
    usefulInfo: {
      heading: 'Indian Railways (RRB) Photo Sizing Rules',
      paragraphs: [
        'RRB application forms strictly require color passport photos taken against a plain white background.',
        'Do not wear sunglasses, tinted glasses, or caps. Spectacles should not reflect flash glare.',
        'Signatures must be in running handwriting; block capital letters are rejected by RRB scrutinizers.'
      ],
      table: {
        headers: ['RRB Requirement', 'Specifications', 'File Size Limit', 'Format'],
        rows: [
          ['Color Photograph', '35 mm × 45 mm (320 × 240 px)', '20 KB – 50 KB', 'JPG / JPEG'],
          ['Candidate Signature', 'Running hand on white paper', '10 KB – 20 KB', 'JPG / JPEG'],
          ['SC/ST Certificate (if applicable)', 'PDF / JPG document', '50 KB – 500 KB', 'PDF / JPG']
        ]
      }
    },
    faqs: [
      { question: 'What is the required photo background for RRB NTPC?', answer: 'Indian Railways requires a plain, uniform white background. Dark, patterned, or selfie backgrounds are rejected.' },
      { question: 'Can I upload a signature written in capital letters?', answer: 'No. RRB explicitly specifies that signatures must be in normal running handwriting, never all capitals.' }
    ],
    relatedLinks: [
      { title: 'SSC Photo Resizer', slug: 'ssc-photo-resizer', description: 'SSC exam photo guidelines' },
      { title: 'Compress JPG to 50KB', slug: 'compress-jpg-to-50kb', description: 'Compress photo to 50KB' },
      { title: 'Image to PDF', slug: 'image-to-pdf', description: 'Convert certificates to PDF' }
    ],
    cta: {
      title: 'Need to Merge Certificates into PDF?',
      description: 'Combine category and educational certificates into a single lightweight PDF.',
      buttonText: 'Image to PDF',
      buttonHref: '/image-to-pdf'
    }
  },

  // 23. /upsc-photo-resizer
  {
    slug: 'upsc-photo-resizer',
    tool: 'image-compressor',
    toolConfig: { initialTargetSize: '100kb' },
    title: 'UPSC Photo & Signature Resizer Online (Civil Services, NDA, CDS) | PixEnhance',
    description: 'Format photos and signatures for UPSC online application portal (OTR, Civil Services IAS/IPS, NDA, CDS). Meets official 20KB - 300KB and 350x350 pixel rules.',
    h1: 'UPSC Photo & Signature Resizer Online',
    category: 'Govt Exam Tools',
    badge: 'UPSC IAS / NDA / CDS',
    intro: 'Prepare your photograph and signature for Union Public Service Commission (UPSC) One Time Registration (OTR) and exam applications. Meets the exact pixel range (min 350×350 px, max 1000×1000 px) and 20KB to 300KB size limit.',
    features: [
      'Pre-configured for UPSC OTR and Civil Services forms',
      'Pixel dimensions strictly within 350×350 to 1000×1000 pixels',
      'File size guaranteed between 20 KB and 300 KB',
      'Maintains sharp contrast for optical signature verification'
    ],
    howToUse: [
      { step: 1, title: 'Upload Image', description: 'Choose your passport photograph or scanned signature.' },
      { step: 2, title: 'Choose Target Size', description: 'Select 100KB for the optimal balance of quality and size.' },
      { step: 3, title: 'Adjust Dimensions', description: 'Ensure width and height are at least 350 × 350 pixels.' },
      { step: 4, title: 'Download File', description: 'Save your file and upload directly to upsconline.nic.in.' }
    ],
    usefulInfo: {
      heading: 'Official UPSC Online Application Specifications',
      paragraphs: [
        'UPSC allows a relatively generous size limit (20KB to 300KB) but enforces strict pixel boundary checks: images smaller than 350 × 350 pixels or larger than 1000 × 1000 pixels fail automated validation.',
        'The candidate photo must display their name and date of photo capture if explicitly specified in the examination notification.'
      ],
      table: {
        headers: ['Item', 'Min Resolution', 'Max Resolution', 'File Size Limit'],
        rows: [
          ['UPSC Photograph', '350 × 350 pixels', '1000 × 1000 pixels', '20 KB – 300 KB'],
          ['UPSC Signature', '350 × 350 pixels', '1000 × 1000 pixels', '20 KB – 300 KB'],
          ['Photo ID Card (Aadhaar/PAN)', 'Clear PDF format', 'Single Page', '20 KB – 300 KB']
        ]
      }
    },
    faqs: [
      { question: 'What is the minimum resolution for UPSC photo upload?', answer: 'UPSC requires at least 350 × 350 pixels and a maximum of 1000 × 1000 pixels in JPG format.' },
      { question: 'Can I upload photo ID as PDF for UPSC?', answer: 'Yes, UPSC requires photo identity cards (Aadhaar, Passport, PAN) to be uploaded as a PDF between 20KB and 300KB.' }
    ],
    relatedLinks: [
      { title: 'SSC Photo Resizer', slug: 'ssc-photo-resizer', description: 'SSC photo specifications' },
      { title: 'Compress PDF', slug: 'compress-pdf', description: 'Compress ID card PDF below 300KB' },
      { title: 'Image to PDF', slug: 'image-to-pdf', description: 'Convert Aadhaar scan to PDF' }
    ],
    cta: {
      title: 'Need to Compress ID Card PDF for UPSC?',
      description: 'Shrink your scanned Aadhaar or Voter ID PDF safely under 300KB.',
      buttonText: 'Compress PDF',
      buttonHref: '/compress-pdf'
    }
  },

  // 24. /pan-card-photo-resizer
  {
    slug: 'pan-card-photo-resizer',
    tool: 'image-compressor',
    toolConfig: { initialTargetSize: '50kb' },
    title: 'PAN Card Photo & Signature Resizer 200 DPI (NSDL & UTIITSL) | PixEnhance',
    description: 'Resize photo (3.5x2.5cm, under 50KB, 200 DPI) and signature (2x4.5cm, under 30KB, 200 DPI) for NSDL Protean and UTIITSL online PAN applications.',
    h1: 'PAN Card Photo & Signature Resizer (200 DPI)',
    category: 'Govt Exam Tools',
    badge: 'NSDL & UTIITSL Official',
    intro: 'Applying for a new PAN Card or updating details online? Format your photograph and signature strictly according to NSDL Protean and UTIITSL requirements: exact 200 DPI resolution, correct centimeter dimensions, and sub-50KB file size.',
    features: [
      'Embeds official 200 DPI metadata required by NSDL validation scripts',
      'Photo sized to exact 3.5 cm × 2.5 cm (under 50KB)',
      'Signature sized to exact 2.0 cm × 4.5 cm (under 30KB)',
      '100% private in-browser conversion: zero identity data leaks'
    ],
    howToUse: [
      { step: 1, title: 'Upload Photo or Signature', description: 'Upload your color headshot or black ink signature.' },
      { step: 2, title: 'Apply 200 DPI Preset', description: 'The tool automatically formats pixel density to 200 DPI.' },
      { step: 3, title: 'Check File Size Limit', description: 'Ensure photo is under 50KB and signature is under 30KB.' },
      { step: 4, title: 'Download Ready File', description: 'Save and upload directly to the NSDL or UTIITSL portal.' }
    ],
    usefulInfo: {
      heading: 'NSDL & UTIITSL Online PAN Upload Specifications',
      paragraphs: [
        'Thousands of PAN card applications are delayed due to "DPI Mismatch" or "Invalid Image Dimension" errors on the NSDL portal.',
        'NSDL requires photos to be exactly 3.5 cm × 2.5 cm at 200 DPI, with file size under 50KB in JPEG format.',
        'Signatures must be 2.0 cm × 4.5 cm at 200 DPI, under 30KB, and signed with pure black ink.'
      ],
      table: {
        headers: ['Document', 'Dimensions', 'DPI Requirement', 'Max File Size'],
        rows: [
          ['Passport Photograph', '3.5 cm × 2.5 cm (213 × 213 px)', '200 DPI', '50 KB'],
          ['Signature Scan', '2.0 cm × 4.5 cm (400 × 200 px)', '200 DPI', '30 KB'],
          ['Supporting Proofs (Aadhaar)', 'Full A4 document', '200 DPI', '300 KB (PDF)']
        ]
      }
    },
    faqs: [
      { question: 'Why does NSDL say "DPI should be 200"?', answer: 'NSDL automated image processors reject files that do not contain the 200 DPI density tag in the EXIF header. PixEnhance embeds this exact tag automatically.' },
      { question: 'What ink color is allowed for PAN Card signature?', answer: 'Only pure black ink on clean white paper is accepted by NSDL and UTIITSL. Do not use blue or red pens.' }
    ],
    relatedLinks: [
      { title: 'Compress JPG to 50KB', slug: 'compress-jpg-to-50kb', description: 'Target under 50KB' },
      { title: 'Visa & Passport Resizer', slug: 'visa-photo-resizer', description: 'Passport biometric sizing' },
      { title: 'Image to PDF', slug: 'image-to-pdf', description: 'Convert Aadhaar to PDF' }
    ],
    cta: {
      title: 'Need to Convert Aadhaar to PDF for PAN?',
      description: 'Combine front and back Aadhaar photos into a single PDF under 300KB.',
      buttonText: 'Image to PDF',
      buttonHref: '/image-to-pdf'
    }
  },

  // 25. /signature-resizer-10kb
  {
    slug: 'signature-resizer-10kb',
    tool: 'image-compressor',
    toolConfig: { initialTargetSize: '20kb' },
    title: 'Resize Signature to 10KB - 20KB Online Free | PixEnhance',
    description: 'Compress and resize scanned signature images to strictly between 10KB and 20KB for SSC, UPSC, Bank PO, and state recruitment exam application portals.',
    h1: 'Resize Signature to 10KB - 20KB Online Free',
    category: 'Govt Exam Tools',
    badge: '10KB - 20KB Range',
    intro: 'Nearly every online job portal and university admission system requires candidate signatures to fall strictly within the 10KB to 20KB range. Easily crop, boost ink contrast, and hit the exact target file size without making text blurry.',
    features: [
      'Guarantees signature file size between 10KB and 20KB',
      'Enhances ink contrast and removes dark desk shadows',
      'Supports horizontal aspect ratios (140×60 px / 4:2 ratio)',
      '100% private: signature processed locally on your device'
    ],
    howToUse: [
      { step: 1, title: 'Upload Scanned Signature', description: 'Snap a photo of your paper signature and upload it.' },
      { step: 2, title: 'Crop Margins', description: 'Crop closely around the signature strokes to remove empty space.' },
      { step: 3, title: 'Set Target to 15KB', description: 'Our slider locks the file safely between 10KB and 20KB.' },
      { step: 4, title: 'Download File', description: 'Get a clean, high-contrast signature ready for submission.' }
    ],
    usefulInfo: {
      heading: 'How to Prevent Online Signature Rejections',
      paragraphs: [
        'Portals reject signatures primarily for two reasons: file size under 10KB (portal flags as too low quality) or file size over 20KB (portal rejects as too large).',
        'By cropping tightly around the handwritten strokes and setting the target size to 14KB-18KB, you sit safely inside the allowed acceptance window.'
      ],
      table: {
        headers: ['Exam Body', 'Signature Size Limit', 'Accepted Dimensions', 'Ink Color'],
        rows: [
          ['SSC (CGL, CHSL, MTS)', '10 KB – 20 KB', '4.0 × 2.0 cm (140 × 60 px)', 'Black or Dark Blue'],
          ['IBPS (PO, Clerk)', '10 KB – 20 KB', '140 × 60 pixels', 'Black ink preferred'],
          ['State Police & PSC', '10 KB – 20 KB', '150 × 100 pixels', 'Dark ink on white']
        ]
      }
    },
    faqs: [
      { question: 'Why does the portal say file size is too small?', answer: 'Government portals reject files under 10KB because they assume low resolution. PixEnhance lets you set target size to 15KB so it never falls below 10KB.' },
      { question: 'Can I use a smartphone camera photo of my signature?', answer: 'Yes! Crop closely around the ink strokes and use our contrast optimizer to turn grey paper into clean white.' }
    ],
    relatedLinks: [
      { title: 'SSC Photo Resizer', slug: 'ssc-photo-resizer', description: 'SSC photo and signature' },
      { title: 'Compress JPG to 20KB', slug: 'compress-jpg-to-20kb', description: 'Target 20KB limit' },
      { title: 'Resize Image', slug: 'resize-image', description: 'Custom dimension scaling' }
    ],
    cta: {
      title: 'Need to Resize Your Passport Photo as Well?',
      description: 'Format your matching passport photo to 20KB - 50KB in one click.',
      buttonText: 'SSC Photo Resizer',
      buttonHref: '/ssc-photo-resizer'
    }
  },

  // 26. /ctet-photo-resizer
  {
    slug: 'ctet-photo-resizer',
    tool: 'image-compressor',
    toolConfig: { initialTargetSize: '50kb' },
    title: 'CTET Photo & Signature Resizer Online (CBSE Guidelines) | PixEnhance',
    description: 'Format photo (10KB - 100KB, 3.5x4.5cm) and signature (3KB - 30KB, 3.5x1.5cm) for Central Teacher Eligibility Test (CTET) online registration.',
    h1: 'CTET Photo & Signature Resizer Online Free',
    category: 'Govt Exam Tools',
    badge: 'CBSE CTET Official',
    intro: 'Prepare your candidate photograph and signature for CBSE Central Teacher Eligibility Test (CTET) online application. Guarantees photo file size between 10KB and 100KB and signature between 3KB and 30KB.',
    features: [
      'Meets exact CBSE CTET portal validation standards',
      'Photo sized strictly between 10KB and 100KB (3.5 × 4.5 cm)',
      'Signature sized strictly between 3KB and 30KB (3.5 × 1.5 cm)',
      'Fast client-side processing with zero cloud uploads'
    ],
    howToUse: [
      { step: 1, title: 'Upload Photo', description: 'Upload recent color passport headshot.' },
      { step: 2, title: 'Choose CTET Preset', description: 'Select 50KB for photo or 20KB for signature.' },
      { step: 3, title: 'Verify Preview', description: 'Check facial clarity and clean white background.' },
      { step: 4, title: 'Download File', description: 'Download your compliant JPG for ctet.nic.in.' }
    ],
    usefulInfo: {
      heading: 'CBSE CTET Photo & Signature Specifications',
      paragraphs: [
        'CBSE requires candidate photographs to have dimensions of 3.5 cm (width) × 4.5 cm (height) and file size between 10KB and 100KB.',
        'The signature must be 3.5 cm (length) × 1.5 cm (height) and file size between 3KB and 30KB in JPG/JPEG format.'
      ],
      table: {
        headers: ['Item', 'Physical Dimensions', 'File Size Limit', 'Format'],
        rows: [
          ['Candidate Photo', '3.5 cm × 4.5 cm', '10 KB – 100 KB', 'JPG / JPEG only'],
          ['Candidate Signature', '3.5 cm × 1.5 cm', '3 KB – 30 KB', 'JPG / JPEG only']
        ]
      }
    },
    faqs: [
      { question: 'What is the allowed photo size for CTET?', answer: 'The photo must be between 10KB and 100KB in JPG format with 3.5cm width and 4.5cm height.' }
    ],
    relatedLinks: [
      { title: 'Compress JPG to 50KB', slug: 'compress-jpg-to-50kb', description: 'Compress to 50KB' },
      { title: 'SSC Photo Resizer', slug: 'ssc-photo-resizer', description: 'SSC photo sizing' },
      { title: 'Visa & Passport Resizer', slug: 'visa-photo-resizer', description: 'Passport standards' }
    ],
    cta: {
      title: 'Need to Compress Below 50KB?',
      description: 'Use our instant 50KB compressor for ultra-fast uploads.',
      buttonText: 'Compress to 50KB',
      buttonHref: '/compress-jpg-to-50kb'
    }
  },

  // 27. /neet-postcard-photo-resizer
  {
    slug: 'neet-postcard-photo-resizer',
    tool: 'image-resizer',
    title: 'NEET Postcard Size 4x6 Photo Resizer Online (NTA Guidelines) | PixEnhance',
    description: 'Resize passport photo (10KB - 200KB) and Postcard Size 4x6 inch (4R) photo (50KB - 200KB) for NTA NEET UG medical entrance registration.',
    h1: 'NEET Postcard Size (4x6 Inch) Photo Resizer',
    category: 'Govt Exam Tools',
    badge: 'NTA NEET UG Official',
    intro: 'National Testing Agency (NTA) mandates both a standard passport photo and a large Postcard Size (4 × 6 inch / 4R) photograph for NEET UG online applications. Format both effortlessly to 100% compliant specifications.',
    features: [
      'Formats exact 4 × 6 inch (1200 × 1800 px) Postcard photo',
      'Keeps file size strictly between 50KB and 200KB for postcard photo',
      'Passport size mode: 10KB to 200KB with 80% face coverage',
      'White background preservation and crisp printed clarity'
    ],
    howToUse: [
      { step: 1, title: 'Upload Headshot', description: 'Select your studio passport or studio portrait photo.' },
      { step: 2, title: 'Choose NEET Postcard 4x6', description: 'The tool scales the canvas to exact 4x6 aspect ratio.' },
      { step: 3, title: 'Set Target File Size', description: 'Slider maintains the file between 50KB and 200KB.' },
      { step: 4, title: 'Download Ready Photo', description: 'Save and upload directly to neet.nta.nic.in.' }
    ],
    usefulInfo: {
      heading: 'NTA NEET UG Official Photo Specifications',
      paragraphs: [
        'NEET candidates must upload two different photos: a passport-size photo (10KB - 200KB) and a postcard-size (4" × 6") photo (50KB - 200KB).',
        'Photos must be taken on or after the date specified in the NEET information bulletin, with 80% face coverage (ears clearly visible) on white background.'
      ],
      table: {
        headers: ['NEET Upload Type', 'Dimensions', 'File Size Range', 'Key Rule'],
        rows: [
          ['Passport Photo', '3.5 cm × 4.5 cm', '10 KB – 200 KB', '80% face visible, white background'],
          ['Postcard Photo (4R)', '4 × 6 inches (10 × 15 cm)', '50 KB – 200 KB', 'Same photo as passport shot'],
          ['Signature Scan', 'Running hand', '4 KB – 30 KB', 'Black pen on white paper'],
          ['Left & Right Hand Thumb/Fingers', 'Ten fingers impression', '10 KB – 200 KB', 'Blue ink on white paper']
        ]
      }
    },
    faqs: [
      { question: 'What is the postcard size for NEET in pixels?', answer: 'At standard 300 DPI print density, 4 × 6 inches is 1200 × 1800 pixels. File size must be between 50KB and 200KB.' },
      { question: 'Should the candidate name and date be printed on NEET photo?', answer: 'Yes, NTA recommends that candidate name and the date of taking the photograph be clearly printed at the bottom of the photo.' }
    ],
    relatedLinks: [
      { title: 'Visa & Passport Resizer', slug: 'visa-photo-resizer', description: 'Biometric photo sizing' },
      { title: 'Compress JPG to 100KB', slug: 'compress-jpg-to-100kb', description: 'Target 100KB size' },
      { title: 'A4 Image Resizer', slug: 'a4-image-resizer', description: 'Print-ready sizing' }
    ],
    cta: {
      title: 'Need to Compress Below 200KB?',
      description: 'Optimize any large camera photo under 200KB in fractions of a second.',
      buttonText: 'Compress to 200KB',
      buttonHref: '/compress-jpg-to-200kb'
    }
  },

  // 28. /jee-main-photo-resizer
  {
    slug: 'jee-main-photo-resizer',
    tool: 'image-compressor',
    toolConfig: { initialTargetSize: '100kb' },
    title: 'JEE Main Photo & Signature Resizer Online (NTA Criteria) | PixEnhance',
    description: 'Format passport photo (10KB - 200KB) and signature (4KB - 30KB) for NTA JEE Main and JEE Advanced online registration portals.',
    h1: 'JEE Main Photo & Signature Resizer Online',
    category: 'Govt Exam Tools',
    badge: 'NTA JEE Main Official',
    intro: 'Prepare your color photograph and signature for NTA Joint Entrance Examination (JEE Main & Advanced). Guarantees photo size between 10KB and 200KB and signature between 4KB and 30KB with zero blur.',
    features: [
      'Tailored to NTA JEE Main online portal requirements',
      'Photo kept strictly between 10KB and 200KB in JPG format',
      'Signature kept strictly between 4KB and 30KB in JPG format',
      'Preserves facial details, eyes, and ears for biometric entrance hall verification'
    ],
    howToUse: [
      { step: 1, title: 'Upload Photo', description: 'Upload recent passport portrait.' },
      { step: 2, title: 'Select JEE Mode', description: 'Pick 100KB for photo or 20KB for signature.' },
      { step: 3, title: 'Check Quality', description: 'Ensure face covers 80% of canvas with white background.' },
      { step: 4, title: 'Save File', description: 'Upload directly to jeemain.nta.nic.in.' }
    ],
    usefulInfo: {
      heading: 'NTA JEE Main Photo Guidelines',
      paragraphs: [
        'JEE Main requires recent color or black & white photo with 80% face visible against a white background.',
        'Spectacles are allowed only if being used regularly, without tinted or polaroid glasses.'
      ],
      table: {
        headers: ['Document', 'Dimensions', 'File Size Limit', 'Format'],
        rows: [
          ['Passport Photo', '3.5 × 4.5 cm', '10 KB – 200 KB', 'JPG / JPEG'],
          ['Signature', 'Running hand', '4 KB – 30 KB', 'JPG / JPEG'],
          ['Category / PwD Certificate', 'Scanned document', '50 KB – 300 KB', 'PDF']
        ]
      }
    },
    faqs: [
      { question: 'What is the signature file size limit for JEE Main?', answer: 'The signature must be between 4KB and 30KB in JPG/JPEG format.' }
    ],
    relatedLinks: [
      { title: 'NEET Postcard Resizer', slug: 'neet-postcard-photo-resizer', description: 'NEET 4x6 photo specs' },
      { title: 'Compress JPG to 100KB', slug: 'compress-jpg-to-100kb', description: 'Target 100KB size' },
      { title: 'Image to PDF', slug: 'image-to-pdf', description: 'Category certificate PDF' }
    ],
    cta: {
      title: 'Need to Convert Category Certificate to PDF?',
      description: 'Convert caste or income certificates to PDF under 300KB.',
      buttonText: 'Image to PDF',
      buttonHref: '/image-to-pdf'
    }
  },

  // 29. /ibps-photo-resizer
  {
    slug: 'ibps-photo-resizer',
    tool: 'image-compressor',
    toolConfig: { initialTargetSize: '50kb' },
    title: 'IBPS Photo & Signature Resizer (PO, Clerk, SO, RRB) | PixEnhance',
    description: 'Format photo (200x230px, 20-50KB), signature (140x60px, 10-20KB), and left thumb impression (20-50KB) for IBPS and SBI banking exam portals.',
    h1: 'IBPS Bank Photo, Signature & Thumb Resizer',
    category: 'Govt Exam Tools',
    badge: 'IBPS / SBI Banking',
    intro: 'Bank recruitment exams (IBPS PO, Clerk, SO, RRB and SBI) enforce strict upload standards. Format your passport photo (200 × 230 px, 20-50KB), signature (140 × 60 px, 10-20KB), and thumb impression effortlessly.',
    features: [
      'Pre-configured for IBPS, SBI, and RBI recruitment portals',
      'Exact 200 × 230 px photo and 140 × 60 px signature presets',
      'Thumb impression mode: 20KB to 50KB with clear ridges',
      'Handwritten declaration format support (50KB - 100KB)'
    ],
    howToUse: [
      { step: 1, title: 'Upload Image', description: 'Upload photo, signature, or thumb impression.' },
      { step: 2, title: 'Pick Document Type', description: 'Choose Photo (50KB), Signature (20KB), or Thumb (50KB).' },
      { step: 3, title: 'Preview & Contrast', description: 'Check that signature and fingerprint ridges are sharp.' },
      { step: 4, title: 'Download File', description: 'Ready for ibpsonline.ibps.in upload.' }
    ],
    usefulInfo: {
      heading: 'Official IBPS / SBI Banking Upload Specifications',
      paragraphs: [
        'IBPS requires four distinct document uploads during application: Photograph, Signature, Left Thumb Impression, and Handwritten Declaration.',
        'Signatures in capital letters are strictly NOT accepted.'
      ],
      table: {
        headers: ['Document', 'Dimensions', 'File Size Limit', 'Format'],
        rows: [
          ['Photograph', '200 × 230 pixels', '20 KB – 50 KB', 'JPG / JPEG'],
          ['Signature', '140 × 60 pixels', '10 KB – 20 KB', 'JPG / JPEG'],
          ['Left Thumb Impression', '240 × 240 pixels (3 × 3 cm)', '20 KB – 50 KB', 'JPG / JPEG'],
          ['Handwritten Declaration', '800 × 400 pixels (10 × 5 cm)', '50 KB – 100 KB', 'JPG / JPEG']
        ]
      }
    },
    faqs: [
      { question: 'What are the photo dimensions for IBPS forms?', answer: 'The photo must be 200 × 230 pixels, between 20KB and 50KB in JPG/JPEG format.' },
      { question: 'What ink is required for IBPS thumb impression?', answer: 'Blue or black ink pad impression on clean white paper is accepted.' }
    ],
    relatedLinks: [
      { title: 'SSC Photo Resizer', slug: 'ssc-photo-resizer', description: 'SSC photo guidelines' },
      { title: 'Compress JPG to 50KB', slug: 'compress-jpg-to-50kb', description: 'Compress to 50KB' },
      { title: 'Signature Resizer 10KB', slug: 'signature-resizer-10kb', description: 'Signature 10-20KB' }
    ],
    cta: {
      title: 'Need to Compress Signature to 10KB - 20KB?',
      description: 'Scale banking signatures to exact 140x60 pixels in seconds.',
      buttonText: 'Signature Resizer',
      buttonHref: '/signature-resizer-10kb'
    }
  },

  // 30. /up-police-photo-resizer
  {
    slug: 'up-police-photo-resizer',
    tool: 'image-compressor',
    toolConfig: { initialTargetSize: '50kb' },
    title: 'UP Police Photo & Signature Resizer (Constable & SI) | PixEnhance',
    description: 'Format photo (20KB - 50KB, 35x45mm) and signature (5KB - 20KB, 35x15mm) for UP Police Constable, SI, and Computer Operator online applications.',
    h1: 'UP Police Photo & Signature Resizer Online Free',
    category: 'Govt Exam Tools',
    badge: 'UPPRPB Official',
    intro: 'Prepare your passport photo and signature for Uttar Pradesh Police Recruitment and Promotion Board (UPPRPB). Formats your photo to 20KB-50KB and signature to 5KB-20KB strictly according to UP Police rules.',
    features: [
      'Compliant with UPPRPB Constable & Sub-Inspector portals',
      'Photo file size kept strictly between 20 KB and 50 KB',
      'Signature file size kept strictly between 5 KB and 20 KB',
      'Plain light grey or white background enhancement'
    ],
    howToUse: [
      { step: 1, title: 'Upload Photo or Signature', description: 'Upload your smartphone camera shot or scan.' },
      { step: 2, title: 'Select UP Police Mode', description: 'Pick 50KB for photo or 20KB for signature.' },
      { step: 3, title: 'Review Image', description: 'Ensure facial features and neck are straight and clear.' },
      { step: 4, title: 'Instant Download', description: 'Upload directly to uppbpb.gov.in.' }
    ],
    usefulInfo: {
      heading: 'UPPRPB Official Photo Sizing Guidelines',
      paragraphs: [
        'UP Police rules require that the face occupies 70% of the photograph with clear visibility of both ears.',
        'The photo background must be plain white or light grey; dark red or blue backgrounds will be rejected.'
      ],
      table: {
        headers: ['Document', 'Dimensions', 'File Size Limit', 'Allowed Background'],
        rows: [
          ['Color Photo', '35 mm × 45 mm', '20 KB – 50 KB', 'White or Light Grey'],
          ['Signature Scan', '35 mm × 15 mm', '5 KB – 20 KB', 'Plain white paper with black ink']
        ]
      }
    },
    faqs: [
      { question: 'What is the signature size for UP Police Constable?', answer: 'The signature must be between 5KB and 20KB, with dimensions approximately 35 mm × 15 mm in JPG format.' }
    ],
    relatedLinks: [
      { title: 'SSC Photo Resizer', slug: 'ssc-photo-resizer', description: 'SSC photo sizing' },
      { title: 'Railway RRB Resizer', slug: 'rrb-photo-resizer', description: 'Railway exam tools' },
      { title: 'Compress JPG to 50KB', slug: 'compress-jpg-to-50kb', description: 'Compress to 50KB' }
    ],
    cta: {
      title: 'Need to Compress Documents for UP Police?',
      description: 'Compress marksheets and certificates under 100KB for easy portal upload.',
      buttonText: 'Compress to 100KB',
      buttonHref: '/compress-jpg-to-100kb'
    }
  }
,

  // 31. /gate-photo-resizer
  {
    slug: 'gate-photo-resizer',
    tool: 'image-compressor',
    toolConfig: { initialTargetSize: '50kb' },
    title: 'GATE Photo & Signature Resizer (GOAPS Official Specs) | PixEnhance',
    description: 'Format photo (5KB - 200KB, 3.5x4.5cm or 480x640px) and signature (3KB - 100KB, 2x7cm) for GATE (GOAPS) IIT entrance examination online registration.',
    h1: 'GATE Photo & Signature Resizer Online Free',
    category: 'Govt Exam Tools',
    badge: 'GATE / GOAPS Official',
    intro: 'Resize and compress your photograph and signature strictly as per IIT GATE GOAPS registration guidelines. Ensures exact aspect ratio, white background compliance, and file sizes between 5KB–200KB for photo and 3KB–100KB for signature.',
    features: [
      'Compliant with GATE GOAPS registration guidelines',
      'Photo file size 5 KB – 200 KB (Recommended: 50 KB)',
      'Signature file size 3 KB – 100 KB with 3.5:1 aspect ratio',
      '100% private client-side processing — instant download'
    ],
    howToUse: [
      { step: 1, title: 'Upload Photo or Signature', description: 'Upload your recent passport photo or scanned signature.' },
      { step: 2, title: 'Select Target Size', description: 'Choose 50KB for photo or 20KB for signature.' },
      { step: 3, title: 'Inspect Aspect Ratio', description: 'Ensure the background is clean white and the face covers 60-70%.' },
      { step: 4, title: 'Download File', description: 'Ready for upload directly to the GOAPS portal.' }
    ],
    usefulInfo: {
      heading: 'IIT GATE GOAPS Official Upload Specifications',
      paragraphs: [
        'The Graduate Aptitude Test in Engineering (GATE) portal mandates a clean passport-sized photograph taken in a professional studio after the notification date.',
        'Photographs taken with mobile cameras with cluttered backgrounds or selfies will lead to application rejection. For the signature, sign within a rectangular box of 2 cm height by 7 cm width.'
      ],
      table: {
        headers: ['Document', 'Dimensions', 'File Size Limit', 'Format / Guidelines'],
        rows: [
          ['Photograph', '3.5 cm × 4.5 cm (240×320 to 480×640 px)', '5 KB – 200 KB', 'JPG / JPEG, White Background, 60–70% face'],
          ['Signature', '2 cm × 7 cm (aspect ratio 3.5:1)', '3 KB – 100 KB', 'JPG / JPEG, Dark blue or black ink on white paper']
        ]
      }
    },
    faqs: [
      { question: 'Can I upload a photo with spectacles for GATE?', answer: 'Normal clear reading spectacles without tinted or reflective lenses are allowed. Sunglasses or dark glasses will cause rejection.' },
      { question: 'What is the required aspect ratio for GATE signature?', answer: 'GOAPS mandates a rectangular box of 2 cm height by 7 cm width, giving an aspect ratio of 3.5:1.' }
    ],
    relatedLinks: [
      { title: 'SSC Photo Resizer', slug: 'ssc-photo-resizer', description: 'SSC photo guidelines' },
      { title: 'Signature Resizer 10KB', slug: 'signature-resizer-10kb', description: 'Signature 10-20KB' },
      { title: 'Compress JPG to 50KB', slug: 'compress-jpg-to-50kb', description: 'Compress to 50KB' }
    ],
    cta: {
      title: 'Need to Compress Documents for GATE Registration?',
      description: 'Compress category certificates and degree marksheets under 500KB easily.',
      buttonText: 'Compress to 100KB',
      buttonHref: '/compress-jpg-to-100kb'
    }
  },

  // 32. /bpsc-photo-resizer
  {
    slug: 'bpsc-photo-resizer',
    tool: 'image-compressor',
    toolConfig: { initialTargetSize: '15kb' },
    title: 'BPSC Photo & Signature Resizer (TRE & CCE) | PixEnhance',
    description: 'Resize photo (max 100KB) and Hindi / English signatures (max 15KB, 220x100px) for Bihar BPSC CCE, Headmaster, and Teacher Recruitment (TRE) online forms.',
    h1: 'BPSC Photo & Signature Resizer Online Free',
    category: 'Govt Exam Tools',
    badge: 'BPSC Bihar Official',
    intro: 'Optimize photograph and both Hindi & English signatures for Bihar Public Service Commission (BPSC). Automatically scales signatures to under 15KB with 220×100 pixel dimensions for immediate upload on onlinebpsc.bihar.gov.in.',
    features: [
      'Dual signature support: Hindi & English signatures under 15 KB',
      'Standard 220 × 100 pixels signature dimension ratio',
      'Photo compression below 100 KB / 25 KB limits',
      'Clear contrast filter for scanned signature readability'
    ],
    howToUse: [
      { step: 1, title: 'Upload Document', description: 'Upload your photo, Hindi signature, or English signature.' },
      { step: 2, title: 'Choose Target File Size', description: 'Set to 15KB for signatures or 50KB for documents.' },
      { step: 3, title: 'Check Dimensions', description: 'Verify 220 × 100 px ratio for signatures.' },
      { step: 4, title: 'Download & Upload', description: 'Save the optimized JPG file and upload to onlinebpsc.bihar.gov.in.' }
    ],
    usefulInfo: {
      heading: 'BPSC CCE & Teacher (TRE) Upload Specifications',
      paragraphs: [
        'BPSC requires separate upload of Hindi and English signatures. Signatures in capital block letters are strictly disqualified.',
        'Live webcam photos captured during application must match the uploaded photograph and admit card photo.'
      ],
      table: {
        headers: ['Document', 'Dimensions', 'File Size Limit', 'Format / Notes'],
        rows: [
          ['Candidate Photograph', '3.5 cm × 4.5 cm', 'Under 100 KB (Live Capture under 25 KB)', 'JPG / JPEG, clear face'],
          ['English Signature', '220 × 100 pixels', 'Under 15 KB', 'JPG / JPEG, running handwriting (no caps)'],
          ['Hindi Signature', '220 × 100 pixels', 'Under 15 KB', 'JPG / JPEG, black ink on white background']
        ]
      }
    },
    faqs: [
      { question: 'What is the signature file size limit for BPSC TRE?', answer: 'Both Hindi and English signatures must each be under 15KB with dimensions of 220 × 100 pixels.' },
      { question: 'Is Hindi signature mandatory for BPSC?', answer: 'Yes, BPSC application forms require candidates to upload their signature in both Hindi and English.' }
    ],
    relatedLinks: [
      { title: 'Signature Resizer 10KB', slug: 'signature-resizer-10kb', description: 'Resize signature to 10-20KB' },
      { title: 'SSC Photo Resizer', slug: 'ssc-photo-resizer', description: 'SSC photo sizing' },
      { title: 'UP Police Resizer', slug: 'up-police-photo-resizer', description: 'UP Police tools' }
    ],
    cta: {
      title: 'Need to Compress BPSC Certificates to 100KB?',
      description: 'Quickly compress caste, domicile, and educational certificates for BPSC verification.',
      buttonText: 'Compress to 100KB',
      buttonHref: '/compress-jpg-to-100kb'
    }
  },

  // 33. /dsssb-photo-resizer
  {
    slug: 'dsssb-photo-resizer',
    tool: 'image-compressor',
    toolConfig: { initialTargetSize: '100kb' },
    title: 'DSSSB Postcard (5x7) & Passport Photo Resizer | PixEnhance',
    description: 'Format 5x7 postcard size photo (480x672px, 50-300KB), passport photo (110x140px, 40KB), signature, and thumb impressions for DSSSB online portal.',
    h1: 'DSSSB Postcard & Passport Photo Resizer Online',
    category: 'Govt Exam Tools',
    badge: 'DSSSB Delhi Official',
    intro: 'Format Postcard size (5" × 7") photos, passport photos, signatures, and thumb impressions strictly adhering to Delhi Subordinate Services Selection Board (dsssbonline.nic.in) technical upload requirements.',
    features: [
      'Postcard 5x7 inches (480 × 672 pixels) preset ready',
      'Passport size 110 × 140 pixels under 40 KB',
      'Left & Right Thumb impression resizer (110 × 140 pixels)',
      '100% compliant with dsssbonline.nic.in registration portal'
    ],
    howToUse: [
      { step: 1, title: 'Select Document Type', description: 'Upload Postcard photo, Passport photo, Signature, or Thumb.' },
      { step: 2, title: 'Choose Target Dimensions', description: 'Pick 480×672 for postcard or 110×140 for passport.' },
      { step: 3, title: 'Verify Size Limit', description: 'Keep under 300KB for postcard and under 40KB for other uploads.' },
      { step: 4, title: 'Download Ready File', description: 'Directly upload to the DSSSB portal.' }
    ],
    usefulInfo: {
      heading: 'DSSSB Delhi Official Photo & Postcard Guidelines',
      paragraphs: [
        'DSSSB mandates both a regular passport photo and a large 5" × 7" postcard size photograph showing the candidate from chest upwards.',
        'Both ears must be clearly visible, and background must be plain white.'
      ],
      table: {
        headers: ['Document', 'Dimensions', 'File Size Limit', 'Format / Rules'],
        rows: [
          ['Postcard Photo (5" × 7")', '480 × 672 pixels', '50 KB – 300 KB', 'JPG / JPEG, white background, upper body view'],
          ['Passport Size Photo', '110 × 140 pixels', 'Under 40 KB', 'JPG / JPEG, face covering 80%'],
          ['Signature', '140 × 110 pixels', 'Under 40 KB', 'JPG / JPEG, dark pen on white paper'],
          ['Left & Right Thumb', '110 × 140 pixels', 'Under 40 KB', 'JPG / JPEG, clear ink ridges']
        ]
      }
    },
    faqs: [
      { question: 'What is DSSSB postcard photo size in pixels?', answer: 'DSSSB postcard photo must be 480 × 672 pixels, between 50KB and 300KB in JPG format.' },
      { question: 'What are the dimensions for DSSSB signature?', answer: 'The signature must be 140 × 110 pixels and under 40KB.' }
    ],
    relatedLinks: [
      { title: 'SSC Photo Resizer', slug: 'ssc-photo-resizer', description: 'SSC photo sizing' },
      { title: 'Signature Resizer 10KB', slug: 'signature-resizer-10kb', description: 'Signature 10-20KB' },
      { title: 'CTET Photo Resizer', slug: 'ctet-photo-resizer', description: 'CTET exam tools' }
    ],
    cta: {
      title: 'Need to Resize DSSSB Signature Under 40KB?',
      description: 'Format your signature to exact 140x110 pixels in seconds.',
      buttonText: 'Signature Resizer',
      buttonHref: '/signature-resizer-10kb'
    }
  },

  // 34. /cuet-photo-resizer
  {
    slug: 'cuet-photo-resizer',
    tool: 'image-compressor',
    toolConfig: { initialTargetSize: '50kb' },
    title: 'CUET UG / PG Photo & Signature Resizer (NTA) | PixEnhance',
    description: 'Resize photograph (10KB - 200KB, 80% face) and signature (4KB - 30KB) for NTA CUET UG and PG online application form.',
    h1: 'CUET Photo & Signature Resizer Online Free',
    category: 'Govt Exam Tools',
    badge: 'NTA CUET Official',
    intro: 'Format photograph and signature for NTA Common University Entrance Test (CUET UG/PG). Complies with the 80% face visibility rule, white background requirement, and exact 10KB–200KB file size parameters.',
    features: [
      'Compliant with NTA CUET UG & PG portal specs',
      'Photo compressed between 10 KB and 200 KB',
      'Signature compressed between 4 KB and 30 KB',
      'Maintains 80% facial clarity without pixelation'
    ],
    howToUse: [
      { step: 1, title: 'Upload Picture', description: 'Upload your passport photo or signature scan.' },
      { step: 2, title: 'Select CUET Mode', description: 'Choose 50KB for photo or 20KB for signature.' },
      { step: 3, title: 'Review Quality', description: 'Ensure the image is sharp with no blur.' },
      { step: 4, title: 'Download File', description: 'Upload directly to cuetug.ntaonline.in.' }
    ],
    usefulInfo: {
      heading: 'NTA CUET Photo & Signature Upload Rules',
      paragraphs: [
        'NTA requires 80% face coverage in the photograph, including ears against a white background.',
        'Spectacles are permitted only if being used regularly, with no glare on the lenses.'
      ],
      table: {
        headers: ['Document', 'Dimensions', 'File Size Limit', 'Format'],
        rows: [
          ['Passport Photograph', '3.5 cm × 4.5 cm', '10 KB – 200 KB', 'JPG / JPEG, 80% face'],
          ['Signature Scan', '3.5 cm × 1.5 cm', '4 KB – 30 KB', 'JPG / JPEG, black pen']
        ]
      }
    },
    faqs: [
      { question: 'What is the signature file size limit for CUET?', answer: 'The signature must be between 4KB and 30KB in JPG or JPEG format.' }
    ],
    relatedLinks: [
      { title: 'NEET Postcard Resizer', slug: 'neet-postcard-photo-resizer', description: 'NEET photo specs' },
      { title: 'JEE Main Resizer', slug: 'jee-main-photo-resizer', description: 'JEE main tools' },
      { title: 'Compress JPG to 50KB', slug: 'compress-jpg-to-50kb', description: 'Compress to 50KB' }
    ],
    cta: {
      title: 'Need to Compress Documents for CUET?',
      description: 'Compress class 10 and 12 marksheets under 300KB easily.',
      buttonText: 'Compress to 100KB',
      buttonHref: '/compress-jpg-to-100kb'
    }
  },

  // 35. /cat-photo-resizer
  {
    slug: 'cat-photo-resizer',
    tool: 'image-compressor',
    toolConfig: { initialTargetSize: '50kb' },
    title: 'CAT Exam Photo & Signature Resizer (IIM) | PixEnhance',
    description: 'Format photo (35mm x 45mm, max 80KB) and signature (80mm x 35mm, max 80KB) for IIM Common Admission Test (CAT) registration portal.',
    h1: 'IIM CAT Photo & Signature Resizer Online Free',
    category: 'Govt Exam Tools',
    badge: 'IIM CAT Official',
    intro: 'Resize your photograph and signature strictly as per IIM CAT online application specifications. Sets photo dimensions to 35mm × 45mm and signature to 80mm × 35mm with file sizes under 80 KB.',
    features: [
      'Official IIM CAT registration portal compliance',
      'Photo formatted to 35 mm × 45 mm, max 80 KB',
      'Signature formatted to 80 mm × 35 mm, max 80 KB',
      'Pure white background enhancement'
    ],
    howToUse: [
      { step: 1, title: 'Upload Photo or Signature', description: 'Drag and drop your file into the tool.' },
      { step: 2, title: 'Select CAT Preset', description: 'Target 50KB to safely stay below the 80KB cap.' },
      { step: 3, title: 'Preview Image', description: 'Ensure the image has clear contrast and white background.' },
      { step: 4, title: 'Download File', description: 'Upload directly to iimcat.ac.in.' }
    ],
    usefulInfo: {
      heading: 'IIM CAT Registration Photo Specifications',
      paragraphs: [
        'The photograph must not be more than six months old and should have a plain white background.',
        'Both ears, neck, and shoulders must be clearly visible. Selfies or social media photos are strictly forbidden.'
      ],
      table: {
        headers: ['Document', 'Dimensions', 'File Size Limit', 'Format'],
        rows: [
          ['Passport Photograph', '35 mm × 45 mm (1200×1200 px max)', 'Max 80 KB', 'JPG / JPEG, white background'],
          ['Candidate Signature', '80 mm × 35 mm', 'Max 80 KB', 'JPG / JPEG, black pen']
        ]
      }
    },
    faqs: [
      { question: 'What is the maximum file size for CAT photo upload?', answer: 'The photo file size must not exceed 80 KB in JPG or JPEG format.' }
    ],
    relatedLinks: [
      { title: 'GATE Photo Resizer', slug: 'gate-photo-resizer', description: 'GATE GOAPS specs' },
      { title: 'Compress JPG to 50KB', slug: 'compress-jpg-to-50kb', description: 'Compress to 50KB' },
      { title: 'Signature Resizer 10KB', slug: 'signature-resizer-10kb', description: 'Signature resizer' }
    ],
    cta: {
      title: 'Preparing for MBA Applications?',
      description: 'Easily resize photos and certificates for XAT, SNAP, and IIFT too.',
      buttonText: 'All Tools',
      buttonHref: '/tools'
    }
  },

  // 36. /nda-cds-photo-resizer
  {
    slug: 'nda-cds-photo-resizer',
    tool: 'image-compressor',
    toolConfig: { initialTargetSize: '100kb' },
    title: 'UPSC NDA & CDS Photo & Signature Resizer | PixEnhance',
    description: 'Resize photo and signature (350x350px min to 1000x1000px max, 20KB - 300KB) for UPSC NDA and CDS online registration at upsconline.nic.in.',
    h1: 'UPSC NDA & CDS Photo & Signature Resizer Online',
    category: 'Govt Exam Tools',
    badge: 'UPSC Defence Official',
    intro: 'Resize your photo and signature for UPSC National Defence Academy (NDA) and Combined Defence Services (CDS). Automatically sets pixel dimensions between 350×350 and 1000×1000 pixels with file size between 20KB and 300KB.',
    features: [
      'Meets exact UPSC OTR and NDA/CDS portal criteria',
      'Pixel dimensions scaled between 350×350 and 1000×1000 px',
      'File size optimized between 20 KB and 300 KB',
      'Includes candidate name and date stamp capability'
    ],
    howToUse: [
      { step: 1, title: 'Upload Photo or Signature', description: 'Upload your scanned photo or signature file.' },
      { step: 2, title: 'Choose 100KB Preset', description: 'Ensures file stays comfortably in the 20KB-300KB bracket.' },
      { step: 3, title: 'Confirm Square Ratio', description: 'Check that width and height are equal (e.g. 500x500).' },
      { step: 4, title: 'Download File', description: 'Upload to upsconline.nic.in.' }
    ],
    usefulInfo: {
      heading: 'UPSC NDA & CDS Photo & Signature Rules',
      paragraphs: [
        "UPSC requires that the candidate's name and the date of photograph are clearly printed at the bottom of the photo.",
        'The photograph must not be older than 10 days from the start of the online application process.'
      ],
      table: {
        headers: ['Document', 'Dimensions', 'File Size Limit', 'Format'],
        rows: [
          ['Photograph', '350 × 350 to 1000 × 1000 pixels', '20 KB – 300 KB', 'JPG / JPEG, Name & Date printed'],
          ['Signature', '350 × 350 to 1000 × 1000 pixels', '20 KB – 300 KB', 'JPG / JPEG, black pen']
        ]
      }
    },
    faqs: [
      { question: 'Is candidate name and date required on UPSC NDA photo?', answer: "Yes, UPSC mandates that the applicant's name and date of photo be printed clearly at the bottom." }
    ],
    relatedLinks: [
      { title: 'UPSC Photo Resizer', slug: 'upsc-photo-resizer', description: 'UPSC civil services' },
      { title: 'Agniveer Photo Resizer', slug: 'agniveer-photo-resizer', description: 'Agniveer defence exams' },
      { title: 'Signature Resizer 10KB', slug: 'signature-resizer-10kb', description: 'Signature resizer' }
    ],
    cta: {
      title: 'Need to Compress Photo ID Proof for UPSC?',
      description: 'Compress Aadhaar, PAN card, or Voter ID to under 300KB PDF/JPG.',
      buttonText: 'Compress to 200KB',
      buttonHref: '/compress-jpg-to-200kb'
    }
  },

  // 37. /agniveer-photo-resizer
  {
    slug: 'agniveer-photo-resizer',
    tool: 'image-compressor',
    toolConfig: { initialTargetSize: '50kb' },
    title: 'Agniveer Photo with Slate & Signature Resizer | PixEnhance',
    description: 'Format Agniveer Air Force, Army, and Navy photos (with black slate holding candidate name and date) and signature (10KB - 50KB).',
    h1: 'Agniveer Photo & Signature Resizer Online Free',
    category: 'Govt Exam Tools',
    badge: 'Agnipath Official',
    intro: 'Resize and optimize photograph, signature, and thumb impression for Agnipath Vayu (IAF), Army, and Navy recruitment. Supports chest slate photo requirements with clean 10KB–50KB compression.',
    features: [
      'Supports Agniveer Vayu black slate photo requirements',
      'Photo file size compressed between 10 KB and 50 KB',
      'Signature and thumb compressed between 10 KB and 50 KB',
      'Fast client-side processing for mobile users'
    ],
    howToUse: [
      { step: 1, title: 'Upload Photo or Scan', description: 'Select your photo holding the slate or your signature.' },
      { step: 2, title: 'Set Target to 50KB', description: 'Matches the 10KB–50KB portal requirement.' },
      { step: 3, title: 'Inspect Clarity', description: 'Ensure the chalk writing on the slate is clearly readable.' },
      { step: 4, title: 'Download File', description: 'Upload directly to agnipathvayu.cdac.in or joinindianarmy.nic.in.' }
    ],
    usefulInfo: {
      heading: 'Agniveer Recruitment Photo Upload Instructions',
      paragraphs: [
        'For Indian Air Force Agniveer Vayu, candidates must hold a black slate in front of their chest with their name and date of photo taken written in white chalk in capital letters.',
        'Indian Army requires passport photos with white background and clean shave for non-Sikh candidates.'
      ],
      table: {
        headers: ['Document', 'Dimensions', 'File Size Limit', 'Format / Guidelines'],
        rows: [
          ['Air Force Slate Photo', '3.5 cm × 4.5 cm', '10 KB – 50 KB', 'JPG, black slate with name and date'],
          ['Army Agniveer Photo', '3.5 cm × 4.5 cm', '5 KB – 20 KB', 'JPG, plain white background'],
          ['Signature', '3.5 cm × 1.5 cm', '10 KB – 50 KB', 'JPG, black ink on white paper']
        ]
      }
    },
    faqs: [
      { question: 'What is written on the Agniveer Air Force slate?', answer: "The candidate's name and date of photograph must be written in capital letters with white chalk on a black slate held in front of the chest." }
    ],
    relatedLinks: [
      { title: 'NDA CDS Resizer', slug: 'nda-cds-photo-resizer', description: 'Defence exam resizer' },
      { title: 'Compress JPG to 50KB', slug: 'compress-jpg-to-50kb', description: 'Compress to 50KB' },
      { title: 'Signature Resizer 10KB', slug: 'signature-resizer-10kb', description: 'Signature 10-20KB' }
    ],
    cta: {
      title: 'Need to Compress Army Rally Documents?',
      description: 'Compress marksheets and domicile certificates under 100KB easily.',
      buttonText: 'Compress to 100KB',
      buttonHref: '/compress-jpg-to-100kb'
    }
  },

  // 38. /driving-licence-photo-resizer
  {
    slug: 'driving-licence-photo-resizer',
    tool: 'image-compressor',
    toolConfig: { initialTargetSize: '20kb' },
    title: 'Driving Licence Photo & Signature Resizer (Sarathi) | PixEnhance',
    description: 'Format passport photo (35x45mm, 10KB - 20KB) and signature (35x15mm, 10KB - 20KB) for Sarathi Parivahan driving licence and learner licence.',
    h1: 'Sarathi Driving Licence Photo & Signature Resizer',
    category: 'Govt Exam Tools',
    badge: 'Sarathi Parivahan Official',
    intro: 'Scale your passport photo and signature to exact Sarathi Parivahan specifications (10KB–20KB file size, 35mm × 45mm photo, 35mm × 15mm signature) for instant driving licence portal approval.',
    features: [
      'Exact 10 KB – 20 KB Sarathi Parivahan file size solver',
      'Photo dimensions 35 mm × 45 mm (420 × 525 pixels)',
      'Signature dimensions 35 mm × 15 mm (420 × 180 pixels)',
      '100% private in-browser image optimization'
    ],
    howToUse: [
      { step: 1, title: 'Upload Photo or Signature', description: 'Select your photo or signature from phone or PC.' },
      { step: 2, title: 'Choose 20KB Limit', description: 'The tool guarantees the file size is between 10KB and 20KB.' },
      { step: 3, title: 'Review Quality', description: 'Check that the face or signature is sharp and legible.' },
      { step: 4, title: 'Download File', description: 'Upload directly to sarathi.parivahan.gov.in.' }
    ],
    usefulInfo: {
      heading: 'Sarathi Parivahan Official Photo & Signature Rules',
      paragraphs: [
        'The Ministry of Road Transport and Highways (MoRTH) Sarathi portal has strict upload limits: photos and signatures must be strictly between 10KB and 20KB.',
        'Files below 10KB or above 20KB are rejected with an error message on the portal.'
      ],
      table: {
        headers: ['Document', 'Dimensions', 'File Size Range', 'Format'],
        rows: [
          ['Passport Photo', '35 mm × 45 mm (420 × 525 px)', '10 KB – 20 KB strictly', 'JPG / JPEG, plain white background'],
          ['Signature', '35 mm × 15 mm (420 × 180 px)', '10 KB – 20 KB strictly', 'JPG / JPEG, black ink']
        ]
      }
    },
    faqs: [
      { question: 'Why does Sarathi portal reject photos?', answer: 'The most common reason is file size outside the strict 10KB to 20KB bracket, or non-JPG format.' }
    ],
    relatedLinks: [
      { title: 'PAN Card Photo Resizer', slug: 'pan-card-photo-resizer', description: 'PAN card photo specs' },
      { title: 'Compress JPG to 20KB', slug: 'compress-jpg-to-20kb', description: 'Compress to 20KB' },
      { title: 'Signature Resizer 10KB', slug: 'signature-resizer-10kb', description: 'Signature resizer' }
    ],
    cta: {
      title: 'Need to Compress DL Proof Documents?',
      description: 'Compress address proof and medical certificate under 200KB easily.',
      buttonText: 'Compress to 200KB',
      buttonHref: '/compress-jpg-to-200kb'
    }
  },

  // 39. /indian-passport-photo-resizer
  {
    slug: 'indian-passport-photo-resizer',
    tool: 'image-compressor',
    toolConfig: { initialTargetSize: '100kb' },
    title: 'Indian Passport & OCI Photo Resizer (Passport Seva) | PixEnhance',
    description: 'Resize photo to 2x2 inches (51x51mm, 600x600px min, 10KB - 300KB) and signature for Passport Seva Kendra (PSK) and OCI online applications.',
    h1: 'Indian Passport Photo Resizer Online Free',
    category: 'Govt Exam Tools',
    badge: 'Passport Seva Official',
    intro: 'Create official 2 × 2 inch (51 mm × 51 mm) square passport photos for Indian Passport Seva Kendra (PSK) and OCI services. Ensures 80% face coverage, pure white background, and file size between 10KB and 300KB.',
    features: [
      'Official 2 × 2 inch (51 mm × 51 mm) square format',
      'Pixel dimensions min 600 × 600 to max 1000 × 1000',
      'File size optimized between 10 KB and 300 KB',
      'Pure white background compliance'
    ],
    howToUse: [
      { step: 1, title: 'Upload Your Photo', description: 'Select a front-facing portrait photo.' },
      { step: 2, title: 'Check 2x2 Square Crop', description: 'Ensure head height covers 70% to 80% of the frame.' },
      { step: 3, title: 'Review File Size', description: 'Ensure the output is between 10KB and 300KB.' },
      { step: 4, title: 'Download Image', description: 'Ready for upload at passportindia.gov.in.' }
    ],
    usefulInfo: {
      heading: 'Passport Seva Kendra Official Photo Specifications',
      paragraphs: [
        'The photo must show full frontal view of face with both ears visible, mouth closed, and neutral expression.',
        'The background must be plain white or off-white. No shadows on face or background are permitted.'
      ],
      table: {
        headers: ['Document', 'Dimensions', 'File Size Limit', 'Format / Guidelines'],
        rows: [
          ['Passport Photo', '2 × 2 inches (51 × 51 mm, 600×600 px)', '10 KB – 300 KB', 'JPG / JPEG, 80% face, white background'],
          ['Signature Scan', 'Aspect ratio 1:3 (e.g. 200 × 600 px)', '10 KB – 300 KB', 'JPG / JPEG, black ballpoint pen']
        ]
      }
    },
    faqs: [
      { question: 'What is the background color required for Indian passport photos?', answer: 'The background must be plain white or off-white without any shadows or patterns.' }
    ],
    relatedLinks: [
      { title: 'Visa Photo Resizer', slug: 'visa-photo-resizer', description: 'Global visa photo specs' },
      { title: 'PAN Card Photo Resizer', slug: 'pan-card-photo-resizer', description: 'PAN card photo tools' },
      { title: 'Compress JPG to 100KB', slug: 'compress-jpg-to-100kb', description: 'Compress to 100KB' }
    ],
    cta: {
      title: 'Need a US or Schengen Visa Photo?',
      description: 'PixEnhance supports international visa photo dimensions for 100+ countries.',
      buttonText: 'Visa Photo Resizer',
      buttonHref: '/visa-photo-resizer'
    }
  },

  // 40. /rpsc-photo-resizer
  {
    slug: 'rpsc-photo-resizer',
    tool: 'image-compressor',
    toolConfig: { initialTargetSize: '50kb' },
    title: 'RPSC & RSMSSB Photo & Signature Resizer (Rajasthan) | PixEnhance',
    description: 'Format photo (50KB - 100KB, 240x320px) and signature (20KB - 50KB, 280x120px) for Rajasthan SSO, RPSC, and RSMSSB online recruitments.',
    h1: 'RPSC & RSMSSB Photo & Signature Resizer Online',
    category: 'Govt Exam Tools',
    badge: 'Rajasthan SSO Official',
    intro: 'Prepare your photograph and signature for Rajasthan Single Sign On (SSO), RPSC RAS, and RSMSSB examinations according to exact government portal upload criteria.',
    features: [
      'Pre-configured for Rajasthan SSO portal requirements',
      'Photo file size 50 KB – 100 KB, 240 × 320 pixels',
      'Signature file size 20 KB – 50 KB, 280 × 120 pixels',
      'Quick in-browser optimization with zero quality loss'
    ],
    howToUse: [
      { step: 1, title: 'Upload Photo or Signature', description: 'Select your photo or signature file.' },
      { step: 2, title: 'Pick Preset', description: 'Select 50KB-100KB for photo or 20KB-50KB for signature.' },
      { step: 3, title: 'Check Details', description: 'Ensure the photo shows clear frontal face with no cap or dark glasses.' },
      { step: 4, title: 'Download File', description: 'Upload to sso.rajasthan.gov.in.' }
    ],
    usefulInfo: {
      heading: 'RPSC & RSMSSB Official Guidelines',
      paragraphs: [
        'Photographs should have a light background and should not be older than one month.',
        'Signatures must be done with black ballpoint pen on plain white paper within the specified box.'
      ],
      table: {
        headers: ['Document', 'Dimensions', 'File Size Limit', 'Format'],
        rows: [
          ['Color Photo', '240 × 320 pixels (3.5 × 4.5 cm)', '50 KB – 100 KB', 'JPG / JPEG, light background'],
          ['Signature', '280 × 120 pixels (7 × 2 cm)', '20 KB – 50 KB', 'JPG / JPEG, black pen']
        ]
      }
    },
    faqs: [
      { question: 'What is the signature size for Rajasthan RSMSSB forms?', answer: 'The signature must be 280 × 120 pixels, between 20 KB and 50 KB in JPG format.' }
    ],
    relatedLinks: [
      { title: 'SSC Photo Resizer', slug: 'ssc-photo-resizer', description: 'SSC photo guidelines' },
      { title: 'Compress JPG to 50KB', slug: 'compress-jpg-to-50kb', description: 'Compress to 50KB' },
      { title: 'Signature Resizer 10KB', slug: 'signature-resizer-10kb', description: 'Signature 10-20KB' }
    ],
    cta: {
      title: 'Need to Compress Documents for Rajasthan SSO?',
      description: 'Compress bonafide and caste certificates under 100KB easily.',
      buttonText: 'Compress to 100KB',
      buttonHref: '/compress-jpg-to-100kb'
    }
  },

  // 41. /mpsc-photo-resizer
  {
    slug: 'mpsc-photo-resizer',
    tool: 'image-compressor',
    toolConfig: { initialTargetSize: '50kb' },
    title: 'MPSC & MahaPolice Photo & Signature Resizer | PixEnhance',
    description: 'Resize photo (20KB - 50KB, 3.5x4.5cm) and signature (10KB - 20KB, 3.5x1.5cm) for Maharashtra MPSC and Maharashtra Police online applications.',
    h1: 'MPSC & Maharashtra Police Photo Resizer Online',
    category: 'Govt Exam Tools',
    badge: 'MPSC Maharashtra Official',
    intro: 'Format photograph and signature for Maharashtra Public Service Commission (MPSC) and MahaPolice recruitments. Perfectly trims file size to 20KB–50KB for photo and 10KB–20KB for signature.',
    features: [
      'Tailored for MPSC Online and MahaPolice recruitments',
      'Photo file size 20 KB – 50 KB (3.5 × 4.5 cm)',
      'Signature file size 10 KB – 20 KB (3.5 × 1.5 cm)',
      'Automatic contrast enhancement for crisp signatures'
    ],
    howToUse: [
      { step: 1, title: 'Upload File', description: 'Select candidate photo or signature.' },
      { step: 2, title: 'Select Target Size', description: 'Choose 50KB for photo or 20KB for signature.' },
      { step: 3, title: 'Inspect Output', description: 'Verify aspect ratio and clarity.' },
      { step: 4, title: 'Download Image', description: 'Ready for upload to mpsc.gov.in.' }
    ],
    usefulInfo: {
      heading: 'MPSC Official Image Specifications',
      paragraphs: [
        'MPSC requires clear color passport photographs taken within the last 3 months.',
        'Signatures must be written in black ink on clean white paper.'
      ],
      table: {
        headers: ['Document', 'Dimensions', 'File Size Limit', 'Format'],
        rows: [
          ['Candidate Photo', '3.5 cm × 4.5 cm', '20 KB – 50 KB', 'JPG / JPEG, plain background'],
          ['Candidate Signature', '3.5 cm × 1.5 cm', '10 KB – 20 KB', 'JPG / JPEG, black ink']
        ]
      }
    },
    faqs: [
      { question: 'What is the signature size for MPSC online application?', answer: 'The signature must be between 10KB and 20KB, measuring approximately 3.5 cm × 1.5 cm.' }
    ],
    relatedLinks: [
      { title: 'UP Police Resizer', slug: 'up-police-photo-resizer', description: 'Police recruitment tools' },
      { title: 'Signature Resizer 10KB', slug: 'signature-resizer-10kb', description: 'Signature 10-20KB' },
      { title: 'Compress JPG to 50KB', slug: 'compress-jpg-to-50kb', description: 'Compress to 50KB' }
    ],
    cta: {
      title: 'Need to Compress Domicile Certificate for MPSC?',
      description: 'Easily compress your Maharashtra domicile and non-creamy layer certificates.',
      buttonText: 'Compress to 100KB',
      buttonHref: '/compress-jpg-to-100kb'
    }
  },

  // 42. /aiims-photo-resizer
  {
    slug: 'aiims-photo-resizer',
    tool: 'image-compressor',
    toolConfig: { initialTargetSize: '100kb' },
    title: 'AIIMS Photo, Signature & Thumb Resizer (PAER Portal) | PixEnhance',
    description: 'Resize photo (50KB - 100KB), signature (20KB - 100KB), and thumb impression for AIIMS NORCET, MBBS, Nursing, and Paramedical PAER registrations.',
    h1: 'AIIMS Photo & Signature Resizer Online Free',
    category: 'Govt Exam Tools',
    badge: 'AIIMS PAER Official',
    intro: 'Resize your passport photo, signature, and left thumb impression strictly adhering to AIIMS PAER (Prospective Applicants Advanced Registration) requirements.',
    features: [
      'Official AIIMS PAER registration compliance',
      'Photo 50 KB – 100 KB with 3.5 × 4.5 cm dimensions',
      'Signature 20 KB – 100 KB with 3 × 6 cm dimensions',
      'Left thumb impression 20 KB – 100 KB (3 × 4 cm)'
    ],
    howToUse: [
      { step: 1, title: 'Upload File', description: 'Choose photo, signature, or thumb scan.' },
      { step: 2, title: 'Set Target to 50KB-100KB', description: 'Ensures optimal quality within the permitted AIIMS limits.' },
      { step: 3, title: 'Review Background', description: 'Make sure the background is clean white.' },
      { step: 4, title: 'Download File', description: 'Upload to aiimsexams.ac.in.' }
    ],
    usefulInfo: {
      heading: 'AIIMS PAER Official Registration Guidelines',
      paragraphs: [
        'AIIMS requires that the photograph is taken against a white background without flash shadows.',
        'Thumb impressions must be made using a blue or black ink stamp pad without smudging.'
      ],
      table: {
        headers: ['Document', 'Dimensions', 'File Size Limit', 'Format / Guidelines'],
        rows: [
          ['Photograph', '3.5 cm × 4.5 cm', '50 KB – 100 KB', 'JPG / JPEG, white background'],
          ['Signature', '3 cm × 6 cm', '20 KB – 100 KB', 'JPG / JPEG, dark pen'],
          ['Left Thumb Impression', '3 cm × 4 cm', '20 KB – 100 KB', 'JPG / JPEG, blue/black ink']
        ]
      }
    },
    faqs: [
      { question: 'Why does AIIMS reject photographs?', answer: 'Common causes include non-white backgrounds, shadow on the face, blurry scans, or file sizes below 50KB or above 100KB.' }
    ],
    relatedLinks: [
      { title: 'NEET Postcard Resizer', slug: 'neet-postcard-photo-resizer', description: 'NEET exam photo' },
      { title: 'Compress JPG to 100KB', slug: 'compress-jpg-to-100kb', description: 'Compress to 100KB' },
      { title: 'Signature Resizer 10KB', slug: 'signature-resizer-10kb', description: 'Signature resizer' }
    ],
    cta: {
      title: 'Applying for AIIMS NORCET or Nursing?',
      description: 'Optimize all your nursing registration documents and ID proofs instantly.',
      buttonText: 'All Tools',
      buttonHref: '/tools'
    }
  },

  // 43. /epfo-uan-photo-resizer
  {
    slug: 'epfo-uan-photo-resizer',
    tool: 'image-compressor',
    toolConfig: { initialTargetSize: '100kb' },
    title: 'EPFO UAN Member Portal Photo Resizer (Under 100KB) | PixEnhance',
    description: 'Resize and crop profile photo (3.5x4.5cm, under 100KB) for EPFO Unified Member Portal UAN profile update and KYC verification.',
    h1: 'EPFO UAN Profile Photo Resizer Online Free',
    category: 'Govt Exam Tools',
    badge: 'EPFO Member Sewa Official',
    intro: 'Crop and compress your profile photo for the EPFO Member Sewa portal (unifiedportal-mem.epfindia.gov.in). Keeps file size strictly under 100 KB with both ears visible and 80% face coverage.',
    features: [
      'Compliant with EPFO Unified Member Portal KYC rules',
      'Compresses photo strictly under 100 KB in JPG format',
      'Optimizes facial proportions so both ears remain clearly visible',
      '100% private client-side processing — no server uploads'
    ],
    howToUse: [
      { step: 1, title: 'Upload Profile Photo', description: 'Select a clean passport photo from your phone or PC.' },
      { step: 2, title: 'Auto Compress to Under 100KB', description: 'PixEnhance ensures the file complies with EPFO limits.' },
      { step: 3, title: 'Verify KYC Face Criteria', description: 'Check that 80% face and both ears are clearly visible.' },
      { step: 4, title: 'Download & Upload', description: 'Upload to unifiedportal-mem.epfindia.gov.in.' }
    ],
    usefulInfo: {
      heading: 'EPFO Member Portal Official Photo Upload Guidelines',
      paragraphs: [
        'The photograph must be a recent passport-sized color photograph with a light background.',
        'Both ears should be visible in the photograph, and face coverage should be around 80%.'
      ],
      table: {
        headers: ['Document', 'Dimensions', 'File Size Limit', 'Format / Guidelines'],
        rows: [
          ['UAN Profile Photo', '3.5 cm × 4.5 cm', 'Under 100 KB', 'JPG / JPEG, light background, both ears visible']
        ]
      }
    },
    faqs: [
      { question: 'What is the photo size limit for EPFO UAN profile?', answer: 'The photo must be in JPG format and strictly under 100 KB in file size.' },
      { question: 'Why is my photo rejected on EPFO portal?', answer: 'Rejection happens if the photo is over 100KB, face is not clearly visible, or both ears are covered.' }
    ],
    relatedLinks: [
      { title: 'PAN Card Photo Resizer', slug: 'pan-card-photo-resizer', description: 'PAN card photo tools' },
      { title: 'Driving Licence Resizer', slug: 'driving-licence-photo-resizer', description: 'DL photo resizer' },
      { title: 'Compress JPG to 100KB', slug: 'compress-jpg-to-100kb', description: 'Compress to 100KB' }
    ],
    cta: {
      title: 'Need to Compress Passbook or Cheque for EPFO KYC?',
      description: 'Compress bank passbook or cancelled cheque image under 500KB PDF/JPG.',
      buttonText: 'Compress to 200KB',
      buttonHref: '/compress-jpg-to-200kb'
    }
  },

  // 44. /icai-photo-resizer
  {
    slug: 'icai-photo-resizer',
    tool: 'image-compressor',
    toolConfig: { initialTargetSize: '50kb' },
    title: 'ICAI CA Exam Photo & Signature Resizer | PixEnhance',
    description: 'Format photo (20KB - 50KB, 200x200px) and signature (10KB - 20KB) for ICAI CA Foundation, Inter, and Final SSP portal registrations.',
    h1: 'ICAI CA Photo & Signature Resizer Online Free',
    category: 'Govt Exam Tools',
    badge: 'ICAI Self Service Portal',
    intro: 'Resize candidate photo and signature for the Institute of Chartered Accountants of India (ICAI) Self Service Portal (SSP) for CA Foundation, Intermediate, and Final exams.',
    features: [
      'Tailored for ICAI Self Service Portal (SSP) guidelines',
      'Photo file size 20 KB – 50 KB, 200 × 200 pixels',
      'Signature file size 10 KB – 20 KB with clear contrast',
      'Prevents portal rejection on eservices.icai.org'
    ],
    howToUse: [
      { step: 1, title: 'Upload Photo or Signature', description: 'Select your photo or signature scan.' },
      { step: 2, title: 'Choose Target Size', description: 'Select 50KB for photo or 20KB for signature.' },
      { step: 3, title: 'Check Quality', description: 'Confirm that text and facial features are sharp.' },
      { step: 4, title: 'Download Image', description: 'Upload directly to eservices.icai.org.' }
    ],
    usefulInfo: {
      heading: 'ICAI SSP Official Upload Guidelines',
      paragraphs: [
        'The photograph must be a recent passport-sized color photograph with white background.',
        'Signature must be in black ink on clean white paper.'
      ],
      table: {
        headers: ['Document', 'Dimensions', 'File Size Limit', 'Format'],
        rows: [
          ['Photograph', '200 × 200 pixels', '20 KB – 50 KB', 'JPG / JPEG, white background'],
          ['Signature', '200 × 100 pixels', '10 KB – 20 KB', 'JPG / JPEG, black ink']
        ]
      }
    },
    faqs: [
      { question: 'What is the photo file size limit for ICAI SSP?', answer: 'The photo must be between 20 KB and 50 KB in JPG or JPEG format.' }
    ],
    relatedLinks: [
      { title: 'IBPS Photo Resizer', slug: 'ibps-photo-resizer', description: 'Banking exam tools' },
      { title: 'Signature Resizer 10KB', slug: 'signature-resizer-10kb', description: 'Signature resizer' },
      { title: 'Compress JPG to 50KB', slug: 'compress-jpg-to-50kb', description: 'Compress to 50KB' }
    ],
    cta: {
      title: 'Need to Compress Articleship or Marksheet Documents?',
      description: 'Easily compress marksheets and registration forms for ICAI portal.',
      buttonText: 'Compress to 100KB',
      buttonHref: '/compress-jpg-to-100kb'
    }
  },

  // 45. /ugc-net-photo-resizer
  {
    slug: 'ugc-net-photo-resizer',
    tool: 'image-compressor',
    toolConfig: { initialTargetSize: '50kb' },
    title: 'UGC NET & CSIR NET Photo & Signature Resizer | PixEnhance',
    description: 'Resize photo (10KB - 200KB) and signature (4KB - 30KB) for NTA UGC NET and CSIR NET Assistant Professor & JRF online forms.',
    h1: 'UGC NET Photo & Signature Resizer Online Free',
    category: 'Govt Exam Tools',
    badge: 'NTA UGC NET Official',
    intro: 'Ensure your passport photo (10KB–200KB) and signature (4KB–30KB) meet NTA UGC NET and CSIR NET upload requirements with instant in-browser optimization.',
    features: [
      'Compliant with NTA UGC NET & CSIR NET portals',
      'Photo compressed between 10 KB and 200 KB',
      'Signature compressed between 4 KB and 30 KB',
      'Ensures 80% face coverage without mask'
    ],
    howToUse: [
      { step: 1, title: 'Upload File', description: 'Select your photo or signature scan.' },
      { step: 2, title: 'Select Target Size', description: 'Pick 50KB for photo or 20KB for signature.' },
      { step: 3, title: 'Inspect Face Details', description: 'Ensure 80% face coverage and white background.' },
      { step: 4, title: 'Download File', description: 'Upload to ugcnet.nta.ac.in.' }
    ],
    usefulInfo: {
      heading: 'NTA UGC NET Official Photo Guidelines',
      paragraphs: [
        "The candidate's photograph should show 80% face coverage (without mask) including ears against a white background.",
        'Spectacles are allowed only if used regularly.'
      ],
      table: {
        headers: ['Document', 'Dimensions', 'File Size Limit', 'Format'],
        rows: [
          ['Passport Photo', '3.5 cm × 4.5 cm', '10 KB – 200 KB', 'JPG / JPEG, 80% face'],
          ['Signature Scan', '3.5 cm × 1.5 cm', '4 KB – 30 KB', 'JPG / JPEG, black pen']
        ]
      }
    },
    faqs: [
      { question: 'What is the signature file size limit for UGC NET?', answer: 'The signature must be between 4 KB and 30 KB in JPG format.' }
    ],
    relatedLinks: [
      { title: 'CTET Photo Resizer', slug: 'ctet-photo-resizer', description: 'CTET photo specs' },
      { title: 'CUET Photo Resizer', slug: 'cuet-photo-resizer', description: 'CUET exam tools' },
      { title: 'Signature Resizer 10KB', slug: 'signature-resizer-10kb', description: 'Signature resizer' }
    ],
    cta: {
      title: 'Applying for Assistant Professor or JRF?',
      description: 'Prepare all educational documents and category certificates effortlessly.',
      buttonText: 'All Tools',
      buttonHref: '/tools'
    }
  },

  // 46. /mp-esb-photo-resizer
  {
    slug: 'mp-esb-photo-resizer',
    tool: 'image-compressor',
    toolConfig: { initialTargetSize: '200kb' },
    title: 'MP ESB / Vyapam Photo & Signature Template Resizer | PixEnhance',
    description: 'Format photo (with candidate name & date), signature, and handwritten declaration template (under 200KB) for MP PEB / ESB online exams.',
    h1: 'MP ESB Vyapam Photo & Template Resizer Online',
    category: 'Govt Exam Tools',
    badge: 'MP ESB Official',
    intro: 'Resize your combined profile template containing photo with printed name/date, signature, and handwritten self-declaration to under 200 KB for MP Employees Selection Board (ESB) portal.',
    features: [
      'Tailored for MP ESB / Vyapam profile template upload',
      'Keeps combined template file size strictly under 200 KB',
      'Maintains sharp handwriting declaration and signature readability',
      'Zero server upload — 100% private on your device'
    ],
    howToUse: [
      { step: 1, title: 'Upload Filled Template or Photo', description: 'Upload your scanned MP ESB template page.' },
      { step: 2, title: 'Set Target to 200KB', description: 'Ensures the template satisfies the 200KB portal limit.' },
      { step: 3, title: 'Inspect Text Sharpness', description: 'Verify that the handwritten declaration is crisp.' },
      { step: 4, title: 'Download File', description: 'Upload directly to esb.mp.gov.in.' }
    ],
    usefulInfo: {
      heading: 'MP ESB Vyapam Profile Template Guidelines',
      paragraphs: [
        'MP ESB requires candidates to paste their photo and signature on a standardized template containing a handwritten declaration.',
        "The photograph must have the candidate's name and date of photograph printed clearly on the lower portion."
      ],
      table: {
        headers: ['Document', 'Dimensions', 'File Size Limit', 'Format / Notes'],
        rows: [
          ['Combined Template (Photo+Sign+Declaration)', 'Standard A4 Template Scan', 'Under 200 KB', 'JPG / JPEG, clear handwriting'],
          ['Individual Candidate Photo', '4 cm × 5 cm', 'Under 100 KB', 'JPG, Name & Date printed']
        ]
      }
    },
    faqs: [
      { question: 'What is the file size limit for MP ESB template?', answer: 'The scanned template must be in JPG format and strictly under 200 KB.' }
    ],
    relatedLinks: [
      { title: 'UP Police Resizer', slug: 'up-police-photo-resizer', description: 'UP Police tools' },
      { title: 'SSC Photo Resizer', slug: 'ssc-photo-resizer', description: 'SSC photo sizing' },
      { title: 'Compress JPG to 200KB', slug: 'compress-jpg-to-200kb', description: 'Compress to 200KB' }
    ],
    cta: {
      title: 'Need to Compress MP Patwari or Police Documents?',
      description: 'Compress class 10 marksheet and caste certificates under 100KB.',
      buttonText: 'Compress to 100KB',
      buttonHref: '/compress-jpg-to-100kb'
    }
  },

  // 47. /kvs-photo-resizer
  {
    slug: 'kvs-photo-resizer',
    tool: 'image-compressor',
    toolConfig: { initialTargetSize: '50kb' },
    title: 'KVS Photo & Signature Resizer (PRT, TGT, PGT) | PixEnhance',
    description: 'Resize photograph (10KB - 50KB) and signature (10KB - 20KB) for Kendriya Vidyalaya Sangathan (KVS) PRT, TGT, and PGT teacher recruitment.',
    h1: 'KVS Photo & Signature Resizer Online Free',
    category: 'Govt Exam Tools',
    badge: 'KVS Recruitment Official',
    intro: 'Prepare your passport photo (10KB–50KB) and signature (10KB–20KB) for KVS recruitment portals without losing clarity or facial details.',
    features: [
      'Compliant with KVS recruitment guidelines',
      'Photo compressed between 10 KB and 50 KB',
      'Signature compressed between 10 KB and 20 KB',
      'Instant mobile-friendly processing'
    ],
    howToUse: [
      { step: 1, title: 'Upload File', description: 'Upload photo or signature.' },
      { step: 2, title: 'Select KVS Preset', description: 'Pick 50KB for photo or 20KB for signature.' },
      { step: 3, title: 'Review File', description: 'Ensure plain light background and sharp facial contours.' },
      { step: 4, title: 'Download File', description: 'Upload directly to kvsangathan.nic.in.' }
    ],
    usefulInfo: {
      heading: 'KVS Recruitment Photo Sizing Rules',
      paragraphs: [
        'KVS online applications require passport photographs with light background and clear facial visibility.',
        'Signatures must be in running handwriting and not in capital block letters.'
      ],
      table: {
        headers: ['Document', 'Dimensions', 'File Size Limit', 'Format'],
        rows: [
          ['Color Photo', '3.5 cm × 4.5 cm', '10 KB – 50 KB', 'JPG / JPEG, light background'],
          ['Signature Scan', '3.5 cm × 1.5 cm', '10 KB – 20 KB', 'JPG / JPEG, running handwriting']
        ]
      }
    },
    faqs: [
      { question: 'What is the signature file size limit for KVS forms?', answer: 'The signature must be between 10 KB and 20 KB in JPG format.' }
    ],
    relatedLinks: [
      { title: 'CTET Photo Resizer', slug: 'ctet-photo-resizer', description: 'CTET photo specs' },
      { title: 'Signature Resizer 10KB', slug: 'signature-resizer-10kb', description: 'Signature 10-20KB' },
      { title: 'Compress JPG to 50KB', slug: 'compress-jpg-to-50kb', description: 'Compress to 50KB' }
    ],
    cta: {
      title: 'Applying for Teaching Exams?',
      description: 'Resize certificates and degree documents for KVS, NVS, and DSSSB.',
      buttonText: 'All Tools',
      buttonHref: '/tools'
    }
  },

  // 48. /indian-navy-photo-resizer
  {
    slug: 'indian-navy-photo-resizer',
    tool: 'image-compressor',
    toolConfig: { initialTargetSize: '100kb' },
    title: 'Indian Navy Agniveer Photo & Signature Resizer (SSR & MR) | PixEnhance',
    description: 'Resize photo (max 100KB) and signature (max 50KB) for Indian Navy Agniveer SSR, MR, and Officer online application at joinindiannavy.gov.in.',
    h1: 'Indian Navy Photo & Signature Resizer Online',
    category: 'Govt Exam Tools',
    badge: 'Join Indian Navy Official',
    intro: 'Format photograph and signature for Indian Navy online recruitment. Supports blue or white background guidelines and trims file size under 100 KB for photo and 50 KB for signature.',
    features: [
      'Complies with joinindiannavy.gov.in online specifications',
      'Photo file size compressed strictly under 100 KB',
      'Signature file size compressed strictly under 50 KB',
      'High clarity retention for navy officer & sailor applications'
    ],
    howToUse: [
      { step: 1, title: 'Upload Photo or Signature', description: 'Upload your portrait photo or scanned signature.' },
      { step: 2, title: 'Choose Target File Size', description: 'Pick 100KB for photo or 50KB for signature.' },
      { step: 3, title: 'Check Guidelines', description: 'Ensure blue or white background and clear facial features.' },
      { step: 4, title: 'Download File', description: 'Ready for upload to joinindiannavy.gov.in.' }
    ],
    usefulInfo: {
      heading: 'Indian Navy Official Upload Guidelines',
      paragraphs: [
        'Photographs should have a plain blue or white background with ears clearly visible.',
        'Blurry or pixelated photographs will lead to direct application rejection.'
      ],
      table: {
        headers: ['Document', 'Dimensions', 'File Size Limit', 'Format / Background'],
        rows: [
          ['Color Photo', '3.5 cm × 4.5 cm', 'Under 100 KB', 'JPG / JPEG, blue or white background'],
          ['Signature Scan', '3.5 cm × 1.5 cm', 'Under 50 KB', 'JPG / JPEG, black or blue ink']
        ]
      }
    },
    faqs: [
      { question: 'What background is required for Indian Navy photo?', answer: 'Indian Navy accepts plain blue or clean white background for candidate photographs.' }
    ],
    relatedLinks: [
      { title: 'Agniveer Photo Resizer', slug: 'agniveer-photo-resizer', description: 'Agniveer defence exams' },
      { title: 'NDA CDS Resizer', slug: 'nda-cds-photo-resizer', description: 'NDA CDS exam tools' },
      { title: 'Compress JPG to 100KB', slug: 'compress-jpg-to-100kb', description: 'Compress to 100KB' }
    ],
    cta: {
      title: 'Need to Compress Navy Domicile or Marksheet?',
      description: 'Compress class 10 and 12 marksheets under 200KB easily.',
      buttonText: 'Compress to 100KB',
      buttonHref: '/compress-jpg-to-100kb'
    }
  },

  // 49. /indian-army-photo-resizer
  {
    slug: 'indian-army-photo-resizer',
    tool: 'image-compressor',
    toolConfig: { initialTargetSize: '20kb' },
    title: 'Indian Army Agniveer Rally Photo Resizer (5KB - 20KB) | PixEnhance',
    description: 'Resize photo (5KB - 20KB) and signature (5KB - 10KB) for Join Indian Army Agniveer GD, Tradesman, Clerk, and Technical rally registration.',
    h1: 'Indian Army Agniveer Photo Resizer (5KB - 20KB)',
    category: 'Govt Exam Tools',
    badge: 'Join Indian Army Official',
    intro: 'Scale your passport photo down to 5KB–20KB and signature to 5KB–10KB for joinindianarmy.nic.in rally registrations without pixelation or portal rejection.',
    features: [
      'Dedicated 5 KB – 20 KB compression solver for Indian Army',
      'Signature compression between 5 KB and 10 KB',
      'Preserves facial features and sharpness at small file sizes',
      '100% mobile-friendly for candidates applying from phones'
    ],
    howToUse: [
      { step: 1, title: 'Upload Photo or Signature', description: 'Select your photo or scanned signature.' },
      { step: 2, title: 'Select 20KB or 10KB Limit', description: 'Choose 20KB for photo or 10KB for signature.' },
      { step: 3, title: 'Inspect Live Result', description: 'Verify that the file size is within the strict army range.' },
      { step: 4, title: 'Download File', description: 'Upload directly to joinindianarmy.nic.in.' }
    ],
    usefulInfo: {
      heading: 'Join Indian Army Official Photo Requirements',
      paragraphs: [
        'The Indian Army rally portal requires photos between 5KB and 20KB, and signatures between 5KB and 10KB.',
        'Photographs must be taken with white background and clean shave for non-Sikh candidates.'
      ],
      table: {
        headers: ['Document', 'Dimensions', 'File Size Limit', 'Format / Guidelines'],
        rows: [
          ['Color Photo', '3.5 cm × 4.5 cm', '5 KB – 20 KB', 'JPG / JPEG, plain white background'],
          ['Signature Scan', '3.5 cm × 1.5 cm', '5 KB – 10 KB', 'JPG / JPEG, black pen']
        ]
      }
    },
    faqs: [
      { question: 'What is the photo size limit for Indian Army rally form?', answer: 'The photo must be between 5 KB and 20 KB in JPG format with white background.' }
    ],
    relatedLinks: [
      { title: 'Agniveer Photo Resizer', slug: 'agniveer-photo-resizer', description: 'Agniveer tools' },
      { title: 'Compress JPG to 20KB', slug: 'compress-jpg-to-20kb', description: 'Compress to 20KB' },
      { title: 'Signature Resizer 10KB', slug: 'signature-resizer-10kb', description: 'Signature resizer' }
    ],
    cta: {
      title: 'Need to Compress Army Rally Marksheet Under 200KB?',
      description: 'Compress class 8, 10, or 12 marksheets for Indian Army registration.',
      buttonText: 'Compress to 200KB',
      buttonHref: '/compress-jpg-to-200kb'
    }
  },

  // 50. /wb-police-photo-resizer
  {
    slug: 'wb-police-photo-resizer',
    tool: 'image-compressor',
    toolConfig: { initialTargetSize: '50kb' },
    title: 'West Bengal Police Photo & Signature Resizer (WBPRB) | PixEnhance',
    description: 'Resize photo (10KB - 50KB, 138x177px) and signature (5KB - 20KB, 350x85px) for West Bengal Police Constable and SI recruitment at wbpolice.gov.in.',
    h1: 'WB Police Photo & Signature Resizer Online Free',
    category: 'Govt Exam Tools',
    badge: 'WBPRB Official',
    intro: 'Format photograph (138×177 px, 10KB–50KB) and signature (350×85 px, 5KB–20KB) for West Bengal Police Recruitment Board (WBPRB) online applications.',
    features: [
      'Official WBPRB Constable and SI upload specifications',
      'Photo 138 × 177 pixels, file size 10 KB – 50 KB',
      'Signature 350 × 85 pixels, file size 5 KB – 20 KB',
      'Clean background enhancement with instant download'
    ],
    howToUse: [
      { step: 1, title: 'Upload File', description: 'Select photo or signature.' },
      { step: 2, title: 'Select Target Size', description: 'Choose 50KB for photo or 20KB for signature.' },
      { step: 3, title: 'Verify Dimensions', description: 'Ensure the photo is 138×177 px and signature is 350×85 px.' },
      { step: 4, title: 'Download File', description: 'Upload directly to wbpolice.gov.in or prb.wb.gov.in.' }
    ],
    usefulInfo: {
      heading: 'WBPRB Official Photo & Signature Guidelines',
      paragraphs: [
        'Photographs must be recent color photos taken against a plain light background.',
        'Signature must be done on plain white paper with a black ink pen.'
      ],
      table: {
        headers: ['Document', 'Dimensions', 'File Size Limit', 'Format'],
        rows: [
          ['Candidate Photo', '138 × 177 pixels (3.5 × 4.5 cm)', '10 KB – 50 KB', 'JPG / JPEG, light background'],
          ['Candidate Signature', '350 × 85 pixels', '5 KB – 20 KB', 'JPG / JPEG, black ink']
        ]
      }
    },
    faqs: [
      { question: 'What is the signature size for West Bengal Police?', answer: 'The signature must be 350 × 85 pixels, between 5 KB and 20 KB in JPG format.' }
    ],
    relatedLinks: [
      { title: 'UP Police Resizer', slug: 'up-police-photo-resizer', description: 'Police exam tools' },
      { title: 'SSC Photo Resizer', slug: 'ssc-photo-resizer', description: 'SSC photo sizing' },
      { title: 'Signature Resizer 10KB', slug: 'signature-resizer-10kb', description: 'Signature 10-20KB' }
    ],
    cta: {
      title: 'Applying for WB Police Constable or SI?',
      description: 'Resize all your application photos, signatures, and ID proofs instantly.',
      buttonText: 'All Tools',
      buttonHref: '/tools'
    }
  }
,

  // 51. /us-passport-photo-resizer
  {
    slug: 'us-passport-photo-resizer',
    tool: 'passport-resizer',
    title: 'US Passport Photo Resizer 2x2 Online (Official Specs) | PixEnhance',
    description: 'Format official 2x2 inch (600x600 px to 1200x1200 px) US passport photos online. Compliant with US Department of State DS-11 and DS-82 renewal requirements.',
    h1: 'US Passport Photo Resizer (2x2 Inches) Online',
    category: 'US & Global Tools',
    badge: 'US State Dept Compliant',
    intro: 'Create official 2 Ã— 2 inch (51 Ã— 51 mm) passport photos for US passport applications and DS-82 renewals. Ensures exact 600Ã—600 pixel square resolution, plain white background, 50% to 69% head height ratio, and file size strictly under 240 KB.',
    features: [
      'Official 2 Ã— 2 inch (600 Ã— 600 to 1200 Ã— 1200 px) format',
      'Compliant with US Department of State DS-82 / DS-11 guidelines',
      'Head height calibrated between 50% and 69% of image height',
      '100% private in-browser generation â€” zero server uploads'
    ],
    howToUse: [
      { step: 1, title: 'Upload Frontal Portrait', description: 'Upload a well-lit photo looking straight into the camera.' },
      { step: 2, title: 'Check 2x2 Square Alignment', description: 'Ensure neutral expression, eyes open, and both ears visible.' },
      { step: 3, title: 'Review File Size Limit', description: 'The tool ensures file size stays well below the 240 KB cap.' },
      { step: 4, title: 'Download Ready Photo', description: 'Ready for digital submission or 4x6 print at local pharmacy.' }
    ],
    usefulInfo: {
      heading: 'US Department of State Passport Photo Specifications',
      paragraphs: [
        'The US Department of State requires a 2 x 2 inch (51 x 51 mm) color photo taken within the last 6 months.',
        'Eyeglasses must be removed for passport photos unless medically documented. The background must be uniform, plain white or off-white with no shadows.'
      ],
      table: {
        headers: ['Specification', 'Requirement', 'Acceptable Range'],
        rows: [
          ['Dimensions', '2 Ã— 2 inches (51 Ã— 51 mm)', '600 Ã— 600 px min to 1200 Ã— 1200 px max'],
          ['File Size Limit', 'Under 240 KB', 'Typically 50 KB â€“ 200 KB in JPG format'],
          ['Head Height', '1 inch to 1 3/8 inches', '50% to 69% of the total image height'],
          ['Eye Height', '1 1/8 inches to 1 3/8 inches', '56% to 69% from the bottom of the photo']
        ]
      }
    },
    faqs: [
      { question: 'Can I wear glasses in a US passport photo?', answer: 'No. As of 2016, eyeglasses are strictly not allowed in US passport photos unless accompanied by a signed medical certificate from a physician.' },
      { question: 'What is the digital file size for online US passport renewal?', answer: 'The photo must be between 600x600 and 1200x1200 pixels, in JPEG format, and equal to or less than 240 KB.' }
    ],
    relatedLinks: [
      { title: 'DV Lottery Photo Checker', slug: 'dv-lottery-photo-checker-resizer', description: 'Green card lottery tool' },
      { title: 'US Visa Photo Resizer', slug: 'us-visa-photo-resizer', description: 'DS-160 visa photo' },
      { title: 'Indian Passport Resizer', slug: 'indian-passport-photo-resizer', description: 'Indian PSK photo' }
    ],
    cta: {
      title: 'Applying for a US Visa or Green Card?',
      description: 'Format photos for DS-160, USCIS Form I-485, and DV Lottery instantly.',
      buttonText: 'DV Lottery Resizer',
      buttonHref: '/dv-lottery-photo-checker-resizer'
    }
  },

  // 52. /dv-lottery-photo-checker-resizer
  {
    slug: 'dv-lottery-photo-checker-resizer',
    tool: 'passport-resizer',
    title: 'DV Lottery Photo Checker & Resizer 2026 / 2027 (Free) | PixEnhance',
    description: 'Free Diversity Visa (DV Lottery) photo checker and resizer. Formats 600x600 px, 240KB, 24-bit sRGB color, strictly compliant with US State Dept rules.',
    h1: 'DV Lottery Photo Checker & Resizer Online',
    category: 'US & Global Tools',
    badge: 'State Dept DV-2026 Ready',
    intro: 'Ensure your Green Card Diversity Visa Lottery application is not disqualified. PixEnhance formats and verifies your photo to exact 600 Ã— 600 pixels, under 240 KB, 24-bit color depth, and correct biometric head proportions.',
    features: [
      'Official 600 Ã— 600 pixels square dimension guarantee',
      'File size verified under the strict 240 KB maximum threshold',
      '24-bit sRGB color space with pure white/off-white background',
      'Checks head position between 50% and 69% of image height'
    ],
    howToUse: [
      { step: 1, title: 'Upload Photo', description: 'Upload a clear, recent portrait against a light background.' },
      { step: 2, title: 'Automatic 600x600 Sizing', description: 'PixEnhance crops and scales to exact State Department dimensions.' },
      { step: 3, title: 'Verify Quality Check', description: 'Confirm eyes are open, no glasses, and neutral expression.' },
      { step: 4, title: 'Download Compliant Photo', description: 'Ready to submit on the official dvprogram.state.gov portal.' }
    ],
    usefulInfo: {
      heading: 'Why Thousands are Disqualified in the DV Lottery Every Year',
      paragraphs: [
        'The US Department of State automatically disqualifies over 30% of Diversity Visa applications before the lottery draw due to non-compliant digital photographs.',
        'Common reasons for disqualification include incorrect 600x600 pixel dimensions, file size exceeding 240 KB, shadows on the background, wearing glasses, or using a photo older than 6 months.'
      ],
      table: {
        headers: ['DV Lottery Parameter', 'Official Rule', 'PixEnhance Output'],
        rows: [
          ['Image Dimensions', 'Exactly 600 Ã— 600 pixels', '600 Ã— 600 pixels (1:1 square)'],
          ['Color Format', '24-bit color in sRGB space', '24-bit sRGB JPEG'],
          ['File Size', 'Equal to or less than 240 KB', 'Typically 90 KB â€“ 160 KB'],
          ['Compression Ratio', 'Less than or equal to 20:1', 'Optimized quantization matrix']
        ]
      }
    },
    faqs: [
      { question: 'What is the required photo size for DV Lottery 2026/2027?', answer: 'The photo must be exactly 600 x 600 pixels, in JPEG format, and no larger than 240 KB.' },
      { question: 'Can I reuse last year photo for DV Lottery?', answer: 'No. Reusing a photo from a previous year application will result in immediate disqualification by US State Department facial recognition systems.' }
    ],
    relatedLinks: [
      { title: 'US Passport Photo Resizer', slug: 'us-passport-photo-resizer', description: 'US passport photo specs' },
      { title: 'US Visa Photo Resizer', slug: 'us-visa-photo-resizer', description: 'US visa DS-160 specs' },
      { title: 'Green Card Photo Resizer', slug: 'green-card-photo-resizer', description: 'USCIS green card photo' }
    ],
    cta: {
      title: 'Need a US Visa Photo for Form DS-160?',
      description: 'Format photos for B1/B2, F1 student, and H1B visa applications.',
      buttonText: 'US Visa Photo Resizer',
      buttonHref: '/us-visa-photo-resizer'
    }
  },

  // 53. /us-visa-photo-resizer
  {
    slug: 'us-visa-photo-resizer',
    tool: 'passport-resizer',
    title: 'US Visa Photo Resizer (DS-160 / B1-B2 / F1 / H1B) | PixEnhance',
    description: 'Resize photo for US Visa Form DS-160 online application. Sets 600x600 px square, under 240 KB, 300 DPI, compliant with CEAC US Embassy upload.',
    h1: 'US Visa Photo Resizer (DS-160) Online',
    category: 'US & Global Tools',
    badge: 'DS-160 / CEAC Compliant',
    intro: 'Format your photo for the US Visa DS-160 online application portal (ceac.state.gov). Guarantees the photo passes the official State Department online photo validator with exact 600Ã—600 pixel resolution and file size under 240 KB.',
    features: [
      'Passes CEAC DS-160 online photo upload test',
      'Exact 600 Ã— 600 pixels square dimensions (300 DPI)',
      'File size compressed between 50 KB and 240 KB',
      'Supports B1/B2 tourist, F1 student, and H-1B work visas'
    ],
    howToUse: [
      { step: 1, title: 'Upload Portrait Photo', description: 'Select a clean front-facing photo taken against a white background.' },
      { step: 2, title: 'Auto 600x600 Adjustment', description: 'The tool aligns the biometric oval and crops to 1:1 square.' },
      { step: 3, title: 'Check Contrast & Clarity', description: 'Confirm that both ears, neck, and shoulders are clearly visible.' },
      { step: 4, title: 'Download Validated Photo', description: 'Upload directly to the CEAC DS-160 portal.' }
    ],
    usefulInfo: {
      heading: 'US Visa DS-160 Official Photo Guidelines',
      paragraphs: [
        'The US Department of State requires all nonimmigrant visa applicants to upload a digital photograph when filling Form DS-160.',
        'Applicants must have a neutral facial expression with both eyes open. Uniforms should not be worn in photos, except religious attire worn daily.'
      ],
      table: {
        headers: ['Parameter', 'Specification', 'Rule'],
        rows: [
          ['Pixel Dimensions', '600 Ã— 600 px min to 1200 Ã— 1200 px max', 'Square aspect ratio (1:1)'],
          ['File Size', 'Max 240 KB', 'Must be in JPEG format'],
          ['Background', 'Plain white or off-white', 'No patterns or shadows allowed'],
          ['Head Size', '50% to 69% of photo height', 'Crown to chin measurement']
        ]
      }
    },
    faqs: [
      { question: 'Why does the DS-160 portal reject my photo?', answer: 'The most common reasons are incorrect aspect ratio (not 1:1 square), file size exceeding 240 KB, or wearing eyeglasses.' }
    ],
    relatedLinks: [
      { title: 'US Passport Photo Resizer', slug: 'us-passport-photo-resizer', description: 'US passport photo tool' },
      { title: 'DV Lottery Photo Checker', slug: 'dv-lottery-photo-checker-resizer', description: 'DV lottery photo tool' },
      { title: 'Green Card Photo Resizer', slug: 'green-card-photo-resizer', description: 'USCIS photo tool' }
    ],
    cta: {
      title: 'Applying for US Permanent Residency?',
      description: 'Format photos for USCIS Form I-485 and green card renewals.',
      buttonText: 'Green Card Photo Resizer',
      buttonHref: '/green-card-photo-resizer'
    }
  },

  // 54. /green-card-photo-resizer
  {
    slug: 'green-card-photo-resizer',
    tool: 'passport-resizer',
    title: 'Green Card Photo Resizer (USCIS Form I-485 / I-90) | PixEnhance',
    description: 'Format 2x2 inch (51x51mm, 600x600 px) photos for USCIS Green Card applications, Form I-485, I-130, I-765 EAD, and I-90 renewals.',
    h1: 'USCIS Green Card Photo Resizer Online',
    category: 'US & Global Tools',
    badge: 'USCIS Official Specs',
    intro: 'Prepare compliant passport-style photos for US Citizenship and Immigration Services (USCIS). Meets all standards for Form I-485 Adjustment of Status, Form I-90 Green Card Renewal, and Form I-765 Employment Authorization (EAD).',
    features: [
      'Official 2 Ã— 2 inch (51 Ã— 51 mm) USCIS specifications',
      '600 Ã— 600 pixels square output in high-resolution JPG',
      'Plain white background compliance with zero shadows',
      '100% private client-side processing â€” confidential'
    ],
    howToUse: [
      { step: 1, title: 'Upload Your Photo', description: 'Upload a recent portrait photo taken within the last 30 days.' },
      { step: 2, title: 'Inspect USCIS Biometrics', description: 'Ensure head height occupies between 1 inch and 1 3/8 inches.' },
      { step: 3, title: 'Confirm White Background', description: 'Check that lighting is balanced across the face.' },
      { step: 4, title: 'Download Image', description: 'Print on photo paper or upload to myUSCIS online filing.' }
    ],
    usefulInfo: {
      heading: 'USCIS Official Photo Standards for Immigration Forms',
      paragraphs: [
        'USCIS strictly enforces Department of State photograph guidelines for all immigration benefit applications.',
        'Applicants must submit two identical 2x2 inch color photos printed on thin, glossy or matte photo paper, or upload digital equivalents for online filings.'
      ],
      table: {
        headers: ['Criteria', 'USCIS Standard', 'Allowed Range'],
        rows: [
          ['Dimensions', '2 Ã— 2 inches (51 Ã— 51 mm)', '600 Ã— 600 pixels (300 DPI)'],
          ['Face Coverage', '1 inch to 1 3/8 inches (25 to 35 mm)', '50% to 69% of the photo height'],
          ['File Format', 'JPEG / JPG', 'Under 240 KB for digital filing'],
          ['Attire', 'Everyday clothing', 'No uniforms, hats, or glasses']
        ]
      }
    },
    faqs: [
      { question: 'How many photos are required for USCIS Form I-485?', answer: 'For paper filing, USCIS generally requires 2 identical 2x2 inch passport-style color photos with your name and A-number written lightly on the back in pencil.' }
    ],
    relatedLinks: [
      { title: 'US Passport Photo Resizer', slug: 'us-passport-photo-resizer', description: 'US passport photo specs' },
      { title: 'US Visa Photo Resizer', slug: 'us-visa-photo-resizer', description: 'US visa DS-160 tool' },
      { title: 'Canadian Passport Resizer', slug: 'canadian-passport-photo-resizer', description: 'Canada passport specs' }
    ],
    cta: {
      title: 'Applying for Canadian Immigration or Express Entry?',
      description: 'Format photos for IRCC Express Entry and Canadian passports.',
      buttonText: 'Canadian Photo Resizer',
      buttonHref: '/canadian-passport-photo-resizer'
    }
  },

  // 55. /canadian-passport-photo-resizer
  {
    slug: 'canadian-passport-photo-resizer',
    tool: 'passport-resizer',
    title: 'Canadian Passport & Visa Photo Resizer (50x70mm) | PixEnhance',
    description: 'Format official 50mm x 70mm (35mm face) photos for Canadian passport applications, PR cards, and IRCC Express Entry online portals.',
    h1: 'Canadian Passport & Visa Photo Resizer (50x70mm)',
    category: 'US & Global Tools',
    badge: 'IRCC Canada Official',
    intro: 'Resize your photo strictly according to Immigration, Refugees and Citizenship Canada (IRCC) standards: 50 mm wide by 70 mm high with face height between 31 mm and 36 mm.',
    features: [
      'Official 50 mm Ã— 70 mm (2 Ã— 2 3/4 inches) format',
      'Face length calibrated strictly between 31 mm and 36 mm',
      'Plain white or light-colored background enhancement',
      'Ready for IRCC online portals and in-person passport applications'
    ],
    howToUse: [
      { step: 1, title: 'Upload Photo', description: 'Select a high-resolution front-facing photo.' },
      { step: 2, title: 'Verify 50x70mm Ratio', description: 'Check that face height is between 31mm and 36mm.' },
      { step: 3, title: 'Inspect Lighting', description: 'Ensure neutral expression and no glare.' },
      { step: 4, title: 'Download Image', description: 'Ready for IRCC upload or printing.' }
    ],
    usefulInfo: {
      heading: 'Government of Canada Passport Photo Specifications',
      paragraphs: [
        'Unlike US passport photos (which are 2x2 inch square), Canadian passport photos must measure 50 mm wide by 70 mm high (2 inches wide by 2 3/4 inches high).',
        'The length of the face from chin to natural crown of the head must be between 31 mm (1 1/4 inches) and 36 mm (1 7/16 inches).'
      ],
      table: {
        headers: ['Dimension', 'Official Canadian Rule', 'Pixel Equivalent (300 DPI)'],
        rows: [
          ['Width', '50 mm (2.0 in)', '590 pixels'],
          ['Height', '70 mm (2.75 in)', '826 pixels'],
          ['Face Length', '31 mm to 36 mm', '366 to 425 pixels'],
          ['Color Space', 'sRGB or high quality color', 'Uniform light background']
        ]
      }
    },
    faqs: [
      { question: 'Are Canadian passport photos the same size as US passport photos?', answer: 'No. US photos are 51x51mm (2x2 inches square), whereas Canadian photos are 50x70mm (rectangular).' }
    ],
    relatedLinks: [
      { title: 'US Passport Photo Resizer', slug: 'us-passport-photo-resizer', description: 'US passport photo tool' },
      { title: 'Schengen Visa Photo Resizer', slug: 'schengen-visa-photo-resizer', description: 'Europe visa photo specs' },
      { title: 'UK Passport Photo Resizer', slug: 'uk-passport-photo-resizer', description: 'UK passport photo tool' }
    ],
    cta: {
      title: 'Traveling to Europe?',
      description: 'Format photos for Schengen visa applications for France, Germany, and Italy.',
      buttonText: 'Schengen Visa Resizer',
      buttonHref: '/schengen-visa-photo-resizer'
    }
  },

  // 56. /schengen-visa-photo-resizer
  {
    slug: 'schengen-visa-photo-resizer',
    tool: 'passport-resizer',
    title: 'Schengen Visa Photo Resizer (35x45mm) | PixEnhance',
    description: 'Format official 35mm x 45mm Schengen visa photos for France, Germany, Italy, Spain, and all 29 European Schengen member countries.',
    h1: 'Schengen Visa Photo Resizer (35x45mm) Online',
    category: 'US & Global Tools',
    badge: 'European Union Standard',
    intro: 'Create official 35 mm Ã— 45 mm biometric photos for Schengen visa applications (VFS Global / TLScontact / BLS International). Ensures 70% to 80% face coverage and compliant light grey background.',
    features: [
      'Official 35 mm Ã— 45 mm European standard format',
      '70% to 80% face coverage (32 mm to 36 mm head height)',
      'Light grey or plain light background compliant',
      'Accepted by all 29 Schengen member states'
    ],
    howToUse: [
      { step: 1, title: 'Upload Photo', description: 'Select a clean portrait photo without glasses or headwear.' },
      { step: 2, title: 'Check 35x45mm Ratio', description: 'PixEnhance crops the image to exact Schengen proportions.' },
      { step: 3, title: 'Inspect Face Height', description: 'Ensure the face covers 70% to 80% of the frame.' },
      { step: 4, title: 'Download Image', description: 'Ready for submission with your Schengen visa dossier.' }
    ],
    usefulInfo: {
      heading: 'Schengen Visa Photograph Guidelines',
      paragraphs: [
        'European Union regulations require Schengen visa photographs to measure 35 mm wide by 45 mm high.',
        'The face must occupy 70% to 80% of the photograph (measuring 32 mm to 36 mm from chin to top of hair). The background must be light grey or neutral.'
      ],
      table: {
        headers: ['Specification', 'Requirement', 'Dimensions at 300 DPI'],
        rows: [
          ['Width', '35 mm', '413 pixels'],
          ['Height', '45 mm', '531 pixels'],
          ['Face Coverage', '70% â€“ 80% of image', '32 mm to 36 mm'],
          ['Background', 'Light grey or neutral light', 'No patterns or dark shadows']
        ]
      }
    },
    faqs: [
      { question: 'What background color is required for Schengen visa photo?', answer: 'The background must be light grey or light plain background. Pure white is often accepted, but light grey is the European recommendation.' }
    ],
    relatedLinks: [
      { title: 'UK Passport Photo Resizer', slug: 'uk-passport-photo-resizer', description: 'UK passport photo tool' },
      { title: 'US Visa Photo Resizer', slug: 'us-visa-photo-resizer', description: 'US visa DS-160 tool' },
      { title: 'Visa Photo Resizer', slug: 'visa-photo-resizer', description: 'Global visa photo tools' }
    ],
    cta: {
      title: 'Applying for a UK Visa or British Passport?',
      description: 'Format photos for HM Passport Office and UK Visas and Immigration (UKVI).',
      buttonText: 'UK Passport Resizer',
      buttonHref: '/uk-passport-photo-resizer'
    }
  },

  // 57. /uk-passport-photo-resizer
  {
    slug: 'uk-passport-photo-resizer',
    tool: 'passport-resizer',
    title: 'UK Passport Photo Resizer (HM Passport Office Specs) | PixEnhance',
    description: 'Resize photo for UK Passport online application (gov.uk). Sets 35x45mm or 750x900 px digital photo code standards for HM Passport Office.',
    h1: 'UK Passport Photo Resizer Online Free',
    category: 'US & Global Tools',
    badge: 'HM Passport Office Compliant',
    intro: 'Resize and optimize digital photos for HM Passport Office and UK Visas and Immigration (UKVI). Meets all standards for gov.uk online passport renewals: 35 mm Ã— 45 mm or 750 Ã— 900 pixels digital resolution.',
    features: [
      'Compliant with gov.uk digital photo upload guidelines',
      'Minimum resolution: 750 pixels wide by 900 pixels high',
      'File size optimized between 50 KB and 10 MB',
      'Light grey or cream background compliance'
    ],
    howToUse: [
      { step: 1, title: 'Upload Photo', description: 'Select a clear portrait taken from 1.5 meters distance.' },
      { step: 2, title: 'Verify Biometrics', description: 'Ensure neutral expression, mouth closed, and eyes looking at camera.' },
      { step: 3, title: 'Check Digital Dimensions', description: 'The tool ensures resolution exceeds 750x900 pixels.' },
      { step: 4, title: 'Download File', description: 'Upload directly to the gov.uk passport renewal service.' }
    ],
    usefulInfo: {
      heading: 'HM Passport Office Digital Photo Rules',
      paragraphs: [
        'When applying online at gov.uk, your digital photo must be at least 750 pixels wide and 900 pixels high, and between 50 KB and 10 MB in file size.',
        'The background must be plain light grey or cream. Pure white backgrounds or backgrounds with shadows can cause automated system rejection.'
      ],
      table: {
        headers: ['Specification', 'Digital Online Standard', 'Printed Standard'],
        rows: [
          ['Dimensions', '750 Ã— 900 pixels min', '35 mm Ã— 45 mm'],
          ['File Size', '50 KB to 10 MB', 'High-quality photographic paper'],
          ['Head Measurement', '29 mm to 34 mm', '70% of photo height'],
          ['Allowed Background', 'Plain light grey or cream', 'Plain light grey or cream']
        ]
      }
    },
    faqs: [
      { question: 'What is the digital photo size for UK passport online?', answer: 'The digital photo must be at least 750 pixels wide by 900 pixels high, and between 50 KB and 10 MB in file size.' }
    ],
    relatedLinks: [
      { title: 'Schengen Visa Photo Resizer', slug: 'schengen-visa-photo-resizer', description: 'European visa specs' },
      { title: 'US Passport Photo Resizer', slug: 'us-passport-photo-resizer', description: 'US passport photo specs' },
      { title: 'Australian Passport Resizer', slug: 'australian-passport-photo-resizer', description: 'Australia passport specs' }
    ],
    cta: {
      title: 'Applying for Australian Visa or Passport?',
      description: 'Format photos for Australian Passport Office and ImmiAccount.',
      buttonText: 'Australian Photo Resizer',
      buttonHref: '/australian-passport-photo-resizer'
    }
  },

  // 58. /australian-passport-photo-resizer
  {
    slug: 'australian-passport-photo-resizer',
    tool: 'passport-resizer',
    title: 'Australian Passport Photo Resizer (35x45mm) | PixEnhance',
    description: 'Format official 35mm x 45mm photos for Australian passports and ImmiAccount visas. Compliant with Australian Passport Office (passports.gov.au).',
    h1: 'Australian Passport Photo Resizer Online',
    category: 'US & Global Tools',
    badge: 'Australian Passport Office',
    intro: 'Prepare official Australian passport photos according to passports.gov.au requirements: 35 mm to 40 mm wide by 45 mm to 50 mm high, with crown-to-chin face size between 32 mm and 36 mm.',
    features: [
      'Official 35 mm Ã— 45 mm Australian specification',
      'Face length calibrated between 32 mm and 36 mm',
      'Plain white or light grey background with balanced lighting',
      'Accepted for Australian passports and Department of Home Affairs visas'
    ],
    howToUse: [
      { step: 1, title: 'Upload Photo', description: 'Select a clear frontal portrait with neutral expression.' },
      { step: 2, title: 'Verify Face Height', description: 'Ensure face length is between 32mm and 36mm.' },
      { step: 3, title: 'Check Lighting', description: 'Confirm no shadows behind ears or under chin.' },
      { step: 4, title: 'Download Image', description: 'Ready for print or online visa lodgement.' }
    ],
    usefulInfo: {
      heading: 'Australian Passport Office Photo Specifications',
      paragraphs: [
        'The Australian Passport Office has strict requirements: photos must be 35mm to 40mm wide by 45mm to 50mm high.',
        'The size of the face from crown to chin must be between 32mm and 36mm. No smiling is permitted.'
      ],
      table: {
        headers: ['Parameter', 'Australian Standard', 'Allowed Range'],
        rows: [
          ['Photo Dimensions', '35 mm Ã— 45 mm', 'Up to 40 mm Ã— 50 mm'],
          ['Face Length', '32 mm to 36 mm', 'From chin to top of hair'],
          ['Background', 'Plain white or light grey', 'Uniform color without shadows'],
          ['Expression', 'Neutral expression', 'Mouth closed, looking straight']
        ]
      }
    },
    faqs: [
      { question: 'Can I smile in an Australian passport photo?', answer: 'No. Australian regulations mandate a neutral expression with mouth completely closed.' }
    ],
    relatedLinks: [
      { title: 'UK Passport Photo Resizer', slug: 'uk-passport-photo-resizer', description: 'UK passport photo tool' },
      { title: 'US Passport Photo Resizer', slug: 'us-passport-photo-resizer', description: 'US passport photo specs' },
      { title: 'Visa Photo Resizer', slug: 'visa-photo-resizer', description: 'Global visa photo tools' }
    ],
    cta: {
      title: 'Selling on Amazon or Shopify?',
      description: 'Format product listing images to exact marketplace dimensions.',
      buttonText: 'Amazon Image Resizer',
      buttonHref: '/amazon-product-image-resizer'
    }
  },

  // 59. /amazon-product-image-resizer
  {
    slug: 'amazon-product-image-resizer',
    tool: 'image-resizer',
    title: 'Amazon Product Image Resizer (2000x2000 Pure White) | PixEnhance',
    description: 'Format Amazon main product images: 2000x2000 px, 1:1 square, RGB 255 pure white background, under 10MB. Enables high-resolution Amazon zoom.',
    h1: 'Amazon Product Image Resizer Online Free',
    category: 'E-Commerce Tools',
    badge: 'Amazon Seller Central',
    intro: 'Optimize your Amazon listing photos for maximum conversions. Formats images to 2000 Ã— 2000 pixels (1:1 square) to activate Amazon dynamic hover-zoom feature, with pure white background compliance (RGB 255, 255, 255).',
    features: [
      '2000 Ã— 2000 pixels resolution enables Amazon hover zoom',
      'Pure white background compliance (RGB 255, 255, 255)',
      'Product fills at least 85% of the image frame',
      'Optimizes file size under 10 MB in high-fidelity JPG / PNG'
    ],
    howToUse: [
      { step: 1, title: 'Upload Product Photo', description: 'Upload your studio or smartphone product shot.' },
      { step: 2, title: 'Select 2000x2000 Preset', description: 'Ensures optimal zoom functionality on desktop and mobile.' },
      { step: 3, title: 'Verify Pure White Background', description: 'Check that the edges blend seamlessly with white.' },
      { step: 4, title: 'Download & Upload', description: 'Upload directly to Amazon Seller Central listing editor.' }
    ],
    usefulInfo: {
      heading: 'Amazon Seller Central Main Image Requirements',
      paragraphs: [
        'Amazon requires main listing images to have a pure white background (RGB values 255, 255, 255) so the product appears floating seamlessly on the Amazon product detail page.',
        'Images must be at least 1000 pixels on their longest side for zoom, but 2000 x 2000 pixels is the industry benchmark for ultra-sharp customer zoom experience.'
      ],
      table: {
        headers: ['Requirement', 'Amazon Rule', 'PixEnhance Output'],
        rows: [
          ['Dimensions', '1000 px min to 10,000 px max', '2000 Ã— 2000 pixels (Optimal Zoom)'],
          ['Aspect Ratio', '1:1 Square recommended', '1:1 Square'],
          ['Background Color', 'RGB 255, 255, 255 (Pure White)', 'Pure White background compatible'],
          ['File Size Limit', 'Under 10 MB', 'Lossless compression under 2 MB']
        ]
      }
    },
    faqs: [
      { question: 'What image size enables zoom on Amazon?', answer: 'Images with dimensions of at least 1000 pixels on the longest side enable zoom. Amazon recommends 2000 x 2000 pixels for optimal zoom quality.' },
      { question: 'Why does Amazon suppress product listings?', answer: 'The most frequent cause is non-white backgrounds, text or watermarks on the main image, or image dimensions smaller than 1000 pixels.' }
    ],
    relatedLinks: [
      { title: 'Shopify Image Resizer', slug: 'shopify-image-resizer', description: 'Shopify product image specs' },
      { title: 'Etsy Listing Resizer', slug: 'etsy-listing-photo-resizer', description: 'Etsy photo dimensions' },
      { title: 'eBay Photo Resizer', slug: 'ebay-photo-resizer', description: 'eBay seller image tool' }
    ],
    cta: {
      title: 'Selling on Shopify or Etsy Too?',
      description: 'Format photos for multi-channel e-commerce stores in seconds.',
      buttonText: 'Shopify Image Resizer',
      buttonHref: '/shopify-image-resizer'
    }
  },

  // 60. /shopify-image-resizer
  {
    slug: 'shopify-image-resizer',
    tool: 'image-resizer',
    title: 'Shopify Product Image Resizer (2048x2048 Fast Loading) | PixEnhance',
    description: 'Resize and optimize Shopify product photos to 2048x2048 square. Speeds up Shopify store load times, boosts mobile conversions, and enables high-res zoom.',
    h1: 'Shopify Product Image Resizer & Optimizer',
    category: 'E-Commerce Tools',
    badge: 'Shopify Recommended',
    intro: 'Resize product images to Shopify recommended 2048 Ã— 2048 pixels square format. Compresses heavy camera photos without noticeable quality loss to dramatically improve Shopify Core Web Vitals and store loading speed.',
    features: [
      'Official Shopify recommended 2048 Ã— 2048 px square format',
      'Trims file size by up to 75% for fast mobile page speed',
      'Maintains ultra-sharp clarity for high-resolution product zoom',
      '100% private in-browser client-side compression'
    ],
    howToUse: [
      { step: 1, title: 'Upload Product Photo', description: 'Drag and drop your high-resolution product photo.' },
      { step: 2, title: 'Select 2048x2048 Square', description: 'The ideal dimension for Shopify theme responsiveness.' },
      { step: 3, title: 'Check Quality Slider', description: 'Balance file size and crispness for maximum speed.' },
      { step: 4, title: 'Download Image', description: 'Upload directly to your Shopify Admin Product section.' }
    ],
    usefulInfo: {
      heading: 'Why Image Optimization is Critical for Shopify Conversion Rates',
      paragraphs: [
        'Shopify recommends 2048 x 2048 pixels for square product photos because it strikes the perfect balance between crisp image zoom and fast load times.',
        'Uncompressed product photos are the #1 cause of slow Shopify stores. A 1-second delay in page load time can reduce e-commerce conversions by up to 7%.'
      ],
      table: {
        headers: ['Image Type', 'Shopify Recommended Dimensions', 'Ideal File Size'],
        rows: [
          ['Product Photos', '2048 Ã— 2048 pixels (1:1 square)', 'Under 500 KB'],
          ['Collection Banners', '1600 Ã— 1050 pixels (16:9 widescreen)', 'Under 800 KB'],
          ['Slideshow / Hero', '1920 Ã— 1080 pixels', 'Under 1 MB'],
          ['Blog Featured Images', '1200 Ã— 628 pixels', 'Under 300 KB']
        ]
      }
    },
    faqs: [
      { question: 'What is the best image size for Shopify products?', answer: 'Shopify officially recommends 2048 x 2048 pixels for square product images to provide high-resolution zoom without slowing down site speed.' }
    ],
    relatedLinks: [
      { title: 'Amazon Image Resizer', slug: 'amazon-product-image-resizer', description: 'Amazon seller image tool' },
      { title: 'Etsy Listing Resizer', slug: 'etsy-listing-photo-resizer', description: 'Etsy photo dimensions' },
      { title: 'Compress JPG', slug: 'compress-jpg', description: 'General JPG compression' }
    ],
    cta: {
      title: 'Need to Batch Resize Images for Shopify?',
      description: 'Optimize your entire product catalog in minutes with PixEnhance.',
      buttonText: 'Bulk Image Resizer',
      buttonHref: '/bulk-image-resizer'
    }
  },

  // 61. /etsy-listing-photo-resizer
  {
    slug: 'etsy-listing-photo-resizer',
    tool: 'image-resizer',
    title: 'Etsy Listing Photo Resizer (2000px 4:3 Ratio) | PixEnhance',
    description: 'Format Etsy listing photos: 2000 px shortest side, 4:3 or 5:4 aspect ratio, under 20MB. Prevents awkward thumbnail cropping in Etsy search results.',
    h1: 'Etsy Listing Photo Resizer Online Free',
    category: 'E-Commerce Tools',
    badge: 'Etsy Seller Handbook',
    intro: 'Format product listing photos to Etsy official recommendations: at least 2000 pixels on the shortest side with a 4:3 aspect ratio. Prevents your primary product photo from being cut off in Etsy search thumbnails.',
    features: [
      'Sets official 4:3 aspect ratio to avoid awkward Etsy thumbnail crops',
      'Minimum 2000 pixels shortest side for crisp zoom functionality',
      'Lossless compression keeps file size well below the 20 MB cap',
      'Enhances color vibrance and lighting for higher click-through rates'
    ],
    howToUse: [
      { step: 1, title: 'Upload Listing Image', description: 'Upload your handmade, vintage, or craft supply photo.' },
      { step: 2, title: 'Select 4:3 Etsy Ratio', description: 'Ensures the thumbnail centers perfectly in Etsy search.' },
      { step: 3, title: 'Preview Thumbnail Frame', description: 'Check that the main item is not positioned too close to edges.' },
      { step: 4, title: 'Download Image', description: 'Upload directly to your Etsy Shop Manager.' }
    ],
    usefulInfo: {
      heading: 'How to Prevent Etsy from Cropping Your Listing Photos',
      paragraphs: [
        'Etsy displays search results in a 4:3 aspect ratio. When sellers upload square 1:1 or vertical 9:16 photos, Etsy automatically crops the top and bottom, often cutting off product details.',
        'By formatting your primary listing photo to 2000 pixels wide by 1500 pixels high (4:3 ratio), your thumbnail displays exactly as intended on desktop and the Etsy mobile app.'
      ],
      table: {
        headers: ['Etsy Placement', 'Recommended Dimensions', 'Aspect Ratio'],
        rows: [
          ['Listing Item Photos', '2000 px min shortest side (e.g. 2666 Ã— 2000)', '4:3 or 5:4 ratio'],
          ['Shop Icon', '500 Ã— 500 pixels', '1:1 Square'],
          ['Order Receipt Banner', '760 Ã— 100 pixels', '7.6:1 Wide'],
          ['Mini Shop Banner', '1200 Ã— 300 pixels', '4:1 Panoramic']
        ]
      }
    },
    faqs: [
      { question: 'What is the best aspect ratio for Etsy listing photos?', answer: 'The best aspect ratio for Etsy primary listing photos is 4:3 (such as 2666 x 2000 px or 2000 x 1500 px) to prevent automatic thumbnail cropping.' }
    ],
    relatedLinks: [
      { title: 'Shopify Image Resizer', slug: 'shopify-image-resizer', description: 'Shopify product image specs' },
      { title: 'eBay Photo Resizer', slug: 'ebay-photo-resizer', description: 'eBay seller image tool' },
      { title: 'Poshmark Photo Resizer', slug: 'poshmark-photo-resizer', description: 'Poshmark closet resizer' }
    ],
    cta: {
      title: 'Selling Vintage or Apparel on Poshmark?',
      description: 'Format photos for Poshmark closets with 1:1 square crop.',
      buttonText: 'Poshmark Photo Resizer',
      buttonHref: '/poshmark-photo-resizer'
    }
  },

  // 62. /ebay-photo-resizer
  {
    slug: 'ebay-photo-resizer',
    tool: 'image-resizer',
    title: 'eBay Photo Resizer (1600x1600 px for High-Res Zoom) | PixEnhance',
    description: 'Format eBay listing photos: minimum 500 px, recommended 1600x1600 px, max 7MB. Avoids eBay upload errors and activates high-resolution zoom.',
    h1: 'eBay Listing Photo Resizer Online Free',
    category: 'E-Commerce Tools',
    badge: 'eBay Seller Hub',
    intro: 'Optimize your eBay item photos to meet eBay Seller Hub standards. Scales images to 1600 Ã— 1600 pixels to unlock eBay magnification zoom, keeping file size under the 7 MB limit in JPG or PNG format.',
    features: [
      'Recommended 1600 Ã— 1600 pixels unlocks eBay zoom magnifier',
      'Guarantees compliance with eBay 500 px minimum requirement',
      'Keeps file size strictly under the 7 MB / 12 MB limits',
      'Removes borders and optimizes contrast for clean search appearance'
    ],
    howToUse: [
      { step: 1, title: 'Upload Listing Photo', description: 'Select your camera or mobile phone photo.' },
      { step: 2, title: 'Select 1600x1600 Preset', description: 'Enables smooth hover zoom for prospective buyers.' },
      { step: 3, title: 'Check Guidelines', description: 'Confirm no seller-added text, borders, or watermarks.' },
      { step: 4, title: 'Download Image', description: 'Upload to eBay Seller Hub or mobile app.' }
    ],
    usefulInfo: {
      heading: 'eBay Official Photo Requirements for Sellers',
      paragraphs: [
        'eBay requires listing photos to be at least 500 pixels on the longest side, but strongly recommends 1600 pixels on the longest side to activate the zoom feature.',
        'Watermarks, borders, promotional text (such as "Free Shipping"), and placeholder images are prohibited on eBay main photos.'
      ],
      table: {
        headers: ['Specification', 'eBay Minimum', 'eBay Recommended'],
        rows: [
          ['Image Dimensions', '500 pixels longest side', '1600 Ã— 1600 pixels'],
          ['File Size Limit', 'Under 7 MB (12 MB on web)', 'Typically 1 MB â€“ 3 MB'],
          ['File Format', 'JPEG, PNG, TIFF, BMP, GIF', 'JPEG / JPG for fastest loading'],
          ['Watermarks / Borders', 'Strictly prohibited', 'Clean photo with plain background']
        ]
      }
    },
    faqs: [
      { question: 'What is the minimum photo size for eBay?', answer: 'The minimum photo size for eBay is 500 pixels on the longest side. However, 1600 pixels is recommended to enable buyer zoom.' }
    ],
    relatedLinks: [
      { title: 'Amazon Image Resizer', slug: 'amazon-product-image-resizer', description: 'Amazon product image specs' },
      { title: 'Etsy Listing Resizer', slug: 'etsy-listing-photo-resizer', description: 'Etsy photo dimensions' },
      { title: 'Poshmark Photo Resizer', slug: 'poshmark-photo-resizer', description: 'Poshmark closet resizer' }
    ],
    cta: {
      title: 'Cross-listing to Mercari or Poshmark?',
      description: 'Format photos for Mercari and Poshmark in 1:1 square format.',
      buttonText: 'Mercari Image Resizer',
      buttonHref: '/mercari-image-resizer'
    }
  },

  // 63. /poshmark-photo-resizer
  {
    slug: 'poshmark-photo-resizer',
    tool: 'image-resizer',
    title: 'Poshmark Photo Resizer (1:1 Square Closet Format) | PixEnhance',
    description: 'Resize clothing and accessory photos for Poshmark closet listings. Formats 1:1 square (1080x1080 or 1200x1200 px) to avoid cropping.',
    h1: 'Poshmark Closet Photo Resizer Online Free',
    category: 'E-Commerce Tools',
    badge: 'Poshmark Seller Tool',
    intro: 'Resize your fashion and closet listings to Poshmark official 1:1 square aspect ratio (1080 Ã— 1080 or 1200 Ã— 1200 pixels). Prevents shoes, bags, and apparel from being cut off in Poshmark search feeds.',
    features: [
      'Official 1:1 square aspect ratio prevents feed cropping',
      'Optimized 1080 Ã— 1080 or 1200 Ã— 1200 pixels resolution',
      'Brightens natural fabric textures and garment colors',
      'Fast client-side processing â€” perfect for mobile sellers'
    ],
    howToUse: [
      { step: 1, title: 'Upload Fashion Photo', description: 'Select your flat-lay, hanger, or mannequin photo.' },
      { step: 2, title: 'Confirm 1:1 Square Crop', description: 'Center the apparel within the square frame.' },
      { step: 3, title: 'Check Lighting', description: 'Ensure true-to-life color representation.' },
      { step: 4, title: 'Download Image', description: 'Upload directly to your Poshmark listing.' }
    ],
    usefulInfo: {
      heading: 'How to Take High-Converting Poshmark Cover Photos',
      paragraphs: [
        'Poshmark strictly displays listing cover photos in a 1:1 square format. Vertical photos taken on mobile cameras will be automatically cropped, often chopping off collars or hems.',
        'High-converting Poshmark listings use clean 1080 x 1080 px or 1200 x 1200 px square photos taken in natural daylight.'
      ],
      table: {
        headers: ['Platform Element', 'Dimensions', 'Aspect Ratio'],
        rows: [
          ['Listing Cover Photo', '1080 Ã— 1080 to 1200 Ã— 1200 pixels', '1:1 Square'],
          ['Closet Header Banner', '1200 Ã— 400 pixels', '3:1 Banner'],
          ['Profile Avatar', '400 Ã— 400 pixels', '1:1 Circle / Square']
        ]
      }
    },
    faqs: [
      { question: 'What is the photo size for Poshmark?', answer: 'Poshmark photos must be in a 1:1 square aspect ratio. The recommended resolution is 1080 x 1080 pixels or 1200 x 1200 pixels.' }
    ],
    relatedLinks: [
      { title: 'Mercari Image Resizer', slug: 'mercari-image-resizer', description: 'Mercari listing tool' },
      { title: 'Etsy Listing Resizer', slug: 'etsy-listing-photo-resizer', description: 'Etsy photo dimensions' },
      { title: 'eBay Photo Resizer', slug: 'ebay-photo-resizer', description: 'eBay seller image tool' }
    ],
    cta: {
      title: 'Also Selling on Mercari?',
      description: 'Format photos for Mercari listings with identical square dimensions.',
      buttonText: 'Mercari Image Resizer',
      buttonHref: '/mercari-image-resizer'
    }
  },

  // 64. /mercari-image-resizer
  {
    slug: 'mercari-image-resizer',
    tool: 'image-resizer',
    title: 'Mercari Image Resizer (1:1 Square Listing Tool) | PixEnhance',
    description: 'Format photos for Mercari marketplace listings. Scales images to 1:1 square (1080x1080 px), under 10MB, ensuring items fit the mobile card feed.',
    h1: 'Mercari Listing Photo Resizer Online',
    category: 'E-Commerce Tools',
    badge: 'Mercari Seller Tool',
    intro: 'Scale and crop your marketplace photos to Mercari recommended 1:1 square format (1080 Ã— 1080 pixels). Ensures your items display fully without edge clipping on the Mercari mobile app.',
    features: [
      'Perfect 1:1 square framing for the Mercari search feed',
      'Optimizes resolution to 1080 Ã— 1080 pixels',
      'Keeps file size well under the 10 MB upload limit',
      'Preserves crisp fine-print details on product tags and serials'
    ],
    howToUse: [
      { step: 1, title: 'Upload Item Photo', description: 'Select your phone shot or camera upload.' },
      { step: 2, title: 'Select 1:1 Square', description: 'Center the product so all corners are visible.' },
      { step: 3, title: 'Review Clarity', description: 'Verify that any flaws or labels are legible.' },
      { step: 4, title: 'Download Image', description: 'Upload directly to your Mercari listing.' }
    ],
    usefulInfo: {
      heading: 'Mercari Listing Photo Guidelines',
      paragraphs: [
        'Mercari permits up to 12 photos per listing. High-performing listings feature clear 1:1 square photos highlighting product condition from multiple angles.',
        'Stock photos are discouraged on Mercari; authentic, well-lit photos taken by the seller generate higher buyer trust and quicker sales.'
      ],
      table: {
        headers: ['Item Feature', 'Mercari Recommendation', 'Format'],
        rows: [
          ['Listing Photos', '1080 Ã— 1080 pixels (1:1 square)', 'JPG / JPEG, under 10 MB'],
          ['Profile Picture', '500 Ã— 500 pixels', 'JPG / PNG']
        ]
      }
    },
    faqs: [
      { question: 'What is the image ratio for Mercari?', answer: 'Mercari uses a 1:1 square aspect ratio for all listing images. 1080 x 1080 pixels is the recommended resolution.' }
    ],
    relatedLinks: [
      { title: 'Poshmark Photo Resizer', slug: 'poshmark-photo-resizer', description: 'Poshmark closet resizer' },
      { title: 'eBay Photo Resizer', slug: 'ebay-photo-resizer', description: 'eBay seller image tool' },
      { title: 'Etsy Listing Resizer', slug: 'etsy-listing-photo-resizer', description: 'Etsy photo dimensions' }
    ],
    cta: {
      title: 'Realtor or Real Estate Photographer?',
      description: 'Format listing photos for MLS and Zillow with high-resolution clarity.',
      buttonText: 'MLS Photo Resizer',
      buttonHref: '/mls-photo-resizer'
    }
  },

  // 65. /mls-photo-resizer
  {
    slug: 'mls-photo-resizer',
    tool: 'image-resizer',
    title: 'MLS Photo Resizer (Real Estate Listing Specs) | PixEnhance',
    description: 'Format real estate listing photos for MLS (Multiple Listing Service): 2048x1536 px or 1024x768 px, 4:3 ratio, under 2MB JPG. Eliminates MLS upload errors.',
    h1: 'MLS Real Estate Photo Resizer Online',
    category: 'Real Estate Tools',
    badge: 'MLS Official Standard',
    intro: 'Format real estate photographs strictly according to Multiple Listing Service (MLS) portal requirements. Converts high-resolution DSLR and drone photos to 2048 Ã— 1536 or 1024 Ã— 768 pixels (4:3 ratio) under 2 MB for instant MLS syndication.',
    features: [
      'Standard MLS resolutions: 2048 Ã— 1536 px and 1024 Ã— 768 px',
      'Official 4:3 real estate landscape aspect ratio',
      'Compresses 20MB+ RAW camera files to under 2 MB without detail loss',
      'Syndicates cleanly to Zillow, Realtor.com, and Redfin'
    ],
    howToUse: [
      { step: 1, title: 'Upload Property Photos', description: 'Upload exterior, interior, or aerial property images.' },
      { step: 2, title: 'Select MLS 2048x1536 Preset', description: 'The gold standard resolution for modern MLS platforms.' },
      { step: 3, title: 'Inspect File Size', description: 'The tool ensures file size complies with the MLS 2 MB cap.' },
      { step: 4, title: 'Download Ready Files', description: 'Upload directly to your regional MLS platform.' }
    ],
    usefulInfo: {
      heading: 'Why MLS Rejects High-Resolution Real Estate Photos',
      paragraphs: [
        'Professional real estate photographers shoot in 24 to 50 megapixels with file sizes exceeding 15 MB to 25 MB per image. Most regional MLS software (Matrix, Paragon, Flexmls) limits uploads to 2 MB or 3 MB per image.',
        'Uploading oversized photos causes upload time-outs or harsh automatic compression that degrades interior dynamic range and sharpness.'
      ],
      table: {
        headers: ['MLS Platform', 'Max Resolution', 'Max File Size', 'Recommended Aspect Ratio'],
        rows: [
          ['CoreLogic Matrix', '2048 Ã— 1536 pixels', '2 MB â€“ 4 MB', '4:3 Landscape'],
          ['Black Knight Paragon', '2048 Ã— 1536 pixels', '3 MB', '4:3 Landscape'],
          ['Flexmls', '2048 Ã— 1536 pixels', '5 MB', '4:3 Landscape'],
          ['Bridge MLS', '1024 Ã— 768 pixels', '2 MB', '4:3 Landscape']
        ]
      }
    },
    faqs: [
      { question: 'What is the best image size for MLS listing photos?', answer: 'The industry-standard recommendation for MLS is 2048 x 1536 pixels in a 4:3 aspect ratio, with a file size under 2 MB in JPG format.' },
      { question: 'Why does MLS use a 4:3 ratio instead of 16:9?', answer: 'Most MLS database architectures were standardized on 4:3 landscape ratio to maximize vertical wall and ceiling visibility in interior architectural shots.' }
    ],
    relatedLinks: [
      { title: 'Zillow Photo Resizer', slug: 'zillow-listing-photo-resizer', description: 'Zillow listing image specs' },
      { title: 'Realtor Photo Compressor', slug: 'realtor-photo-compressor', description: 'Realtor.com image tools' },
      { title: 'Compress JPG to 200KB', slug: 'compress-jpg-to-200kb', description: 'Compress to 200KB' }
    ],
    cta: {
      title: 'Need to Optimize Photos for Zillow & Redfin?',
      description: 'Format listing photos specifically for consumer real estate portals.',
      buttonText: 'Zillow Photo Resizer',
      buttonHref: '/zillow-listing-photo-resizer'
    }
  },

  // 66. /zillow-listing-photo-resizer
  {
    slug: 'zillow-listing-photo-resizer',
    tool: 'image-resizer',
    title: 'Zillow & Redfin Listing Photo Resizer (2048x1536 Landscape) | PixEnhance',
    description: 'Format photos for Zillow, Trulia, and Redfin listings. Sets 2048x1536 px landscape format, under 10MB, maintaining architectural dynamic range.',
    h1: 'Zillow & Redfin Listing Photo Resizer',
    category: 'Real Estate Tools',
    badge: 'Zillow Listing Specs',
    intro: 'Optimize property photos for Zillow, Trulia, and Redfin to showcase listings with pristine clarity. Automatically sets dimensions to 2048 Ã— 1536 pixels in a 4:3 landscape format to maximize buyer engagement.',
    features: [
      'Tailored for Zillow, Trulia, and Redfin portal carousels',
      '2048 Ã— 1536 pixels landscape aspect ratio',
      'Preserves HDR shadows and window exposure highlights',
      'Reduces file sizes for instantaneous mobile photo scrolling'
    ],
    howToUse: [
      { step: 1, title: 'Upload Listing Image', description: 'Select interior or exterior property shots.' },
      { step: 2, title: 'Choose 2048x1536 Landscape', description: 'The optimal size for Zillow desktop and app viewers.' },
      { step: 3, title: 'Inspect Clarity', description: 'Confirm that room angles and lighting are crisp.' },
      { step: 4, title: 'Download Image', description: 'Upload directly to Zillow Rental Manager or MLS feed.' }
    ],
    usefulInfo: {
      heading: 'Zillow Photo Quality & Dimension Standards',
      paragraphs: [
        'Zillow displays listing photos in horizontal landscape orientation. Vertical photos will appear with distracting black sidebars on desktop.',
        'Photos should have a minimum width of 1024 pixels, but 2048 x 1536 pixels provides the highest fidelity on 4K retina displays.'
      ],
      table: {
        headers: ['Portal', 'Recommended Dimensions', 'Orientation'],
        rows: [
          ['Zillow Property Page', '2048 Ã— 1536 pixels', '4:3 Horizontal Landscape'],
          ['Redfin Carousel', '2048 Ã— 1536 pixels', 'Landscape'],
          ['Trulia Search Card', '1024 Ã— 768 pixels', 'Landscape']
        ]
      }
    },
    faqs: [
      { question: 'What is the recommended photo size for Zillow listings?', answer: 'Zillow recommends horizontal landscape photos measuring 2048 x 1536 pixels in JPG or PNG format.' }
    ],
    relatedLinks: [
      { title: 'MLS Photo Resizer', slug: 'mls-photo-resizer', description: 'MLS real estate specs' },
      { title: 'Realtor Photo Compressor', slug: 'realtor-photo-compressor', description: 'Realtor.com image tools' },
      { title: 'Resize Image to 1920x1080', slug: 'resize-image-to-1920x1080', description: 'Full HD 1080p resizer' }
    ],
    cta: {
      title: 'Need to Compress Real Estate Images for Email?',
      description: 'Compress photo flyers and listing brochures under 500KB.',
      buttonText: 'Compress JPG',
      buttonHref: '/compress-jpg'
    }
  },

  // 67. /realtor-photo-compressor
  {
    slug: 'realtor-photo-compressor',
    tool: 'image-compressor',
    title: 'Realtor.com Photo Compressor & Resizer (Real Estate) | PixEnhance',
    description: 'Compress and resize real estate photos for Realtor.com and broker sites. Reduces image size up to 80% without losing architectural detail.',
    h1: 'Realtor.com Photo Compressor & Resizer',
    category: 'Real Estate Tools',
    badge: 'Realtor.com Compliant',
    intro: 'Compress property listing photographs for Realtor.com and real estate brokerage portals. Trims file sizes from 10MB down to under 2MB while keeping hardwood floors, countertops, and sky exposures sharp and vibrant.',
    features: [
      'Visually lossless compression for luxury real estate photography',
      'Reduces file sizes by 60% to 80% for rapid MLS upload',
      'Preserves EXIF architectural color profiles (sRGB)',
      '100% private in-browser optimization'
    ],
    howToUse: [
      { step: 1, title: 'Upload Property Photo', description: 'Upload high-resolution camera or drone shot.' },
      { step: 2, title: 'Tune Compression', description: 'Adjust quality slider to reach desired file size.' },
      { step: 3, title: 'Compare Before & After', description: 'Ensure architectural textures remain sharp.' },
      { step: 4, title: 'Download File', description: 'Upload directly to Realtor.com or brokerage CMS.' }
    ],
    usefulInfo: {
      heading: 'Optimizing Real Estate Photos for Brokerage Websites',
      paragraphs: [
        'Brokerage websites (Coldwell Banker, RE/MAX, Keller Williams, Compass) rely on fast page load speeds to prevent prospective homebuyers from bouncing.',
        'PixEnhance strips excessive camera metadata and uses high-precision quantization to reduce file size while preserving 100% perceived sharpness.'
      ],
      table: {
        headers: ['Quality Level', 'Target Size', 'Recommended Use'],
        rows: [
          ['Ultra High (90%)', '1.5 MB â€“ 2.5 MB', 'MLS syndication, print flyers, luxury portfolios'],
          ['Balanced (80%)', '500 KB â€“ 1 MB', 'Realtor.com, Zillow, broker website listings'],
          ['Web Optimized (70%)', '250 KB â€“ 500 KB', 'Email newsletters, property blast flyers']
        ]
      }
    },
    faqs: [
      { question: 'Will compressing my real estate photo affect image clarity?', answer: 'No. PixEnhance preserves structural edges and high-contrast lines while discarding invisible color redundancies.' }
    ],
    relatedLinks: [
      { title: 'MLS Photo Resizer', slug: 'mls-photo-resizer', description: 'MLS real estate specs' },
      { title: 'Zillow Photo Resizer', slug: 'zillow-listing-photo-resizer', description: 'Zillow listing image specs' },
      { title: 'Compress JPG to 100KB', slug: 'compress-jpg-to-100kb', description: 'Compress to 100KB' }
    ],
    cta: {
      title: 'Applying for a US Driver License or Real ID?',
      description: 'Format photos for state DMV online portals across the US.',
      buttonText: 'California DMV Resizer',
      buttonHref: '/california-dmv-photo-resizer'
    }
  },

  // 68. /california-dmv-photo-resizer
  {
    slug: 'california-dmv-photo-resizer',
    tool: 'passport-resizer',
    title: 'California DMV Photo Resizer (Real ID & Driver License) | PixEnhance',
    description: 'Format photo and document uploads for California DMV (dmv.ca.gov) Real ID, driver license renewal, and vehicle registration online services.',
    h1: 'California DMV Photo & Document Resizer',
    category: 'US State DMV Tools',
    badge: 'California DMV Real ID',
    intro: 'Format your photo and document scans for the California Department of Motor Vehicles (dmv.ca.gov). Ensures passport-style 2 Ã— 2 inch format with file sizes under the 5 MB limit for seamless Real ID application processing.',
    features: [
      'Official California DMV Real ID online document requirements',
      'Photo formatted to 2 Ã— 2 inches (600 Ã— 600 px min)',
      'Document uploads compressed strictly under 5 MB in JPG / PDF',
      '100% private in-browser processing for confidential documents'
    ],
    howToUse: [
      { step: 1, title: 'Upload Photo or Document', description: 'Upload your ID photo, proof of residency, or SSN document.' },
      { step: 2, title: 'Select 2x2 Format or Compress', description: 'Format to 2x2 inches for photo or compress for documents.' },
      { step: 3, title: 'Check Legibility', description: 'Ensure addresses, names, and portrait features are sharp.' },
      { step: 4, title: 'Download File', description: 'Upload directly to the dmv.ca.gov portal.' }
    ],
    usefulInfo: {
      heading: 'California DMV Real ID Upload Guidelines',
      paragraphs: [
        'When applying online for a California Real ID driver license or ID card, applicants must upload proof of identity and two proofs of California residency.',
        'Uploaded photos and scanned documents must be under 5 MB in size in JPEG, PNG, or PDF format with all four corners of the document visible.'
      ],
      table: {
        headers: ['Document Type', 'Allowed Format', 'Size Limit', 'Requirement'],
        rows: [
          ['Identity Photo', 'JPEG / PNG', 'Under 5 MB', '2 Ã— 2 inches, white background'],
          ['Residency Proofs (Utility Bill, Lease)', 'JPEG / PDF', 'Under 5 MB', 'Full document visible with clear text'],
          ['Social Security Proof', 'JPEG / PDF', 'Under 5 MB', 'Must be completely legible']
        ]
      }
    },
    faqs: [
      { question: 'What is the document upload limit for California DMV?', answer: 'The California DMV portal accepts files up to 5 MB each in JPEG, PNG, or PDF format.' }
    ],
    relatedLinks: [
      { title: 'Texas DL Photo Resizer', slug: 'texas-driver-license-photo-resizer', description: 'Texas DPS photo specs' },
      { title: 'Florida DL Photo Resizer', slug: 'florida-driver-license-photo-resizer', description: 'Florida DMV photo specs' },
      { title: 'New York DMV Resizer', slug: 'new-york-dmv-photo-resizer', description: 'NY DMV Real ID specs' }
    ],
    cta: {
      title: 'Need to Format Documents for Texas DPS?',
      description: 'Format photos and residency proofs for Texas driver license renewals.',
      buttonText: 'Texas DPS Resizer',
      buttonHref: '/texas-driver-license-photo-resizer'
    }
  },

  // 69. /texas-driver-license-photo-resizer
  {
    slug: 'texas-driver-license-photo-resizer',
    tool: 'passport-resizer',
    title: 'Texas Driver License Photo Resizer (DPS Real ID) | PixEnhance',
    description: 'Format photo and documents for Texas Department of Public Safety (TxDPS) driver license renewal and Real ID online portal at dps.texas.gov.',
    h1: 'Texas Driver License Photo Resizer (TxDPS)',
    category: 'US State DMV Tools',
    badge: 'Texas DPS Official',
    intro: 'Prepare your passport photo and identification documents for the Texas Department of Public Safety (TxDPS). Formats photos to 2 Ã— 2 inches and optimizes document scans for rapid TxDPS portal verification.',
    features: [
      'Complies with Texas DPS Real ID online portal requirements',
      'Photo formatted to 2 Ã— 2 inches (51 Ã— 51 mm)',
      'Document uploads optimized under the TxDPS file size threshold',
      'Zero server upload â€” 100% private on your device'
    ],
    howToUse: [
      { step: 1, title: 'Upload Photo or Document', description: 'Upload your photo or proof of lawful presence.' },
      { step: 2, title: 'Select Texas DPS Preset', description: 'Ensures 2x2 inch square biometrics and plain background.' },
      { step: 3, title: 'Verify Text & Portrait', description: 'Check that facial features and document numbers are clear.' },
      { step: 4, title: 'Download File', description: 'Upload to dps.texas.gov or bring to your DPS appointment.' }
    ],
    usefulInfo: {
      heading: 'Texas DPS Driver License & ID Photo Rules',
      paragraphs: [
        'Texas DPS requires a clear passport-style color photograph taken against a plain white or off-white background.',
        'Eyeglasses must be removed. Hats or headgear are only permitted for religious or medical purposes.'
      ],
      table: {
        headers: ['Specification', 'TxDPS Requirement', 'Allowed Format'],
        rows: [
          ['Dimensions', '2 Ã— 2 inches (51 Ã— 51 mm)', '600 Ã— 600 px min'],
          ['File Format', 'JPG / JPEG / PDF', 'Under 5 MB'],
          ['Background', 'Plain white or off-white', 'No patterns or shadows']
        ]
      }
    },
    faqs: [
      { question: 'Can I smile in my Texas driver license photo?', answer: 'Texas DPS requires a neutral facial expression with mouth closed for facial recognition compatibility.' }
    ],
    relatedLinks: [
      { title: 'California DMV Resizer', slug: 'california-dmv-photo-resizer', description: 'CA DMV Real ID tool' },
      { title: 'Florida DL Photo Resizer', slug: 'florida-driver-license-photo-resizer', description: 'Florida DMV photo specs' },
      { title: 'New York DMV Resizer', slug: 'new-york-dmv-photo-resizer', description: 'NY DMV Real ID specs' }
    ],
    cta: {
      title: 'Need to Format Documents for Florida DMV?',
      description: 'Format photos and residency proofs for Florida Highway Safety (FLHSMV).',
      buttonText: 'Florida DL Resizer',
      buttonHref: '/florida-driver-license-photo-resizer'
    }
  },

  // 70. /florida-driver-license-photo-resizer
  {
    slug: 'florida-driver-license-photo-resizer',
    tool: 'passport-resizer',
    title: 'Florida Driver License Photo Resizer (FLHSMV MyDMV) | PixEnhance',
    description: 'Format photo and document scans for Florida Highway Safety and Motor Vehicles (FLHSMV) MyDMV Portal driver license renewals and Real ID.',
    h1: 'Florida Driver License Photo Resizer (FLHSMV)',
    category: 'US State DMV Tools',
    badge: 'Florida FLHSMV Official',
    intro: 'Format your photo and document uploads for the Florida Department of Highway Safety and Motor Vehicles (flhsmv.gov). Keeps photos at 2 Ã— 2 inches with plain white background and files under the 2 MB portal limit.',
    features: [
      'Tailored for FLHSMV MyDMV Portal and Real ID verification',
      '2 Ã— 2 inches (51 Ã— 51 mm) standard passport proportion',
      'Ensures document file size stays strictly under 2 MB in JPG / PDF',
      'Client-side processing preserves personal privacy'
    ],
    howToUse: [
      { step: 1, title: 'Upload Photo or Scan', description: 'Select your photo or residency verification document.' },
      { step: 2, title: 'Choose 2x2 Format', description: 'The tool aligns face margins and background.' },
      { step: 3, title: 'Check Quality', description: 'Confirm that text and facial biometrics are sharp.' },
      { step: 4, title: 'Download File', description: 'Upload directly to flhsmv.gov MyDMV Portal.' }
    ],
    usefulInfo: {
      heading: 'Florida FLHSMV Photo & Document Upload Guidelines',
      paragraphs: [
        'Florida requires full front view of face with eyes open and neutral expression.',
        'Document scans must have all four corners visible and file sizes under 2 MB per document.'
      ],
      table: {
        headers: ['Document Type', 'Dimensions', 'File Size Limit', 'Allowed Format'],
        rows: [
          ['Identification Photo', '2 Ã— 2 inches (51 Ã— 51 mm)', 'Under 2 MB', 'JPG / PNG'],
          ['Residency / Tax Documents', 'Standard Letter Size Scan', 'Under 2 MB', 'JPG / PDF']
        ]
      }
    },
    faqs: [
      { question: 'What is the file size limit for Florida FLHSMV uploads?', answer: 'The MyDMV portal accepts files up to 2 MB in JPG, PNG, or PDF format.' }
    ],
    relatedLinks: [
      { title: 'California DMV Resizer', slug: 'california-dmv-photo-resizer', description: 'CA DMV Real ID tool' },
      { title: 'Texas DL Photo Resizer', slug: 'texas-driver-license-photo-resizer', description: 'Texas DPS photo specs' },
      { title: 'New York DMV Resizer', slug: 'new-york-dmv-photo-resizer', description: 'NY DMV Real ID specs' }
    ],
    cta: {
      title: 'Applying for New York State DMV Services?',
      description: 'Format photos and proof documents for NY DMV Real ID applications.',
      buttonText: 'New York DMV Resizer',
      buttonHref: '/new-york-dmv-photo-resizer'
    }
  },

  // 71. /new-york-dmv-photo-resizer
  {
    slug: 'new-york-dmv-photo-resizer',
    tool: 'passport-resizer',
    title: 'New York DMV Photo Resizer (Real ID & Enhanced License) | PixEnhance',
    description: 'Format photo and document proofs for New York State DMV (dmv.ny.gov) Real ID, Enhanced Driver License (EDL), and online license renewals.',
    h1: 'New York DMV Photo & Document Resizer',
    category: 'US State DMV Tools',
    badge: 'NY State DMV Real ID',
    intro: 'Prepare your identification photograph and verification documents for the New York State Department of Motor Vehicles (dmv.ny.gov). Ensures 2 Ã— 2 inch square format and document compression under 5 MB.',
    features: [
      'Official NY State DMV Real ID and Enhanced Driver License standards',
      'Photo dimensions 2 Ã— 2 inches (51 Ã— 51 mm)',
      'Document uploads optimized under 5 MB in JPG / PDF',
      '100% private in-browser processing for confidential documents'
    ],
    howToUse: [
      { step: 1, title: 'Upload Photo or Document', description: 'Upload your portrait photo or NY proof of residence.' },
      { step: 2, title: 'Select 2x2 Format', description: 'The tool ensures head height and white background compliance.' },
      { step: 3, title: 'Review File Size', description: 'Verify that the file size is under the 5 MB threshold.' },
      { step: 4, title: 'Download Image', description: 'Upload to dmv.ny.gov or bring to your appointment.' }
    ],
    usefulInfo: {
      heading: 'New York State DMV Photograph Guidelines',
      paragraphs: [
        'New York DMV requires full face view looking directly at the camera with both eyes open.',
        'Photographs must be in color against a plain white or off-white background with no shadows.'
      ],
      table: {
        headers: ['Parameter', 'NY DMV Specification', 'Format'],
        rows: [
          ['Dimensions', '2 Ã— 2 inches (51 Ã— 51 mm)', '600 Ã— 600 px min'],
          ['File Size Limit', 'Under 5 MB', 'JPEG / PNG / PDF'],
          ['Background Color', 'Plain white or off-white', 'No shadows or objects']
        ]
      }
    },
    faqs: [
      { question: 'What is required for New York Real ID photo upload?', answer: 'The photo must be 2x2 inches, color, taken within the last 6 months, with a plain white background and no eyeglasses.' }
    ],
    relatedLinks: [
      { title: 'California DMV Resizer', slug: 'california-dmv-photo-resizer', description: 'CA DMV Real ID tool' },
      { title: 'Texas DL Photo Resizer', slug: 'texas-driver-license-photo-resizer', description: 'Texas DPS photo specs' },
      { title: 'Florida DL Photo Resizer', slug: 'florida-driver-license-photo-resizer', description: 'Florida DMV photo specs' }
    ],
    cta: {
      title: 'Applying for US Nursing Licensure (NCLEX)?',
      description: 'Format photos for NCSBN NCLEX registration and state nursing boards.',
      buttonText: 'NCLEX Photo Resizer',
      buttonHref: '/nclex-photo-resizer'
    }
  },

  // 72. /nclex-photo-resizer
  {
    slug: 'nclex-photo-resizer',
    tool: 'passport-resizer',
    title: 'NCLEX Photo Resizer (NCSBN Nursing Exam Registration) | PixEnhance',
    description: 'Format 2x2 inch passport-style photos for NCSBN NCLEX-RN and NCLEX-PN exam registration and State Board of Nursing (BON) license applications.',
    h1: 'NCLEX Nursing Exam Photo Resizer Online',
    category: 'US Licensure Tools',
    badge: 'NCSBN / Pearson VUE',
    intro: 'Format your photo for the National Council Licensure Examination (NCLEX-RN & NCLEX-PN) and State Board of Nursing applications. Conforms strictly to 2 Ã— 2 inch passport specifications with plain white background.',
    features: [
      'Compliant with NCSBN and Pearson VUE candidate identification rules',
      'Standard 2 Ã— 2 inch (51 Ã— 51 mm) passport dimensions',
      'High-resolution output (300 DPI) in JPG / PNG',
      'Client-side processing guarantees your photo remains private'
    ],
    howToUse: [
      { step: 1, title: 'Upload Portrait Photo', description: 'Select a clean portrait taken within the last 6 months.' },
      { step: 2, title: 'Inspect 2x2 Alignment', description: 'Confirm neutral expression, eyes visible, and white background.' },
      { step: 3, title: 'Check File Size', description: 'Ensures optimal resolution and small file footprint.' },
      { step: 4, title: 'Download Ready Photo', description: 'Upload to your State Board of Nursing application portal.' }
    ],
    usefulInfo: {
      heading: 'NCLEX Candidate Photograph Identification Rules',
      paragraphs: [
        'State Boards of Nursing require candidates to submit a recent 2x2 inch passport-style photograph with their application for licensure by examination.',
        'The photograph must show a clear frontal view of the candidate from the crown of the head to the shoulders against a plain white background.'
      ],
      table: {
        headers: ['Specification', 'Requirement', 'Dimensions at 300 DPI'],
        rows: [
          ['Dimensions', '2 Ã— 2 inches (51 Ã— 51 mm)', '600 Ã— 600 pixels'],
          ['Background', 'Plain white or off-white', 'No shadows or patterned backgrounds'],
          ['Expression', 'Neutral facial expression', 'Mouth closed, both eyes open']
        ]
      }
    },
    faqs: [
      { question: 'What photo size is required for State Board of Nursing applications?', answer: 'Most State Boards of Nursing require a standard 2x2 inch passport-style photograph taken within the last 6 months.' }
    ],
    relatedLinks: [
      { title: 'US Bar Exam Photo Resizer', slug: 'us-bar-exam-photo-resizer', description: 'State Bar applicant photo' },
      { title: 'Notary Public Resizer', slug: 'notary-public-photo-resizer', description: 'Notary commission photo' },
      { title: 'US Passport Photo Resizer', slug: 'us-passport-photo-resizer', description: 'US passport photo specs' }
    ],
    cta: {
      title: 'Applying for State Bar Admission or Notary Public?',
      description: 'Format photos for legal, notary, and professional state licensure.',
      buttonText: 'US Bar Exam Resizer',
      buttonHref: '/us-bar-exam-photo-resizer'
    }
  },

  // 73. /us-bar-exam-photo-resizer
  {
    slug: 'us-bar-exam-photo-resizer',
    tool: 'passport-resizer',
    title: 'US Bar Exam Photo Resizer (State Bar Admission Specs) | PixEnhance',
    description: 'Format official 2x2 inch passport photos for US State Bar Examination admission and moral character applications (California Bar, NY Bar, Texas Bar).',
    h1: 'US Bar Exam Admission Photo Resizer',
    category: 'US Licensure Tools',
    badge: 'State Bar Admissions',
    intro: 'Prepare your passport-style identification photo for State Bar Examination applications and character & fitness reviews (including California State Bar, New York BOLE, and Texas BLE). Formats to 2 Ã— 2 inches with plain white background.',
    features: [
      'Meets NCBE and State Bar Committee of Bar Examiners photo criteria',
      '2 Ã— 2 inches (51 Ã— 51 mm) square format at 300 DPI',
      'File size compressed between 50 KB and 2 MB in JPG / PNG',
      '100% private in-browser generation'
    ],
    howToUse: [
      { step: 1, title: 'Upload Formal Photo', description: 'Select a professional portrait in business attire.' },
      { step: 2, title: 'Check 2x2 Square Crop', description: 'Verify that head covers between 50% and 69% of the frame.' },
      { step: 3, title: 'Review Lighting', description: 'Ensure plain white background with no shadows.' },
      { step: 4, title: 'Download Image', description: 'Upload directly to your State Bar applicant portal.' }
    ],
    usefulInfo: {
      heading: 'State Bar Association Photo Identification Standards',
      paragraphs: [
        'State Bar examiners require applicants to submit a recent passport-style photograph for admission ticket identification and character & fitness files.',
        'Applicants must be dressed in professional business attire with eyes looking directly into the camera.'
      ],
      table: {
        headers: ['Jurisdiction', 'Required Dimensions', 'Background'],
        rows: [
          ['California State Bar', '2 Ã— 2 inches (600 Ã— 600 px min)', 'Plain white or light'],
          ['New York BOLE', '2 Ã— 2 inches', 'Plain white'],
          ['Texas Board of Law Examiners', '2 Ã— 2 inches', 'Plain white or off-white']
        ]
      }
    },
    faqs: [
      { question: 'What is the required photo format for the Bar Exam?', answer: 'State Bar examiners require a standard 2x2 inch passport-style color photo with a plain white background taken within the last 6 months in professional attire.' }
    ],
    relatedLinks: [
      { title: 'NCLEX Photo Resizer', slug: 'nclex-photo-resizer', description: 'Nursing exam photo specs' },
      { title: 'Notary Public Resizer', slug: 'notary-public-photo-resizer', description: 'Notary commission photo' },
      { title: 'US Passport Photo Resizer', slug: 'us-passport-photo-resizer', description: 'US passport photo specs' }
    ],
    cta: {
      title: 'Applying for a State Notary Commission?',
      description: 'Format photos for Notary Public appointment applications.',
      buttonText: 'Notary Public Resizer',
      buttonHref: '/notary-public-photo-resizer'
    }
  },

  // 74. /notary-public-photo-resizer
  {
    slug: 'notary-public-photo-resizer',
    tool: 'passport-resizer',
    title: 'Notary Public Photo Resizer (State Commission Applications) | PixEnhance',
    description: 'Format 2x2 inch passport photos for Notary Public commission applications and Secretary of State renewals across all 50 US states.',
    h1: 'Notary Public Commission Photo Resizer',
    category: 'US Licensure Tools',
    badge: 'Secretary of State Specs',
    intro: 'Format your passport-style photograph for Notary Public commission applications and Secretary of State renewals across all 50 US states. Ensures compliant 2 Ã— 2 inch dimensions and plain white background.',
    features: [
      'Meets Secretary of State Notary division photo guidelines',
      'Standard 2 Ã— 2 inch (51 Ã— 51 mm) passport proportions',
      'High-resolution 300 DPI output in JPG / PNG',
      'Fast client-side processing with instant download'
    ],
    howToUse: [
      { step: 1, title: 'Upload Photo', description: 'Select your recent color portrait photo.' },
      { step: 2, title: 'Confirm 2x2 Square', description: 'Ensure the face occupies between 50% and 69% of image height.' },
      { step: 3, title: 'Verify Background', description: 'Check that the background is plain white or off-white.' },
      { step: 4, title: 'Download File', description: 'Attach to your Notary Public commission application.' }
    ],
    usefulInfo: {
      heading: 'Notary Public Application Photograph Standards',
      paragraphs: [
        'Secretary of State Notary divisions require applicants to provide a 2x2 inch color passport photograph taken within the last 6 months.',
        'The photograph is retained on file with your Notary bond and oath of office for official verification.'
      ],
      table: {
        headers: ['Specification', 'Requirement', 'Allowed Format'],
        rows: [
          ['Dimensions', '2 Ã— 2 inches (51 Ã— 51 mm)', '600 Ã— 600 px min at 300 DPI'],
          ['Background', 'Plain white or off-white', 'No patterns or shadows'],
          ['Attire', 'Professional business attire', 'No uniforms, hats, or dark glasses']
        ]
      }
    },
    faqs: [
      { question: 'What photo size is required for a Notary Public application?', answer: 'State Secretary of State offices require a 2x2 inch color passport-style photograph taken within the last 6 months with a plain white background.' }
    ],
    relatedLinks: [
      { title: 'US Bar Exam Photo Resizer', slug: 'us-bar-exam-photo-resizer', description: 'State Bar applicant photo' },
      { title: 'NCLEX Photo Resizer', slug: 'nclex-photo-resizer', description: 'Nursing exam photo specs' },
      { title: 'US Passport Photo Resizer', slug: 'us-passport-photo-resizer', description: 'US passport photo specs' }
    ],
    cta: {
      title: 'Need to Compress Documents for State Filings?',
      description: 'Compress bonds, certificates, and ID proofs under 200KB easily.',
      buttonText: 'Compress to 200KB',
      buttonHref: '/compress-jpg-to-200kb'
    }
  }];

export const SEO_LANDING_PAGE_MAP = new Map<string, SEOLandingPage>(
  SEO_LANDING_PAGES.map((page) => [page.slug, page])
);

export function getSEOLandingPageBySlug(slug: string): SEOLandingPage | undefined {
  const clean = slug.replace(/^\//, '');
  return SEO_LANDING_PAGE_MAP.get(clean);
}
