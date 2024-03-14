import { PrismaClient } from "@prisma/client";
import { Response } from "express";

const prisma = new PrismaClient();

export const createWatchlist = async (req: any, res: Response) => {
  try {
    const newWatchlist = await prisma.watchList.create({
      data: {
        movieId: +req.params.id,
        userId: +req.user.id,
      },
    });
    if (!newWatchlist) {
      return res.status(404).json({ msg: "No data found for the watchlist" });
    }
    return res.status(200).json({ newWatchlist });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

export const getWatchlist = async (req: any, res: Response) => {
  try {
    const watchList = await prisma.watchList.findMany({
      where: {
        userId: req.user.id,
      },
    });
    if (!watchList) {
      return res.status(403).json({ msg: "No watchlist movies are fouund" });
    }
    res.status(200).json(watchList);
  } catch (error) {
    console.log(error);

    res.status(400).json(error);
  }
};

export const deleteWatchlist = async (req: any, res: Response) => {
  try {
    const deletedWatchlist = await prisma.watchList.delete({
      where: {
        id: +req.params.id,
      },
    });
    return res
      .status(200)
      .json(` watchlist id ${deletedWatchlist.id} is deleted`);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const isWatched = async (req: any, res: any) => {
  try {
    const watchList = await prisma.watchList.findFirst({
      where: {
        movieId: +req.params.id,
        userId: req.user.id,
      },
    });
    if (watchList) {
      return res.status(200).json({ data: true });
    }
    return res.status(400).json({ data: false });
  } catch (error) {
    res.status(400).json(error);
  }
};
