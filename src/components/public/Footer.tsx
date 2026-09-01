import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Shield, ArrowUp, Mail, Globe, Phone } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon, FacebookIcon } from '../common/BrandIcons';
import { ThemeToggle } from '../common/ThemeToggle';

export const Footer: React.FC = () => {
  const { settings, isAdmin, setActiveView, setIsLoginModalOpen } = usePortfolio();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-100/90 dark:bg-[#07090f] border-t border-slate-200/80 dark:border-white/5 py-10 text-slate-500 dark:text-slate-400 text-xs transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left: Branding & Core Specializations */}
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-800 shrink-0">
            <img
              src={settings.avatar || "/profile.jpg"}
              alt={settings.name}
              className="w-full h-full object-cover object-top"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/profile.jpg';
              }}
            />
          </div>
          <div>
            <div className="font-bold text-slate-900 dark:text-white tracking-tight text-sm flex items-center justify-center sm:justify-start gap-2">
              <span>Soth Sokhomal</span>
              <span className="text-[10px] px-1.5 py-0.2 bg-blue-500/10 text-blue-600 dark:text-blue-400 font-mono rounded border border-blue-500/20">
                CamTech
              </span>
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">
              Software Engineering • Development • UX/UI • AI
            </div>
          </div>
        </div>

        {/* Center: Social Networks */}
        <div className="flex items-center gap-3">
          <a
            href={settings.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            title="GitHub"
            aria-label="GitHub"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href={settings.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            title="LinkedIn"
            aria-label="LinkedIn"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
          <a
            href={settings.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            title="Instagram"
            aria-label="Instagram"
          >
            <InstagramIcon className="w-4 h-4" />
          </a>
          <a
            href={settings.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            title="Facebook"
            aria-label="Facebook"
          >
            <FacebookIcon className="w-4 h-4" />
          </a>
          <a
            href={`mailto:${settings.email}`}
            className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            title="Email"
            aria-label="Email"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>

        {/* Right: Theme, CMS & Back to top */}
        <div className="flex items-center gap-3">
          <ThemeToggle variant="pill" id="footer-theme-toggle" />

          {isAdmin ? (
            <button
              onClick={() => setActiveView('admin')}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin</span>
            </button>
          ) : (
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="text-xs text-slate-500 hover:text-slate-900 dark:text-slate-500 dark:hover:text-slate-300 flex items-center gap-1 transition-colors"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin</span>
            </button>
          )}

          <button
            onClick={scrollToTop}
            className="p-2 rounded-xl bg-white dark:bg-surface hover:bg-slate-200 dark:hover:bg-surface-elevated text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/5 transition-colors shadow-2xs cursor-pointer active:scale-95 min-h-[36px] min-w-[36px] flex items-center justify-center"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 pt-4 border-t border-slate-200/60 dark:border-white/5 text-center text-[11px] text-slate-400 dark:text-slate-500">
        &copy; {new Date().getFullYear()} Soth Vannak RothChansokhomal.
      </div>
    </footer>
  );
};
