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
    name: 'Khilesh Thakur',
    role: 'FULL STACK ARCHITECT',
    avatar: 'https://res.cloudinary.com/ddzua6arv/image/upload/v1765533015/Profile_iewrwq.png',
  },
  stats: [
    { label: 'Experience', value: 'JL. 6' },
    { label: 'Projects', value: '12+' },
  ],
  contact: [
    { icon: 'Mail', label: 'Email', text: 'khilesh@dev.com', href: 'mailto:omthakur6640@gmail.com' },
    { icon: 'MapPin', label: 'Location', text: 'Bangalore, India', href: 'https://www.google.com/maps/@12.8452076,77.6421572,15z?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D' },
    { icon: 'Github', label: 'GitHub', text: '/khilesh-dev', href: 'https://github.com/KhileshThakur' },
    { icon: 'Linkedin', label: 'LinkedIn', text: '/in/khilesh', href: 'https://www.linkedin.com/in/khilesh-thakur-a09865228' },
    { icon: 'Globe', label: 'Website', text: 'khilesh.dev', href: 'https://khileshweb.onrender.com/' },
  ],
  resume: {
    label: 'Download Resume',
    href: 'https://drive.google.com/file/d/1IcP5bF1_K8WjgzI0a2KZC4WlK_y0t9K4/view?usp=drive_link',
  },
  sections: {
    manifesto: {
      meta: { id: 'SEC_01', title: 'Entity Core', icon: 'Terminal' },
      paragraphs: [
        'Powered by code, design, and a creative workflow that includes writing, sketching, and documenting tech. crafting systems, interfaces, and content that stay clean, intentional, and technically precise.',
        'Strong ideas deserve clean execution and that’s my default.', 'Current Position: Product Enginner @Edgeverve'
      ],
      highlights: [
        'Product Engineer',
        'Design-Led',
        'Digital Creator',
        'Tech Writer'
      ]
    },
    experience: {
      meta: { id: 'SEC_04', title: 'Op_History', icon: 'Briefcase' },
      items: [
        {
          role: 'Product Engineer',
          company: 'Edgeverve',
          date: 'AUG 2025 - PRESENT',
          desc: 'Working on modern banking features, improving backend services, and helping move systems to more reliable and scalable setups.'
        },
        {
          role: 'Intern',
          company: 'Infosys Finacle',
          date: 'FEB 2025 - JUL 2025',
          desc: 'Worked on core banking modules and helped update parts of the old Finacle codebase used by large banks.'
        },
        {
          role: 'Trainee',
          company: 'Infosys Finacle',
          date: 'MAR 2024 - JAN 2025',
          desc: 'Trained in full-stack development, cloud basics, deployments, testing, and working with multiple programming languages through hands-on tasks.'
        },
      ]
    },
    education: {
      meta: { id: 'SEC_05', title: 'Academics', icon: 'GraduationCap' },
      items: [
        {
          degree: 'B.Tech in Computer Science',
          school: 'D. Y. Patil Institute of Technology - Pimpri, Pune',
          date: '2021 - 2025',
          desc: 'Graduated with a 9.32 CGPA. Ranked 2nd in the first year with a 9.98 SGPA. Focused on web development along with ML, data structures, software engineering, HCI, cybersecurity, and blockchain.'
        },
        {
          degree: 'HSC - Maharashtra State Board',
          school: 'Dhote Bandhu Science College, Gondia',
          date: '2019 - 2020',
          desc: 'Scored 85.85% with 100/100 in Mathematics. Ranked in the top 1% of the college. Subjects included Mathematics, Physics, Chemistry, Biology, English, and Hindi.'
        },
        {
          degree: 'SSC - Maharashtra State Board',
          school: 'Saraswati Vidyalaya - Goregaon, Gondia',
          date: '2017 - 2018',
          desc: 'Scored 91% with 100/100 in Mathematics. Ranked 1st in school. Subjects included Mathematics, Science, Social Science, English, Hindi, and Marathi.'
        }
      ]
    },
    skills: {
      meta: { id: 'SEC_06', title: 'Capabilities', icon: 'Zap' },
      items: [
        { name: 'React', val: 75 },
        { name: 'Node.js', val: 95 },
        { name: 'Spring Boot', val: 65 },
        { name: 'Canva / Figma', val: 90 },
      ],
    },
    hobbies: {
      meta: { id: 'SEC_07', title: 'Peripherals', icon: 'Heart' },
      items: [
        { name: 'Writting', icon: 'BookMarked' },
        { name: 'Sketching', icon: 'PenTool' },
        { name: 'Cooking', icon: 'ChefHat' },
        { name: 'Movies', icon: 'Clapperboard' },
        { name: 'Indie Music', icon: 'ListMusic' },
        { name: 'Trekking', icon: 'MountainSnow' },
        { name: 'Gaming', icon: 'Gamepad2' },
      ],
    },
    techStack: {
      meta: { id: 'SEC_02', title: 'Tech Arsenal', icon: 'Code' },
      items: [
        {
          title: 'MERN Stack',
          subtitle: 'Full-Stack Web Development',
          icon: 'Layers'
        },
        {
          title: 'Java Development',
          subtitle: 'Spring Boot, Microservices & Frameworks',
          icon: 'Leaf'
        },
        {
          title: 'Figma',
          subtitle: 'UI/UX Design & Prototyping',
          icon: 'Figma'
        },
        {
          title: 'Software Testing',
          subtitle: 'Unit & Integration Testing, Test Coverage',
          icon: 'FlaskConical'
        },
        {
          title: 'Cloud & Containers',
          subtitle: 'Kubernetes & Docker Basics',
          icon: 'CloudCog'
        },
      ]
    },
    focus: {
      meta: { id: 'SEC_03', title: 'Active Protocols', icon: 'TrendingUp' },
      items: [
        { name: 'DS & ML', status: 'Practicing', icon: 'BrainCircuit' },
        { name: 'Generative AI', status: 'Researching', icon: 'Sparkles' },
        { name: 'System Design', status: 'Building', icon: 'MonitorCog' },
        { name: 'DevOps & CI/CD', status: 'Automating', icon: 'Workflow' },
      ]
    },
    worldview: {
      meta: { id: 'SEC_08', title: 'Worldview', icon: 'Compass' },
      text: `The world is my sandbox. I’m drawn to the new, the crazy, and the cool—whether it's cutting-edge tech or beautiful design. I thrive on the grind and the freedom of exploration. But I know I've barely scratched the surface; I’m currently playing in a pond, chasing the river to reach the ocean. The journey never ends because there’s just too much cool stuff to build to ever stand still.`
    },
  },
};

// 2. DEVELOPER DATA
const skills = [
  // --- LANGUAGES ---
  { category: "LANGUAGES", name: "Java", icon: "skill-icons:java-dark", level: 4, xp: "2 Yrs" },
  { category: "LANGUAGES", name: "Python", icon: "skill-icons:python-dark", level: 4, xp: "2 Yrs" },
  { category: "LANGUAGES", name: "C", icon: "skill-icons:c", level: 2, xp: "2 Yrs" },
  { category: "LANGUAGES", name: "C++", icon: "skill-icons:cpp", level: 3, xp: "3 Yrs" },
  { category: "LANGUAGES", name: "JavaScript", icon: "skill-icons:javascript", level: 4, xp: "4 Yrs" },
  { category: "LANGUAGES", name: "PHP", icon: "skill-icons:php-dark", level: 2, xp: "1 Yrs" },
  { category: "LANGUAGES", name: "HTML", icon: "skill-icons:html", level: 5, xp: "4 Yrs" },
  { category: "LANGUAGES", name: "CSS", icon: "skill-icons:css", level: 5, xp: "4 Yrs" },

  // --- FRAMEWORKS & LIBS ---
  { category: "FRAMEWORKS & LIBS", name: "React", icon: "skill-icons:react-dark", level: 4, xp: "3 Yrs" },
  { category: "FRAMEWORKS & LIBS", name: "Node.js", icon: "skill-icons:nodejs-dark", level: 4, xp: "3 Yrs" },
  { category: "FRAMEWORKS & LIBS", name: "Express", icon: "skill-icons:expressjs-dark", level: 4, xp: "3 Yrs" },
  { category: "FRAMEWORKS & LIBS", name: "Spring Boot", icon: "devicon:spring", level: 3, xp: "1 Yrs" },
  { category: "FRAMEWORKS & LIBS", name: "Bootstrap", icon: "skill-icons:bootstrap", level: 5, xp: "3 Yrs" },
  { category: "FRAMEWORKS & LIBS", name: "Pug", icon: "skill-icons:pug-dark", level: 3, xp: "2 Yrs" },
  { category: "FRAMEWORKS & LIBS", name: "Socket.io", icon: "logos:socket-io", level: 2, xp: "1 Yrs" },
  { category: "FRAMEWORKS & LIBS", name: "Mongoose", icon: "devicon:mongoose", level: 4, xp: "3 Yrs" },

  // --- DATABASES ---
  { category: "DATABASES", name: "MySQL", icon: "skill-icons:mysql-dark", level: 4, xp: "4 Yrs" },
  { category: "DATABASES", name: "PostgreSQL", icon: "skill-icons:postgresql-dark", level: 4, xp: "3 Yrs" },
  { category: "DATABASES", name: "MongoDB", icon: "skill-icons:mongodb", level: 4, xp: "3 Yrs" },

  // --- DEVOPS & TOOLS ---
  { category: "DEVOPS & TOOLS", name: "Git", icon: "skill-icons:git", level: 4, xp: "3 Yrs" },
  { category: "DEVOPS & TOOLS", name: "GitHub", icon: "skill-icons:github-dark", level: 5, xp: "3 Yrs" },
  { category: "DEVOPS & TOOLS", name: "GitHub Actions", icon: "skill-icons:githubactions-dark", level: 2, xp: "1 Yrs" },
  { category: "DEVOPS & TOOLS", name: "Docker", icon: "skill-icons:docker", level: 2, xp: "1 Yrs" },
  { category: "DEVOPS & TOOLS", name: "Kubernetes", icon: "skill-icons:kubernetes", level: 2, xp: "1 Yrs" },
  { category: "DEVOPS & TOOLS", name: "Postman", icon: "skill-icons:postman", level: 5, xp: "3 Yrs" },
  { category: "DEVOPS & TOOLS", name: "Vite", icon: "skill-icons:vite-dark", level: 4, xp: "2 Yrs" },
  { category: "DEVOPS & TOOLS", name: "NPM", icon: "skill-icons:npm-dark", level: 4, xp: "3 Yrs" },
  { category: "DEVOPS & TOOLS", name: "Yarn", icon: "skill-icons:yarn-dark", level: 3, xp: "3 Yrs" },
  { category: "DEVOPS & TOOLS", name: "Linux/Unix", icon: "skill-icons:linux-dark", level: 3, xp: "2 Yrs" },
  { category: "TESTING", name: "Jest", icon: "skill-icons:jest", level: 3, xp: "1 Yrs" },
  { category: "TESTING", name: "JUnit", icon: "devicon:junit", level: 3, xp: "1 Yrs" },
  { category: "TESTING", name: "JaCoCo", icon: "vscode-icons:folder-type-coverage", level: 3, xp: "1 Yrs" },

  // --- PLATFORMS & IDE ---
  { category: "PLATFORMS & IDE", name: "VS Code", icon: "skill-icons:vscode-dark", level: 5, xp: "5 Yrs" },
  { category: "PLATFORMS & IDE", name: "IntelliJ", icon: "skill-icons:idea-dark", level: 4, xp: "1 Yrs" },
  { category: "PLATFORMS & IDE", name: "Eclipse", icon: "skill-icons:eclipse-dark", level: 3, xp: "2 Yrs" },
  { category: "PLATFORMS & IDE", name: "Figma", icon: "skill-icons:figma-dark", level: 5, xp: "3 Yrs" },
  { category: "PLATFORMS & IDE", name: "Canva", icon: "devicon:canva", level: 4, xp: "4 Yrs" },
  { category: "PLATFORMS & IDE", name: "Netlify", icon: "skill-icons:netlify-dark", level: 3, xp: "3 Yrs" },
  { category: "PLATFORMS & IDE", name: "Vercel", icon: "skill-icons:vercel-dark", level: 4, xp: "3 Yrs" },
  { category: "PLATFORMS & IDE", name: "Render", icon: "simple-icons:render", level: 5, xp: "3 Yrs" },
  { category: "PLATFORMS & IDE", name: "Google Apps Script", icon: "logos:google-developers", level: 3, xp: "2 Yrs" },
  { category: "PLATFORMS & IDE", name: "MS Office", icon: "logos:microsoft-icon", level: 5, xp: "8 Yrs" }
];

const projects = [
  {
    title: "CS Realm",
    desc: "A library management system with CRUD operations, allowing users to book and return books, featuring separate admin and user sections.",
    tech: ["Node", "Express", "Pug", "MongoDB"],
    year: "2022",
    image: "https://res.cloudinary.com/ddzua6arv/image/upload/v1743332358/uploads/dpgmhie19yizkaidwnvq.png",
    sourceLink: "https://github.com/KhileshThakur/CS_Realm",
    liveLink: "https://cs-realm.onrender.com/",
    status: "Deployed"
  },
  {
    title: "Uploader",
    desc: "A file uploader that generates shareable links using Cloudinary, built with React, Node.js, and MongoDB.",
    tech: ["React", "Node", "MongoDB", "Cloudinary", "Multer"],
    year: "2024",
    image: "https://res.cloudinary.com/ddzua6arv/image/upload/v1743332931/uploads/necd63dlqm4ngzqtive0.png",
    sourceLink: "https://github.com/KhileshThakur/Uploader-frontend",
    liveLink: "https://uploader-frontend-td8x.onrender.com/",
    status: "Deployed"
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