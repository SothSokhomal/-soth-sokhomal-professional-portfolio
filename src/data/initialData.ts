import {
  SkillCategory,
  ProjectData,
  EducationItem,
  LeadershipItem,
  ScholarshipItem,
  CertificateItem,
  LanguageItem,
  PersonalInfo,
  Message,
} from '../types';

export const personalInfo: PersonalInfo = {
  name: "Soth Vannak RothChansokhomal",
  shortName: "SothSokhomal",
  title: "Software Developer Intern",
  subtitle: "React | JavaScript | Node.js | Next.js | TypeScript",
  location: "Phnom Penh, Cambodia",
  phone: "085 257 728",
  email: "soth.vannakrothchansokhomal@gmail.com",
  github: "https://github.com/SothSokhomal",
  portfolio: "https://sothsokhomal.github.io/SothSokhomal_portfolio/",
  linkedin: "https://www.linkedin.com/in/sothvannakrothchansokhomal/",
  instagram: "https://www.instagram.com/soth.vannakrothchansokhomal/",
  facebook: "https://www.facebook.com/rose.555901",
  avatar: "/img/Soth vannak rothchansokhomal.jpg",
  profileImageUrl: "/img/Soth vannak rothchansokhomal.jpg",
  logoUrl: "/img/Soth vannak rothchansokhomal.jpg",
  resumePdf: "/assets/Soth_vannakrothchansokhomal_Software_Developer_Intern_CV (2)-CVMEqzI6.pdf",
  resumeUrl: "/assets/Soth_vannakrothchansokhomal_Software_Developer_Intern_CV (2)-CVMEqzI6.pdf",
  showEarthIcon: true,
  status: "Available for Work",
  bio: "Motivated Software Engineering student at CamTech with hands-on experience developing modern web applications using React, Next.js, Node.js, TypeScript, and REST APIs. Passionate about building high-performance software solutions, sleek user interfaces, and scalable backend architecture."
};

export const skillsData: SkillCategory[] = [
  {
    category: "Web Development",
    items: ["HTML5", "CSS3", "JavaScript (ES6+)", "TypeScript"],
    iconName: "Globe"
  },
  {
    category: "Frontend",
    items: ["React.js", "Next.js 14", "Tailwind CSS", "Bootstrap", "Framer Motion"],
    iconName: "Layout"
  },
  {
    category: "Backend & API",
    items: ["Node.js", "Express.js", "RESTful APIs", "Server Actions"],
    iconName: "Server"
  },
  {
    category: "Database & ORM",
    items: ["MongoDB", "Prisma ORM", "PostgreSQL", "MySQL"],
    iconName: "Database"
  },
  {
    category: "Algorithms & Languages",
    items: ["Python", "C++", "Data Structures"],
    iconName: "Code"
  },
  {
    category: "Developer Tools",
    items: ["GitHub", "Git", "Figma", "Postman", "Vercel"],
    iconName: "Cpu"
  },
  {
    category: "Computer Vision & AI",
    items: ["OpenCV", "Pygame", "Dialogflow NLP", "OpenWeatherMap API"],
    iconName: "Layers"
  },
  {
    category: "Soft Skills",
    items: ["Team Leadership & Contribution", "Complex Problem Solving", "Public Speaking", "Agile SCRUM"],
    iconName: "Users"
  }
];

export const initialProjectsData: ProjectData[] = [
  {
    id: "proj-1",
    title: "AI-Powered Weather Chatbot",
    category: "AI & Full-Stack",
    technologies: ["React.js", "Node.js", "Dialogflow", "OpenWeatherMap API", "NLP"],
    description: "An intelligent chatbot that answers weather-related questions using natural language processing (NLP). Features real-time weather retrieval with fluid conversational turns.",
    problem: "Traditional weather apps require multiple taps and offer stale configurations, lacking an engaging conversational format.",
    features: [
      "Natural Language Processing (NLP) conversation interface",
      "Real-time weather query parsing via API",
      "Responsive messaging UI built with React component state"
    ],
    contribution: "Designed and developed the entire React frontend and integrated Node.js backend logic to securely route credentials to Dialogflow and OpenWeatherMap APIs.",
    challenges: "Handling conversational fallback loops when the model encountered highly abstract or multi-city requests.",
    lessonsLearned: "Deepened engineering expertise in async/await API communications, RESTful response handling, and custom messaging animations.",
    githubUrl: "https://github.com/SothSokhomal/Weather-Bot-App",
    featured: true,
    image: "https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=1200&q=80",
    views: 342
  },
  {
    id: "proj-2",
    title: "Personal Portfolio Website",
    category: "Frontend Design",
    technologies: ["Next.js 14", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "MongoDB", "Prisma"],
    description: "A gorgeous, responsive portfolio representing Soth Vannak RothChansokhomal's professional development journey, academic achievements, and projects.",
    problem: "Employers need a centralized, premium digital hub that clearly communicates technical proficiencies and displays project histories in an instantly legible manner.",
    features: [
      "Sleek modern user interface with dark & light high-contrast layout options",
      "Responsive mobile-first grid layout",
      "Direct downloadable resume, clean contact controls, and secure Admin Dashboard"
    ],
    contribution: "Crafted the layout structures, responsive grids, geometric backgrounds, and unified typing presentation.",
    challenges: "Achieving complex, fluid geometric curves and floating blobs that scale perfectly across mobile viewports without blocking interactions.",
    lessonsLearned: "Acquired a rigorous mental model of component boundaries, custom interactive hover state styles, and accessibility pairings.",
    githubUrl: "https://github.com/SothSokhomal/SothSokhomal_portfolio",
    liveUrl: "https://sothsokhomal.github.io/SothSokhomal_portfolio/",
    featured: true,
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
    views: 412
  },
  {
    id: "proj-3",
    title: "Expense Tracker Web Application",
    category: "Web App (CRUD)",
    technologies: ["HTML5", "CSS3", "JavaScript", "Node.js"],
    description: "A fast, lightweight daily financial tracker. Enables users to maintain records, visualize spending, and manage transactions in real-time.",
    problem: "Standard financial logs are heavy, require persistent authentication, and contain cluttered visual components.",
    features: [
      "Add, Read, Update, and Delete transactions easily",
      "Dynamic table updating without full-page reloads",
      "Data input validation and total expense indicator"
    ],
    contribution: "Built the entire front-end view, set up local memory state synchronization, and programmed the modal triggers.",
    challenges: "Enabling in-line updating where specific elements switch to input fields seamlessly and maintain formatting upon saving.",
    lessonsLearned: "Gained structural expertise in native DOM manipulations, JavaScript form object handlers, and event delegation patterns.",
    githubUrl: "https://github.com/SothSokhomal/expenseapp",
    liveUrl: "https://expenseapp-2usy127qy-sothsokhomals-projects.vercel.app/",
    featured: true,
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80",
    views: 289
  },
  {
    id: "proj-4",
    title: "Spotify UI Clone",
    category: "UI Cloning",
    technologies: ["HTML5", "CSS3", "JavaScript", "Flexbox & Grid"],
    description: "A highly faithful, fully responsive front-end replication of the Spotify web player experience, prioritizing navigation structure and media cards.",
    problem: "Replicating complex multi-panel desktop layouts on standard browser windows while keeping grid ratios aesthetic.",
    features: [
      "Perfect dark-mode replication of modern sidebar, content, and player interfaces",
      "Hover interactions for playlist covers",
      "Responsive menu behavior across mobile and desktop breakpoints"
    ],
    contribution: "Sole designer and coder. Crafted custom layout scroll behaviors, typography settings, and player slider interactions.",
    challenges: "Managing overlapping fixed elements and setting appropriate overflow properties so specific containers scroll independently.",
    lessonsLearned: "Mastered deep CSS styling protocols including flex alignments, advanced CSS grids, custom scrollbars, and fluid scaling.",
    githubUrl: "https://github.com/SothSokhomal/song_soundie",
    liveUrl: "https://sothsokhomal.github.io/song_soundie/",
    featured: true,
    image: "/img/spotify_ui_clone.png",
    views: 310
  },
  {
    id: "proj-5",
    title: "Face Recognition Pipeline",
    category: "Computer Vision",
    technologies: ["Python", "OpenCV", "Haar Cascade", "Computer Vision"],
    description: "An end-to-end computer vision program integrated with real-time webcams to detect individual faces, compute bounding coordinates, and verify identity labels.",
    problem: "Real-time video frame parsing is intensive and often causes performance stutters or delayed recognition loops.",
    features: [
      "Real-time webcam stream input processing",
      "Accurate bounding boxes on multiple faces simultaneously",
      "Identified label tagging with instant name overlay"
    ],
    contribution: "Programmed the camera collection pipeline, integrated the pre-trained cascade parameters, and managed training structures.",
    challenges: "Minimizing false positives under variable illumination and maintaining consistent 30 FPS playback rates on standard laptop hardware.",
    lessonsLearned: "Understood computer vision fundamentals: image matrices, grayscale transformations, classification thresholds, and real-time threading.",
    githubUrl: "https://github.com/SothSokhomal/Face_Recognition",
    featured: true,
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
    views: 265
  },
  {
    id: "proj-6",
    title: "Classic Snake Game",
    category: "Game Dev",
    technologies: ["Python", "Pygame"],
    description: "An elegant recreation of the retro arcade classic. Features intuitive directional inputs, scoring systems, and progressive velocity parameters.",
    problem: "Ensuring game-loop synchronization across different hardware speeds while tracking continuous coordinate loops.",
    features: [
      "Smooth control response mechanics",
      "Dynamic coordinate generation for randomized food spawns",
      "Continuous velocity multipliers to ramp difficulty as score increases"
    ],
    contribution: "Designed game loop matrices, programmed cell collision logic, and implemented key press event listener handlers.",
    challenges: "Solving sudden edge-collision bugs where immediate double-taps on opposing directions triggered instant self-collision.",
    lessonsLearned: "Obtained a deep mathematical understanding of continuous game state rendering, input polling, bounding check loops, and visual layers.",
    githubUrl: "https://github.com/SothSokhomal/SnakeGame",
    featured: true,
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80",
    views: 198
  }
];

export const educationData: EducationItem[] = [
  {
    school: "Cambodia University of Technology and Science (CamTech)",
    degree: "Bachelor's Degree in Software Engineering",
    period: "2024 – Present"
  },
  {
    school: "Australian Center for Education (ACE)",
    degree: "General English Program (GEP)",
    period: "2016 – 2023"
  },
  {
    school: "Phsar Derm Ktov High School",
    degree: "High School Diploma (Graduated)",
    period: "Graduated: 2024"
  },
  {
    school: "Champion Coders Australia",
    degree: "Kid for Code Club",
    period: "Graduated: 2024"
  }
];

export const leadershipData: LeadershipItem[] = [
  {
    title: "Sisters of Code Ambassador",
    organization: "Sisters of Code",
    period: "2026",
    description: "Promoted technology education and encouraged youth, especially women, to participate in STEM and computer programming through workshops, leadership sessions, and outreach."
  },
  {
    title: "SEA Sponge City Innovation Challenge",
    organization: "Sponge City Challenge",
    period: "May - June 2025",
    description: "Led and contributed to a team project selected as a Top 5 Finalist nationally for developing sustainable urban flood solutions, focusing on technical feasibility and environmental sustainability."
  },
  {
    title: "TVET Volunteer – Registration Assistant",
    organization: "Technical and Vocational Education and Training (TVET)",
    period: "June 2025",
    description: "Supported event operations, coordinated registrations, and managed participant orientations for Technical and Vocational Education and Training initiatives."
  },
  {
    title: "E-Gen Innovation Program",
    organization: "Ministry of Education, Youth and Sport (MoEYS)",
    period: "December 2025 - February 2026",
    description: "Collaborated with a cross-functional team to conceptualize and develop an innovative project, securing First Runner-Up recognition (Top 5) in a national program hosted by MoEYS."
  },
  {
    title: "Cambodian Delegate - eMpowering Youths Across ASEAN Cohort 6",
    organization: "ASEAN Foundation",
    period: "May 2026 - Present",
    description: "Representing Cambodia in a hybrid ASEAN youth empowerment program, focusing on regional collaboration, leadership, and cross-cultural technology initiatives."
  },
  {
    title: "Prosob Festival Youth Volunteer",
    organization: "Prosob Festival",
    period: "December 2025 - April 2026",
    description: "Assisted in regional event organization, crowd dynamics coordination, and sustainable festival management operations."
  },
  {
    title: "Leadership Conference Competition",
    organization: "National Conference Group",
    period: "2025",
    description: "Participated and competed in problem-solving pitches centering community coordination and business innovation strategies."
  },
  {
    title: "CancerCo Video Competition",
    organization: "CancerCo Initiative",
    period: "October 2020",
    description: "Created and submitted a health advocacy video under the theme 'Breast Cancer' to spread community-level diagnostic awareness."
  }
];

export const scholarshipsData: ScholarshipItem[] = [
  { name: "75% Academic Scholarship", provider: "Cambodia University of Technology and Science (CamTech)" },
  { name: "100% Academic Scholarship", provider: "TUX Global Institute" },
  { name: "100% Academic Scholarship", provider: "Center of Science and Technology Advanced Development" },
  { name: "100% Academic Scholarship", provider: "Paññasastra University of Cambodia (AMT)" }
];

export const certificatesData: CertificateItem[] = [
  {
    name: "Scrum Master Certification – Agile Enterprise Coach",
    provider: "Agile Enterprise Coach, London",
    year: "Jun 2026",
    credentialId: "1006580",
    link: "https://www.linkedin.com/in/sothvannakrothchansokhomal/",
    file: "/assets/Soth Vannak Rothchansokhomal - Scrum Master Certification - Certificate-CzwIquFo.pdf"
  },
  { name: "UX/UI Design Short Course", provider: "Future.Bit Academy", year: "2025" },
  { name: "Introduction to Dynamic Web Development (HTML, CSS, JS)", provider: "Champion Coders", year: "2024" },
  { name: "Python Programming for Intermediates", provider: "Champion Coders", year: "2022" },
  { name: "Public Speaking Course", provider: "National Program", year: "2023" },
  { name: "General English Program (GEP)", provider: "Australian Center for Education (ACE)", year: "2016 - 2023" }
];

export const languagesData: LanguageItem[] = [
  { language: "Khmer", proficiency: "Native" },
  { language: "English", proficiency: "Fluent" }
];

// Aliases for compatibility
export const initialProjects = initialProjectsData;
export const initialSkills = skillsData;
export const initialProfileSettings = personalInfo;

export const initialMessages: Message[] = [
  {
    id: 'msg-1',
    name: 'Emily Watson',
    email: 'emily.watson@techcorp-ventures.io',
    subject: 'Software Developer Intern Opportunity at Global Studio',
    telegram: '@emilywatson_tech',
    message: 'Hello Soth Sokhomal, we reviewed your Weather Chatbot and Expense Tracker projects. Your work on React, Node.js, and TypeScript matches our standards. Would love to schedule an introductory interview.',
    isRead: false,
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    ip: '192.168.1.45',
  },
];
