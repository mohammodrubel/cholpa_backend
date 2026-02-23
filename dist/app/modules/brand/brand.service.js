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
exports.brandService = void 0;
const prisma_1 = __importDefault(require("../../utils/prisma"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const sendImageToCloudinary_1 = require("../../utils/sendImageToCloudinary");
const createBrand = (file, data) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(data, 'data');
    if (!file)
        throw new AppError_1.default(http_status_1.default.CONFLICT, 'Image is required');
    const imageName = new Date().toTimeString().replace(/:/g, '-') + '-' + file.originalname;
    const uploadResult = yield (0, sendImageToCloudinary_1.sendImageCloudinary)(file.buffer, imageName);
    // Prisma expects description to be a string (required)
    const result = yield prisma_1.default.brand.create({
        data: {
            name: data.name,
            description: data.description,
            logo: uploadResult.secure_url,
        },
    });
    return result;
});
// Get All Categories
const getAllBrand = () => __awaiter(void 0, void 0, void 0, function* () {
    const reuslt = yield prisma_1.default.brand.findMany({});
    return reuslt;
});
// Get Single Category by ID
const getBrand = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.brand.findUnique({
        where: { id }
    });
    if (!isExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Brand  Not Found");
    }
    return isExist;
});
// Update Category by ID
const updateBrand = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.brand.findUnique({
        where: { id },
    });
    if (!isExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Brand  Not Found');
    }
    const result = yield prisma_1.default.brand.update({
        where: {
            id: id
        },
        data: {
            name: updateData.name,
            description: updateData.description
        }
    });
    return result;
});
const updatebrandPhoto = (file, id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.brand.findUnique({
        where: { id },
    });
    if (!isExist) {
        throw new AppError_1.default(http_status_1.default.CONFLICT, "invalid id ");
    }
    if (!file)
        throw new AppError_1.default(http_status_1.default.CONFLICT, 'Image is required');
    const imageName = new Date().toTimeString().replace(/:/g, '-') + '-' + file.originalname;
    const uploadResult = yield (0, sendImageToCloudinary_1.sendImageCloudinary)(file.buffer, imageName);
    yield prisma_1.default.brand.update({
        data: {
            logo: uploadResult.secure_url,
        },
        where: {
            id: id
        }
    });
    return yield isExist;
});
// Delete Brand by ID and all associated products
const deleteBrand = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.brand.findUnique({
        where: { id },
    });
    if (!isExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Brand Not Found');
    }
    // First delete all products associated with this brand
    yield prisma_1.default.product.deleteMany({
        where: {
            brandId: id
        }
    });
    // Then delete the brand
    const result = yield prisma_1.default.brand.delete({
        where: {
            id
        }
    });
    return result;
});
exports.brandService = {
    createBrand,
    getAllBrand,
    getBrand,
    updateBrand,
    deleteBrand,
    updatebrandPhoto
};
