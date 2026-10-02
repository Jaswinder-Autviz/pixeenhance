"""
Programmatic SEO Script for PixEnhance
Appends 20 High-Intent Government Exam and Form Resizing landing pages
with exact official specs, dimensions, tables, FAQs, and interactive tools.
"""

import os
import re

NEW_EXAM_PAGES = '''  // 21. /ssc-photo-resizer
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
];
'''

def main():
    target_file = os.path.join(os.path.dirname(__file__), "..", "src", "data", "seoLandingPages.ts")
    target_file = os.path.abspath(target_file)
    
    if not os.path.exists(target_file):
        print(f"Error: {target_file} not found!")
        return

    with open(target_file, "r", encoding="utf-8") as f:
        content = f.read()

    # Check if already added
    if "ssc-photo-resizer" in content:
        print("Exam pages are already present in seoLandingPages.ts!")
        return

    # Find the closing bracket of SEO_LANDING_PAGES array
    marker = "];\n\nexport const SEO_LANDING_PAGE_MAP"
    if marker not in content:
        marker = "];\nexport const SEO_LANDING_PAGE_MAP"
    
    if marker not in content:
        print("Could not find array end marker in seoLandingPages.ts!")
        return

    # Insert new exam pages right before closing bracket
    new_content = content.replace(marker, ",\n\n" + NEW_EXAM_PAGES + marker)

    with open(target_file, "w", encoding="utf-8") as f:
        f.write(new_content)

    print("Successfully added 10 Top Exam Programmatic SEO Pages to seoLandingPages.ts!")

if __name__ == "__main__":
    main()
