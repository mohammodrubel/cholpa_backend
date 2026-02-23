"use strict";
// productService.ts
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
exports.ProductService = exports.createProduct = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const prisma_1 = __importDefault(require("../../utils/prisma"));
const sendImageToCloudinary_1 = require("../../utils/sendImageToCloudinary");
const createProduct = (data, files) => __awaiter(void 0, void 0, void 0, function* () {
    // Validate images
    if (!files || files.length === 0) {
        throw new AppError_1.default(http_status_1.default.CONFLICT, 'At least one image is required');
    }
    if (files.length > 3) {
        throw new AppError_1.default(http_status_1.default.CONFLICT, 'Maximum 3 images are allowed');
    }
    // Validate category
    const isCategoryExist = yield prisma_1.default.category.findUnique({
        where: { id: data.categoryId },
    });
    if (!isCategoryExist) {
        throw new AppError_1.default(http_status_1.default.CONFLICT, 'Invalid category Id');
    }
    // Validate brand
    const isBrandExist = yield prisma_1.default.brand.findUnique({
        where: { id: data.brandId },
    });
    if (!isBrandExist) {
        throw new AppError_1.default(http_status_1.default.CONFLICT, 'Invalid Brand Id');
    }
    // Upload images to Cloudinary
    const imageUrls = [];
    for (const file of files) {
        const imageName = `${new Date().toTimeString().replace(/:/g, '-')}-${file.originalname}`;
        const uploadResult = yield (0, sendImageToCloudinary_1.sendImageCloudinary)(file.buffer, imageName);
        imageUrls.push(uploadResult.secure_url);
    }
    // Save product with image URLs
    const result = yield prisma_1.default.product.create({
        data: Object.assign(Object.assign({}, data), { images: imageUrls }),
    });
    return result;
});
exports.createProduct = createProduct;
const getProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const reuslt = yield prisma_1.default.product.findUnique({
        where: {
            id: id
        }
    });
    return reuslt;
});
const getAllProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.product.findMany({
        include: {
            category: true,
            brand: true,
        },
    });
    return result;
});
const updateProduct = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    // Update product by id in database
    return { message: 'Product updated', id, data };
});
const deleteProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // Delete product by id from database
    return { message: 'Product deleted', id };
});
exports.ProductService = {
    createProduct: exports.createProduct,
    getProduct,
    getAllProducts,
    updateProduct,
    deleteProduct,
};
