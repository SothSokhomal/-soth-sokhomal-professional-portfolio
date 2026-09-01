import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { 
  Download, 
  ArrowRight, 
  Award, 
  Terminal, 
  Mail, 
  Sparkles, 
  MapPin, 
  Phone, 
  Globe, 
  Check, 
  ExternalLink,
  Code2,
  FolderGit2
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon, FacebookIcon } from '../common/BrandIcons';
import { certificatesData } from '../../data/initialData';
import { downloadFileDirectly } from '../../lib/downloadHelper';
import { TechIcon } from '../common/TechIcons';

export const Hero: React.FC = () => {
  const { settings, addToast } = usePortfolio();
  const scrumCert = certificatesData.find((c) => c.credentialId === '1006580') || certificatesData[0];
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadCV = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDownloading(true);
    try {
      await downloadFileDirectly('/api/download-cv', 'Soth_Vannak_Rothchansokhomal_CV.pdf');
      addToast('success', 'CV Download Started', 'CV saved directly to your computer.');
    } catch (err) {
      console.error('Download error:', err);
    } finally {
      setTimeout(() => setIsDownloading(false), 2000);
    }
  };

  return (
    <section id="home" className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 md:pt-40 md:pb-28 overflow-hidden">
      {/* Subtle background ambient mesh */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[400px] bg-gradient-to-tr from-blue-500/10 via-cyan-500/5 to-indigo-500/10 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-blue-500/5 blur-[90px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center lg:items-center justify-between gap-10 lg:gap-14">
          
          {/* Left Column: Identity, Narrative & Direct Action */}
          <div className="flex-1 max-w-2xl text-center lg:text-left">
            
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-surface border border-slate-200/80 dark:border-white/10 shadow-xs mb-5 backdrop-blur-sm mx-auto lg:mx-0">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Software Engineering Student • CamTech University
              </span>
            </div>

            {/* Greeting & Headline */}
            <div className="space-y-2 mb-4">
              <p className="text-base sm:text-lg font-mono font-semibold text-blue-600 dark:text-cyan-400 tracking-tight">
                Hi, I'm Rose
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.1]">
                Software Engineering Student &amp;{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-cyan-600 to-indigo-600 dark:from-blue-400 dark:via-cyan-300 dark:to-indigo-300">
                  Developer
                </span>
              </h1>
            </div>

            {/* Supporting Statement */}
            <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-6 font-normal">
              I build useful digital products, explore applied artificial intelligence and software engineering, and care deeply about combining technical architecture with intuitive user experiences.
            </p>

            {/* Core Tech Stack Pill List */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-8">
              {['React.js', 'Next.js', 'TypeScript', 'Node.js', 'REST APIs', 'OpenCV', 'Figma'].map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-mono font-medium rounded-lg bg-slate-100 dark:bg-surface text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-white/10 shadow-2xs"
                >
                  <TechIcon name={tech} className="w-4 h-4 shrink-0" />
                  <span>{tech}</span>
                </span>
              ))}
            </div>

            {/* 2 Primary CTAs + Download CV */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-8">
              <a
                href="#projects"
                id="hero-view-projects-btn"
                className="flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-md shadow-blue-600/20 transition-all duration-200 group active:scale-95 cursor-pointer"
              >
                <span>View My Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#contact"
                id="hero-connect-btn"
                className="flex items-center gap-2 px-5 py-3 text-sm font-semibold text-slate-800 dark:text-slate-100 bg-white dark:bg-surface-elevated hover:bg-slate-50 dark:hover:bg-white/10 border border-slate-200/90 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 rounded-xl transition-all duration-200 shadow-xs cursor-pointer active:scale-95"
              >
                <Mail className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
                <span>Let's Connect</span>
              </a>

              <button
                onClick={handleDownloadCV}
                id="hero-cv-btn"
                disabled={isDownloading}
                className="flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100/90 dark:bg-surface/80 hover:bg-slate-200 dark:hover:bg-surface-elevated border border-slate-200/60 dark:border-white/5 rounded-xl transition-all duration-200 cursor-pointer active:scale-95"
              >
                {isDownloading ? (
                  <Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                ) : (
                  <Download className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                )}
                <span>{isDownloading ? 'Saving CV...' : 'Download Resume'}</span>
              </button>
            </div>

            {/* Social Connect Links */}
            <div className="flex items-center justify-center lg:justify-start gap-3 text-slate-500 dark:text-slate-400 text-sm">
              <span className="text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500 font-semibold font-mono">
                Verified:
              </span>
              <a
                href={settings.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-white/70 dark:bg-surface hover:bg-slate-100 dark:hover:bg-surface-elevated rounded-lg border border-slate-200/80 dark:border-white/10 transition-all shadow-2xs"
                title="GitHub"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={settings.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-white/70 dark:bg-surface hover:bg-slate-100 dark:hover:bg-surface-elevated rounded-lg border border-slate-200/80 dark:border-white/10 transition-all shadow-2xs"
                title="LinkedIn"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={settings.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-white/70 dark:bg-surface hover:bg-slate-100 dark:hover:bg-surface-elevated rounded-lg border border-slate-200/80 dark:border-white/10 transition-all shadow-2xs"
                title="Portfolio Website"
                aria-label="Portfolio Website"
              >
                <Globe className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
              </a>
              <a
                href={`mailto:${settings.email}`}
                className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-white/70 dark:bg-surface hover:bg-slate-100 dark:hover:bg-surface-elevated rounded-lg border border-slate-200/80 dark:border-white/10 transition-all shadow-2xs"
                title="Direct Email"
                aria-label="Direct Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-white/70 dark:bg-surface hover:bg-slate-100 dark:hover:bg-surface-elevated rounded-lg border border-slate-200/80 dark:border-white/10 transition-all shadow-2xs"
                title="Phone"
                aria-label="Phone"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Column: Visual Developer Profile Card */}
          <div className="w-full max-w-sm sm:max-w-md lg:w-[380px] xl:w-[420px] relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 via-cyan-500/15 to-purple-500/20 rounded-3xl blur-xl opacity-60 pointer-events-none" />

            <div className="relative rounded-3xl p-[1px] bg-gradient-to-b from-blue-500/30 via-cyan-400/20 to-purple-500/30 shadow-lg">
              <div className="bg-white/95 dark:bg-[#0e1320]/95 backdrop-blur-xl rounded-[23px] overflow-hidden p-5 border border-slate-200/80 dark:border-white/10 shadow-md">
                
                {/* Visual Portrait Stage */}
                <div className="relative w-full h-72 sm:h-80 rounded-2xl overflow-hidden mb-4 bg-gradient-to-b from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-950 shadow-inner group/photo">
                  <img
                    src={settings.profileImageUrl || settings.avatar || "/img/Soth vannak rothchansokhomal.jpg"}
                    alt={settings.name}
                    className="w-full h-full object-cover object-top transition-all duration-700 group-hover/photo:scale-105"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/img/Soth vannak rothchansokhomal.jpg';
                    }}
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80" />

                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="text-base font-bold text-white tracking-tight drop-shadow-md">
                      {settings.name}
                    </div>
                    <div className="text-xs text-cyan-300 font-mono flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-emerald-400 inline" />
                      <span>{settings.location}</span>
                    </div>
                  </div>
                </div>

                {/* Developer Terminal Card */}
                <div className="bg-slate-900 rounded-xl p-3.5 border border-slate-800 dark:border-white/10 shadow-inner">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-2.5">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-rose-500" />
                      <div className="w-2 h-2 rounded-full bg-amber-500" />
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                      <Code2 className="w-3 h-3 text-blue-400" />
                      <span>profile_summary.ts</span>
                    </span>
                  </div>

                  <div className="space-y-2 font-mono text-xs text-slate-300">
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-slate-400">Major</span>
                      <span className="text-slate-100 font-semibold">Software Engineering</span>
                    </div>
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-slate-400">University</span>
                      <span className="text-cyan-300 font-medium">CamTech</span>
                    </div>
                    <div className="pt-1 border-t border-slate-800 space-y-1">
                      <span className="text-slate-400 text-[10px] uppercase tracking-wider block">Roles</span>
                      <div className="flex flex-wrap gap-1 text-[10px]">
                        <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-medium">Full-Stack Developer</span>
                        <span className="px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-medium">Software Architect</span>
                        <span className="px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20 font-medium">AI/Machine Learning Enthusiast</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
