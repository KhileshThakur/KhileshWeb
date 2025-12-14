import mongoose from "mongoose";

const SkillSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true
    },
    name: { type: String, required: true },
    level: { type: String, required: true },
    icon: { type: String },
    xp: { type: String, default: "0 Yrs" }
  });

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  tech: { type: [String], required: true },
  year: { type: String, required: true },
  image: { type: String },
  sourceLink: {type: String},
  liveLink: {type: String},
  status: { type: String}
});


const ServiceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  icon: { type: String, required: true },
  desc: { type: String, required: true },
  tags: { type: [String], required: true }
});

export const Skill = mongoose.model("Skill", SkillSchema);
export const Project = mongoose.model("Project", ProjectSchema);
export const DeveloperService = mongoose.model("Service", ServiceSchema);