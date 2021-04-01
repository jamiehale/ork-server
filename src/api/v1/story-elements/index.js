import { Router } from 'express';

const get = () => (req, res) => {
  res.json([
    {
      id: 1,
      title: 'First Story Element',
    },
    {
      id: 2,
      title: 'Second Story Element',
    },
  ]);
};

export default () => {
  const routes = Router();

  routes.get('/', get());

  return routes;
};
