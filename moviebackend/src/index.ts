import "dotenv/config.js";

import express from "express";
import { movieRouter } from "./routes/movieRoutes";
import { reviewRouter } from "./routes/reviewRoutes";
import { userRouter } from "./routes/userRoutes";
import { watchListRouter } from "./routes/watchlistRouter";

const app = express();
app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/movie", movieRouter);
app.use("/api/watchlist", watchListRouter);
app.use("/api/movie/reviews", reviewRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`app is working at port ${PORT}`);
});
