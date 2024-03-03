import z from "zod";

export const Movie = z.object({
  name: z.string(),
  genre: z.string(),
});
