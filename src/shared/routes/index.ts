import { Router } from 'express';

import pointsRouter from '@routes/points.routes';

const routes = Router();

routes.use('/points', pointsRouter);

export default routes;
