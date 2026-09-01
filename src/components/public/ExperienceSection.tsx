import React, { useState } from 'react';
import {
  educationData,
  leadershipData,
  scholarshipsData,
  certificatesData,
  languagesData,
} from '../../data/initialData';
import { usePortfolio } from '../../context/PortfolioContext';
import {
  Download,
  GraduationCap,
  Award,
  Users,
  ExternalLink,
  Calendar,
  Sparkles,
  Languages,
  CheckCircle2,
  FileText,
  Check,
  Building2,
} from 'lucide-react';
import { downloadFileDirectly } from '../../lib/downloadHelper';

type TabType = 'leadership' | 'education' | 'certificates' | 'scholarships' | 'languages';

export const ExperienceSection: React.FC = () => {
  const { experiences, achievements, languages, addToast } = usePortfolio();
  const [activeTab, setActiveTab] = useState<TabType>('leadership');
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadCV = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDownloading(true);
    try {
      await downloadFileDirectly('/api/download-cv', 'Soth_Vannak_Rothchansokhomal_CV.pdf');
      addToast('success', 'CV Download Started', 'Saving CV directly to your computer.');
    } catch (err) {
      console.error('Download error:', err);
    } finally {
      setTimeout(() => setIsDownloading(false), 2000);
    }
  };

  // Dynamic filtering from context, combining experiences and achievements
  const leadershipExperiences = experiences.filter((e) => e.type === 'VOLUNTEER' || e.type === 'INNOVATION' || e.type === 'WORK');
  const leadershipAchievements = achievements.filter((a) => a.type === 'COMPETITION' || a.type === 'LEADERSHIP');
  
  const dynamicLeadership = [
    ...leadershipExperiences.map((e) => ({
      id: e.id,
      title: e.title,
      organization: e.organization,
      period: e.period,
      description: e.description,
      type: e.type,
      fileUrl: undefined as string | undefined,
    })),
    ...leadershipAchievements.map((a) => ({
      id: a.id,
      title: a.title,
      organization: a.issuer || 'Competition / Leadership',
      period: a.date || '2026',
      description: a.credentialId ? `Credential ID: ${a.credentialId}` : undefined,
      type: a.type,
      fileUrl: a.fileUrl || undefined,
    })),
  ];

  const displayLeadership = dynamicLeadership.length > 0
    ? dynamicLeadership
    : leadershipData.map(l => ({ id: l.title, title: l.title, organization: l.organization, period: l.period, description: l.description, type: 'VOLUNTEER' as const, fileUrl: undefined }));

  const dynamicEducation = experiences.filter((e) => e.type === 'EDUCATION');
  const displayEducation = dynamicEducation.length > 0
    ? dynamicEducation
    : educationData.map(e => ({ id: e.school, title: e.degree, organization: e.school, period: e.period, type: 'EDUCATION' as const }));

  // Certifications tab includes CERTIFICATE, COMPETITION, and any dynamic achievements
  const dynamicCertificates = achievements.filter((a) => a.type === 'CERTIFICATE' || a.type === 'COMPETITION' || a.type === 'LEADERSHIP' || !a.type);
  const displayCertificates = dynamicCertificates.length > 0
    ? dynamicCertificates
    : certificatesData.map(c => ({ id: c.name, title: c.name, issuer: c.provider, date: c.year, credentialId: c.credentialId, link: c.link, fileUrl: c.file, type: 'CERTIFICATE' as const }));

  // Scholarships tab includes ACADEMIC_HONOR
  const dynamicScholarships = achievements.filter((a) => a.type === 'ACADEMIC_HONOR');
  const displayScholarships = dynamicScholarships.length > 0
    ? dynamicScholarships
    : scholarshipsData.map(s => ({ id: s.name, title: s.name, issuer: s.provider, date: '2024', type: 'ACADEMIC_HONOR' as const }));

  const displayLanguages = languages.length > 0 ? languages : languagesData;

  const tabs: { id: TabType; label: string; icon: React.ReactNode; count: number }[] = [
    { id: 'leadership', label: 'Leadership & Competitions', icon: <Users className="w-4 h-4" />, count: displayLeadership.length },
    { id: 'education', label: 'Education', icon: <GraduationCap className="w-4 h-4" />, count: displayEducation.length },
    { id: 'certificates', label: 'Certifications', icon: <Award className="w-4 h-4" />, count: displayCertificates.length },
    { id: 'scholarships', label: 'Academic Honors', icon: <Sparkles className="w-4 h-4" />, count: displayScholarships.length },
    { id: 'languages', label: 'Languages', icon: <Languages className="w-4 h-4" />, count: displayLanguages.length },
  ];

  return (
    <section id="experience" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-xs font-semibold uppercase tracking-wider mb-3 border border-emerald-500/20">
              <Award className="w-3.5 h-3.5" />
              <span>Track Record & Leadership</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Experience &amp; Achievements
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2">
              Academic software engineering degrees, international youth leadership delegations, national innovation competitions, and verified credentials.
            </p>
          </div>

          {/* Quick Resume Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleDownloadCV}
              id="resume-download-cv-btn"
              disabled={isDownloading}
              className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-sm shadow-blue-600/20 transition-all duration-200 active:scale-95 cursor-pointer"
            >
              {isDownloading ? (
                <Check className="w-4 h-4 text-white" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              <span>{isDownloading ? 'Saving CV...' : 'Download Resume (PDF)'}</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-xl transition-all duration-200 shrink-0 cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white font-semibold shadow-sm shadow-blue-600/30'
                  : 'bg-white dark:bg-surface hover:bg-slate-50 dark:hover:bg-surface-elevated text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 border border-slate-200/80 dark:border-white/5 shadow-2xs'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                activeTab === tab.id ? 'bg-blue-800 text-white' : 'bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-400'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Tab Content Panels */}
        <div className="max-w-5xl">
          
          {/* 1. Leadership, Volunteering & Competitions */}
          {activeTab === 'leadership' && (
            <div className="relative pl-4 sm:pl-8 border-l border-slate-200 dark:border-white/10 space-y-6">
              {displayLeadership.map((item, index) => (
                <div key={item.id || index} className="relative group">
                  {/* Timeline Node Marker */}
                  <div className="absolute -left-[25px] sm:-left-[41px] top-2 w-6 h-6 rounded-full bg-white dark:bg-[#0a0d14] border-2 border-emerald-500 flex items-center justify-center shadow-xs">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 group-hover:scale-150 transition-transform" />
                  </div>

                  <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-slate-200/90 dark:border-white/10 group-hover:border-slate-300 dark:group-hover:border-white/20 transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1.5">
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                        {item.title}
                      </h3>
                      <span className="flex items-center gap-1 text-xs font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-md border border-emerald-500/20 self-start sm:self-auto font-medium">
                        <Calendar className="w-3.5 h-3.5" />
                        {item.period}
                      </span>
                    </div>

                    <div className="text-xs sm:text-sm font-semibold text-blue-600 dark:text-cyan-300 mb-2 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" />
                      <span>{item.organization}</span>
                    </div>

                    {item.description && (
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                        {item.description}
                      </p>
                    )}

                    {item.fileUrl && (
                      <div className="mt-3 pt-3 border-t border-slate-200/80 dark:border-white/5 flex items-center">
                        <a
                          href={item.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 transition-all flex items-center gap-1.5"
                        >
                          <FileText className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                          <span>View Certificate / PDF Attachment</span>
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 2. Education */}
          {activeTab === 'education' && (
            <div className="relative pl-4 sm:pl-8 border-l border-slate-200 dark:border-white/10 space-y-6">
              {displayEducation.map((item, index) => (
                <div key={item.id || index} className="relative group">
                  <div className="absolute -left-[25px] sm:-left-[41px] top-2 w-6 h-6 rounded-full bg-white dark:bg-[#0a0d14] border-2 border-blue-500 flex items-center justify-center shadow-xs">
                    <div className="w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400 group-hover:scale-150 transition-transform" />
                  </div>

                  <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-slate-200/90 dark:border-white/10 group-hover:border-slate-300 dark:group-hover:border-white/20 transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1.5">
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                        {item.organization || (item as any).school}
                      </h3>
                      <span className="flex items-center gap-1 text-xs font-mono text-blue-600 dark:text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded-md border border-blue-500/20 self-start sm:self-auto font-medium">
                        <Calendar className="w-3.5 h-3.5" />
                        {item.period}
                      </span>
                    </div>

                    <div className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
                      {item.title || (item as any).degree}
                    </div>

                    {item.description && (
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 3. Certifications with Cloud PDF Viewer */}
          {activeTab === 'certificates' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {displayCertificates.map((item, index) => {
                const pdfUrl = item.fileUrl || (item as any).file;
                return (
                  <div
                    key={item.id || index}
                    className="glass-panel p-5 rounded-2xl border border-slate-200/90 dark:border-white/10 hover:border-blue-500/40 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400">
                          <Award className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-surface px-2 py-0.5 rounded border border-slate-200/80 dark:border-white/5">
                          {item.date || (item as any).year}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight mb-1">
                        {item.title || (item as any).name}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                        {item.issuer || (item as any).provider}
                      </p>

                      {item.credentialId && (
                        <div className="mt-2 text-xs font-mono text-slate-500 dark:text-slate-400">
                          Credential ID: <span className="text-slate-800 dark:text-slate-200 font-semibold">{item.credentialId}</span>
                        </div>
                      )}
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-200/80 dark:border-white/5 flex items-center justify-between">
                      {pdfUrl ? (
                        <a
                          href={pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 transition-all flex items-center gap-1.5"
                        >
                          <FileText className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                          <span>View Certificate PDF</span>
                        </a>
                      ) : item.link ? (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1.5"
                        >
                          <span>Credential Link</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      ) : (
                        <span className="text-xs font-mono text-slate-400 dark:text-slate-500">Verified Course</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* 4. Scholarships & Honors */}
          {activeTab === 'scholarships' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {displayScholarships.map((item, index) => (
                <div
                  key={item.id || index}
                  className="glass-panel p-5 rounded-2xl border border-slate-200/90 dark:border-white/10 hover:border-amber-500/40 transition-all flex flex-col justify-between"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight mb-1">
                        {item.title || (item as any).name}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                        {item.issuer || (item as any).provider}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200/80 dark:border-white/5 flex items-center gap-1.5 text-[11px] font-mono text-amber-600 dark:text-amber-300 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Merit-Based Scholarship</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 5. Languages */}
          {activeTab === 'languages' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
              {displayLanguages.map((item, index) => (
                <div
                  key={item.id || index}
                  className="glass-panel p-5 rounded-2xl border border-slate-200/90 dark:border-white/10 flex items-center gap-4"
                >
                  <div className="w-11 h-11 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-600 dark:text-teal-400 shrink-0">
                    <Languages className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
                      {item.language}
                    </h3>
                    <p className="text-xs font-semibold text-teal-600 dark:text-teal-300">
                      {item.proficiency}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
