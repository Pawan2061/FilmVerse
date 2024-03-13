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
        userId: req.user.id,
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
  } catch (error) {
    return res.status(200).json({ msg: error });
  }
};

export const deleteReview = async (req: any, res: any) => {
  try {
    const deletedReview = await prisma.review.delete({
      where: {
        id: +req.params.id,
        userId: req.user.id,
      },
    });

    return res.status(200).json({
      msg: `${deletedReview.comment} is deleted from the movie reviews`,
    });
  } catch (error) {
    return res.status(200).json({ msg: error });
  }
};

export const updateReview = async (req: any, res: any) => {
  try {
    const updatedReview = await prisma.review.update({
      where: {
        id: +req.params.id,
        userId: req.user.id,
      },
      data: {
        comment: req.body.comment,
      },
    });
    console.log(updatedReview);

    return res.status(200).json({ msg: updatedReview });
  } catch (error) {
    return res.status(200).json({ msg: error });
  }
};
