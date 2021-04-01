import express from 'express';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import * as R from 'ramda';
import api from './api';

const createApp = () => {
  const app = express();
  app.disable('x-powered-by');
  app.set('etag', false);

  app.use(cors());

  app.use(
    logger(
      app.get('env') === 'development' ? 'dev' : 'common',
      {
        skip: () => app.get('env') === 'test',
      },
    ),
  );

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(express.static(path.join(__dirname, '../public')));

  // Routes
  app.get('/', (req, res) => { res.json({ status: 'OK' }); });
  app.use('/api', api());

  // Catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // Error handler
  app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    if (!R.has('status', err)) {
      console.log('Error:', err); // eslint-disable-line no-console
    }
    res
      .status(err.status || 500)
      .json({
        message: err.status === 500 ? 'Internal error' : err.message,
      });
  });

  return app;
};

export default createApp;
