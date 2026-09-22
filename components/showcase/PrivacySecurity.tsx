import React from 'react';
import { ShieldCheck, HardDrive, Cloud, Check, Lock } from 'lucide-react';

export const PrivacySecurity: React.FC = () => {
  return (
    <section className="py-20 bg-canvas border-b border-charcoal-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="text-xs uppercase tracking-widest font-mono text-emerald-800 font-semibold inline-flex items-center gap-1.5">
            <Lock size={12} /> Transparent Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-charcoal tracking-tight mt-2 mb-4">
            Device-Local vs Cloud AI Privacy
          </h2>
          <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed font-normal">
            We believe in absolute technical transparency. We never claim cloud AI stays on your device, and we never send local files to remote servers without explicit choice.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Local Card */}
          <div className="rounded-2xl border border-charcoal-border/80 bg-canvas-light p-8 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-800">
                  <HardDrive size={22} />
                </div>
                <span className="text-[11px] font-mono uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full bg-emerald-100/70 text-emerald-900">
                  100% On-Device
                </span>
              </div>

              <h3 className="font-serif text-xl font-bold text-charcoal mb-2">
                Private On-Device Processing
              </h3>

              <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed mb-6">
                All resizing, cropping, color tuning, sharpen, denoise, and Real-ESRGAN super-resolution algorithms execute directly on your CPU/GPU through WebGPU and WebAssembly.
              </p>

              <ul className="flex flex-col gap-2.5 text-xs text-charcoal">
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-emerald-700 shrink-0" />
                  <span>Images never leave your machine</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-emerald-700 shrink-0" />
                  <span>Works completely offline once loaded</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-emerald-700 shrink-0" />
                  <span>Zero telemetry or image storage</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-charcoal-border/60 text-[11px] text-charcoal-subtle font-mono">
              Label: &quot;Processed on your device.&quot;
            </div>
          </div>

          {/* Cloud Gemini Card */}
          <div className="rounded-2xl border border-charcoal-border/80 bg-canvas-light p-8 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-11 h-11 rounded-xl bg-bronze/15 border border-bronze/30 flex items-center justify-center text-bronze-dark">
                  <Cloud size={22} />
                </div>
                <span className="text-[11px] font-mono uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full bg-bronze/20 text-bronze-dark">
                  Encrypted AI
                </span>
              </div>

              <h3 className="font-serif text-xl font-bold text-charcoal mb-2">
                Gemini Cloud Intelligence
              </h3>

              <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed mb-6">
                When you choose Gemini Intelligent Enhancement, the image is securely analyzed with end-to-end encryption and complete data privacy.
              </p>

              <ul className="flex flex-col gap-2.5 text-xs text-charcoal">
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-bronze-rich shrink-0" />
                  <span>Only invoked when you explicitly click it</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-bronze-rich shrink-0" />
                  <span>Transferred over TLS encrypted server routes</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-bronze-rich shrink-0" />
                  <span>Never stored, trained upon, or shared</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-charcoal-border/60 text-[11px] text-charcoal-subtle font-mono">
              Label: &quot;This AI feature securely sends the image for processing.&quot;
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
