// src/pages/DeveloperTab.jsx
import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// 1. IMPORT ALL ICONS AS A NAMESPACE
import * as LucideIcons from "lucide-react";

import "./DeveloperTab.css";

import { useQuery } from "@tanstack/react-query";
import {
  getDeveloperSkills,
  getDeveloperProjects,
  getDeveloperServices,
} from "../api/public-api";

/* --- 2. DYNAMIC ICON COMPONENT --- */

const DynamicIcon = ({ name, size = 24, className }) => {
  // Default fallback for Developer tab is usually Terminal or Code
  if (!name) return <LucideIcons.Terminal size={size} className={className} />;

  let IconComponent = LucideIcons[name];

  // Handle case sensitivity (backend: "gitBranch" -> frontend: "GitBranch")
  if (!IconComponent) {
    const pascalName = name.charAt(0).toUpperCase() + name.slice(1);
    IconComponent = LucideIcons[pascalName];
  }

  // Fallback if not found
  if (!IconComponent) {
    return <LucideIcons.Code2 size={size} className={className} />;
  }

  return <IconComponent size={size} className={className} />;
};

/* --- COMPONENTS --- */

const SkillModule = ({ name, iconName, level, xp }) => (
  <motion.div
    className="skill-module"
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    whileHover={{ scale: 1.02 }}
    transition={{ duration: 0.2 }}
  >
    <div className="module-header">
      <div className="module-icon">
        {/* Use DynamicIcon here */}
        <DynamicIcon name={iconName} size={18} />
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

  const { data, isLoading, error } = useQuery({
    queryKey: ["developer-skills"],
    queryFn: getDeveloperSkills,
  });

  if (isLoading) return <div className="skills-wrapper"><LucideIcons.Loader2 className="animate-spin" /> Loading skills...</div>;
  if (error) return <div className="skills-wrapper">Failed to load skills.</div>;

  // group by category from backend
  const grouped = data.reduce((acc, skill) => {
    const cat = skill.category || "OTHER";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {});

  const categories = Object.keys(grouped);
  const fallbackCat = categories[0] || "LANGUAGES";
  const active = categories.includes(activeCat) ? activeCat : fallbackCat;
  const current = grouped[active] || [];

  return (
    <div className="skills-wrapper">
      <div className="skill-tabs">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`skill-tab-btn ${active === cat ? "active" : ""}`}
            onClick={() => setActiveCat(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <motion.div
        key={active}
        className="arsenal-grid"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
        {current.map((skill) => (
          <SkillModule
            key={skill._id || skill.id}
            name={skill.name}
            // Pass the string from backend directly
            iconName={skill.icon} 
            level={skill.level}
            xp={skill.xp}
          />
        ))}
      </motion.div>
    </div>
  );
};

const ServicesView = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["developer-services"],
    queryFn: getDeveloperServices,
  });

  const services = data || [];

  if (isLoading) return <div className="services-grid"><LucideIcons.Loader2 className="animate-spin" /> Loading services...</div>;
  if (error) return <div className="services-grid">Failed to load services.</div>;
  if (services.length === 0) return <div className="services-grid">No services found.</div>;

  return (
    <motion.div className="services-grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {services.map((service, i) => (
        <motion.div
          key={service._id || i}
          className="service-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <div className="service-icon-box">
            {/* Dynamic Icon Resolution */}
            <DynamicIcon name={service.icon} size={24} />
          </div>

          <div className="service-content">
            <h3>{service.title}</h3>
            <p>{service.desc}</p>
          </div>

          <div className="service-tags">
            {service.tags?.map((tag) => (
              <span key={tag} className="service-pill">
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

const WorkView = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["developer-projects"],
    queryFn: getDeveloperProjects,
  });

  const projects = data || [];
  const [activeProject, setActiveProject] = useState(null);

  useEffect(() => {
    if (!activeProject && projects.length > 0) {
      setActiveProject(projects[0]);
    }
  }, [projects, activeProject]);

  if (isLoading) return <div className="work-layout"><LucideIcons.Loader2 className="animate-spin" /> Loading projects...</div>;
  if (error) return <div className="work-layout">Failed to load projects.</div>;
  if (!activeProject) return <div className="work-layout">No projects found.</div>;

  return (
    <motion.div
      className="work-layout"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="project-list">
        {projects.map((project, index) => (
          <div
            key={project._id || index}
            className={`project-item ${
              activeProject._id === project._id ? "active" : ""
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
                PRJ_0{index + 1}
              </div>
              <div
                style={{
                  fontWeight: 600,
                  color:
                    activeProject._id === project._id ? "white" : "#aaa",
                }}
              >
                {project.title}
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <LucideIcons.ChevronRight
                size={16}
                style={{
                  opacity: activeProject._id === project._id ? 1 : 0.3,
                  color:
                    activeProject._id === project._id
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
            key={activeProject._id}
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
                ID: {activeProject._id} // STATUS: DEPLOYED
              </p>
            </div>

            <div style={{ marginBottom: "2rem" }}>
              {activeProject.tech?.map((t) => (
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
              {activeProject.link && (
                <a
                  href={activeProject.link}
                  target="_blank"
                  rel="noreferrer"
                  style={{ textDecoration: "none" }}
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
                  <LucideIcons.ExternalLink size={18} /> Live Demo
                </button>
                </a>
              )}
              
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
                <LucideIcons.Github size={18} /> Source Code
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
            <Link className="back-btn" to={"/"} title="Back to Home">
              <LucideIcons.ArrowLeft size={20} />
            </Link>
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
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ff5f56" }} />
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ffbd2e" }} />
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#27c93f" }} />
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
              <LucideIcons.Cpu
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
            <LucideIcons.Monitor
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
              <LucideIcons.Terminal
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
            <LucideIcons.Zap
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
              <LucideIcons.Server
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
            <LucideIcons.Network
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