import { PrismaClient } from "@prisma/client";
import { Response } from "express";
import { uploadOnCloudinary } from "../utils/cloudinary";
import { Movie } from "../zod-validation/movie-validation";
const prisma = new PrismaClient();

export const addMovie = async (req: any, res: any) => {
  const validate = Movie.safeParse(req.body);

  if (!validate.success) {
    return res.status(400).send("Incorrect inputs");
  }

  try {
    const thumbnailresponse: any = await uploadOnCloudinary(
      req.file.path,
      req,
      res
    );
    const newMovie = await prisma.movie.create({
      data: {
        name: req.body.name,
        genre: req.body.genre,
        movieThumbnail: thumbnailresponse,
        description: req.body.description,
      },
    });
    console.log(newMovie);

    return res.status(200).json({ newMovie });
  } catch (error) {
    console.log(error);

    return res.status(404).json({ error: error });
  }
};

export const getMovies = async (req: any, res: Response) => {
  try {
    const movies = await prisma.movie.findMany({
      include: {
        reviews: true,
      },
    });

    if (!movies) {
      return res.status(404).json({ msg: "No movies are available" });
    }
    return res.status(200).json({ movies: movies });
  } catch (error) {
    res.status(401).json(error);
  }
};
