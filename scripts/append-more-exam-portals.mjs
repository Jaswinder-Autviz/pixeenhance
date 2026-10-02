import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetFile = path.resolve(__dirname, '../src/data/seoLandingPages.ts');

if (!fs.existsSync(targetFile)) {
  console.error(`Target file not found: ${targetFile}`);
  process.exit(1);
}

let content = fs.readFileSync(targetFile, 'utf-8');

if (content.includes('gate-photo-resizer')) {
  console.log('New exam pages are already present in seoLandingPages.ts!');
  process.exit(0);
}

const NEW_EXAM_PAGES = `  // 31. /gate-photo-resizer
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
        'UPSC requires that the candidate\\'s name and the date of photograph are clearly printed at the bottom of the photo.',
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
      { question: 'Is candidate name and date required on UPSC NDA photo?', answer: 'Yes, UPSC mandates that the applicant\\'s name and date of photo be printed clearly at the bottom.' }
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
      { question: 'What is written on the Agniveer Air Force slate?', answer: 'The candidate\\'s name and date of photograph must be written in capital letters with white chalk on a black slate held in front of the chest.' }
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
        'The candidate\\'s photograph should show 80% face coverage (without mask) including ears against a white background.',
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
        'The photograph must have the candidate\\'s name and date of photograph printed clearly on the lower portion.'
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
`;

const regex = /\];\s*(export const SEO_LANDING_PAGE_MAP)/;
if (!regex.test(content)) {
  console.error('Could not find closing bracket regex in seoLandingPages.ts');
  process.exit(1);
}

content = content.replace(regex, ',\n\n' + NEW_EXAM_PAGES + '];\n\n$1');
fs.writeFileSync(targetFile, content, 'utf-8');

console.log('Successfully appended 20 new high-demand exam portals into seoLandingPages.ts!');
