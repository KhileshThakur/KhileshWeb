import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, PenTool, BookOpen, Image as ImageIcon, 
  Feather, Eye, Heart, Share2, Maximize2, 
  ChevronRight, ExternalLink, Brush, Edit3, 
  Coffee, Sparkles, Book, X
} from 'lucide-react';

import './CreatorTab.css';

/* --- DATA --- */

const SKETCHES = [
  { id: 1, title: "Urban Solitude", date: "2024", img: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&q=80&w=800" },
  { id: 2, title: "Charcoal Study", date: "2023", img: "https://images.unsplash.com/photo-1628260412297-a3377e45006f?auto=format&fit=crop&q=80&w=800" },
  { id: 3, title: "Cybernetic Eye", date: "2024", img: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=800" },
  { id: 4, title: "Lost in Translation", date: "2023", img: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=800" }
];

const BOOKS = [
  {
    id: 1,
    title: "The Silent Algorithm",
    author: "Khilesh T.",
    desc: "A journey through the mind of a developer discovering the intersection of logic and emotion. 'The Silent Algorithm' explores how our digital creations reflect our human imperfections.",
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800"
  }
];

const THOUGHTS = [
  { id: 1, date: "NOV 12", text: "Creativity is not about adding more, but stripping away the unnecessary until only the truth remains." },
  { id: 2, date: "OCT 08", text: "Code is poetry written for machines. Sketching is poetry written for the soul." },
  { id: 3, date: "SEP 21", text: "The blank page is the most terrifying and liberating interface ever designed." }
];

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
        <button className="read-btn"><BookOpen size={18} /> Read Sample</button>
        <button className="outline-btn"><Share2 size={18} /> Share</button>
      </div>
    </div>
  </div>
);

const VisionCard = ({ thought }) => (
  <div className="vision-card">
    <div className="vision-date">{thought.date}</div>
    <Feather className="vision-icon" size={24} />
    <p className="vision-text">"{thought.text}"</p>
  </div>
);

/* --- MAIN SECTIONS --- */

const GalleryView = () => {
  const [selectedImg, setSelectedImg] = useState(null);

  return (
    <div>
      <div style={{marginBottom:'2rem', display:'flex', alignItems:'center', gap:'1rem'}}>
        <h2 style={{fontSize:'2.5rem', fontWeight:800, margin:0, color:'white', lineHeight:1}}>Artworks</h2>
        <span style={{height:'1px', flex:1, background:'var(--border)'}}></span>
        <span style={{color:'var(--text-muted)', fontFamily:'JetBrains Mono', fontSize:'0.8rem'}}>0{SKETCHES.length} ITEMS</span>
      </div>
      
      <div className="gallery-grid">
        {SKETCHES.map(s => (
          <SketchCard
            key={s.id}
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
                <X size={32} />
              </button>
              <img src={selectedImg.img} alt={selectedImg.title} />
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

const LibraryView = () => (
  <div className="library-layout">
    <div style={{textAlign:'center', marginBottom:'1rem'}}>
      <h2 style={{fontSize:'2.5rem', fontWeight:800, color:'white', marginBottom:'0.5rem'}}>Published Works</h2>
      <p style={{color:'var(--text-muted)'}}>Stories penned in the quiet hours.</p>
    </div>
    {BOOKS.map(b => <BookCard key={b.id} book={b} />)}
  </div>
);

const VisionView = () => (
  <div>
    <div style={{marginBottom:'2rem'}}>
      <h2 style={{fontSize:'2.5rem', fontWeight:800, color:'white', margin:0}}>Journal</h2>
      <p style={{color:'var(--text-muted)', marginTop:'0.5rem'}}>Fragments of a creative mind.</p>
    </div>
    <div className="vision-grid">
      {THOUGHTS.map((t) => <VisionCard key={t.id} thought={t} />)}
    </div>
  </div>
);

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
            <button className="back-btn" onClick={() => window.location.reload()}>
              <ArrowLeft size={20} />
            </button>
            <div className="breadcrumbs">
              Studio <span>/</span> Creator <span>/</span> {activeTab}
            </div>
            <div style={{display:'flex', gap:'0.5rem', marginRight:'1rem'}}>
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
              <PenTool size={40} className="nav-icon-bg" />
              <Brush size={24} className="nav-icon-mobile" />
              <span className="nav-label">Sketches</span>
              <span className="nav-sub">Hand-Drawn Gallery</span>
            </div>
            
            <div 
              className={`nav-box-btn ${activeTab === 'library' ? 'active' : ''}`}
              onClick={() => handleTabChange('library')}
            >
              <BookOpen size={40} className="nav-icon-bg" />
              <Book size={24} className="nav-icon-mobile" />
              <span className="nav-label">Writings</span>
              <span className="nav-sub">Books & Stories</span>
            </div>
            
            <div 
              className={`nav-box-btn ${activeTab === 'vision' ? 'active' : ''}`}
              onClick={() => handleTabChange('vision')}
            >
              <Eye size={40} className="nav-icon-bg" />
              <Sparkles size={24} className="nav-icon-mobile" />
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
