import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Download, LayoutDashboard, Menu, X, Shield, ArrowRight, Check } from 'lucide-react';
import { downloadFileDirectly } from '../../lib/downloadHelper';
import { ThemeToggle } from '../common/ThemeToggle';

export const Navbar: React.FC = () => {
  const { settings, isAdmin, setActiveView, setIsLoginModalOpen, addToast } = usePortfolio();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadCV = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDownloading(true);
    try {
      await downloadFileDirectly('/api/download-cv', 'Soth_Vannak_Rothchansokhomal_CV.pdf');
      addToast('success', 'CV Download Started', 'Saving CV directly to your computer.');
    } catch (err) {
      console.error('Navbar download error:', err);
    } finally {
      setTimeout(() => setIsDownloading(false), 2000);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Process', href: '#process' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 dark:bg-[#0a0d14]/90 backdrop-blur-md border-b border-slate-200/80 dark:border-white/10 py-3 shadow-xs'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Name & Professional Logo */}
        <a
          href="#home"
          id="nav-brand-logo"
          className="flex items-center gap-3.5 group focus:outline-none"
        >
          <div className="relative flex-shrink-0">
            {/* Ambient outer glow shadow */}
            <div className="absolute -inset-0.5 rounded-full bg-gradient-to-tr from-blue-600 via-cyan-400 to-indigo-500 opacity-30 blur-[2px] group-hover:opacity-60 group-hover:blur-xs transition-all duration-300" />
            
            {/* Gradient Outline Ring Container (50px x 50px) */}
            <div className="relative w-[50px] h-[50px] rounded-full p-[2px] bg-gradient-to-tr from-blue-600 via-cyan-400 to-indigo-500 shadow-sm shadow-blue-500/20 group-hover:scale-105 transition-all duration-300">
              <div className="w-full h-full rounded-full overflow-hidden border-2 border-white dark:border-[#0a0d14] bg-slate-900 shadow-inner">
                <img
                  src={settings.logoUrl || settings.avatar || settings.profileImageUrl || "/img/Soth me.jpg"}
                  alt={settings.name}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/img/Soth me.jpg';
                  }}
                />
              </div>
            </div>
            {/* Online Status Badge */}
            <span className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-white dark:border-[#0a0d14] rounded-full shadow-xs animate-pulse" />
          </div>

          <div>
            <div className="text-sm font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-center gap-1.5">
              <span>Soth Sokhomal</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 font-mono border border-blue-500/20 hidden sm:inline-block">
                SE
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-[170px] sm:max-w-[220px]">
              Software Engineering • CamTech
            </p>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-100/90 dark:bg-surface/60 backdrop-blur-md border border-slate-200/80 dark:border-white/5 px-3 py-1.5 rounded-full shadow-xs">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-white/5 rounded-full transition-all duration-200"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="hidden md:flex items-center gap-2.5">
          {/* Theme Toggle */}
          <ThemeToggle id="nav-theme-toggle" />

          {/* Download CV button */}
          <button
            onClick={handleDownloadCV}
            id="nav-download-cv-btn"
            disabled={isDownloading}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-surface-elevated hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200/80 dark:border-white/10 rounded-xl transition-all shadow-2xs group cursor-pointer active:scale-95"
            title="Download CV"
          >
            {isDownloading ? (
              <Check className="w-3.5 h-3.5 text-emerald-500" />
            ) : (
              <Download className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            )}
            <span>{isDownloading ? 'Downloading...' : 'Resume'}</span>
          </button>

          {/* Admin Button */}
          {isAdmin ? (
            <button
              onClick={() => setActiveView('admin')}
              id="nav-admin-dashboard-btn"
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-xs transition-all"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Admin</span>
            </button>
          ) : (
            <button
              onClick={() => setIsLoginModalOpen(true)}
              id="nav-admin-login-btn"
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-surface/50 border border-slate-200/80 dark:border-white/5 rounded-xl transition-all"
              title="Admin Portal Login"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin</span>
            </button>
          )}

          {/* Prominent CTA: Let's Work Together */}
          <a
            href="#contact"
            id="nav-contact-cta"
            className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-sm shadow-blue-600/25 transition-all duration-200 cursor-pointer active:scale-95"
          >
            <span>Let's Work Together</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Controls (Hamburger + Theme) */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle variant="compact" id="mobile-theme-toggle" />
          <button
            onClick={handleDownloadCV}
            className="p-2 text-slate-700 dark:text-slate-300 bg-white dark:bg-surface rounded-xl border border-slate-200/80 dark:border-white/10 active:scale-95 shadow-2xs min-h-[40px] min-w-[40px] flex items-center justify-center"
            title="Download CV"
          >
            <Download className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            id="nav-mobile-toggle-btn"
            className="p-2 text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white bg-white dark:bg-surface rounded-xl border border-slate-200/80 dark:border-white/10 shadow-2xs min-h-[40px] min-w-[40px] flex items-center justify-center"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-[#0a0d14]/98 backdrop-blur-xl border-b border-slate-200/80 dark:border-white/10 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2 shadow-xl">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg min-h-[44px] flex items-center"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-white/10 flex flex-col gap-2">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 py-3 text-xs font-bold text-white bg-blue-600 rounded-xl min-h-[44px]"
            >
              <span>Let's Work Together</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={(e) => {
                setMobileMenuOpen(false);
                handleDownloadCV(e);
              }}
              className="flex items-center justify-center gap-2 py-2.5 text-xs font-medium text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-surface-elevated border border-slate-200 dark:border-white/10 rounded-xl active:scale-95 min-h-[44px]"
            >
              <Download className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Download CV (PDF)</span>
            </button>

            {isAdmin ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setActiveView('admin');
                }}
                className="flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-white bg-slate-900 dark:bg-surface-elevated rounded-xl min-h-[44px]"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Open Admin Dashboard</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsLoginModalOpen(true);
                }}
                className="flex items-center justify-center gap-2 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-surface border border-slate-200 dark:border-white/5 rounded-xl min-h-[44px]"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Admin Login</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
