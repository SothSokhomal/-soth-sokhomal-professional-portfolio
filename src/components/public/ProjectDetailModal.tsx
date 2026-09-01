import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { X, ExternalLink, CheckCircle2, AlertTriangle, Lightbulb, UserCheck, Layers, ListChecks } from 'lucide-react';
import { GithubIcon } from '../common/BrandIcons';

export const ProjectDetailModal: React.FC = () => {
  const { selectedProject, setSelectedProject } = usePortfolio();

  if (!selectedProject) return null;

  const techList = selectedProject.technologies || [];
  const featuresList = selectedProject.features || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 dark:bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in">
      <div
        className="relative w-full max-w-3xl bg-white dark:bg-[#0e1422] border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col transition-colors duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="p-4 sm:p-6 border-b border-slate-200/80 dark:border-white/10 flex items-center justify-between bg-slate-50/80 dark:bg-surface/50">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 text-xs font-mono font-semibold rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 uppercase">
              {selectedProject.category}
            </span>
            {selectedProject.featured && (
              <span className="px-2.5 py-0.5 text-xs font-mono font-medium rounded bg-amber-500/10 text-amber-600 dark:text-amber-300 border border-amber-500/20">
                Featured Project
              </span>
            )}
          </div>

          <button
            onClick={() => setSelectedProject(null)}
            className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 custom-scrollbar">
          
          {/* Title & Summary */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
              {selectedProject.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {selectedProject.description}
            </p>
          </div>

          {/* Quick Action Links */}
          <div className="flex flex-wrap items-center gap-3">
            {selectedProject.liveUrl && (
              <a
                href={selectedProject.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-all shadow-md shadow-blue-600/20"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Launch Live System</span>
              </a>
            )}

            {selectedProject.githubUrl && (
              <a
                href={selectedProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-surface-elevated hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200/80 dark:border-white/10 rounded-xl transition-all shadow-2xs"
              >
                <GithubIcon className="w-4 h-4" />
                <span>Source Code Repository</span>
              </a>
            )}
          </div>

          {/* Tech Stack Matrix */}
          {techList.length > 0 && (
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>Technologies & Frameworks</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {techList.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs font-medium rounded-lg bg-slate-100 dark:bg-surface border border-slate-200/80 dark:border-white/10 text-slate-800 dark:text-slate-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Key Features */}
          {featuresList.length > 0 && (
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-surface/50 border border-slate-200/80 dark:border-white/5 space-y-3">
              <div className="flex items-center gap-2 text-cyan-700 dark:text-cyan-400 font-semibold text-sm">
                <ListChecks className="w-4 h-4" />
                <span>Key Features & Capabilities</span>
              </div>
              <ul className="space-y-2">
                {featuresList.map((feat, idx) => (
                  <li key={idx} className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2.5 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-600 dark:bg-cyan-400 mt-2 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Case Study Sections */}
          <div className="space-y-6 pt-4 border-t border-slate-200/80 dark:border-white/10">
            
            {/* The Problem */}
            {selectedProject.problem && (
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-surface/50 border border-slate-200/80 dark:border-white/5 space-y-2">
                <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-semibold text-sm">
                  <AlertTriangle className="w-4 h-4" />
                  <span>The Problem Statement</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {selectedProject.problem}
                </p>
              </div>
            )}

            {/* Contribution & Architecture */}
            {selectedProject.contribution && (
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-surface/50 border border-slate-200/80 dark:border-white/5 space-y-2">
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold text-sm">
                  <UserCheck className="w-4 h-4" />
                  <span>Contribution & Technical Architecture</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {selectedProject.contribution}
                </p>
              </div>
            )}

            {/* Challenges & Solutions */}
            {selectedProject.challenges && (
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-surface/50 border border-slate-200/80 dark:border-white/5 space-y-2">
                <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-semibold text-sm">
                  <Lightbulb className="w-4 h-4" />
                  <span>Challenges & Solutions</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {selectedProject.challenges}
                </p>
              </div>
            )}

            {/* Lessons Learned */}
            {selectedProject.lessonsLearned && (
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-surface/50 border border-slate-200/80 dark:border-white/5 space-y-2">
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold text-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Impact & Lessons Learned</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {selectedProject.lessonsLearned}
                </p>
              </div>
            )}

          </div>

        </div>

        {/* Footer with close */}
        <div className="p-4 bg-slate-50/80 dark:bg-surface/80 border-t border-slate-200/80 dark:border-white/10 flex justify-end">
          <button
            onClick={() => setSelectedProject(null)}
            className="px-5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-surface-elevated hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200/80 dark:border-white/10 rounded-xl transition-all shadow-2xs cursor-pointer active:scale-95"
          >
            Close Case Study
          </button>
        </div>

      </div>
    </div>
  );
};
