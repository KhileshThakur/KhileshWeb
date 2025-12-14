import React from 'react';
import { Link } from 'react-router-dom'; // <--- Import Link
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';

import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../api/public-api";

import './ProfileTab.css';

/* --- DYNAMIC ICON COMPONENT --- */
const DynamicIcon = ({ name, size = 20, className }) => {
  if (!name) return null;
  let IconComponent = LucideIcons[name];
  if (!IconComponent) {
    const pascalName = name.charAt(0).toUpperCase() + name.slice(1);
    IconComponent = LucideIcons[pascalName];
  }
  if (!IconComponent) return <LucideIcons.Box size={size} className={className} />;
  return <IconComponent size={size} className={className} />;
};

/* --- ANIMATION VARIANTS --- */
const containerVars = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
  }
};

const cardVars = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

const ProfileTab = () => {
  const { data: apiResponse, isLoading, error } = useQuery({
    queryKey: ['profile-data'],
    queryFn: getProfile
  });

  if (isLoading) return <div className="profile-center"><div className="gold-loader"></div></div>;
  if (error || !apiResponse?.data) return <div className="profile-center">Profile Data Unavailable</div>;

  const profile = Array.isArray(apiResponse.data) ? apiResponse.data[0] : apiResponse.data;
  const { header, stats, contact, resume, sections } = profile;
  const { manifesto, experience, education, skills, hobbies, techStack, focus, worldview } = sections || {};

  return (
    <div id="profile-page" className="profile-page">
      <div className="layout-wrapper">

        {/* --- LEFT: IDENTITY SIDEBAR --- */}
        <aside className="sidebar">

          {/* --- NEW BACK BUTTON --- */}
          <Link to="/" className="back-link">
            <LucideIcons.ArrowLeft size={20} />
            <span>Back to Hub</span>
          </Link>

          <motion.div
            className="id-card"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="profile-header">
              <div className="avatar-container">
                <img src={header?.avatar} alt={header?.name} className="avatar-img" />
              </div>
              <h1 className="user-name">{header?.name}</h1>
              <div className="user-role">{header?.role}</div>
            </div>

            <div className="divider"></div>

            <div className="contact-links">
              {contact?.map((item, idx) => (
                <a key={idx} href={item.href} className="contact-row" target="_blank" rel="noreferrer">
                  <span className="icon-wrapper"><DynamicIcon name={item.icon} size={18} /></span>
                  <span className="link-text">{item.text}</span>
                </a>
              ))}
            </div>

            <div className="stats-grid">
              {stats?.map((stat, idx) => (
                <div key={idx} className="stat-cell">
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>

            {resume && (
              <a href={resume.href} className="resume-btn" target="_blank" rel="noreferrer">
                {resume.label} <LucideIcons.ArrowUpRight size={18} />
              </a>
            )}
          </motion.div>
        </aside>

        {/* --- RIGHT: CONTENT GRID --- */}
        <motion.main
          className="content-area"
          variants={containerVars}
          initial="hidden"
          animate="visible"
        >
          {/* ... Rest of your content ... */}

          {manifesto && (
            <motion.div className="content-card full-width" variants={cardVars}>
              <div className="card-header">
                <LucideIcons.Terminal className="accent-icon" size={20} />
                <h3>{manifesto.meta.title}</h3>
                <span className='card-header-id'>{manifesto.meta.id}</span>
              </div>
              <div className="card-body">
                {manifesto.paragraphs.map((p, i) => (
                  <p key={i} className="body-text">{p}</p>
                ))}
                {manifesto.highlights.map((p, i) => (
                  <button key={i} className="body-highlight">{p}</button>
                ))}
              </div>
            </motion.div>
          )}

          {techStack && (
            <motion.div className="content-card span-2" variants={cardVars}>
              <div className="card-header">
                <LucideIcons.Cpu className="accent-icon" size={20} />
                <h3>{techStack.meta.title}</h3>
                <span className='card-header-id'>{techStack.meta.id}</span>
              </div>
              <div className="tech-grid">
                {techStack.items.map((tech, i) => (
                  <div key={i} className="tech-item">
                    <div className="tech-icon-box">
                      <DynamicIcon name={tech.icon} size={20} />
                    </div>
                    <div className="tech-info">
                      <span className="tech-title">{tech.title}</span>
                      <span className="tech-sub">{tech.subtitle}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {focus && (
            <motion.div className="content-card span-2" variants={cardVars}>
              <div className="card-header">
                <LucideIcons.Crosshair className="accent-icon" size={20} />
                <h3>{focus.meta.title}</h3>
                <span className='card-header-id'>{focus.meta.id}</span>
              </div>
              <div className="focus-list">
                {focus.items.map((f, i) => (
                  <div key={i} className="focus-row">
                    <span className="status-dot"></span>
                    <span className="focus-name">{f.name}</span>
                    <span className="focus-badge">{f.status}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {experience && (
            <motion.div className="content-card span-2 tall-card" variants={cardVars}>
              <div className="card-header">
                <LucideIcons.Briefcase className="accent-icon" size={20} />
                <h3>{experience.meta.title}</h3>
                <span className='card-header-id'>{experience.meta.id}</span>
              </div>
              <div className="timeline-container">
                {experience.items.map((job, i) => (
                  <div key={i} className="timeline-block">
                    <div className="timeline-line"></div>
                    <div className="timeline-dot"></div>
                    <div className="timeline-content">
                      <div className="job-header">
                        <h4 className="job-role">{job.role}</h4>
                        <span className="job-date">{job.date}</span>
                      </div>
                      <div className="job-company">{job.company}</div>
                      <p className="job-desc">{job.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          <div className="col-stack span-2">

            {education && (
              <motion.div className="content-card" variants={cardVars}>
                <div className="card-header">
                  <LucideIcons.GraduationCap className="accent-icon" size={20} />
                  <h3>{education.meta.title}</h3>
                  <span className='card-header-id'>{education.meta.id}</span>
                </div>
                <div className="edu-list">
                  {education.items.map((edu, i) => (
                    <div key={i} className="edu-item">
                      <div className="edu-year">{edu.date}</div>
                      <div className="edu-details">
                        <div className="edu-degree">{edu.degree}</div>
                        <div className="edu-school">{edu.school}</div>
                        <div className="edu-desc">{edu.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {skills && (
              <motion.div className="content-card" variants={cardVars}>
                <div className="card-header">
                  <LucideIcons.Zap className="accent-icon" size={20} />
                  <h3>{skills.meta.title}</h3>
                  <span className='card-header-id'>{skills.meta.id}</span>
                </div>
                <div className="skills-list">
                  {skills.items.map((s, i) => (
                    <div key={i} className="skill-row">
                      <div className="skill-meta">
                        <span>{s.name}</span>
                        <span className="skill-num">{s.val}%</span>
                      </div>
                      <div className="skill-track">
                        <motion.div
                          className="skill-fill"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${s.val}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: i * 0.1 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {hobbies && (
              <motion.div className="content-card" variants={cardVars}>
                <div className="card-header">
                  <LucideIcons.Heart className="accent-icon" size={20} />
                  <h3>{hobbies.meta.title}</h3>
                  <span className='card-header-id'>{hobbies.meta.id}</span>
                </div>
                <div className="tags-cloud">
                  {hobbies.items.map((h, i) => (
                    <span key={i} className="tag">
                      <DynamicIcon name={h.icon} size={14} /> {h.name}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

          </div>

          {worldview && (
            <motion.div className="content-card full-width worldview-card" variants={cardVars}>
              <div className="quote-mark">“</div>
              <p className="worldview-text">{worldview.text}</p>
            </motion.div>
          )}

        </motion.main>
      </div>
    </div>
  );
};

export default ProfileTab;