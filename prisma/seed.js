import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const personalInfoData = {
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
  resumePdf: "/assets/Soth_vannakrothchansokhomal_Software_Developer_Intern_CV (2)-CVMEqzI6.pdf",
  bio: "Motivated Software Engineering student at CamTech with hands-on experience developing modern web applications using React, Next.js, Node.js, TypeScript, and REST APIs. Passionate about building high-performance software solutions, sleek user interfaces, and scalable backend architecture."
};

const techCategoriesData = [
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

const experiencesData = [
  {
    type: "EDUCATION",
    title: "Bachelor's Degree in Software Engineering",
    organization: "Cambodia University of Technology and Science (CamTech)",
    period: "2024 – Present",
    description: "Specializing in modern web engineering, data structures, backend architecture, and software design."
  },
  {
    type: "EDUCATION",
    title: "General English Program (GEP)",
    organization: "Australian Center for Education (ACE)",
    period: "2016 – 2023",
    description: "Completed advanced academic English proficiency, public speaking, and communicative writing."
  },
  {
    type: "EDUCATION",
    title: "High School Diploma",
    organization: "Phsar Derm Ktov High School",
    period: "Graduated: 2024",
    description: "Graduated with honors focusing on STEM foundation subjects."
  },
  {
    type: "EDUCATION",
    title: "Kid for Code Club",
    organization: "Champion Coders Australia",
    period: "Graduated: 2024",
    description: "Hands-on foundation in computer science and algorithmic logic."
  },
  {
    type: "VOLUNTEER",
    title: "Sisters of Code Ambassador",
    organization: "Sisters of Code",
    period: "2026",
    description: "Promoted technology education and encouraged youth, especially women, to participate in STEM and computer programming through workshops, leadership sessions, and outreach."
  },
  {
    type: "INNOVATION",
    title: "SEA Sponge City Innovation Challenge Finalist",
    organization: "Sponge City Challenge",
    period: "May - June 2025",
    description: "Led and contributed to a team project selected as a Top 5 Finalist nationally for developing sustainable urban flood solutions, focusing on technical feasibility and environmental sustainability."
  },
  {
    type: "VOLUNTEER",
    title: "TVET Volunteer – Registration Assistant",
    organization: "Technical and Vocational Education and Training (TVET)",
    period: "June 2025",
    description: "Supported event operations, coordinated registrations, and managed participant orientations for Technical and Vocational Education and Training initiatives."
  },
  {
    type: "INNOVATION",
    title: "E-Gen Innovation Program - First Runner-Up",
    organization: "Ministry of Education, Youth and Sport (MoEYS)",
    period: "December 2025 - February 2026",
    description: "Collaborated with a cross-functional team to conceptualize and develop an innovative project, securing First Runner-Up recognition (Top 5) in a national program hosted by MoEYS."
  },
  {
    type: "VOLUNTEER",
    title: "Cambodian Delegate - eMpowering Youths Across ASEAN Cohort 6",
    organization: "ASEAN Foundation",
    period: "May 2026 - Present",
    description: "Representing Cambodia in a hybrid ASEAN youth empowerment program, focusing on regional collaboration, leadership, and cross-cultural technology initiatives."
  },
  {
    type: "VOLUNTEER",
    title: "Prosob Festival Youth Volunteer",
    organization: "Prosob Festival",
    period: "December 2025 - April 2026",
    description: "Assisted in regional event organization, crowd dynamics coordination, and sustainable festival management operations."
  },
  {
    type: "INNOVATION",
    title: "Leadership Conference Competition Pitcher",
    organization: "National Conference Group",
    period: "2025",
    description: "Participated and competed in problem-solving pitches centering community coordination and business innovation strategies."
  },
  {
    type: "VOLUNTEER",
    title: "CancerCo Video Competition Contributor",
    organization: "CancerCo Initiative",
    period: "October 2020",
    description: "Created and submitted a health advocacy video under the theme 'Breast Cancer' to spread community-level diagnostic awareness."
  }
];

const achievementsData = [
  {
    type: "CERTIFICATE",
    title: "Scrum Master Certification – Agile Enterprise Coach",
    issuer: "Agile Enterprise Coach, London",
    date: "Jun 2026",
    credentialId: "1006580",
    link: "https://www.linkedin.com/in/sothvannakrothchansokhomal/",
    fileUrl: "/assets/Soth Vannak Rothchansokhomal - Scrum Master Certification - Certificate-CzwIquFo.pdf"
  },
  {
    type: "CERTIFICATE",
    title: "UX/UI Design Short Course",
    issuer: "Future.Bit Academy",
    date: "2025",
    credentialId: "",
    link: ""
  },
  {
    type: "CERTIFICATE",
    title: "Introduction to Dynamic Web Development (HTML, CSS, JS)",
    issuer: "Champion Coders",
    date: "2024",
    credentialId: "",
    link: ""
  },
  {
    type: "CERTIFICATE",
    title: "Python Programming for Intermediates",
    issuer: "Champion Coders",
    date: "2022",
    credentialId: "",
    link: ""
  },
  {
    type: "CERTIFICATE",
    title: "Public Speaking Course",
    issuer: "National Program",
    date: "2023",
    credentialId: "",
    link: ""
  },
  {
    type: "CERTIFICATE",
    title: "General English Program (GEP)",
    issuer: "Australian Center for Education (ACE)",
    date: "2016 - 2023",
    credentialId: "",
    link: ""
  },
  {
    type: "ACADEMIC_HONOR",
    title: "75% Academic Scholarship",
    issuer: "Cambodia University of Technology and Science (CamTech)",
    date: "2024",
    credentialId: "",
    link: ""
  },
  {
    type: "ACADEMIC_HONOR",
    title: "100% Academic Scholarship",
    issuer: "TUX Global Institute",
    date: "2024",
    credentialId: "",
    link: ""
  },
  {
    type: "ACADEMIC_HONOR",
    title: "100% Academic Scholarship",
    issuer: "Center of Science and Technology Advanced Development",
    date: "2024",
    credentialId: "",
    link: ""
  },
  {
    type: "ACADEMIC_HONOR",
    title: "100% Academic Scholarship",
    issuer: "Paññasastra University of Cambodia (AMT)",
    date: "2024",
    credentialId: "",
    link: ""
  }
];

const languagesData = [
  { language: "Khmer", proficiency: "Native" },
  { language: "English", proficiency: "Fluent" }
];

const projectsData = [
  {
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
    title: "Personal Portfolio Website",
    category: "Frontend Design",
    technologies: ["Next.js 14", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "MongoDB", "Prisma"],
    description: "A responsive portfolio representing Soth Vannak RothChansokhomal's professional development journey, academic achievements, and projects.",
    problem: "Employers need a centralized digital hub that clearly communicates technical proficiencies and displays project histories in an instantly legible manner.",
    features: [
      "Sleek modern user interface with dark & light high-contrast layout options",
      "Responsive mobile-first grid layout",
      "Direct downloadable resume, clean contact controls, and secure Admin Dashboard"
    ],
    contribution: "Crafted layout structures, responsive grids, geometric backgrounds, and unified typing presentation.",
    challenges: "Achieving complex, fluid geometric curves and floating blobs that scale across mobile viewports without blocking interactions.",
    lessonsLearned: "Acquired a rigorous mental model of component boundaries, custom interactive hover state styles, and accessibility pairings.",
    githubUrl: "https://github.com/SothSokhomal/SothSokhomal_portfolio",
    liveUrl: "https://sothsokhomal.github.io/SothSokhomal_portfolio/",
    featured: true,
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
    views: 412
  },
  {
    title: "Expense Tracker Web Application",
    category: "Web App (CRUD)",
    technologies: ["HTML5", "CSS3", "JavaScript", "Node.js"],
    description: "A fast daily financial tracker. Enables users to maintain records, visualize spending, and manage transactions in real-time.",
    problem: "Standard financial logs are heavy, require persistent authentication, and contain cluttered visual components.",
    features: [
      "Add, Read, Update, and Delete transactions easily",
      "Dynamic table updating without full-page reloads",
      "Data input validation and total expense indicator"
    ],
    contribution: "Built the front-end view, set up local memory state synchronization, and programmed modal triggers.",
    challenges: "Enabling in-line updating where specific elements switch to input fields seamlessly and maintain formatting upon saving.",
    lessonsLearned: "Gained structural expertise in native DOM manipulations, JavaScript form object handlers, and event delegation patterns.",
    githubUrl: "https://github.com/SothSokhomal/expenseapp",
    liveUrl: "https://expenseapp-2usy127qy-sothsokhomals-projects.vercel.app/",
    featured: true,
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80",
    views: 289
  },
  {
    title: "Spotify UI Clone",
    category: "UI Cloning",
    technologies: ["HTML5", "CSS3", "JavaScript", "Flexbox & Grid"],
    description: "A front-end replication of the Spotify web player experience, prioritizing navigation structure and media cards.",
    problem: "Replicating complex multi-panel desktop layouts on standard browser windows while keeping grid ratios aesthetic.",
    features: [
      "Dark-mode replication of modern sidebar, content, and player interfaces",
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
    contribution: "Programmed the camera collection pipeline, integrated pre-trained cascade parameters, and managed training structures.",
    challenges: "Minimizing false positives under variable illumination and maintaining consistent 30 FPS playback rates on standard laptop hardware.",
    lessonsLearned: "Understood computer vision fundamentals: image matrices, grayscale transformations, classification thresholds, and real-time threading.",
    githubUrl: "https://github.com/SothSokhomal/Face_Recognition",
    featured: true,
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
    views: 265
  },
  {
    title: "Classic Snake Game",
    category: "Game Dev",
    technologies: ["Python", "Pygame"],
    description: "A recreation of the retro arcade classic. Features intuitive directional inputs, scoring systems, and progressive velocity parameters.",
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

async function seed() {
  console.log('--- Starting Database Seeding ---');

  // 1. Personal Info
  const existingPersonalInfo = await prisma.personalInfo.findFirst();
  if (!existingPersonalInfo) {
    await prisma.personalInfo.create({ data: personalInfoData });
    console.log('[Seed] Personal Info created.');
  } else {
    await prisma.personalInfo.update({
      where: { id: existingPersonalInfo.id },
      data: personalInfoData,
    });
    console.log('[Seed] Personal Info updated.');
  }

  // 2. Tech Categories
  const existingCategoriesCount = await prisma.techCategory.count();
  if (existingCategoriesCount === 0) {
    for (const cat of techCategoriesData) {
      await prisma.techCategory.create({ data: cat });
    }
    console.log(`[Seed] Created ${techCategoriesData.length} Tech Categories.`);
  }

  // 3. Experiences
  const existingExperiencesCount = await prisma.experience.count();
  if (existingExperiencesCount === 0) {
    for (const exp of experiencesData) {
      await prisma.experience.create({ data: exp });
    }
    console.log(`[Seed] Created ${experiencesData.length} Experiences.`);
  }

  // 4. Achievements & Certificates
  const existingAchievementsCount = await prisma.achievement.count();
  if (existingAchievementsCount === 0) {
    for (const ach of achievementsData) {
      await prisma.achievement.create({ data: ach });
    }
    console.log(`[Seed] Created ${achievementsData.length} Achievements & Certificates.`);
  }

  // 5. Languages
  const existingLanguagesCount = await prisma.language.count();
  if (existingLanguagesCount === 0) {
    for (const lang of languagesData) {
      await prisma.language.create({ data: lang });
    }
    console.log(`[Seed] Created ${languagesData.length} Languages.`);
  }

  // 6. Projects
  const existingProjectsCount = await prisma.project.count();
  if (existingProjectsCount === 0) {
    for (const proj of projectsData) {
      await prisma.project.create({ data: proj });
    }
    console.log(`[Seed] Created ${projectsData.length} Projects.`);
  }

  console.log('--- Database Seeding Completed Successfully ---');
}

seed()
  .catch((e) => {
    console.error('[Seed Error]:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
