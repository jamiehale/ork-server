import { Router } from 'express';
import storyElements from './story-elements';

export default () => {
  const routes = Router();

  routes.use('/story-elements', storyElements());

  return routes;
};
