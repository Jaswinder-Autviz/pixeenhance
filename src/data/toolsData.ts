import { ToolSection } from '../lib/image-processing/types';
import { FAQItemData } from '../components/FAQ';

export interface ToolPageConfig {
  slug: string;
  title: string;
  metaDescription: string;
  h1: string;
  subtitle: string;
  initialTab: ToolSection;
  initialFactor?: 1 | 2 | 4;
  presetId?: string;
  features: string[];
  articleTitle: string;
  articleContent: Array<{
    heading: string;
    paragraphs: string[];
  }>;
  specsTable?: {
    headers: string[];
    rows: string[][];
  };
  faqs: FAQItemData[];
}

export const TOOLS_DATA: Record<string, ToolPageConfig> = {
  'image-upscaler': {
    slug: 'image-upscaler',
    title: 'Free AI Image Upscaler Online — Enhance & Enlarge Photos Locally',
    metaDescription: 'Upscale low-resolution images 2× and 4× using browser-based Real-ESRGAN super-resolution. Zero cloud uploads, 100% private and free.',
    h1: 'AI Image Upscaler Online',
    subtitle: 'Enlarge your images up to 4× with deep learning super-resolution running locally on your graphics card via WebGPU.',
    initialTab: 'enhance',
    initialFactor: 2,
    features: ['Real-ESRGAN Deep Neural Model', '2× and 4× Super-Resolution', 'Zero Cloud Transmission', 'Edge-Preserving Detail Recovery'],
    articleTitle: 'Understanding Neural Super-Resolution vs Traditional Interpolation',
    articleContent: [
      {
        heading: 'Why Traditional Bicubic Resampling Softens Images',
        paragraphs: [
          'When an image is magnified using conventional graphics software, standard mathematical algorithms such as nearest neighbor or bicubic interpolation simply calculate an average between surrounding pixel coordinates. While this prevents jagged staircase artifacts, it cannot reconstruct high-frequency data—meaning eyelashes, fabric weaves, hair strands, and text outlines become visibly blurred.',
          'Super-resolution models resolve this limitation by inferring the structural context of the image. By analyzing localized gradient vectors, the neural network reconstructs sharp edge transitions and authentic texture patterns.'
        ]
      },
      {
        heading: 'Instant Processing With Total Privacy',
        paragraphs: [
          'PixEnhance runs intelligent neural models directly on your hardware to reconstruct authentic textures and razor-sharp clarity without any delays or privacy exposure.'
        ]
      }
    ],
    specsTable: {
      headers: ['Feature', 'Bicubic Resizing', 'Cloud AI Upscalers', 'PixEnhance AI'],
      rows: [
        ['Processing Location', 'Local Device', 'Cloud Service', 'Local Device'],
        ['Privacy Guarantee', '100% Private', 'Shared Data', '100% Private & Protected'],
        ['Texture Reconstruction', 'No (Blurs Edges)', 'Yes (High Quality)', 'Yes (Real-ESRGAN Deep Model)'],
        ['Speed / Latency', 'Instant', 'Queue & Transfer Delay', 'Instant Hardware Acceleration']
      ]
    },
    faqs: [
      {
        question: 'Does upscaling decrease the sharpness of the original image?',
        answer: 'No. AI super-resolution actually increases perceptible sharpness and definition by synthesizing authentic edge contrasts and fine micro-details.'
      },
      {
        question: 'What is the maximum file size supported?',
        answer: 'Because processing is executed directly in your browser memory, you can safely process images up to 100MB and resolutions up to 16,000 pixels wide.'
      }
    ]
  },

  'image-upscaler-2x': {
    slug: 'image-upscaler-2x',
    title: 'Upscale Image 2× Online — Double Resolution Without Quality Loss',
    metaDescription: 'Double your image resolution exactly 2× online. Convert 1080p to 4K or 720p to 1440p instantly in your browser.',
    h1: 'Upscale Image 2× Resolution',
    subtitle: 'Increase image width and height by exactly 2× (4× total pixel area) using local neural super-sampling.',
    initialTab: 'enhance',
    initialFactor: 2,
    features: ['Exact 2× Dimension Doubling', '1080p to 4K Transformation', 'Sub-Pixel Neural Sampling', 'Lossless PNG / WebP Export'],
    articleTitle: 'How 2× Upscaling Doubles Canvas Fidelity',
    articleContent: [
      {
        heading: 'The Math of 2× Scaling: 4× More Total Pixels',
        paragraphs: [
          'Doubling the width and height of an image quadruples the total pixel count. For instance, a 1920 × 1080 photograph consists of approximately 2.07 megapixels. When processed through our 2× upscale pipeline, the resulting canvas measures 3840 × 2160 pixels—an expansive 8.29 megapixels.',
          'PixEnhance executes a multi-pass super-resolution pass, inferring high-frequency details to ensure that the doubled resolution remains pin-sharp when printed or displayed on high-DPI monitors.'
        ]
      }
    ],
    faqs: [
      {
        question: 'When should I choose 2× instead of 4×?',
        answer: 'Choose 2× when starting with Full HD (1080p) footage or clear photos where doubling to 4K is optimal. 2× is significantly faster and uses less memory than 4×.'
      }
    ]
  },

  'image-upscaler-4x': {
    slug: 'image-upscaler-4x',
    title: 'Upscale Image 4× Online — 4K & 8K Super-Resolution Generator',
    metaDescription: 'Increase image resolution by 4×. Turn vintage photos, web graphics, and thumbnails into Ultra HD 4K and 8K master files.',
    h1: 'Upscale Image 4× Ultra HD',
    subtitle: 'Quadruple image resolution along both axes (16× total pixel count) with Real-ESRGAN compact neural networks.',
    initialTab: 'enhance',
    initialFactor: 4,
    features: ['16× Total Pixel Area Expansion', 'Tiled Inference Memory Guard', 'Vibrant Edge Hallucination', 'Offline Processing'],
    articleTitle: 'Reconstructing Low-Resolution Imagery into 4K and 8K',
    articleContent: [
      {
        heading: 'From Small Web Assets to Large-Format Print',
        paragraphs: [
          'Scaling an image 4× means every single pixel is expanded into sixteen intelligent sub-pixels. A standard 800 × 600 web graphic becomes a magnificent 3200 × 2400 high-resolution master asset suitable for magazine print and billboard signage.',
          'Our tiled inference engine breaks the image into overlapping blocks to guarantee smooth performance on laptops and mobile devices without running out of WebGL/WebGPU video memory.'
        ]
      }
    ],
    faqs: [
      {
        question: 'Will 4× upscaling make text in logos readable?',
        answer: 'Yes. Deep super-resolution models excel at reconstructing sharp stroke vectors and typographic edges that are normally garbled by bicubic scaling.'
      }
    ]
  },

  'face-enhancer': {
    slug: 'face-enhancer',
    title: 'Free AI Face Enhancer Online — Restore Portrait Details & Clarity',
    metaDescription: 'Enhance facial clarity, smooth skin textures, and sharpen eyes and lips locally in your browser. No cloud upload.',
    h1: 'AI Face Enhancer & Portrait Detail Restorer',
    subtitle: 'Detect facial skin tones and restore portrait clarity, reduce blemishes, and recover eye definition with complete privacy.',
    initialTab: 'enhance',
    features: ['Skin Tone Chrominance Modeling', 'Bilateral Complexion Smoothing', 'Eye & Lip Contrast Recovery', 'Adjustable Enhancement Strength'],
    articleTitle: 'How Portrait Detail Enhancement Works',
    articleContent: [
      {
        heading: 'Selective Frequency Portrait Segmentation',
        paragraphs: [
          'Unlike generic blurring filters that destroy facial definition, our modular Face Enhancement engine segments human skin chrominance (YCbCr cluster analysis) and applies selective bilateral smoothing to skin regions while simultaneously applying high-frequency Laplacian edge boost to eyes, lashes, and lip contours.',
          'This produces a naturally retouched portrait with soft, blemish-free skin and piercingly sharp facial features.'
        ]
      }
    ],
    faqs: [
      {
        question: 'Are my personal facial photographs uploaded or stored anywhere?',
        answer: 'Never. Face enhancement runs 100% inside your browser session. No biometric data or image files are transmitted over the internet.'
      }
    ]
  },

  'image-sharpener': {
    slug: 'image-sharpener',
    title: 'Free Image Sharpener Online — Fix Blurry Photos with Unsharp Mask',
    metaDescription: 'Sharpen out-of-focus and blurry photos online with local convolution unsharp masking. Low, medium, and high sharpening levels.',
    h1: 'Image Sharpener Online',
    subtitle: 'Bring out crisp details and eliminate lens softness using high-precision unsharp masking convolution.',
    initialTab: 'enhance',
    features: ['Low, Medium, High Strength', '3×3 Unsharp Mask Convolution', 'Clamped Luminance Range', 'Interactive Before/After View'],
    articleTitle: 'The Physics of Unsharp Masking',
    articleContent: [
      {
        heading: 'How Unsharp Masking Restores Edge Contrast',
        paragraphs: [
          'Unsharp masking works by comparing the original image with a slightly smoothed version. The difference represents high-frequency edge information. By scaling this differential and re-adding it to the original pixel values, subtle boundaries between adjacent objects are highlighted, making the human eye perceive increased crispness and focus.'
        ]
      }
    ],
    faqs: [
      {
        question: 'Which sharpening level should I use?',
        answer: 'For mild lens softness, "Low" or "Medium" provides natural clarity. Use "High" for screenshots, scanned diagrams, or heavily compressed photos.'
      }
    ]
  },

  'image-denoiser': {
    slug: 'image-denoiser',
    title: 'Free Image Denoiser Online — Remove Grain & Noise Locally',
    metaDescription: 'Reduce high-ISO camera sensor noise and compression grain online using high-precision bilateral filtering.',
    h1: 'Image Denoiser Online',
    subtitle: 'Eliminate digital camera grain and JPEG compression noise while preserving sharp contours and vibrant colors.',
    initialTab: 'enhance',
    features: ['Bilateral Spatial/Color Filtering', 'Preserves Crisp Silhouettes', 'Low, Medium, High Presets', 'Zero Quality Degradation'],
    articleTitle: 'Edge-Preserving Bilateral Noise Reduction',
    articleContent: [
      {
        heading: 'Why Standard Gaussian Blur Destroys Photos',
        paragraphs: [
          'Simple Gaussian blur removes noise by averaging all neighboring pixels equally—which severely degrades object outlines and text readability. Bilateral filtering incorporates both a spatial Gaussian distance weight and a photometric color distance weight. Neighboring pixels are only averaged if their color is similar to the central pixel, leaving high-contrast edges intact while smoothing flat grainy areas.'
        ]
      }
    ],
    faqs: [
      {
        question: 'Can I combine Denoising with Sharpening?',
        answer: 'Yes! The recommended professional pipeline is to apply Denoise first (to suppress grain) and then apply Sharpen (to highlight clean object contours).'
      }
    ]
  },

  'resize-image': {
    slug: 'resize-image',
    title: 'Resize Image Online Free — Change Dimensions (Pixels & Presets)',
    metaDescription: 'Resize photos to exact pixel width and height online. Aspect ratio lock, fit/fill modes, and instant download.',
    h1: 'Resize Image Online',
    subtitle: 'Change image dimensions with pixel precision, lock aspect ratios, and choose between Fit, Fill, Crop, or Stretch modes.',
    initialTab: 'resize',
    features: ['Exact Pixel Width & Height', 'Proportional Aspect Ratio Lock', 'Fit, Fill, Crop, Stretch Modes', 'High-Quality Resampling'],
    articleTitle: 'Understanding Image Resizing & Aspect Ratios',
    articleContent: [
      {
        heading: 'Preventing Unwanted Distortion and Aspect Warping',
        paragraphs: [
          'When resizing images, preserving proportions is critical to prevent photos from appearing squished or stretched. Our Resize tool includes an automatic aspect ratio calculator that recalculates the complementary axis as you type. If you need to force a specific rectangular frame (such as 1920×1080), our "Fit" and "Crop" modes ensure the photo looks natural without warping.'
        ]
      }
    ],
    faqs: [
      {
        question: 'What is the difference between "Fit" and "Fill"?',
        answer: '"Fit" scales the image so the entire picture is visible without cropping (letterboxing if needed). "Fill" scales up to cover the entire target dimension, clipping equal margins from the sides.'
      }
    ]
  },

  'resize-image-to-a4': {
    slug: 'resize-image-to-a4',
    title: 'Resize Image to A4 Online — 2480 × 3508 px at 300 DPI for Print',
    metaDescription: 'Resize any photo to standard ISO A4 paper dimensions (2480 × 3508 px at 300 DPI) for high-resolution document and photo printing.',
    h1: 'Resize Image to A4 Paper Size (300 DPI)',
    subtitle: 'Prepare your images for crisp international A4 printing (2480 × 3508 portrait or 3508 × 2480 landscape).',
    initialTab: 'resize',
    presetId: 'a4-portrait',
    features: ['Standard ISO 216 Dimensions', '300 DPI Print Quality Standard', 'Portrait (2480×3508) & Landscape (3508×2480)', 'Lossless Output'],
    articleTitle: 'A4 Dimension Standards & Print DPI Requirements',
    articleContent: [
      {
        heading: 'Why 300 DPI Matters for Physical Prints',
        paragraphs: [
          'ISO 216 A4 paper measures 210 × 297 mm (8.27 × 11.69 inches). To achieve photographic sharpness on commercial or office laser printers, 300 dots per inch (DPI) is mandatory. Multiplying 8.27 inches by 300 yields 2480 pixels, and 11.69 inches yields 3508 pixels.',
          'Resizing your document or artwork to exactly 2480 × 3508 px ensures that your printout is free from pixelation and margins match standard binder sheets.'
        ]
      }
    ],
    faqs: [
      {
        question: 'Should I download as JPG or PNG for A4 print?',
        answer: 'For text, diagrams, and vector graphics, choose PNG for lossless line definition. For full-color photographs, JPG at 95% quality produces excellent prints with manageable file sizes.'
      }
    ]
  },

  'resize-image-for-instagram': {
    slug: 'resize-image-for-instagram',
    title: 'Resize Image for Instagram Online — Square, Portrait & Landscape',
    metaDescription: 'Resize photos for Instagram feeds without awkward crops. 1080×1080 Square, 1080×1350 Portrait, and 1080×566 Landscape presets.',
    h1: 'Resize Image for Instagram',
    subtitle: 'Format your photos to Instagram specifications: 1:1 Square, 4:5 Portrait, and 1.91:1 Landscape with no unexpected cropping.',
    initialTab: 'resize',
    presetId: 'ig-portrait',
    features: ['Instagram Portrait (1080×1350 px)', 'Square Feed Post (1080×1080 px)', 'Landscape Feed (1080×566 px)', 'Fit / Contain Option (No Cropping)'],
    articleTitle: 'Maximizing Engagement with Instagram Dimensions',
    articleContent: [
      {
        heading: 'Why the 4:5 Portrait (1080 × 1350) Outperforms Square',
        paragraphs: [
          'While the classic 1:1 square was Instagram’s original hallmark, 4:5 Portrait posts occupy approximately 25% more vertical screen estate on modern smartphones as users scroll their feeds. This increased visual dominance consistently delivers higher engagement and dwell times.',
          'Use our "Fit" mode to fit wide landscape photos onto a 1080×1350 portrait canvas without losing edge details.'
        ]
      }
    ],
    faqs: [
      {
        question: 'Why does Instagram compress my photos when I upload?',
        answer: 'Instagram compresses any image wider than 1080 pixels. By pre-resizing to exactly 1080 px with our tool, Instagram will accept your file with minimal automated re-compression.'
      }
    ]
  },

  'youtube-thumbnail-maker': {
    slug: 'youtube-thumbnail-maker',
    title: 'YouTube Thumbnail Resizer & Maker (1280 × 720 px) Online',
    metaDescription: 'Resize and enhance images to official 1280 × 720 YouTube thumbnail specifications. Boost saturation, clarity, and export under 2MB.',
    h1: 'YouTube Thumbnail Resizer & Creator',
    subtitle: 'Optimize your video thumbnails to 1280 × 720 pixels (16:9 ratio) with vibrant color adjustments and edge sharpening.',
    initialTab: 'resize',
    presetId: 'yt-thumb',
    features: ['Official 1280 × 720 Pixel Preset', '16:9 Cinema Aspect Ratio', 'Vibrancy & Contrast Enhancement', 'Under 2MB Export Optimization'],
    articleTitle: 'Creating High-CTR YouTube Thumbnails',
    articleContent: [
      {
        heading: 'Official YouTube Thumbnail Guidelines',
        paragraphs: [
          'YouTube specifies that custom thumbnails must have a resolution of 1280 × 720 (minimum width 640 px), a 16:9 aspect ratio, and a maximum file size under 2MB in JPG, PNG, or WebP.',
          'Thumbnails are displayed at minuscule dimensions on mobile search results. Increasing image contrast by +15% and sharpening edge borders ensures your thumbnail remains legible and click-worthy even when shrunk to 120 pixels wide.'
        ]
      }
    ],
    faqs: [
      {
        question: 'What format is best for YouTube thumbnails?',
        answer: 'JPG at 85–90% quality or WebP is recommended because they produce vibrant colors while easily staying well below the 2MB YouTube upload ceiling.'
      }
    ]
  },

  'image-converter': {
    slug: 'image-converter',
    title: 'Free Image Converter Online — Convert JPG, PNG, WebP in Browser',
    metaDescription: 'Convert images between JPG, PNG, and WebP formats instantly with real-time compression quality control and file size estimates.',
    h1: 'Online Image Converter',
    subtitle: 'Convert between modern WebP, lossless PNG, and universal JPG files with full privacy and compression control.',
    initialTab: 'convert',
    features: ['JPG, PNG, WebP Conversions', 'Lossy Quality Slider (10% to 100%)', 'Real-Time File Size Estimation', 'Batch Queue Compatible'],
    articleTitle: 'Choosing the Right Image Format for the Web',
    articleContent: [
      {
        heading: 'Balancing Bandwidth, Transparency, and Visual Fidelity',
        paragraphs: [
          'Selecting the right image format can reduce webpage load times by up to 60%. PNG is optimal for transparency and crisp vector lines. WebP delivers significant savings for photographs with virtually zero perceptual loss. Our converter lets you preview estimated file sizes before saving.'
        ]
      }
    ],
    faqs: [
      {
        question: 'Is WebP supported by all modern web browsers?',
        answer: 'Yes. Chrome, Safari, Edge, Firefox, and mobile browsers on iOS and Android have full native support for WebP since 2020.'
      }
    ]
  },

  'jpg-to-png': {
    slug: 'jpg-to-png',
    title: 'JPG to PNG Converter Online — Convert JPEG to Lossless PNG Free',
    metaDescription: 'Convert JPG images to high-quality lossless PNG format online. Fast, free, and processed locally in your browser.',
    h1: 'JPG to PNG Converter',
    subtitle: 'Transform lossy compressed JPG photos into pristine, lossless PNG files with zero generation loss.',
    initialTab: 'convert',
    features: ['Lossless PNG Output', 'No Artifact Generation', 'Unlimited Conversions', '100% Private Processing'],
    articleTitle: 'Why Convert JPG to PNG?',
    articleContent: [
      {
        heading: 'Preserving Image State During Multiple Edits',
        paragraphs: [
          'Every time a JPG file is saved and re-saved, DCT lossy compression is reapplied, compounding blocky compression artifacts. Converting your JPG to PNG stops this degradation, allowing you to edit, annotate, or archive the image with lossless fidelity.'
        ]
      }
    ],
    faqs: [
      {
        question: 'Will converting a JPG to PNG make the file size larger?',
        answer: 'Yes. PNG uses lossless deflate compression rather than lossy DCT compression, so the resulting file is typically larger but preserves exact pixel integrity.'
      }
    ]
  },

  'png-to-jpg': {
    slug: 'png-to-jpg',
    title: 'PNG to JPG Converter Online — Reduce PNG File Size Free',
    metaDescription: 'Convert large PNG images to compact JPG format online. Adjust compression quality to achieve up to 80% file size reduction.',
    h1: 'PNG to JPG Converter',
    subtitle: 'Shrink massive PNG files into lightweight, universal JPG images with custom compression quality control.',
    initialTab: 'convert',
    features: ['Up to 85% File Size Reduction', 'Adjustable JPEG Quality Slider', 'Universal Device Compatibility', 'Fast Local Conversion'],
    articleTitle: 'Reducing Heavy PNG File Sizes for Faster Websites',
    articleContent: [
      {
        heading: 'When to Convert PNG to JPG',
        paragraphs: [
          'Photographs saved as PNG files often balloon to 5MB–15MB, slowing down websites and exceeding email attachment limits. Converting them to high-quality JPG (at 85% quality) typically reduces file size by 70% to 85% with zero perceptible loss in photographic detail.'
        ]
      }
    ],
    faqs: [
      {
        question: 'What happens to transparent backgrounds when converting PNG to JPG?',
        answer: 'Because the JPEG format does not support alpha channels, transparent areas are automatically rendered as clean white background pixels.'
      }
    ]
  },

  'webp-converter': {
    slug: 'webp-converter',
    title: 'WebP Converter Online — Convert to and from WebP Image Format',
    metaDescription: 'Convert images to high-efficiency WebP format online. Reduce image weight by 30% compared to JPG without quality loss.',
    h1: 'WebP Image Converter',
    subtitle: 'Modernize your graphics with next-gen WebP compression. Convert JPG and PNG into high-efficiency web images.',
    initialTab: 'convert',
    features: ['Google WebP Compression', 'Supports Alpha Transparency', '30% Smaller than JPG', 'Instant Browser Download'],
    articleTitle: 'The Superior Efficiency of Google WebP',
    articleContent: [
      {
        heading: 'How WebP Outperforms Legacy Formats',
        paragraphs: [
          'WebP uses predictive coding based on VP8 video keyframes to encode pixel blocks. It achieves 26% smaller file sizes compared to PNG while retaining transparency, and 25–34% smaller file sizes compared to JPEG at equivalent structural similarity (SSIM) indexes.'
        ]
      }
    ],
    faqs: [
      {
        question: 'Can WebP images have transparent backgrounds?',
        answer: 'Yes. WebP supports full 8-bit alpha transparency while producing significantly smaller files than transparent PNGs.'
      }
    ]
  },

  'image-editor': {
    slug: 'image-editor',
    title: 'Free Online Image Editor — Crop, Rotate, Adjust & Enhance Locally',
    metaDescription: 'Full-featured browser image editor with non-destructive undo/redo, aspect cropping, rotation, color filters, and AI enhancements.',
    h1: 'Online Image Editor',
    subtitle: 'Complete online image studio: crop, rotate, adjust brightness and contrast, upscale, and convert with non-destructive editing.',
    initialTab: 'edit',
    features: ['Non-Destructive History (Undo/Redo)', 'Aspect Ratio Cropping & Free Crop', 'Brightness, Contrast, Saturation, Blur', 'Interactive Before/After Slider'],
    articleTitle: 'The Non-Destructive Photo Editing Workflow',
    articleContent: [
      {
        heading: 'Preserving Original Pixel Data with State History',
        paragraphs: [
          'PixEnhance utilizes a non-destructive pipeline architecture. Your original uploaded photo remains stored in an immutable memory buffer. Every adjustment, crop, rotation, and filter is maintained as an evaluation state. You can undo, redo, or reset any operation at any time without accumulating compression noise.'
        ]
      }
    ],
    faqs: [
      {
        question: 'Can I undo accidental changes in the editor?',
        answer: 'Yes! The workspace includes an Undo (Ctrl+Z) and Redo (Ctrl+Y) history stack capable of tracking up to 30 past editing steps.'
      }
    ]
  }
};

