import React from 'react';

interface TechIconProps {
  name: string;
  className?: string;
}

export const TechIcon: React.FC<TechIconProps> = ({ name, className = 'w-4.5 h-4.5' }) => {
  const norm = name.toLowerCase();

  // JavaScript
  if (norm.includes('javascript')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#F7DF1E" />
        <path d="M6 19.5c.8.5 1.7.8 2.6.8 2.3 0 3.7-1.2 3.7-3.6V8.5H10v8.2c0 1.5-.7 2.1-1.9 2.1-.6 0-1.2-.2-1.6-.4l-.5 1.1zm8.2.1c1.2.6 2.6 1 3.9 1 3.1 0 5-1.7 5-4.4 0-2.4-1.4-3.7-3.8-4.7-1.5-.6-2.2-1.1-2.2-2.1 0-.9.7-1.6 2-1.6 1 0 2 .3 2.7.7l.6-1.3c-.8-.5-1.9-.8-3.1-.8-2.8 0-4.5 1.7-4.5 4.1 0 2.4 1.5 3.7 3.8 4.6 1.6.7 2.3 1.2 2.3 2.2 0 1.1-.9 1.8-2.3 1.8-1.2 0-2.4-.4-3.3-1l-.6 1.5z" fill="#000000" />
      </svg>
    );
  }

  // TypeScript
  if (norm.includes('typescript')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#3178C6" />
        <path d="M4 9.5h7.5V12H9v7.5H6.5V12H4V9.5zm9 8.6c.9.5 2 .8 3.1.8 1.9 0 3-.9 3-2.3 0-1.4-.9-2.1-2.4-2.7-1.1-.5-1.6-.8-1.6-1.4 0-.6.5-1 1.4-1 .8 0 1.6.3 2.2.6l.6-1.7c-.7-.4-1.7-.6-2.7-.6-2.1 0-3.5 1.2-3.5 2.9 0 1.5 1 2.3 2.5 2.9 1.1.5 1.5.8 1.5 1.3 0 .7-.6 1.1-1.6 1.1-.9 0-1.9-.3-2.6-.8l-.9 1.9z" fill="#ffffff" />
      </svg>
    );
  }

  // Python
  if (norm.includes('python')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path d="M11.9 2C6.9 2 7.2 4.2 7.2 4.2v2.3h4.8v.7H5.2S2 6.8 2 11.8s2.8 4.9 2.8 4.9h1.7v-2.4s-.1-2.8 2.8-2.8h4.7s2.7.1 2.7-2.6V4.6S17 2 11.9 2zm-1.3 1.5c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9z" fill="#3776AB" />
        <path d="M12.1 22c5 0 4.7-2.2 4.7-2.2v-2.3H12v-.7h6.8s3.2.4 3.2-4.6-2.8-4.9-2.8-4.9h-1.7v2.4s.1 2.8-2.8 2.8H10s-2.7-.1-2.7 2.6v4.1S7 22 12.1 22zm1.3-1.5c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9z" fill="#FFD43B" />
      </svg>
    );
  }

  // C / C++
  if (norm.includes('c / c++') || norm.includes('c++')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#00599C" />
        <path d="M11.5 8.2c-.8-.4-1.7-.6-2.6-.6-2.4 0-4.1 1.8-4.1 4.4 0 2.6 1.7 4.4 4.1 4.4.9 0 1.8-.2 2.6-.6v2.1c-.8.3-1.8.4-2.8.4-3.8 0-6.5-2.6-6.5-6.3 0-3.7 2.7-6.3 6.5-6.3 1 0 2 .2 2.8.5v2z" fill="#ffffff" />
        <path d="M14.5 11h1v-1.5h1V11h1v1h-1v1.5h-1V12h-1v-1zm4.5 0h1v-1.5h1V11h1v1h-1v1.5h-1V12h-1v-1z" fill="#004482" />
        <path d="M14.5 11h1v-1.5h1V11h1v1h-1v1.5h-1V12h-1v-1zm4.5 0h1v-1.5h1V11h1v1h-1v1.5h-1V12h-1v-1z" fill="#ffffff" />
      </svg>
    );
  }

  // React
  if (norm.includes('react')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="2.2" fill="#00D8FF" />
        <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#00D8FF" strokeWidth="1.3" />
        <ellipse cx="12" cy="12" rx="10" ry="3.8" transform="rotate(60 12 12)" stroke="#00D8FF" strokeWidth="1.3" />
        <ellipse cx="12" cy="12" rx="10" ry="3.8" transform="rotate(120 12 12)" stroke="#00D8FF" strokeWidth="1.3" />
      </svg>
    );
  }

  // Next.js
  if (norm.includes('next.js') || norm.includes('nextjs')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="#000000" />
        <path d="M7 7h2v10H7V7zm10 0h-2v4.8L9.2 7H7v10h2v-4.8L14.8 17H17V7z" fill="#ffffff" />
      </svg>
    );
  }

  // Tailwind CSS
  if (norm.includes('tailwind')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path d="M12 6c-2.7 0-4.3 1.3-5 4 1-1.3 2.2-1.8 3.5-1.5.8.2 1.3.7 1.9 1.3C13.4 10.8 14.7 12 17.5 12c2.7 0 4.3-1.3 5-4-1 1.3-2.2 1.8-3.5 1.5-.8-.2-1.3-.7-1.9-1.3C16.1 7.2 14.8 6 12 6zm-5.5 6C3.8 12 2.2 13.3 1.5 16c1-1.3 2.2-1.8 3.5-1.5.8.2 1.3.7 1.9 1.3 1 1 2.3 2.2 5.1 2.2 2.7 0 4.3-1.3 5-4-1 1.3-2.2 1.8-3.5 1.5-.8-.2-1.3-.7-1.9-1.3C10.6 13.2 9.3 12 6.5 12z" fill="#06B6D4" />
      </svg>
    );
  }

  // HTML5
  if (norm.includes('html')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path d="M3 2l1.6 18.2L12 23l7.4-2.8L21 2H3zm14.8 6.2h-7l.2 2h6.6l-.6 6.5-5 1.4-5-1.4-.3-3.6h2.2l.2 1.9 2.9.8 2.9-.8.3-3.4H5.8L5.2 6.2h13l-.4 2z" fill="#E34F26" />
      </svg>
    );
  }

  // CSS3
  if (norm.includes('css')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path d="M3 2l1.6 18.2L12 23l7.4-2.8L21 2H3zm14.8 6.2h-7l.2 2h6.6l-.6 6.5-5 1.4-5-1.4-.3-3.6h2.2l.2 1.9 2.9.8 2.9-.8.3-3.4H5.8L5.2 6.2h13l-.4 2z" fill="#1572B6" />
      </svg>
    );
  }

  // Framer Motion
  if (norm.includes('framer')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path d="M4 2h16v7h-8L4 2zm0 7h8v7H4V9zm8 7v7l-8-7h8z" fill="#0055FF" />
      </svg>
    );
  }

  // Node.js
  if (norm.includes('node')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path d="M12 2L3 7.2v10.4L12 23l9-5.4V7.2L12 2zm-1 14.5h-1.5V11H8v-1.5h4.5V11h-1.5v5.5zm4.5 0h-1.5V9.5H16v7z" fill="#5FA04E" />
      </svg>
    );
  }

  // Express.js
  if (norm.includes('express')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="#222222" />
        <text x="12" y="16" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#ffffff" fontFamily="monospace">ex</text>
      </svg>
    );
  }

  // REST API / API
  if (norm.includes('api') || norm.includes('restful')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#6366F1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    );
  }

  // Server Actions
  if (norm.includes('server actions')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill="#3B82F6" />
      </svg>
    );
  }

  // Authentication / JWT
  if (norm.includes('authentication') || norm.includes('jwt')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    );
  }

  // Flutter & Dart
  if (norm.includes('flutter') || norm.includes('dart')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path d="M14.3 2L4 12.3l3.2 3.2L19.5 3.2 14.3 2z" fill="#02569B" />
        <path d="M14.3 12.7L8.7 18.3 12 21.6l5.6-5.6-3.3-3.3z" fill="#0175C2" />
        <path d="M12 21.6l2.3-2.3 5.2 2.7-7.5-.4z" fill="#29B6F6" />
      </svg>
    );
  }

  // OpenCV
  if (norm.includes('opencv')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="7" r="4" fill="#EE2A24" />
        <circle cx="7" cy="16" r="4" fill="#00A651" />
        <circle cx="17" cy="16" r="4" fill="#008FD5" />
      </svg>
    );
  }

  // Dialogflow
  if (norm.includes('dialogflow')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path d="M12 2L4 7v10l8 5 8-5V7l-8-5z" fill="#FF9800" />
        <path d="M12 6l-5 3.1v5.8l5 3.1 5-3.1V9.1L12 6z" fill="#ffffff" />
      </svg>
    );
  }

  // OpenWeatherMap
  if (norm.includes('openweather') || norm.includes('weather')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#EB6E4B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" fill="#EB6E4B" fillOpacity="0.2" />
      </svg>
    );
  }

  // Pygame
  if (norm.includes('pygame')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="12" x="2" y="6" rx="6" />
        <line x1="6" x2="10" y1="12" y2="12" />
        <line x1="8" x2="8" y1="10" y2="14" />
        <circle cx="15" cy="11" r="1" fill="#10B981" />
        <circle cx="18" cy="13" r="1" fill="#10B981" />
      </svg>
    );
  }

  // MongoDB
  if (norm.includes('mongodb')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path d="M12 1.5C12 1.5 6.5 7.8 6.5 13.8c0 4.2 3.1 7.6 5.5 8.7.4-1.2.6-3.8.6-4.6V1.5z" fill="#47A248" />
        <path d="M12 1.5c0 0 5.5 6.3 5.5 12.3 0 4.2-3.1 7.6-5.5 8.7-.4-1.2-.6-3.8-.6-4.6V1.5z" fill="#499D4A" />
      </svg>
    );
  }

  // Prisma ORM
  if (norm.includes('prisma')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path d="M12 2L4 19.5 17 22l3-6.5L12 2zm0 4.2l5.3 11-8.5-1.6L12 6.2z" fill="#2D3748" />
        <path d="M12 6.2l5.3 11-8.5-1.6L12 6.2z" fill="#0C344B" />
      </svg>
    );
  }

  // Firebase
  if (norm.includes('firebase')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path d="M4.5 17.5L7 3.5l3.8 6.8-6.3 7.2zm15 0l-2.2-13.8-3.5 5.8 5.7 8zM3.2 18.5l8.8 4.9 8.8-4.9-8.8-15.3-8.8 15.3z" fill="#FFCA28" />
        <path d="M12 22.4l7.8-4.4-2.8-14.8L12 22.4z" fill="#FFA000" />
      </svg>
    );
  }

  // PostgreSQL
  if (norm.includes('postgres')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.5 8.2c-.3 1.8-1.5 3.3-3.2 4-.8.3-1.7.3-2.5 0-1.8-.7-3-2.2-3.3-4-.4-2.1.8-4.2 2.9-4.8 2.1-.6 4.3.4 5.1 2.4.4.8.7 1.6 1 2.4z" fill="#336791" />
      </svg>
    );
  }

  // SQLite
  if (norm.includes('sqlite')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path d="M4 5c0-1.7 3.6-3 8-3s8 1.3 8 3v14c0 1.7-3.6 3-8 3s-8-1.3-8-3V5zm8 1c3.3 0 6-.8 6-1.8s-2.7-1.8-6-1.8-6 .8-6 1.8 2.7 1.8 6 1.8z" fill="#003B57" />
      </svg>
    );
  }

  // Git / GitHub
  if (norm.includes('git')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path d="M21.6 10.9L13.1 2.4a1.8 1.8 0 0 0-2.5 0L8.2 4.8l3.1 3.1a2.1 2.1 0 0 1 2.7 2.7l3 3c.7-.2 1.6 0 2.2.6.8.8.8 2.1 0 2.9-.8.8-2.1.8-2.9 0-.6-.6-.8-1.5-.6-2.2l-2.9-2.9v4.9a2.1 2.1 0 1 1-1.8 0V8.9a2.1 2.1 0 0 1-1.1-1.8c0-.6.2-1.1.6-1.6L7.3 2.4 2.4 7.3a1.8 1.8 0 0 0 0 2.5l8.5 8.5a1.8 1.8 0 0 0 2.5 0l8.2-8.2c.7-.7.7-1.8 0-2.5z" fill="#F05032" />
      </svg>
    );
  }

  // Figma
  if (norm.includes('figma')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path d="M8 2h4v7H8a3.5 3.5 0 1 1 0-7z" fill="#F24E1E" />
        <path d="M12 2h4a3.5 3.5 0 0 1 0 7h-4V2z" fill="#FF7262" />
        <path d="M12 9h4a3.5 3.5 0 1 1-3.5 3.5V9z" fill="#1ABCFE" />
        <path d="M8 9h4v7H8a3.5 3.5 0 1 1 0-7z" fill="#A259FF" />
        <path d="M8 16h4v4.5a3.5 3.5 0 1 1-4-3.5V16z" fill="#0ACF83" />
      </svg>
    );
  }

  // Certified Scrum Master / Agile
  if (norm.includes('scrum') || norm.includes('agile')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    );
  }

  // VS Code / Postman
  if (norm.includes('vs code') || norm.includes('postman') || norm.includes('code')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path d="M17.5 2.5L7 10.5 3.5 7.8 2 8.7l3 3.3-3 3.3 1.5.9 3.5-2.7 10.5 8 4.5-2V4.5l-4.5-2zM17 17.5L9.5 12 17 6.5v11z" fill="#007ACC" />
      </svg>
    );
  }

  // Vercel
  if (norm.includes('vercel')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path d="M12 2L2 20h20L12 2z" fill="#000000" className="dark:fill-white" />
      </svg>
    );
  }

  // Default clean code icon
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
};
