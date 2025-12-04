import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
} from "framer-motion";
import {
  ArrowLeft,
  PenTool,
  Layout,
  Image as ImageIcon,
  Instagram,
  Figma,
  Layers,
  Grid,
  Maximize2,
  X,
  MousePointer2,
  Palette,
  Monitor,
  Smartphone,
  Type,
  Component as ComponentIcon,
  Briefcase,
  Star,
  Award,
  Box,
  ExternalLink,
  Crop,
  Aperture,
  Feather,
  Hexagon,
  Wand2,
} from "lucide-react";

import "./DesignerTab.css";

/* --- DATA --- */

const GALLERY_ITEMS = [
  {
    id: 1,
    title: "Fintech App UI",
    category: "Wireframes",
    image:
      "https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&q=80&w=800",
    tags: "Figma • Auto Layout",
    link: "#",
  },
  {
    id: 2,
    title: "Neon Cyber Poster",
    category: "Posters",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800",
    tags: "Photoshop • Blending",
    link: "#",
  },
  {
    id: 3,
    title: "Tech Startup Logo",
    category: "Logos",
    image:
      "https://images.unsplash.com/photo-1626785774573-4b799314348d?auto=format&fit=crop&q=80&w=800",
    tags: "Illustrator • Vector",
    link: "#",
  },
  {
    id: 4,
    title: "Instagram Carousel",
    category: "Socials",
    image:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800",
    tags: "Canva • Storytelling",
    link: "#",
  },
  {
    id: 5,
    title: "E-Commerce Web",
    category: "Wireframes",
    image:
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800",
    tags: "Figma • Prototyping",
    link: "#",
  },
  {
    id: 6,
    title: "Minimalist Brand",
    category: "Logos",
    image:
      "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=800",
    tags: "Typography • Identity",
    link: "#",
  },
];

const TOOLS_DATA = [
  { name: "Figma", icon: Figma, level: "UI/UX" },
  { name: "Photoshop", icon: ImageIcon, level: "Editing" },
  { name: "Illustrator", icon: PenTool, level: "Vector" },
  { name: "Canva", icon: Layout, level: "Socials" },
  { name: "Blender", icon: Box, level: "3D Assets" },
  { name: "After Effects", icon: Monitor, level: "Motion" },
];

// Helper icon component
function PrinterIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 6 2 18 2 18 9" />
      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
      <rect width="12" height="8" x="6" y="14" />
    </svg>
  );
}

const SERVICES_DATA = [
  {
    id: 1,
    title: "Brand Identity",
    icon: Star,
    desc: "Complete visual language for your brand including logos, typography, and color palettes.",
    items: ["Logo Design", "Brand Guidelines", "Stationery Kit", "Visual Strategy"],
  },
  {
    id: 2,
    title: "Social Assets",
    icon: Instagram,
    desc: "High-conversion graphics for social media platforms tailored to your audience.",
    items: ["YouTube Thumbnails", "IG Carousels", "Story Templates", "Ad Creatives"],
  },
  {
    id: 3,
    title: "UI/UX Design",
    icon: Layout,
    desc: "User-centric interface design for web and mobile applications.",
    items: ["Wireframing", "Prototyping", "Mobile App UI", "Web Design"],
  },
  {
    id: 4,
    title: "Print Media",
    icon: PrinterIcon,
    desc: "Physical marketing materials designed to leave a lasting impression.",
    items: ["Event Posters", "Brochures", "Business Cards", "Merchandise"],
  },
];

/* --- SUB VIEWS --- */

const GalleryView = () => {
  const [filter, setFilter] = useState("All");
  const filteredItems =
    filter === "All"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === filter);

  return (
    <div>
      <div className="gallery-header">
        <div className="gallery-filters">
          {["All", "Wireframes", "Posters", "Logos", "Socials"].map((f) => (
            <button
              key={f}
              className={`filter-btn ${filter === f ? "active" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <motion.div layout className="gallery-grid">
        <AnimatePresence>
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="gallery-item"
            >
              <div className="gallery-img-wrapper">
                <img
                  src={item.image}
                  alt={item.title}
                  className="gallery-img"
                />
                <div className="gallery-overlay">
                  <div>
                    <div className="gallery-title">{item.title}</div>
                    <div className="gallery-tag">{item.tags}</div>
                  </div>
                  <button className="gallery-link">
                    <ExternalLink size={14} /> View Project
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

const ToolsView = () => {
  return (
    <div className="tools-container">
      <div style={{ textAlign: "center", maxWidth: "600px" }}>
        <h2
          style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "1rem" }}
        >
          The Arsenal
        </h2>
        <p style={{ color: "#a390b0", lineHeight: 1.6 }}>
          Industry-standard software stack optimized for speed and precision.
        </p>
      </div>

      <div className="tools-shelf">
        {TOOLS_DATA.map((tool, i) => (
          <div key={i} className="tool-icon-wrapper">
            <tool.icon className="tool-icon" size={32} />
            <div className="tool-tooltip">{tool.level}</div>
          </div>
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "2rem",
          marginTop: "3rem",
          width: "100%",
          maxWidth: "700px",
        }}
      >
        {[
          { label: "Projects", val: "50+" },
          { label: "Years Exp", val: "4" },
          { label: "Satisfaction", val: "100%" },
        ].map((stat, i) => (
          <div
            key={i}
            style={{
              background: "rgba(255,255,255,0.03)",
              padding: "1.5rem",
              borderRadius: "12px",
              border: "1px solid var(--border)",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "2rem",
                fontWeight: 700,
                color: "var(--accent)",
              }}
            >
              {stat.val}
            </div>
            <div
              style={{
                fontSize: "0.8rem",
                color: "#888",
                textTransform: "uppercase",
                marginTop: "0.5rem",
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const StudioView = () => (
  <div className="studio-grid">
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

        <div className="service-title">{service.title}</div>
        <p className="service-desc">{service.desc}</p>

        <ul className="service-list">
          {service.items.map((item, j) => (
            <li key={j} className="service-item">
              <span className="service-check">+</span> {item}
            </li>
          ))}
        </ul>
      </motion.div>
    ))}
  </div>
);

/* --- MAIN COMPONENT --- */

const DesignerTab = () => {
  const [activeTab, setActiveTab] = useState("work");

  const renderContent = () => {
    switch (activeTab) {
      case "work":
        return <GalleryView />;
      case "tools":
        return <ToolsView />;
      case "studio":
        return <StudioView />;
      default:
        return <GalleryView />;
    }
  };

  return (
    <div className="designer-container">
      <div className="overlay" />

      <div className="content-wrapper">
        {/* LEFT: MAIN DISPLAY */}
        <div className="main-display">
          <div className="top-bar">
            <button
              className="back-btn"
              onClick={() => window.location.reload()}
            >
              <ArrowLeft size={20} />
            </button>
            <div className="breadcrumbs">
              Studio <span>/</span> Designer <span>/</span> {activeTab}
            </div>
            <div
              style={{
                marginLeft: "auto",
                display: "flex",
                gap: "0.5rem",
                alignItems: "center",
              }}
            >
              <Palette size={20} style={{ color: "var(--accent)" }} />
            </div>
          </div>

          <div className="viewport">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
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
          <div
            className="sidebar-footer"
            style={{ marginBottom: "1rem", paddingLeft: "0.5rem" }}
          >
            <h3
              style={{
                margin: 0,
                fontSize: "0.75rem",
                color: "#666",
                textTransform: "uppercase",
                letterSpacing: "2px",
              }}
            >
              Creative Mode
            </h3>
          </div>

          <div
            className={`nav-btn ${activeTab === "work" ? "active" : ""}`}
            onClick={() => setActiveTab("work")}
          >
            <ImageIcon size={24} className="nav-icon-mobile" />
            <div className="nav-label">Gallery</div>
            <div
              style={{
                fontSize: "0.7rem",
                opacity: 0.7,
                marginTop: "4px",
              }}
              className="sidebar-footer"
            >
              Visual Portfolio
            </div>
          </div>

          <div
            className={`nav-btn ${activeTab === "tools" ? "active" : ""}`}
            onClick={() => setActiveTab("tools")}
          >
            <PenTool size={24} className="nav-icon-mobile" />
            <div className="nav-label">Tools</div>
            <div
              style={{
                fontSize: "0.7rem",
                opacity: 0.7,
                marginTop: "4px",
              }}
              className="sidebar-footer"
            >
              Software Stack
            </div>
          </div>

          <div
            className={`nav-btn ${activeTab === "studio" ? "active" : ""}`}
            onClick={() => setActiveTab("studio")}
          >
            <Wand2 size={24} className="nav-icon-mobile" />
            <div className="nav-label">Studio</div>
            <div
              style={{
                fontSize: "0.7rem",
                opacity: 0.7,
                marginTop: "4px",
              }}
              className="sidebar-footer"
            >
              Services & Offerings
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
              <span>ART: 24GB</span>
              <span>GPU: 48%</span>
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
                animate={{ width: ["30%", "60%", "45%"] }}
                transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                style={{ height: "100%", background: "var(--accent)" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignerTab;
