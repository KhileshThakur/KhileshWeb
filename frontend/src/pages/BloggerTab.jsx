// src/pages/BloggerTab.jsx
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import MDEditor from '@uiw/react-md-editor';

// 1. Dynamic Icon Import
import * as LucideIcons from 'lucide-react';

import { useQuery } from "@tanstack/react-query";
import {
  getBloggerSnippets,
  getBloggerRoadmaps,
  getBloggerArticles
} from "../api/public-api";

import './BloggerTab.css';

/* --- SUB-COMPONENTS --- */

const ArticleCard = ({ article, onClick }) => (
  <motion.div 
    className="knowledge-card"
    onClick={onClick}
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3 }}
  >
    <div className="card-cover">
      <img src={article.image} alt={article.title} />
    </div>
    <div className="card-content">
      <div className="card-meta">
        <LucideIcons.Calendar size={12} /> {article.date}
      </div>
      <h3 className="card-title">{article.title}</h3>
      <p className="card-desc">{article.desc}</p>
      <div className="card-tags">
        {article.tags?.map(tag => (
          <span key={tag} className="tag-pill">#{tag}</span>
        ))}
      </div>
    </div>
  </motion.div>
);

const ReaderModal = ({ article, onClose }) => (
  <motion.div 
    className="modal-overlay"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 50 }}
  >
    <div className="top-bar" style={{ padding: '1rem 2rem', background: '#030003', borderBottom: '1px solid #222' }}>
      <a className="back-btn" onClick={onClose}><LucideIcons.ArrowLeft size={20} /></a>
      <span style={{ marginLeft: '1rem', fontWeight: 600 }}>Reading Mode</span>
    </div>
    <div className="modal-content">
      <div style={{ marginBottom: '3rem', borderBottom: '1px solid #222', paddingBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
          {article.tags?.map(t => <span key={t} className="tag-pill">#{t}</span>)}
        </div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', lineHeight: '1.1', color: 'white', marginBottom: '1rem' }}>
          {article.title}
        </h1>
        <div style={{ color: '#888', fontFamily: 'monospace' }}>Written by Khilesh • {article.date}</div>
      </div>
      
     <div className="article-markdown-body">
        <div data-color-mode="dark">
          <MDEditor.Markdown source={article.content} />
        </div>
      </div>

    </div>
  </motion.div>
);

const RoadmapModal = ({ map, onClose }) => (
  <motion.div 
    className="modal-overlay"
    initial={{ opacity: 0, x: '100%' }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: '100%' }}
  >
    <div className="top-bar" style={{ padding: '1rem 2rem', background: '#030003', borderBottom: '1px solid #222' }}>
      <Link className="back-btn" onClick={onClose}><LucideIcons.ArrowLeft size={20} /></Link>
      <span style={{ marginLeft: '1rem', fontWeight: 600 }}>{map.title}</span>
    </div>
    <div className="modal-content">
      <div className="flow-container">
        {map.steps?.map((step, i) => (
          <div key={i} className="flow-step">
            <div className="flow-title">{step.title}</div>
            <div className="flow-desc">{step.desc}</div>
          </div>
        ))}
      </div>
    </div>
  </motion.div>
);

/* --- MAIN SECTIONS (Dynamic Data) --- */

const SnippetsView = () => {
  const [filterText, setFilterText] = useState("");
  const [selectedSnippet, setSelectedSnippet] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  // Fetch Snippets
  const { data: snippets = [], isLoading, error } = useQuery({
    queryKey: ['blogger-snippets'],
    queryFn: getBloggerSnippets
  });

  // Grouping Logic
  const groupedSnippets = useMemo(() => {
    const groups = {};
    snippets.forEach(s => {
      if (filterText && !s.title.toLowerCase().includes(filterText.toLowerCase())) return;
      const category = s.cat || "General";
      if (!groups[category]) groups[category] = [];
      groups[category].push(s);
    });
    return groups;
  }, [snippets, filterText]);

  useMemo(() => {
    if (snippets.length > 0 && !selectedSnippet) {
      setSelectedSnippet(snippets[0]);
    }
  }, [snippets, selectedSnippet]);

  const handleCopy = (code, id) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  if (isLoading) return <div className="loading-state"><LucideIcons.Loader2 className="animate-spin" /> Loading Vault...</div>;
  if (error) return <div className="error-state">Failed to load snippets.</div>;

  return (
    <div className="vault-layout">
      {/* Left Sidebar: List */}
      <div className="vault-sidebar">
        <div className="vault-search">
          <div className="mini-search">
            <LucideIcons.Search size={14} color="#666" />
            <input 
              type="text" 
              placeholder="Filter snippets..." 
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
          </div>
        </div>
        
        {Object.keys(groupedSnippets).length > 0 ? (
          Object.keys(groupedSnippets).map(cat => (
            <div key={cat} className="vault-cat-section">
              <div className="vault-cat-title"><LucideIcons.Folder size={12} /> {cat}</div>
              {groupedSnippets[cat].map(snip => (
                <div 
                  key={snip.id || snip._id}
                  className={`vault-item ${selectedSnippet?._id === snip._id ? 'active' : ''}`}
                  onClick={() => setSelectedSnippet(snip)}
                >
                  <LucideIcons.FileCode size={14} />
                  <span className="vault-item-text">{snip.title}</span>
                </div>
              ))}
            </div>
          ))
        ) : (
          <div style={{padding:'1rem', color:'#666', fontSize:'0.8rem'}}>No snippets found.</div>
        )}
      </div>

      {/* Right: Code Editor */}
      <div className="vault-editor">
        {selectedSnippet ? (
          <>
            <div className="editor-header">
              <div style={{display:'flex', alignItems:'center'}}>
                <span className="editor-title">{selectedSnippet.title}</span>
                <span className="editor-lang">{selectedSnippet.cat}</span>
              </div>
              <button className="copy-btn" onClick={() => handleCopy(selectedSnippet.code, selectedSnippet._id)}>
                {copiedId === selectedSnippet._id ? <LucideIcons.CheckCircle2 size={14} color="var(--accent)" /> : <LucideIcons.Copy size={14} />}
                {copiedId === selectedSnippet._id ? 'Copied' : 'Copy'}
              </button>
            </div>
            <pre className="editor-content">
              <code>{selectedSnippet.code}</code>
            </pre>
          </>
        ) : (
          <div className="empty-state">Select a snippet to view code</div>
        )}
      </div>
    </div>
  );
};

/* --- ARTICLES VIEW WITH SEARCH --- */
const FeedView = ({ onSelect }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: articles = [], isLoading, error } = useQuery({
    queryKey: ['blogger-articles'],
    queryFn: getBloggerArticles
  });

  const filteredArticles = useMemo(() => {
    if (!searchQuery) return articles;
    const lowerQuery = searchQuery.toLowerCase();
    
    return articles.filter(article => 
      article.title?.toLowerCase().includes(lowerQuery) ||
      article.desc?.toLowerCase().includes(lowerQuery) ||
      article.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  }, [articles, searchQuery]);

  if (isLoading) return <div className="loading-state"><LucideIcons.Loader2 className="animate-spin" /> Loading Articles...</div>;
  if (error) return <div className="error-state">Failed to load articles.</div>;

  return (
    <div>
      <div className="section-header">
        <div>
          <h2 className="section-title">Articles</h2>
          <p className="section-desc">Docs & Guides</p>
        </div>
        <div className="search-bar">
          <LucideIcons.Search size={18} color="#666" />
          <input 
            type="text" 
            placeholder="Search articles..." 
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="grid-layout">
        {filteredArticles.length > 0 ? (
          filteredArticles.map((a, i) => (
            <ArticleCard key={a.id || a._id || i} article={a} onClick={() => onSelect(a)} />
          ))
        ) : (
          <div className="empty-search" style={{ gridColumn: "1/-1", textAlign: "center", color: "#666", padding: "2rem" }}>
             No articles found matching "{searchQuery}"
          </div>
        )}
      </div>
    </div>
  );
};

/* --- UPDATED: ROADMAPS VIEW WITH SEARCH --- */
const RoadmapsView = ({ onSelect }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: roadmaps = [], isLoading, error } = useQuery({
    queryKey: ['blogger-roadmaps'],
    queryFn: getBloggerRoadmaps
  });

  // Filter Roadmaps
  const filteredRoadmaps = useMemo(() => {
    if (!searchQuery) return roadmaps;
    const lowerQuery = searchQuery.toLowerCase();

    return roadmaps.filter(map => 
      map.title?.toLowerCase().includes(lowerQuery) || 
      map.level?.toLowerCase().includes(lowerQuery)
    );
  }, [roadmaps, searchQuery]);

  if (isLoading) return <div className="loading-state"><LucideIcons.Loader2 className="animate-spin" /> Loading Roadmaps...</div>;
  if (error) return <div className="error-state">Failed to load roadmaps.</div>;

  return (
    <div>
      <div className="section-header">
        <div>
          <h2 className="section-title">Roadmaps</h2>
          <p className="section-desc">Learning Paths</p>
        </div>
        {/* ADDED SEARCH BAR */}
        <div className="search-bar">
          <LucideIcons.Search size={18} color="#666" />
          <input 
            type="text" 
            placeholder="Search roadmaps..." 
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="grid-layout">
        {filteredRoadmaps.length > 0 ? (
          filteredRoadmaps.map((map, i) => (
            <div key={map.id || map._id || i} className="knowledge-card roadmap-body" onClick={() => onSelect(map)}>
              <LucideIcons.Map size={60} className="roadmap-icon-bg" />
              <LucideIcons.Target size={40} color="var(--accent)" style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white', marginBottom: '0.5rem' }}>{map.title}</h3>
              <div style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: 'var(--accent)' }}>{map.level}</div>
            </div>
          ))
        ) : (
          <div className="empty-search" style={{ gridColumn: "1/-1", textAlign: "center", color: "#666", padding: "2rem" }}>
             No roadmaps found matching "{searchQuery}"
          </div>
        )}
      </div>
    </div>
  );
};

/* --- MAIN COMPONENT --- */

const BloggerTab = () => {
  const [activeTab, setActiveTab] = useState('feed'); 
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [selectedRoadmap, setSelectedRoadmap] = useState(null);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedArticle(null);
    setSelectedRoadmap(null);
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'feed': return <FeedView onSelect={setSelectedArticle} />;
      case 'roadmaps': return <RoadmapsView onSelect={setSelectedRoadmap} />;
      case 'snippets': return <SnippetsView />;
      default: return <FeedView onSelect={setSelectedArticle} />;
    }
  };

  return (
    <div id="blogger-page" className="blogger-container">
      <div className="content-wrapper">
        
        {/* LEFT: CONTENT AREA */}
        <div className="main-display">
          <AnimatePresence>
            {selectedArticle && <ReaderModal article={selectedArticle} onClose={() => setSelectedArticle(null)} />}
            {selectedRoadmap && <RoadmapModal map={selectedRoadmap} onClose={() => setSelectedRoadmap(null)} />}
          </AnimatePresence>

          <div className="top-bar">
            <Link className="back-btn" to={'/'}><LucideIcons.ArrowLeft size={20} /></Link>
            <div className="breadcrumbs">Terminal <span>/</span> Blogger <span>/</span> {activeTab.toUpperCase()}</div>
            <div style={{display:'flex', gap:'0.5rem', marginLeft:'auto'}}>
               <div style={{width:'8px', height:'8px', borderRadius:'50%', background:'#f472b6'}}></div>
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
            <h3 className="sidebar-title">KNOWLEDGE BASE</h3>
          </div>
          <div className="nav-group">
            <div 
              className={`nav-box-btn ${activeTab === 'feed' ? 'active' : ''}`}
              onClick={() => handleTabChange('feed')}
            >
              <LucideIcons.FileText size={40} className="nav-icon-bg" />
              <span className="nav-label">Articles</span>
              <span className="nav-sub">Docs & Guides</span>
            </div>
            
            <div 
              className={`nav-box-btn ${activeTab === 'roadmaps' ? 'active' : ''}`}
              onClick={() => handleTabChange('roadmaps')}
            >
              <LucideIcons.Map size={40} className="nav-icon-bg" />
              <span className="nav-label">Roadmaps</span>
              <span className="nav-sub">Learning Paths</span>
            </div>
            
            <div 
              className={`nav-box-btn ${activeTab === 'snippets' ? 'active' : ''}`}
              onClick={() => handleTabChange('snippets')}
            >
              <LucideIcons.Code size={40} className="nav-icon-bg" />
              <span className="nav-label">Snippets</span>
              <span className="nav-sub">Code Atoms</span>
            </div>
          </div>

          {/* Footer Stats */}
          <div className="sidebar-footer">
            <div className="stat-row">
              <span>DOCS: 124</span>
              <span>READ: 48%</span>
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

export default BloggerTab;