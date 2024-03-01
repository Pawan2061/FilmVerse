import { PrismaClient } from "@prisma/client";
import { Response } from "express";
const prisma = new PrismaClient();

export const addMovie = async (req: any, res: Response) => {
  const { name, genre } = req.body;
  const userId = req.user.id;

  try {
    const newMovie = await prisma.movie.create({
      data: {
        name: name,
        genre: genre,
        viewerId: userId,
      },
    });

    return res.status(200).json({ newMovie });
  } catch (error) {
    return res.status(404).json({ error });
  }
};
