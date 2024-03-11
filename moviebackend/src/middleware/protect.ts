import { NextFunction, Response } from "express";

export const protect = async (req: any, res: Response, next: NextFunction) => {
  console.log(req.user);
  const role = req.user.role;
  if (role !== "Viewer") {
    res.status(401).json({
      messge: "UnAuthorized",
    });
  }
  next();
};
