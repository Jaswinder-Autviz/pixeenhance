import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export interface FAQItemData {
  question: string;
  answer: string;
}

interface FAQProps {
  items?: FAQItemData[];
}

export const DEFAULT_FAQS: FAQItemData[] = [
  {
    question: 'How does AI image upscaling work?',
    answer:
      'Unlike traditional bicubic interpolation which merely duplicates pixels and blurs fine edges, our AI upscaler computes deep feature maps to reconstruct lost high-frequency textures, sharp silhouettes, and crisp clarity with zero data leaks.'
  },
  {
    question: 'Are my uploaded photos sent to remote servers or stored?',
    answer:
      'No. Your photos stay strictly on your device. All computations—including deep learning inference, convolution sharpening, and format conversions—are executed locally with complete confidentiality and zero file sharing.'
  },
  {
    question: 'How do I upscale an image to 4K resolution?',
    answer:
      'To reach 4K (3840 × 2160 px), upload your 1080p or high-definition photo and select "Upscale 2×" or "Upscale 4×" in the AI Enhance panel. Alternatively, open the Resize panel, click the "4K Ultra HD" preset, and select your preferred scaling mode ("Fit", "Fill", or "Stretch").'
  },
  {
    question: 'What is the difference between JPG, PNG, and WebP formats?',
    answer:
      'PNG is a lossless format ideal for graphic design, logos, screenshots, and artwork with transparency. JPG is a ubiquitous lossy compression format best for photographs where small file sizes are preferred. WebP is a modern image format developed by Google that delivers 25% to 35% smaller file sizes than JPG with superior visual fidelity and alpha transparency support.'
  },
  {
    question: 'Can I resize photos for Instagram without cropping?',
    answer:
      'Yes. Instagram supports Square (1080×1080), Portrait (1080×1350), and Landscape (1080×566). In our Resize panel, select the Instagram preset and choose the "Fit" mode. This preserves 100% of your photo without unexpected edge crops.'
  },
  {
    question: 'How can I fix a blurry or grainy photo?',
    answer:
      'First, use the "Denoise" control (Medium or High) to eliminate sensor grain and compression speckles through an edge-preserving bilateral filter. Next, select "Sharpen" (Low or Medium) to amplify line definitions and micro-contrasts.'
  },
  {
    question: 'What happens if my original image is extremely large?',
    answer:
      'The workspace features memory protection algorithms. High-resolution photos are automatically partitioned into seamless padded tiles during AI super-resolution. This prevents mobile browsers and low-memory machines from running out of memory or crashing.'
  }
];

export const FAQ: React.FC<FAQProps> = ({ items = DEFAULT_FAQS }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="faq-section" style={{ marginTop: '2.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.75rem' }}>
        <HelpCircle size={22} color="var(--accent-primary)" />
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
          Frequently Asked Questions
        </h2>
      </div>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
        Everything you need to know about browser-based super-resolution, local privacy, and image processing.
      </p>

      <div className="faq-list">
        {items.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className={`faq-item ${isOpen ? 'open' : ''}`}>
              <button
                type="button"
                className="faq-question-btn"
                onClick={() => toggle(idx)}
                aria-expanded={isOpen}
              >
                <span>{item.question}</span>
                <ChevronDown
                  size={18}
                  style={{
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 200ms ease',
                    color: isOpen ? 'var(--accent-primary)' : 'var(--text-muted)'
                  }}
                />
              </button>
              {isOpen && (
                <div className="faq-answer">
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
