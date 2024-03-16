import { Request, Response } from "express";
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

import { PrismaClient } from "@prisma/client";
import { createToken } from "../middleware/createToken";
import { uploadOnCloudinary } from "../utils/cloudinary";
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
    console.log(loggedinUser);

    const payload = { id: loggedinUser.id, role: loggedinUser.role };
    const token: any = await createToken(payload);
    return res.status(200).json({ token: token });
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const updateUser = async (req: any, res: Response) => {
  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: req.user.id,
      },
      data: {
        name: req.body.name,
      },
    });
    return res.status(200).json({ msg: `${updatedUser.name} is updated` });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

export const deleteUser = async (req: any, res: Response) => {
  try {
    const deletedUser = await prisma.user.delete({
      where: {
        id: req.user.id,
      },
    });

    return res
      .status(200)
      .json({ msg: `${deletedUser.name} is deleted from the database` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
};

export const uploadProfile = async (req: any, res: any) => {
  try {
    const file = req.file;
    console.log(file);
    const output = await uploadOnCloudinary(file.path, res, req);
    console.log(output);

    const userId = req.user.id;

    // const updatedProfile=await prisma.user.update({
    //   where:{
    //     id:userId

    //   },
    //   data:{
    //     profilePicture:output.

    //   }
    // })
    // TODO: Add this to user schema
    return res.status(200).json(file);
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};
