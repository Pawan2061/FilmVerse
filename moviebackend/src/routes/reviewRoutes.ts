import express from "express";
import {
  createReview,
  deleteReview,
  getReviews,
  updateReview,
} from "../controllers/reviewControl";
import { jwtAuth } from "../middleware/verifyToken";

export const reviewRouter = express.Router();

reviewRouter.post("/:id", jwtAuth, createReview);
reviewRouter.get("/:id", jwtAuth, getReviews);
reviewRouter.delete("/:id", jwtAuth, deleteReview);
reviewRouter.put("/:id", jwtAuth, updateReview);
