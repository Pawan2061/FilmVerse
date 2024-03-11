import { PrismaClient } from "@prisma/client";
import { Response } from "express";
import { Movie } from "../zod-validation/movie-validation";
const prisma = new PrismaClient();

export const addMovie = async (req: any, res: Response) => {
  const { name, genre } = req.body;
  const userId = req.user.id;
  const validate = Movie.safeParse(req.body);
  if (!validate) {
    return res.status(400).send("Incorrect inputs");
  }

  try {
    const newMovie = await prisma.movie.create({
      data: {
        name: name,
        genre: genre,
      },
    });

    return res.status(200).json({ newMovie });
  } catch (error) {
    return res.status(404).json({ error });
  }
};

export const getMovies = async (req: any, res: Response) => {
  try {
    const movies = await prisma.movie.findMany();

    if (!movies) {
      return res.status(404).json({ msg: "No movies are available" });
    }
    return res.status(200).json({ movies: movies });
  } catch (error) {
    res.status(401).json(error);
  }
};
