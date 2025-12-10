import { Sketch, Book, Thought } from '../models/Creator.js';
import { createController } from './handlerFactory.js';

export const SketchController = createController(Sketch);
export const BookController = createController(Book);
export const ThoughtController = createController(Thought);