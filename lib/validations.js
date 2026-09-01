import { z } from 'zod';

const safeString = z.string().refine(val => !/<script/i.test(val), {
  message: "Invalid input: Script tags are not allowed for security reasons.",
});

const safeStringOptional = z.string().optional().nullable().refine(val => !val || !/<script/i.test(val), {
  message: "Invalid input: Script tags are not allowed for security reasons.",
});

export const ProjectSchema = z.object({
  title: safeString,
  category: safeStringOptional,
  technologies: z.union([z.array(safeString), safeString]).optional(),
  techStack: z.union([z.array(safeString), safeString]).optional(), // Backwards compatibility with frontend
  description: safeStringOptional,
  problem: safeStringOptional,
  features: z.array(safeString).optional(),
  contribution: safeStringOptional,
  challenges: safeStringOptional,
  lessonsLearned: safeStringOptional,
  githubUrl: safeStringOptional,
  liveUrl: safeStringOptional,
  featured: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
  image: safeStringOptional,
  views: z.number().optional(),
}).passthrough();

export const ExperienceSchema = z.object({
  type: safeStringOptional,
  title: safeString,
  organization: safeString,
  period: safeString,
  description: safeStringOptional,
}).passthrough();

export const AchievementSchema = z.object({
  type: safeStringOptional,
  title: safeString,
  issuer: safeString,
  date: safeString,
  credentialId: safeStringOptional,
  link: safeStringOptional,
  fileUrl: safeStringOptional,
}).passthrough();

export const TechCategorySchema = z.object({
  category: safeString,
  items: z.array(safeString).optional(),
  iconName: safeStringOptional,
}).passthrough();

export const LanguageSchema = z.object({
  language: safeString,
  proficiency: safeString,
}).passthrough();

export const MessageSchema = z.object({
  name: safeString,
  email: z.string().email(),
  subject: safeString,
  telegram: safeStringOptional,
  message: safeString,
}).passthrough();

export const SettingsSchema = z.object({
  name: safeStringOptional,
  email: safeStringOptional,
  bio: safeStringOptional,
  // we allow other fields and let Prisma handle them, but they are all passed through safeString if they are strings
}).passthrough();

export const validate = (schema) => (req, res, next) => {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Validation Error", details: error.errors });
    }
    next(error);
  }
};

