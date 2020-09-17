import * as express from 'express';
import { Application, NextFunction, Request, Response } from 'express';

import authRouter from './routes/auth_router';
import urlRouter from './routes/url_router';

import {
  clientErrorHandler,
  serverErrorHandler,
  notFoundErrorHandler,
} from './utils/error_handler';

const app: Application = express();

app.use((req: Request, res: Response, next: NextFunction) => {
  req.local = {};
  next();
});

app.use('/api/auth', authRouter);
app.use('/api/url', urlRouter);

app.use(clientErrorHandler);
app.use(serverErrorHandler);
app.use(notFoundErrorHandler);

export default app;
