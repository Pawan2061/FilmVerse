import { PrismaClient } from "@prisma/client";
import { NextFunction, Response } from "express";
const prisma = new PrismaClient();

export const checkRole = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const user = await prisma.user.findFirst({
    where: {
      id: req.user.id,
    },
  });
  if (user?.role != "host") {
    console.log(user?.role);

    return res.status(200).json({ msg: "No sufficient credentials" });
  }

  next();
};
