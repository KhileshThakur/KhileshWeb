import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import * as LucideIcons from 'lucide-react';

import { useQuery } from "@tanstack/react-query";
import {
  getCreatorSketches,
  getCreatorBooks,
  getCreatorThoughts
} from "../api/public-api";

import './CreatorTab.css';

/* --- COMPONENTS --- */

const SketchCard = ({ sketch, onClick }) => (
  <motion.div
    className="sketch-card"
    onClick={onClick}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <div className="sketch-frame">
      <img src={sketch.img} alt={sketch.title} className="sketch-img" />
    </div>
    <div className="sketch-info">
      <div className="sketch-title">{sketch.title}</div>
      <div className="sketch-date">{sketch.date}</div>
    </div>
  </motion.div>
);

const BookCard = ({ book }) => (
  <div className="book-showcase">
    <div className="book-cover-container">
      <div className="book-cover-3d">
        <div className="book-front">
          <img src={book.cover} alt={book.title} className="book-img" />
        </div>
        <div className="book-spine"></div>
      </div>
    </div>
    <div className="book-details">
      <h2>{book.title}</h2>
      <div className="book-author">by {book.author}</div>
      <p className="book-desc">{book.desc}</p>
      <div className="book-actions">
        <button className="read-btn"><LucideIcons.BookOpen size={18} /> Sample</button>
        <button className="outline-btn"><LucideIcons.Share2 size={18} /> Share</button>
      </div>
    </div>
  </div>
);

const VisionCard = ({ thought }) => (
  <div className="vision-card">
    <div style={{display: 'flex', justifyContent: 'space-between'}}>
      <div className="vision-date">{thought.date}</div>
      <LucideIcons.Feather className="vision-icon" size={24} color='#22d3ee' />
    </div>
    <p className="vision-text">"{thought.text}"</p>
  </div>
);

/* --- MAIN SECTIONS --- */

const GalleryView = () => {
  const [selectedImg, setSelectedImg] = useState(null);

  const { data: sketches = [], isLoading, error } = useQuery({
    queryKey: ['creator-sketches'],
    queryFn: getCreatorSketches
  });

  if (isLoading) return <div className="loading-state"><LucideIcons.Loader2 className="animate-spin" /> Loading Gallery...</div>;
  if (error) return <div className="error-state">Failed to load sketches.</div>;

  return (
    <div className="view-container">
      <div className="section-header">
        <h2>Artworks</h2>
        <span className="header-line"></span>
        <span className="header-count">0{sketches.length} ITEMS</span>
      </div>

      <div className="gallery-grid">
        {sketches.map((s, i) => (
          <SketchCard
            key={s.id || s._id || i}
            sketch={s}
            onClick={() => setSelectedImg(s)}
          />
        ))}
      </div>

      <AnimatePresence>
        {selectedImg && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
          >
            <div className="img-modal" onClick={e => e.stopPropagation()}>
              <button className="close-modal" onClick={() => setSelectedImg(null)}>
                <LucideIcons.X size={24} />
              </button>

              <img src={selectedImg.img} alt={selectedImg.title} />
              <div className="modal-caption">{selectedImg.title}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const LibraryView = () => {
  const { data: books = [], isLoading, error } = useQuery({
    queryKey: ['creator-books'],
    queryFn: getCreatorBooks
  });

  if (isLoading) return <div className="loading-state"><LucideIcons.Loader2 className="animate-spin" /> Loading Library...</div>;
  if (error) return <div className="error-state">Failed to load books.</div>;

  return (
    <div className="library-layout">
      <div className="section-header center">
        <h2>Published Works</h2>
        <p>Stories penned in the quiet hours.</p>
      </div>
      {books.map((b, i) => <BookCard key={b.id || b._id || i} book={b} />)}
    </div>
  );
};

const VisionView = () => {
  const { data: thoughts = [], isLoading, error } = useQuery({
    queryKey: ['creator-thoughts'],
    queryFn: getCreatorThoughts
  });

  if (isLoading) return <div className="loading-state"><LucideIcons.Loader2 className="animate-spin" /> Loading Vision...</div>;
  if (error) return <div className="error-state">Failed to load thoughts.</div>;

  return (
    <div className="view-container">
      <div className="section-header">
        <h2>Journal</h2>
        <p>Fragments of a creative mind.</p>
      </div>
      <div className="vision-grid">
        {thoughts.map((t, i) => <VisionCard key={t.id || t._id || i} thought={t} />)}
      </div>
    </div>
  );
};

/* --- MAIN COMPONENT --- */

const CreatorTab = () => {
  const [activeTab, setActiveTab] = useState('artworks');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'artworks': return <GalleryView />;
      case 'library': return <LibraryView />;
      case 'vision': return <VisionView />;
      default: return <GalleryView />;
    }
  };

  return (
    <div id="creator-page" className="creator-container">
      <div className="content-wrapper">

        {/* LEFT: CONTENT AREA */}
        <div className="main-display">
          <div className="top-bar">
            <Link className="back-btn" to={'/'}>
              <LucideIcons.ArrowLeft size={20} />
            </Link>
            <div className="breadcrumbs">
              Studio <span>/</span> Creator <span>/</span> {activeTab}
            </div>
            <div className="status-dots">
              <div className="dot active"></div>
              <div className="dot"></div>
            </div>
          </div>

          <div className="viewport">
            <AnimatePresence mode='wait'>
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="motion-wrapper"
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* RIGHT: SIDEBAR */}
        <div className="sidebar">
          <div className="sidebar-header">
            <h3 className="sidebar-title">The Studio</h3>
          </div>
          <div className="nav-group">

            <div
              className={`nav-box-btn ${activeTab === 'artworks' ? 'active' : ''}`}
              onClick={() => handleTabChange('artworks')}
            >
              {/* Desktop Decor */}
              <LucideIcons.PenTool size={40} className="nav-icon-bg" />
              {/* Mobile Icon */}
              <LucideIcons.PenTool size={24} className="nav-icon-mobile" />

              <span className="nav-label">Sketches</span>
              <span className="nav-sub">Hand-Drawn Gallery</span>
            </div>

            <div
              className={`nav-box-btn ${activeTab === 'library' ? 'active' : ''}`}
              onClick={() => handleTabChange('library')}
            >
              <LucideIcons.BookOpen size={40} className="nav-icon-bg" />
              <LucideIcons.BookOpen size={24} className="nav-icon-mobile" />

              <span className="nav-label">Writings</span>
              <span className="nav-sub">Books & Stories</span>
            </div>

            <div
              className={`nav-box-btn ${activeTab === 'vision' ? 'active' : ''}`}
              onClick={() => handleTabChange('vision')}
            >
              <LucideIcons.Eye size={40} className="nav-icon-bg" />
              <LucideIcons.Eye size={24} className="nav-icon-mobile" />

              <span className="nav-label">Vision</span>
              <span className="nav-sub">Creative Journal</span>
            </div>

          </div>

          <div className="sidebar-footer">
            <div className="stat-row">
              <span>INK: 85%</span>
              <span>PAGES: 320</span>
            </div>
            <div className="stat-bar">
              <div className="stat-fill"></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CreatorTab;