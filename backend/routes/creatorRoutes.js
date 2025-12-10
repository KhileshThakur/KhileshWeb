import express from 'express';
import { 
  SketchController, 
  BookController, 
  ThoughtController 
} from '../controllers/creatorController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// --- Sketches ---
router.route('/sketches')
  .get(SketchController.getAll)
  .post(protect, SketchController.create);

router.route('/sketches/:id')
  .get(SketchController.getOne)
  .put(protect, SketchController.update)
  .delete(protect, SketchController.delete);

// --- Books ---
router.route('/books')
  .get(BookController.getAll)
  .post(protect, BookController.create);

router.route('/books/:id')
  .get(BookController.getOne)
  .put(protect, BookController.update)
  .delete(protect, BookController.delete);

// --- Thoughts ---
router.route('/thoughts')
  .get(ThoughtController.getAll)
  .post(protect, ThoughtController.create);

router.route('/thoughts/:id')
  .get(ThoughtController.getOne)
  .put(protect, ThoughtController.update)
  .delete(protect, ThoughtController.delete);

export default router;