import express from "express";
import multer from "multer";
import {
  deleteUser,
  findUsers,
  login,
  signUp,
  updateUser,
} from "../controllers/userControl";

const storage = multer.diskStorage({
  destination: function (req: any, file: any, cb: any) {
    cb(null, "uploads");
  },
  filename: function (req: any, file: any, cb: any) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

import { protect } from "../middleware/protect";
import { jwtAuth } from "../middleware/verifyToken";
export const userRouter = express.Router();

userRouter.post("/signUp", upload.single("file"), signUp);
userRouter.post("/login", login);

userRouter.get("/", findUsers);

userRouter.put("/", jwtAuth, updateUser);
userRouter.delete("/", [jwtAuth, protect], deleteUser);
