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
    <div className="book-cover-3d">
      <div className="book-front">
        <img src={book.cover} alt={book.title} className="book-img" />
      </div>
      <div className="book-spine"></div>
    </div>
    <div className="book-details">
      <h2>{book.title}</h2>
      <div className="book-author">by {book.author}</div>
      <p className="book-desc">{book.desc}</p>
      <div className="book-actions">
        <button className="read-btn"><LucideIcons.BookOpen size={18} /> Read Sample</button>
        <button className="outline-btn"><LucideIcons.Share2 size={18} /> Share</button>
      </div>
    </div>
  </div>
);

const VisionCard = ({ thought }) => (
  <div className="vision-card">
    <div className="vision-date">{thought.date}</div>
    <LucideIcons.Feather className="vision-icon" size={24} />
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
    <div>
      <div style={{marginBottom:'2rem', display:'flex', alignItems:'center', gap:'1rem'}}>
        <h2 style={{fontSize:'2.5rem', fontWeight:800, margin:0, color:'white', lineHeight:1}}>Artworks</h2>
        <span style={{height:'1px', flex:1, background:'var(--border)'}}></span>
        <span style={{color:'var(--text-muted)', fontFamily:'monospace', fontSize:'0.8rem'}}>0{sketches.length} ITEMS</span>
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
            // Inline styles to fix positioning issues
            style={{
              position: 'fixed',
              top: 0, 
              left: 0,
              background: 'rgba(0, 0, 0, 0.9)',
              backdropFilter: 'blur(10px)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem'
            }}
          >
            <div 
              className="img-modal" 
              onClick={e => e.stopPropagation()}
              style={{ position: 'relative', maxWidth: '90%', maxHeight: '90%' }}
            >
              <button 
                className="close-modal" 
                onClick={() => setSelectedImg(null)}
                style={{
                  position: 'absolute',
                  top: '-3rem',
                  right: '-2rem',
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  cursor: 'pointer',
                  outline: 'none'
                }}
              >
                <LucideIcons.X size={32} />
              </button>
              
              <img 
                src={selectedImg.img} 
                alt={selectedImg.title} 
                style={{ 
                  maxWidth: '100%', 
                  maxHeight: '80vh', 
                  borderRadius: '4px',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.5)' 
                }} 
              />
              
              <div
                style={{
                  textAlign:'center',
                  marginTop:'1rem',
                  fontFamily:'Caveat, cursive',
                  fontSize:'2rem',
                  color:'white'
                }}
              >
                {selectedImg.title}
              </div>
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
      <div style={{textAlign:'center', marginBottom:'1rem'}}>
        <h2 style={{fontSize:'2.5rem', fontWeight:800, color:'white', marginBottom:'0.5rem'}}>Published Works</h2>
        <p style={{color:'var(--text-muted)'}}>Stories penned in the quiet hours.</p>
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
    <div>
      <div style={{marginBottom:'2rem'}}>
        <h2 style={{fontSize:'2.5rem', fontWeight:800, color:'white', margin:0}}>Journal</h2>
        <p style={{color:'var(--text-muted)', marginTop:'0.5rem'}}>Fragments of a creative mind.</p>
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
    switch(activeTab) {
      case 'artworks': return <GalleryView />;
      case 'library':  return <LibraryView />;
      case 'vision':   return <VisionView />;
      default:         return <GalleryView />;
    }
  };

  return (
    <div className="creator-container">
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
            <div style={{display:'flex', gap:'0.5rem', marginRight:'1rem', marginLeft:'auto'}}>
               <div style={{width:'8px', height:'8px', borderRadius:'50%', background:'var(--accent)'}}></div>
               <div style={{width:'8px', height:'8px', borderRadius:'50%', background:'#333'}}></div>
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
                style={{ height: '100%' }}
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
              <LucideIcons.PenTool size={40} className="nav-icon-bg" />
              <LucideIcons.Brush size={24} className="nav-icon-mobile" />
              <span className="nav-label">Sketches</span>
              <span className="nav-sub">Hand-Drawn Gallery</span>
            </div>
            
            <div 
              className={`nav-box-btn ${activeTab === 'library' ? 'active' : ''}`}
              onClick={() => handleTabChange('library')}
            >
              <LucideIcons.BookOpen size={40} className="nav-icon-bg" />
              <LucideIcons.Book size={24} className="nav-icon-mobile" />
              <span className="nav-label">Writings</span>
              <span className="nav-sub">Books & Stories</span>
            </div>
            
            <div 
              className={`nav-box-btn ${activeTab === 'vision' ? 'active' : ''}`}
              onClick={() => handleTabChange('vision')}
            >
              <LucideIcons.Eye size={40} className="nav-icon-bg" />
              <LucideIcons.Sparkles size={24} className="nav-icon-mobile" />
              <span className="nav-label">Vision</span>
              <span className="nav-sub">Creative Journal</span>
            </div>

          </div>

          {/* Footer Stats */}
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