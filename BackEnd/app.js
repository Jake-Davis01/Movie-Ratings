import express from "express";
import cors from "cors";
import userRouter from "./routes/userRoutes.js";
import reviewsRouter from "./routes/reviewsRouter.js";
import recommendationsRouter from "./routes/recommendationsRouter.js";

const app = express();

app.use(cors());
app.use(express.json());
/*
// health check
app.get("/", (req, res) => {
    res.status(200).json({ message: "Server is running!" });
});
*/
app.use("/user", userRouter);
app.use("/reviews", reviewsRouter);
app.use("/recommendations", recommendationsRouter)

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../FrontEnd/welcome.html"));
});


export default app;
