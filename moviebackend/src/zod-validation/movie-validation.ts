import z from "zod";

export const Movie = z.object({
  name: z.string().min(2, "the name shoule be bigger"),

  genre: z.string(),
});
