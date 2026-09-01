import {
  Project,
  Message,
  PersonalInfo,
  AdminStats,
  ExperienceItem,
  AchievementItem,
  SkillCategory,
  LanguageItem,
} from '../types';
import {
  initialProjects,
  initialMessages,
  initialProfileSettings,
  educationData,
  leadershipData,
  certificatesData,
  scholarshipsData,
  skillsData,
  languagesData,
} from '../data/initialData';

const BASE_URL = '/api';


async function safeJson(res: Response) {
  const isJson = res.headers.get('content-type')?.includes('application/json');
  return isJson ? await safeJson(res) : null;
}

export const api = {
  // Projects
  getProjects: async (): Promise<Project[]> => {
    try {
      const res = await fetch(`${BASE_URL}/projects`, { credentials: 'include' });
      if (!res.ok) throw new Error('Failed to fetch projects');
      return await safeJson(res);
    } catch (err) {
      console.warn('[API] Using local projects fallback:', err);
      return initialProjects;
    }
  },

  createProject: async (projectData: Partial<Project>): Promise<Project> => {
    const res = await fetch(`${BASE_URL}/projects`, {
      method: 'POST', credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(projectData),
    });
    if (!res.ok) throw new Error('Failed to create project');
    return await safeJson(res);
  },

  updateProject: async (id: string, projectData: Partial<Project>): Promise<Project> => {
    const res = await fetch(`${BASE_URL}/projects/${id}`, {
      method: 'PUT', credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(projectData),
    });
    if (!res.ok) throw new Error('Failed to update project');
    return await safeJson(res);
  },

  deleteProject: async (id: string): Promise<boolean> => {
    const res = await fetch(`${BASE_URL}/projects/${id}`, {
      method: 'DELETE', credentials: 'include',
    });
    if (!res.ok) throw new Error('Failed to delete project');
    return true;
  },

  trackProjectView: async (id: string): Promise<number> => {
    try {
      const res = await fetch(`${BASE_URL}/projects/${id}/view`, { method: 'POST' });
      if (res.ok) {
        const data = await safeJson(res);
        return data.views || 0;
      }
    } catch {
      // Non-blocking view tracking
    }
    return 0;
  },

  // Experiences (Education, Work, Volunteer, Innovation)
  getExperiences: async (): Promise<ExperienceItem[]> => {
    try {
      const res = await fetch(`${BASE_URL}/experiences`);
      if (!res.ok) throw new Error('Failed to fetch experiences');
      return await safeJson(res);
    } catch (err) {
      console.warn('[API] Using local experiences fallback:', err);
      const edu: ExperienceItem[] = educationData.map((e) => ({
        type: 'EDUCATION',
        title: e.degree,
        organization: e.school,
        period: e.period,
      }));
      const lead: ExperienceItem[] = leadershipData.map((l) => ({
        type: 'VOLUNTEER',
        title: l.title,
        organization: l.organization,
        period: l.period,
        description: l.description,
      }));
      return [...edu, ...lead];
    }
  },

  createExperience: async (data: Partial<ExperienceItem>): Promise<ExperienceItem> => {
    const res = await fetch(`${BASE_URL}/experiences`, {
      method: 'POST', credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create experience');
    return await safeJson(res);
  },

  updateExperience: async (id: string, data: Partial<ExperienceItem>): Promise<ExperienceItem> => {
    const res = await fetch(`${BASE_URL}/experiences/${id}`, {
      method: 'PUT', credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update experience');
    return await safeJson(res);
  },

  deleteExperience: async (id: string): Promise<boolean> => {
    const res = await fetch(`${BASE_URL}/experiences/${id}`, {
      method: 'DELETE', credentials: 'include',
    });
    if (!res.ok) throw new Error('Failed to delete experience');
    return true;
  },

  // Achievements & Certificates
  getAchievements: async (): Promise<AchievementItem[]> => {
    try {
      const res = await fetch(`${BASE_URL}/achievements`);
      if (!res.ok) throw new Error('Failed to fetch achievements');
      return await safeJson(res);
    } catch (err) {
      console.warn('[API] Using local achievements fallback:', err);
      const certs: AchievementItem[] = certificatesData.map((c) => ({
        type: 'CERTIFICATE',
        title: c.name,
        issuer: c.provider,
        date: c.year,
        credentialId: c.credentialId,
        link: c.link,
        fileUrl: c.file,
      }));
      const schol: AchievementItem[] = scholarshipsData.map((s) => ({
        type: 'ACADEMIC_HONOR',
        title: s.name,
        issuer: s.provider,
        date: '2024',
      }));
      return [...certs, ...schol];
    }
  },

  createAchievement: async (data: Partial<AchievementItem>): Promise<AchievementItem> => {
    const res = await fetch(`${BASE_URL}/achievements`, {
      method: 'POST', credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create achievement');
    return await safeJson(res);
  },

  updateAchievement: async (id: string, data: Partial<AchievementItem>): Promise<AchievementItem> => {
    const res = await fetch(`${BASE_URL}/achievements/${id}`, {
      method: 'PUT', credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update achievement');
    return await safeJson(res);
  },

  deleteAchievement: async (id: string): Promise<boolean> => {
    const res = await fetch(`${BASE_URL}/achievements/${id}`, {
      method: 'DELETE', credentials: 'include',
    });
    if (!res.ok) throw new Error('Failed to delete achievement');
    return true;
  },

  // Tech Categories & Skills
  getTechCategories: async (): Promise<SkillCategory[]> => {
    try {
      const res = await fetch(`${BASE_URL}/tech-categories`, { credentials: 'include' });
      if (!res.ok) throw new Error('Failed to fetch tech categories');
      return await safeJson(res);
    } catch (err) {
      console.warn('[API] Using local tech categories fallback:', err);
      return skillsData;
    }
  },

  createTechCategory: async (data: Partial<SkillCategory>): Promise<SkillCategory> => {
    const res = await fetch(`${BASE_URL}/tech-categories`, {
      method: 'POST', credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create tech category');
    return await safeJson(res);
  },

  updateTechCategory: async (id: string, data: Partial<SkillCategory>): Promise<SkillCategory> => {
    const res = await fetch(`${BASE_URL}/tech-categories/${id}`, {
      method: 'PUT', credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update tech category');
    return await safeJson(res);
  },

  deleteTechCategory: async (id: string): Promise<boolean> => {
    const res = await fetch(`${BASE_URL}/tech-categories/${id}`, {
      method: 'DELETE', credentials: 'include',
    });
    if (!res.ok) throw new Error('Failed to delete tech category');
    return true;
  },

  // Languages
  getLanguages: async (): Promise<LanguageItem[]> => {
    try {
      const res = await fetch(`${BASE_URL}/languages`, { credentials: 'include' });
      if (!res.ok) throw new Error('Failed to fetch languages');
      return await safeJson(res);
    } catch (err) {
      console.warn('[API] Using local languages fallback:', err);
      return languagesData;
    }
  },

  createLanguage: async (data: Partial<LanguageItem>): Promise<LanguageItem> => {
    const res = await fetch(`${BASE_URL}/languages`, {
      method: 'POST', credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create language');
    return await safeJson(res);
  },

  updateLanguage: async (id: string, data: Partial<LanguageItem>): Promise<LanguageItem> => {
    const res = await fetch(`${BASE_URL}/languages/${id}`, {
      method: 'PUT', credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update language');
    return await safeJson(res);
  },

  deleteLanguage: async (id: string): Promise<boolean> => {
    const res = await fetch(`${BASE_URL}/languages/${id}`, {
      method: 'DELETE', credentials: 'include',
    });
    if (!res.ok) throw new Error('Failed to delete language');
    return true;
  },

  // Messages / Inquiries
  getMessages: async (): Promise<Message[]> => {
    try {
      const res = await fetch(`${BASE_URL}/messages`, { credentials: 'include' });
      if (!res.ok) throw new Error('Failed to fetch messages');
      return await safeJson(res);
    } catch (err) {
      console.warn('[API] Using local messages fallback:', err);
      return initialMessages;
    }
  },

  sendMessage: async (messageData: {
    name: string;
    email: string;
    subject: string;
    telegram?: string;
    message: string;
    honeypot?: string;
  }): Promise<{ success: boolean; message: string; messageId?: string }> => {
    const res = await fetch(`${BASE_URL}/messages`, {
      method: 'POST', credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(messageData),
    });
    const data = await safeJson(res);
    if (!res.ok) {
      throw new Error(data.error || 'Failed to dispatch inquiry');
    }
    return data;
  },

  markMessageAsRead: async (id: string): Promise<Message> => {
    const res = await fetch(`${BASE_URL}/messages/${id}/read`, {
      method: 'PUT', credentials: 'include',
    });
    if (!res.ok) throw new Error('Failed to update message status');
    return await safeJson(res);
  },

  deleteMessage: async (id: string): Promise<boolean> => {
    const res = await fetch(`${BASE_URL}/messages/${id}`, {
      method: 'DELETE', credentials: 'include',
    });
    if (!res.ok) throw new Error('Failed to delete message');
    return true;
  },

  // Settings
  getSettings: async (): Promise<PersonalInfo> => {
    try {
      const res = await fetch(`${BASE_URL}/settings`, { credentials: 'include' });
      if (!res.ok) throw new Error('Failed to fetch settings');
      return await safeJson(res);
    } catch (err) {
      console.warn('[API] Using local settings fallback:', err);
      return initialProfileSettings;
    }
  },

  updateSettings: async (settings: Partial<PersonalInfo>): Promise<PersonalInfo> => {
    const res = await fetch(`${BASE_URL}/settings`, {
      method: 'PUT', credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings),
    });
    if (!res.ok) throw new Error('Failed to update profile settings');
    return await safeJson(res);
  },

  uploadResume: async (fileData: string, filename?: string): Promise<{ success: boolean; resumePdf: string; size?: number; filename?: string }> => {
    const res = await fetch(`${BASE_URL}/upload-resume`, {
      method: 'POST', credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ file: fileData, filename }),
    });
    if (!res.ok) throw new Error('Failed to upload resume file');
    return await safeJson(res);
  },

  // Stats & System Health
  getStats: async (): Promise<AdminStats> => {
    try {
      const res = await fetch(`${BASE_URL}/stats`, { credentials: 'include' });
      if (!res.ok) throw new Error('Failed to fetch stats');
      return await safeJson(res);
    } catch (err) {
      return {
        totalProjects: initialProjects.length,
        totalMessages: initialMessages.length,
        unreadMessages: initialMessages.filter((m) => !m.isRead).length,
        totalViews: 1250,
        telegramStatus: 'connected',
        resendStatus: 'connected',
        lastSubmission: initialMessages[0]?.createdAt || null,
      };
    }
  },

  // Admin Auth
  logoutAdmin: async (): Promise<{ success: boolean }> => {
    const res = await fetch(`${BASE_URL}/auth/logout`, { method: 'POST', credentials: 'include' });
    return await safeJson(res);
  },

  loginAdmin: async (email: string, pin: string): Promise<{ success: boolean; token?: string; message?: string }> => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST', credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, pin }),
    });
    const data = await safeJson(res);
    if (!res.ok) {
      throw new Error(data.message || 'Authentication rejected');
    }
    return data;
  },

  // Test Notifications
  testNotifications: async (): Promise<{ telegram: any; resend: any; timestamp: string }> => {
    const res = await fetch(`${BASE_URL}/notifications/test`, {
      method: 'POST', credentials: 'include',
    });
    if (!res.ok) throw new Error('Test notification failed');
    return await safeJson(res);
  },
};
