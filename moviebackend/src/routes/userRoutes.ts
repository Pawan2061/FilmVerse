import express from "express";
import {
  deleteUser,
  findUsers,
  login,
  signUp,
  updateUser,
} from "../controllers/userControl";
import { protect } from "../middleware/protect";
import { jwtAuth } from "../middleware/verifyToken";
export const userRouter = express.Router();

userRouter.post("/signUp", signUp);
userRouter.post("/login", login);

userRouter.get("/findUsers", findUsers);

// userRouter.post("/selectMovie", jwtAuth, selectMovie);
userRouter.put("/updateUser", jwtAuth, updateUser);
userRouter.delete("/deleteUser", [jwtAuth, protect], deleteUser);
