import express from "express";
import { addMovie } from "../controllers/movieControl";
import { checkRole } from "../middleware/checkRole";
import { jwtAuth } from "../middleware/verifyToken";
export const movieRouter = express.Router();
movieRouter.post("/addMovie", [jwtAuth, checkRole], addMovie);
