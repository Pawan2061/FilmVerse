import express from "express";
import {
  createWatchlist,
  deleteWatchlist,
  getWatchlist,
  isWatched,
} from "../controllers/watchlistControl";
import { jwtAuth } from "../middleware/verifyToken";
export const watchListRouter = express.Router();

watchListRouter.post("/:id", jwtAuth, createWatchlist);
watchListRouter.get("/", jwtAuth, getWatchlist);
watchListRouter.delete("/:id", jwtAuth, deleteWatchlist);
watchListRouter.get("/check/:id", jwtAuth, isWatched);
