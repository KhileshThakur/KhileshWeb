import { Snippet, Roadmap, Article } from '../models/Blogger.js';
import { createController } from './handlerFactory.js';

export const SnippetController = createController(Snippet);
export const RoadmapController = createController(Roadmap);
export const ArticleController = createController(Article);