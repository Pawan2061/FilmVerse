import "dotenv/config.js";

import express from "express";
import session from "express-session"
import { movieRouter } from "./routes/movieRoutes";
import { reviewRouter } from "./routes/reviewRoutes";
import { oauthRouter, userRouter } from "./routes/userRoutes";
import { watchListRouter } from "./routes/watchlistRouter";

const app = express();
app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use("/api/user", userRouter);
app.use("/auth/google", oauthRouter);

app.use("/api/movie", movieRouter);
app.use("/api/watchlist", watchListRouter);
app.use("/api/movie/reviews", reviewRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`app is working at port ${PORT}`);
});
