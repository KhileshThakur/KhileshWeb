import express from 'express';
import { 
  GalleryController, 
  ToolController, 
  ServiceController 
} from '../controllers/designerController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// --- Gallery ---
router.route('/gallery')
  .get(GalleryController.getAll)
  .post(protect, GalleryController.create);

router.route('/gallery/:id')
  .get(GalleryController.getOne)
  .put(protect, GalleryController.update)
  .delete(protect, GalleryController.delete);

// --- Tools ---
router.route('/tools')
  .get(ToolController.getAll)
  .post(protect, ToolController.create);

router.route('/tools/:id')
  .get(ToolController.getOne)
  .put(protect, ToolController.update)
  .delete(protect, ToolController.delete);

// --- Services ---
router.route('/services')
  .get(ServiceController.getAll)
  .post(protect, ServiceController.create);

router.route('/services/:id')
  .get(ServiceController.getOne)
  .put(protect, ServiceController.update)
  .delete(protect, ServiceController.delete);

export default router;