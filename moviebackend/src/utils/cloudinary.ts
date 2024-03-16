import { v2 as cloudinary } from "cloudinary";
import { Request, Response } from "express";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (
  localFilePath: any,
  res: Response,
  req: Request
) => {
  try {
    if (!localFilePath) {
      return res.status(404).json({ msg: "couldnt find the cloud path" });
    }
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    console.log("successfully uploaded", response.url);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath);
  }
};

export { uploadOnCloudinary };
