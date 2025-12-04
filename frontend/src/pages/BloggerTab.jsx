import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, BookOpen, Clock, Calendar, 
  Search, Edit3, Bookmark, Share2, FileText, 
  Map, CheckCircle2, ChevronRight,
  Target, Briefcase, X, ArrowUpRight,
  Copy, Terminal, Server, Shield, Box, 
  Zap, Database, GitBranch, Layout, Check,
  AlertTriangle, Filter, Hash, Code, Folder, FileCode,
  Layers, Cpu
} from 'lucide-react';

import './BloggerTab.css';

/* --- DATA --- */

const SNIPPETS_DATA = [
  { id: 1, cat: "JavaScript", title: "Debounce Function", code: "function debounce(func, delay) {\n  let timer;\n  return (...args) => {\n    clearTimeout(timer);\n    timer = setTimeout(() => func(...args), delay);\n  };\n}" },
  { id: 2, cat: "JavaScript", title: "Deep Clone", code: "const deepClone = (obj) => JSON.parse(JSON.stringify(obj));" },
  { id: 3, cat: "React", title: "useFetch Hook", code: "const useFetch = (url) => {\n  const [data, setData] = useState(null);\n  useEffect(() => {\n    fetch(url).then(res => res.json())\n      .then(setData);\n  }, [url]);\n  return data;\n};" },
  { id: 4, cat: "React", title: "Click Outside Hook", code: "function useOnClickOutside(ref, handler) {\n  useEffect(() => {\n    const listener = (event) => {\n      if (!ref.current || ref.current.contains(event.target)) return;\n      handler(event);\n    };\n    document.addEventListener('mousedown', listener);\n    return () => document.removeEventListener('mousedown', listener);\n  }, [ref, handler]);\n}" },
  { id: 5, cat: "Node", title: "Rate Limiter", code: "const rateLimit = require('express-rate-limit');\nconst limiter = rateLimit({\n  windowMs: 15 * 60 * 1000,\n  max: 100\n});\napp.use(limiter);" },
  { id: 6, cat: "MongoDB", title: "Pagination Query", code: "const items = await Model.find()\n  .skip((page - 1) * limit)\n  .limit(limit)\n  .exec();" },
  { id: 7, cat: "DevOps", title: "Dockerfile Node", code: "FROM node:18-alpine\nWORKDIR /app\nCOPY . .\nRUN npm install\nCMD [\"npm\", \"start\"]" }
];

// Helper to group snippets
const getGroupedSnippets = (filterText) => {
  const groups = {};
  SNIPPETS_DATA.forEach(s => {
    if (filterText && !s.title.toLowerCase().includes(filterText.toLowerCase())) return;
    if (!groups[s.cat]) groups[s.cat] = [];
    groups[s.cat].push(s);
  });
  return groups;
};

const ROADMAPS = [
  {
    id: 'mern', title: "MERN Stack Mastery", level: "Full Stack",
    steps: [
      { title: "Foundations", desc: "HTML5, CSS3 (Flexbox/Grid), ES6+ JavaScript syntax and DOM manipulation." },
      { title: "React Ecosystem", desc: "Hooks, Context API, Redux Toolkit, and React Router v6." },
      { title: "Backend Logic", desc: "Node.js runtime, Express middleware, RESTful API design patterns." },
      { title: "Database", desc: "MongoDB Atlas setup, Mongoose schemas, indexing strategies." },
      { title: "Deployment", desc: "CI/CD pipelines, Render/Vercel deployment, Environment management." }
    ]
  },
  {
    id: 'tailwind', title: "Tailwind CSS Pro", level: "Frontend",
    steps: [
      { title: "Utility First", desc: "Understanding the paradigm shift from semantic CSS." },
      { title: "Configuration", desc: "Customizing tailwind.config.js, themes, and plugins." },
      { title: "Advanced", desc: "Directives, arbitrary values, and dark mode implementation." }
    ]
  },
  {
    id: 'system', title: "System Design Basics", level: "Architecture",
    steps: [
      { title: "Networking", desc: "HTTP/HTTPS, TCP/IP, DNS, Load Balancers." },
      { title: "Scalability", desc: "Horizontal vs Vertical scaling, Caching (Redis), CDNs." },
      { title: "Data Management", desc: "CAP Theorem, SQL vs NoSQL, Sharding, Replication." }
    ]
  }
];

const ARTICLES = [
  {
    id: 1, title: "Mastering React Server Components", date: "OCT 2024", tags: ["React", "Performance"],
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800",
    desc: "A deep dive into the architecture of RSCs and how they differ from traditional SSR.",
    content: [
      { type: 'p', text: "React Server Components (RSC) represent a paradigm shift in how we build React applications. Unlike traditional SSR, RSCs never hydrate on the client." },
      { type: 'h2', text: "Why RSC?" },
      { type: 'ul', items: ["Zero Bundle Size for Server Components", "Direct Backend Access", "Automatic Code Splitting"] },
      { type: 'code', lang: 'jsx', text: "async function Note({ id }) {\n  const note = await db.notes.get(id);\n  return <div>{note.text}</div>;\n}" }
    ]
  },
  {
    id: 2, title: "The Microservices Handbook", date: "SEP 2024", tags: ["Backend", "DevOps"],
    image: "https://images.unsplash.com/photo-1558494949-ef526b0042a0?auto=format&fit=crop&q=80&w=800",
    desc: "Structuring a scalable architecture using Node.js, Docker, and Kubernetes.",
    content: [
      { type: 'p', text: "Microservices offer scalability but introduce complexity. The key is defining clear boundaries between services." }
    ]
  },
  {
    id: 3, title: "Minimalism in UI Engineering", date: "AUG 2024", tags: ["Design", "Philosophy"],
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800",
    desc: "How whitespace and typography create hierarchy in modern web interfaces.",
    content: [
      { type: 'p', text: "Minimalism isn't just about removing things; it's about adding focus." }
    ]
  }
];

/* --- COMPONENTS --- */

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
        <Calendar size={12} /> {article.date}
      </div>
      <h3 className="card-title">{article.title}</h3>
      <p className="card-desc">{article.desc}</p>
      <div className="card-tags">
        {article.tags.map(tag => (
          <span key={tag} className="tag-pill">#{tag}</span>
        ))}
      </div>
    </div>
  </motion.div>
);

const ContentRenderer = ({ content }) => {
  return (
    <div className="rich-content">
      {content.map((block, i) => {
        switch (block.type) {
          case 'h2':
            return <h2 key={i}>{block.text}</h2>;
          case 'p':
            return <p key={i}>{block.text}</p>;
          case 'code':
            return (
              <pre key={i}><code>{block.text}</code></pre>
            );
          case 'ul':
            return (
              <ul key={i}>{block.items.map((li, j) => <li key={j}>{li}</li>)}</ul>
            );
          default:
            return null;
        }
      })}
    </div>
  );
};

const ReaderModal = ({ article, onClose }) => (
  <motion.div 
    className="modal-overlay"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 50 }}
  >
    <div className="top-bar" style={{ padding: '1rem 2rem', background: '#030003', borderBottom: '1px solid #222' }}>
      <button className="back-btn" onClick={onClose}><ArrowLeft size={20} /></button>
      <span style={{ marginLeft: '1rem', fontWeight: 600 }}>Reading Mode</span>
    </div>
    <div className="modal-content rich-content">
      <div style={{ marginBottom: '3rem', borderBottom: '1px solid #222', paddingBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
          {article.tags.map(t => <span key={t} className="tag-pill">#{t}</span>)}
        </div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', lineHeight: '1.1', color: 'white', marginBottom: '1rem' }}>
          {article.title}
        </h1>
        <div style={{ color: '#888', fontFamily: 'monospace' }}>Written by Khilesh • {article.date}</div>
      </div>
      <ContentRenderer content={article.content} />
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
      <button className="back-btn" onClick={onClose}><ArrowLeft size={20} /></button>
      <span style={{ marginLeft: '1rem', fontWeight: 600 }}>{map.title}</span>
    </div>
    <div className="modal-content">
      <div className="flow-container">
        {map.steps.map((step, i) => (
          <div key={i} className="flow-step">
            <div className="flow-title">{step.title}</div>
            <div className="flow-desc">{step.desc}</div>
          </div>
        ))}
      </div>
    </div>
  </motion.div>
);

/* --- SNIPPETS VIEW (Code Vault) --- */
const SnippetsView = () => {
  const [filterText, setFilterText] = useState("");
  const groupedSnippets = getGroupedSnippets(filterText);
  const [selectedSnippet, setSelectedSnippet] = useState(SNIPPETS_DATA[0]);
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (code, id) => {
    const textArea = document.createElement("textarea");
    textArea.value = code;
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Copy failed', err);
    }
    document.body.removeChild(textArea);
  };

  return (
    <div className="vault-layout">
      {/* Left Sidebar: List of Files with Search */}
      <div className="vault-sidebar">
        <div className="vault-search">
          <div className="mini-search">
            <Search size={14} color="#666" />
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
              <div className="vault-cat-title"><Folder size={12} /> {cat}</div>
              {groupedSnippets[cat].map(snip => (
                <div 
                  key={snip.id}
                  className={`vault-item ${selectedSnippet.id === snip.id ? 'active' : ''}`}
                  onClick={() => setSelectedSnippet(snip)}
                >
                  <FileCode size={14} />
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
        <div className="editor-header">
          <div style={{display:'flex', alignItems:'center'}}>
            <span className="editor-title">{selectedSnippet.title}</span>
            <span className="editor-lang">{selectedSnippet.cat}</span>
          </div>
          <button className="copy-btn" onClick={() => handleCopy(selectedSnippet.code, selectedSnippet.id)}>
            {copiedId === selectedSnippet.id ? <CheckCircle2 size={14} color="var(--accent)" /> : <Copy size={14} />}
            {copiedId === selectedSnippet.id ? 'Copied' : 'Copy'}
          </button>
        </div>
        <pre className="editor-content">
          <code>{selectedSnippet.code}</code>
        </pre>
      </div>
    </div>
  );
};

/* --- MAIN SECTIONS --- */
const FeedView = ({ onSelect }) => (
  <div>
    <div className="section-header">
      <div>
        <h2 className="section-title">Articles</h2>
        <p className="section-desc">Docs & Guides</p>
      </div>
      <div className="search-bar">
        <Search size={18} color="#666" />
        <input type="text" placeholder="Search articles..." className="search-input" />
      </div>
    </div>
    <div className="grid-layout">
      {ARTICLES.map(a => <ArticleCard key={a.id} article={a} onClick={() => onSelect(a)} />)}
    </div>
  </div>
);

const RoadmapsView = ({ onSelect }) => (
  <div>
    <div className="section-header">
      <div>
        <h2 className="section-title">Roadmaps</h2>
        <p className="section-desc">Learning Paths</p>
      </div>
    </div>
    <div className="grid-layout">
      {ROADMAPS.map(map => (
        <div key={map.id} className="knowledge-card roadmap-body" onClick={() => onSelect(map)}>
          <Map size={60} className="roadmap-icon-bg" />
          <Target size={40} color="var(--accent)" style={{ marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white', marginBottom: '0.5rem' }}>{map.title}</h3>
          <div style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: 'var(--accent)' }}>{map.level}</div>
        </div>
      ))}
    </div>
  </div>
);

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
    <div className="blogger-container">
      <div className="content-wrapper">
        
        {/* LEFT: CONTENT AREA */}
        <div className="main-display">
          <AnimatePresence>
            {selectedArticle && <ReaderModal article={selectedArticle} onClose={() => setSelectedArticle(null)} />}
            {selectedRoadmap && <RoadmapModal map={selectedRoadmap} onClose={() => setSelectedRoadmap(null)} />}
          </AnimatePresence>

          <div className="top-bar">
            <button className="back-btn" onClick={() => window.location.reload()}><ArrowLeft size={20} /></button>
            <div className="breadcrumbs">Terminal <span>/</span> Blogger <span>/</span> {activeTab.toUpperCase()}</div>
            <div style={{display:'flex', gap:'0.5rem', marginRight:'1rem'}}>
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
              <FileText size={40} className="nav-icon-bg" />
              <span className="nav-label">Articles</span>
              <span className="nav-sub">Docs & Guides</span>
            </div>
            
            <div 
              className={`nav-box-btn ${activeTab === 'roadmaps' ? 'active' : ''}`}
              onClick={() => handleTabChange('roadmaps')}
            >
              <Map size={40} className="nav-icon-bg" />
              <span className="nav-label">Roadmaps</span>
              <span className="nav-sub">Learning Paths</span>
            </div>
            
            <div 
              className={`nav-box-btn ${activeTab === 'snippets' ? 'active' : ''}`}
              onClick={() => handleTabChange('snippets')}
            >
              <Code size={40} className="nav-icon-bg" />
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
