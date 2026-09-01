import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { api } from '../../lib/api';
import { Mail, MessageSquare, User, AtSign, CheckCircle2, Loader2, Phone, Globe, MapPin, Send, ArrowRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon, FacebookIcon } from '../common/BrandIcons';
import confetti from 'canvas-confetti';

export const ContactSection: React.FC = () => {
  const { settings, addToast } = usePortfolio();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    telegram: '',
    message: '',
    honeypot: '', // Old honeypot, kept for compatibility if needed
    website: '',  // New honeypot for bots
    timestamp: Date.now(), // Time tracker for fast-fill bots
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      addToast('warning', 'Missing Fields', 'Please complete all required fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      addToast('error', 'Invalid Email', 'Please provide a valid email format.');
      return;
    }

    setIsSubmitting(true);
    addToast('info', 'Sending Message', 'Transmitting your inquiry...', 2000);

    try {
      const res = await api.sendMessage(formData);

      if (res.success) {
        setIsSuccess(true);
        addToast('success', 'Message Dispatched', 'Thank you! I will respond promptly.');
        
        confetti({
          particleCount: 75,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#3b82f6', '#06b6d4', '#10b981'],
        });

        setFormData({
          name: '',
          email: '',
          subject: '',
          telegram: '',
          message: '',
          honeypot: '',
          website: '',
          timestamp: Date.now(),
        });
      }
    } catch (err: any) {
      addToast('error', 'Notice', err.message || 'Error sending message. Please reach out directly via Email or LinkedIn.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 relative overflow-hidden bg-slate-100/40 dark:bg-surface/20 border-t border-slate-200/80 dark:border-white/5">
      {/* Background glow */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-t from-blue-500/10 via-cyan-500/5 to-transparent blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Strong Final CTA Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 font-mono text-xs font-semibold uppercase tracking-wider mb-3 border border-blue-500/20">
            <Mail className="w-3.5 h-3.5" />
            <span>Let's Build Together</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Contact Me
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Info Panel */}
          <div className="lg:col-span-5 space-y-5">
            <div className="glass-panel p-6 sm:p-7 rounded-2xl border border-slate-200/90 dark:border-white/10 space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
                Direct Channels
              </h3>

              <div className="space-y-2.5 text-xs sm:text-sm">
                <a
                  href={`mailto:${settings.email}`}
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-100/90 dark:bg-surface-elevated hover:bg-slate-200/90 dark:hover:bg-white/10 border border-slate-200/60 dark:border-white/5 transition-all text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white group"
                >
                  <div className="p-2 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 group-hover:scale-105 transition-transform">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-[10px] font-mono uppercase text-slate-400">Email Address</div>
                    <div className="text-xs font-semibold truncate text-slate-900 dark:text-white">{settings.email}</div>
                  </div>
                </a>

                <a
                  href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-100/90 dark:bg-surface-elevated hover:bg-slate-200/90 dark:hover:bg-white/10 border border-slate-200/60 dark:border-white/5 transition-all text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white group"
                >
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 group-hover:scale-105 transition-transform">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase text-slate-400">Phone & Telegram</div>
                    <div className="text-xs font-semibold text-slate-900 dark:text-white">{settings.phone}</div>
                  </div>
                </a>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-100/90 dark:bg-surface-elevated border border-slate-200/60 dark:border-white/5 text-slate-700 dark:text-slate-300">
                  <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase text-slate-400">Location</div>
                    <div className="text-xs font-semibold text-slate-900 dark:text-white">{settings.location}</div>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-3 border-t border-slate-200/80 dark:border-white/5">
                <div className="text-[10px] font-mono uppercase text-slate-400 dark:text-slate-500 font-semibold mb-2.5">
                  Professional Networks
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={settings.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg bg-slate-100 dark:bg-surface hover:bg-slate-200 dark:hover:bg-surface-elevated text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200/80 dark:border-white/10 transition-colors shadow-2xs"
                    title="GitHub"
                    aria-label="GitHub Profile"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                  <a
                    href={settings.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg bg-slate-100 dark:bg-surface hover:bg-slate-200 dark:hover:bg-surface-elevated text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200/80 dark:border-white/10 transition-colors shadow-2xs"
                    title="LinkedIn"
                    aria-label="LinkedIn Profile"
                  >
                    <LinkedinIcon className="w-4 h-4" />
                  </a>
                  <a
                    href={settings.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg bg-slate-100 dark:bg-surface hover:bg-slate-200 dark:hover:bg-surface-elevated text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200/80 dark:border-white/10 transition-colors shadow-2xs"
                    title="Instagram"
                    aria-label="Instagram Profile"
                  >
                    <InstagramIcon className="w-4 h-4" />
                  </a>
                  <a
                    href={settings.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg bg-slate-100 dark:bg-surface hover:bg-slate-200 dark:hover:bg-surface-elevated text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200/80 dark:border-white/10 transition-colors shadow-2xs"
                    title="Facebook"
                    aria-label="Facebook Profile"
                  >
                    <FacebookIcon className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form Card */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-6 sm:p-7 rounded-2xl border border-slate-200/90 dark:border-white/10">
              
              {isSuccess ? (
                <div className="text-center py-8 space-y-3 animate-in fade-in">
                  <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center justify-center mx-auto text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Message Sent</h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-sm mx-auto">
                    Thank you for reaching out. I've received your message and will respond soon.
                  </p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="mt-3 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-all shadow-sm cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* Invisible Honeypots for Anti-Spam */}
                  <div className="hidden" aria-hidden="true" style={{ display: 'none', visibility: 'hidden' }}>
                    <input
                      type="text"
                      name="honeypot"
                      value={formData.honeypot}
                      onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {/* Name */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                        <span>Name *</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-white dark:bg-surface-elevated/90 border border-slate-200 dark:border-white/10 focus:border-blue-500 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none transition-colors shadow-2xs"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                        <AtSign className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                        <span>Email *</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="you@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-white dark:bg-surface-elevated/90 border border-slate-200 dark:border-white/10 focus:border-blue-500 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none transition-colors shadow-2xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {/* Telegram Handle */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <Send className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" />
                          <span>Telegram Handle</span>
                        </span>
                        <span className="text-[10px] text-slate-400 font-normal">Optional</span>
                      </label>
                      <input
                        type="text"
                        placeholder="@username or phone"
                        value={formData.telegram}
                        onChange={(e) => setFormData({ ...formData, telegram: e.target.value })}
                        className="w-full bg-white dark:bg-surface-elevated/90 border border-slate-200 dark:border-white/10 focus:border-blue-500 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none transition-colors shadow-2xs"
                      />
                    </div>

                    {/* Subject */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                        <MessageSquare className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                        <span>Subject *</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Software Developer Opportunity or Collaboration"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full bg-white dark:bg-surface-elevated/90 border border-slate-200 dark:border-white/10 focus:border-blue-500 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none transition-colors shadow-2xs"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <Send className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
                      <span>Message *</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Share project scope, opportunity details, or questions..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-white dark:bg-surface-elevated/90 border border-slate-200 dark:border-white/10 focus:border-blue-500 rounded-xl p-3.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none transition-colors custom-scrollbar shadow-2xs"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    id="contact-submit-btn"
                    className="w-full flex items-center justify-center gap-2 py-3 px-5 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 disabled:opacity-70 rounded-xl shadow-md shadow-blue-600/20 transition-all duration-200 cursor-pointer active:scale-95"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Transmitting...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
