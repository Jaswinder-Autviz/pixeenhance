import React from 'react';
import { Sparkles, CloudLightning, UserCheck, Shield, Scaling, RefreshCw } from 'lucide-react';

export const AICapabilities: React.FC = () => {
  const capabilities = [
    {
      icon: Sparkles,
      tag: 'On-Device AI',
      title: 'Neural Super-Resolution (2× & 4×)',
      desc: 'Reconstruct lost high-frequency texture and edge transitions locally using Real-ESRGAN deep convolutional tensors via WebGPU.',
      badge: 'Local WebGPU'
    },
    {
      icon: CloudLightning,
      tag: 'Cloud Intelligence',
      title: 'Gemini Multi-Modal Vision',
      desc: 'Harness Google Gemini vision models to evaluate tonal balance, recover micro-contrast, and refine fine photographic textures securely.',
      badge: 'Cloud AI'
    },
    {
      icon: UserCheck,
      tag: 'Facial Fidelity',
      title: 'Identity-Preserving Face Enhance',
      desc: 'Restore facial clarity and iris sharpness while strictly preserving authentic proportions, skin tones, and natural expression.',
      badge: 'Zero Beauty-Filter'
    },
    {
      icon: Scaling,
      tag: 'Precision Geometry',
      title: 'Dimension & Preset Resizing',
      desc: 'Seamlessly scale to A4 print standard, Instagram post/story, YouTube 720p, or 4K UHD with aspect ratio lock and intelligent fit modes.',
      badge: 'Standard Presets'
    },
    {
      icon: RefreshCw,
      tag: 'Format Conversion',
      title: 'Lossless & Compact Conversion',
      desc: 'Convert seamlessly between JPG, PNG, and modern WebP with fine-tuned quality control and instant byte estimation.',
      badge: '100% Private'
    },
    {
      icon: Shield,
      tag: 'Security by Design',
      title: 'Strict Data Privacy Guarantee',
      desc: 'Your photos and documents are processed with complete security, total confidentiality, and zero third-party tracking.',
      badge: '100% Private'
    }
  ];

  return (
    <section className="py-20 bg-canvas border-b border-charcoal-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="text-xs uppercase tracking-widest font-mono text-bronze-deep font-semibold">
            Engineered For Excellence
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-charcoal tracking-tight mt-2 mb-4">
            Intelligent Studio Capabilities
          </h2>
          <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed font-normal">
            Every feature is designed with mathematical precision and aesthetic care, ensuring your imagery retains authentic artistic fidelity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((cap, idx) => {
            const Icon = cap.icon;
            return (
              <div
                key={idx}
                className="rounded-xl border border-charcoal-border/70 bg-canvas-light p-6 shadow-sm hover:shadow-luxury hover:border-bronze/60 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-canvas-warm border border-charcoal-border/60 flex items-center justify-center text-bronze-rich">
                      <Icon size={18} />
                    </div>
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-canvas-warm border border-charcoal-border text-charcoal-subtle">
                      {cap.badge}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-bronze-deep font-semibold block mb-1">
                    {cap.tag}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-charcoal mb-2">
                    {cap.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
                    {cap.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
