import express from "express";
import multer from "multer";

import {
  deleteUser,
  findUsers,
  login,
  signUp,
  updateUser,
} from "../controllers/userControl";
const gitpassport=require("../strategies/github-oauth")
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

import { jwtAuth } from "../middleware/verifyToken";
export const userRouter = express.Router();
export const oauthRouter = express.Router();
const oauthController = require("../controllers/oauthcontroller");

userRouter.post("/signUp", upload.single("file"), signUp);
userRouter.post("/login", login);

userRouter.get("/", findUsers);

userRouter.put("/", jwtAuth, updateUser);
userRouter.delete("/:id", deleteUser)



userRouter.get('/auth/github',gitpassport.authenticate("github",{

  scope: [ 'user:email' ]  }))
userRouter.get(
  "/auth/github/callback",
  gitpassport.authenticate("github", {
   
    failureRedirect: "/auth/github/failure",
  }),(req,res)=>{
    res.redirect("/")
  }
);


oauthRouter.get("/", oauthController.googleLogin);
oauthRouter.get("/callback", oauthController.googleCallback);
