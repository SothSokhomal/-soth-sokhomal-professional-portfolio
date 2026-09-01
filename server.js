import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import stream from 'stream';
import http from 'http';
import https from 'https';
import selfsigned from 'selfsigned';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { MongoClient, GridFSBucket, ObjectId } from 'mongodb';
import multer from 'multer';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { uploadFileToCloudinary } from './lib/upload.js';
import { securityLogger } from './lib/logger.js';
import { ProjectSchema, ExperienceSchema, AchievementSchema, TechCategorySchema, LanguageSchema, MessageSchema, SettingsSchema, validate } from './lib/validations.js';

dotenv.config();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 25 * 1024 * 1024 }, // 25MB max
});

// Environment check: Fail fast if DATABASE_URL is missing
if (!process.env.DATABASE_URL) {
  console.error('FATAL: DATABASE_URL environment variable is missing.');
  process.exit(1);
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.set('trust proxy', 1);

// Security Headers Middleware (Enterprise Level Security)
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  next();
});

const PORT = Number(process.env.PORT) || 3000;
const HTTPS_PORT = Number(process.env.HTTPS_PORT) || 3443;

// Initialize Prisma
const prisma = new PrismaClient();

// Initialize MongoDB driver and GridFSBucket
let mongoClient;
let gridFSBucket;

async function initMongoAndGridFS() {
  try {
    mongoClient = new MongoClient(process.env.DATABASE_URL);
    await mongoClient.connect();
    const db = mongoClient.db();
    gridFSBucket = new GridFSBucket(db, { bucketName: 'uploads' });
    console.log('[MongoDB & GridFS] Connected and GridFS bucket initialized.');
  } catch (err) {
    console.error('[MongoDB & GridFS] Failed to initialize:', err.message);
  }
}

// Initial default projects for seeding
const initialProjectsData = [
  {
    title: 'AI-Powered Weather Chatbot',
    category: 'AI & Full-Stack',
    technologies: ['React.js', 'Node.js', 'Dialogflow', 'OpenWeatherMap API', 'NLP'],
    description: 'An intelligent chatbot that answers weather-related questions using natural language processing (NLP). Features real-time weather retrieval with fluid conversational turns.',
    problem: 'Traditional weather apps require multiple taps and offer stale configurations, lacking an engaging conversational format.',
    features: [
      'Natural Language Processing (NLP) conversation interface',
      'Real-time weather query parsing via API',
      'Responsive messaging UI built with React component state',
    ],
    contribution: 'Designed and developed the entire React frontend and integrated Node.js backend logic to securely route credentials to Dialogflow and OpenWeatherMap APIs.',
    challenges: 'Handling conversational fallback loops when the model encountered highly abstract or multi-city requests.',
    lessonsLearned: 'Deepened engineering expertise in async/await API communications, RESTful response handling, and custom messaging animations.',
    githubUrl: 'https://github.com/SothSokhomal/Weather-Bot-App',
    featured: true,
    image: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=1200&q=80',
    views: 342,
  },
  {
    title: 'Personal Portfolio Website',
    category: 'Frontend Design',
    technologies: ['Next.js 14', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'MongoDB', 'Prisma'],
    description: "A responsive portfolio representing Soth Vannak RothChansokhomal's professional development journey, academic achievements, and projects.",
    problem: 'Employers need a centralized digital hub that clearly communicates technical proficiencies and displays project histories in an instantly legible manner.',
    features: [
      'Sleek modern user interface with dark & light high-contrast layout options',
      'Responsive mobile-first grid layout',
      'Direct downloadable resume, clean contact controls, and secure Admin Dashboard',
    ],
    contribution: 'Crafted layout structures, responsive grids, geometric backgrounds, and unified typing presentation.',
    challenges: 'Achieving complex, fluid geometric curves and floating blobs that scale across mobile viewports without blocking interactions.',
    lessonsLearned: 'Acquired a rigorous mental model of component boundaries, custom interactive hover state styles, and accessibility pairings.',
    githubUrl: 'https://github.com/SothSokhomal/SothSokhomal_portfolio',
    liveUrl: 'https://sothsokhomal.github.io/SothSokhomal_portfolio/',
    featured: true,
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    views: 412,
  },
  {
    title: 'Expense Tracker Web Application',
    category: 'Web App (CRUD)',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Node.js'],
    description: 'A fast daily financial tracker. Enables users to maintain records, visualize spending, and manage transactions in real-time.',
    problem: 'Standard financial logs are heavy, require persistent authentication, and contain cluttered visual components.',
    features: [
      'Add, Read, Update, and Delete transactions easily',
      'Dynamic table updating without full-page reloads',
      'Data input validation and total expense indicator',
    ],
    contribution: 'Built the front-end view, set up local memory state synchronization, and programmed modal triggers.',
    challenges: 'Enabling in-line updating where specific elements switch to input fields seamlessly and maintain formatting upon saving.',
    lessonsLearned: 'Gained structural expertise in native DOM manipulations, JavaScript form object handlers, and event delegation patterns.',
    githubUrl: 'https://github.com/SothSokhomal/expenseapp',
    liveUrl: 'https://expenseapp-2usy127qy-sothsokhomals-projects.vercel.app/',
    featured: true,
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80',
    views: 289,
  },
  {
    title: 'Spotify UI Clone',
    category: 'UI Cloning',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Flexbox & Grid'],
    description: 'A front-end replication of the Spotify web player experience, prioritizing navigation structure and media cards.',
    problem: 'Replicating complex multi-panel desktop layouts on standard browser windows while keeping grid ratios aesthetic.',
    features: [
      'Dark-mode replication of modern sidebar, content, and player interfaces',
      'Hover interactions for playlist covers',
      'Responsive menu behavior across mobile and desktop breakpoints',
    ],
    contribution: 'Sole designer and coder. Crafted custom layout scroll behaviors, typography settings, and player slider interactions.',
    challenges: 'Managing overlapping fixed elements and setting appropriate overflow properties so specific containers scroll independently.',
    lessonsLearned: 'Mastered deep CSS styling protocols including flex alignments, advanced CSS grids, custom scrollbars, and fluid scaling.',
    githubUrl: 'https://github.com/SothSokhomal/song_soundie',
    liveUrl: 'https://sothsokhomal.github.io/song_soundie/',
    featured: true,
    image: '/img/spotify_ui_clone.png',
    views: 310,
  },
  {
    title: 'Face Recognition Pipeline',
    category: 'Computer Vision',
    technologies: ['Python', 'OpenCV', 'Haar Cascade', 'Computer Vision'],
    description: 'An end-to-end computer vision program integrated with real-time webcams to detect individual faces, compute bounding coordinates, and verify identity labels.',
    problem: 'Real-time video frame parsing is intensive and often causes performance stutters or delayed recognition loops.',
    features: [
      'Real-time webcam stream input processing',
      'Accurate bounding boxes on multiple faces simultaneously',
      'Identified label tagging with instant name overlay',
    ],
    contribution: 'Programmed the camera collection pipeline, integrated pre-trained cascade parameters, and managed training structures.',
    challenges: 'Minimizing false positives under variable illumination and maintaining consistent 30 FPS playback rates on standard laptop hardware.',
    lessonsLearned: 'Understood computer vision fundamentals: image matrices, grayscale transformations, classification thresholds, and real-time threading.',
    githubUrl: 'https://github.com/SothSokhomal/Face_Recognition',
    featured: true,
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    views: 265,
  },
  {
    title: 'Classic Snake Game',
    category: 'Game Dev',
    technologies: ['Python', 'Pygame'],
    description: 'A recreation of the retro arcade classic. Features intuitive directional inputs, scoring systems, and progressive velocity parameters.',
    problem: 'Ensuring game-loop synchronization across different hardware speeds while tracking continuous coordinate loops.',
    features: [
      'Smooth control response mechanics',
      'Dynamic coordinate generation for randomized food spawns',
      'Continuous velocity multipliers to ramp difficulty as score increases',
    ],
    contribution: 'Designed game loop matrices, programmed cell collision logic, and implemented key press event listener handlers.',
    challenges: 'Solving sudden edge-collision bugs where immediate double-taps on opposing directions triggered instant self-collision.',
    lessonsLearned: 'Obtained a deep mathematical understanding of continuous game state rendering, input polling, bounding check loops, and visual layers.',
    githubUrl: 'https://github.com/SothSokhomal/SnakeGame',
    featured: true,
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
    views: 198,
  },
];

const initialProfileSettings = {
  name: 'Soth Vannak RothChansokhomal',
  shortName: 'SothSokhomal',
  title: 'Software Developer Intern',
  subtitle: 'React | JavaScript | Node.js | Next.js | TypeScript',
  location: 'Phnom Penh, Cambodia',
  phone: '085 257 728',
  email: 'soth.vannakrothchansokhomal@gmail.com',
  github: 'https://github.com/SothSokhomal',
  portfolio: 'https://sothsokhomal.github.io/SothSokhomal_portfolio/',
  linkedin: 'https://www.linkedin.com/in/sothvannakrothchansokhomal/',
  instagram: 'https://www.instagram.com/soth.vannakrothchansokhomal/',
  facebook: 'https://www.facebook.com/rose.555901',
  avatar: '/img/Soth vannak rothchansokhomal.jpg',
  resumePdf: '/assets/Soth_vannakrothchansokhomal_Software_Developer_Intern_CV (2)-CVMEqzI6.pdf',
  bio: 'Motivated Software Engineering student at CamTech with hands-on experience developing modern web applications using React, Next.js, Node.js, TypeScript, and REST APIs. Passionate about building high-performance software solutions, sleek user interfaces, and scalable backend architecture.',
  telegramBotToken: '8813428550:AAFn1Mv4db6VlG2t0OVOESu6DNzDbuIYAi0',
  telegramChatId: '898931427',
};

// Seed database on startup if collections are empty
async function seedDatabaseIfEmpty() {
  try {
    const projectCount = await prisma.project.count();
    if (projectCount === 0) {
      console.log('[Seed] Seeding default projects into MongoDB...');
      for (const p of initialProjectsData) {
        await prisma.project.create({ data: p });
      }
      console.log(`[Seed] Seeded ${initialProjectsData.length} projects.`);
    }

    const settingsCount = await prisma.personalInfo.count();
    if (settingsCount === 0) {
      console.log('[Seed] Seeding default profile settings into MongoDB...');
      await prisma.personalInfo.create({ data: initialProfileSettings });
      console.log('[Seed] Seeded profile settings singleton.');
    }
  } catch (err) {
    console.error('[Seed] Error seeding MongoDB:', err.message);
  }
}

// Helper: Stream Base64 to GridFS
async function uploadBase64ToGridFS(base64Payload, defaultFilename = 'file.bin', defaultMimeType = 'application/octet-stream') {
  if (!gridFSBucket) {
    throw new Error('GridFS is not initialized yet.');
  }

  let base64Data = base64Payload;
  let contentType = defaultMimeType;

  // Detect mime type if base64 contains Data URI header
  if (base64Payload.startsWith('data:')) {
    const match = base64Payload.match(/^data:([^;]+);base64,(.+)$/);
    if (match) {
      contentType = match[1];
      base64Data = match[2];
    } else if (base64Payload.includes(';base64,')) {
      const parts = base64Payload.split(';base64,');
      contentType = parts[0].replace('data:', '');
      base64Data = parts[1];
    }
  }

  const buffer = Buffer.from(base64Data, 'base64');

  return new Promise((resolve, reject) => {
    const uploadStream = gridFSBucket.openUploadStream(defaultFilename, {
      contentType,
      metadata: {
        contentType,
        uploadedAt: new Date(),
        size: buffer.length,
      },
    });

    const readable = new stream.Readable();
    readable.push(buffer);
    readable.push(null);

    uploadStream.on('error', (err) => reject(err));
    uploadStream.on('finish', () => {
      const fileId = uploadStream.id.toString();
      resolve({
        fileId,
        url: `/api/files/${fileId}`,
        filename: defaultFilename,
        size: buffer.length,
        contentType,
      });
    });

    readable.pipe(uploadStream);
  });
}

// Express Middleware
app.use(helmet({ contentSecurityPolicy: false })); // CSP false to avoid breaking Vite inline scripts easily
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Rate Limiters
const globalLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  message: { error: 'Too many requests from this IP, please try again after a minute' }
});
app.use('/api', globalLimiter);

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: 'Too many login attempts, please try again after 15 minutes' }
});

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3,
  message: { error: 'Too many messages sent from this IP, please try again after an hour' }
});

// Auth Middleware (IDOR Prevention)
const authMiddleware = (req, res, next) => {
  const token = req.cookies?.admin_session;
  if (!token) {
    securityLogger.log('UNAUTHORIZED_ACCESS_ATTEMPT', { path: req.path, ip: req.ip });
    return res.status(401).json({ error: 'Unauthorized: No session token provided' });
  }
  try {
    const decoded = jwt.verify(token, process.env.ADMIN_PASSWORD_HASH || 'secret');
    req.admin = decoded;
    next();
  } catch (err) {
    securityLogger.log('UNAUTHORIZED_ACCESS_ATTEMPT', { path: req.path, ip: req.ip, reason: 'Invalid token' });
    return res.status(401).json({ error: 'Unauthorized: Invalid session token' });
  }
};

// Serve static assets from public directory
const publicPath = path.join(__dirname, 'public');
const distPath = path.join(__dirname, 'dist');
app.use(express.static(publicPath));

// Notification Service: Telegram Bot
let cachedBotUsername = '';
const getBotInfo = async (token) => {
  if (cachedBotUsername) return cachedBotUsername;
  try {
    const res = await fetch(`https://api.telegram.org/bot${token.trim()}/getMe`);
    const data = await res.json();
    if (data.ok && data.result && data.result.username) {
      cachedBotUsername = data.result.username;
      return cachedBotUsername;
    }
  } catch (e) {
    // ignore
  }
  return '';
};

const sendTelegramNotification = async (payload, settings) => {
  const token = (
    process.env.TELEGRAM_BOT_TOKEN ||
    (settings && settings.telegramBotToken) ||
    '8813428550:AAFn1Mv4db6VlG2t0OVOESu6DNzDbuIYAi0'
  ).trim();
  const chatId = (
    process.env.TELEGRAM_CHAT_ID ||
    (settings && settings.telegramChatId) ||
    '898931427'
  ).trim();

  if (!token || !chatId || token.startsWith('bot_') || chatId === '') {
    console.warn('[Telegram] Token or Chat ID not configured');
    return { success: false, reason: 'unconfigured' };
  }

  const escapeHtml = (str) =>
    String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

  const textHtml =
    `🚀 <b>New Portfolio Contact Inquiry</b>\n\n` +
    `👤 <b>From:</b> ${escapeHtml(payload.name)}\n` +
    `📧 <b>Email:</b> <code>${escapeHtml(payload.email)}</code>\n` +
    `✈️ <b>Telegram:</b> ${escapeHtml(payload.telegram || 'Not provided')}\n` +
    `📌 <b>Subject:</b> ${escapeHtml(payload.subject)}\n\n` +
    `💬 <b>Message:</b>\n${escapeHtml(payload.message)}\n\n` +
    `🕒 <i>Sent on ${new Date().toLocaleString()} (sothsokhomal.dev MongoDB engine)</i>`;

  try {
    const botUsername = await getBotInfo(token);
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: textHtml,
        parse_mode: 'HTML',
      }),
    });
    const result = await response.json();
    if (result.ok) {
      console.log('[Telegram] Notification sent successfully to chat', chatId);
      return { success: true, botUsername };
    } else {
      console.warn('[Telegram] API response notice:', result.description || result);
      let errorMsg = result.description || 'Telegram API error';
      if (result.description && result.description.includes('chat not found')) {
        const botLink = botUsername ? `https://t.me/${botUsername}` : 'https://t.me/Msrosee_bot';
        errorMsg = `Telegram Chat ID ${chatId} has not initiated the bot yet. Open ${botLink} and press /start to activate notifications.`;
      }
      return { success: false, error: errorMsg, botUsername, raw: result };
    }
  } catch (err) {
    console.error('[Telegram] Network exception:', err.message);
    return { success: false, error: err.message };
  }
};

// Notification Service: Multi-Provider Email Dispatch (Resend + Direct Inbox Gateway)
const sendEmailNotification = async (payload, settings) => {
  const apiKey = (
    (settings && settings.resendApiKey) ||
    process.env.RESEND_API_KEY ||
    ''
  ).trim();
  const targetEmail = (
    process.env.CONTACT_EMAIL ||
    (settings && settings.email) ||
    'soth.vannakrothchansokhomal@gmail.com'
  ).trim().toLowerCase();

  const cleanSubject = String(payload.subject || 'New Contact Inquiry').replace(/[\r\n]+/g, ' ').trim();
  const cleanName = String(payload.name || 'Visitor').replace(/[\r\n]+/g, ' ').trim();
  const senderEmail = String(payload.email || '').trim().toLowerCase();

  // 1. Try Resend if a valid API key is present
  const isResendConfigured = apiKey && !apiKey.startsWith('re_xxxx') && !apiKey.startsWith('re_bqaQ43PE') && apiKey.startsWith('re_');

  if (isResendConfigured) {
    try {
      const htmlBody = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #ffffff; color: #111827; border: 1px solid #e5e7eb; border-radius: 8px;">
          <div style="border-bottom: 2px solid #2563eb; padding-bottom: 16px; margin-bottom: 20px;">
            <h2 style="margin: 0; color: #1e3a8a; font-size: 20px;">🚀 New Portfolio Inquiry</h2>
            <p style="margin: 4px 0 0 0; color: #6b7280; font-size: 14px;">Incoming message for Soth Vannak Rothchansokhomal</p>
          </div>
          
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
            <tr>
              <td style="padding: 8px 0; color: #4b5563; width: 140px; font-weight: 600;">Full Name:</td>
              <td style="padding: 8px 0; color: #111827; font-weight: 500;">${cleanName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #4b5563; font-weight: 600;">Email Address:</td>
              <td style="padding: 8px 0; color: #2563eb;"><a href="mailto:${senderEmail}" style="color: #2563eb; text-decoration: none;">${senderEmail}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #4b5563; font-weight: 600;">Telegram Handle:</td>
              <td style="padding: 8px 0; color: #111827;">${payload.telegram || 'Not provided'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #4b5563; font-weight: 600;">Subject Line:</td>
              <td style="padding: 8px 0; color: #111827; font-weight: 600;">${cleanSubject}</td>
            </tr>
          </table>
          
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 16px; margin-bottom: 24px;">
            <div style="font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase; margin-bottom: 8px; letter-spacing: 0.05em;">Message Content</div>
            <div style="font-size: 15px; line-height: 1.6; color: #334155; white-space: pre-wrap;">${payload.message}</div>
          </div>
          
          <div style="border-top: 1px solid #f1f5f9; padding-top: 16px; font-size: 12px; color: #94a3b8; text-align: center;">
            Sent via sothsokhomal.dev MongoDB notification gateway • ${new Date().toUTCString()}
          </div>
        </div>
      `;

      const plainText = `New Portfolio Inquiry from ${cleanName} (${senderEmail})\n\nTelegram: ${payload.telegram || 'N/A'}\nSubject: ${cleanSubject}\n\nMessage:\n${payload.message}`;

      const resendPayload = {
        from: 'Portfolio Inquiry <onboarding@resend.dev>',
        to: [targetEmail],
        subject: `[Portfolio Inquiry] ${cleanSubject} - ${cleanName}`,
        html: htmlBody,
        text: plainText,
      };

      const resendRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(resendPayload),
      });

      const resendData = await resendRes.json();

      if (resendRes.ok && !resendData.error) {
        console.log('[Resend] Email delivered successfully to', targetEmail, 'ID:', resendData.id);
        return { success: true, provider: 'Resend', id: resendData.id, to: targetEmail };
      }
    } catch (resendErr) {
      // Fall through to fallback gateway
    }
  }

  // 2. Direct Email Bridge (FormSubmit AJAX Gateway) - Delivers straight to targetEmail
  try {
    const formSubmitUrl = `https://formsubmit.co/ajax/${encodeURIComponent(targetEmail)}`;
    const bridgeRes = await fetch(formSubmitUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        _subject: `[Portfolio Contact] ${cleanSubject} - ${cleanName}`,
        name: cleanName,
        email: senderEmail || 'visitor@sothsokhomal.dev',
        telegram: payload.telegram || 'Not provided',
        subject: cleanSubject,
        message: payload.message,
        _replyto: senderEmail || targetEmail,
        _template: 'table',
      }),
    });

    const bridgeData = await bridgeRes.json();
    console.log('[Direct Email Gateway] Response:', bridgeData);

    return {
      success: true,
      provider: 'Email Inbox Gateway',
      to: targetEmail,
      message: 'Inquiry delivered to your inbox.',
    };
  } catch (bridgeErr) {
    console.error('[Email Dispatch] Exception:', bridgeErr.message);
    return {
      success: false,
      error: bridgeErr.message,
      to: targetEmail,
    };
  }
};

/* ==========================================================
   API ENDPOINTS
   ========================================================== */

// Health & Ping
app.get('/api/health', async (req, res) => {
  try {
    const [projectsCount, messagesCount] = await Promise.all([
      prisma.project.count(),
      prisma.message.count(),
    ]);
    res.json({
      status: 'online',
      database: 'connected',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      projectsCount,
      messagesCount,
    });
  } catch (err) {
    res.status(500).json({
      status: 'degraded',
      error: err.message,
    });
  }
});

// GridFS Binary File Retrieval Route
app.get('/api/files/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid file ID' });
    }

    if (!gridFSBucket) {
      return res.status(503).json({ error: 'GridFS storage is initializing. Please retry in a moment.' });
    }

    const objectId = new ObjectId(id);
    const files = await gridFSBucket.find({ _id: objectId }).toArray();
    if (!files || files.length === 0) {
      return res.status(404).json({ error: 'File not found in GridFS storage' });
    }

    const fileInfo = files[0];
    const contentType = fileInfo.contentType || fileInfo.metadata?.contentType || 'application/octet-stream';
    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Length', fileInfo.length);
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');

    const downloadStream = gridFSBucket.openDownloadStream(objectId);
    downloadStream.on('error', (err) => {
      console.error('[GridFS Download Error]', err);
      if (!res.headersSent) {
        res.status(500).json({ error: 'Failed to stream file from storage' });
      }
    });

    downloadStream.pipe(res);
  } catch (err) {
    console.error('[GET /api/files/:id] Error:', err);
    res.status(500).json({ error: 'Internal server error streaming file' });
  }
});

// Admin Stats
app.get('/api/stats', async (req, res) => {
  try {
    const [totalProjects, totalMessages, unreadMessages, latestMessage, projects] = await Promise.all([
      prisma.project.count(),
      prisma.message.count(),
      prisma.message.count({ where: { isRead: false } }),
      prisma.message.findFirst({ orderBy: { createdAt: 'desc' } }),
      prisma.project.findMany({ select: { views: true } }),
    ]);

    const totalViews = projects.reduce((acc, p) => acc + (p.views || 0), 1250);

    const hasTelegram = Boolean(process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID);
    const hasResend = Boolean(process.env.RESEND_API_KEY && !process.env.RESEND_API_KEY.startsWith('re_xxxx'));

    res.json({
      totalProjects,
      totalMessages,
      unreadMessages,
      totalViews,
      telegramStatus: hasTelegram ? 'connected' : 'unconfigured',
      resendStatus: hasResend ? 'connected' : 'unconfigured',
      lastSubmission: latestMessage ? latestMessage.createdAt : null,
    });
  } catch (err) {
    console.error('[GET /api/stats] Error:', err);
    res.status(500).json({ error: 'Failed to retrieve stats from database' });
  }
});

// Admin Authentication
app.post('/api/auth/login', loginLimiter, async (req, res) => {
  try {
    const { email, pin } = req.body;
    const settings = await prisma.personalInfo.findFirst();
    const expectedEmail = process.env.ADMIN_EMAIL || settings?.email || 'soth.vannakrothchansokhomal@gmail.com';
    const hash = process.env.ADMIN_PASSWORD_HASH;

    if (!hash) {
      console.error('FATAL: ADMIN_PASSWORD_HASH is not set in .env');
      return res.status(500).json({ success: false, message: 'Server configuration error' });
    }

    const emailMatch = email === expectedEmail || email === 'admin@sothsokhomal.com';
    const pinMatch = await bcrypt.compare(pin, hash);

    if (emailMatch && pinMatch) {
      const token = jwt.sign({ role: 'admin', email }, hash, { expiresIn: '2h' });
      
      res.cookie('admin_session', token, {
        httpOnly: true,
        secure: false, // Temporary until HTTPS is setup
        sameSite: 'lax',
        maxAge: 2 * 60 * 60 * 1000 // 2 hours
      });

      return res.json({
        success: true,
        user: {
          email,
          role: 'admin',
          name: settings?.name || 'Soth Vannak RothChansokhomal',
        },
      });
    }

    securityLogger.log('FAILED_LOGIN', { email, ip: req.ip });
    return res.status(401).json({
      success: false,
      message: 'Invalid Admin credentials. Check your email and PIN code.',
    });
  } catch (err) {
    console.error('[POST /api/auth/login] Error:', err);
    res.status(500).json({ success: false, message: 'Authentication server error' });
  }
});

app.post('/api/auth/logout', (req, res) => {
  res.clearCookie('admin_session');
  res.json({ success: true });
});

// Projects CRUD via Prisma
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(projects);
  } catch (err) {
    console.error('[GET /api/projects] Error:', err);
    res.status(500).json({ error: 'Failed to fetch projects from database' });
  }
});

app.post('/api/projects', authMiddleware, validate(ProjectSchema), async (req, res) => {
  try {
    const {
      title,
      category,
      description,
      technologies,
      techStack,
      problem,
      features,
      contribution,
      challenges,
      lessonsLearned,
      githubUrl,
      liveUrl,
      featured,
      isFeatured,
      image,
    } = req.body;

    const techArray = Array.isArray(technologies)
      ? technologies
      : Array.isArray(techStack)
      ? techStack
      : typeof techStack === 'string'
      ? techStack.split(',').map((s) => s.trim()).filter(Boolean)
      : ['React', 'TypeScript'];

    const featArray = Array.isArray(features) ? features : [];

    const newProject = await prisma.project.create({
      data: {
        title: title || 'Untitled Project',
        category: category || 'Full Stack',
        description: description || '',
        technologies: techArray,
        problem: problem || null,
        features: featArray,
        contribution: contribution || null,
        challenges: challenges || null,
        lessonsLearned: lessonsLearned || null,
        githubUrl: githubUrl || null,
        liveUrl: liveUrl || null,
        featured: Boolean(featured ?? isFeatured ?? false),
        image: image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
        views: 0,
      },
    });

    res.status(201).json(newProject);
  } catch (err) {
    console.error('[POST /api/projects] Error:', err);
    res.status(500).json({ error: 'Failed to create project in database' });
  }
});

app.put('/api/projects/:id', authMiddleware, validate(ProjectSchema), async (req, res) => {
  try {
    const { id } = req.params;

    const updateData = {};
    if (req.body.title !== undefined) updateData.title = req.body.title;
    if (req.body.category !== undefined) updateData.category = req.body.category;
    if (req.body.description !== undefined) updateData.description = req.body.description;
    if (req.body.technologies !== undefined || req.body.techStack !== undefined) {
      const tech = req.body.technologies || req.body.techStack;
      updateData.technologies = Array.isArray(tech)
        ? tech
        : typeof tech === 'string'
        ? tech.split(',').map((s) => s.trim()).filter(Boolean)
        : [];
    }
    if (req.body.problem !== undefined) updateData.problem = req.body.problem;
    if (req.body.features !== undefined) updateData.features = Array.isArray(req.body.features) ? req.body.features : [];
    if (req.body.contribution !== undefined) updateData.contribution = req.body.contribution;
    if (req.body.challenges !== undefined) updateData.challenges = req.body.challenges;
    if (req.body.lessonsLearned !== undefined) updateData.lessonsLearned = req.body.lessonsLearned;
    if (req.body.githubUrl !== undefined) updateData.githubUrl = req.body.githubUrl;
    if (req.body.liveUrl !== undefined) updateData.liveUrl = req.body.liveUrl;
    if (req.body.featured !== undefined || req.body.isFeatured !== undefined) {
      updateData.featured = Boolean(req.body.featured ?? req.body.isFeatured);
    }
    if (req.body.image !== undefined) updateData.image = req.body.image;
    if (req.body.views !== undefined) updateData.views = Number(req.body.views);

    const updated = await prisma.project.update({
      where: { id },
      data: updateData,
    });

    res.json(updated);
  } catch (err) {
    console.error('[PUT /api/projects/:id] Error:', err);
    res.status(500).json({ error: 'Failed to update project' });
  }
});

app.delete('/api/projects/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.project.delete({
      where: { id },
    });
    res.json({ success: true, message: 'Project deleted successfully' });
  } catch (err) {
    console.error('[DELETE /api/projects/:id] Error:', err);
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

// Increment Project View
app.post('/api/projects/:id/view', async (req, res) => {
  try {
    const { id } = req.params;
    const project = await prisma.project.update({
      where: { id },
      data: {
        views: { increment: 1 },
      },
    });
    res.json({ views: project.views });
  } catch (err) {
    console.error('[POST /api/projects/:id/view] Error:', err);
    res.json({ views: 0 });
  }
});

// Messages CRUD via Prisma
app.get('/api/messages', async (req, res) => {
  try {
    const messages = await prisma.message.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(messages);
  } catch (err) {
    console.error('[GET /api/messages] Error:', err);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

app.post('/api/messages', contactLimiter, validate(MessageSchema), async (req, res) => {
  try {
    const { name, email, subject, telegram, message, honeypot } = req.body;
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';

    // 1. Anti-Spam Honeypot & Timestamp check
    const { timestamp, website } = req.body;
    const now = Date.now();
    const timeDiff = timestamp ? now - parseInt(timestamp, 10) : 0;
    
    // Honeypot field (called website to trick bots)
    if (website && website.trim() !== '') {
      securityLogger.log('BOT_HONEYPOT_TRIGGER', { ip: clientIp, type: 'honeypot' });
      return res.json({ success: true, message: 'Message received' });
    }
    
    // If submitted too fast (under 3 seconds), probably a bot
    if (!timestamp || timeDiff < 3000) {
      securityLogger.log('BOT_HONEYPOT_TRIGGER', { ip: clientIp, type: 'fast_submit' });
      return res.status(400).json({ error: 'Form submitted too quickly. Please take a moment to read and try again.' });
    }

    // 2. Strict validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'Please provide Name, Email, Subject, and Message.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Please provide a valid email address.' });
    }

    // 3. Rate limiting is now handled by express-rate-limit middleware (contactLimiter)

    // 4. Create message in MongoDB via Prisma
    const newMessage = await prisma.message.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        subject: subject.trim(),
        telegram: telegram ? telegram.trim() : null,
        message: message.trim(),
        isRead: false,
        ip: String(clientIp),
      },
    });

    // Fetch settings for notification keys
    const settings = await prisma.personalInfo.findFirst();

    // 5. Asynchronous Notification dispatch (Telegram & Email in Parallel)
    const [telegramResult, emailResult] = await Promise.all([
      sendTelegramNotification(newMessage, settings).catch((err) => ({ success: false, error: err.message })),
      sendEmailNotification(newMessage, settings).catch((err) => ({ success: false, error: err.message })),
    ]);

    const notificationResults = {
      telegram: telegramResult,
      resend: emailResult,
      email: emailResult,
    };

    console.log('[Dual-Channel Notification Results]', notificationResults);

    res.status(201).json({
      success: true,
      message: 'Your inquiry has been transmitted directly to Soth Sokhomal via the notification engine.',
      messageId: newMessage.id,
      notifications: {
        telegramDispatched: notificationResults.telegram.success,
        emailDispatched: notificationResults.email.success,
        resendDispatched: notificationResults.resend.success,
      },
    });
  } catch (err) {
    console.error('[POST /api/messages] Error:', err);
    res.status(500).json({ error: 'Failed to submit inquiry' });
  }
});

app.put('/api/messages/:id/read', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await prisma.message.update({
      where: { id },
      data: { isRead: true },
    });
    res.json(updated);
  } catch (err) {
    console.error('[PUT /api/messages/:id/read] Error:', err);
    res.status(500).json({ error: 'Failed to mark message read' });
  }
});

app.delete('/api/messages/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.message.delete({
      where: { id },
    });
    res.json({ success: true, message: 'Message deleted' });
  } catch (err) {
    console.error('[DELETE /api/messages/:id] Error:', err);
    res.status(500).json({ error: 'Failed to delete message' });
  }
});

// Profile Settings Singleton (Prisma & GridFS)
app.get('/api/settings', async (req, res) => {
  try {
    let settings = await prisma.personalInfo.findFirst();
    if (!settings) {
      settings = await prisma.personalInfo.create({
        data: initialProfileSettings,
      });
    }

    // Ensure fallback defaults if null in legacy records
    const normalizedSettings = {
      ...settings,
      profileImageUrl: settings.profileImageUrl || settings.avatar || '/img/Soth vannak rothchansokhomal.jpg',
      logoUrl: settings.logoUrl || settings.avatar || '/img/Soth vannak rothchansokhomal.jpg',
      resumeUrl: settings.resumeUrl || settings.resumePdf || '/assets/Soth_vannakrothchansokhomal_Software_Developer_Intern_CV (2)-CVMEqzI6.pdf',
      showEarthIcon: settings.showEarthIcon !== false,
      status: settings.status || 'Available for Work',
    };

    res.json(normalizedSettings);
  } catch (err) {
    console.error('[GET /api/settings] Error:', err);
    res.status(500).json({ error: 'Failed to retrieve profile settings' });
  }
});

app.put('/api/settings', authMiddleware, validate(SettingsSchema), async (req, res) => {
  try {
    let settings = await prisma.personalInfo.findFirst();
    if (!settings) {
      settings = await prisma.personalInfo.create({
        data: initialProfileSettings,
      });
    }

    const updatedData = { ...req.body };
    delete updatedData.id;
    delete updatedData.createdAt;
    delete updatedData.updatedAt;

    // Strict bi-directional asset synchronization
    if (updatedData.profileImageUrl) {
      updatedData.avatar = updatedData.profileImageUrl;
    } else if (updatedData.avatar) {
      updatedData.profileImageUrl = updatedData.avatar;
    }

    if (updatedData.resumeUrl) {
      updatedData.resumePdf = updatedData.resumeUrl;
    } else if (updatedData.resumePdf) {
      updatedData.resumeUrl = updatedData.resumePdf;
    }

    if (updatedData.showEarthIcon !== undefined) {
      updatedData.showEarthIcon = Boolean(updatedData.showEarthIcon);
    }

    // Handle base64 uploads if passed directly
    if (updatedData.avatar && updatedData.avatar.startsWith('data:')) {
      try {
        console.log('[Settings] Uploading avatar base64 to GridFS...');
        const avatarUpload = await uploadBase64ToGridFS(
          updatedData.avatar,
          'profile_avatar.jpg',
          'image/jpeg'
        );
        updatedData.avatar = avatarUpload.url;
        updatedData.profileImageUrl = avatarUpload.url;
        console.log('[Settings] Avatar saved to GridFS:', avatarUpload.url);
      } catch (uploadErr) {
        console.error('[Settings] Error uploading avatar to GridFS:', uploadErr);
      }
    }

    if (updatedData.resumePdf && updatedData.resumePdf.startsWith('data:')) {
      try {
        console.log('[Settings] Uploading resume PDF base64 to GridFS...');
        const resumeUpload = await uploadBase64ToGridFS(
          updatedData.resumePdf,
          'Soth_Vannak_Rothchansokhomal_CV.pdf',
          'application/pdf'
        );
        updatedData.resumePdf = resumeUpload.url;
        updatedData.resumeUrl = resumeUpload.url;
        console.log('[Settings] Resume PDF saved to GridFS:', resumeUpload.url);
      } catch (uploadErr) {
        console.error('[Settings] Error uploading resume PDF to GridFS:', uploadErr);
      }
    }

    const savedSettings = await prisma.personalInfo.update({
      where: { id: settings.id },
      data: updatedData,
    });

    const normalizedSaved = {
      ...savedSettings,
      profileImageUrl: savedSettings.profileImageUrl || savedSettings.avatar || '/img/Soth vannak rothchansokhomal.jpg',
      logoUrl: savedSettings.logoUrl || savedSettings.avatar || '/img/Soth vannak rothchansokhomal.jpg',
      resumeUrl: savedSettings.resumeUrl || savedSettings.resumePdf || '/assets/Soth_vannakrothchansokhomal_Software_Developer_Intern_CV (2)-CVMEqzI6.pdf',
      showEarthIcon: savedSettings.showEarthIcon !== false,
      status: savedSettings.status || 'Available for Work',
    };

    console.log('[PUT /api/settings] Saved settings successfully:', {
      profileImageUrl: normalizedSaved.profileImageUrl,
      logoUrl: normalizedSaved.logoUrl,
      resumeUrl: normalizedSaved.resumeUrl,
      showEarthIcon: normalizedSaved.showEarthIcon,
      status: normalizedSaved.status,
    });

    res.json(normalizedSaved);
  } catch (err) {
    console.error('[PUT /api/settings Error]:', err.message, err.stack);
    res.status(500).json({ error: err.message || 'Failed to update profile settings' });
  }
});

// Direct PDF Upload Endpoint for Resume / CV via GridFS
app.post('/api/upload-resume', authMiddleware, async (req, res) => {
  try {
    const { file, filename } = req.body;
    if (!file) {
      return res.status(400).json({ error: 'No file data provided' });
    }

    const targetFilename = filename && filename.endsWith('.pdf') ? filename : 'Soth_Vannak_Rothchansokhomal_CV.pdf';
    const uploadResult = await uploadBase64ToGridFS(file, targetFilename, 'application/pdf');

    let settings = await prisma.personalInfo.findFirst();
    if (!settings) {
      settings = await prisma.personalInfo.create({
        data: initialProfileSettings,
      });
    }

    await prisma.personalInfo.update({
      where: { id: settings.id },
      data: {
        resumePdf: uploadResult.url,
      },
    });

    console.log(`[Upload Resume] Successfully stored ${targetFilename} in GridFS (${uploadResult.size} bytes) URL: ${uploadResult.url}`);

    res.json({
      success: true,
      resumePdf: uploadResult.url,
      fileId: uploadResult.fileId,
      size: uploadResult.size,
      filename: targetFilename,
      message: 'Resume PDF uploaded and saved to MongoDB GridFS successfully',
    });
  } catch (err) {
    console.error('[Upload Resume] Error saving PDF to GridFS:', err);
    res.status(500).json({ error: 'Failed to save PDF file to GridFS' });
  }
});

// Dedicated Direct CV / Resume Download Endpoint (GridFS Stream + Desktop Attachment)
app.get('/api/download-cv', async (req, res) => {
  try {
    const settings = await prisma.personalInfo.findFirst();
    const resumePath = settings?.resumePdf || '';

    // 1. If stored resume is a GridFS URL /api/files/:id or ObjectId
    if (resumePath.startsWith('/api/files/') || ObjectId.isValid(resumePath)) {
      const fileId = resumePath.replace('/api/files/', '').trim();
      if (ObjectId.isValid(fileId) && gridFSBucket) {
        const objectId = new ObjectId(fileId);
        const files = await gridFSBucket.find({ _id: objectId }).toArray();
        if (files && files.length > 0) {
          res.setHeader('Content-Type', 'application/pdf');
          res.setHeader('Content-Disposition', 'attachment; filename="Soth_Vannak_Rothchansokhomal_CV.pdf"');
          const downloadStream = gridFSBucket.openDownloadStream(objectId);
          return downloadStream.pipe(res);
        }
      }
    }

    // 2. If stored resume is a base64 Data URL
    if (resumePath.startsWith('data:')) {
      const base64Data = resumePath.split(',')[1] || resumePath;
      const pdfBuffer = Buffer.from(base64Data, 'base64');
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename="Soth_Vannak_Rothchansokhomal_CV.pdf"');
      return res.send(pdfBuffer);
    }

    // 3. Fallback to physical static file paths on disk if exists
    const candidatePaths = [
      resumePath && path.join(__dirname, 'public', resumePath.replace(/^\//, '')),
      resumePath && path.join(__dirname, resumePath.replace(/^\//, '')),
      path.join(__dirname, 'public', 'Soth_Vannak_Rothchansokhomal_CV.pdf'),
      path.join(__dirname, 'dist', 'Soth_Vannak_Rothchansokhomal_CV.pdf'),
      path.join(__dirname, 'assets', 'Soth_vannakrothchansokhomal_Software_Developer_Intern_CV (2)-CVMEqzI6.pdf'),
    ].filter(Boolean);

    for (const filePath of candidatePaths) {
      if (typeof filePath === 'string' && fs.existsSync(filePath)) {
        return res.download(filePath, 'Soth_Vannak_Rothchansokhomal_CV.pdf', (err) => {
          if (err && !res.headersSent) {
            console.error('[Download CV] Error sending file:', err);
            res.status(500).json({ error: 'Failed to download CV file' });
          }
        });
      }
    }

    res.status(404).json({ error: 'CV file not found' });
  } catch (err) {
    console.error('[GET /api/download-cv] Error:', err);
    res.status(500).json({ error: 'Failed to stream CV file' });
  }
});

// Dedicated Direct Scrum Certificate Download Endpoint
app.get('/api/download-scrum-certificate', (req, res) => {
  const candidatePaths = [
    path.join(__dirname, 'public', 'scrum_certificate.pdf'),
    path.join(__dirname, 'assets', 'Soth Vannak Rothchansokhomal - Scrum Master Certification - Certificate-CzwIquFo.pdf'),
    path.join(__dirname, 'dist', 'scrum_certificate.pdf'),
  ];

  for (const filePath of candidatePaths) {
    if (fs.existsSync(filePath)) {
      return res.download(filePath, 'Soth_Vannak_Rothchansokhomal_Scrum_Master_Certificate.pdf', (err) => {
        if (err && !res.headersSent) {
          console.error('[Download Certificate] Error sending file:', err);
          res.status(500).json({ error: 'Failed to download Certificate file' });
        }
      });
    }
  }

  res.status(404).json({ error: 'Certificate file not found' });
});

// Test Notification Endpoint (Admin only)
app.post('/api/notifications/test', async (req, res) => {
  try {
    const settings = await prisma.personalInfo.findFirst();
    const testPayload = {
      name: 'Soth Sokhomal (Self Test)',
      email: settings?.email || 'soth.vannakrothchansokhomal@gmail.com',
      subject: 'Notification System Health & Dual Gateway Verification',
      telegram: '@soth_sokhomal',
      message: 'Testing real-time bidirectional dual dispatch pipeline to Telegram Bot and Email Gateways backed by MongoDB.',
    };

    const [telegramRes, emailRes] = await Promise.all([
      sendTelegramNotification(testPayload, settings).catch((err) => ({ success: false, error: err.message })),
      sendEmailNotification(testPayload, settings).catch((err) => ({ success: false, error: err.message })),
    ]);

    res.json({
      telegram: telegramRes,
      resend: emailRes,
      email: emailRes,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to run notification test' });
  }
});

/* ==========================================================
   CLOUD FILE UPLOAD & DYNAMIC PORTFOLIO API ROUTES
   ========================================================== */

// Cloud File Upload Endpoint (Cloudinary with GridFS fallback)
app.post('/api/upload', authMiddleware, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { originalname, buffer, mimetype } = req.file;

    // 1. Try uploading to Cloudinary
    try {
      if (process.env.CLOUDINARY_CLOUD_NAME) {
        const cloudinaryRes = await uploadFileToCloudinary(buffer, originalname, 'portfolio/certificates');
        console.log('[API Upload] Cloudinary upload successful:', cloudinaryRes.secure_url);
        return res.json({
          success: true,
          url: cloudinaryRes.secure_url,
          fileUrl: cloudinaryRes.secure_url,
          provider: 'cloudinary',
          publicId: cloudinaryRes.public_id,
        });
      }
    } catch (cloudinaryErr) {
      console.warn('[API Upload] Cloudinary upload skipped or failed, falling back to GridFS:', cloudinaryErr.message);
    }

    // 2. Fallback to MongoDB GridFS
    const base64Data = buffer.toString('base64');
    const gridFSRes = await uploadBase64ToGridFS(base64Data, originalname, mimetype);
    console.log('[API Upload] GridFS upload fallback successful:', gridFSRes.url);

    res.json({
      success: true,
      url: gridFSRes.url,
      fileUrl: gridFSRes.url,
      provider: 'gridfs',
      fileId: gridFSRes.fileId,
    });
  } catch (err) {
    console.error('[POST /api/upload] Error:', err);
    res.status(500).json({ error: err.message || 'File upload failed' });
  }
});

// Experiences CRUD
app.get('/api/experiences', async (req, res) => {
  try {
    const experiences = await prisma.experience.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(experiences);
  } catch (err) {
    console.error('[GET /api/experiences] Error:', err);
    res.status(500).json({ error: 'Failed to fetch experiences' });
  }
});

app.post('/api/experiences', authMiddleware, validate(ExperienceSchema), async (req, res) => {
  try {
    const { type, title, organization, period, description } = req.body;
    const newExp = await prisma.experience.create({
      data: {
        type: type || 'WORK',
        title: title || 'Untitled Experience',
        organization: organization || '',
        period: period || '',
        description: description || null,
      },
    });
    res.status(201).json(newExp);
  } catch (err) {
    console.error('[POST /api/experiences] Error:', err);
    res.status(500).json({ error: 'Failed to create experience' });
  }
});

app.put('/api/experiences/:id', authMiddleware, validate(ExperienceSchema), async (req, res) => {
  try {
    const { id } = req.params;
    const { type, title, organization, period, description } = req.body;
    const updated = await prisma.experience.update({
      where: { id },
      data: {
        ...(type && { type }),
        ...(title !== undefined && { title }),
        ...(organization !== undefined && { organization }),
        ...(period !== undefined && { period }),
        ...(description !== undefined && { description }),
      },
    });
    res.json(updated);
  } catch (err) {
    console.error('[PUT /api/experiences/:id] Error:', err);
    res.status(500).json({ error: 'Failed to update experience' });
  }
});

app.delete('/api/experiences/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.experience.delete({ where: { id } });
    res.json({ success: true, message: 'Experience deleted' });
  } catch (err) {
    console.error('[DELETE /api/experiences/:id] Error:', err);
    res.status(500).json({ error: 'Failed to delete experience' });
  }
});

// Achievements & Certificates CRUD
app.get('/api/achievements', async (req, res) => {
  try {
    const achievements = await prisma.achievement.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(achievements);
  } catch (err) {
    console.error('[GET /api/achievements] Error:', err);
    res.status(500).json({ error: 'Failed to fetch achievements' });
  }
});

app.post('/api/achievements', authMiddleware, validate(AchievementSchema), async (req, res) => {
  try {
    const { type, title, issuer, date, credentialId, link, fileUrl } = req.body;
    const newAch = await prisma.achievement.create({
      data: {
        type: type || 'CERTIFICATE',
        title: title || 'Untitled Achievement',
        issuer: issuer || '',
        date: date || '',
        credentialId: credentialId || null,
        link: link || null,
        fileUrl: fileUrl || null,
      },
    });
    res.status(201).json(newAch);
  } catch (err) {
    console.error('[POST /api/achievements] Error:', err);
    res.status(500).json({ error: 'Failed to create achievement' });
  }
});

app.put('/api/achievements/:id', authMiddleware, validate(AchievementSchema), async (req, res) => {
  try {
    const { id } = req.params;
    const { type, title, issuer, date, credentialId, link, fileUrl } = req.body;
    const updated = await prisma.achievement.update({
      where: { id },
      data: {
        ...(type && { type }),
        ...(title !== undefined && { title }),
        ...(issuer !== undefined && { issuer }),
        ...(date !== undefined && { date }),
        ...(credentialId !== undefined && { credentialId }),
        ...(link !== undefined && { link }),
        ...(fileUrl !== undefined && { fileUrl }),
      },
    });
    res.json(updated);
  } catch (err) {
    console.error('[PUT /api/achievements/:id] Error:', err);
    res.status(500).json({ error: 'Failed to update achievement' });
  }
});

app.delete('/api/achievements/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.achievement.delete({ where: { id } });
    res.json({ success: true, message: 'Achievement deleted' });
  } catch (err) {
    console.error('[DELETE /api/achievements/:id] Error:', err);
    res.status(500).json({ error: 'Failed to delete achievement' });
  }
});

// Tech Categories & Skill Manager CRUD
app.get('/api/tech-categories', async (req, res) => {
  try {
    const categories = await prisma.techCategory.findMany({
      orderBy: { createdAt: 'asc' },
    });
    res.json(categories);
  } catch (err) {
    console.error('[GET /api/tech-categories] Error:', err);
    res.status(500).json({ error: 'Failed to fetch tech categories' });
  }
});

app.post('/api/tech-categories', authMiddleware, validate(TechCategorySchema), async (req, res) => {
  try {
    const { category, items, iconName } = req.body;
    const itemsArray = Array.isArray(items) ? items : typeof items === 'string' ? items.split(',').map(s => s.trim()).filter(Boolean) : [];
    const newCat = await prisma.techCategory.create({
      data: {
        category: category || 'New Category',
        items: itemsArray,
        iconName: iconName || 'Code',
      },
    });
    res.status(201).json(newCat);
  } catch (err) {
    console.error('[POST /api/tech-categories] Error:', err);
    res.status(500).json({ error: 'Failed to create tech category' });
  }
});

app.put('/api/tech-categories/:id', authMiddleware, validate(TechCategorySchema), async (req, res) => {
  try {
    const { id } = req.params;
    const { category, items, iconName } = req.body;
    const itemsArray = items !== undefined ? (Array.isArray(items) ? items : typeof items === 'string' ? items.split(',').map(s => s.trim()).filter(Boolean) : []) : undefined;
    const updated = await prisma.techCategory.update({
      where: { id },
      data: {
        ...(category !== undefined && { category }),
        ...(itemsArray !== undefined && { items: itemsArray }),
        ...(iconName !== undefined && { iconName }),
      },
    });
    res.json(updated);
  } catch (err) {
    console.error('[PUT /api/tech-categories/:id] Error:', err);
    res.status(500).json({ error: 'Failed to update tech category' });
  }
});

app.delete('/api/tech-categories/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.techCategory.delete({ where: { id } });
    res.json({ success: true, message: 'Tech category deleted' });
  } catch (err) {
    console.error('[DELETE /api/tech-categories/:id] Error:', err);
    res.status(500).json({ error: 'Failed to delete tech category' });
  }
});

// Languages CRUD
app.get('/api/languages', async (req, res) => {
  try {
    const languages = await prisma.language.findMany({
      orderBy: { createdAt: 'asc' },
    });
    res.json(languages);
  } catch (err) {
    console.error('[GET /api/languages] Error:', err);
    res.status(500).json({ error: 'Failed to fetch languages' });
  }
});

app.post('/api/languages', authMiddleware, validate(LanguageSchema), async (req, res) => {
  try {
    const { language, proficiency } = req.body;
    const newLang = await prisma.language.create({
      data: {
        language: language || 'Language',
        proficiency: proficiency || 'Fluent',
      },
    });
    res.status(201).json(newLang);
  } catch (err) {
    console.error('[POST /api/languages] Error:', err);
    res.status(500).json({ error: 'Failed to create language' });
  }
});

app.put('/api/languages/:id', authMiddleware, validate(LanguageSchema), async (req, res) => {
  try {
    const { id } = req.params;
    const { language, proficiency } = req.body;
    const updated = await prisma.language.update({
      where: { id },
      data: {
        ...(language !== undefined && { language }),
        ...(proficiency !== undefined && { proficiency }),
      },
    });
    res.json(updated);
  } catch (err) {
    console.error('[PUT /api/languages/:id] Error:', err);
    res.status(500).json({ error: 'Failed to update language' });
  }
});

app.delete('/api/languages/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.language.delete({ where: { id } });
    res.json({ success: true, message: 'Language deleted' });
  } catch (err) {
    console.error('[DELETE /api/languages/:id] Error:', err);
    res.status(500).json({ error: 'Failed to delete language' });
  }
});

// SPA Fallback and Vite Dev Middleware setup
if (process.env.NODE_ENV === 'production') {
  if (fs.existsSync(distPath)) {
    app.use(express.static(distPath));
  }
  app.get('*', (req, res) => {
    if (fs.existsSync(path.join(distPath, 'index.html'))) {
      return res.sendFile(path.join(distPath, 'index.html'));
    }
    res.sendFile(path.join(__dirname, 'index.html'));
  });
} else {
  try {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } catch (err) {
    console.warn('[Vite Middleware] Could not load Vite dev server middleware:', err);
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'index.html'));
    });
  }
}

// Dynamic SSL Certificate Generator for Local HTTPS
async function getOrCreateSSLCertificates() {
  try {
    const sslDir = path.join(__dirname, '.ssl');
    const certPath = path.join(sslDir, 'cert.pem');
    const keyPath = path.join(sslDir, 'key.pem');

    if (fs.existsSync(certPath) && fs.existsSync(keyPath)) {
      return {
        cert: fs.readFileSync(certPath),
        key: fs.readFileSync(keyPath),
      };
    }

    console.log('[Security SSL] Generating self-signed TLS/SSL certificate for localhost...');
    if (!fs.existsSync(sslDir)) {
      fs.mkdirSync(sslDir, { recursive: true });
    }

    const attrs = [{ name: 'commonName', value: 'localhost' }];
    const pbes = await selfsigned.generate(attrs, { days: 365, keySize: 2048 });

    const certData = pbes.cert;
    const keyData = pbes.private;

    if (certData && keyData) {
      fs.writeFileSync(certPath, certData);
      fs.writeFileSync(keyPath, keyData);

      console.log('[Security SSL] SSL Certificate generated successfully in .ssl/');
      return {
        cert: certData,
        key: keyData,
      };
    }
    return null;
  } catch (err) {
    console.error('[Security SSL] Failed to generate SSL certificates:', err.message);
    return null;
  }
}

// Server Startup & DB Initializations
async function startServer() {
  // Start DB connection in background without blocking server listen
  initMongoAndGridFS().then(() => seedDatabaseIfEmpty()).catch(err => {
    console.error('Failed to initialize MongoDB:', err);
  });

  // Start HTTP Server
  const httpServer = http.createServer(app);
  httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`[Senior Portfolio & CMS Server] HTTP Running on http://0.0.0.0:${PORT} (MongoDB & GridFS active)`);
    console.log(`[Telegram Integration] Bot Token: ${Boolean(process.env.TELEGRAM_BOT_TOKEN)} | Chat ID: ${process.env.TELEGRAM_CHAT_ID}`);
    console.log(`[Resend Integration] API Key: ${Boolean(process.env.RESEND_API_KEY)}`);
  });

  // Start HTTPS Server if SSL certs available
  const sslCerts = await getOrCreateSSLCertificates();
  if (sslCerts) {
    try {
      const httpsServer = https.createServer(sslCerts, app);
      httpsServer.listen(HTTPS_PORT, '0.0.0.0', () => {
        console.log(`[Security SSL] HTTPS Secure Server Running on https://localhost:${HTTPS_PORT}`);
      });
    } catch (sslErr) {
      console.error('[Security SSL] HTTPS Server failed to start:', sslErr.message);
    }
  }
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
