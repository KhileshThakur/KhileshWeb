import { Gallery, Tool, DesignerService } from '../models/Designer.js';
import { createController } from './handlerFactory.js';

export const GalleryController = createController(Gallery);
export const ToolController = createController(Tool);
export const ServiceController = createController(DesignerService);