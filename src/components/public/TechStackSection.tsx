import React from 'react';
import { 
  Code2, 
  Layout, 
  Server, 
  Smartphone, 
  Database, 
  Wrench, 
  Terminal, 
  Layers, 
  CheckCircle2, 
  Cpu,
  Globe,
  Users
} from 'lucide-react';
import { TechIcon } from '../common/TechIcons';
import { usePortfolio } from '../../context/PortfolioContext';

export const TechStackSection: React.FC = () => {
  const { techCategories } = usePortfolio();

  const getCategoryIcon = (iconName?: string) => {
    switch (iconName?.toLowerCase()) {
      case 'globe':
      case 'web':
        return <Globe className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
      case 'layout':
      case 'frontend':
        return <Layout className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />;
      case 'server':
      case 'backend':
        return <Server className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />;
      case 'database':
        return <Database className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      case 'cpu':
      case 'tools':
        return <Cpu className="w-5 h-5 text-amber-600 dark:text-amber-400" />;
      case 'layers':
      case 'ai':
        return <Layers className="w-5 h-5 text-purple-600 dark:text-purple-400" />;
      case 'users':
      case 'soft':
        return <Users className="w-5 h-5 text-pink-600 dark:text-pink-400" />;
      default:
        return <Code2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
    }
  };

  const defaultSkillGroups = [
    {
      category: 'Web Development',
      iconName: 'Globe',
      items: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'TypeScript'],
    },
    {
      category: 'Frontend',
      iconName: 'Layout',
      items: ['React.js', 'Next.js 14', 'Tailwind CSS', 'Bootstrap', 'Framer Motion'],
    },
    {
      category: 'Backend & API',
      iconName: 'Server',
      items: ['Node.js', 'Express.js', 'RESTful APIs', 'Server Actions'],
    },
    {
      category: 'Database & ORM',
      iconName: 'Database',
      items: ['MongoDB', 'Prisma ORM', 'PostgreSQL', 'MySQL'],
    },
    {
      category: 'Algorithms & Languages',
      iconName: 'Code',
      items: ['Python', 'C++', 'Data Structures'],
    },
    {
      category: 'Developer Tools',
      iconName: 'Cpu',
      items: ['GitHub', 'Git', 'Figma', 'Postman', 'Vercel'],
    },
  ];

  const skillGroupsToRender = techCategories.length > 0 ? techCategories : defaultSkillGroups;

  return (
    <section id="skills" className="py-20 md:py-28 relative bg-slate-100/40 dark:bg-surface/20 border-y border-slate-200/80 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 font-mono text-xs font-semibold uppercase tracking-wider mb-3 border border-cyan-500/20">
            <Terminal className="w-3.5 h-3.5" />
            <span>Technical Proficiencies</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Technology Stack
          </h2>
        </div>

        {/* Dynamic Skill Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillGroupsToRender.map((group, index) => (
            <div
              key={(group as any).id || index}
              className="glass-panel p-6 rounded-2xl border border-slate-200/90 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-surface-elevated border border-slate-200/80 dark:border-white/10 shadow-xs">
                    {getCategoryIcon(group.iconName)}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
                      {group.category}
                    </h3>
                    <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                      {group.items.length} core tools
                    </span>
                  </div>
                </div>

                {/* Badges / Chips */}
                <div className="flex flex-wrap gap-2.5 mt-4">
                  {group.items.map((skillName, sIdx) => (
                    <span
                      key={sIdx}
                      className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs sm:text-[13px] font-medium bg-white dark:bg-surface-elevated text-slate-900 dark:text-white border border-slate-200/90 dark:border-white/15 shadow-2xs font-semibold"
                    >
                      <TechIcon name={skillName} className="w-5 h-5 shrink-0" />
                      <span>{skillName}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Verified Tag */}
              <div className="mt-6 pt-3 border-t border-slate-200/80 dark:border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400 dark:text-slate-500">
                <span>Skills</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Active Stack
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
