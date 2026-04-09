import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import userRouter from "./routes/userRoutes.js";
import reviewsRouter from "./routes/reviewsRouter.js";
import recommendationsRouter from "./routes/recommendationsRouter.js";

// Needed for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Serve frontend static files
app.use(express.static(path.join(__dirname, "../FrontEnd")));

// API routes
app.use("/user", userRouter);
app.use("/reviews", reviewsRouter);
app.use("/recommendations", recommendationsRouter);

// Serve welcome.html at root
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../FrontEnd/welcome.html"));
});

export default app;