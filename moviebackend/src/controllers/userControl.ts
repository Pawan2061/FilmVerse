import { Request, Response } from "express";

import { PrismaClient } from "@prisma/client";
import { createToken } from "../middleware/createToken";
import { User } from "../zod-validation/user-validation";
const prisma = new PrismaClient();

export const signUp = async (req: Request, res: Response) => {
  try {
    const inputData = req.body;

    const isValidData = User.safeParse(inputData);
    if (!isValidData) {
      return res.status(403).json({ msg: "Invalid inputs" });
    }
    console.log(inputData);

    const newUser = await prisma.user.create({
      data: {
        name: inputData.name,
        email: inputData.email,
        password: inputData.password,
      },
    });

    return res.status(200).json({
      name: newUser.name,
      email: newUser.email,
      createdAt: newUser.createdAt,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: error });
  }
};
export const findUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();

    if (!users) {
      return res.status(404).json({ msg: "No users found" });
    }
    return res.status(200).json(users);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const login = async (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    const loggedinUser = await prisma.user.findFirst({
      where: {
        name: name,
      },
    });

    if (!loggedinUser) {
      return res.status(404).json({ msg: "No such user found" });
    }
    const payload = { id: loggedinUser.id };
    const token: any = await createToken(payload);
    return res.status(200).json({ token: token });
  } catch (error) {
    return res.status(400).json(error);
  }
};
