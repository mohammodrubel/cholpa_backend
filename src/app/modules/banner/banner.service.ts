import { Banner } from "@prisma/client";
import catchAsync from "../../utils/catchAsync"
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import {  sendImageToCloudinary } from "../../utils/sendImageToCloudinary";
import prisma from "../../utils/prisma";

const createBanner = async (file: Express.Multer.File, data: any) => {
  if (!file) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Banner image is required');
  }

  // Validate required fields from the schema
  const requiredFields = [
    'title_en',
    'title_az',
    'description_en',
    'description_az',
  ];
  for (const field of requiredFields) {
    if (!data[field]) {
      throw new AppError(httpStatus.BAD_REQUEST, `${field} is required`);
    }
  }

  const uniqueImageName = `banner_${Date.now()}_${Math.random().toString(36)}`;
  const uploadedImage = (await sendImageToCloudinary(
    file.path,
    uniqueImageName
  )) as { secure_url: string };

  const result = await prisma.banner.create({
    data: {
      imageUrl: uploadedImage.secure_url,
      shortTitle_en: data.shortTitle_en,
      title_en: data.title_en,
      description_en: data.description_en,
      minutes_en: data.minutes_en,
      award_en: data.award_en,
      rating_en: data.rating_en,
      buttonText_en: data.buttonText_en,
      shortTitle_az: data.shortTitle_az,
      title_az: data.title_az,
      description_az: data.description_az,
      minutes_az: data.minutes_az,
      award_az: data.award_az,
      rating_az: data.rating_az,
      buttonText_az: data.buttonText_az,
    },
  });

  return result;
};


const updateBanner = catchAsync(async (req, res) => { })
const getAllBanner = async ()=>{
    const reuslt = await prisma.banner.findMany({})
     return reuslt
}
const getSingleBanner = catchAsync(async (req, res) => { })
const deleteBanner = catchAsync(async (req, res) => { })

export const BannerService = {
    createBanner,
    getAllBanner
}