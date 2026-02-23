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
exports.advertisementService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const sendImageToCloudinary_1 = require("../../utils/sendImageToCloudinary");
const prisma_1 = __importDefault(require("../../utils/prisma"));
const createAdvertisement = (file, data) => __awaiter(void 0, void 0, void 0, function* () {
    if (!file) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Advertisement image is required');
    }
    // Validate required fields
    const requiredFields = ['shortTitle_az', 'shortTitle_en', 'title_az', 'title_en'];
    for (const field of requiredFields) {
        if (!data[field]) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, `Field "${field}" is required`);
        }
    }
    // Upload image to Cloudinary
    const uniqueImageName = `advertisement_${Date.now()}_${Math.random().toString(36)}`;
    const uploadedImage = (yield (0, sendImageToCloudinary_1.sendImageToCloudinary)(file.path, uniqueImageName));
    // Save to database
    const result = yield prisma_1.default.advertisement.create({
        data: {
            image: uploadedImage.secure_url,
            shortTitle_az: data.shortTitle_az,
            shortTitle_en: data.shortTitle_en,
            title_az: data.title_az,
            title_en: data.title_en,
        },
    });
    return result;
});
const getAllAdvertisements = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.advertisement.findMany({});
    return result;
});
const updateAdvertisement = (id, file, data) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if advertisement exists
    const existing = yield prisma_1.default.advertisement.findUnique({
        where: { id: id },
    });
    if (!existing) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Advertisement not found');
    }
    // Prepare update data
    const updateData = Object.assign({}, data);
    // If new image is provided, upload it
    if (file) {
        const uniqueImageName = `advertisement_${Date.now()}_${Math.random().toString(36)}`;
        const uploadedImage = (yield (0, sendImageToCloudinary_1.sendImageToCloudinary)(file.path, uniqueImageName));
        updateData.image = uploadedImage.secure_url;
    }
    // Remove undefined fields
    Object.keys(updateData).forEach((key) => updateData[key] === undefined && delete updateData[key]);
    const result = yield prisma_1.default.advertisement.update({
        where: { id },
        data: updateData,
    });
    return result;
});
const deleteAdvertisement = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existing = yield prisma_1.default.advertisement.findUnique({
        where: { id },
    });
    if (!existing) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Advertisement not found');
    }
    const result = yield prisma_1.default.advertisement.delete({
        where: { id },
    });
    return result;
});
exports.advertisementService = {
    createAdvertisement,
    getAllAdvertisements,
    updateAdvertisement,
    deleteAdvertisement,
};
