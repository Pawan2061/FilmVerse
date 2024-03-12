import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createReview = async (req: any, res: any) => {
  try {
    const newReview = await prisma.review.create({
      data: {
        comment: req.body.comment,
        userId: req.user.id,
        movieId: +req.params.id,
      },
    });

    res.status(200).json({ data: newReview });
  } catch (error) {
    return res.status(200).json({ msg: error });
  }
};

export const getReviews = async (req: any, res: any) => {
  try {
    const reviews = await prisma.review.findMany({
      where: {
        movieId: +req.params.id,
      },
    });

    if (!reviews) {
      return res
        .status(400)
        .json({ msg: "No such review for the given movie" });
    }
    console.log(reviews);

    return res.status(200).json({ msg: reviews });
  } catch (error) {}
};