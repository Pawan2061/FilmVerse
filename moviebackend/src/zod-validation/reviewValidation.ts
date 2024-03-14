import z from "zod";
export const review = z.object({
  id: z.number().int(),

  comment: z.string().min(5, "review must be more than 5 words"),
});
