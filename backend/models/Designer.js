import mongoose from "mongoose";

const GallerySchema = new mongoose.Schema({

    title: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    tags: { type: [String], required: true },
    link: { type: String }
  });

const ToolSchema = new mongoose.Schema({
    name: { type: String, required: true },
    icon: { type: String, required: true },
    level: { type: String, required: true }
  });

const ServiceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    icon: { type: String, required: true },
    desc: { type: String, required: true },
    items: { type: [String], required: true }
  });

export const Gallery = mongoose.model("Gallery", GallerySchema);
export const Tool = mongoose.model("Tool", ToolSchema);
export const DesignerService = mongoose.model("DesignerService", ServiceSchema);