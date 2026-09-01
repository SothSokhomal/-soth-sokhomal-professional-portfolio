import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Project, Message, PersonalInfo, ExperienceItem, AchievementItem, SkillCategory, LanguageItem } from '../../types';
import { api } from '../../lib/api';
import { FileUpload } from './FileUpload';
import {
  LayoutDashboard,
  FolderGit2,
  Mail,
  Settings,
  Plus,
  Trash2,
  Edit,
  ExternalLink,
  CheckCircle2,
  LogOut,
  ArrowLeft,
  Search,
  Send,
  Star,
  Activity,
  Server,
  RefreshCw,
  X,
  Phone,
  Globe,
  MapPin,
  Sparkles,
  Upload,
  FileText,
  Download,
  FileCheck,
  Eye,
  Award,
  GraduationCap,
  Briefcase,
  Terminal,
  Languages,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon, FacebookIcon } from '../common/BrandIcons';
import { downloadFileDirectly } from '../../lib/downloadHelper';
import { ThemeToggle } from '../common/ThemeToggle';

type AdminTab = 'overview' | 'projects' | 'achievements' | 'experiences' | 'tech' | 'messages' | 'settings';

export const AdminDashboard: React.FC = () => {
  const {
    projects,
    messages,
    settings,
    experiences,
    achievements,
    techCategories,
    languages,
    stats,
    setActiveView,
    logoutAdmin,
    createProject,
    updateProject,
    deleteProject,
    createExperience,
    updateExperience,
    deleteExperience,
    createAchievement,
    updateAchievement,
    deleteAchievement,
    createTechCategory,
    updateTechCategory,
    deleteTechCategory,
    createLanguage,
    updateLanguage,
    deleteLanguage,
    markMessageRead,
    deleteMessage,
    updateSettings,
    refreshData,
    addToast,
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [projectSearch, setProjectSearch] = useState('');
  const [messageSearch, setMessageSearch] = useState('');

  // 1. Project Modal State
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projectFormData, setProjectFormData] = useState<Partial<Project>>({
    title: '',
    category: 'Full Stack',
    description: '',
    technologies: [],
    githubUrl: '',
    liveUrl: '',
    problem: '',
    features: [],
    contribution: '',
    challenges: '',
    lessonsLearned: '',
    featured: false,
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
  });
  const [techStackInput, setTechStackInput] = useState('');
  const [featuresInput, setFeaturesInput] = useState('');

  // 2. Achievement / Certificate Modal State
  const [isAchievementModalOpen, setIsAchievementModalOpen] = useState(false);
  const [editingAchievement, setEditingAchievement] = useState<AchievementItem | null>(null);
  const [achievementFormData, setAchievementFormData] = useState<Partial<AchievementItem>>({
    type: 'CERTIFICATE',
    title: '',
    issuer: '',
    date: '',
    credentialId: '',
    link: '',
    fileUrl: '',
  });

  // 3. Experience Modal State
  const [isExperienceModalOpen, setIsExperienceModalOpen] = useState(false);
  const [editingExperience, setEditingExperience] = useState<ExperienceItem | null>(null);
  const [experienceFormData, setExperienceFormData] = useState<Partial<ExperienceItem>>({
    type: 'WORK',
    title: '',
    organization: '',
    period: '',
    description: '',
  });

  // 4. Tech Category Modal State
  const [isTechCategoryModalOpen, setIsTechCategoryModalOpen] = useState(false);
  const [editingTechCategory, setEditingTechCategory] = useState<SkillCategory | null>(null);
  const [techCategoryFormData, setTechCategoryFormData] = useState<Partial<SkillCategory>>({
    category: '',
    items: [],
    iconName: 'Code',
  });
  const [techCategoryItemsInput, setTechCategoryItemsInput] = useState('');

  // 5. Settings State
  const [settingsFormData, setSettingsFormData] = useState<PersonalInfo>(settings);
  const [isTestingNotifications, setIsTestingNotifications] = useState(false);

  // Sync settingsFormData whenever settings updates from context / backend API
  React.useEffect(() => {
    if (settings) {
      setSettingsFormData(settings);
    }
  }, [settings]);

  // Selected Message Preview
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  // --- Handlers for Project CRUD ---
  const handleOpenNewProject = () => {
    setEditingProject(null);
    setProjectFormData({
      title: '',
      category: 'AI & Full-Stack',
      description: '',
      technologies: ['React', 'Next.js 14', 'TypeScript', 'Node.js', 'Tailwind CSS'],
      githubUrl: 'https://github.com/SothSokhomal/',
      liveUrl: 'https://demo.sothsokhomal.dev',
      problem: '',
      features: ['Modern UI', 'Real-time sync', 'Mobile responsive'],
      contribution: '',
      challenges: '',
      lessonsLearned: '',
      featured: true,
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    });
    setTechStackInput('React, Next.js 14, TypeScript, Node.js, Tailwind CSS');
    setFeaturesInput('Modern UI, Real-time sync, Mobile responsive');
    setIsProjectModalOpen(true);
  };

  const handleOpenEditProject = (project: Project) => {
    setEditingProject(project);
    setProjectFormData({ ...project });
    setTechStackInput((project.technologies || []).join(', '));
    setFeaturesInput((project.features || []).join(', '));
    setIsProjectModalOpen(true);
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectFormData.title?.trim()) {
      addToast('warning', 'Validation', 'Project title is required.');
      return;
    }

    const techArray = techStackInput.split(',').map((s) => s.trim()).filter(Boolean);
    const featArray = featuresInput.split(',').map((s) => s.trim()).filter(Boolean);

    const payload: Partial<Project> = {
      ...projectFormData,
      technologies: techArray.length > 0 ? techArray : ['TypeScript', 'React'],
      features: featArray,
    };

    if (editingProject && editingProject.id) {
      await updateProject(editingProject.id, payload);
    } else {
      await createProject(payload);
    }
    setIsProjectModalOpen(false);
  };

  const handleDeleteProject = async (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      await deleteProject(id);
    }
  };

  // --- Handlers for Achievement CRUD ---
  const handleOpenNewAchievement = () => {
    setEditingAchievement(null);
    setAchievementFormData({
      type: 'CERTIFICATE',
      title: '',
      issuer: '',
      date: new Date().getFullYear().toString(),
      credentialId: '',
      link: '',
      fileUrl: '',
    });
    setIsAchievementModalOpen(true);
  };

  const handleOpenEditAchievement = (item: AchievementItem) => {
    setEditingAchievement(item);
    setAchievementFormData({ ...item });
    setIsAchievementModalOpen(true);
  };

  const handleSaveAchievement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!achievementFormData.title?.trim() || !achievementFormData.issuer?.trim()) {
      addToast('warning', 'Validation', 'Title and Issuer are required.');
      return;
    }

    if (editingAchievement && editingAchievement.id) {
      await updateAchievement(editingAchievement.id, achievementFormData);
    } else {
      await createAchievement(achievementFormData);
    }
    setIsAchievementModalOpen(false);
  };

  const handleDeleteAchievement = async (id: string, title: string) => {
    if (confirm(`Delete achievement "${title}"?`)) {
      await deleteAchievement(id);
    }
  };

  // --- Handlers for Experience CRUD ---
  const handleOpenNewExperience = () => {
    setEditingExperience(null);
    setExperienceFormData({
      type: 'WORK',
      title: '',
      organization: '',
      period: '2026 – Present',
      description: '',
    });
    setIsExperienceModalOpen(true);
  };

  const handleOpenEditExperience = (item: ExperienceItem) => {
    setEditingExperience(item);
    setExperienceFormData({ ...item });
    setIsExperienceModalOpen(true);
  };

  const handleSaveExperience = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!experienceFormData.title?.trim() || !experienceFormData.organization?.trim()) {
      addToast('warning', 'Validation', 'Title and Organization are required.');
      return;
    }

    if (editingExperience && editingExperience.id) {
      await updateExperience(editingExperience.id, experienceFormData);
    } else {
      await createExperience(experienceFormData);
    }
    setIsExperienceModalOpen(false);
  };

  const handleDeleteExperience = async (id: string, title: string) => {
    if (confirm(`Delete experience "${title}"?`)) {
      await deleteExperience(id);
    }
  };

  // --- Handlers for Tech Category CRUD ---
  const handleOpenNewTechCategory = () => {
    setEditingTechCategory(null);
    setTechCategoryFormData({
      category: '',
      items: [],
      iconName: 'Code',
    });
    setTechCategoryItemsInput('');
    setIsTechCategoryModalOpen(true);
  };

  const handleOpenEditTechCategory = (item: SkillCategory) => {
    setEditingTechCategory(item);
    setTechCategoryFormData({ ...item });
    setTechCategoryItemsInput((item.items || []).join(', '));
    setIsTechCategoryModalOpen(true);
  };

  const handleSaveTechCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!techCategoryFormData.category?.trim()) {
      addToast('warning', 'Validation', 'Category name is required.');
      return;
    }

    const items = techCategoryItemsInput.split(',').map((s) => s.trim()).filter(Boolean);
    const payload = { ...techCategoryFormData, items };

    if (editingTechCategory && editingTechCategory.id) {
      await updateTechCategory(editingTechCategory.id, payload);
    } else {
      await createTechCategory(payload);
    }
    setIsTechCategoryModalOpen(false);
  };

  const handleDeleteTechCategory = async (id: string, name: string) => {
    if (confirm(`Delete tech category "${name}"?`)) {
      await deleteTechCategory(id);
    }
  };

  // --- Settings & Test Dispatch ---
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updated = await updateSettings(settingsFormData);
      if (updated) {
        setSettingsFormData(updated);
      }
      await refreshData();
    } catch (err: any) {
      console.error('Failed to save settings:', err);
    }
  };

  const handleTestNotifications = async () => {
    setIsTestingNotifications(true);
    addToast('info', 'Gateway Dispatch', 'Sending test payload to Telegram Bot & Resend...');
    try {
      const res = await api.testNotifications();
      if (res) {
        addToast(
          'success',
          'Dispatch Complete',
          `Telegram: ${res.telegram?.success ? 'Delivered' : 'Offline'} | Email: ${
            res.resend?.success ? 'Delivered' : 'Gateway Ready'
          }`
        );
      }
    } catch (err: any) {
      addToast('error', 'Dispatch Error', err.message || 'Failed to dispatch test notification.');
    } finally {
      setIsTestingNotifications(false);
    }
  };

  // Filtered lists
  const filteredProjects = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(projectSearch.toLowerCase()) ||
      p.category.toLowerCase().includes(projectSearch.toLowerCase()) ||
      (p.technologies || []).some((t) => t.toLowerCase().includes(projectSearch.toLowerCase()))
  );

  const filteredMessages = messages.filter(
    (m) =>
      m.name.toLowerCase().includes(messageSearch.toLowerCase()) ||
      m.email.toLowerCase().includes(messageSearch.toLowerCase()) ||
      m.subject.toLowerCase().includes(messageSearch.toLowerCase()) ||
      m.message.toLowerCase().includes(messageSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#07090f] text-slate-900 dark:text-white flex flex-col font-sans transition-colors duration-200">
      
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-[#0e1320]/90 backdrop-blur-md border-b border-slate-200/80 dark:border-white/10 px-4 sm:px-6 py-3 flex items-center justify-between transition-colors duration-200">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveView('portfolio')}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-surface hover:bg-slate-200 dark:hover:bg-surface-elevated px-3 py-1.5 rounded-lg border border-slate-200/80 dark:border-white/5 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Live Portfolio</span>
          </button>

          <div className="h-4 w-[1px] bg-slate-200 dark:bg-white/10 hidden sm:block" />

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-slate-900 dark:text-white tracking-tight">Portfolio Admin Center</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 font-mono hidden md:inline-block border border-blue-500/20">
              MongoDB + Prisma
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <ThemeToggle variant="pill" id="admin-header-theme-toggle" />

          <button
            onClick={refreshData}
            className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white bg-slate-100 dark:bg-surface hover:bg-slate-200 dark:hover:bg-surface-elevated rounded-lg border border-slate-200/80 dark:border-white/5 transition-all cursor-pointer"
            title="Refresh Data"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleOpenNewAchievement}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 rounded-lg transition-all cursor-pointer"
          >
            <Award className="w-3.5 h-3.5" />
            <span>Add Certificate</span>
          </button>

          <button
            onClick={handleOpenNewProject}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-sm shadow-blue-500/30 transition-all cursor-pointer active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Project</span>
          </button>

          <button
            onClick={logoutAdmin}
            className="p-2 text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 bg-slate-100 dark:bg-surface hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg border border-slate-200/80 dark:border-white/5 transition-all cursor-pointer"
            title="Logout"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Main Body */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar Nav */}
        <aside className="w-full md:w-64 bg-white dark:bg-[#0c101c] border-b md:border-b-0 md:border-r border-slate-200/80 dark:border-white/10 p-4 shrink-0">
          <nav className="flex md:flex-col gap-1 overflow-x-auto md:overflow-x-visible no-scrollbar">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-surface-elevated hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Overview & Stats</span>
            </button>

            <button
              onClick={() => setActiveTab('projects')}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                activeTab === 'projects'
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-surface-elevated hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <FolderGit2 className="w-4 h-4" />
                <span>Projects ({projects.length})</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('achievements')}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                activeTab === 'achievements'
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-surface-elevated hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Award className="w-4 h-4" />
                <span>Certificates ({achievements.length})</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('experiences')}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                activeTab === 'experiences'
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-surface-elevated hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Briefcase className="w-4 h-4" />
                <span>Experiences ({experiences.length})</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('tech')}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                activeTab === 'tech'
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-surface-elevated hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Terminal className="w-4 h-4" />
                <span>Tech Stack ({techCategories.length})</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('messages')}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                activeTab === 'messages'
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-surface-elevated hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4" />
                <span>Inquiries</span>
              </div>
              {messages.filter((m) => !m.isRead).length > 0 && (
                <span className="w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {messages.filter((m) => !m.isRead).length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                activeTab === 'settings'
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-surface-elevated hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Profile & Credentials</span>
            </button>
          </nav>
        </aside>

        {/* Tab Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="glass-panel p-5 rounded-2xl border border-slate-200/90 dark:border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Projects</span>
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white">{projects.length}</h3>
                  </div>
                  <div className="p-3 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-xl">
                    <FolderGit2 className="w-6 h-6" />
                  </div>
                </div>

                <div className="glass-panel p-5 rounded-2xl border border-slate-200/90 dark:border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Certificates & Honors</span>
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white">{achievements.length}</h3>
                  </div>
                  <div className="p-3 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl">
                    <Award className="w-6 h-6" />
                  </div>
                </div>

                <div className="glass-panel p-5 rounded-2xl border border-slate-200/90 dark:border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Inquiries</span>
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white">{messages.length}</h3>
                  </div>
                  <div className="p-3 bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-xl">
                    <Mail className="w-6 h-6" />
                  </div>
                </div>

                <div className="glass-panel p-5 rounded-2xl border border-slate-200/90 dark:border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Total Views</span>
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white">{stats?.totalViews || 1250}</h3>
                  </div>
                  <div className="p-3 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-xl">
                    <Eye className="w-6 h-6" />
                  </div>
                </div>
              </div>

              {/* Quick Actions & Recent Messages */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 glass-panel p-6 rounded-2xl border border-slate-200/90 dark:border-white/10">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-blue-500" />
                    <span>Recent Messages ({messages.length})</span>
                  </h3>

                  {messages.length === 0 ? (
                    <p className="text-xs text-slate-500 py-6 text-center">No messages received yet.</p>
                  ) : (
                    <div className="space-y-3">
                      {messages.slice(0, 4).map((msg) => (
                        <div
                          key={msg.id}
                          onClick={() => { setSelectedMessage(msg); markMessageRead(msg.id); }}
                          className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                            !msg.isRead
                              ? 'bg-blue-500/10 border-blue-500/30 text-slate-900 dark:text-white'
                              : 'bg-slate-100/60 dark:bg-surface/50 border-slate-200/80 dark:border-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-200/60'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <span className="font-semibold text-xs text-slate-900 dark:text-white">{msg.name}</span>
                            <span className="text-[10px] font-mono text-slate-400">{new Date(msg.createdAt).toLocaleDateString()}</span>
                          </div>
                          <p className="text-xs font-medium text-slate-700 dark:text-slate-300 truncate">{msg.subject}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="glass-panel p-6 rounded-2xl border border-slate-200/90 dark:border-white/10 space-y-4">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-500" />
                    <span>Quick CRUD Actions</span>
                  </h3>

                  <button
                    onClick={handleOpenNewAchievement}
                    className="w-full flex items-center justify-between p-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold transition-all"
                  >
                    <span className="flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      Upload PDF Certificate
                    </span>
                    <Plus className="w-4 h-4" />
                  </button>

                  <button
                    onClick={handleOpenNewProject}
                    className="w-full flex items-center justify-between p-3 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-600 dark:text-blue-400 text-xs font-semibold transition-all"
                  >
                    <span className="flex items-center gap-2">
                      <FolderGit2 className="w-4 h-4" />
                      Create New Project
                    </span>
                    <Plus className="w-4 h-4" />
                  </button>

                  <button
                    onClick={handleOpenNewExperience}
                    className="w-full flex items-center justify-between p-3 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-600 dark:text-purple-400 text-xs font-semibold transition-all"
                  >
                    <span className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4" />
                      Add Work / Education
                    </span>
                    <Plus className="w-4 h-4" />
                  </button>

                  <button
                    onClick={handleTestNotifications}
                    disabled={isTestingNotifications}
                    className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isTestingNotifications ? 'Testing Gateways...' : 'Test Telegram / Email Gateways'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ACHIEVEMENTS & CERTIFICATES (With Cloud File Upload) */}
          {activeTab === 'achievements' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">Certificates & Achievements</h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Upload PDF or image certificates directly from your laptop to store in MongoDB and Cloud Storage.
                  </p>
                </div>

                <button
                  onClick={handleOpenNewAchievement}
                  className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-sm shadow-emerald-600/30 transition-all cursor-pointer self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Achievement / PDF</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((item) => (
                  <div
                    key={item.id}
                    className="glass-panel p-5 rounded-2xl border border-slate-200/90 dark:border-white/10 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                          {item.type}
                        </span>
                        <span className="text-xs font-mono text-slate-400">{item.date}</span>
                      </div>

                      <h3 className="text-base font-bold text-slate-900 dark:text-white">{item.title}</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-semibold">{item.issuer}</p>

                      {item.credentialId && (
                        <p className="text-xs font-mono text-slate-400 mt-2">Credential ID: {item.credentialId}</p>
                      )}
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-200/80 dark:border-white/5 flex items-center justify-between">
                      {item.fileUrl ? (
                        <a
                          href={item.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1.5"
                        >
                          <FileText className="w-4 h-4" />
                          <span>View PDF File</span>
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
                        <span className="text-xs font-mono text-slate-500">No Attachment</span>
                      )}

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleOpenEditAchievement(item)}
                          className="p-1.5 text-slate-400 hover:text-blue-500 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteAchievement(item.id!, item.title)}
                          className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: EXPERIENCES MANAGER */}
          {activeTab === 'experiences' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">Experience Manager</h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Manage Work, Education, Volunteering, and Innovation competitions with multiline bullet points.
                  </p>
                </div>

                <button
                  onClick={handleOpenNewExperience}
                  className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-xl shadow-sm shadow-purple-600/30 transition-all cursor-pointer self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Experience</span>
                </button>
              </div>

              <div className="space-y-4">
                {experiences.map((exp) => (
                  <div
                    key={exp.id}
                    className="glass-panel p-5 rounded-2xl border border-slate-200/90 dark:border-white/10 flex flex-col sm:flex-row justify-between gap-4"
                  >
                    <div className="space-y-1 max-w-3xl">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                          {exp.type}
                        </span>
                        <span className="text-xs font-mono text-slate-400">{exp.period}</span>
                      </div>

                      <h3 className="text-base font-bold text-slate-900 dark:text-white">{exp.title}</h3>
                      <p className="text-xs font-semibold text-blue-600 dark:text-cyan-400">{exp.organization}</p>
                      {exp.description && (
                        <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 whitespace-pre-line leading-relaxed">
                          {exp.description}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <button
                        onClick={() => handleOpenEditExperience(exp)}
                        className="p-2 text-slate-400 hover:text-blue-500 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteExperience(exp.id!, exp.title)}
                        className="p-2 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: TECH STACK MANAGER */}
          {activeTab === 'tech' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">Tech Stack Manager</h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Add or modify skill categories and technical proficiencies dynamically.
                  </p>
                </div>

                <button
                  onClick={handleOpenNewTechCategory}
                  className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-cyan-600 hover:bg-cyan-500 rounded-xl shadow-sm shadow-cyan-600/30 transition-all cursor-pointer self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Skill Category</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {techCategories.map((cat) => (
                  <div key={cat.id} className="glass-panel p-5 rounded-2xl border border-slate-200/90 dark:border-white/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">{cat.category}</h3>
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => handleOpenEditTechCategory(cat)}
                          className="p-1.5 text-slate-400 hover:text-blue-500 rounded-lg transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteTechCategory(cat.id!, cat.category)}
                          className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {cat.items.map((item, idx) => (
                        <span key={idx} className="text-xs font-semibold px-2.5 py-1 bg-slate-100 dark:bg-surface-elevated text-slate-700 dark:text-slate-300 rounded-lg border border-slate-200/80 dark:border-white/5">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: PROJECTS CRUD */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search projects by title, category, or tech..."
                    value={projectSearch}
                    onChange={(e) => setProjectSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-white dark:bg-surface border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <button
                  onClick={handleOpenNewProject}
                  className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-sm shadow-blue-600/30 transition-all cursor-pointer self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Project</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProjects.map((p) => (
                  <div key={p.id} className="glass-panel rounded-2xl border border-slate-200/90 dark:border-white/10 overflow-hidden flex flex-col justify-between">
                    <div>
                      <div className="h-40 relative overflow-hidden bg-slate-900">
                        <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                        {p.featured && (
                          <span className="absolute top-2 right-2 px-2 py-0.5 rounded bg-amber-500 text-slate-950 font-bold text-[10px]">
                            Featured
                          </span>
                        )}
                      </div>

                      <div className="p-4 space-y-2">
                        <span className="text-[10px] font-mono text-blue-500 font-bold uppercase">{p.category}</span>
                        <h3 className="text-base font-bold text-slate-900 dark:text-white">{p.title}</h3>
                        <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">{p.description}</p>
                      </div>
                    </div>

                    <div className="p-4 border-t border-slate-200/80 dark:border-white/5 flex items-center justify-between">
                      <span className="text-xs text-slate-400 font-mono">{p.views || 0} views</span>
                      <div className="flex items-center space-x-2">
                        <button onClick={() => handleOpenEditProject(p)} className="p-1.5 text-slate-400 hover:text-blue-500 rounded-lg">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDeleteProject(p.id!, p.title)} className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: MESSAGES */}
          {activeTab === 'messages' && (
            <div className="space-y-6">
              <div className="relative max-w-md">
                <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filter inquiries..."
                  value={messageSearch}
                  onChange={(e) => setMessageSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-white dark:bg-surface border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-3">
                {filteredMessages.map((msg) => (
                  <div key={msg.id} className="glass-panel p-5 rounded-2xl border border-slate-200/90 dark:border-white/10 flex flex-col sm:flex-row justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900 dark:text-white">{msg.name}</span>
                        <span className="text-xs text-blue-500">&lt;{msg.email}&gt;</span>
                      </div>
                      <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-200">{msg.subject}</h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">{msg.message}</p>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <button onClick={() => deleteMessage(msg.id)} className="p-2 text-slate-400 hover:text-rose-500 rounded-lg">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: SETTINGS & GLOBAL BRANDING */}
          {activeTab === 'settings' && (
            <form onSubmit={handleSaveSettings} className="space-y-6 max-w-4xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                    <Globe className="w-5 h-5 text-blue-500" />
                    <span>Global Settings &amp; Personal Branding</span>
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Manage core brand assets, profile photos, downloadable resume, work availability status, and social presence.
                  </p>
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-xl shadow-md shadow-blue-600/30 transition-all cursor-pointer active:scale-95 self-start sm:self-auto"
                >
                  Save Global Settings
                </button>
              </div>

              {/* Asset Management Card */}
              <div className="glass-panel p-6 rounded-2xl border border-slate-200/90 dark:border-white/10 space-y-6">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider text-blue-500 font-mono">
                  1. Brand Asset Uploaders (Cloud Storage)
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Profile Photo Dropzone */}
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Profile Portrait Photo (Home &amp; Hero Section)
                    </label>
                    <FileUpload
                      value={settingsFormData.profileImageUrl || settingsFormData.avatar || ''}
                      onChange={(url) => setSettingsFormData({ ...settingsFormData, profileImageUrl: url, avatar: url })}
                      label=""
                      accept="image/*"
                    />
                    <p className="text-[11px] text-slate-500">Updates profile photo across hero section, navigation bar, and metadata.</p>
                  </div>

                  {/* Navbar Logo Dropzone */}
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Navbar Logo &amp; Icon
                    </label>
                    <FileUpload
                      value={settingsFormData.logoUrl || settingsFormData.avatar || ''}
                      onChange={(url) => setSettingsFormData({ ...settingsFormData, logoUrl: url })}
                      label=""
                      accept="image/*"
                    />
                    <p className="text-[11px] text-slate-500">Custom logo icon for navbar header (defaults to profile photo if empty).</p>
                  </div>
                </div>

                {/* Resume PDF Dropzone */}
                <div className="space-y-2 pt-2 border-t border-slate-200/80 dark:border-white/5">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Downloadable Resume / CV (PDF Document)
                  </label>
                  <FileUpload
                    value={settingsFormData.resumeUrl || settingsFormData.resumePdf || ''}
                    onChange={(url) => setSettingsFormData({ ...settingsFormData, resumeUrl: url, resumePdf: url })}
                    label=""
                    accept=".pdf,application/pdf"
                  />
                  <p className="text-[11px] text-slate-500">Public 'Download CV' buttons across the site will download this PDF file directly.</p>
                </div>
              </div>

              {/* Availability & Security Configuration Card */}
              <div className="glass-panel p-6 rounded-2xl border border-slate-200/90 dark:border-white/10 space-y-5">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider text-emerald-500 font-mono">
                  2. Work Availability Status &amp; SSL Security
                </h3>

                <div className="space-y-1.5 max-w-xl">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Work Availability Status
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Available for Work, Open to Research"
                    value={settingsFormData.status || 'Available for Work'}
                    onChange={(e) => setSettingsFormData({ ...settingsFormData, status: e.target.value })}
                    className="w-full p-2.5 text-xs rounded-xl bg-white dark:bg-surface border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-[11px] text-slate-500">Live availability status text synchronized with database.</p>
                </div>
              </div>

              {/* Personal Information & Social Links */}
              <div className="glass-panel p-6 rounded-2xl border border-slate-200/90 dark:border-white/10 space-y-4">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider text-purple-500 font-mono">
                  3. Personal Identity &amp; Contact Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Full Name</label>
                    <input
                      type="text"
                      value={settingsFormData.name}
                      onChange={(e) => setSettingsFormData({ ...settingsFormData, name: e.target.value })}
                      className="w-full mt-1 p-2.5 text-xs rounded-xl bg-white dark:bg-surface border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Title / Designation</label>
                    <input
                      type="text"
                      value={settingsFormData.title}
                      onChange={(e) => setSettingsFormData({ ...settingsFormData, title: e.target.value })}
                      className="w-full mt-1 p-2.5 text-xs rounded-xl bg-white dark:bg-surface border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Email Address</label>
                    <input
                      type="email"
                      value={settingsFormData.email}
                      onChange={(e) => setSettingsFormData({ ...settingsFormData, email: e.target.value })}
                      className="w-full mt-1 p-2.5 text-xs rounded-xl bg-white dark:bg-surface border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Phone</label>
                    <input
                      type="text"
                      value={settingsFormData.phone}
                      onChange={(e) => setSettingsFormData({ ...settingsFormData, phone: e.target.value })}
                      className="w-full mt-1 p-2.5 text-xs rounded-xl bg-white dark:bg-surface border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">GitHub Profile URL</label>
                    <input
                      type="url"
                      value={settingsFormData.github}
                      onChange={(e) => setSettingsFormData({ ...settingsFormData, github: e.target.value })}
                      className="w-full mt-1 p-2.5 text-xs rounded-xl bg-white dark:bg-surface border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">LinkedIn Profile URL</label>
                    <input
                      type="url"
                      value={settingsFormData.linkedin}
                      onChange={(e) => setSettingsFormData({ ...settingsFormData, linkedin: e.target.value })}
                      className="w-full mt-1 p-2.5 text-xs rounded-xl bg-white dark:bg-surface border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Professional Bio</label>
                  <textarea
                    rows={4}
                    value={settingsFormData.bio}
                    onChange={(e) => setSettingsFormData({ ...settingsFormData, bio: e.target.value })}
                    className="w-full mt-1 p-2.5 text-xs rounded-xl bg-white dark:bg-surface border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-blue-600/30 transition-all cursor-pointer active:scale-95"
                >
                  Save Global Settings
                </button>
              </div>
            </form>
          )}

        </main>
      </div>

      {/* --- MODAL: Add/Edit Achievement & Certificate --- */}
      {isAchievementModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-6 space-y-4 text-white shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">
                {editingAchievement ? 'Edit Achievement / Certificate' : 'Add New Achievement / Certificate'}
              </h3>
              <button onClick={() => setIsAchievementModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveAchievement} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300">Category Type</label>
                <select
                  value={achievementFormData.type}
                  onChange={(e) => setAchievementFormData({ ...achievementFormData, type: e.target.value as any })}
                  className="w-full mt-1 p-2 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white"
                >
                  <option value="CERTIFICATE">Certificate</option>
                  <option value="COMPETITION">Competition</option>
                  <option value="ACADEMIC_HONOR">Academic Honor</option>
                  <option value="LEADERSHIP">Leadership</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300">Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Scrum Master Certification"
                  value={achievementFormData.title}
                  onChange={(e) => setAchievementFormData({ ...achievementFormData, title: e.target.value })}
                  className="w-full mt-1 p-2 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300">Issuer / Provider</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Agile Enterprise Coach"
                    value={achievementFormData.issuer}
                    onChange={(e) => setAchievementFormData({ ...achievementFormData, issuer: e.target.value })}
                    className="w-full mt-1 p-2 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300">Date / Year</label>
                  <input
                    type="text"
                    placeholder="e.g. Jun 2026"
                    value={achievementFormData.date}
                    onChange={(e) => setAchievementFormData({ ...achievementFormData, date: e.target.value })}
                    className="w-full mt-1 p-2 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300">Credential ID (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. 1006580"
                  value={achievementFormData.credentialId || ''}
                  onChange={(e) => setAchievementFormData({ ...achievementFormData, credentialId: e.target.value })}
                  className="w-full mt-1 p-2 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white"
                />
              </div>

              {/* Cloud File Dropzone Component */}
              <FileUpload
                value={achievementFormData.fileUrl || ''}
                onChange={(url) => setAchievementFormData({ ...achievementFormData, fileUrl: url })}
                label="Certificate PDF / Image File Upload"
              />

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAchievementModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl"
                >
                  Save Achievement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL: Add/Edit Experience --- */}
      {isExperienceModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-6 space-y-4 text-white shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">
                {editingExperience ? 'Edit Experience' : 'Add New Experience'}
              </h3>
              <button onClick={() => setIsExperienceModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveExperience} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300">Category Type</label>
                <select
                  value={experienceFormData.type}
                  onChange={(e) => setExperienceFormData({ ...experienceFormData, type: e.target.value as any })}
                  className="w-full mt-1 p-2 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white"
                >
                  <option value="WORK">Work / Internship</option>
                  <option value="EDUCATION">Education</option>
                  <option value="VOLUNTEER">Volunteer</option>
                  <option value="INNOVATION">Innovation / Competition</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300">Title / Role / Degree</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sisters of Code Ambassador"
                  value={experienceFormData.title}
                  onChange={(e) => setExperienceFormData({ ...experienceFormData, title: e.target.value })}
                  className="w-full mt-1 p-2 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300">Organization / Institution</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. CamTech University"
                    value={experienceFormData.organization}
                    onChange={(e) => setExperienceFormData({ ...experienceFormData, organization: e.target.value })}
                    className="w-full mt-1 p-2 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300">Period / Timeline</label>
                  <input
                    type="text"
                    placeholder="e.g. 2024 – Present"
                    value={experienceFormData.period}
                    onChange={(e) => setExperienceFormData({ ...experienceFormData, period: e.target.value })}
                    className="w-full mt-1 p-2 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300">Description (Multi-line Bullet Points Supported)</label>
                <textarea
                  rows={4}
                  placeholder="Enter detailed description or bullet points..."
                  value={experienceFormData.description || ''}
                  onChange={(e) => setExperienceFormData({ ...experienceFormData, description: e.target.value })}
                  className="w-full mt-1 p-2 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsExperienceModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold bg-purple-600 hover:bg-purple-500 text-white rounded-xl"
                >
                  Save Experience
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL: Add/Edit Tech Category --- */}
      {isTechCategoryModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-6 space-y-4 text-white shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">
                {editingTechCategory ? 'Edit Skill Category' : 'Add Skill Category'}
              </h3>
              <button onClick={() => setIsTechCategoryModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveTechCategory} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300">Category Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Frontend Engineering"
                  value={techCategoryFormData.category}
                  onChange={(e) => setTechCategoryFormData({ ...techCategoryFormData, category: e.target.value })}
                  className="w-full mt-1 p-2 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300">Icon Name</label>
                <select
                  value={techCategoryFormData.iconName || 'Code'}
                  onChange={(e) => setTechCategoryFormData({ ...techCategoryFormData, iconName: e.target.value })}
                  className="w-full mt-1 p-2 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white"
                >
                  <option value="Globe">Globe (Web Dev)</option>
                  <option value="Layout">Layout (Frontend)</option>
                  <option value="Server">Server (Backend)</option>
                  <option value="Database">Database</option>
                  <option value="Cpu font">Cpu (Tools)</option>
                  <option value="Layers">Layers (AI)</option>
                  <option value="Users">Users (Soft Skills)</option>
                  <option value="Code">Code</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300">Skills / Technologies (Comma-separated)</label>
                <textarea
                  rows={3}
                  placeholder="React.js, Next.js 14, Tailwind CSS, Framer Motion"
                  value={techCategoryItemsInput}
                  onChange={(e) => setTechCategoryItemsInput(e.target.value)}
                  className="w-full mt-1 p-2 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsTechCategoryModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL: Add/Edit Project --- */}
      {isProjectModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl p-6 space-y-4 text-white shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">
                {editingProject ? 'Edit Project' : 'Create New Project'}
              </h3>
              <button onClick={() => setIsProjectModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300">Project Title</label>
                  <input
                    type="text"
                    required
                    value={projectFormData.title}
                    onChange={(e) => setProjectFormData({ ...projectFormData, title: e.target.value })}
                    className="w-full mt-1 p-2 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300">Category</label>
                  <input
                    type="text"
                    value={projectFormData.category}
                    onChange={(e) => setProjectFormData({ ...projectFormData, category: e.target.value })}
                    className="w-full mt-1 p-2 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300">Description</label>
                <textarea
                  rows={3}
                  value={projectFormData.description}
                  onChange={(e) => setProjectFormData({ ...projectFormData, description: e.target.value })}
                  className="w-full mt-1 p-2 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300">Tech Stack (Comma-separated)</label>
                <input
                  type="text"
                  value={techStackInput}
                  onChange={(e) => setTechStackInput(e.target.value)}
                  className="w-full mt-1 p-2 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300">GitHub Repository URL</label>
                  <input
                    type="url"
                    value={projectFormData.githubUrl || ''}
                    onChange={(e) => setProjectFormData({ ...projectFormData, githubUrl: e.target.value })}
                    className="w-full mt-1 p-2 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300">Live Demo URL</label>
                  <input
                    type="url"
                    value={projectFormData.liveUrl || ''}
                    onChange={(e) => setProjectFormData({ ...projectFormData, liveUrl: e.target.value })}
                    className="w-full mt-1 p-2 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300">Image Cover URL</label>
                <input
                  type="text"
                  value={projectFormData.image || ''}
                  onChange={(e) => setProjectFormData({ ...projectFormData, image: e.target.value })}
                  className="w-full mt-1 p-2 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsProjectModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white rounded-xl"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
