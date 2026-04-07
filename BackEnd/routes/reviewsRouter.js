import { Router } from 'express';
import reviewsController from '../controllers/reviewsController.js';

const reviewsRouter = Router();


reviewsRouter.get("/:id", reviewsController.getUserReviews)


reviewsRouter.post("/", reviewsController.newUserReviews);

export default reviewsRouter;