import React, { useState, useMemo } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { 
  ExternalLink, 
  Layers, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  UserCheck, 
  FolderGit2, 
  Search, 
  ArrowRight,
  TrendingUp,
  SlidersHorizontal,
  Lightbulb
} from 'lucide-react';
import { GithubIcon } from '../common/BrandIcons';
import { ProjectData } from '../../types';

export const ProjectsBento: React.FC = () => {
  const { projects, setSelectedProject } = usePortfolio();
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filterCategories = ['All', 'AI & Full-Stack', 'Frontend Design', 'Web App (CRUD)', 'UI Cloning', 'Computer Vision', 'Game Dev'];

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        selectedFilter === 'All' ||
        project.category.toLowerCase().includes(selectedFilter.toLowerCase()) ||
        (selectedFilter === 'Development' && !project.category.includes('Design')) ||
        (selectedFilter === 'AI/ML' && (project.category.includes('AI') || project.category.includes('Vision')));

      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (project.technologies && project.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));

      return matchesCategory && matchesSearch;
    });
  }, [projects, selectedFilter, searchQuery]);

  return (
    <section id="projects" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 font-mono text-xs font-semibold uppercase tracking-wider mb-3 border border-blue-500/20">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>Case Studies, Projects &amp; Startups</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Featured Projects
            </h2>
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search stack or title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-white dark:bg-surface border border-slate-200/80 dark:border-white/10 rounded-xl focus:outline-none focus:border-blue-500 text-slate-900 dark:text-white placeholder:text-slate-400 shadow-2xs transition-colors"
            />
          </div>
        </div>

        {/* Filter Tabs Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-12 no-scrollbar">
          {filterCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-4 py-2 text-xs font-medium rounded-xl transition-all duration-200 shrink-0 cursor-pointer ${
                selectedFilter === cat
                  ? 'bg-blue-600 text-white font-semibold shadow-sm shadow-blue-600/30'
                  : 'bg-white dark:bg-surface hover:bg-slate-50 dark:hover:bg-surface-elevated text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 border border-slate-200/80 dark:border-white/5 shadow-2xs'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Alternating Featured Projects Showcase */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 p-8 rounded-2xl bg-white dark:bg-surface border border-slate-200/80 dark:border-white/10">
            <Search className="w-8 h-8 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">No projects found</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Try adjusting your search query or switching category filters.
            </p>
          </div>
        ) : (
          <div className="space-y-12 lg:space-y-16">
            {filteredProjects.map((project: ProjectData, index: number) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={project.id}
                  id={`project-card-${project.id}`}
                  className="glass-panel rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200/90 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${isEven ? '' : 'lg:flex-row-reverse'}`}>
                    
                    {/* Visual Media Column */}
                    <div className={`lg:col-span-6 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                      <div className="relative rounded-2xl overflow-hidden border border-slate-200/80 dark:border-white/10 shadow-inner group/img bg-slate-900">
                        {/* Aspect Ratio Box */}
                        <div className="aspect-[16/10] w-full overflow-hidden">
                          <img
                            src={project.image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80'}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105"
                          />
                        </div>

                        {/* Top Gradient Overlay & Category Tag */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />

                        <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                          <span className="px-3 py-1 text-xs font-mono font-semibold rounded-lg bg-slate-900/90 backdrop-blur-md text-white border border-white/15">
                            {project.category}
                          </span>
                          {project.featured && (
                            <span className="px-2.5 py-1 text-xs font-mono font-medium rounded-lg bg-amber-500/90 backdrop-blur-md text-slate-950">
                              Featured
                            </span>
                          )}
                        </div>

                        {/* Bottom Overlay Info on Photo */}
                        <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between text-xs text-slate-200">
                          <span className="font-mono text-[11px] text-cyan-300">
                            {project.technologies.slice(0, 3).join(' • ')}
                          </span>
                          <button
                            onClick={() => setSelectedProject(project)}
                            className="px-3 py-1 text-xs font-semibold text-white bg-blue-600/90 hover:bg-blue-600 rounded-md backdrop-blur-sm transition-all cursor-pointer"
                          >
                            Case Study Preview
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Information Details Column */}
                    <div className={`lg:col-span-6 space-y-4 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                      <div>
                        <div className="text-xs font-mono font-semibold text-blue-600 dark:text-cyan-400 uppercase tracking-wider mb-1">
                          Project #{index + 1}
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                          {project.title}
                        </h3>
                      </div>

                      {/* Problem & Solution Mini Split */}
                      <div className="space-y-3 pt-1">
                        {project.problem && (
                          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-surface/60 border border-slate-200/60 dark:border-white/5">
                            <div className="flex items-center gap-1.5 text-xs font-bold text-rose-600 dark:text-rose-400 mb-1">
                              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                              <span>The Problem</span>
                            </div>
                            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                              {project.problem}
                            </p>
                          </div>
                        )}

                        {project.description && (
                          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-surface/60 border border-slate-200/60 dark:border-white/5">
                            <div className="flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-cyan-400 mb-1">
                              <Lightbulb className="w-3.5 h-3.5 shrink-0" />
                              <span>The Solution & Architecture</span>
                            </div>
                            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                              {project.description}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Tech Stack Badges */}
                      <div className="pt-1">
                        <div className="text-[11px] font-mono uppercase text-slate-400 dark:text-slate-500 font-semibold mb-2">
                          Technologies Used
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {project.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100 dark:bg-surface text-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-white/5"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action CTAs */}
                      <div className="flex flex-wrap items-center gap-3 pt-3">
                        <button
                          onClick={() => setSelectedProject(project)}
                          id={`btn-case-study-${project.id}`}
                          className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-sm shadow-blue-600/20 transition-all cursor-pointer active:scale-95"
                        >
                          <span>View Full Case Study</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>

                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-surface-elevated hover:bg-slate-50 dark:hover:bg-white/10 border border-slate-200/80 dark:border-white/10 rounded-xl transition-all shadow-2xs active:scale-95"
                          >
                            <ExternalLink className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
                            <span>Live Demo</span>
                          </a>
                        )}

                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-surface-elevated hover:bg-slate-50 dark:hover:bg-white/10 border border-slate-200/80 dark:border-white/10 rounded-xl transition-all shadow-2xs active:scale-95"
                          >
                            <GithubIcon className="w-3.5 h-3.5" />
                            <span>GitHub</span>
                          </a>
                        )}
                      </div>

                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
