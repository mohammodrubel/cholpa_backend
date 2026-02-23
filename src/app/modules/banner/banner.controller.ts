import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import AppError from "../../errors/AppError";
import { BannerService } from "./banner.service";
import sendResponse from "../../utils/sendResponse";

const createBanner = catchAsync(async (req, res) => {
    const file = req.file as Express.Multer.File; 
    if (!file) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Hotel image is required');
    }
    const result = await BannerService.createBanner(file, req.body);
    sendResponse(res,{
        success:true,
        statusCode:httpStatus.CREATED,
        message:"created new banner successfully",
        data:result
    })
})
const updateBanner = catchAsync(async (req, res) => {

})

const getAllBanner = catchAsync(async (req, res) => {
    const result = await BannerService.getAllBanner()
    sendResponse(res,{
          success:true,
        statusCode:httpStatus.OK,
        message:"get all banners showen successfully",
        data:result
    })
})

const getSingleBanner = catchAsync(async (req, res) => {

})

const deleteBanner = catchAsync(async (req, res) => {

})

export const BannerController = {
    createBanner,
    updateBanner,
    getAllBanner,
    getSingleBanner,
    deleteBanner
}