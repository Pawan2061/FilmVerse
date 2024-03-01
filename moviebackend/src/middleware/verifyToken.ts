import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";

export const jwtAuth = (req: any, res: Response, next: NextFunction) => {
  const token: any = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ error: "Unauthorized" });
  }
  jwt.verify(token, process.env.JWT_SECRET as string, (err, decodedToken) => {
    if (err) {
      return res.json({ error: err.message });
    }
    req.user = decodedToken;
    next();
  });
};
