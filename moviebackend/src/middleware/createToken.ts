import jwt from "jsonwebtoken";
export const createToken = async (payload: any) => {
  const token = await jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "2d",
  });
  return token;
};
