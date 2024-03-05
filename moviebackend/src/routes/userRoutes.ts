import express from "express";
import {
  findUsers,
  login,
  selectMovie,
  signUp,
} from "../controllers/userControl";
import { jwtAuth } from "../middleware/verifyToken";
export const userRouter = express.Router();

userRouter.post("/signUp", signUp);
userRouter.post("/login", login);

userRouter.get("/findUsers", findUsers);
userRouter.post("/selectMovie", jwtAuth, selectMovie);
