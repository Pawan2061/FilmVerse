import express from "express";
import multer from "multer";
import { addMovie, getMovies } from "../controllers/movieControl";
import { checkRole } from "../middleware/checkRole";
import { jwtAuth } from "../middleware/verifyToken";
const storage = multer.diskStorage({
  destination: function (req: any, file: any, cb: any) {
    cb(null, "movie_uploads");
  },
  filename: function (req: any, file: any, cb: any) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

export const movieRouter = express.Router();
movieRouter.post(
  "/addMovie",
  [jwtAuth, checkRole],
  upload.single("moviefile"),

  addMovie
);
movieRouter.get("/getMovies", getMovies);
