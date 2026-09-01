import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Project,
  Message,
  PersonalInfo,
  AdminStats,
  ToastMessage,
  ExperienceItem,
  AchievementItem,
  SkillCategory,
  LanguageItem,
} from '../types';
import { initialProjects, initialMessages, initialProfileSettings, skillsData, languagesData } from '../data/initialData';
import { api } from '../lib/api';

interface PortfolioContextType {
  // Data
  projects: Project[];
  messages: Message[];
  settings: PersonalInfo;
  experiences: ExperienceItem[];
  achievements: AchievementItem[];
  techCategories: SkillCategory[];
  languages: LanguageItem[];
  stats: AdminStats | null;
  isLoading: boolean;

  // View state
  activeView: 'portfolio' | 'admin';
  setActiveView: (view: 'portfolio' | 'admin') => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Modals & Case Studies
  selectedProject: Project | null;
  setSelectedProject: (p: Project | null) => void;
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (open: boolean) => void;

  // Admin Auth
  isAdmin: boolean;
  adminToken: string | null;
  loginAdmin: (email: string, pin: string) => Promise<boolean>;
  logoutAdmin: () => void;

  // CRUD actions - Projects
  createProject: (data: Partial<Project>) => Promise<Project>;
  updateProject: (id: string, data: Partial<Project>) => Promise<Project>;
  deleteProject: (id: string) => Promise<boolean>;

  // CRUD actions - Experiences
  createExperience: (data: Partial<ExperienceItem>) => Promise<ExperienceItem>;
  updateExperience: (id: string, data: Partial<ExperienceItem>) => Promise<ExperienceItem>;
  deleteExperience: (id: string) => Promise<boolean>;

  // CRUD actions - Achievements
  createAchievement: (data: Partial<AchievementItem>) => Promise<AchievementItem>;
  updateAchievement: (id: string, data: Partial<AchievementItem>) => Promise<AchievementItem>;
  deleteAchievement: (id: string) => Promise<boolean>;

  // CRUD actions - Tech Categories
  createTechCategory: (data: Partial<SkillCategory>) => Promise<SkillCategory>;
  updateTechCategory: (id: string, data: Partial<SkillCategory>) => Promise<SkillCategory>;
  deleteTechCategory: (id: string) => Promise<boolean>;

  // CRUD actions - Languages
  createLanguage: (data: Partial<LanguageItem>) => Promise<LanguageItem>;
  updateLanguage: (id: string, data: Partial<LanguageItem>) => Promise<LanguageItem>;
  deleteLanguage: (id: string) => Promise<boolean>;

  // Messages & Settings
  markMessageRead: (id: string) => Promise<void>;
  deleteMessage: (id: string) => Promise<boolean>;
  updateSettings: (data: Partial<PersonalInfo>) => Promise<PersonalInfo>;
  refreshData: () => Promise<void>;

  // Toasts
  toasts: ToastMessage[];
  addToast: (type: ToastMessage['type'], title: string, message: string, duration?: number) => void;
  removeToast: (id: string) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [settings, setSettings] = useState<PersonalInfo>(initialProfileSettings);
  const [experiences, setExperiences] = useState<ExperienceItem[]>([]);
  const [achievements, setAchievements] = useState<AchievementItem[]>([]);
  const [techCategories, setTechCategories] = useState<SkillCategory[]>(skillsData);
  const [languages, setLanguages] = useState<LanguageItem[]>(languagesData);

  const [stats, setStats] = useState<AdminStats | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [activeView, setActiveView] = useState<'portfolio' | 'admin'>('portfolio');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return Boolean(localStorage.getItem('admin_token'));
  });
  const [adminToken, setAdminToken] = useState<string | null>(() => {
    return localStorage.getItem('admin_token');
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: ToastMessage['type'], title: string, message: string, duration = 4000) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    const newToast: ToastMessage = { id, type, title, message, duration };
    setToasts((prev) => [...prev, newToast]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const refreshData = async () => {
    try {
      const [
        fetchedProjects,
        fetchedSettings,
        fetchedStats,
        fetchedExp,
        fetchedAch,
        fetchedCat,
        fetchedLang,
      ] = await Promise.all([
        api.getProjects(),
        api.getSettings(),
        api.getStats(),
        api.getExperiences(),
        api.getAchievements(),
        api.getTechCategories(),
        api.getLanguages(),
      ]);

      setProjects(fetchedProjects);
      setSettings(fetchedSettings);
      setStats(fetchedStats);
      setExperiences(fetchedExp);
      setAchievements(fetchedAch);
      setTechCategories(fetchedCat);
      setLanguages(fetchedLang);

      if (isAdmin) {
        const fetchedMessages = await api.getMessages();
        setMessages(fetchedMessages);
      }
    } catch (err) {
      console.error('[PortfolioContext] Failed to load data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, [isAdmin]);

  // Dynamic Favicon & Page Title synchronization with settings (Circle crop & transparent background)
  useEffect(() => {
    if (settings) {
      const activeIconUrl = settings.logoUrl || settings.profileImageUrl || settings.avatar || '/img/Soth%20vannak%20rothchansokhomal.jpg';
      
      if (settings.name) {
        document.title = `${settings.name} | ${settings.title || 'Software Engineering Student & Developer'}`;
      }

      // Convert image to transparent circle with professional outer shadow outline ring
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          const size = 128;
          canvas.width = size;
          canvas.height = size;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            const centerX = size / 2;
            const centerY = size / 2;
            const ringRadius = size / 2 - 5;
            const innerRadius = ringRadius - 3;

            // Draw outer shadow glow
            ctx.shadowColor = 'rgba(37, 99, 235, 0.4)';
            ctx.shadowBlur = 6;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 1;

            // Draw outer brand stroke ring
            ctx.beginPath();
            ctx.arc(centerX, centerY, ringRadius, 0, Math.PI * 2);
            ctx.strokeStyle = '#2563eb';
            ctx.lineWidth = 4;
            ctx.stroke();

            // Clip inner circle concentric to outer ring
            ctx.shadowColor = 'transparent';
            ctx.beginPath();
            ctx.arc(centerX, centerY, innerRadius, 0, Math.PI * 2);
            ctx.closePath();
            ctx.clip();

            // Calculate 1:1 aspect cover crop centered on portrait headshot
            const imgRatio = img.width / img.height;
            let srcX = 0;
            let srcY = 0;
            let srcW = img.width;
            let srcH = img.height;

            if (imgRatio > 1) {
              srcW = img.height;
              srcX = (img.width - img.height) / 2;
            } else if (imgRatio < 1) {
              srcH = img.width;
              srcY = (img.height - img.width) * 0.1; // 10% top shift for headshots
            }

            ctx.drawImage(
              img,
              srcX,
              srcY,
              srcW,
              srcH,
              centerX - innerRadius,
              centerY - innerRadius,
              innerRadius * 2,
              innerRadius * 2
            );

            const circleDataUrl = canvas.toDataURL('image/png');
            const favicons = document.querySelectorAll<HTMLLinkElement>("link[rel*='icon'], link[rel='apple-touch-icon']");
            favicons.forEach((favicon) => {
              favicon.href = circleDataUrl;
              favicon.type = 'image/png';
            });
            return;
          }
        } catch (e) {
          // Fallback if canvas is tainted by CORS
        }

        const svgDataUrl = `data:image/svg+xml,${encodeURIComponent(
          `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="48" fill="none" stroke="#2563eb" stroke-width="4"/><clipPath id="c"><circle cx="50" cy="50" r="45"/></clipPath><image href="${activeIconUrl}" width="100" height="100" clip-path="url(#c)"/></svg>`
        )}`;

        const favicons = document.querySelectorAll<HTMLLinkElement>("link[rel*='icon'], link[rel='apple-touch-icon']");
        favicons.forEach((favicon) => {
          favicon.href = svgDataUrl;
          favicon.type = 'image/svg+xml';
        });
      };
      img.onerror = () => {
        const svgDataUrl = `data:image/svg+xml,${encodeURIComponent(
          `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><clipPath id="c"><circle cx="50" cy="50" r="50"/></clipPath><image href="${activeIconUrl}" width="100" height="100" clip-path="url(#c)"/></svg>`
        )}`;
        const favicons = document.querySelectorAll<HTMLLinkElement>("link[rel*='icon'], link[rel='apple-touch-icon']");
        favicons.forEach((favicon) => {
          favicon.href = svgDataUrl;
          favicon.type = 'image/svg+xml';
        });
      };
      img.src = activeIconUrl;
    }
  }, [settings]);

  const loginAdmin = async (email: string, pin: string): Promise<boolean> => {
    try {
      const res = await api.loginAdmin(email, pin);
      if (res.success) {
        setIsAdmin(true);
        setIsLoginModalOpen(false);
        setActiveView('admin');
        addToast('success', 'Admin Authenticated', `Welcome back! Admin mode unlocked.`);
        const msgRes = await api.getMessages();
        setMessages(msgRes);
        return true;
      }
      return false;
    } catch (err: any) {
      addToast('error', 'Authentication Failed', err.message || 'Invalid admin credentials');
      return false;
    }
  };

  const logoutAdmin = async () => {
    try {
      await api.logoutAdmin();
    } catch(e) {}
    localStorage.removeItem('admin_token');
    setIsAdmin(false);
    setAdminToken(null);
    setActiveView('portfolio');
    addToast('info', 'Logged Out', 'Admin session has been terminated safely.');
  };

  // Projects CRUD
  const createProject = async (data: Partial<Project>): Promise<Project> => {
    const created = await api.createProject(data);
    setProjects((prev) => [created, ...prev]);
    addToast('success', 'Project Published', `"${created.title}" is now live on your portfolio.`);
    refreshData();
    return created;
  };

  const updateProject = async (id: string, data: Partial<Project>): Promise<Project> => {
    const updated = await api.updateProject(id, data);
    setProjects((prev) => prev.map((p) => (p.id === id ? updated : p)));
    addToast('success', 'Project Updated', `Changes to "${updated.title}" have been saved.`);
    refreshData();
    return updated;
  };

  const deleteProject = async (id: string): Promise<boolean> => {
    const success = await api.deleteProject(id);
    if (success) {
      setProjects((prev) => prev.filter((p) => p.id !== id));
      addToast('success', 'Project Deleted', 'The project has been removed from database.');
      refreshData();
    }
    return success;
  };

  // Experiences CRUD
  const createExperience = async (data: Partial<ExperienceItem>): Promise<ExperienceItem> => {
    const created = await api.createExperience(data);
    setExperiences((prev) => [created, ...prev]);
    addToast('success', 'Experience Added', `"${created.title}" added to experiences.`);
    refreshData();
    return created;
  };

  const updateExperience = async (id: string, data: Partial<ExperienceItem>): Promise<ExperienceItem> => {
    const updated = await api.updateExperience(id, data);
    setExperiences((prev) => prev.map((e) => (e.id === id ? updated : e)));
    addToast('success', 'Experience Updated', `"${updated.title}" updated.`);
    refreshData();
    return updated;
  };

  const deleteExperience = async (id: string): Promise<boolean> => {
    const success = await api.deleteExperience(id);
    if (success) {
      setExperiences((prev) => prev.filter((e) => e.id !== id));
      addToast('info', 'Experience Deleted', 'Removed from experiences.');
      refreshData();
    }
    return success;
  };

  // Achievements CRUD
  const createAchievement = async (data: Partial<AchievementItem>): Promise<AchievementItem> => {
    const created = await api.createAchievement(data);
    setAchievements((prev) => [created, ...prev]);
    addToast('success', 'Achievement Created', `"${created.title}" saved.`);
    refreshData();
    return created;
  };

  const updateAchievement = async (id: string, data: Partial<AchievementItem>): Promise<AchievementItem> => {
    const updated = await api.updateAchievement(id, data);
    setAchievements((prev) => prev.map((a) => (a.id === id ? updated : a)));
    addToast('success', 'Achievement Updated', `"${updated.title}" updated.`);
    refreshData();
    return updated;
  };

  const deleteAchievement = async (id: string): Promise<boolean> => {
    const success = await api.deleteAchievement(id);
    if (success) {
      setAchievements((prev) => prev.filter((a) => a.id !== id));
      addToast('info', 'Achievement Deleted', 'Removed from achievements.');
      refreshData();
    }
    return success;
  };

  // Tech Categories CRUD
  const createTechCategory = async (data: Partial<SkillCategory>): Promise<SkillCategory> => {
    const created = await api.createTechCategory(data);
    setTechCategories((prev) => [...prev, created]);
    addToast('success', 'Tech Category Created', `"${created.category}" added.`);
    refreshData();
    return created;
  };

  const updateTechCategory = async (id: string, data: Partial<SkillCategory>): Promise<SkillCategory> => {
    const updated = await api.updateTechCategory(id, data);
    setTechCategories((prev) => prev.map((c) => (c.id === id ? updated : c)));
    addToast('success', 'Tech Category Updated', `"${updated.category}" updated.`);
    refreshData();
    return updated;
  };

  const deleteTechCategory = async (id: string): Promise<boolean> => {
    const success = await api.deleteTechCategory(id);
    if (success) {
      setTechCategories((prev) => prev.filter((c) => c.id !== id));
      addToast('info', 'Tech Category Removed', 'Category deleted.');
      refreshData();
    }
    return success;
  };

  // Languages CRUD
  const createLanguage = async (data: Partial<LanguageItem>): Promise<LanguageItem> => {
    const created = await api.createLanguage(data);
    setLanguages((prev) => [...prev, created]);
    addToast('success', 'Language Added', `"${created.language}" added.`);
    refreshData();
    return created;
  };

  const updateLanguage = async (id: string, data: Partial<LanguageItem>): Promise<LanguageItem> => {
    const updated = await api.updateLanguage(id, data);
    setLanguages((prev) => prev.map((l) => (l.id === id ? updated : l)));
    addToast('success', 'Language Updated', `"${updated.language}" updated.`);
    refreshData();
    return updated;
  };

  const deleteLanguage = async (id: string): Promise<boolean> => {
    const success = await api.deleteLanguage(id);
    if (success) {
      setLanguages((prev) => prev.filter((l) => l.id !== id));
      addToast('info', 'Language Removed', 'Language deleted.');
      refreshData();
    }
    return success;
  };

  const markMessageRead = async (id: string) => {
    try {
      const updated = await api.markMessageAsRead(id);
      setMessages((prev) => prev.map((m) => (m.id === id ? updated : m)));
    } catch (err) {
      console.error('Failed to mark message read:', err);
    }
  };

  const deleteMessage = async (id: string): Promise<boolean> => {
    const success = await api.deleteMessage(id);
    if (success) {
      setMessages((prev) => prev.filter((m) => m.id !== id));
      addToast('info', 'Message Removed', 'The inquiry has been archived.');
      refreshData();
    }
    return success;
  };

  const updateSettings = async (data: Partial<PersonalInfo>): Promise<PersonalInfo> => {
    const updated = await api.updateSettings(data);
    setSettings(updated);
    addToast('success', 'Settings Saved', 'Profile information updated across the portfolio.');
    await refreshData();
    return updated;
  };

  return (
    <PortfolioContext.Provider
      value={{
        projects,
        messages,
        settings,
        experiences,
        achievements,
        techCategories,
        languages,
        stats,
        isLoading,
        activeView,
        setActiveView,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        selectedProject,
        setSelectedProject,
        isLoginModalOpen,
        setIsLoginModalOpen,
        isAdmin,
        adminToken,
        loginAdmin,
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
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
