import mongoose from "mongoose";
import dotenv from "dotenv";

// Import All Models
import { Skill, Project, DeveloperService } from "./backend/models/Developer.js";
import { Gallery, Tool, DesignerService } from "./backend/models/Designer.js";
import { Sketch, Book, Thought } from "./backend/models/Creator.js";
import { Snippet, Roadmap, Article } from "./backend/models/Blogger.js";
import Profile from "./backend/models/Profile.js"; // <--- Imported Profile Model

dotenv.config();

// --- DATA SETS ---

// 1. PROFILE DATA (Singleton)
const profileData = {
  header: {
    name: 'Khilesh T.',
    role: 'FULL_STACK_ARCHITECT',
    // Using a placeholder image for seeding
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
  },
  stats: [
    { label: 'Experience', value: 'Lvl. 24' },
    { label: 'Projects', value: '12+' },
  ],
  contact: [
    { icon: 'Mail', label: 'Email', text: 'khilesh@dev.com', href: 'mailto:khilesh@dev.com' },
    { icon: 'MapPin', label: 'Location', text: 'Udaipur, India', href: 'http://maps.google.com' },
    { icon: 'Github', label: 'GitHub', text: '/khilesh-dev', href: 'https://github.com/khilesh-dev' },
    { icon: 'Linkedin', label: 'LinkedIn', text: '/in/khilesh', href: 'https://linkedin.com/in/khilesh' },
    { icon: 'Globe', label: 'Website', text: 'khilesh.dev', href: 'https://khilesh.dev' },
  ],
  resume: {
    label: 'Download Resume',
    href: '#',
  },
  sections: {
    manifesto: {
      meta: { id: 'SEC_01', title: 'Entity Core', icon: 'Terminal' },
      paragraphs: [
        'I am a Product Engineer with a passion for building scalable, user-centric digital ecosystems. My philosophy is simple: Code is Art. Whether I am architecting a microservice or sketching a UI, I strive for precision, efficiency, and aesthetic excellence.',
        'Currently building the future of banking tech at Edgeverve.',
      ],
      highlights: ['Product Engineer', 'Code is Art'],
    },
    experience: {
      meta: { id: 'SEC_02', title: 'Op_History', icon: 'Briefcase' },
      items: [
        { role: 'Product Engineer', company: 'Edgeverve', date: 'AUG 2025 - PRESENT', desc: 'Spearheading the development of next-gen AI modules. Optimizing microservices for high-throughput banking transactions.' },
        { role: 'Intern', company: 'Infosys Finacle', date: 'FEB 2025 - JUL 2025', desc: 'Contributed to the core banking solution modernization. Migrated legacy UI components to Angular and React.' },
        { role: 'Trainee', company: 'Infosys Finacle', date: 'MAR 2024 - JAN 2025', desc: 'Completed intensive training in full-stack development, cloud infrastructure, and agile methodologies.' },
      ],
    },
    education: {
      meta: { id: 'SEC_03', title: 'Academics', icon: 'GraduationCap' },
      items: [
        { degree: 'B.Tech in Computer Science', school: 'Techno India NJR', date: '2020 - 2024', desc: 'Specialized in Artificial Intelligence and Machine Learning. Led the college coding club.' },
        { degree: 'B.Tech in Computer Science', school: 'Techno India NJR', date: '2020 - 2024', desc: 'Specialized in Artificial Intelligence and Machine Learning. Led the college coding club.' },
        { degree: 'B.Tech in Computer Science', school: 'Techno India NJR', date: '2020 - 2024', desc: 'Specialized in Artificial Intelligence and Machine Learning. Led the college coding club.' }
      ],
    },
    skills: {
      meta: { id: 'SEC_04', title: 'Capabilities', icon: 'Zap' },
      items: [
        { name: 'React / Next', val: 90 },
        { name: 'Node.js', val: 85 },
        { name: 'System Design', val: 75 },
        { name: 'Python / AI', val: 80 },
      ],
    },
    hobbies: {
      meta: { id: 'SEC_05', title: 'Peripherals', icon: 'Heart' },
      items: [
        { name: 'Photography', icon: 'Camera' },
        { name: 'Sketching', icon: 'PenTool' },
        { name: 'Sci-Fi Books', icon: 'BookOpen' },
        { name: 'Indie Music', icon: 'Music' },
        { name: 'Chess', icon: 'Cpu' },
      ],
    },
    techStack: {
      meta: { id: 'SEC_06', title: 'Tech Arsenal', icon: 'Code' },
      items: [
        { title: 'MERN Stack', subtitle: 'Full Stack Dev', icon: 'Layers' },
        { title: 'Spring Boot', subtitle: 'Enterprise Backend', icon: 'Coffee' },
        { title: 'Figma', subtitle: 'UI/UX Wireframing', icon: 'Layout' },
        { title: 'Blender', subtitle: '3D Modeling', icon: 'Box' },
      ],
    },
    focus: {
      meta: { id: 'SEC_07', title: 'Active Protocols', icon: 'TrendingUp' },
      items: [
        { name: 'Generative AI', status: 'Researching', icon: 'Zap' },
        { name: 'System Architecture', status: 'Building', icon: 'TrendingUp' },
        { name: 'Cloud Native', status: 'Deploying', icon: 'Cloud' },
      ],
    },
    worldview: {
      meta: { id: 'SEC_08', title: 'Worldview', icon: 'Compass' },
      text: 'I see the world as a boundless playground for creation. I love the grind of working, the thrill of learning new things, and the freedom of exploring the unknown. To me, the journey never ends—there is simply too much in this world to see, build, and experience to ever stop moving.',
    },
  },
};

// 2. DEVELOPER DATA
const skills = [
  // --- LANGUAGES ---
  { category: "LANGUAGES", name: "JavaScript (ES6+)", icon: "Code2", level: 5, xp: "6 Yrs" },
  { category: "LANGUAGES", name: "TypeScript", icon: "Hash", level: 5, xp: "4 Yrs" },
  { category: "LANGUAGES", name: "Python", icon: "Terminal", level: 4, xp: "3 Yrs" },
  { category: "LANGUAGES", name: "Go (Golang)", icon: "Code2", level: 3, xp: "2 Yrs" },
  { category: "LANGUAGES", name: "Rust", icon: "Settings", level: 2, xp: "1 Yr" },
  { category: "LANGUAGES", name: "SQL (Postgres)", icon: "Database", level: 4, xp: "4 Yrs" },
  { category: "LANGUAGES", name: "GraphQL", icon: "Share2", level: 4, xp: "3 Yrs" },

  // --- FRAMEWORKS ---
  { category: "FRAMEWORKS", name: "React 18", icon: "Globe", level: 5, xp: "5 Yrs" },
  { category: "FRAMEWORKS", name: "Next.js 14", icon: "Globe", level: 5, xp: "3 Yrs" },
  { category: "FRAMEWORKS", name: "Node.js", icon: "Server", level: 5, xp: "5 Yrs" },
  { category: "FRAMEWORKS", name: "Express", icon: "Server", level: 5, xp: "5 Yrs" },
  { category: "FRAMEWORKS", name: "Tailwind CSS", icon: "Layout", level: 5, xp: "4 Yrs" },
  { category: "FRAMEWORKS", name: "NestJS", icon: "Box", level: 4, xp: "2 Yrs" },
  { category: "FRAMEWORKS", name: "Three.js", icon: "Box", level: 3, xp: "1 Yr" },
  { category: "FRAMEWORKS", name: "React Native", icon: "Smartphone", level: 4, xp: "2 Yrs" },

  // --- TOOLS ---
  { category: "TOOLS", name: "Git / GitHub", icon: "GitBranch", level: 5, xp: "6 Yrs" },
  { category: "TOOLS", name: "Docker", icon: "Layers", level: 4, xp: "3 Yrs" },
  { category: "TOOLS", name: "Kubernetes", icon: "Cloud", level: 3, xp: "2 Yrs" },
  { category: "TOOLS", name: "AWS (EC2, S3)", icon: "Cloud", level: 4, xp: "3 Yrs" },
  { category: "TOOLS", name: "Redis", icon: "Database", level: 4, xp: "3 Yrs" },
  { category: "TOOLS", name: "Figma", icon: "Figma", level: 4, xp: "4 Yrs" },
  { category: "TOOLS", name: "Linux/Bash", icon: "Terminal", level: 4, xp: "5 Yrs" },
  { category: "TOOLS", name: "Jest / Testing", icon: "CheckCircle", level: 4, xp: "3 Yrs" },
];

const projects = [
  {
    title: "Lumina E-Commerce",
    desc: "A headless e-commerce solution featuring real-time inventory tracking, Stripe payments, and a custom CMS for product management.",
    tech: ["Next.js", "TypeScript", "Prisma", "Stripe"],
    year: "2024",
    image: "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Nexus AI Chat",
    desc: "An intelligent support assistant that uses RAG (Retrieval-Augmented Generation) to answer user queries based on custom documentation.",
    tech: ["Python", "LangChain", "OpenAI", "Pinecone"],
    year: "2024",
    image: "https://images.unsplash.com/photo-1676299081847-824916de030a?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "CoinDash Crypto",
    desc: "A high-performance dashboard for tracking 500+ cryptocurrencies with WebSocket integration for live price updates.",
    tech: ["React", "Redux Toolkit", "WebSockets", "Recharts"],
    year: "2023",
    image: "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "TaskFlow Pro",
    desc: "A collaborative project management tool similar to Trello, featuring drag-and-drop kanban boards and team permissions.",
    tech: ["Vue.js", "Firebase", "Tailwind"],
    year: "2023",
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "DevSocial",
    desc: "A social network specifically for developers to share code snippets and collaborate on open-source ideas.",
    tech: ["MERN Stack", "JWT", "Cloudinary"],
    year: "2022",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "HealthTrack",
    desc: "Mobile application for tracking workouts and nutrition plans with Apple Health integration.",
    tech: ["React Native", "Expo", "Node.js"],
    year: "2022",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800"
  }
];

const devServices = [
  { title: "Full Stack Architecture", icon: "Layers", desc: "End-to-end development of scalable web applications using modern MERN or Next.js stacks.", tags: ["React", "Node", "Postgres"] },
  { title: "API Design & Integration", icon: "Server", desc: "Building robust RESTful and GraphQL APIs with comprehensive documentation and security.", tags: ["Express", "Apollo", "Swagger"] },
  { title: "Cloud Infrastructure", icon: "Cloud", desc: "Setting up CI/CD pipelines, Docker containers, and AWS serverless architecture.", tags: ["AWS", "Docker", "GitHub Actions"] },
  { title: "Performance Optimization", icon: "Zap", desc: "Auditing and improving web vitals, server response times, and database query efficiency.", tags: ["SEO", "Caching", "Redis"] }
];

// 3. DESIGNER DATA
const gallery = [
  { title: "Neon SaaS Dashboard", category: "UI Design", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800", tags: ["Dark Mode", "Dashboard", "Figma"], link: "https://dribbble.com" },
  { title: "Fintech Mobile App", category: "Mobile", image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&q=80&w=800", tags: ["Finance", "Clean", "iOS"], link: "https://behance.net" },
  { title: "Travel Agency Hero", category: "Web Design", image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=800", tags: ["Travel", "Landing Page"], link: "#" },
  { title: "Modern Brand Identity", category: "Branding", image: "https://images.unsplash.com/photo-1634942537034-2531766767d1?auto=format&fit=crop&q=80&w=800", tags: ["Logo", "Typography", "Print"], link: "#" },
  { title: "E-Sports Tournament", category: "Web Design", image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800", tags: ["Gaming", "Bold"], link: "#" },
  { title: "Medical Portal", category: "UI Design", image: "https://images.unsplash.com/photo-1576091160550-217358c7db81?auto=format&fit=crop&q=80&w=800", tags: ["Healthcare", "Clean"], link: "#" }
];

const tools = [
  { name: "Figma", icon: "Figma", level: "Expert" },
  { name: "Adobe XD", icon: "PenTool", level: "Advanced" },
  { name: "Photoshop", icon: "Image", level: "Intermediate" },
  { name: "Illustrator", icon: "PenTool", level: "Intermediate" },
  { name: "Blender", icon: "Box", level: "Beginner" },
  { name: "After Effects", icon: "Video", level: "Intermediate" }
];

const designServices = [
  { title: "UI/UX Design", icon: "PenTool", desc: "Crafting intuitive and aesthetically pleasing user interfaces for web and mobile.", items: ["Wireframing", "Prototyping", "User Research"] },
  { title: "Design Systems", icon: "Layout", desc: "Creating scalable component libraries to ensure consistency across products.", items: ["Documentation", "Tokens", "Accessibility"] },
  { title: "Brand Identity", icon: "Star", desc: "Developing complete visual identities including logos, typography, and color palettes.", items: ["Logo Design", "Brand Guidelines", "Social Assets"] }
];

// 4. CREATOR DATA
const sketches = [
  { title: "Cyberpunk City", date: "Jan 2024", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800" },
  { title: "Charcoal Portrait", date: "Feb 2024", img: "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&q=80&w=800" },
  { title: "Abstract Flow", date: "Mar 2024", img: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=800" },
  { title: "Mechanical Study", date: "Apr 2024", img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800" },
  { title: "Nature Sketch", date: "May 2024", img: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=800" },
  { title: "Urban Perspective", date: "Jun 2024", img: "https://images.unsplash.com/photo-1580196924252-5c82db59e502?auto=format&fit=crop&q=80&w=800" }
];

const books = [
  { title: "The Clean Coder", author: "Robert Martin", desc: "A code of conduct for professional programmers.", cover: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=800" },
  { title: "Design of Everyday Things", author: "Don Norman", desc: "Understanding cognitive psychology in design.", cover: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800" },
  { title: "Atomic Habits", author: "James Clear", desc: "An easy & proven way to build good habits.", cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800" },
  { title: "Deep Work", author: "Cal Newport", desc: "Rules for focused success in a distracted world.", cover: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&q=80&w=800" }
];

const thoughts = [
  { date: "10 Oct", text: "Consistency is better than intensity. Small daily improvements compound over time." },
  { date: "12 Oct", text: "Code is poetry written for machines, but read by humans. Write it beautifully." },
  { date: "15 Oct", text: "Design is not just what it looks like and feels like. Design is how it works." },
  { date: "20 Oct", text: "The best way to predict the future is to create it." },
  { date: "22 Oct", text: "Simplicity is the ultimate sophistication in software architecture." },
  { date: "25 Oct", text: "Don't comment bad code — rewrite it." }
];

// 5. BLOGGER DATA
const snippets = [
  {
    cat: "JavaScript",
    title: "Debounce Function",
    code: "function debounce(func, delay) {\n  let timer;\n  return (...args) => {\n    clearTimeout(timer);\n    timer = setTimeout(() => func(...args), delay);\n  };\n}"
  },
  {
    cat: "React",
    title: "useFetch Hook",
    code: "const useFetch = (url) => {\n  const [data, setData] = useState(null);\n  const [loading, setLoading] = useState(true);\n  useEffect(() => {\n    fetch(url)\n      .then(res => res.json())\n      .then(data => {\n        setData(data);\n        setLoading(false);\n      });\n  }, [url]);\n  return { data, loading };\n};"
  },
  {
    cat: "CSS",
    title: "Perfect Center",
    code: ".center {\n  display: grid;\n  place-items: center;\n  min-height: 100vh;\n}"
  },
  {
    cat: "Utils",
    title: "Random Color",
    code: "const getRandomColor = () => {\n  return '#' + Math.floor(Math.random()*16777215).toString(16);\n}"
  },
  {
    cat: "Utils",
    title: "Slugify String",
    code: "const slugify = (str) =>\n  str.toLowerCase()\n    .trim()\n    .replace(/[^\\w\\s-]/g, '')\n    .replace(/[\\s_-]+/g, '-')\n    .replace(/^-+|-+$/g, '');"
  },
  {
    cat: "Regex",
    title: "Email Validation",
    code: "const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$/;"
  }
];

const roadmaps = [
  {
    title: "MERN Stack Path",
    level: "Full Stack",
    steps: [
      { title: "HTML5 & CSS3", desc: "Semantic HTML, Flexbox, Grid, and Responsive Design principles." },
      { title: "JavaScript ES6+", desc: "Arrow functions, Async/Await, DOM manipulation, and Fetch API." },
      { title: "React.js", desc: "Component lifecycle, Hooks (useState, useEffect), and Context API." },
      { title: "Node.js & Express", desc: "Building RESTful APIs, Middleware, and JWT Authentication." },
      { title: "MongoDB & Mongoose", desc: "NoSQL Database design, Schemas, and Aggregation pipelines." },
      { title: "Deployment", desc: "Deploying to Vercel/Render, CI/CD, and Environment management." }
    ]
  },
  {
    title: "DevOps Basics",
    level: "Operations",
    steps: [
      { title: "Linux Fundamentals", desc: "File systems, permissions, Bash scripting, and SSH." },
      { title: "Docker", desc: "Containerization, Dockerfiles, and Docker Compose." },
      { title: "CI/CD", desc: "Automating tests and deployment using GitHub Actions." },
      { title: "AWS Essentials", desc: "EC2, S3, RDS, and basic networking (VPC)." }
    ]
  },
  {
    title: "UI/UX Designer Path",
    level: "Design",
    steps: [
      { title: "Design Fundamentals", desc: "Color theory, Typography, Spacing, and Hierarchy." },
      { title: "Figma Mastery", desc: "Auto-layout, Components, Variants, and Prototyping." },
      { title: "UX Research", desc: "User personas, User journeys, and Usability testing." },
      { title: "Design Systems", desc: "Building scalable atomic design systems." }
    ]
  }
];

const articles = [
  {
    title: "Mastering React Server Components",
    date: "OCT 2024",
    tags: ["React", "Performance", "Next.js"],
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
    desc: "A deep dive into the architecture of RSCs, how they differ from traditional SSR, and why they change the game for data fetching.",
    content: `React Server Components (RSC) represent a paradigm shift in how we build React applications. Unlike traditional SSR, RSCs never hydrate on the client, resulting in zero bundle size for those components.

## The Problem with Client-Side Fetching

In traditional React, we often face the 'waterfall' problem where a parent component fetches data, renders, and then a child component fetches more data. This creates a staggered loading experience.

## Why RSC?

- Zero Bundle Size for Server Components
- Direct Backend Access (DB)
- Automatic Code Splitting
- Improved Initial Page Load

\`\`\`jsx
// Server Component
async function Note({ id }) {
  // Direct DB access!
  const note = await db.notes.get(id);
  return <div className='note'>{note.text}</div>;
}
\`\`\``
  },
  {
    title: "The Microservices Handbook",
    date: "SEP 2024",
    tags: ["Backend", "Architecture", "Docker"],
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    desc: "A full technical guide to designing, containerizing, deploying and operating microservices with Node.js, Docker, and Kubernetes.",
    // CONVERTED TO MARKDOWN STRING
    content: `## What Are Microservices?

Microservices are small, independently deployable services...

| Aspect | Monolith | Microservices |
| :--- | :--- | :--- |
| Deployment | Single unit | Many services |
| Scaling | Whole app | Per service |

\`\`\`bash
docker compose up -d
\`\`\`

> If you can't deploy a monolith reliably, microservices will hurt.
> — Someone wise`
  }
];

// --- SEEDER FUNCTION ---

const importData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("🔌 MongoDB Connected for Seeding...");

    // 1. WIPE OLD DATA
    console.log("🧹 Clearing old data...");
    await Skill.deleteMany();
    await Project.deleteMany();
    await DeveloperService.deleteMany();

    await Gallery.deleteMany();
    await Tool.deleteMany();
    await DesignerService.deleteMany();

    await Sketch.deleteMany();
    await Book.deleteMany();
    await Thought.deleteMany();

    await Snippet.deleteMany();
    await Roadmap.deleteMany();
    await Article.deleteMany();

    await Profile.deleteMany(); // <--- Clear Profile

    // 2. INSERT NEW DATA
    console.log("🌱 Inserting new data...");

    // Profile (Singleton)
    await Profile.create(profileData); // <--- Insert Profile

    // Developer
    await Skill.insertMany(skills);
    await Project.insertMany(projects);
    await DeveloperService.insertMany(devServices);

    // Designer
    await Gallery.insertMany(gallery);
    await Tool.insertMany(tools);
    await DesignerService.insertMany(designServices);

    // Creator
    await Sketch.insertMany(sketches);
    await Book.insertMany(books);
    await Thought.insertMany(thoughts);

    // Blogger
    await Snippet.insertMany(snippets);
    await Roadmap.insertMany(roadmaps);
    await Article.insertMany(articles);

    console.log("✅ Data Imported Successfully!");
    process.exit();

  } catch (error) {
    console.error(`❌ Error with data import: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Skill.deleteMany();
    await Project.deleteMany();
    await DeveloperService.deleteMany();
    await Gallery.deleteMany();
    await Tool.deleteMany();
    await DesignerService.deleteMany();
    await Sketch.deleteMany();
    await Book.deleteMany();
    await Thought.deleteMany();
    await Snippet.deleteMany();
    await Roadmap.deleteMany();
    await Article.deleteMany();
    await Profile.deleteMany(); // <--- Destroy Profile

    console.log("💥 Data Destroyed!");
    process.exit();
  } catch (error) {
    console.error(`❌ Error destroying data: ${error.message}`);
    process.exit(1);
  }
};

// Check command line arguments
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}