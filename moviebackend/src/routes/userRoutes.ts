import express from "express";
import multer from "multer";
import {
  deleteUser,
  findUsers,
  login,
  signUp,
  updateUser,
  uploadProfile,
} from "../controllers/userControl";

const upload = multer({ dest: "uploads/" });

import { protect } from "../middleware/protect";
import { jwtAuth } from "../middleware/verifyToken";
export const userRouter = express.Router();

userRouter.post("/signUp", signUp);
userRouter.post("/login", login);
userRouter.post("/profilePic/:id", upload.single("file"), uploadProfile);
userRouter.get("/", findUsers);

userRouter.put("/", jwtAuth, updateUser);
userRouter.delete("/", [jwtAuth, protect], deleteUser);
