import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';
import { 
  ArrowUpRight, Code2, Palette, Terminal, Cpu, Zap, 
  Github, Twitter, Linkedin, Instagram, Globe, 
  Music, Battery, Wifi, Lock, User, Mail,
  LayoutGrid, Share2, Plus, MapPin, Cloud, Play
} from 'lucide-react';

import ProfileImg from '../assets/Profile.png';
import './Hero.css'

/* --- UTILS --- */

const DecryptText = ({ text, className }) => {
  const [displayText, setDisplayText] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";

  const scramble = () => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(prev => 
        text.split("").map((letter, index) => {
          if (index < iteration) return text[index];
          return chars[Math.floor(Math.random() * chars.length)];
        }).join("")
      );
      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 3;
    }, 30);
  };

  return (
    <span onMouseEnter={scramble} className={`cursor-default ${className}`}>
      {displayText}
    </span>
  );
};

const Clock = () => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="clock-container">
      <h1 className="clock-time">
        {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
      </h1>
      <p className="clock-date font-mono uppercase">
        {time.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
      </p>
    </div>
  );
};

/* --- COMPONENTS --- */

const LockScreen = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, -1000]); 
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);
  const scale = useTransform(scrollY, [0, 600], [1, 0.9]);
  const blur = useTransform(scrollY, [0, 600], ["0px", "10px"]);

  return (
    <motion.div 
      style={{ y, opacity, scale, filter: `blur(${blur})` }}
      className="lock-screen z-50"
    >
      <div className="lock-header font-mono uppercase">
        <div className="flex items-center gap-2"><Lock size={14} /> System Locked</div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1"><Cloud size={14} /> 72°F</div>
          <Wifi size={14} />
          <Battery size={14} />
        </div>
      </div>

      <div className="relative w-full flex justify-center">
        <Clock />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] opacity-[0.05] pointer-events-none" 
             style={{ backgroundColor: '#1DCD9F', filter: 'blur(120px)', borderRadius: '9999px' }} />
      </div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="flex flex-col items-center gap-2"
      >
        <div className="swipe-line" />
        <p className="swipe-text font-mono uppercase animate-pulse">Swipe Up to Unlock</p>
      </motion.div>
    </motion.div>
  );
};

const BentoCard = ({ children, className = "", color = "#1DCD9F", onClick, delay = 0 }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const xPct = (e.clientX - rect.left) / width - 0.5;
    const yPct = (e.clientY - rect.top) / height - 0.5;
    x.set(yPct * 5); 
    y.set(xPct * -5); 
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay, ease: "easeOut" }}
      viewport={{ once: true }}
      style={{
        rotateX: useSpring(x, { stiffness: 200, damping: 20 }),
        rotateY: useSpring(y, { stiffness: 200, damping: 20 }),
        transformStyle: 'preserve-3d'
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`bento-card group ${className}`}
    >
      {/* 1. ANIMATED GRID BACKGROUND */}
      <div 
        className="grid-bg-reveal"
        style={{
          backgroundImage: `
            linear-gradient(to right, ${color}15 1px, transparent 1px),
            linear-gradient(to bottom, ${color}15 1px, transparent 1px)
          `
        }}
      >
         <div className="grid-bg-mask"></div>
      </div>

      {/* 2. SOLID BORDER GLOW */}
      <div 
        className="border-glow"
        style={{ color: color }}
      />
      
      {/* 3. CORNER ACCENTS */}
      <div className="corner-plus">
         <Plus size={10} style={{ color: color }} />
      </div>

      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </motion.div>
  );
};

const MenuItem = ({ title, icon: Icon, sub, color, children }) => (
  <div className="menu-item">
    <div className="flex justify-between items-start">
      <div 
        className="icon-box" 
        style={{ color: color }}
      >
        {/* Background fill on hover (handled by CSS targeting .icon-bg-fill) */}
        <div className="icon-bg-fill" style={{ backgroundColor: color }}></div>
        <Icon size={24} strokeWidth={2} className="relative z-10" />
      </div>
      
      <ArrowUpRight className="arrow-icon" size={18} />
    </div>
    
    {children && (
      <div style={{ marginTop: '1rem', marginBottom: '0.5rem', opacity: 0.5, transition: 'opacity 0.3s' }} className="group-hover:opacity-100">
        {children}
      </div>
    )}
    
    <div style={{ marginTop: 'auto' }}>
      <h3 className="menu-title uppercase tracking-tighter" style={{ color: 'white' }}>
        <DecryptText text={title} />
      </h3>
      <div className="menu-sub">
        <div className="progress-bar" style={{ color: color }}></div>
        <p className="sub-text font-mono uppercase tracking-wider">{sub}</p>
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      
      {/* HEADER */}
      <div className="main-header">
        <div>
           <div className="status-badge">
             <span className="ping-dot">
               <span className="absolute animate-ping" style={{ height: '100%', width: '100%', borderRadius: '9999px', backgroundColor: '#1DCD9F', opacity: 0.75 }}></span>
               <span className="relative" style={{ height: '0.5rem', width: '0.5rem', borderRadius: '9999px', backgroundColor: '#1DCD9F' }}></span>
             </span>
             <span className="font-mono uppercase tracking-widest text-xs" style={{ color: '#1DCD9F' }}>System Online</span>
           </div>
          <h2 className="main-title uppercase tracking-tighter text-white">
            Work<span>Station</span>
          </h2>
        </div>
        <div className="header-meta">
           <div className="location-tag">
              <MapPin size={12} color="#1DCD9F" />
              <span className="font-mono uppercase">37.7749° N, 122.4194° W</span>
           </div>
           <p className="font-mono text-xs uppercase tracking-widest text-right" style={{ color: 'var(--text-gray)' }}>
              Khilesh T. // V 4.5 <br /> 
              Architecture & Design
           </p>
        </div>
      </div>

      {/* MOSAIC GRID LAYOUT */}
      <div className="bento-grid">
        
        {/* 1. PROFILE CARD */}
        <BentoCard color="#1DCD9F" delay={0.1} className="col-span-2 row-span-3 flex flex-col p-0">
          <div className="profile-img-container">
            <img 
              src={ProfileImg} 
              alt="Profile" 
              className="profile-img" 
            />
            <div className="profile-overlay"></div>
            
            {/* Status Pill on Image */}
            <div className="status-pill">
              <div className="animate-pulse" style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#1DCD9F' }}></div>
              <span className="uppercase font-bold tracking-wider text-white" style={{ fontSize: '10px' }}>Available for Hire</span>
            </div>
          </div>
          
          <div className="profile-content">
            <div className="absolute top-0 right-0 pointer-events-none" style={{ width: '8rem', height: '8rem', backgroundColor: '#1DCD9F', opacity: 0.03, filter: 'blur(40px)', borderRadius: '50%' }}></div>
            
            <div>
              <h3 className="relative z-10 profile-title">Khilesh Thakur.</h3>
              <p className="font-mono uppercase tracking-widest" style={{ color: '#1DCD9F', fontSize: '0.75rem', marginBottom: '1rem' }}>Full Stack Architect</p>
              <p className="relative z-10" style={{ color: 'var(--text-gray)', fontSize: '0.875rem', lineHeight: 1.6, maxWidth: '28rem' }}>
                Building digital products that live on the internet. Obsessed with micro-interactions and clean code.
              </p>
            </div>
            
            {/* Action Bar */}
            <div className="profile-actions">
                <div className="flex gap-4">
                  <button className="action-btn uppercase">
                     <User size={14} /> Bio
                  </button>
                  <button className="action-btn uppercase">
                     <Share2 size={14} /> Share
                  </button>
                </div>
                
                {/* Skill Ticker */}
                <div className="flex gap-3 font-mono uppercase" style={{ fontSize: '10px', color: '#4b5563' }}>
                  <span>React</span><span>•</span><span>Node</span><span>•</span><span>WebGL</span>
                </div>
            </div>
          </div>
        </BentoCard>

        {/* 2. DEVELOPER (With Code Snippet Detail) */}
        <BentoCard color="#1DCD9F" delay={0.2} className="col-span-2 row-span-1">
            <MenuItem title="Developer" icon={Code2} sub="React • Node • Next" color="#1DCD9F">
               <div className="flex flex-col gap-1 w-full" style={{ opacity: 0.3 }}>
                 <div style={{ height: '4px', width: '75%', backgroundColor: '#1DCD9F', borderRadius: '9999px' }}></div>
                 <div style={{ height: '4px', width: '50%', backgroundColor: '#1DCD9F', borderRadius: '9999px', marginLeft: '0.5rem' }}></div>
                 <div style={{ height: '4px', width: '66%', backgroundColor: '#1DCD9F', borderRadius: '9999px' }}></div>
               </div>
            </MenuItem>
        </BentoCard>

        {/* 3. DESIGNER (With Color Palette Detail) */}
        <BentoCard color="#C084FC" delay={0.3} className="col-span-2 row-span-1">
            <MenuItem title="Designer" icon={Palette} sub="Figma • Spline" color="#C084FC">
               <div className="flex gap-2">
                 <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#C084FC' }}></div>
                 <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'white' }}></div>
                 <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#f472b6' }}></div>
                 <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#60a5fa' }}></div>
               </div>
            </MenuItem>
        </BentoCard>

        {/* 4. BLOGGER (With Text Lines) */}
        <BentoCard color="#F472B6" delay={0.4} className="col-span-2 row-span-1">
            <MenuItem title="Blogger" icon={Terminal} sub="Tech • Rants" color="#F472B6">
               <div className="font-mono" style={{ fontSize: '8px', color: '#F472B6', opacity: 0.5, lineHeight: 1.2 }}>
                  {'>'} git commit -m "update"<br/>
                  {'>'} npm run build<br/>
                  {'>'} deploy success
               </div>
            </MenuItem>
        </BentoCard>

        {/* 5. CREATOR (With Play Button) */}
        <BentoCard color="#22d3ee" delay={0.5} className="col-span-2 row-span-1">
            <MenuItem title="Creator" icon={Zap} sub="Video • Content" color="#22d3ee">
               <div className="flex items-center gap-2">
                 <div style={{ width: '1.5rem', height: '1.5rem', borderRadius: '50%', border: '1px solid #22d3ee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                   <Play size={8} fill="currentColor" style={{ color: '#22d3ee' }} />
                 </div>
                 <div style={{ height: '1px', width: '2rem', backgroundColor: '#22d3ee', opacity: 0.3 }}></div>
               </div>
            </MenuItem>
        </BentoCard>

        {/* 6. TWITTER */}
        <BentoCard color="#1DA1F2" delay={0.6} className="col-span-1 row-span-1 group">
           <div className="menu-item">
             <div className="flex justify-between items-start">
                <div style={{ padding: '0.75rem', backgroundColor: 'rgba(29, 161, 242, 0.1)', borderRadius: '0.5rem', color: '#1DA1F2' }}>
                   <Twitter size={24} />
                </div>
                <ArrowUpRight className="arrow-icon" size={18} />
             </div>
             <div style={{ marginTop: 'auto' }}>
                <p className="font-mono uppercase tracking-wider" style={{ color: 'var(--text-gray)', fontSize: '0.625rem', marginBottom: '0.25rem' }}>Latest Post</p>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'white' }}>@Tweets</h4>
             </div>
           </div>
        </BentoCard>

        {/* 7. LINKEDIN */}
        <BentoCard color="#0077b5" delay={0.7} className="col-span-1 row-span-1 group">
           <div className="menu-item">
             <div className="flex justify-between items-start">
                <div style={{ padding: '0.75rem', backgroundColor: 'rgba(0, 119, 181, 0.1)', borderRadius: '0.5rem', color: '#0077b5' }}>
                   <Linkedin size={24} />
                </div>
                <ArrowUpRight className="arrow-icon" size={18} />
             </div>
             <div style={{ marginTop: 'auto' }}>
                <p className="font-mono uppercase tracking-wider" style={{ color: 'var(--text-gray)', fontSize: '0.625rem', marginBottom: '0.25rem' }}>Professional</p>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'white' }}>/in/Khilesh</h4>
             </div>
           </div>
        </BentoCard>

        {/* 8. GITHUB */}
        <BentoCard color="#ffffff" delay={0.8} className="col-span-1 row-span-1 group">
           <div className="menu-item">
             <div className="flex justify-between items-start">
                <div style={{ padding: '0.75rem', backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '0.5rem', color: 'white' }}>
                   <Github size={24} />
                </div>
                <ArrowUpRight className="arrow-icon" size={18} />
             </div>
             <div style={{ marginTop: 'auto' }}>
                <p className="font-mono uppercase tracking-wider" style={{ color: 'var(--text-gray)', fontSize: '0.625rem', marginBottom: '0.25rem' }}>Source Code</p>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'white', textDecoration: 'underline', textUnderlineOffset: '4px', textDecorationColor: 'rgba(255,255,255,0.3)' }}>/Khilesh-Dev</h4>
             </div>
           </div>
        </BentoCard>

        {/* 9. SYSTEM STATUS */}
        <BentoCard color="#FACC15" delay={0.9} className="col-span-1 row-span-1 p-6 flex flex-col justify-between overflow-hidden">
            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between', position: 'relative', zIndex: 10 }}>
              <div className="flex justify-between items-start z-10">
                 <div className="flex items-center gap-2">
                   <Cpu size={20} color="#FACC15" />
                   <span className="text-xs font-bold tracking-wider" style={{ color: '#FACC15' }}>CPU</span>
                 </div>
                 <div className="flex gap-1">
                   <div className="animate-pulse" style={{ width: '4px', height: '4px', backgroundColor: '#FACC15', borderRadius: '50%' }}></div>
                   <div className="animate-pulse" style={{ width: '4px', height: '4px', backgroundColor: '#FACC15', borderRadius: '50%', animationDelay: '0.1s' }}></div>
                 </div>
              </div>
              
              <div className="mt-auto flex justify-between items-end">
                 <div>
                    <h4 style={{ fontSize: '1.875rem', fontWeight: 700, letterSpacing: '-0.05em', margin: 0 }}>98<span style={{ fontSize: '1rem', fontWeight: 400, color: 'var(--text-gray)' }}>%</span></h4>
                    <p className="font-mono uppercase" style={{ fontSize: '0.625rem', color: 'var(--text-gray)', marginTop: '0.25rem' }}>System Optimal</p>
                 </div>
                 <div style={{ textAlign: 'right' }}>
                   <span className="font-mono" style={{ fontSize: '0.625rem', color: 'var(--text-gray)' }}>MEM: 16GB</span>
                 </div>
              </div>
            </div>
            
            {/* Animated Graph Line */}
            <div className="absolute bottom-0 left-0 right-0 pointer-events-none flex items-end justify-between px-6 pb-6 gap-1" 
                 style={{ height: '6rem', opacity: 0.2, padding: '0 1.5rem 1.5rem 1.5rem' }}>
               {[40, 60, 45, 80, 55, 90, 70, 85, 60, 95].map((h, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ height: '20%' }}
                    animate={{ height: [`${h}%`, `${h - 20}%`, `${h}%`] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.1 }}
                    style={{ width: '100%', backgroundColor: '#FACC15', borderTopLeftRadius: '2px', borderTopRightRadius: '2px' }}
                  />
               ))}
            </div>
        </BentoCard>

      </div>

      {/* FOOTER */}
      <footer className="footer font-mono uppercase">
         <div className="flex items-center gap-2">
           <div className="animate-pulse" style={{ width: '6px', height: '6px', backgroundColor: '#22c55e', borderRadius: '50%' }}></div>
           <p>Secure Connection // Encrypted</p>
         </div>
         <p style={{ marginTop: '0.5rem' }}>© 2024 Khilesh T.</p>
      </footer>
    </div>
  );
};

/* --- BACKGROUND --- */
const BackgroundGrid = () => (
  <div className="bg-grid"></div>
);

/* --- APP ENTRY --- */
export default function Hero() {
  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      <BackgroundGrid />
      <LockScreen />
      <Dashboard />
    </div>
  );
}