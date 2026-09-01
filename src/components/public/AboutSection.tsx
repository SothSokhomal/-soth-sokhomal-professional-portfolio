import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { 
  Code2, 
  Layout, 
  Palette, 
  BrainCircuit, 
  Search, 
  Users2, 
  ArrowRight, 
  GraduationCap, 
  Award, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { settings } = usePortfolio();

  const focusAreas = [
    {
      icon: <Code2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
      title: 'Software Engineering',
      description: 'Building reliable and maintainable software with clean code, SOLID principles, modular architecture, and Agile practices.',
      tag: 'Architecture'
    },
    {
      icon: <Layout className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />,
      title: 'Web Development',
      description: 'Developing full-stack applications with React, Next.js, TypeScript, Node.js, and RESTful APIs.',
      tag: 'Full-Stack'
    },
    {
      icon: <Palette className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
      title: 'UX/UI Design',
      description: 'Creating intuitive interfaces in Figma with strong visual hierarchy, consistency, and accessibility.',
      tag: 'User Experience'
    },
    {
      icon: <BrainCircuit className="w-5 h-5 text-purple-600 dark:text-purple-400" />,
      title: 'AI / Machine Learning',
      description: 'Applying NLP, computer vision, Dialogflow, OpenCV, and Python to practical software projects.',
      tag: 'Intelligent Systems'
    },
    {
      icon: <Search className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
      title: 'Research & Innovation',
      description: 'Exploring emerging technologies and developing solutions for real-world challenges, including sustainable and flood-management technology.',
      tag: 'Applied Research'
    },
    {
      icon: <Users2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
      title: 'Leadership & Community',
      description: 'Contributing to STEM communities through mentorship, youth engagement, and regional initiatives.',
      tag: 'Community & Mentorship'
    },
  ];

  return (
    <section id="about" className="py-20 md:py-28 relative bg-slate-100/40 dark:bg-surface/20 border-t border-slate-200/80 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header Badge */}
        <div className="flex items-center gap-2 mb-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 font-mono text-xs font-semibold uppercase tracking-wider border border-blue-500/20">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Profile & Core Disciplines</span>
          </div>
        </div>

        {/* Split Layout Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Personal Story & Value Proposition */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              Software Engineering Student | Researcher | AI &amp; Full-Stack Developer
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              <p>
                I'm <span className="font-semibold text-slate-900 dark:text-white">Soth Vannak RothChansokhomal (Rose)</span>, a Software Engineering student at <span className="font-semibold text-blue-600 dark:text-cyan-400">CamTech University</span> in Phnom Penh, Cambodia.
              </p>
              <p>
                I'm passionate about building reliable, user-focused software across backend development, web applications, UI/UX, and artificial intelligence. I enjoy breaking down complex problems and turning them into practical, intuitive solutions.
              </p>
              <p>
                I'm always looking to learn, build, and improve through real-world projects, new technologies, and meaningful challenges.
              </p>
            </div>

            {/* Key Quick Highlights */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-white dark:bg-surface border border-slate-200/80 dark:border-white/10 shadow-2xs">
                <div className="text-2xl font-extrabold text-blue-600 dark:text-blue-400">CamTech</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Software Engineering (75% Scholarship)</div>
              </div>
              <div className="p-3.5 rounded-xl bg-white dark:bg-surface border border-slate-200/80 dark:border-white/10 shadow-2xs">
                <div className="text-2xl font-extrabold text-amber-500 dark:text-amber-400">Scrum Master</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Certified Agile Coach (London, UK)</div>
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-2">
              <a
                href="#experience"
                id="about-more-journey-btn"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-slate-800 dark:text-slate-200 bg-white dark:bg-surface-elevated hover:bg-slate-50 dark:hover:bg-white/10 border border-slate-200/80 dark:border-white/10 rounded-xl transition-all shadow-2xs group"
              >
                <span>Explore My Education & Experience</span>
                <ArrowRight className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Right Column: 6 Compact Specialty Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {focusAreas.map((area, index) => (
              <div
                key={index}
                className="glass-panel p-5 rounded-2xl border border-slate-200/90 dark:border-white/10 hover:border-blue-500/40 dark:hover:border-blue-500/40 transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="p-2 rounded-xl bg-slate-100 dark:bg-surface-elevated border border-slate-200/80 dark:border-white/10 group-hover:scale-105 transition-transform">
                      {area.icon}
                    </div>
                    <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-surface text-slate-600 dark:text-slate-400 border border-slate-200/60 dark:border-white/5">
                      {area.tag}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight mb-1.5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {area.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {area.description}
                  </p>
                </div>

                <div className="mt-4 pt-2.5 border-t border-slate-200/60 dark:border-white/5 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500">
                  <span className="flex items-center gap-1 font-mono">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                    Core Skill
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
