// src/components/WordPad.jsx
import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import MDEditor from '@uiw/react-md-editor';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code2, X, Save, Bold, Italic, Link, List, Heading1, Quote, Image,
  Columns, Eye, HelpCircle, Terminal, Check, Monitor, Smartphone
} from 'lucide-react';
import './WordPad.css';

const DEFAULT = { initialValue: '', onSave: null };

const WordPad = () => {
  const [open, setOpen] = useState(false);
  const [payload, setPayload] = useState(DEFAULT);

  useEffect(() => {
    const handler = (e) => {
      const d = e?.detail || {};
      setPayload({ initialValue: d.initialValue || '', onSave: d.onSave || null });
      setOpen(true);
    };
    window.addEventListener('openWordPad', handler);
    return () => window.removeEventListener('openWordPad', handler);
  }, []);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <Overlay
          payload={payload}
          onClose={() => setOpen(false)}
          onSave={(txt) => {
            if (typeof payload.onSave === 'function') payload.onSave(txt);
            setOpen(false);
          }}
        />
      )}
    </AnimatePresence>,
    document.body
  );
};

export default WordPad;

/* ---------------- Overlay Component ---------------- */

const Overlay = ({ payload, onClose, onSave }) => {
  const [code, setCode] = useState(payload.initialValue || '');
  const [view, setView] = useState('split'); 
  const [showHelp, setShowHelp] = useState(false);
  const textareaRef = useRef(null);

  // Responsive: On mount, check if mobile. If so, default to 'edit' mode (no split)
  useEffect(() => {
    if (window.innerWidth < 768) {
      setView('edit');
    }
    setCode(payload.initialValue || '');
  }, [payload.initialValue]);

  const insertText = (before, after) => {
    const ta = textareaRef.current;
    if (ta) {
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      const selected = code.slice(start, end) || 'text';
      const next = code.slice(0, start) + before + selected + after + code.slice(end);
      setCode(next);
      requestAnimationFrame(() => {
        ta.focus();
        const pos = start + before.length + (selected === 'text' ? 4 : selected.length);
        ta.setSelectionRange(pos, pos);
      });
    } else {
      setCode(prev => `${prev}\n${before}text${after}`);
    }
  };

  return (
    <div className="wp-portal-overlay" onClick={onClose}>
      <motion.div
        className="wp-portal-modal"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.98, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 15 }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* --- Header --- */}
        <header className="wp-header">
          <div className="wp-header-left">
            <div className="wp-icon-box">
              <Code2 size={18} className="wp-brand-icon" />
            </div>
            <div className="wp-meta mobile-hide">
              <div className="wp-title">WordPad</div>
            </div>
          </div>

          <div className="wp-header-center">
            <div className="wp-view-toggle">
               <button className={view === 'edit' ? 'active' : ''} onClick={() => setView('edit')} title="Editor">
                 <Code2 size={14}/> <span className="toggle-label">Edit</span>
               </button>
               
               {/* Hide Split on Mobile via CSS class */}
               <button className={`mobile-hide ${view === 'split' ? 'active' : ''}`} onClick={() => setView('split')} title="Split">
                 <Columns size={14}/> <span className="toggle-label">Split</span>
               </button>

               <button className={view === 'preview' ? 'active' : ''} onClick={() => setView('preview')} title="Preview">
                 <Eye size={14}/> <span className="toggle-label">View</span>
               </button>
            </div>
          </div>

          <div className="wp-header-right">
            <button 
              className={`wp-btn-icon ${showHelp ? 'active' : ''}`} 
              onClick={() => setShowHelp(!showHelp)} 
              title="Markdown Guide"
            >
              <HelpCircle size={18} />
            </button>
            <button className="wp-btn-icon" onClick={onClose} title="Close"><X size={18} /></button>
            
            {/* Mobile: Icon only | Desktop: Icon + Text */}
            <button className="wp-btn-primary" onClick={() => onSave(code)}>
              <Save size={16} /> <span className="btn-label">Push Content</span>
            </button>
          </div>
        </header>

        {/* --- Toolbar (Scrollable on Mobile) --- */}
        <div className="wp-toolbar-row">
          <div className="wp-toolbar-scroll-container">
            <div className="wp-toolbar-group">
              <button onClick={() => insertText('# ', '')} title="Heading 1"><Heading1 size={18} /></button>
              <button onClick={() => insertText('**', '**')} title="Bold"><Bold size={18} /></button>
              <button onClick={() => insertText('*', '*')} title="Italic"><Italic size={18} /></button>
              <div className="wp-divider" />
              <button onClick={() => insertText('> ', '')} title="Quote"><Quote size={18} /></button>
              <button onClick={() => insertText('```\n', '\n```')} title="Code Block"><Terminal size={18} /></button>
              <div className="wp-divider" />
              <button onClick={() => insertText('- ', '')} title="List"><List size={18} /></button>
              <button onClick={() => insertText('[', '](url)')} title="Link"><Link size={18} /></button>
              <button onClick={() => insertText('![alt](', ')')} title="Image"><Image size={18} /></button>
            </div>
          </div>
        </div>

        {/* --- Workspace --- */}
        <div className="wp-workspace-container">
          <div className={`wp-workspace view-${view}`}>
            {(view === 'edit' || view === 'split') && (
              <div className="wp-pane input-pane">
                <textarea
                  ref={textareaRef}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="wp-plain-textarea"
                  spellCheck="false"
                  placeholder="Type here..."
                />
              </div>
            )}
            
            {(view === 'preview' || view === 'split') && (
              <div className="wp-pane preview-pane">
                <div className="preview-scroll">
                  <div className="wp-markdown-body">
                    <MDEditor.Markdown source={code || ''} />
                  </div>
                </div>
              </div>
            )}
          </div>

          <AnimatePresence>
            {showHelp && <HelpSidebar onClose={() => setShowHelp(false)} />}
          </AnimatePresence>
        </div>

        {/* --- Footer --- */}
        <footer className="wp-footer">
          <div className="wp-stat-item">
             <span className="mobile-hide">Lines:</span> <strong>{code ? code.split('\n').length : 0}</strong>
          </div>
          <div className="wp-stat-item">
             <span className="mobile-hide">Chars:</span> <strong>{code ? code.length : 0}</strong>
          </div>
          <div className="wp-footer-right mobile-hide">
             <span>Markdown Supported</span>
             <Check size={12} className="text-teal" />
          </div>
        </footer>

      </motion.div>
    </div>
  );
};

/* --- Internal Help Sidebar Component --- */
const HelpSidebar = ({ onClose }) => (
  <motion.div 
    className="wp-help-sidebar"
    initial={{ x: '100%' }}
    animate={{ x: 0 }}
    exit={{ x: '100%' }}
    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
  >
    <div className="wp-help-header">
       <span className="wp-help-title">Cheat Sheet</span>
       <button onClick={onClose}><X size={16} /></button>
    </div>
    <div className="wp-help-content">
      <HelpItem label="Heading 1" code="# Title" />
      <HelpItem label="Heading 2" code="## Section" />
      <HelpItem label="Bold" code="**Bold**" />
      <HelpItem label="Italic" code="*Italic*" />
      <HelpItem label="Quote" code="> Text" />
      <HelpItem label="List" code="- Item" />
      <HelpItem label="Link" code="[Txt](url)" />
      <HelpItem label="Image" code="![Alt](url)" />
      <HelpItem label="Code" code="```js...```" />
      <HelpItem label="Inline" code="`code`" />
    </div>
  </motion.div>
);

const HelpItem = ({ label, code }) => (
  <div className="wp-help-item">
    <span className="label">{label}</span>
    <code className="syntax">{code}</code>
  </div>
);