import { Router } from "express";
import recommendationsController from "../controllers/recommendations.js";
import authenticator from "../Middleware/authenticator.js";

const recommendationsRouter = Router();

recommendationsRouter.post("/", authenticator, recommendationsController.getRecommendations);

export default recommendationsRouter;