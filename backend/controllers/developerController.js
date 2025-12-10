import { Skill, Project, DeveloperService } from '../models/Developer.js';
import { createController } from './handlerFactory.js';

export const SkillController = createController(Skill);
export const ProjectController = createController(Project);
export const ServiceController = createController(DeveloperService);