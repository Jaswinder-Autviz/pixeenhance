export interface Tool {
  slug: string; // e.g. '/image-compressor' or 'image-compressor'
  title: string;
  h1: string;
  description: string;
  category: string; // category slug: 'convert', 'pdf-tools', 'resize', 'crop-edit', 'social-media', 'utilities', 'compress'
  related: string[]; // slugs of related tools
  nextSteps?: string[]; // slugs of sequential tools to recommend after this tool
  duplicateOf?: string; // primary tool slug if this is an overlap
}

export interface Category {
  slug: string;
  title: string;
  description: string;
  intro: string;
}

export const CATEGORIES: Category[] = [
  {
    slug: 'convert',
    title: 'Image Converter & Format Tools',
    description: 'Convert seamlessly between JPG, PNG, WebP, SVG, and Apple HEIC with zero quality loss.',
    intro:
      'Easily transform your images between WebP, PNG, JPG, SVG, and HEIC formats directly inside your browser. All conversions take advantage of native browser hardware acceleration, meaning your graphics never leave your computer and convert with maximum fidelity in fractions of a second.',
  },
  {
    slug: 'compress',
    title: 'Image Compression & Size Optimization Tools',
    description: 'Compress JPG, PNG, WebP photos and target exact KB limits like 20KB, 50KB, 100KB, and 200KB.',
    intro:
      'Reduce image file sizes by up to 85% without sacrificing visible clarity. Whether you need to compress photos for online job applications, government portals like SSC and UPSC requiring files under 20KB or 50KB, or optimize web assets for blazing fast load times, our client-side compressor delivers instant results with total privacy.',
  },
  {
    slug: 'resize',
    title: 'Image & Photo Resizers',
    description: 'Resize photos by dimensions, percentage, aspect ratios, and standard international paper sizes.',
    intro:
      'Scale images with pixel-perfect precision using bicubic and Lanczos resampling algorithms. Choose from popular dimensions like 1080×1080 and 1920×1080, standard international A-series print formats (A0 to A7 at 300 DPI), or create custom aspect ratios with locked proportions.',
  },
  {
    slug: 'crop-edit',
    title: 'Crop, Rotate, Flip & Split Tools',
    description: 'Crop images to custom aspect ratios, rotate 90/180 degrees, flip horizontally, or split into grids.',
    intro:
      'Fine-tune the composition and orientation of your graphics. Crop photos to precise aspect ratios, rotate images to correct orientation, flip mirrored graphics, or split panoramas and high-resolution images into multi-panel grids for social feeds and print displays.',
  },
  {
    slug: 'social-media',
    title: 'Social Media Resizers & Presets',
    description: 'Pre-configured dimension presets for Instagram, YouTube, Facebook, LinkedIn, and WhatsApp.',
    intro:
      'Create perfectly sized media for every major social platform. Instantly fit images for Instagram square posts, portrait reels, stories, YouTube channel banners, video thumbnails, LinkedIn headers, and WhatsApp profile pictures without awkward cropping or blurriness.',
  },
  {
    slug: 'pdf-tools',
    title: 'PDF Document & Image Tools',
    description: 'Convert images to PDF, compress PDF files, convert PDF to Word, and extract pages to images.',
    intro:
      'Manage documents effortlessly without expensive software or cloud uploads. Convert JPG and PNG images into single or multi-page PDF documents under strict size limits like 50KB and 100KB, compress large PDFs, extract pages to images, or convert between PDF and Word formats in complete privacy.',
  },
  {
    slug: 'utilities',
    title: 'Developer & Media Utilities',
    description: 'Base64 image encoding, color sampling, code-to-image mockups, and dimensional inspection.',
    intro:
      'A collection of precision utilities for developers, designers, and creators. Generate beautiful Carbon-style code screenshots, convert snippets between JSON, YAML, TypeScript, and JSX, encode/decode Base64 data strings, inspect pixel color codes, and calculate aspect ratios on the fly.',
  },
];

export const TOOLS: Tool[] = [
  // ==========================================
  // COMPRESSION & KB TARGET TOOLS
  // ==========================================
  {
    slug: '/image-compressor',
    title: 'Free Image Compressor Online',
    h1: 'Free Online Image Compressor',
    description: 'Compress JPG, PNG and WebP images online for free. Reduce image file size instantly with maximum quality and complete privacy.',
    category: 'compress',
    related: ['/compress-jpg', '/compress-png', '/compress-webp', '/compress-image-to-50kb', '/resize-image'],
    nextSteps: ['/resize-image', '/image-to-pdf'],
  },
  {
    slug: '/compress-jpg',
    title: 'Compress JPG Online Free',
    h1: 'Compress JPG Images Online Free',
    description: 'Compress JPG and JPEG photos online for free. Optimize image file size up to 85% with visually lossless clarity. No upload limits.',
    category: 'compress',
    related: ['/compress-jpg-to-50kb', '/compress-jpg-to-100kb', '/image-compressor', '/resize-jpg', '/jpg-to-png'],
    nextSteps: ['/resize-jpg', '/jpg-to-pdf'],
  },
  {
    slug: '/compress-png',
    title: 'Compress PNG Online Free',
    h1: 'Compress PNG Images Online Free',
    description: 'Compress PNG images online without losing transparency. Reduce file size up to 80% with lossless and lossy compression options.',
    category: 'compress',
    related: ['/png-to-jpg', '/png-to-webp', '/image-compressor', '/resize-png', '/png-to-svg'],
    nextSteps: ['/resize-png', '/png-to-webp'],
  },
  {
    slug: '/compress-webp',
    title: 'Compress WebP Online Free',
    h1: 'Compress WebP Images Online Free',
    description: 'Compress WebP images online for free. Optimize next-gen WebP images to minimal file sizes with pristine visual sharpness.',
    category: 'compress',
    related: ['/webp-to-png', '/webp-to-jpg', '/image-compressor', '/jpg-to-webp'],
    nextSteps: ['/webp-to-png', '/resize-image'],
  },
  {
    slug: '/compress-jpg-to-50kb',
    title: 'Compress JPG to 50KB Online Free',
    h1: 'Compress JPG Images to 50KB Online',
    description: 'Compress JPG to 50KB online for free. Reduce photo and signature file sizes below 50 KB for online job applications, UPSC, and SSC forms.',
    category: 'compress',
    related: ['/compress-image-to-50kb', '/compress-image-to-20kb', '/compress-jpg-to-100kb', '/jpg-to-pdf-under-50kb'],
    nextSteps: ['/jpg-to-pdf-under-50kb', '/resize-image'],
    duplicateOf: '/compress-image-to-50kb',
  },
  {
    slug: '/compress-jpg-to-100kb',
    title: 'Compress JPG to 100KB Online Free',
    h1: 'Compress JPG Images to 100KB Online',
    description: 'Compress JPG photos to under 100KB online for free. Retain crystal clear facial details and contrast for exams and applications.',
    category: 'compress',
    related: ['/compress-image-to-100kb', '/compress-jpg-to-50kb', '/compress-jpg-to-200kb', '/jpg-to-pdf-under-100kb'],
    nextSteps: ['/jpg-to-pdf-under-100kb', '/resize-image'],
    duplicateOf: '/compress-image-to-100kb',
  },
  {
    slug: '/compress-jpg-to-200kb',
    title: 'Compress JPG to 200KB Online Free',
    h1: 'Compress JPG Images to 200KB Online',
    description: 'Compress JPG images to under 200KB online for free. Optimize high-resolution pictures for email sharing and online submissions.',
    category: 'compress',
    related: ['/compress-image-to-200kb', '/compress-jpg-to-100kb', '/image-compressor', '/jpg-to-pdf-under-200kb'],
    nextSteps: ['/jpg-to-pdf-under-200kb', '/resize-image'],
    duplicateOf: '/compress-image-to-200kb',
  },
  {
    slug: '/compress-image-to-20kb',
    title: 'Compress Image to 20KB Online Free',
    h1: 'Compress Image to 20KB Online',
    description: 'Compress JPG, PNG, and WebP images to under 20KB for signatures, job applications, and government portals.',
    category: 'compress',
    related: ['/compress-image-to-50kb', '/compress-jpg-to-50kb', '/image-compressor', '/passport-photo-resizer'],
    nextSteps: ['/passport-photo-resizer', '/image-to-pdf'],
  },
  {
    slug: '/compress-image-to-50kb',
    title: 'Compress Image to 50KB Online Free',
    h1: 'Compress Image to 50KB Online',
    description: 'Compress JPG, PNG, and WebP photos to under 50KB for online application forms and exam portals.',
    category: 'compress',
    related: ['/compress-image-to-20kb', '/compress-image-to-100kb', '/image-compressor', '/jpg-to-pdf-under-50kb'],
    nextSteps: ['/jpg-to-pdf-under-50kb', '/resize-image'],
  },
  {
    slug: '/compress-image-to-100kb',
    title: 'Compress Image to 100KB Online Free',
    h1: 'Compress Image to 100KB Online',
    description: 'Compress high-resolution photos and documents to under 100KB without visible quality loss.',
    category: 'compress',
    related: ['/compress-image-to-50kb', '/compress-image-to-200kb', '/image-compressor', '/jpg-to-pdf-under-100kb'],
    nextSteps: ['/jpg-to-pdf-under-100kb', '/resize-image'],
  },
  {
    slug: '/compress-image-to-200kb',
    title: 'Compress Image to 200KB Online Free',
    h1: 'Compress Image to 200KB Online',
    description: 'Reduce large multi-megabyte photos to under 200KB for fast website loading and email sharing.',
    category: 'compress',
    related: ['/compress-image-to-100kb', '/image-compressor', '/jpg-to-pdf-under-200kb', '/image-to-pdf-under-200kb'],
    nextSteps: ['/image-to-pdf-under-200kb', '/resize-image'],
  },

  // ==========================================
  // RESIZE TOOLS
  // ==========================================
  {
    slug: '/image-resizer',
    title: 'Free Image Resizer Online',
    h1: 'Free Online Image Resizer',
    description: 'Resize images by width, height, percentage, or aspect ratio. Fast, free, and completely private in-browser resizing.',
    category: 'resize',
    related: ['/resize-image', '/bulk-image-resizer', '/image-compressor', '/aspect-ratio-calculator'],
    nextSteps: ['/image-compressor', '/crop-image'],
    duplicateOf: '/resize-image',
  },
  {
    slug: '/resize-image',
    title: 'Resize Image Online Free',
    h1: 'Resize Image Online Free',
    description: 'Resize JPG, PNG, and WebP images online for free. Scale dimensions by pixels or percentage with aspect ratio lock.',
    category: 'resize',
    related: ['/image-resizer', '/resize-jpg', '/resize-png', '/resize-image-to-1080x1080', '/bulk-image-resizer'],
    nextSteps: ['/image-compressor', '/crop-image'],
  },
  {
    slug: '/resize-jpg',
    title: 'Resize JPG Online Free',
    h1: 'Resize JPG Images Online Free',
    description: 'Resize JPG photos to custom pixel dimensions or percentages with smooth bicubic scaling and complete privacy.',
    category: 'resize',
    related: ['/resize-image', '/compress-jpg', '/resize-png', '/resize-image-to-1080x1080'],
    nextSteps: ['/compress-jpg', '/image-to-pdf'],
  },
  {
    slug: '/resize-png',
    title: 'Resize PNG Online Free',
    h1: 'Resize PNG Images Online Free',
    description: 'Resize PNG pictures with full alpha transparency preservation and zero blurring or compression artifacts.',
    category: 'resize',
    related: ['/resize-image', '/compress-png', '/resize-jpg', '/png-to-svg'],
    nextSteps: ['/compress-png', '/png-to-webp'],
  },
  {
    slug: '/resize-image-to-1080x1080',
    title: 'Resize Image to 1080x1080 Online Free',
    h1: 'Resize Image to 1080×1080 Pixels Online',
    description: 'Resize any photo to exact 1080×1080 square format (1:1 aspect ratio) for Instagram, Facebook, and profile photos.',
    category: 'resize',
    related: ['/resize-image-to-1920x1080', '/instagram-post-resizer', '/resize-image', '/aspect-ratio-calculator'],
    nextSteps: ['/instagram-post-resizer', '/image-compressor'],
  },
  {
    slug: '/resize-image-to-1920x1080',
    title: 'Resize Image to 1920x1080 Online Free',
    h1: 'Resize Image to 1920×1080 Pixels Online',
    description: 'Resize photos to Full HD 1920×1080 (16:9 widescreen ratio) for wallpapers, presentations, YouTube banners, and displays.',
    category: 'resize',
    related: ['/resize-image-to-1080x1080', '/youtube-banner-resizer', '/resize-image-for-youtube-thumbnail', '/resize-image'],
    nextSteps: ['/image-compressor', '/image-to-pdf'],
  },
  {
    slug: '/bulk-image-resizer',
    title: 'Bulk Image Resizer Online',
    h1: 'Batch Resize Images Online Free',
    description: 'Resize multiple images at once in your browser. Batch scale hundreds of JPG, PNG, and WebP pictures with instant ZIP download.',
    category: 'resize',
    related: ['/resize-image', '/image-compressor', '/image-to-pdf'],
    nextSteps: ['/image-compressor', '/image-to-pdf'],
  },
  {
    slug: '/image-dimensions',
    title: 'Image Dimensions Checker',
    h1: 'Check Image Dimensions & Resolution',
    description: 'Quickly inspect image dimensions, width, height, aspect ratio, color depth, and DPI without uploading.',
    category: 'resize',
    related: ['/aspect-ratio-calculator', '/resize-image', '/image-resizer'],
    nextSteps: ['/resize-image', '/crop-image'],
  },
  {
    slug: '/aspect-ratio-calculator',
    title: 'Aspect Ratio Calculator Online',
    h1: 'Aspect Ratio Calculator & Resizer',
    description: 'Calculate and match image aspect ratios (16:9, 4:3, 1:1, 9:16, 21:9) with automatic width and height resolution computation.',
    category: 'resize',
    related: ['/image-dimensions', '/resize-image', '/crop-image', '/resize-image-to-1080x1080'],
    nextSteps: ['/resize-image', '/crop-image'],
  },
  {
    slug: '/a4-image-resizer',
    title: 'A4 Image Resizer Online (300 DPI)',
    h1: 'Resize Image to A4 Paper Size (300 DPI)',
    description: 'Resize photos to standard ISO A4 paper size (210×297 mm, 2480×3508 px at 300 DPI) for crystal clear printing.',
    category: 'resize',
    related: ['/a3-image-resizer', '/a5-image-resizer', '/image-to-pdf', '/passport-photo-resizer'],
    nextSteps: ['/image-to-pdf', '/image-compressor'],
  },
  {
    slug: '/a0-image-resizer',
    title: 'A0 Image Resizer Online (300 DPI)',
    h1: 'Resize Image to A0 Poster Size (300 DPI)',
    description: 'Scale photos and architectural plans to ISO A0 poster size (841×1189 mm, 9933×14043 px at 300 DPI) for large format printing.',
    category: 'resize',
    related: ['/a1-image-resizer', '/a4-image-resizer', '/image-to-pdf'],
    nextSteps: ['/image-to-pdf', '/image-compressor'],
  },
  {
    slug: '/a1-image-resizer',
    title: 'A1 Image Resizer Online (300 DPI)',
    h1: 'Resize Image to A1 Size (300 DPI)',
    description: 'Convert and resize images to standard A1 dimensions (594×841 mm, 7016×9933 px at 300 DPI) with high print fidelity.',
    category: 'resize',
    related: ['/a0-image-resizer', '/a2-image-resizer', '/a4-image-resizer'],
    nextSteps: ['/image-to-pdf', '/image-compressor'],
  },
  {
    slug: '/a2-image-resizer',
    title: 'A2 Image Resizer Online (300 DPI)',
    h1: 'Resize Image to A2 Size (300 DPI)',
    description: 'Resize graphics and photos to A2 format (420×594 mm, 4960×7016 px at 300 DPI) for posters, calendars, and architectural drawings.',
    category: 'resize',
    related: ['/a1-image-resizer', '/a3-image-resizer', '/a4-image-resizer'],
    nextSteps: ['/image-to-pdf', '/image-compressor'],
  },
  {
    slug: '/a3-image-resizer',
    title: 'A3 Image Resizer Online (300 DPI)',
    h1: 'Resize Image to A3 Size (300 DPI)',
    description: 'Resize pictures to standard A3 dimensions (297×420 mm, 3508×4960 px at 300 DPI) for presentations, drawings, and posters.',
    category: 'resize',
    related: ['/a2-image-resizer', '/a4-image-resizer', '/a5-image-resizer'],
    nextSteps: ['/image-to-pdf', '/image-compressor'],
  },
  {
    slug: '/a5-image-resizer',
    title: 'A5 Image Resizer Online (300 DPI)',
    h1: 'Resize Image to A5 Size (300 DPI)',
    description: 'Resize images to A5 booklet format (148×210 mm, 1748×2480 px at 300 DPI) for flyers, invitations, and stationery.',
    category: 'resize',
    related: ['/a4-image-resizer', '/a6-image-resizer', '/image-to-pdf'],
    nextSteps: ['/image-to-pdf', '/image-compressor'],
  },
  {
    slug: '/a6-image-resizer',
    title: 'A6 Image Resizer Online (300 DPI)',
    h1: 'Resize Image to A6 Postcard Size (300 DPI)',
    description: 'Resize photos to A6 postcard size (105×148 mm, 1240×1748 px at 300 DPI) for postcards, pocket photos, and greeting cards.',
    category: 'resize',
    related: ['/a5-image-resizer', '/a7-image-resizer', '/passport-photo-resizer'],
    nextSteps: ['/image-to-pdf', '/image-compressor'],
  },
  {
    slug: '/a7-image-resizer',
    title: 'A7 Image Resizer Online (300 DPI)',
    h1: 'Resize Image to A7 Size (300 DPI)',
    description: 'Scale photos to ISO A7 miniature format (74×105 mm, 874×1240 px at 300 DPI) for identification badges and small prints.',
    category: 'resize',
    related: ['/a6-image-resizer', '/passport-photo-resizer', '/a4-image-resizer'],
    nextSteps: ['/image-to-pdf', '/image-compressor'],
  },
  {
    slug: '/passport-photo-resizer',
    title: 'Passport Photo Resizer Online (2x2 & 3.5x4.5 cm)',
    h1: 'Passport Photo Resizer Online Free',
    description: 'Resize photos to official passport dimensions (2×2 inches, 35×45 mm, 3.5×4.5 cm) at 300 DPI for US, UK, Schengen, and Indian passports.',
    category: 'resize',
    related: ['/visa-photo-resizer', '/compress-image-to-20kb', '/compress-image-to-50kb', '/a4-image-resizer'],
    nextSteps: ['/compress-image-to-50kb', '/image-to-pdf'],
  },
  {
    slug: '/visa-photo-resizer',
    title: 'Visa Photo Resizer Online Free',
    h1: 'Visa Photo Resizer Online Free',
    description: 'Resize passport and visa photos to official embassy specifications (2×2 inch US Visa, Schengen, UK, Canada, India) at 300 DPI.',
    category: 'resize',
    related: ['/passport-photo-resizer', '/compress-image-to-50kb', '/compress-image-to-20kb', '/a4-image-resizer'],
    nextSteps: ['/compress-image-to-50kb', '/image-to-pdf'],
  },

  // ==========================================
  // CONVERT TOOLS
  // ==========================================
  {
    slug: '/image-converter',
    title: 'Universal Image Converter Online',
    h1: 'Free Online Image Converter',
    description: 'Convert images between JPG, PNG, WebP, GIF, BMP, SVG, and HEIC instantly in your browser with zero data uploads.',
    category: 'convert',
    related: ['/jpg-to-png', '/png-to-jpg', '/webp-to-png', '/heic-to-jpg', '/svg-converter'],
    nextSteps: ['/image-compressor', '/image-to-pdf'],
  },
  {
    slug: '/jpg-to-png',
    title: 'JPG to PNG Converter Online Free',
    h1: 'Convert JPG to PNG Online Free',
    description: 'Convert JPG images to PNG format with lossless 24-bit RGB encoding, crisp edges, and no quality degradation.',
    category: 'convert',
    related: ['/png-to-jpg', '/jpg-to-webp', '/image-converter', '/image-compressor'],
    nextSteps: ['/compress-png', '/resize-png'],
  },
  {
    slug: '/png-to-jpg',
    title: 'PNG to JPG Converter Online Free',
    h1: 'Convert PNG to JPG Online Free',
    description: 'Convert PNG images to JPG format online for free. Flatten transparent alpha channels to white or custom background with high quality.',
    category: 'convert',
    related: ['/jpg-to-png', '/png-to-webp', '/image-converter', '/compress-jpg'],
    nextSteps: ['/compress-jpg', '/resize-jpg'],
  },
  {
    slug: '/jpg-to-webp',
    title: 'JPG to WebP Converter Online Free',
    h1: 'Convert JPG to WebP Online Free',
    description: 'Convert JPG to modern Google WebP format online. Reduce image file size by 30-50% while maintaining identical visual clarity.',
    category: 'convert',
    related: ['/webp-to-jpg', '/png-to-webp', '/image-converter', '/compress-webp'],
    nextSteps: ['/compress-webp', '/resize-image'],
  },
  {
    slug: '/png-to-webp',
    title: 'PNG to WebP Converter Online Free',
    h1: 'Convert PNG to WebP Online Free',
    description: 'Convert PNG to WebP format online for free. Keep transparency while slashing file sizes by up to 60% for lightning-fast websites.',
    category: 'convert',
    related: ['/webp-to-png', '/jpg-to-webp', '/image-converter', '/compress-webp'],
    nextSteps: ['/compress-webp', '/resize-image'],
  },
  {
    slug: '/webp-to-jpg',
    title: 'WebP to JPG Converter Online Free',
    h1: 'Convert WebP to JPG Online Free',
    description: 'Convert WebP images to standard JPG format online for universal compatibility across older software, printers, and viewers.',
    category: 'convert',
    related: ['/jpg-to-webp', '/webp-to-png', '/image-converter', '/compress-jpg'],
    nextSteps: ['/compress-jpg', '/resize-jpg'],
  },
  {
    slug: '/webp-to-png',
    title: 'WebP to PNG Converter Online Free',
    h1: 'Convert WebP to PNG Online Free',
    description: 'Convert WebP to PNG online for free. Extract lossless PNG images with full transparency preserved for editing and design.',
    category: 'convert',
    related: ['/png-to-webp', '/webp-to-jpg', '/image-converter', '/png-to-svg'],
    nextSteps: ['/compress-png', '/resize-png'],
  },
  {
    slug: '/heic-to-jpg',
    title: 'HEIC to JPG Converter Online Free',
    h1: 'Convert Apple HEIC Photos to JPG Online',
    description: 'Convert Apple iPhone & iPad HEIC/HEIF photos to standard JPG format online in seconds. Free, private, and instant.',
    category: 'convert',
    related: ['/image-converter', '/jpg-to-png', '/image-compressor', '/image-to-pdf'],
    nextSteps: ['/image-compressor', '/image-to-pdf'],
  },
  {
    slug: '/svg-converter',
    title: 'SVG Converter Online Free',
    h1: 'Free Online SVG Converter & Vectorizer',
    description: 'Convert PNG and JPG raster images into scalable vector SVG graphics or export SVG vectors to high-definition PNG/JPG bitmaps.',
    category: 'convert',
    related: ['/png-to-svg', '/image-converter', '/png-to-jpg'],
    nextSteps: ['/png-to-svg', '/image-compressor'],
  },
  {
    slug: '/png-to-svg',
    title: 'PNG to SVG Converter Online Free',
    h1: 'Convert PNG to Scalable Vector SVG Online',
    description: 'Convert PNG bitmap images and logos into clean scalable vector SVG files using browser-based edge-tracing algorithms.',
    category: 'convert',
    related: ['/svg-converter', '/image-converter', '/compress-png'],
    nextSteps: ['/svg-converter', '/code-converter'],
  },

  // ==========================================
  // CROP, EDIT & COMPOSITION TOOLS
  // ==========================================
  {
    slug: '/crop-image',
    title: 'Crop Image Online Free',
    h1: 'Crop Image Online Free',
    description: 'Crop images online to custom dimensions or standard aspect ratios (1:1, 16:9, 4:3, 9:16). Fast, intuitive, and 100% private.',
    category: 'crop-edit',
    related: ['/image-cropper', '/rotate-image', '/flip-image', '/resize-image', '/aspect-ratio-calculator'],
    nextSteps: ['/resize-image', '/image-compressor'],
  },
  {
    slug: '/image-cropper',
    title: 'Image Cropper Online Free',
    h1: 'Free Online Image Cropper',
    description: 'Crop photos with interactive drag handles, aspect ratio locking, and circular/rectangular crop masks.',
    category: 'crop-edit',
    related: ['/crop-image', '/rotate-image', '/flip-image', '/resize-image'],
    nextSteps: ['/resize-image', '/image-compressor'],
    duplicateOf: '/crop-image',
  },
  {
    slug: '/rotate-image',
    title: 'Rotate Image Online Free',
    h1: 'Rotate Image Online Free',
    description: 'Rotate images 90 degrees clockwise, counterclockwise, or 180 degrees. Correct photo orientation with lossless quality.',
    category: 'crop-edit',
    related: ['/image-rotator', '/flip-image', '/crop-image', '/resize-image'],
    nextSteps: ['/crop-image', '/image-compressor'],
  },
  {
    slug: '/image-rotator',
    title: 'Image Rotator Online Free',
    h1: 'Free Online Image Rotator',
    description: 'Rotate photos 90°, 180°, or 270° with zero compression loss. Adjust orientation directly in your web browser.',
    category: 'crop-edit',
    related: ['/rotate-image', '/flip-image', '/crop-image', '/image-flipper'],
    nextSteps: ['/crop-image', '/image-compressor'],
    duplicateOf: '/rotate-image',
  },
  {
    slug: '/flip-image',
    title: 'Flip Image Online Free',
    h1: 'Flip Image Online Free',
    description: 'Flip images horizontally or vertically to create mirror effects. Fast, client-side, and watermark-free.',
    category: 'crop-edit',
    related: ['/image-flipper', '/rotate-image', '/crop-image', '/resize-image'],
    nextSteps: ['/crop-image', '/image-compressor'],
  },
  {
    slug: '/image-flipper',
    title: 'Image Flipper Online Free',
    h1: 'Free Online Image Flipper',
    description: 'Mirror photos horizontally or invert vertically with one click. Instant client-side processing.',
    category: 'crop-edit',
    related: ['/flip-image', '/rotate-image', '/crop-image', '/image-rotator'],
    nextSteps: ['/crop-image', '/image-compressor'],
    duplicateOf: '/flip-image',
  },
  {
    slug: '/image-splitter',
    title: 'Image Splitter & Grid Slicer Online',
    h1: 'Split Image into Grids Online Free',
    description: 'Split photos into equal columns, rows, or Instagram 3×1 and 3×3 grid tiles. Download all slices in a single ZIP archive.',
    category: 'crop-edit',
    related: ['/crop-image', '/resize-image', '/instagram-post-resizer', '/collage-maker'],
    nextSteps: ['/instagram-post-resizer', '/image-compressor'],
  },
  {
    slug: '/collage-maker',
    title: 'Collage Maker Online Free',
    h1: 'Free Online Photo Collage Maker',
    description: 'Combine multiple photos into beautiful collage layouts with customizable spacing, rounded corners, and border colors.',
    category: 'crop-edit',
    related: ['/image-splitter', '/crop-image', '/resize-image', '/image-to-pdf'],
    nextSteps: ['/resize-image', '/image-compressor'],
  },
  {
    slug: '/image-enlarger',
    title: 'Image Enlarger Online Free',
    h1: 'Enlarge Images Online Without Quality Loss',
    description: 'Enlarge small images up to 4× with smooth anti-aliased interpolation algorithms directly on your hardware.',
    category: 'crop-edit',
    related: ['/resize-image', '/image-quality', '/image-compressor'],
    nextSteps: ['/image-compressor', '/image-to-pdf'],
  },

  // ==========================================
  // SOCIAL MEDIA PRESETS
  // ==========================================
  {
    slug: '/instagram-post-resizer',
    title: 'Instagram Post Resizer Online Free',
    h1: 'Instagram Post Resizer Online Free',
    description: 'Resize images for Instagram feed posts (1080×1080 Square, 1080×1350 Portrait, 1080×566 Landscape) with zero cropping.',
    category: 'social-media',
    related: ['/instagram-story-resizer', '/resize-image-for-instagram', '/instagram-image-resizer', '/resize-image-to-1080x1080'],
    nextSteps: ['/instagram-story-resizer', '/image-compressor'],
  },
  {
    slug: '/instagram-story-resizer',
    title: 'Instagram Story & Reel Resizer Online Free',
    h1: 'Instagram Story & Reel Resizer Online Free',
    description: 'Fit photos perfectly for Instagram Stories, Reels, and TikTok (1080×1920 pixels, 9:16 aspect ratio) with blurred background padding.',
    category: 'social-media',
    related: ['/instagram-post-resizer', '/resize-image-for-instagram', '/resize-image-to-1920x1080'],
    nextSteps: ['/instagram-post-resizer', '/image-compressor'],
  },
  {
    slug: '/resize-image-for-instagram',
    title: 'Resize Image for Instagram Online Free',
    h1: 'Resize Photos for Instagram Online Free',
    description: 'Resize and optimize pictures for Instagram feeds, profiles, carousels, and stories to prevent compression artifacts.',
    category: 'social-media',
    related: ['/instagram-post-resizer', '/instagram-story-resizer', '/instagram-image-resizer', '/resize-image-to-1080x1080'],
    nextSteps: ['/instagram-story-resizer', '/image-compressor'],
    duplicateOf: '/instagram-post-resizer',
  },
  {
    slug: '/instagram-image-resizer',
    title: 'Instagram Image Resizer Online Free',
    h1: 'Free Online Instagram Image Resizer',
    description: 'Quickly resize pictures to match Instagram standard upload ratios without unwanted cropping.',
    category: 'social-media',
    related: ['/instagram-post-resizer', '/instagram-story-resizer', '/resize-image-for-instagram'],
    nextSteps: ['/instagram-story-resizer', '/image-compressor'],
    duplicateOf: '/instagram-post-resizer',
  },
  {
    slug: '/resize-image-for-youtube-thumbnail',
    title: 'YouTube Thumbnail Resizer Online Free',
    h1: 'Resize Image for YouTube Thumbnail Online',
    description: 'Resize pictures to the standard YouTube video thumbnail size (1280×720 pixels, 16:9 ratio) under the 2MB file size requirement.',
    category: 'social-media',
    related: ['/youtube-thumbnail-resizer', '/youtube-banner-resizer', '/resize-image-to-1920x1080', '/image-compressor'],
    nextSteps: ['/youtube-banner-resizer', '/image-compressor'],
  },
  {
    slug: '/youtube-thumbnail-resizer',
    title: 'YouTube Thumbnail Resizer Online',
    h1: 'Free Online YouTube Thumbnail Resizer',
    description: 'Scale photos to 1280×720 HD resolution with optimal sharpness for YouTube video click-through rates.',
    category: 'social-media',
    related: ['/resize-image-for-youtube-thumbnail', '/youtube-banner-resizer', '/resize-image'],
    nextSteps: ['/youtube-banner-resizer', '/image-compressor'],
    duplicateOf: '/resize-image-for-youtube-thumbnail',
  },
  {
    slug: '/youtube-banner-resizer',
    title: 'YouTube Banner Resizer Online Free',
    h1: 'YouTube Banner & Channel Header Resizer',
    description: 'Resize channel art to YouTube banner dimensions (2560×1440 pixels) with safe zone guides for TV, desktop, and mobile.',
    category: 'social-media',
    related: ['/resize-image-for-youtube-thumbnail', '/youtube-thumbnail-resizer', '/resize-image-to-1920x1080'],
    nextSteps: ['/resize-image-for-youtube-thumbnail', '/image-compressor'],
  },
  {
    slug: '/facebook-image-resizer',
    title: 'Facebook Image Resizer Online Free',
    h1: 'Facebook Image & Cover Photo Resizer',
    description: 'Resize photos for Facebook cover headers (820×312), profile pictures (170×170), and timeline shared posts (1200×630).',
    category: 'social-media',
    related: ['/instagram-post-resizer', '/linkedin-image-resizer', '/resize-image'],
    nextSteps: ['/image-compressor', '/resize-image'],
  },
  {
    slug: '/linkedin-image-resizer',
    title: 'LinkedIn Image Resizer Online Free',
    h1: 'LinkedIn Header & Post Resizer Online',
    description: 'Resize graphics for LinkedIn personal background banners (1584×396), company covers (1128×191), and shared post images (1200×627).',
    category: 'social-media',
    related: ['/facebook-image-resizer', '/youtube-banner-resizer', '/resize-image'],
    nextSteps: ['/image-compressor', '/image-to-pdf'],
  },
  {
    slug: '/whatsapp-image-resizer',
    title: 'WhatsApp Image & DP Resizer Online Free',
    h1: 'WhatsApp Profile Picture & Image Resizer',
    description: 'Resize photos to fit WhatsApp profile picture (DP, 500×500 square) and status updates without awkward cropping or loss of clarity.',
    category: 'social-media',
    related: ['/whatsapp-dp-resizer', '/instagram-post-resizer', '/resize-image-to-1080x1080'],
    nextSteps: ['/image-compressor', '/crop-image'],
  },
  {
    slug: '/whatsapp-dp-resizer',
    title: 'WhatsApp DP Resizer Online Free',
    h1: 'Free Online WhatsApp DP Resizer',
    description: 'Fit your complete portrait into WhatsApp square profile picture with blurred borders or clean white background padding.',
    category: 'social-media',
    related: ['/whatsapp-image-resizer', '/crop-image', '/resize-image-to-1080x1080'],
    nextSteps: ['/image-compressor', '/crop-image'],
    duplicateOf: '/whatsapp-image-resizer',
  },

  // ==========================================
  // PDF TOOLS
  // ==========================================
  {
    slug: '/image-to-pdf',
    title: 'Image to PDF Converter Online Free',
    h1: 'Convert Images to PDF Online Free',
    description: 'Convert JPG, PNG, and WebP images into a single multi-page PDF document. Reorder pages, adjust margins, and export instantly.',
    category: 'pdf-tools',
    related: ['/jpg-to-pdf', '/png-to-pdf', '/pdf-converter', '/compress-pdf', '/image-to-pdf-under-100kb'],
    nextSteps: ['/compress-pdf', '/pdf-to-jpg'],
  },
  {
    slug: '/jpg-to-pdf',
    title: 'JPG to PDF Converter Online Free',
    h1: 'Convert JPG to PDF Online Free',
    description: 'Combine multiple JPG/JPEG photos into an organized PDF document directly in your browser. 100% private and free.',
    category: 'pdf-tools',
    related: ['/png-to-pdf', '/image-to-pdf', '/jpg-to-pdf-under-50kb', '/compress-pdf'],
    nextSteps: ['/compress-pdf', '/pdf-to-jpg'],
  },
  {
    slug: '/png-to-pdf',
    title: 'PNG to PDF Converter Online Free',
    h1: 'Convert PNG to PDF Online Free',
    description: 'Convert PNG pictures and graphic designs into high-resolution PDF pages with crisp typography and clean vector margins.',
    category: 'pdf-tools',
    related: ['/jpg-to-pdf', '/image-to-pdf', '/compress-pdf', '/pdf-converter'],
    nextSteps: ['/compress-pdf', '/pdf-to-png'],
  },
  {
    slug: '/compress-pdf',
    title: 'Compress PDF Online Free',
    h1: 'Compress PDF Documents Online Free',
    description: 'Compress PDF files online for free. Optimize document file sizes while keeping embedded graphics and text razor sharp.',
    category: 'pdf-tools',
    related: ['/pdf-converter', '/image-to-pdf', '/pdf-to-jpg', '/pdf-to-word'],
    nextSteps: ['/pdf-converter', '/pdf-to-word'],
  },
  {
    slug: '/pdf-converter',
    title: 'PDF Converter Online Free',
    h1: 'All-in-One Online PDF Converter',
    description: 'Convert PDF documents to and from images, Word docs, and compact PDF archives in your browser with zero latency.',
    category: 'pdf-tools',
    related: ['/pdf-to-word', '/word-to-pdf', '/pdf-to-jpg', '/compress-pdf', '/image-to-pdf'],
    nextSteps: ['/pdf-to-word', '/compress-pdf'],
  },
  {
    slug: '/pdf-to-jpg',
    title: 'PDF to JPG Converter Online Free',
    h1: 'Convert PDF Pages to JPG Images Online',
    description: 'Extract every page of a PDF document into high-resolution JPG images. Fast, free, and completely client-side.',
    category: 'pdf-tools',
    related: ['/pdf-to-png', '/pdf-converter', '/image-to-pdf', '/jpg-to-pdf'],
    nextSteps: ['/compress-jpg', '/resize-jpg'],
  },
  {
    slug: '/pdf-to-png',
    title: 'PDF to PNG Converter Online Free',
    h1: 'Convert PDF Pages to PNG Images Online',
    description: 'Convert PDF pages to lossless PNG pictures with high visual clarity. Ideal for charts, diagrams, and digital signatures.',
    category: 'pdf-tools',
    related: ['/pdf-to-jpg', '/pdf-converter', '/image-to-pdf', '/png-to-svg'],
    nextSteps: ['/compress-png', '/resize-png'],
  },
  {
    slug: '/pdf-to-gif',
    title: 'PDF to Animated GIF Converter Online Free',
    h1: 'Convert PDF Pages to Animated GIF Online',
    description: 'Turn multi-page PDF documents into animated slide GIF previews with custom frame delay intervals.',
    category: 'pdf-tools',
    related: ['/pdf-to-jpg', '/pdf-to-png', '/pdf-converter'],
    nextSteps: ['/image-compressor', '/pdf-converter'],
  },
  {
    slug: '/pdf-to-word',
    title: 'PDF to Word Converter Online Free',
    h1: 'Convert PDF to Editable Word Document Online',
    description: 'Extract text, formatting, and tables from PDF documents into editable Microsoft Word (.docx) files.',
    category: 'pdf-tools',
    related: ['/word-to-pdf', '/pdf-converter', '/compress-pdf', '/image-to-pdf'],
    nextSteps: ['/word-to-pdf', '/compress-pdf'],
  },
  {
    slug: '/word-to-pdf',
    title: 'Word to PDF Converter Online Free',
    h1: 'Convert Word DOCX to PDF Online Free',
    description: 'Convert Microsoft Word (.docx) files into clean, professional PDF documents with font styling preserved.',
    category: 'pdf-tools',
    related: ['/pdf-to-word', '/pdf-converter', '/compress-pdf', '/image-to-pdf'],
    nextSteps: ['/compress-pdf', '/pdf-converter'],
  },
  {
    slug: '/jpg-to-pdf-under-50kb',
    title: 'JPG to PDF Under 50KB Online Free',
    h1: 'JPG to PDF Under 50KB Converter',
    description: 'Convert JPG images into a compressed PDF document strictly under 50KB for online forms and exam submissions.',
    category: 'pdf-tools',
    related: ['/jpg-to-pdf-under-100kb', '/compress-image-to-50kb', '/compress-jpg-to-50kb', '/image-to-pdf'],
    nextSteps: ['/compress-pdf', '/image-to-pdf'],
  },
  {
    slug: '/jpg-to-pdf-under-100kb',
    title: 'JPG to PDF Under 100KB Online Free',
    h1: 'JPG to PDF Under 100KB Converter',
    description: 'Convert and compress JPG pictures into a high-quality PDF document strictly under 100KB with readable text.',
    category: 'pdf-tools',
    related: ['/jpg-to-pdf-under-50kb', '/jpg-to-pdf-under-200kb', '/image-to-pdf-under-100kb', '/compress-image-to-100kb'],
    nextSteps: ['/compress-pdf', '/image-to-pdf'],
  },
  {
    slug: '/jpg-to-pdf-under-200kb',
    title: 'JPG to PDF Under 200KB Online Free',
    h1: 'JPG to PDF Under 200KB Converter',
    description: 'Combine multiple JPG photos into a professional PDF document compressed under 200KB.',
    category: 'pdf-tools',
    related: ['/jpg-to-pdf-under-100kb', '/image-to-pdf-under-200kb', '/compress-image-to-200kb', '/pdf-converter'],
    nextSteps: ['/compress-pdf', '/image-to-pdf'],
  },
  {
    slug: '/image-to-pdf-under-100kb',
    title: 'Image to PDF Under 100KB Online Free',
    h1: 'Image to PDF Under 100KB Converter',
    description: 'Convert JPG, PNG, and WebP photos into a clean PDF document compressed below 100 KB.',
    category: 'pdf-tools',
    related: ['/image-to-pdf-under-200kb', '/jpg-to-pdf-under-100kb', '/image-to-pdf', '/compress-pdf'],
    nextSteps: ['/compress-pdf', '/image-to-pdf'],
  },
  {
    slug: '/image-to-pdf-under-200kb',
    title: 'Image to PDF Under 200KB Online Free',
    h1: 'Image to PDF Under 200KB Converter',
    description: 'Merge your photos into a crisp, multi-page PDF document optimized under 200 KB.',
    category: 'pdf-tools',
    related: ['/image-to-pdf-under-100kb', '/jpg-to-pdf-under-200kb', '/image-to-pdf', '/pdf-converter'],
    nextSteps: ['/compress-pdf', '/image-to-pdf'],
  },

  // ==========================================
  // UTILITIES & DEVELOPER SUITE
  // ==========================================
  {
    slug: '/code-converter',
    title: 'Code Converter & Code to Image Studio',
    h1: 'Code Converter & Code to Image Studio',
    description: 'Convert code to beautiful images (Carbon style) and transform between JSON, TypeScript, YAML, HTML, JSX & CSS.',
    category: 'utilities',
    related: ['/code-to-image', '/image-to-base64', '/base64-to-image', '/color-picker'],
    nextSteps: ['/code-to-image', '/image-to-base64'],
  },
  {
    slug: '/code-to-image',
    title: 'Code to Image Converter Online',
    h1: 'Code to Image Converter',
    description: 'Generate beautiful, shareable screenshots of code snippets with macOS window frames, dark themes, and gradient backgrounds.',
    category: 'utilities',
    related: ['/code-converter', '/image-to-base64', '/color-picker'],
    nextSteps: ['/code-converter', '/image-compressor'],
  },
  {
    slug: '/image-to-base64',
    title: 'Image to Base64 Converter Online',
    h1: 'Convert Image to Base64 String Online',
    description: 'Convert JPG, PNG, WebP, and SVG images to Base64 encoded data URI strings for CSS, HTML, and JSON embedding.',
    category: 'utilities',
    related: ['/base64-to-image', '/code-converter', '/image-converter'],
    nextSteps: ['/base64-to-image', '/code-converter'],
  },
  {
    slug: '/base64-to-image',
    title: 'Base64 to Image Converter Online',
    h1: 'Convert Base64 String to Image Online',
    description: 'Decode Base64 strings and Data URIs into downloadable JPG, PNG, and WebP image files directly in your browser.',
    category: 'utilities',
    related: ['/image-to-base64', '/code-converter', '/image-converter'],
    nextSteps: ['/image-compressor', '/image-converter'],
  },
  {
    slug: '/color-picker',
    title: 'Image Color Picker & Eyedropper Online',
    h1: 'Online Image Color Picker & Eyedropper',
    description: 'Pick colors from any uploaded image with a magnified eyedropper. Copy HEX, RGB, HSL, and HSV codes with one click.',
    category: 'utilities',
    related: ['/code-converter', '/image-dimensions', '/aspect-ratio-calculator'],
    nextSteps: ['/code-converter', '/image-converter'],
  },
  {
    slug: '/image-quality',
    title: 'Image Quality & Compression Inspector',
    h1: 'Inspect Image Quality & Compression Artifacts',
    description: 'Inspect image sharpness, calculate compression ratios, and detect visual artifacts with real-time zooming.',
    category: 'utilities',
    related: ['/image-compressor', '/image-dimensions', '/aspect-ratio-calculator'],
    nextSteps: ['/image-compressor', '/resize-image'],
  },
];

// Helper functions
export function getAllTools(): Tool[] {
  return TOOLS;
}

export function getTool(slugOrId: string): Tool | undefined {
  const normalized = slugOrId.startsWith('/') ? slugOrId : `/${slugOrId}`;
  const unslashed = slugOrId.replace(/^\//, '');
  return TOOLS.find(
    (t) =>
      t.slug === normalized ||
      t.slug === slugOrId ||
      t.slug.replace(/^\//, '') === unslashed
  );
}

export function getToolsByCategory(categorySlug: string): Tool[] {
  return TOOLS.filter((t) => t.category.toLowerCase() === categorySlug.toLowerCase());
}

export function getCategory(categorySlug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug.toLowerCase() === categorySlug.toLowerCase());
}

export function getRelatedTools(slugOrId: string, limit = 6): Tool[] {
  const tool = getTool(slugOrId);
  if (!tool) return [];

  const explicitRelated = tool.related
    .map((rSlug) => getTool(rSlug))
    .filter((t): t is Tool => !!t && t.slug !== tool.slug);

  if (explicitRelated.length >= limit) {
    return explicitRelated.slice(0, limit);
  }

  // Backfill with category tools
  const sameCategory = getToolsByCategory(tool.category).filter(
    (t) => t.slug !== tool.slug && !explicitRelated.some((er) => er.slug === t.slug)
  );

  return [...explicitRelated, ...sameCategory].slice(0, limit);
}

export function getNextStepTools(slugOrId: string): Tool[] {
  const tool = getTool(slugOrId);
  if (!tool || !tool.nextSteps) return [];
  return tool.nextSteps
    .map((ns) => getTool(ns))
    .filter((t): t is Tool => !!t);
}
