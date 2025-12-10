import mongoose from 'mongoose';

const SketchSchema = new mongoose.Schema({
    title: { type: String, required: true },
    date: { type: String, required: true },
    img: { type: String, required: true }
  });

const BookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    desc: { type: String, required: true },
    cover: { type: String, required: true }
  });

const ThoughtsSchema = new mongoose.Schema({
    date: { type: String, required: true },
    text: { type: String, required: true }
  });

export const Sketch = mongoose.model("Sketch", SketchSchema);
export const Book = mongoose.model("Book", BookSchema);
export const Thought = mongoose.model("Thought", ThoughtsSchema);