import "dotenv/config.js";

import express from "express";
import { movieRouter } from "./routes/movieRoutes";
import { userRouter } from "./routes/userRoutes";

const app = express();
app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/movie", movieRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`app is working at port ${PORT}`);
});
