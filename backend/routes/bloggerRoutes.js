import express from 'express';
import { 
  SnippetController, 
  RoadmapController, 
  ArticleController 
} from '../controllers/bloggerController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// --- Snippets ---
router.route('/snippets')
  .get(SnippetController.getAll)
  .post(protect, SnippetController.create);

router.route('/snippets/:id')
  .get(SnippetController.getOne)
  .put(protect, SnippetController.update)
  .delete(protect, SnippetController.delete);

// --- Roadmaps ---
router.route('/roadmaps')
  .get(RoadmapController.getAll)
  .post(protect, RoadmapController.create);

router.route('/roadmaps/:id')
  .get(RoadmapController.getOne)
  .put(protect, RoadmapController.update)
  .delete(protect, RoadmapController.delete);

// --- Articles ---
router.route('/articles')
  .get(ArticleController.getAll)
  .post(protect, ArticleController.create);

router.route('/articles/:id')
  .get(ArticleController.getOne)
  .put(protect, ArticleController.update)
  .delete(protect, ArticleController.delete);

export default router;