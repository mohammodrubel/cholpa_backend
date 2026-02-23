"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BannerService = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const sendImageToCloudinary_1 = require("../../utils/sendImageToCloudinary");
const prisma_1 = __importDefault(require("../../utils/prisma"));
const createBanner = (file, data) => __awaiter(void 0, void 0, void 0, function* () {
    if (!file) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Banner image is required');
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
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, `${field} is required`);
        }
    }
    const uniqueImageName = `banner_${Date.now()}_${Math.random().toString(36)}`;
    const uploadedImage = (yield (0, sendImageToCloudinary_1.sendImageToCloudinary)(file.path, uniqueImageName));
    const result = yield prisma_1.default.banner.create({
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
});
const updateBanner = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () { }));
const getAllBanner = () => __awaiter(void 0, void 0, void 0, function* () {
    const reuslt = yield prisma_1.default.banner.findMany({});
    return reuslt;
});
const getSingleBanner = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () { }));
const deleteBanner = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () { }));
exports.BannerService = {
    createBanner,
    getAllBanner
};
