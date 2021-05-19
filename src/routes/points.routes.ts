import { Router } from 'express';

import PointsController from '@controllers/PointsController';

const pointsController = new PointsController();

const pointsRouter = Router();

pointsRouter.get('/', pointsController.index);
pointsRouter.get('/show', pointsController.show);

pointsRouter.post('/', pointsController.create);
pointsRouter.put('/', pointsController.update);
pointsRouter.delete('/', pointsController.delete);

export default pointsRouter;
