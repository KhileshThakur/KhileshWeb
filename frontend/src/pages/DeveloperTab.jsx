// src/components/DeveloperTab.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Code2,
  Cpu,
  Globe,
  Layout,
  Database,
  Cloud,
  Terminal,
  GitBranch,
  Box,
  Layers,
  ExternalLink,
  Github,
  ChevronRight,
  Hash,
  Zap,
  Server,
  Monitor,
  Briefcase,
  Clock,
  Activity,
  Network,
} from "lucide-react";

import "./DeveloperTab.css";

/* --- DATA --- */

const SKILL_CATEGORIES = {
  LANGUAGES: [
    { name: "JavaScript", icon: Code2, level: 5, xp: "5 Yrs" },
    { name: "TypeScript", icon: Hash, level: 4, xp: "3 Yrs" },
    { name: "Python", icon: Terminal, level: 3, xp: "2 Yrs" },
    { name: "Java", icon: Code2, level: 4, xp: "4 Yrs" },
    { name: "SQL", icon: Database, level: 4, xp: "3 Yrs" },
  ],
  FRAMEWORKS: [
    { name: "React / Next.js", icon: Globe, level: 5, xp: "4 Yrs" },
    { name: "Node.js", icon: Server, level: 4, xp: "3 Yrs" },
    { name: "Tailwind CSS", icon: Layout, level: 5, xp: "3 Yrs" },
    { name: "Three.js", icon: Box, level: 3, xp: "1 Yr" },
  ],
  TOOLS: [
    { name: "Git / CI/CD", icon: GitBranch, level: 4, xp: "5 Yrs" },
    { name: "Docker", icon: Layers, level: 3, xp: "2 Yrs" },
    { name: "AWS", icon: Cloud, level: 3, xp: "2 Yrs" },
    { name: "Figma", icon: Layout, level: 4, xp: "3 Yrs" },
  ],
};

const PROJECTS_DATA = [
  {
    id: 1,
    title: "AI Chatbot Interface",
    desc: "A high-performance conversational agent interface built with React and WebSockets. Features real-time streaming responses, custom Markdown rendering, and adaptive UI themes.",
    tech: ["React", "Node.js", "OpenAI API", "WebSockets"],
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    title: "E-Commerce Dashboard",
    desc: "Comprehensive analytics dashboard for online retailers. Visualizes sales data, inventory levels, and user demographics using D3.js with real-time updates via Supabase.",
    tech: ["Next.js", "D3.js", "Supabase", "Tailwind"],
    year: "2023",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    title: "3D Portfolio Site",
    desc: "Immersive 3D portfolio using Three.js. Features interactive physics-based particles, a custom GLSL shader background, and smooth camera transitions.",
    tech: ["Three.js", "React Three Fiber", "GLSL"],
    year: "2023",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800",
  },{
    id: 4,
    title: "AI Chatbot Interface",
    desc: "A high-performance conversational agent interface built with React and WebSockets. Features real-time streaming responses, custom Markdown rendering, and adaptive UI themes.",
    tech: ["React", "Node.js", "OpenAI API", "WebSockets"],
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 5,
    title: "E-Commerce Dashboard",
    desc: "Comprehensive analytics dashboard for online retailers. Visualizes sales data, inventory levels, and user demographics using D3.js with real-time updates via Supabase.",
    tech: ["Next.js", "D3.js", "Supabase", "Tailwind"],
    year: "2023",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 6,
    title: "3D Portfolio Site",
    desc: "Immersive 3D portfolio using Three.js. Features interactive physics-based particles, a custom GLSL shader background, and smooth camera transitions.",
    tech: ["Three.js", "React Three Fiber", "GLSL"],
    year: "2023",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800",
  },

];

const SERVICES_DATA = [
  {
    id: 1,
    title: "Full Stack Developer",
    icon: Layers,
    desc: "End-to-end web application development using modern MERN/Next.js stacks.",
    tags: ["React", "Next.js", "Node.js"],
  },
  {
    id: 2,
    title: "ML Models",
    icon: Cpu,
    desc: "Custom machine learning models for predictive analysis and data processing.",
    tags: ["Python", "TensorFlow", "Pandas"],
  },
  {
    id: 3,
    title: "AI Chatbots",
    icon: Zap,
    desc: "Intelligent conversational agents integrated with your existing business platforms.",
    tags: ["LLMs", "LangChain", "OpenAI"],
  },
  {
    id: 4,
    title: "Microservices",
    icon: Server,
    desc: "Scalable backend architecture designed for high availability and performance.",
    tags: ["Docker", "K8s", "RabbitMQ"],
  },
  {
    id: 5,
    title: "API Integration",
    icon: Network,
    desc: "Robust RESTful and GraphQL API development for seamless third-party connections.",
    tags: ["GraphQL", "REST", "Auth0"],
  },
];

/* --- COMPONENTS --- */

const SkillModule = ({ name, icon: Icon, level, xp }) => (
  <motion.div
    className="skill-module"
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    whileHover={{ scale: 1.02 }}
    transition={{ duration: 0.2 }}
  >
    <div className="module-header">
      <div className="module-icon">
        <Icon size={18} />
      </div>
      <div className="module-title">{name}</div>
      <div className="xp-badge">{xp}</div>
    </div>

    <div>
      <div className="proficiency-bar">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className={`segment ${i <= level ? "filled" : ""}`} />
        ))}
      </div>
    </div>
  </motion.div>
);

const SkillsView = () => {
  const [activeCat, setActiveCat] = useState("LANGUAGES");

  return (
    <div className="skills-wrapper">
      <div className="skill-tabs">
        {Object.keys(SKILL_CATEGORIES).map((cat) => (
          <button
            key={cat}
            className={`skill-tab-btn ${activeCat === cat ? "active" : ""}`}
            onClick={() => setActiveCat(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <motion.div
        key={activeCat}
        className="arsenal-grid"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
        {SKILL_CATEGORIES[activeCat].map((skill, i) => (
          <SkillModule key={i} {...skill} />
        ))}
      </motion.div>
    </div>
  );
};


const ServicesView = () => (
  <motion.div className="services-grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
    {SERVICES_DATA.map((service, i) => (
      <motion.div
        key={service.id}
        className="service-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.1 }}
      >
        <div className="service-icon-box">
          <service.icon size={24} />
        </div>

        <div className="service-content">
          <h3>{service.title}</h3>
          <p>{service.desc}</p>
        </div>

        <div className="service-tags">
          {service.tags.map((tag) => (
            <span key={tag} className="service-pill">
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    ))}
  </motion.div>
);

const WorkView = () => {
  const [activeProject, setActiveProject] = useState(PROJECTS_DATA[0]);

  return (
    <motion.div
      className="work-layout"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="project-list">
        {PROJECTS_DATA.map((project) => (
          <div
            key={project.id}
            className={`project-item ${
              activeProject.id === project.id ? "active" : ""
            }`}
            onClick={() => setActiveProject(project)}
          >
            <div>
              <div
                style={{
                  fontSize: "0.7rem",
                  color: "#666",
                  marginBottom: "0.25rem",
                  fontFamily: "monospace",
                }}
              >
                PRJ_0{project.id}
              </div>
              <div
                style={{
                  fontWeight: 600,
                  color:
                    activeProject.id === project.id ? "white" : "#aaa",
                }}
              >
                {project.title}
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <ChevronRight
                size={16}
                style={{
                  opacity: activeProject.id === project.id ? 1 : 0.3,
                  color:
                    activeProject.id === project.id
                      ? "var(--accent)"
                      : "inherit",
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="project-detail-wrapper">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProject.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="project-detail"
          >
            <div className="detail-img">
              <img src={activeProject.image} alt={activeProject.title} />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                  pointerEvents: "none",
                }}
              ></div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                marginBottom: "1.5rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <h2
                  style={{
                    fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
                    margin: 0,
                    fontWeight: 700,
                    lineHeight: 1.1,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {activeProject.title}
                </h2>
                <span
                  style={{
                    fontFamily: "monospace",
                    color: "var(--accent)",
                    border: "1px solid var(--accent)",
                    padding: "4px 8px",
                    fontSize: "0.8rem",
                    borderRadius: "4px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {activeProject.year}
                </span>
              </div>
              <p
                style={{
                  fontFamily: "monospace",
                  fontSize: "0.8rem",
                  color: "#666",
                }}
              >
                ID: {activeProject.id}_SECure // STATUS: DEPLOYED
              </p>
            </div>

            <div style={{ marginBottom: "2rem" }}>
              {activeProject.tech.map((t) => (
                <span key={t} className="tech-tag">
                  {t}
                </span>
              ))}
            </div>

            <p
              style={{
                color: "#ccc",
                lineHeight: 1.7,
                marginBottom: "3rem",
                maxWidth: "650px",
                fontSize: "1rem",
              }}
            >
              {activeProject.desc}
            </p>

            <div
              style={{
                display: "flex",
                gap: "1rem",
                marginTop: "auto",
                flexWrap: "wrap",
              }}
            >
              <button
                style={{
                  background: "var(--accent)",
                  color: "#000",
                  border: "none",
                  borderRadius: "4px",
                  padding: "0.8rem 1.6rem",
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  cursor: "pointer",
                  transition: "transform 0.2s",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "translateY(-2px)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "translateY(0)")
                }
              >
                <ExternalLink size={18} /> Live Demo
              </button>
              <button
                style={{
                  background: "transparent",
                  color: "var(--text-main)",
                  border: "1px solid #333",
                  borderRadius: "4px",
                  padding: "0.8rem 1.6rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = "var(--text-main)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = "#333";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <Github size={18} /> Source Code
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

/* --- MAIN COMPONENT --- */

const DeveloperTab = () => {
  const [activeTab, setActiveTab] = useState("work");

  const renderContent = () => {
    switch (activeTab) {
      case "work":
        return <WorkView />;
      case "skills":
        return <SkillsView />;
      case "services":
        return <ServicesView />;
      default:
        return <WorkView />;
    }
  };

  return (
    <div className="dev-container">
      <div className="overlay" />

      <div className="content-wrapper">
        {/* LEFT: MAIN DISPLAY */}
        <div className="main-display">
          {/* Top Navigation Bar */}
          <div className="top-bar">
            <button
              className="back-btn"
              onClick={() => window.location.reload()}
              title="Back to Home"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="breadcrumbs">
              System <span>/</span> Developer <span>/</span> {activeTab}
            </div>

            <div
              style={{
                marginLeft: "auto",
                display: "flex",
                gap: "0.5rem",
              }}
            >
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: "#ff5f56",
                }}
              />
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: "#ffbd2e",
                }}
              />
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: "#27c93f",
                }}
              />
            </div>
          </div>

          {/* Dynamic Content Area */}
          <div className="viewport">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                style={{ height: "100%" }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* RIGHT: NAVIGATION SIDEBAR */}
        <div className="sidebar">
          <div className="sidebar-footer" style={{ marginBottom: "1rem" }}>
            <h3
              style={{
                margin: 0,
                fontSize: "0.75rem",
                color: "#666",
                textTransform: "uppercase",
                letterSpacing: "2px",
                paddingLeft: "0.5rem",
              }}
            >
              Interface
            </h3>
          </div>

          <div
            className={`nav-btn ${activeTab === "work" ? "active" : ""}`}
            onClick={() => setActiveTab("work")}
          >
            {activeTab === "work" && (
              <Cpu
                style={{
                  position: "absolute",
                  left: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  opacity: 0.2,
                }}
                size={40}
              />
            )}
            <Monitor
              size={24}
              className="mobile-icon"
              style={{ display: "none" }}
            />
            <div className="nav-label">Work</div>
            <div
              style={{
                fontSize: "0.7rem",
                opacity: 0.7,
                marginTop: "4px",
              }}
              className="sidebar-footer"
            >
              Projects & Code
            </div>
          </div>

          <div
            className={`nav-btn ${activeTab === "skills" ? "active" : ""}`}
            onClick={() => setActiveTab("skills")}
          >
            {activeTab === "skills" && (
              <Terminal
                style={{
                  position: "absolute",
                  left: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  opacity: 0.2,
                }}
                size={40}
              />
            )}
            <Zap
              size={24}
              className="mobile-icon"
              style={{ display: "none" }}
            />
            <div className="nav-label">Skills</div>
            <div
              style={{
                fontSize: "0.7rem",
                opacity: 0.7,
                marginTop: "4px",
              }}
              className="sidebar-footer"
            >
              Stack & Tools
            </div>
          </div>

          <div
            className={`nav-btn ${activeTab === "services" ? "active" : ""}`}
            onClick={() => setActiveTab("services")}
          >
            {activeTab === "services" && (
              <Server
                style={{
                  position: "absolute",
                  left: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  opacity: 0.2,
                }}
                size={40}
              />
            )}
            <Network
              size={24}
              className="mobile-icon"
              style={{ display: "none" }}
            />
            <div className="nav-label">Services</div>
            <div
              style={{
                fontSize: "0.7rem",
                opacity: 0.7,
                marginTop: "4px",
              }}
              className="sidebar-footer"
            >
              Offerings
            </div>
          </div>

          <div
            className="sidebar-footer"
            style={{
              marginTop: "auto",
              padding: "1rem",
              borderTop: "1px solid var(--border)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "0.7rem",
                color: "#666",
                fontFamily: "monospace",
              }}
            >
              <span>MEM: 64GB</span>
              <span>CPU: 12%</span>
            </div>
            <div
              style={{
                width: "100%",
                height: "2px",
                background: "#222",
                marginTop: "6px",
              }}
            >
              <motion.div
                animate={{ width: ["12%", "40%", "25%"] }}
                transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                style={{
                  height: "100%",
                  background: "var(--accent)",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperTab;
