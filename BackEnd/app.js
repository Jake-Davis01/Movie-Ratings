import express from "express";
import cors from "cors";
import userRouter from "./routes/userRoutes.js";
import reviewsRouter from "./routes/reviewsRouter.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/user", userRouter);
app.use("/reviews", reviewsRouter);

export default app;
