import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import * as LucideIcons from 'lucide-react';

import WordPad from '../components/WordPad';
import { api } from '../api/private-api';
import * as PublicApi from '../api/public-api';

import './AdminDashboard.css';

/* --- HELPERS --- */
const renderImage = (src) => src ? <img src={src} alt="preview" className="table-thumb" /> : <span className="text-dim">—</span>;

const getNested = (obj, path) => path.split('.').reduce((acc, part) => acc && acc[part], obj);
const setNested = (obj, path, value) => {
  const parts = path.split('.');
  const last = parts.pop();
  const target = parts.reduce((acc, part) => {
    if (!acc[part]) acc[part] = {};
    return acc[part];
  }, obj);
  target[last] = value;
  return { ...obj };
};

/* --- SCHEMAS (Complete Configuration) --- */
const SCHEMAS = {
  profile: {
    group: "System",
    title: "Global Profile",
    icon: "UserCircle",
    isSingleton: true,
    fetchFn: PublicApi.getProfile,
    apiResource: api.profile,
    fields: [
      { key: "header", label: "Header Identity", type: "profile_header" },
      { key: "resume", label: "Resume Link", type: "profile_resume" },
      { key: "contact", label: "Contact Methods", type: "profile_contact" },
      { key: "stats", label: "Key Stats", type: "profile_stats" },
      { key: "sections.manifesto", label: "Section: Manifesto", type: "section_manifesto" },
      { key: "sections.worldview", label: "Section: Worldview", type: "section_worldview" },
      { key: "sections.experience", label: "Section: Experience", type: "section_experience" },
      { key: "sections.education", label: "Section: Education", type: "section_education" },
      { key: "sections.skills", label: "Section: Skills", type: "section_skills" },
      { key: "sections.techStack", label: "Section: Tech Stack", type: "section_techstack" },
      { key: "sections.hobbies", label: "Section: Hobbies", type: "section_hobbies" },
      { key: "sections.focus", label: "Section: Focus Areas", type: "section_focus" },
    ]
  },
  skills: {
    group: "Developer",
    title: "Skills",
    icon: "Code2",
    fetchFn: PublicApi.getDeveloperSkills,
    apiResource: api.developer.skills,
    columns: [{ key: "name", label: "Name" }, { key: "category", label: "Category" }, { key: "level", label: "Lvl" }],
    fields: [
      { key: "category", label: "Category", type: "text" },
      { key: "name", label: "Name", type: "text" },
      { key: "icon", label: "Icon Name", type: "text" },
      { key: "level", label: "Level (1-5)", type: "number" },
      { key: "xp", label: "XP", type: "text" },
    ]
  },
  projects: {
    group: "Developer",
    title: "Projects",
    icon: "FolderGit2",
    fetchFn: PublicApi.getDeveloperProjects,
    apiResource: api.developer.projects,
    columns: [{ key: "image", label: "Img", format: renderImage }, { key: "title", label: "Title" }],
    fields: [
      { key: "title", label: "Title", type: "text" },
      { key: "desc", label: "Description", type: "textarea" },
      { key: "image", label: "Image URL", type: "text" },
      { key: "tech", label: "Tech Stack (CSV)", type: "array" },
      { key: "link", label: "Link", type: "text" },
    ]
  },
  devServices: {
    group: "Developer",
    title: "Services",
    icon: "Server",
    fetchFn: PublicApi.getDeveloperServices,
    apiResource: api.developer.services,
    columns: [{ key: "title", label: "Title" }],
    fields: [
      { key: "title", label: "Title", type: "text" },
      { key: "desc", label: "Description", type: "textarea" },
      { key: "icon", label: "Icon Name", type: "text" },
      { key: "tags", label: "Tags (CSV)", type: "array" }
    ]
  },
  gallery: {
    group: "Designer",
    title: "Gallery",
    icon: "Image",
    fetchFn: PublicApi.getDesignerGallery,
    apiResource: api.designer.gallery,
    columns: [{ key: "image", label: "Preview", format: renderImage }, { key: "title", label: "Title" }],
    fields: [
      { key: "title", label: "Title", type: "text" },
      { key: "category", label: "Category", type: "text" },
      { key: "image", label: "Image URL", type: "text" },
      { key: "tags", label: "Tags (CSV)", type: "array" },
    ]
  },
  tools: {
    group: "Designer",
    title: "Tools",
    icon: "PenTool",
    fetchFn: PublicApi.getDesignerTools,
    apiResource: api.designer.tools,
    columns: [{ key: "name", label: "Name" }, { key: "level", label: "Level" }],
    fields: [
      { key: "name", label: "Name", type: "text" },
      { key: "icon", label: "Icon Name", type: "text" },
      { key: "level", label: "Proficiency", type: "text" }
    ]
  },
  books: {
    group: "Creator",
    title: "Books",
    icon: "BookOpen",
    fetchFn: PublicApi.getCreatorBooks,
    apiResource: api.creator.books,
    columns: [{ key: "title", label: "Title" }, { key: "author", label: "Author" }],
    fields: [
      { key: "title", label: "Title", type: "text" },
      { key: "author", label: "Author", type: "text" },
      { key: "desc", label: "Description", type: "textarea" },
      { key: "cover", label: "Cover URL", type: "text" },
    ]
  },
  articles: {
    group: "Blogger",
    title: "Articles",
    icon: "FileText",
    fetchFn: PublicApi.getBloggerArticles,
    apiResource: api.blogger.articles,
    columns: [{ key: "title", label: "Title" }, { key: "date", label: "Date" }],
    fields: [
      { key: "title", label: "Title", type: "text" },
      { key: "desc", label: "Description", type: "textarea" },
      { key: "date", label: "Date", type: "text" },
      { key: "image", label: "Cover Image", type: "text" },
      { key: "tags", label: "Tags (CSV)", type: "array" },
      { key: "content", label: "Content", type: "writepad_trigger" },
    ]
  },
  snippets: {
    group: "Blogger",
    title: "Snippets",
    icon: "Code",
    fetchFn: PublicApi.getBloggerSnippets,
    apiResource: api.blogger.snippets,
    columns: [{ key: "title", label: "Title" }, { key: "cat", label: "Cat" }],
    fields: [
      { key: "title", label: "Title", type: "text" },
      { key: "cat", label: "Category", type: "text" },
      { key: "code", label: "Code", type: "textarea" },
    ]
  },
  roadmaps: {
    group: "Blogger",
    title: "Roadmaps",
    icon: "Map",
    fetchFn: PublicApi.getBloggerRoadmaps,
    apiResource: api.blogger.roadmaps,
    columns: [{ key: "title", label: "Title" }, { key: "level", label: "Level" }],
    fields: [
      { key: "title", label: "Title", type: "text" },
      { key: "level", label: "Level", type: "text" },
      { key: "steps", label: "Steps", type: "steps_builder" },
    ]
  }
};

/* --- INPUT BUILDERS --- */
const GenericListBuilder = ({ value = [], onChange, fields, titleKey = 'title' }) => {
  const add = () => {
    const newItem = {};
    fields.forEach(f => newItem[f.key] = "");
    onChange([...value, newItem]);
  };
  const remove = (idx) => onChange(value.filter((_, i) => i !== idx));
  const update = (idx, key, val) => {
    const copy = [...value];
    copy[idx] = { ...copy[idx], [key]: val };
    onChange(copy);
  };

  return (
    <div className="builder-container">
      {value.map((item, i) => (
        <div key={i} className="builder-card">
          <div className="builder-card-header">
            <span>#{i + 1} {item[titleKey] || 'New Item'}</span>
            <button type="button" onClick={() => remove(i)} className="btn-icon-sm delete"><LucideIcons.X size={14} /></button>
          </div>
          <div className="builder-grid">
            {fields.map(f => (
              <div key={f.key} className={`builder-field ${f.span ? 'full-span' : ''}`}>
                <label>{f.label}</label>
                {f.type === 'textarea' ? (
                  <textarea value={item[f.key] || ""} onChange={e => update(i, f.key, e.target.value)} className="input-field mini" rows={2} />
                ) : (
                  <input value={item[f.key] || ""} onChange={e => update(i, f.key, e.target.value)} className="input-field mini" placeholder={f.label} />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
      <button type="button" onClick={add} className="btn-dashed">+ Add Item</button>
    </div>
  );
};

const HeaderBuilder = ({ value = {}, onChange }) => (
  <div className="builder-grid two-col">
    <div><label>Name</label><input className="input-field" value={value.name || ""} onChange={e => onChange({ ...value, name: e.target.value })} /></div>
    <div><label>Role</label><input className="input-field" value={value.role || ""} onChange={e => onChange({ ...value, role: e.target.value })} /></div>
    <div className="full-span"><label>Avatar URL</label><input className="input-field" value={value.avatar || ""} onChange={e => onChange({ ...value, avatar: e.target.value })} /></div>
  </div>
);

const ManifestoBuilder = ({ value = {}, onChange }) => (
  <div className="builder-grid">
    <div><label>Meta Title</label><input className="input-field" value={value.meta?.title || ""} onChange={e => onChange({ ...value, meta: { ...value.meta, title: e.target.value } })} /></div>
    <div className="full-span"><label>Paragraphs (One per line)</label><textarea className="input-field" rows={4} value={value.paragraphs ? value.paragraphs.join('\n') : ""} onChange={e => onChange({ ...value, paragraphs: e.target.value.split('\n') })} /></div>
    <div className="full-span"><label>Highlights (CSV)</label><input className="input-field" value={value.highlights ? value.highlights.join(', ') : ""} onChange={e => onChange({ ...value, highlights: e.target.value.split(',').map(s => s.trim()) })} /></div>
  </div>
);

const MetaHeaderBuilder = ({ value = {}, onChange, title }) => (
  <div className="builder-card mb-4">
    <div className="builder-card-header"><span>{title} Config</span></div>
    <div className="builder-grid two-col p-2">
      <div><label>Section Title</label><input className="input-field mini" value={value.meta?.title || ""} onChange={e => onChange({ ...value, meta: { ...value.meta, title: e.target.value } })} /></div>
      <div><label>Icon Name</label><input className="input-field mini" value={value.meta?.icon || ""} onChange={e => onChange({ ...value, meta: { ...value.meta, icon: e.target.value } })} /></div>
    </div>
  </div>
);

const WritePadInput = ({ value, onChange }) => {
  const openWordPad = () => window.dispatchEvent(new CustomEvent('openWordPad', {
    detail: { initialValue: value || '', onSave: onChange }
  }));
  return (
    <div className="writepad-trigger" onClick={openWordPad}>
      <LucideIcons.FileEdit size={24} className="text-teal" />
      <div className="trigger-text"><span>Edit Content in WordPad</span><small>{value ? value.length : 0} characters</small></div>
    </div>
  );
};

const EditModal = ({ schema, item, onClose, onSave, isSaving }) => {
  const [formData, setFormData] = useState(() => JSON.parse(JSON.stringify(item)));

  const handleNestedChange = (path, val) => {
    if (!path.includes('.')) { setFormData(prev => ({ ...prev, [path]: val })); }
    else { setFormData(prev => { const next = { ...prev }; setNested(next, path, val); return next; }); }
  };

  const renderFieldInput = (field) => {
    const val = getNested(formData, field.key);
    const renderSectionBuilder = (title, fields, titleKey) => (
      <div>
        <MetaHeaderBuilder value={val} onChange={v => handleNestedChange(field.key, v)} title={title} />
        <GenericListBuilder value={val?.items} onChange={v => handleNestedChange(field.key, { ...val, items: v })} fields={fields} titleKey={titleKey} />
      </div>
    );

    switch (field.type) {
      case 'profile_header': return <HeaderBuilder value={val} onChange={v => handleNestedChange(field.key, v)} />;
      case 'profile_resume': return <div className="builder-grid two-col"><input className="input-field" placeholder="Label" value={val?.label || ""} onChange={e => handleNestedChange(field.key, { ...val, label: e.target.value })} /><input className="input-field" placeholder="Link" value={val?.href || ""} onChange={e => handleNestedChange(field.key, { ...val, href: e.target.value })} /></div>;
      case 'profile_contact': return <GenericListBuilder value={val} onChange={v => handleNestedChange(field.key, v)} fields={[{ key: 'label', label: 'Label' }, { key: 'text', label: 'Display Text' }, { key: 'href', label: 'Link' }, { key: 'icon', label: 'Icon' }]} titleKey="label" />;
      case 'profile_stats': return <GenericListBuilder value={val} onChange={v => handleNestedChange(field.key, v)} fields={[{ key: 'label', label: 'Label' }, { key: 'value', label: 'Value' }]} titleKey="label" />;
      case 'section_manifesto': return <ManifestoBuilder value={val} onChange={v => handleNestedChange(field.key, v)} />;
      case 'section_worldview': return <div><MetaHeaderBuilder value={val} onChange={v => handleNestedChange(field.key, v)} title="Worldview" /><textarea className="input-field" rows={4} value={val?.text || ""} onChange={e => handleNestedChange(field.key, { ...val, text: e.target.value })} /></div>;

      case 'section_experience': return renderSectionBuilder("Experience", [{ key: 'role', label: 'Role' }, { key: 'company', label: 'Company' }, { key: 'date', label: 'Date' }, { key: 'desc', label: 'Desc', type: 'textarea', span: true }], 'company');
      case 'section_education': return renderSectionBuilder("Education", [{ key: 'degree', label: 'Degree' }, { key: 'school', label: 'School' }, { key: 'date', label: 'Date' }, { key: 'desc', label: 'Desc', type: 'textarea', span: true }], 'degree');
      case 'section_skills': return renderSectionBuilder("Skills", [{ key: 'name', label: 'Skill Name' }, { key: 'val', label: 'Value %' }], 'name');
      case 'section_techstack': return renderSectionBuilder("Tech Stack", [{ key: 'title', label: 'Title' }, { key: 'subtitle', label: 'Subtitle' }, { key: 'icon', label: 'Icon' }], 'title');
      case 'section_hobbies': return renderSectionBuilder("Hobbies", [{ key: 'name', label: 'Name' }, { key: 'icon', label: 'Icon' }], 'name');
      case 'section_focus': return renderSectionBuilder("Focus Areas", [{ key: 'name', label: 'Name' }, { key: 'status', label: 'Status' }, { key: 'icon', label: 'Icon' }], 'name');

      case 'writepad_trigger': return <WritePadInput value={val} onChange={v => handleNestedChange(field.key, v)} />;
      case 'steps_builder': return <GenericListBuilder value={val} onChange={v => handleNestedChange(field.key, v)} fields={[{ key: 'title', label: 'Title' }, { key: 'desc', label: 'Desc' }]} titleKey="title" />;
      case 'textarea': return <textarea className="input-field" rows={4} value={val || ""} onChange={e => handleNestedChange(field.key, e.target.value)} />;
      case 'array': return <input className="input-field" value={Array.isArray(val) ? val.join(', ') : val || ""} onChange={e => handleNestedChange(field.key, e.target.value.split(',').map(s => s.trim()))} placeholder="CSV" />;
      default: return <input className="input-field" type={field.type} value={val || ""} onChange={e => handleNestedChange(field.key, e.target.value)} />;
    }
  };

  return (
    <div className="modal-backdrop">
      <motion.div className="modal-panel" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: "spring", stiffness: 300, damping: 30 }}>
        <div className="modal-header"><h3>{item._id ? `Edit ${schema.title}` : `New ${schema.title}`}</h3><button onClick={onClose} className="btn-icon"><LucideIcons.X size={20} /></button></div>
        <form onSubmit={e => { e.preventDefault(); onSave(formData); }} className="modal-form">
          {schema.fields.map(field => (
            <div key={field.key} className="form-group"><label className="field-label">{field.label}</label>{renderFieldInput(field)}</div>
          ))}
          <div className="modal-footer"><button type="button" onClick={onClose} className="btn-ghost">Cancel</button><button type="submit" className="btn-primary" disabled={isSaving}>{isSaving ? <LucideIcons.Loader2 className="animate-spin" /> : 'Save Changes'}</button></div>
        </form>
      </motion.div>
    </div>
  );
};

/* --- SINGLETON DISPLAY (PROFILE PREVIEW) --- */
const ProfilePreview = ({ data, onEdit }) => {
  if (!data) return <div className="empty-state">No Data Found</div>;
  const { header, resume, contact, stats, sections } = data;

  return (
    <div className="profile-preview">
      {/* 1. Header Card */}
      <div className="preview-header">
        <img src={header?.avatar} alt="avatar" className="preview-avatar" />
        <div>
          <h2>{header?.name || "No Name"}</h2>
          <p>{header?.role || "NO_ROLE"}</p>
          <div className="resume-tag">
            <LucideIcons.FileText size={14} />
            <a href={resume?.href} target="_blank" rel="noreferrer">{resume?.label || "Resume"}</a>
          </div>
        </div>
        <button className="btn-primary ml-auto" onClick={onEdit}>
          <LucideIcons.Edit3 size={16} /> Edit Profile
        </button>
      </div>

      {/* 2. Grid Layout */}
      <div className="preview-grid">
        {/* Contact */}
        <div className="preview-card">
          <h4><LucideIcons.Link size={14} /> Connect</h4>
          <div className="pill-list">
            {contact?.map((c, i) => {
              const Icon = LucideIcons[c.icon] || LucideIcons.Link;
              return (
                <a key={i} href={c.href} target="_blank" rel="noreferrer" className="info-pill">
                  <Icon size={12} /> {c.label}
                </a>
              );
            })}
          </div>
        </div>

        {/* Stats */}
        <div className="preview-card">
          <h4><LucideIcons.BarChart2 size={14} /> Vital Stats</h4>
          <div className="stats-row">
            {stats?.map((s, i) => (
              <div key={i} className="stat-box">
                <span className="val">{s.value}</span>
                <span className="lbl">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Manifesto */}
        <div className="preview-card full">
          <h4><LucideIcons.Terminal size={14} /> {sections?.manifesto?.meta?.title || "Manifesto"}</h4>
          <div className="manifesto-content">
            {sections?.manifesto?.paragraphs?.map((p, i) => <p key={i}>{p}</p>)}
          </div>
          <div className="pill-list mt-2">
            {sections?.manifesto?.highlights?.map((h, i) => <span key={i} className="highlight-tag">#{h}</span>)}
          </div>
        </div>

        {/* Experience */}
        <div className="preview-card wide">
          <h4><LucideIcons.Briefcase size={14} /> {sections?.experience?.meta?.title || "Experience"}</h4>
          <div className="timeline-list">
            {sections?.experience?.items?.map((item, i) => (
              <div key={i} className="timeline-item">
                <div className="time-head">
                  <strong>{item.role}</strong>
                  <span className="accent-text">@ {item.company}</span>
                </div>
                <div className="time-date">{item.date}</div>
                <p className="time-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Focus */}
        <div className="preview-card">
          <h4><LucideIcons.Zap size={14} /> {sections?.focus?.meta?.title || "Focus"}</h4>
          <div className="focus-list">
            {sections?.focus?.items?.map((f, i) => {
              const Icon = LucideIcons[f.icon] || LucideIcons.Circle;
              return (
                <div key={i} className="focus-item">
                  <div className="focus-icon"><Icon size={16} /></div>
                  <div>
                    <div className="focus-name">{f.name}</div>
                    <div className="focus-status">{f.status}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Skills */}
        <div className="preview-card">
          <h4><LucideIcons.Cpu size={14} /> {sections?.skills?.meta?.title || "Skills"}</h4>
          <div className="skills-list">
            {sections?.skills?.items?.map((s, i) => (
              <div key={i} className="skill-row">
                <span>{s.name}</span>
                <div className="skill-bar"><div style={{ width: `${s.val}%` }}></div></div>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="preview-card wide">
          <h4><LucideIcons.Layers size={14} /> {sections?.techStack?.meta?.title || "Tech Stack"}</h4>
          <div className="tech-grid">
            {sections?.techStack?.items?.map((t, i) => {
              const Icon = LucideIcons[t.icon] || LucideIcons.Code;
              return (
                <div key={i} className="tech-item">
                  <Icon size={20} className="text-teal mb-2" />
                  <span className="t-title">{t.title}</span>
                  <span className="t-sub">{t.subtitle}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Education */}
        <div className="preview-card">
          <h4><LucideIcons.GraduationCap size={14} /> {sections?.education?.meta?.title || "Education"}</h4>
          <div className="timeline-list">
            {sections?.education?.items?.map((item, i) => (
              <div key={i} className="timeline-item compact">
                <strong>{item.degree}</strong>
                <div className="text-dim">{item.school}</div>
                <small>{item.date}</small>
              </div>
            ))}
          </div>
        </div>

        {/* Worldview */}
        <div className="preview-card full">
          <h4><LucideIcons.Globe size={14} /> {sections?.worldview?.meta?.title || "Worldview"}</h4>
          <p className="worldview-text">"{sections?.worldview?.text}"</p>
        </div>

      </div>
    </div>
  );
};

/* --- MANAGER --- */
const ResourceManager = ({ schemaKey }) => {
  const schema = SCHEMAS[schemaKey];
  const queryClient = useQueryClient();
  const [editingItem, setEditingItem] = useState(null);
  const [search, setSearch] = useState("");

  const { data: rawData, isLoading } = useQuery({ queryKey: ['admin', schemaKey], queryFn: schema.fetchFn });

  let items = [], singletonData = null;
  if (schema.isSingleton) {
    singletonData = rawData?.data || rawData;
    items = singletonData ? [singletonData] : [];
  } else {
    items = rawData || [];
  }

  const deleteMut = useMutation({
    mutationFn: (id) => schema.apiResource.delete(id),
    onSuccess: () => queryClient.invalidateQueries(['admin', schemaKey])
  });

  const saveMut = useMutation({
    mutationFn: (data) => {
      if (schema.isSingleton) return schema.apiResource.update(data);
      return data._id ? schema.apiResource.update(data._id, data) : schema.apiResource.create(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['admin', schemaKey]);
      setEditingItem(null);
    }
  });

  const filteredItems = items.filter(i => JSON.stringify(i).toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="manager-container">
      <div className="manager-toolbar">
        <div className="toolbar-left"><h2>{schema.title}</h2>{!schema.isSingleton && <span className="count-pill">{items.length}</span>}</div>
        {!schema.isSingleton && (
          <div className="toolbar-right">
            <div className="search-bar"><LucideIcons.Search size={16} /><input type="text" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} /></div>
            <button className="btn-primary" onClick={() => setEditingItem({})}><LucideIcons.Plus size={16} /> New</button>
          </div>
        )}
      </div>

      {isLoading ? (<div className="loading-state"><LucideIcons.Loader2 className="animate-spin" size={32} /> Loading...</div>) : (
        <div className="content-viewport">
          {schema.isSingleton ? (
            <ProfilePreview data={singletonData} onEdit={() => setEditingItem(singletonData || {})} />
          ) : (
            <div className="table-wrapper">
              <table className="data-table">
                <thead><tr><th className="id-col">ID</th>{schema.columns.map(col => <th key={col.key}>{col.label}</th>)}<th className="action-col">Actions</th></tr></thead>
                <tbody>
                  {filteredItems.map((item, idx) => (
                    <tr key={item._id || idx}>
                      <td className="id-col code-font">{(item._id || "NEW").slice(-4)}</td>
                      {schema.columns.map(col => (<td key={col.key}>{col.format ? col.format(item[col.key]) : item[col.key]}</td>))}
                      <td className="action-col">
                        <button onClick={() => setEditingItem(item)} className="table-btn edit"><LucideIcons.Edit3 size={14} /></button>
                        <button onClick={() => { if (window.confirm('Delete?')) deleteMut.mutate(item._id); }} className="table-btn delete"><LucideIcons.Trash2 size={14} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      <AnimatePresence>
        {editingItem && (
          <EditModal schema={schema} item={editingItem} onClose={() => setEditingItem(null)} onSave={(data) => saveMut.mutate(data)} isSaving={saveMut.isPending} />
        )}
      </AnimatePresence>
    </div>
  );
};

/* --- MAIN LAYOUT --- */
const AdminDashboard = () => {
  const [activeKey, setActiveKey] = useState('profile');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navGroups = Object.keys(SCHEMAS).reduce((acc, key) => {
    const group = SCHEMAS[key].group;
    if (!acc[group]) acc[group] = [];
    acc[group].push(key);
    return acc;
  }, {});

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/login');
  };

  return (
    <div className="admin-shell">
      <div className="mobile-header">
        <div className="brand">Admin<span className="text-teal">OS</span></div>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="menu-btn"><LucideIcons.Menu /></button>
      </div>
      <aside className={`admin-sidebar ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="sidebar-brand desktop-only"><LucideIcons.Command className="text-teal" /> <span>Admin<span className="text-teal">OS</span></span></div>
        <nav className="sidebar-nav">
          {Object.keys(navGroups).map(group => (
            <div key={group} className="nav-group">
              <div className="group-label">{group}</div>
              {navGroups[group].map(key => {
                const Icon = LucideIcons[SCHEMAS[key].icon] || LucideIcons.Circle;
                return (
                  <button key={key} className={`nav-item ${activeKey === key ? 'active' : ''}`} onClick={() => { setActiveKey(key); setMobileMenuOpen(false); }}>
                    <Icon size={18} /> {SCHEMAS[key].title}
                  </button>
                )
              })}
            </div>
          ))}
        </nav>
        <div className="sidebar-footer"><button onClick={handleLogout} className="logout-btn"><LucideIcons.LogOut size={16} /> Disconnect</button></div>
      </aside>
      <main className="admin-body"><ResourceManager schemaKey={activeKey} /></main>
      <WordPad />
    </div>
  );
};

export default AdminDashboard;