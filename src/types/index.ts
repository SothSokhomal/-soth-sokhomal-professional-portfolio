export interface SkillCategory {
  id?: string;
  category: string;
  items: string[];
  iconName: string;
}

export interface ProjectData {
  id?: string;
  title: string;
  category: string;
  technologies: string[];
  description: string;
  problem: string;
  features: string[];
  contribution: string;
  challenges: string;
  lessonsLearned: string;
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  image?: string;
  views?: number;
  createdAt?: string;
}

export type Project = ProjectData;

export type ExperienceType = 'WORK' | 'EDUCATION' | 'VOLUNTEER' | 'INNOVATION';

export interface ExperienceItem {
  id?: string;
  type: ExperienceType;
  title: string;
  organization: string;
  period: string;
  description?: string;
  createdAt?: string;
}

export type AchievementType = 'CERTIFICATE' | 'COMPETITION' | 'ACADEMIC_HONOR' | 'LEADERSHIP';

export interface AchievementItem {
  id?: string;
  type: AchievementType;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  link?: string;
  fileUrl?: string;
  createdAt?: string;
}

// Aliases for backward compatibility
export interface EducationItem {
  id?: string;
  school: string;
  degree: string;
  period: string;
}

export interface LeadershipItem {
  id?: string;
  title: string;
  organization: string;
  period: string;
  description: string;
}

export interface ScholarshipItem {
  id?: string;
  name: string;
  provider: string;
}

export interface CertificateItem {
  id?: string;
  name: string;
  provider: string;
  year: string;
  credentialId?: string;
  link?: string;
  file?: string;
  fileUrl?: string;
}

export interface LanguageItem {
  id?: string;
  language: string;
  proficiency: string;
}

export interface PersonalInfo {
  id?: string;
  name: string;
  shortName: string;
  title: string;
  subtitle: string;
  location: string;
  phone: string;
  email: string;
  github: string;
  portfolio: string;
  linkedin: string;
  instagram: string;
  facebook: string;
  avatar: string;
  profileImageUrl?: string;
  logoUrl?: string;
  resumePdf: string;
  resumeUrl?: string;
  showEarthIcon?: boolean;
  status?: string;
  bio: string;
  resendApiKey?: string;
  telegramBotToken?: string;
  telegramChatId?: string;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  telegram?: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  ip?: string;
}

export interface AdminStats {
  totalProjects: number;
  totalMessages: number;
  unreadMessages: number;
  totalViews: number;
  telegramStatus: 'connected' | 'unconfigured' | 'error';
  resendStatus: 'connected' | 'unconfigured' | 'error';
  lastSubmission: string | null;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
  duration?: number;
}
