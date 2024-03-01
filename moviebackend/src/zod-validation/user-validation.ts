import z from "zod";

export const User = z.object({
  id: z.number().int(),
  name: z.string().min(5, { message: "Must be 5 or more characters long" }),
  email: z.string().email(),
  password: z.string(),
  role: z.string().default("Viewer"),
});
