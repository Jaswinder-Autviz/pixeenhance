'use client';

import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, MessageSquare, Clock, MapPin, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      const subject = encodeURIComponent(`PixEnhance Inquiry from ${formData.name}`);
      const body = encodeURIComponent(
        `Sender Name: ${formData.name}\nSender Email: ${formData.email}\n\nMessage Content:\n${formData.message}\n\n---\nSent via PixEnhance Contact Portal`
      );
      // Trigger default mail client with prefilled details
      window.location.href = `mailto:pa.jaswindersingh@gmail.com?subject=${subject}&body=${body}`;
      setSubmitted(true);
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 dark:bg-[#070b14] text-slate-900 dark:text-white py-12 sm:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-semibold mb-3">
            <MessageSquare className="h-3.5 w-3.5" />
            <span>Developer Support &amp; Publisher Inquiries</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-2">
            Contact PixEnhance
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl mx-auto leading-relaxed">
            Have a question about image processing, bug report, feature request, or publisher compliance inquiry? Reach out to our technical team directly.
          </p>
        </div>

        {/* Direct Contact Cards */}
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Primary Support Email</p>
                <a
                  href="mailto:pa.jaswindersingh@gmail.com"
                  className="text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  pa.jaswindersingh@gmail.com
                </a>
              </div>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Monitored for technical bug reports, API inquiries, and AdSense publisher verification.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Response Window</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white">24 to 48 Hours</p>
              </div>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              We respond to all technical queries and feature suggestions on standard business days.
            </p>
          </div>
        </div>

        {/* Contact Form Card */}
        <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-xs">
          {submitted ? (
            <div className="py-10 text-center space-y-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 mx-auto">
                <CheckCircle2 className="h-7 w-7" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Email Client Launched
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                Your default email application was triggered with your message details addressed to <span className="font-mono font-semibold text-indigo-600 dark:text-indigo-400">pa.jaswindersingh@gmail.com</span>. If your client did not launch, please click the direct link below.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <a
                  href={`mailto:pa.jaswindersingh@gmail.com?subject=${encodeURIComponent(
                    `PixEnhance Inquiry from ${formData.name}`
                  )}&body=${encodeURIComponent(
                    `Sender Name: ${formData.name}\nSender Email: ${formData.email}\n\nMessage:\n${formData.message}`
                  )}`}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition-colors"
                >
                  Open in Email Client Again
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', message: '' });
                  }}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-200"
                >
                  Write Another Message
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="border-b border-slate-100 dark:border-slate-800 pb-3 mb-4">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  Send a Message
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Fill in the fields below to prepare your message for our developer inbox.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Jaswinder Singh"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/80 text-sm focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Your Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/80 text-sm focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Message Details *
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Please describe your question, bug report, or feature suggestion in detail..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/80 text-sm focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-500/20 transition-all flex items-center justify-center gap-2"
              >
                <Send className="h-4 w-4" />
                <span>Send Message to Support</span>
              </button>
            </form>
          )}
        </div>

        {/* Security & Data Privacy Notice */}
        <div className="mt-8 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 flex items-center gap-3.5 text-xs text-slate-500 dark:text-slate-400">
          <ShieldCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <p>
            Your contact details are strictly used to reply to your inquiry. We never share, sell, or rent user contact information with third parties or marketing networks.
          </p>
        </div>
      </div>
    </div>
  );
}
