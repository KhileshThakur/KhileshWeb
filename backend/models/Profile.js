import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  header: {
    name: { type: String, default: 'Khilesh T.' },
    role: { type: String, default: 'FULL_STACK_ARCHITECT' },
    avatar: { type: String, default: '' },
  },
  stats: [{ label: String, value: String }],
  contact: [{
    icon: String, // Stores string name like "Mail", "Github"
    label: String,
    text: String,
    href: String
  }],
  resume: {
    label: { type: String, default: 'Download Resume' },
    href: String
  },
  sections: {
    manifesto: {
      meta: { title: String, id: String, icon: String },
      paragraphs: [String],
      highlights: [String]
    },
    experience: {
      meta: { title: String, id: String, icon: String },
      items: [{
        role: String,
        company: String,
        date: String,
        desc: String
      }]
    },
    education: {
      meta: { title: String, id: String, icon: String },
      items: [{
        degree: String,
        school: String,
        date: String,
        desc: String
      }]
    },
    skills: {
      meta: { title: String, id: String, icon: String },
      items: [{ name: String, val: Number }]
    },
    hobbies: {
      meta: { title: String, id: String, icon: String },
      items: [{ name: String, icon: String }]
    },
    techStack: {
      meta: { title: String, id: String, icon: String },
      items: [{ title: String, subtitle: String, icon: String }]
    },
    focus: {
      meta: { title: String, id: String, icon: String },
      items: [{ name: String, status: String, icon: String }]
    },
    worldview: {
      meta: { title: String, id: String, icon: String },
      text: String
    }
  }
});

const Profile = mongoose.model('Profile', profileSchema);

export default Profile;