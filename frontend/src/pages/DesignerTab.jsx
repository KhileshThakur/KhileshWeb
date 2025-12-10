import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// 1. IMPORT ALL ICONS AS A NAMESPACE
// This allows us to access ANY icon via string: LucideIcons["PenTool"]
import * as LucideIcons from "lucide-react";

import { useQuery } from "@tanstack/react-query";
import {
  getDesignerGallery,
  getDesignerTools,
  getDesignerServices,
} from "../api/public-api";

import "./DesignerTab.css";

/* --- 2. DYNAMIC ICON COMPONENT --- */

const DynamicIcon = ({ name, size = 24, className }) => {
  // If backend sends empty string/null, fallback
  if (!name) return <LucideIcons.Palette size={size} className={className} />;

  // Try to find the icon in the library
  // Backend "PenTool" -> LucideIcons.PenTool
  let IconComponent = LucideIcons[name];

  // (Optional) Handle casing mismatch if backend is inconsistent (e.g. "penTool" vs "PenTool")
  if (!IconComponent) {
    const pascalName = name.charAt(0).toUpperCase() + name.slice(1);
    IconComponent = LucideIcons[pascalName];
  }

  // If still not found, return a fallback icon (e.g., HelpCircle or Palette)
  if (!IconComponent) {
    // console.warn(`Icon "${name}" not found in Lucide library.`);
    return <LucideIcons.HelpCircle size={size} className={className} />;
  }

  return <IconComponent size={size} className={className} />;
};

/* --- SUB VIEWS --- */

const GalleryView = () => {
  const [filter, setFilter] = useState("All");

  const { data: items = [], isLoading, error } = useQuery({
    queryKey: ["designer-gallery"],
    queryFn: getDesignerGallery,
  });

  // 3. DYNAMICALLY GENERATE FILTERS
  // We extract unique categories from the fetched data, so we don't hardcode ["UI Design", "Mobile"]
  const categories = useMemo(() => {
    if (!items.length) return [];
    const uniqueCats = new Set(items.map((item) => item.category));
    return ["All", ...Array.from(uniqueCats)];
  }, [items]);

  const filteredItems =
    filter === "All"
      ? items
      : items.filter((item) => item.category === filter);

  if (isLoading) return <div className="loading-state"><LucideIcons.Loader2 className="animate-spin" /> Loading Gallery...</div>;
  if (error) return <div className="error-state">Failed to load gallery data.</div>;

  return (
    <div>
      <div className="gallery-header">
        <div className="gallery-filters">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${filter === cat ? "active" : ""}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <motion.div layout className="gallery-grid">
        <AnimatePresence>
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id || index}
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
                    <div className="gallery-tag">
                      {/* Handle tags whether they are arrays or strings */}
                      {Array.isArray(item.tags) ? item.tags.join(" • ") : item.tags}
                    </div>
                  </div>
                  {item.link && (
                    <a 
                      href={item.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="gallery-link"
                    >
                      <LucideIcons.ExternalLink size={14} /> View Project
                    </a>
                  )}
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
  const { data: tools = [], isLoading, error } = useQuery({
    queryKey: ["designer-tools"],
    queryFn: getDesignerTools,
  });

  if (isLoading) return <div className="loading-state"><LucideIcons.Loader2 className="animate-spin" /> Loading Arsenal...</div>;
  if (error) return <div className="error-state">Failed to load tools.</div>;

  return (
    <div className="tools-container">
      <div style={{ textAlign: "center", maxWidth: "600px" }}>
        <h2 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "1rem" }}>
          The Arsenal
        </h2>
        <p style={{ color: "#a390b0", lineHeight: 1.6 }}>
          Industry-standard software stack optimized for speed and precision.
        </p>
      </div>

      <div className="tools-shelf">
        {tools.map((tool, i) => (
          <div key={i} className="tool-icon-wrapper">
            {/* Pass the backend string (e.g., "PenTool") directly */}
            <DynamicIcon name={tool.icon} size={32} className="tool-icon" />
            <div style={{ textAlign: "center" }} className="tool-tooltip">{tool.name}<br/><small style={{ color: "white", fontWeight: "thin" }}>{tool.level}</small></div>
          </div>
        ))}
      </div>

      <div className="stats-grid" style={{
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2rem", 
          marginTop: "3rem", width: "100%", maxWidth: "700px" 
      }}>
        {[
          { label: "Projects", val: "50+" },
          { label: "Years Exp", val: "4" },
          { label: "Satisfaction", val: "100%" },
        ].map((stat, i) => (
          <div key={i} style={{
              background: "rgba(255,255,255,0.03)", padding: "1.5rem", 
              borderRadius: "12px", border: "1px solid var(--border)", textAlign: "center"
          }}>
            <div style={{ fontSize: "2rem", fontWeight: 700, color: "var(--accent)" }}>{stat.val}</div>
            <div style={{ fontSize: "0.8rem", color: "#888", textTransform: "uppercase", marginTop: "0.5rem" }}>{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const StudioView = () => {
  const { data: services = [], isLoading, error } = useQuery({
    queryKey: ["designer-services"],
    queryFn: getDesignerServices,
  });

  if (isLoading) return <div className="loading-state"><LucideIcons.Loader2 className="animate-spin" /> Loading Studio...</div>;
  if (error) return <div className="error-state">Failed to load services.</div>;

  return (
    <div className="studio-grid">
      {services.map((service, i) => (
        <motion.div
          key={i}
          className="service-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <div className="service-icon-box">
             {/* Dynamic Icon */}
            <DynamicIcon name={service.icon} size={24} />
          </div>

          <div className="service-title">{service.title}</div>
          <p className="service-desc">{service.desc}</p>

          <ul className="service-list">
            {service.items && service.items.map((item, j) => (
              <li key={j} className="service-item">
                <span className="service-check">+</span> {item}
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
};

/* --- MAIN COMPONENT --- */

const DesignerTab = () => {
  const [activeTab, setActiveTab] = useState("work");

  const renderContent = () => {
    switch (activeTab) {
      case "work": return <GalleryView />;
      case "tools": return <ToolsView />;
      case "studio": return <StudioView />;
      default: return <GalleryView />;
    }
  };

  return (
    <div className="designer-container">
      <div className="overlay" />

      <div className="content-wrapper">
        <div className="main-display">
          <div className="top-bar">
            {/* UI Navigation icons are static/hardcoded because they are part of the app shell, not data */}
            <Link className="back-btn" to={"/"}><LucideIcons.ArrowLeft size={20} /></Link>
            <div className="breadcrumbs">Studio <span>/</span> Designer <span>/</span> {activeTab}</div>
            <div style={{ marginLeft: "auto", display: "flex", gap: "0.5rem", alignItems: "center" }}>
              <LucideIcons.Palette size={20} style={{ color: "var(--accent)" }} />
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

        <div className="sidebar">
          <div className="sidebar-footer" style={{ marginBottom: "1rem", paddingLeft: "0.5rem" }}>
            <h3 style={{ margin: 0, fontSize: "0.75rem", color: "#666", textTransform: "uppercase", letterSpacing: "2px" }}>
              Creative Mode
            </h3>
          </div>

          {/* Navigation Buttons */}
          <div className={`nav-btn ${activeTab === "work" ? "active" : ""}`} onClick={() => setActiveTab("work")}>
            <LucideIcons.Image size={24} className="nav-icon-mobile" />
            <div className="nav-label">Gallery</div>
            <div style={{ fontSize: "0.7rem", opacity: 0.7, marginTop: "4px" }} className="sidebar-footer">Visual Portfolio</div>
          </div>

          <div className={`nav-btn ${activeTab === "tools" ? "active" : ""}`} onClick={() => setActiveTab("tools")}>
            <LucideIcons.PenTool size={24} className="nav-icon-mobile" />
            <div className="nav-label">Tools</div>
            <div style={{ fontSize: "0.7rem", opacity: 0.7, marginTop: "4px" }} className="sidebar-footer">Software Stack</div>
          </div>

          <div className={`nav-btn ${activeTab === "studio" ? "active" : ""}`} onClick={() => setActiveTab("studio")}>
            <LucideIcons.Wand2 size={24} className="nav-icon-mobile" />
            <div className="nav-label">Studio</div>
            <div style={{ fontSize: "0.7rem", opacity: 0.7, marginTop: "4px" }} className="sidebar-footer">Services & Offerings</div>
          </div>

          <div className="sidebar-footer" style={{ marginTop: "auto", padding: "1rem", borderTop: "1px solid var(--border)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.7rem", color: "#666", fontFamily: "monospace" }}>
              <span>ART: 24GB</span><span>GPU: 48%</span>
            </div>
            <div style={{ width: "100%", height: "2px", background: "#222", marginTop: "6px" }}>
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