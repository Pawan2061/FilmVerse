import express from "express";
import { findUsers, login, signUp } from "../controllers/userControl";
export const userRouter = express.Router();

userRouter.post("/signUp", signUp);
userRouter.post("/login", login);

userRouter.get("/findUsers", findUsers);
