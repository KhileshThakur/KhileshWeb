import express from 'express';
import { 
  SkillController, 
  ProjectController, 
  ServiceController 
} from '../controllers/developerController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// --- Skills ---
router.route('/skills')
  .get(SkillController.getAll)          
  .post(protect, SkillController.create); 

router.route('/skills/:id')
  .get(SkillController.getOne)           
  .put(protect, SkillController.update)   
  .delete(protect, SkillController.delete); 

// --- Projects ---
router.route('/projects')
  .get(ProjectController.getAll)
  .post(protect, ProjectController.create);

router.route('/projects/:id')
  .get(ProjectController.getOne)
  .put(protect, ProjectController.update)
  .delete(protect, ProjectController.delete);

// --- Services ---
router.route('/services')
  .get(ServiceController.getAll)
  .post(protect, ServiceController.create);

router.route('/services/:id')
  .get(ServiceController.getOne)
  .put(protect, ServiceController.update)
  .delete(protect, ServiceController.delete);

export default router;