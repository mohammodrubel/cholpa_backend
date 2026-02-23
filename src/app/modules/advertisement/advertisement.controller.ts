import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { advertisementService } from './advertisement.service';

const createAdvertisement = catchAsync(async (req, res) => {
  const file = req.file as Express.Multer.File;
  const result = await advertisementService.createAdvertisement(file, req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Advertisement created successfully',
    data: result,
  });
});

const getAllAdvertisements = catchAsync(async (req, res) => {
  const result = await advertisementService.getAllAdvertisements();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Advertisements retrieved successfully',
    data: result,
  });
});

const updateAdvertisement = catchAsync(async (req, res) => {
  const { id } = req.params;
  const file = req.file as Express.Multer.File | undefined;
  const result = await advertisementService.updateAdvertisement(id, file, req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Advertisement updated successfully',
    data: result,
  });
});

const deleteAdvertisement = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await advertisementService.deleteAdvertisement(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Advertisement deleted successfully',
    data: result,
  });
});

export const advertisementController = {
  createAdvertisement,
  getAllAdvertisements,
  updateAdvertisement,
  deleteAdvertisement,
};