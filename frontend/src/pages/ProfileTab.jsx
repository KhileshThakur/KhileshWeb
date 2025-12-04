import React from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, MapPin, Github, Linkedin, Globe,
  Terminal, Briefcase, GraduationCap, Zap, Heart,
  Code, TrendingUp, Compass, Camera, BookOpen, Music, Cpu,
  Layers, Coffee, Layout, Box, Download
} from 'lucide-react';

import './ProfileTab.css';
import ProfileImg from '../assets/Profile.png'

/* --- DATA --- */

const EXPERIENCE = [
  {
    role: "Product Engineer",
    company: "Edgeverve",
    date: "AUG 2025 - PRESENT",
    desc: "Spearheading the development of next-gen AI modules. Optimizing microservices for high-throughput banking transactions."
  },
  {
    role: "Intern",
    company: "Infosys Finacle",
    date: "FEB 2025 - JUL 2025",
    desc: "Contributed to the core banking solution modernization. Migrated legacy UI components to Angular and React."
  },
  {
    role: "Trainee",
    company: "Infosys Finacle",
    date: "MAR 2024 - JAN 2025",
    desc: "Completed intensive training in full-stack development, cloud infrastructure, and agile methodologies."
  }
];

const EDUCATION = [
  {
    degree: "B.Tech in Computer Science",
    school: "Techno India NJR",
    date: "2020 - 2024",
    desc: "Specialized in Artificial Intelligence and Machine Learning. Led the college coding club."
  }
];

const SKILLS = [
  { name: "React / Next", val: 90 },
  { name: "Node.js", val: 85 },
  { name: "System Design", val: 75 },
  { name: "Python / AI", val: 80 }
];

const HOBBIES = [
  { name: "Photography", icon: Camera },
  { name: "Sketching", icon: Briefcase },
  { name: "Sci-Fi Books", icon: BookOpen },
  { name: "Indie Music", icon: Music },
  { name: "Chess", icon: Cpu }
];

const TECH_STACK = [
  { title: "MERN Stack", subtitle: "Full Stack Dev", icon: Layers },
  { title: "Spring Boot / Batch", subtitle: "Enterprise Backend", icon: Coffee },
  { title: "Figma", subtitle: "UI/UX Wireframing", icon: Layout },
  { title: "Blender", subtitle: "3D Modeling", icon: Box }
];

function CloudIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round"
    >
      <path d="M17.5 19c0-1.7-1.3-3-3-3h-1.1c-.1-2.9-2.4-5.2-5.3-5.3-2.7 0-5 2-5.4 4.7C.8 15.8 2.3 18.6 5 19h12.5z"/>
    </svg>
  );
}

const CURRENT_FOCUS = [
  { name: "Generative AI", status: "Researching", icon: Zap },
  { name: "System Architecture", status: "Building", icon: TrendingUp },
  { name: "Cloud Native", status: "Deploying", icon: CloudIcon }
];

/* --- COMPONENT --- */

const ProfileTab = () => {
  return (
    <div className="profile-container">
      <div className="split-layout">
        
        {/* LEFT: ID CARD SIDEBAR */}
        <aside className="id-sidebar">
          <div className="profile-header">
            <div className="avatar-frame">
              <img 
                src={ProfileImg}
                alt="Profile" 
                className="avatar-img"
              />
            </div>
            <h1 className="user-name">Khilesh T.</h1>
            <span className="user-role">FULL_STACK_ARCHITECT</span>
          </div>

          <div className="id-stats">
            <div className="stat-box">
              <div className="stat-val">Lvl. 24</div>
              <div className="stat-label">Experience</div>
            </div>
            <div className="stat-box">
              <div className="stat-val">12+</div>
              <div className="stat-label">Projects</div>
            </div>
          </div>

          <div className="contact-list">
            <a href="#" className="contact-item">
              <Mail size={18} /> khilesh@dev.com
            </a>
            <a href="#" className="contact-item">
              <MapPin size={18} /> Udaipur, India
            </a>
            <a href="#" className="contact-item">
              <Github size={18} /> /khilesh-dev
            </a>
            <a href="#" className="contact-item">
              <Linkedin size={18} /> /in/khilesh
            </a>
            <a href="#" className="contact-item">
              <Globe size={18} /> khilesh.dev
            </a>
          </div>

          <button className="resume-btn">
            <Download size={20} /> Download Resume
          </button>
        </aside>

        {/* RIGHT: SCROLLABLE DOSSIER */}
        <main className="dossier-content">
          
          {/* SECTION 1: MANIFESTO */}
          <section className="section-block">
            <div className="block-header">
              <Terminal className="header-icon" size={32} />
              <h2 className="header-title">Entity Core</h2>
              <span className="header-id">SEC_01</span>
            </div>
            <p className="bio-text">
              I am a <span className="bio-highlight">Product Engineer</span> with a passion for building scalable, user-centric digital ecosystems. 
              My philosophy is simple: <span className="bio-highlight">Code is Art</span>. 
              Whether I'm architecting a microservice or sketching a UI, I strive for precision, efficiency, and aesthetic excellence.
              <br /><br />
              Currently building the future of banking tech at Edgeverve.
            </p>
          </section>

          {/* SECTION 2: EXPERIENCE */}
          <section className="section-block">
            <div className="block-header">
              <Briefcase className="header-icon" size={32} />
              <h2 className="header-title">Op_History</h2>
              <span className="header-id">SEC_02</span>
            </div>
            
            <div className="timeline">
              {EXPERIENCE.map((job, i) => (
                <div key={i} className="timeline-item">
                  <div className="timeline-dot" />
                  <div className="timeline-card">
                    <h3 className="t-role">
                      {job.role} <span className="t-date">{job.date}</span>
                    </h3>
                    <div className="t-company">@ {job.company}</div>
                    <p className="t-desc">{job.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 3: EDUCATION */}
          <section className="section-block">
            <div className="block-header">
              <GraduationCap className="header-icon" size={32} />
              <h2 className="header-title">Academics</h2>
              <span className="header-id">SEC_03</span>
            </div>
            
            <div className="timeline">
              {EDUCATION.map((edu, i) => (
                <div key={i} className="timeline-item">
                  <div className="timeline-dot" />
                  <div className="timeline-card">
                    <h3 className="t-role">
                      {edu.degree} <span className="t-date">{edu.date}</span>
                    </h3>
                    <div className="t-company">{edu.school}</div>
                    <p className="t-desc">{edu.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 4: SKILLS */}
          <section className="section-block">
            <div className="block-header">
              <Zap className="header-icon" size={32} />
              <h2 className="header-title">Capabilities</h2>
              <span className="header-id">SEC_04</span>
            </div>
            <div className="skills-grid">
              {SKILLS.map((skill, i) => (
                <div key={i} className="skill-box">
                  <div className="skill-val">{skill.val}%</div>
                  <div className="skill-name">{skill.name}</div>
                  <div className="skill-bar-bg">
                    <motion.div 
                      className="skill-bar-fill" 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.val}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 5: HOBBIES */}
          <section className="section-block">
            <div className="block-header">
              <Heart className="header-icon" size={32} />
              <h2 className="header-title">Peripherals</h2>
              <span className="header-id">SEC_05</span>
            </div>
            <div className="hobbies-flex">
              {HOBBIES.map((hobby, i) => (
                <div key={i} className="hobby-pill">
                  <hobby.icon size={18} /> {hobby.name}
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 6: TECH STACK */}
          <section className="section-block">
            <div className="block-header">
              <Code className="header-icon" size={32} />
              <h2 className="header-title">Tech Arsenal</h2>
              <span className="header-id">SEC_06</span>
            </div>
            <div className="tech-list">
              {TECH_STACK.map((tech, i) => (
                <div key={i} className="tech-card">
                  <div className="tech-icon">
                    <tech.icon size={24} />
                  </div>
                  <div>
                    <div className="tech-title">{tech.title}</div>
                    <div className="tech-desc">{tech.subtitle}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 7: CURRENT FOCUS */}
          <section className="section-block">
            <div className="block-header">
              <TrendingUp className="header-icon" size={32} />
              <h2 className="header-title">Active Protocols</h2>
              <span className="header-id">SEC_07</span>
            </div>
            <div className="focus-grid">
              {CURRENT_FOCUS.map((focus, i) => (
                <div key={i} className="focus-card">
                  <div className="focus-header">
                    <focus.icon size={20} /> {focus.name}
                  </div>
                  <div className="focus-status">{focus.status}</div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 8: VISION */}
          <section className="section-block">
            <div className="block-header">
              <Compass className="header-icon" size={32} />
              <h2 className="header-title">Worldview</h2>
              <span className="header-id">SEC_08</span>
            </div>
            <p className="bio-text">
              I see the world as a boundless playground for creation. I love the grind of working, the thrill of learning new things, and the freedom of exploring the unknown. To me, the journey never ends—there is simply too much in this world to see, build, and experience to ever stop moving.
            </p>
          </section>

        </main>
      </div>
    </div>
  );
};

export default ProfileTab;
