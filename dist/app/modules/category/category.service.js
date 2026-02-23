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
exports.CategoryService = void 0;
const prisma_1 = __importDefault(require("../../utils/prisma"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const sendImageToCloudinary_1 = require("../../utils/sendImageToCloudinary");
// Create Category
const createCategory = (file, data) => __awaiter(void 0, void 0, void 0, function* () {
    if (!file) {
        throw new AppError_1.default(http_status_1.default.CONFLICT, 'Icon is required');
    }
    const imageName = new Date().toTimeString().replace(/:/g, '-') + '-' + file.originalname;
    const uploadResult = yield (0, sendImageToCloudinary_1.sendImageCloudinary)(file.buffer, imageName);
    const result = yield prisma_1.default.category.create({
        data: Object.assign(Object.assign({}, data), { icon: uploadResult.secure_url }),
    });
    return result;
});
// Get All Categories
const getCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    const reuslt = yield prisma_1.default.category.findMany({
        where: {
            isDeleted: false,
        },
    });
    return reuslt;
});
// Get Single Category by ID
const getCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const findCategory = yield prisma_1.default.category.findUnique({ where: { id } });
    if (!findCategory) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Category not found');
    }
    const result = yield prisma_1.default.category.findFirst({
        where: {
            id,
        },
    });
    return result;
});
const updateCategory = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const findCategory = yield prisma_1.default.category.findUnique({ where: { id } });
    if (!findCategory) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Category not found');
    }
    // Decide new subcategories
    let newSubcategories = [];
    if (updateData.subcategories) {
        newSubcategories = updateData.subcategories;
    }
    const result = yield prisma_1.default.category.update({
        where: { id },
        data: Object.assign(Object.assign({}, updateData), { subcategories: newSubcategories }),
    });
    return result;
});
const deleteCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const findCategory = yield prisma_1.default.category.findUnique({ where: { id } });
    if (!findCategory) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Category not found');
    }
    const result = yield prisma_1.default.category.update({
        where: {
            id,
        },
        data: {
            isDeleted: true,
        },
    });
    return result;
});
exports.CategoryService = {
    createCategory,
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory,
};
