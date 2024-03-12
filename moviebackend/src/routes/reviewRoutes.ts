import express from "express";
import { createReview, getReviews } from "../controllers/reviewControl";
import { jwtAuth } from "../middleware/verifyToken";

export const reviewRouter = express.Router();

reviewRouter.post("/:id", jwtAuth, createReview);
reviewRouter.get("/:id", getReviews);
