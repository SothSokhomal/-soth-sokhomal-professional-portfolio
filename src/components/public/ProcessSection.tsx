import React from 'react';
import { 
  Lightbulb, 
  Search, 
  Sparkles, 
  Palette, 
  CheckCircle2, 
  Rocket, 
  Workflow, 
  ArrowRight 
} from 'lucide-react';

export const ProcessSection: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Problem Discovery',
      phase: 'Empathize & Frame',
      icon: <Lightbulb className="w-5 h-5 text-amber-500 dark:text-amber-400" />,
      description: 'Identifying real-world friction points, user frustrations, and technical constraints before writing a single line of code.',
      deliverables: ['User Interview', 'Problem Definition', 'Scope Mapping']
    },
    {
      step: '02',
      title: 'Research & Insights',
      phase: 'Explore & Analyze',
      icon: <Search className="w-5 h-5 text-blue-500 dark:text-blue-400" />,
      description: 'Analyzing existing solutions, surveying target audiences, and formulating data-backed architectural hypotheses.',
      deliverables: ['Competitive Auditing', 'User Personas', 'Feature Matrix']
    },
    {
      step: '03',
      title: 'UX Architecture',
      phase: 'Structure & Flow',
      icon: <Sparkles className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />,
      description: 'Mapping out user journeys, information architecture, and establishing scalable database schemas and API contracts.',
      deliverables: ['Wireframing', 'User Flowcharts', 'API Contract Specs']
    },
    {
      step: '04',
      title: 'UI Design & Prototyping',
      phase: 'Design & Iterate',
      icon: <Palette className="w-5 h-5 text-cyan-500 dark:text-cyan-400" />,
      description: 'Crafting pixel-perfect design systems in Figma with tokens, typography hierarchy, high contrast, and interactive prototypes.',
      deliverables: ['Design System Tokens', 'Figma High-Fi Mockups', 'Interactive Prototypes']
    },
    {
      step: '05',
      title: 'Agile Engineering',
      phase: 'Develop & Test',
      icon: <CheckCircle2 className="w-5 h-5 text-teal-500 dark:text-teal-400" />,
      description: 'Translating designs into clean TypeScript/React code with full modularity, state management, and edge-case testing.',
      deliverables: ['React / Next.js Implementation', 'Node/API Integration', 'Unit & E2E Validation']
    },
    {
      step: '06',
      title: 'Ship & Iterate',
      phase: 'Deploy & Optimize',
      icon: <Rocket className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />,
      description: 'Deploying to cloud platforms, evaluating Core Web Vitals, and continuously gathering user feedback for continuous improvement.',
      deliverables: ['Production CI/CD', 'Performance Tuning', 'Post-Launch Analytics']
    },
  ];

  return (
    <section id="process" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-mono text-xs font-semibold uppercase tracking-wider mb-3 border border-indigo-500/20">
            <Workflow className="w-3.5 h-3.5" />
            <span>Product & Engineering Methodology</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            How I Build Digital Products
          </h2>
        </div>

        {/* Process Flow Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((item, index) => (
            <div
              key={index}
              className="glass-panel p-6 rounded-2xl border border-slate-200/90 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                {/* Icon, Step Number & Phase Pill */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-surface-elevated border border-slate-200/80 dark:border-white/10 group-hover:scale-105 transition-transform">
                      {item.icon}
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-300 px-2 py-1 rounded-lg bg-slate-100 dark:bg-surface-elevated border border-slate-200/80 dark:border-white/10 shadow-2xs">
                      {item.step}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 px-2.5 py-1 rounded-lg bg-slate-100/90 dark:bg-surface border border-slate-200/60 dark:border-white/5">
                    {item.phase}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>

              {/* Deliverable Tags */}
              <div className="pt-3 border-t border-slate-200/60 dark:border-white/5 space-y-1.5">
                <div className="text-[10px] font-mono uppercase text-slate-400 dark:text-slate-500 font-semibold">
                  Key Deliverables
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {item.deliverables.map((del, dIdx) => (
                    <span
                      key={dIdx}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100/80 dark:bg-surface text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-white/5"
                    >
                      {del}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
