import { advertisement } from '@prisma/client';
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';
import prisma from '../../utils/prisma';

const createAdvertisement = async (
  file: Express.Multer.File,
  data: Partial<advertisement>
) => {
  if (!file) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Advertisement image is required');
  }

  // Validate required fields
  const requiredFields = ['shortTitle_az', 'shortTitle_en', 'title_az', 'title_en'] as const;
  for (const field of requiredFields) {
    if (!data[field]) {
      throw new AppError(httpStatus.BAD_REQUEST, `Field "${field}" is required`);
    }
  }

  // Upload image to Cloudinary
  const uniqueImageName = `advertisement_${Date.now()}_${Math.random().toString(36)}`;
  const uploadedImage = (await sendImageToCloudinary(
    file.path,
    uniqueImageName
  )) as { secure_url: string };

  // Save to database
  const result = await prisma.advertisement.create({
    data: {
      image: uploadedImage.secure_url,
      shortTitle_az: data.shortTitle_az!,
      shortTitle_en: data.shortTitle_en!,
      title_az: data.title_az!,
      title_en: data.title_en!,
    },
  });

  return result;
};

const getAllAdvertisements = async () => {
  const result = await prisma.advertisement.findMany({});
  return result;
};

const updateAdvertisement = async (
  id: string,
  file: Express.Multer.File | undefined,
  data: Partial<advertisement>
) => {
  // Check if advertisement exists
  const existing = await prisma.advertisement.findUnique({
    where: { id },
  });
  if (!existing) {
    throw new AppError(httpStatus.NOT_FOUND, 'Advertisement not found');
  }

  // Prepare update data
  const updateData: any = { ...data };

  // If new image is provided, upload it
  if (file) {
    const uniqueImageName = `advertisement_${Date.now()}_${Math.random().toString(36)}`;
    const uploadedImage = (await sendImageToCloudinary(
      file.path,
      uniqueImageName
    )) as { secure_url: string };
    updateData.image = uploadedImage.secure_url;
  }

  // Remove undefined fields
  Object.keys(updateData).forEach(
    (key) => updateData[key] === undefined && delete updateData[key]
  );

  const result = await prisma.advertisement.update({
    where: { id },
    data: updateData,
  });

  return result;
};

const deleteAdvertisement = async (id: string) => {
  const existing = await prisma.advertisement.findUnique({
    where: { id },
  });
  if (!existing) {
    throw new AppError(httpStatus.NOT_FOUND, 'Advertisement not found');
  }

  const result = await prisma.advertisement.delete({
    where: { id },
  });

  return result;
};

export const advertisementService = {
  createAdvertisement,
  getAllAdvertisements,
  updateAdvertisement,
  deleteAdvertisement,
};