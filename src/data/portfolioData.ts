import { Project, Experience, Education, SkillCategory, EngineeringMindsetPrinciple } from '@/types/portfolio';

export const PERSONAL_INFO = {
  name: "MD Tajul Islam",
  preferredName: "Tajul Islam",
  title: "Backend Engineer & System Architect",
  company: "Backbencher Studio",
  headline: "Backend Engineer & System Architect",
  pitch: "Skilled and result-oriented Backend Engineer & Team Leader with deep expertise in designing scalable backend architectures, microservices, and database systems. Proven track record in developing high-performance REST APIs, database schemas, real-time communication systems, and cloud deployments using Clean Code and SOLID principles.",
  bio: [
    "Skilled and result-oriented Backend Engineer & Team Leader with deep expertise in designing scalable backend architectures, microservices, and database systems.",
    "Currently serving as Backend Engineer at Backbencher Studio, building enterprise-scale software projects, architecting clean RESTful APIs, and designing modular backends with NestJS, Prisma ORM, and PostgreSQL.",
    "Proven track record in developing high-performance REST APIs, database schemas, real-time communication systems (WebRTC, LiveKit, Socket.IO), and multi-tenant cloud deployments using Clean Code and SOLID principles.",
    "Comprehensive technical mastery across Go (Golang), Node.js, TypeScript, Docker, Portainer, Linux (Ubuntu, Arch Linux), Redis, Kafka, RabbitMQ, pgvector, and frontend ecosystems like React and Next.js."
  ],
  status: "Available for new opportunities",
  availabilityText: "Available for backend architecture & leadership roles",
  location: "Dhaka, Bangladesh",
  timezone: "Asia/Dhaka",
  gmtOffset: "GMT+6",
  email: "dev.tajulislam505@gmail.com",
  phone: "01302442863",
  phoneFormatted: "01302442863",
  phoneAlt: "01302442863",
  whatsapp: "https://wa.me/8801302442863",
  portfolio: "https://devtajulportfolio.vercel.app/",
  github: "https://github.com/mdtajulislam",
  linkedin: "https://www.linkedin.com/in/mdtajulislam",
  resumeUrl: "#",
  quote: "Scalable architecture. Clean code. High-performance distributed systems.",
  stats: [
    { label: "Core Focus", value: "Backend", highlight: "System Architecture" },
    { label: "Microservices & APIs", value: "50+", highlight: "High throughput" },
    { label: "Engineering", value: "Backend Engineer", highlight: "Backbencher Studio" },
    { label: "Core Stack", value: "NestJS & Go", highlight: "PostgreSQL & Docker" }
  ]
};

export const MARQUEE_SKILLS = [
  "NestJS",
  "Go (Golang)",
  "TypeScript",
  "Node.js",
  "PostgreSQL",
  "Prisma ORM",
  "Docker & Compose",
  "Redis Caching",
  "WebRTC & LiveKit",
  "Socket.IO",
  "Microservices",
  "pgvector",
  "MongoDB",
  "Kafka & RabbitMQ",
  "Linux (Ubuntu/Arch)",
  "Nginx & Cloudflare",
  "Next.js & React",
  "REST & GraphQL APIs",
  "Clean Code & SOLID",
  "n8n Workflows"
];

export const EXPERIENCE_STATS = [
  { value: "3+", label: "Years Experience" },
  { value: "30+", label: "Projects Completed" },
  { value: "15+", label: "Technologies" },
  { value: "3", label: "Companies" }
];

export const EXPERIENCES: Experience[] = [
  {
    id: "backbencher-studio",
    role: "Backend Developer",
    company: "Backbencher Studio",
    location: "Rampura, Dhaka, Bangladesh - On-site",
    period: "Aug 2025 – Present",
    type: "Full-Time",
    order: "01",
    summary: "Contributing to high-throughput, enterprise-scale software projects, implementing robust and scalable backend systems.",
    bullets: [
      "Contributing to high-throughput, enterprise-scale software projects, implementing robust and scalable backend systems.",
      "Architecting clean RESTful APIs and optimizing backend business logic layers using NestJS and Node.js.",
      "Containerizing and managing multi-service backend environments using Docker for seamless local and production orchestration.",
      "Designing deeply optimized database schemas (PostgreSQL) and setting up indexes for high-concurrency systems."
    ],
    skills: ["NestJS", "Docker", "Node.js", "PostgreSQL", "Prisma ORM", "Redis", "Git", "REST APIs"]
  },
  {
    id: "techsoul-fullstack",
    role: "Full Stack Developer",
    company: "TechSoul",
    location: "Uttara, Dhaka, Bangladesh - On-site",
    period: "Jan 2025 – Jul 2025",
    type: "Full-Time",
    order: "02",
    summary: "Stepped into building and optimizing end-to-end web applications and distributed architectures using modern stack integrations.",
    bullets: [
      "Step into building and optimizing end-to-end web applications and distributed architectures using modern stack integrations.",
      "Architected modular backend services and designed schemas with NestJS, Prisma, and PostgreSQL.",
      "Established secure multi-tenant user authentication layers using JWT, NextAuth, and role-based access controls."
    ],
    skills: ["NestJS", "Prisma ORM", "PostgreSQL", "Next.js", "JWT", "NextAuth", "TypeScript", "RBAC"]
  },
  {
    id: "techsoul-sr-react",
    role: "Senior React Developer",
    company: "TechSoul",
    location: "Uttara, Dhaka, Bangladesh - On-site",
    period: "Dec 2024 – May 2025",
    type: "Full-Time",
    order: "03",
    summary: "Led frontend UI architecture, designing high-quality reusable component libraries and page layouts.",
    bullets: [
      "Led frontend UI architecture, designing high-quality reusable component libraries and page layouts.",
      "Analyzed render paths and optimized virtual DOM loading, improving search engine optimization and overall load times.",
      "Managed shared application state using Redux Toolkit and Zustand for fluid real-time updates."
    ],
    skills: ["React.js", "Redux Toolkit", "Zustand", "TypeScript", "UI Architecture", "Next.js", "Optimization"]
  },
  {
    id: "techsoul-react",
    role: "React Developer",
    company: "TechSoul",
    location: "Uttara, Dhaka, Bangladesh - On-site",
    period: "Jan 2024 – May 2025",
    type: "Full-Time",
    order: "04",
    summary: "Developed custom dashboard features and interactive UI widgets using React.js and JavaScript.",
    bullets: [
      "Developed custom dashboard features and interactive UI widgets using React.js and JavaScript.",
      "Integrated client-side services with backend REST APIs, managing asynchronous state transitions.",
      "Maintained cross-browser responsiveness and styling consistency across application modules."
    ],
    skills: ["React.js", "JavaScript", "REST APIs", "Tailwind CSS", "UI Widgets", "State Transitions"]
  },
  {
    id: "sbi-it-backend",
    role: "Back End Developer",
    company: "SBI IT",
    location: "Mumbai, India - Remote",
    period: "Jul 2023 – Dec 2023",
    type: "Remote",
    order: "05",
    summary: "Created and documented clean backend APIs using Node.js and Express.js framework.",
    bullets: [
      "Created and documented clean backend APIs using Node.js and Express.js framework.",
      "Designed flexible schemas and optimized aggregations inside NoSQL database (MongoDB).",
      "Collaborated with cross-functional Scrum teams, writing unit tests to meet code coverage requirements."
    ],
    skills: ["Node.js", "Express.js", "MongoDB", "NoSQL", "REST APIs", "Unit Testing", "Scrum"]
  }
];

export const PROJECTS: Project[] = [
  {
    id: "aamardokan",
    title: "AamarDokan (All-In-One Multi-Tenant SaaS Platform)",
    subtitle: "Multi-Tenant SaaS System",
    tagline: "Enterprise-grade multi-tenant SaaS ecosystem for retail, pharmacy, and schools.",
    description: "A robust, high-throughput multi-tenant SaaS ecosystem designed to streamline retail operations, pharmacy workflows, school administration, and vendor-customer relations.",
    detailedDescription: "A robust, high-throughput multi-tenant SaaS ecosystem designed to streamline retail operations, pharmacy workflows, school administration, and vendor-customer relations. Features enterprise-grade User Management & RBAC handling multi-layered hierarchies, modular microservices-ready backends for POS billing and inventory tracking, and scalable PostgreSQL database schemas with advanced indexing.",
    category: "Multi-Tenant SaaS",
    status: "Live",
    liveUrl: "https://devtajulportfolio.vercel.app/",
    githubUrl: "https://github.com/mdtajulislam",
    isPrivate: false,
    featured: true,
    role: "Lead Full-Stack Engineer & System Architect",
    period: "2025 – Present",
    tags: ["Next.js", "Nest.js", "Prisma ORM", "PostgreSQL", "Docker", "Nginx"],
    keyFeatures: [
      "Designed and implemented a complex, highly secure enterprise-grade User Management & RBAC system handling multi-layered hierarchies.",
      "Architected a modular microservices-ready backend to seamlessly handle POS billing, inventory tracking, and automated ledger updates under heavy concurrent traffic.",
      "Engineered scalable database schemas with advanced indexing strategy ensuring low-latency query execution across tenants."
    ],
    metrics: [
      { label: "Tenant Isolation", value: "Multi-Tenant" },
      { label: "Concurrency", value: "High Throughput" },
      { label: "Query Latency", value: "<50ms P95" }
    ],
    color: "#2563eb"
  },
  {
    id: "finance-management-system",
    title: "Finance Management System",
    subtitle: "Corporate Expense Ledger",
    tagline: "Secure, high-performance financial analytics and double-entry transaction ledger.",
    description: "A secure, high-performance financial analytics and transaction processing ledger tailored for corporate expense and revenue tracking.",
    detailedDescription: "A secure, high-performance financial analytics and transaction processing ledger tailored for corporate expense and revenue tracking. Features double-entry bookkeeping ledgers ensuring strict data integrity, audit trails, optimized reporting pipelines, and fault-tolerant payment gateway integrations with webhook processing modules.",
    category: "FinTech & Ledger",
    status: "Live",
    liveUrl: "https://devtajulportfolio.vercel.app/",
    githubUrl: "https://github.com/mdtajulislam",
    isPrivate: false,
    featured: true,
    role: "Senior Backend Engineer",
    period: "2025",
    tags: ["NestJS", "PostgreSQL", "Redis", "Docker"],
    keyFeatures: [
      "Architected strict double-entry bookkeeping ledgers ensuring strict data integrity, audit trails, and zero-loss financial transactions.",
      "Optimized complex aggregation and reporting pipelines, reducing database response times for large-scale financial statements.",
      "Integrated fault-tolerant third-party payment gateways and webhook processing modules."
    ],
    metrics: [
      { label: "Ledger Model", value: "Double-Entry" },
      { label: "Data Integrity", value: "100% Zero-Loss" },
      { label: "Cache Layer", value: "Redis" }
    ],
    color: "#10b981"
  },
  {
    id: "realtime-streaming-platform",
    title: "Real-Time Video & Audio Streaming Platform",
    subtitle: "Low-Latency Communications",
    tagline: "Low-latency communications supporting scalable calling and live-stream recording.",
    description: "A low-latency communications platform supporting scalable video/audio calling, conferencing, and automated live-stream recording.",
    detailedDescription: "A low-latency communications platform supporting scalable video/audio calling, conferencing, and automated live-stream recording. Built with WebRTC and LiveKit for seamless token generation, room allocation, background recording pipelines via message brokers, and decoupled event-driven workflows.",
    category: "Real-Time & Streaming",
    status: "Live",
    liveUrl: "https://devtajulportfolio.vercel.app/",
    githubUrl: "https://github.com/mdtajulislam",
    isPrivate: false,
    featured: true,
    role: "Senior Backend Engineer",
    period: "2025",
    tags: ["NestJS", "LiveKit", "WebRTC", "RabbitMQ", "Redis"],
    keyFeatures: [
      "Built the heavy-lifting orchestration backend using WebRTC/LiveKit for seamless token generation, room allocation, and session management.",
      "Implemented automated server-side recording triggers and background processing pipelines via message brokers.",
      "Designed decoupled event-driven workflows to handle high-concurrency connection states and webhooks reliably."
    ],
    metrics: [
      { label: "Stream Latency", value: "<200ms" },
      { label: "Session Dispatch", value: "Instant" },
      { label: "Message Broker", value: "RabbitMQ" }
    ],
    color: "#8b5cf6"
  },
  {
    id: "erp-system",
    title: "Enterprise Resource Planning (ERP) System",
    subtitle: "Centralized Resource ERP",
    tagline: "Centralized supply chain management, resource allocation, and departmental sync.",
    description: "An all-encompassing ERP solution designed to centralize supply chain management, resource allocation, and departmental communications.",
    detailedDescription: "An all-encompassing ERP solution designed to centralize supply chain management, resource allocation, and departmental communications. Features responsive full-stack dashboard interfaces connected to distributed backends, automated inventory/payroll workflows, and strict event logging for corporate compliance.",
    category: "Enterprise ERP",
    status: "Live",
    liveUrl: "https://devtajulportfolio.vercel.app/",
    githubUrl: "https://github.com/mdtajulislam",
    isPrivate: false,
    featured: true,
    role: "Lead Full-Stack Engineer",
    period: "2024 – 2025",
    tags: ["Next.js", "NestJS", "Prisma", "PostgreSQL", "Tailwind CSS"],
    keyFeatures: [
      "Developed the entire platform full-stack, creating responsive dashboard interfaces connected to a resilient distributed backend architecture.",
      "Automated cross-departmental inventory and payroll workflows, significantly reducing processing overhead.",
      "Implemented strict data validation layers and event logging to ensure corporate compliance and security."
    ],
    metrics: [
      { label: "Modules", value: "Supply Chain & HR" },
      { label: "Data Validation", value: "Strict ACID" },
      { label: "Architecture", value: "Distributed" }
    ],
    color: "#06b6d4"
  },
  {
    id: "gitjuris-hiring-platform",
    title: "GitJuris Hiring Platform",
    subtitle: "Automated Recruitment ATS",
    tagline: "Automated recruitment and developer assessment platform connecting tech talents.",
    description: "An automated, high-scale recruitment and developer assessment platform that connects tech talents with global enterprises.",
    detailedDescription: "An automated, high-scale recruitment and developer assessment platform connecting tech talents with global enterprises. Incorporates live programming workspace frontends integrated with sandbox execution backends, efficient applicant tracking pipelines (ATS), and asynchronous task runners.",
    category: "Recruitment & ATS",
    status: "Live",
    liveUrl: "https://devtajulportfolio.vercel.app/",
    githubUrl: "https://github.com/mdtajulislam",
    isPrivate: false,
    featured: true,
    role: "Lead Full-Stack Engineer & Architect",
    period: "2025",
    tags: ["Next.js", "NestJS", "Docker", "PostgreSQL", "Shadcn UI"],
    keyFeatures: [
      "Owned the full-stack delivery, establishing seamless integration between live programming workspace frontends and sandbox execution backends.",
      "Engineered efficient applicant tracking pipelines (ATS) with real-time status updates and customized hiring workflows for HR managers.",
      "Implemented secure authentication and asynchronous email/notification systems using distributed task runners."
    ],
    metrics: [
      { label: "Assessment", value: "Code Sandbox" },
      { label: "Pipelines", value: "Real-Time ATS" },
      { label: "Task Runners", value: "Distributed" }
    ],
    color: "#f59e0b"
  },
  {
    id: "mercury-ai-saas",
    title: "Mercury AI SaaS",
    subtitle: "Business Automation & Analytics",
    tagline: "AI-powered SaaS driving business automation, lead analytics, and submission metrics.",
    description: "An intelligent AI-powered SaaS platform driving business automation, advanced lead analytics, and interactive submission metrics.",
    detailedDescription: "An intelligent AI-powered SaaS platform driving business automation, advanced lead analytics, and interactive submission metrics. Features clean interactive visualizations coupled with heavy backend analytical aggregation pipelines, AI agents, workflow automation via n8n, and OpenAI integrations.",
    category: "AI & Automation",
    status: "Live",
    liveUrl: "https://devtajulportfolio.vercel.app/",
    githubUrl: "https://github.com/mdtajulislam",
    isPrivate: false,
    featured: true,
    role: "Lead Full-Stack Engineer & Architect",
    period: "2025",
    tags: ["Next.js", "NestJS", "Prisma", "PostgreSQL", "n8n", "OpenAI API"],
    keyFeatures: [
      "Spearheaded full-stack implementation, building clean interactive data visualizations (monthly activity graphs) coupled with heavy analytical aggregation pipelines on the backend.",
      "Integrated AI agents and workflow automation nodes to orchestrate content/asset operations and high-throughput background processing.",
      "Designed dynamic dashboard metrics built over deeply optimized database queries, delivering lightning-fast insights to SaaS users."
    ],
    metrics: [
      { label: "AI Integration", value: "OpenAI & Agents" },
      { label: "Automation", value: "n8n Workflows" },
      { label: "Analytics", value: "Sub-Second" }
    ],
    color: "#ec4899"
  }
];

export const EDUCATION: Education[] = [
  {
    id: "cs-degree",
    degree: "B.Sc. in Computer Science & Engineering",
    institution: "University Engineering Institute, Bangladesh",
    session: "Engineering Graduate",
    grade: "Major in Software Engineering & Distributed Systems",
    details: "Specialized in data structures, algorithms, database systems design, operating systems, networking, and software architecture."
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Languages & Runtimes",
    iconName: "Code",
    skills: [
      { name: "TypeScript", level: 96, category: "Languages", highlight: true },
      { name: "JavaScript (ES6+)", level: 96, category: "Languages", highlight: true },
      { name: "Go (Golang)", level: 85, category: "Languages", highlight: true },
      { name: "Node.js", level: 94, category: "Languages", highlight: true },
      { name: "SQL (PostgreSQL)", level: 92, category: "Languages", highlight: true }
    ]
  },
  {
    title: "Backend & Architecture",
    iconName: "Server",
    skills: [
      { name: "NestJS", level: 95, category: "Backend", highlight: true },
      { name: "Express.js", level: 92, category: "Backend" },
      { name: "Microservices Architecture", level: 90, category: "Backend", highlight: true },
      { name: "RESTful API Design", level: 96, category: "Backend", highlight: true },
      { name: "Prisma ORM", level: 92, category: "Backend", highlight: true },
      { name: "Clean Architecture & SOLID", level: 94, category: "Backend", highlight: true }
    ]
  },
  {
    title: "Databases & Vector Search",
    iconName: "Database",
    skills: [
      { name: "PostgreSQL", level: 94, category: "Database", highlight: true },
      { name: "Redis Caching", level: 90, category: "Database", highlight: true },
      { name: "MongoDB", level: 86, category: "Database" },
      { name: "pgvector (Vector Search)", level: 88, category: "Database", highlight: true }
    ]
  },
  {
    title: "DevOps & Infrastructure",
    iconName: "Cpu",
    skills: [
      { name: "Docker & Docker Compose", level: 92, category: "DevOps", highlight: true },
      { name: "Linux (Ubuntu / Arch)", level: 92, category: "DevOps", highlight: true },
      { name: "Portainer", level: 86, category: "DevOps" },
      { name: "Nginx & Apache", level: 88, category: "DevOps" },
      { name: "PM2 & Cloudflare", level: 88, category: "DevOps" },
      { name: "Git & CI/CD", level: 94, category: "DevOps" }
    ]
  },
  {
    title: "Real-time & Messaging",
    iconName: "Radio",
    skills: [
      { name: "WebRTC", level: 86, category: "RealTime", highlight: true },
      { name: "LiveKit", level: 88, category: "RealTime", highlight: true },
      { name: "Socket.IO", level: 92, category: "RealTime", highlight: true },
      { name: "Kafka & RabbitMQ", level: 82, category: "RealTime" },
      { name: "Firebase Cloud Messaging", level: 85, category: "RealTime" },
      { name: "n8n Automation", level: 85, category: "Automation" }
    ]
  },
  {
    title: "Frontend & UI Ecosystem",
    iconName: "Layout",
    skills: [
      { name: "React.js", level: 90, category: "Frontend" },
      { name: "Next.js", level: 90, category: "Frontend", highlight: true },
      { name: "Tailwind CSS & Shadcn UI", level: 92, category: "Frontend" },
      { name: "Redux Toolkit & Zustand", level: 88, category: "Frontend" },
      { name: "Three.js", level: 75, category: "Frontend" }
    ]
  }
];

export const ENGINEERING_MINDSET: EngineeringMindsetPrinciple[] = [
  {
    id: "clean-architecture",
    title: "Clean Code & SOLID Architecture",
    subtitle: "Built for maintainability, designed to endure",
    description: "Writing strictly decoupled, modular backend services with well-defined domain boundaries, dependency injection, and comprehensive interface contracts.",
    iconName: "ShieldCheck",
    bullets: [
      "Strict adherence to SOLID principles and Clean Architecture in NestJS and Go.",
      "Comprehensive error handling, request validation pipes, and uniform API envelopes.",
      "Strict data integrity checks and transactional atomicity (ACID) across services."
    ]
  },
  {
    id: "performance-scalability",
    title: "High Performance & Scalability",
    subtitle: "Low latency and high throughput at scale",
    description: "Obsessively optimizing database execution plans, query indexing, distributed caching, and connection pooling to keep P95 latency under 50ms.",
    iconName: "Zap",
    bullets: [
      "Intelligent indexing and query planning in PostgreSQL for high concurrency.",
      "Multi-layered Redis caching for frequently accessed data and session stores.",
      "Asynchronous background worker queues preventing API thread-pool blocking."
    ]
  },
  {
    id: "devops-reliability",
    title: "DevOps & Infrastructure Rigor",
    subtitle: "Containerized, automated, and observable",
    description: "Treating infrastructure as first-class code with Docker, automated deployment scripts, Portainer, and resilient reverse-proxy configurations.",
    iconName: "Cpu",
    bullets: [
      "Multi-stage Docker builds ensuring ultra-small, secure production container images.",
      "Nginx reverse proxies with SSL termination, HTTP/2, and Cloudflare protection.",
      "Automated workflow automations using n8n and event triggers."
    ]
  },
  {
    id: "technical-leadership",
    title: "Technical Team Leadership",
    subtitle: "Empowering developers to build great software",
    description: "Leading engineering sprints with clear specifications, constructive PR code reviews, architectural documentation, and engineering mentorship.",
    iconName: "Layers",
    bullets: [
      "Translating complex product requirements into clear backend tasks and schemas.",
      "Standardizing Git branching, semantic versioning, and API documentation.",
      "Fostering continuous learning and collaborative problem-solving across teams."
    ]
  }
];
