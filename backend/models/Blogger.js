import mongoose from "mongoose";

const SnippetSchema = new mongoose.Schema({
    cat: { type: String, required: true },
    title: { type: String, required: true },
    code: { type: String, required: true }
  });

const RoadmapSchema = new mongoose.Schema({
    title: { type: String, required: true },
    level: { type: String, required: true },
    steps: { type: [{ title: String, desc: String }], required: true }
  });


const ArticleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    date: { type: String, required: true },
    tags: { type: [String], required: true },
    image: { type: String, required: true },
    desc: { type: String, required: true },
    content: { type: String, required: true }
});

export const Snippet = mongoose.model("Snippet", SnippetSchema);
export const Roadmap = mongoose.model("Roadmap", RoadmapSchema);
export const Article = mongoose.model("Article", ArticleSchema);