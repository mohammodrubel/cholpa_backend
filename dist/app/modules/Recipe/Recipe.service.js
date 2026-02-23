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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeService = void 0;
const prisma_1 = __importDefault(require("../../utils/prisma"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const sendImageToCloudinary_1 = require("../../utils/sendImageToCloudinary");
const pagination_1 = __importDefault(require("../../utils/pagination"));
const createRecipe = (file, data) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const errors = [];
    if (!file)
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Recipe image is required');
    if (!((_a = data.name_en) === null || _a === void 0 ? void 0 : _a.trim()))
        errors.push("name_en is required");
    if (!((_b = data.name_az) === null || _b === void 0 ? void 0 : _b.trim()))
        errors.push("name_az is required");
    if (!((_c = data.description_en) === null || _c === void 0 ? void 0 : _c.trim()))
        errors.push("description_en is required");
    if (!((_d = data.description_az) === null || _d === void 0 ? void 0 : _d.trim()))
        errors.push("description_az is required");
    if (!((_e = data.details_en) === null || _e === void 0 ? void 0 : _e.trim()))
        errors.push("details_en is required");
    if (!((_f = data.details_az) === null || _f === void 0 ? void 0 : _f.trim()))
        errors.push("details_az is required");
    if (errors.length > 0)
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, errors.join(", "));
    const uniqueImageName = `banner_${Date.now()}_${Math.random().toString(36)}`;
    const uploadedImage = yield (0, sendImageToCloudinary_1.sendImageToCloudinary)(file.path, uniqueImageName);
    const recipe = yield prisma_1.default.recipe.create({
        data: {
            imageUrl: uploadedImage.secure_url,
            name_en: data.name_en,
            name_az: data.name_az,
            description_en: data.description_en,
            description_az: data.description_az,
            details_en: data.details_en,
            details_az: data.details_az,
            category_en: data.category_en,
            category_az: data.category_az,
            minute: Number(data.minute) || 0,
            chefName_en: data.chefName_en,
            chefName_az: data.chefName_az,
            videoTitle_en: data.videoTitle_en,
            videoTitle_az: data.videoTitle_az,
            videoDescription_en: data.videoDescription_en,
            videoDescription_az: data.videoDescription_az,
            videoUrl: data.videoUrl,
        },
    });
    if ((_g = data.ingredients) === null || _g === void 0 ? void 0 : _g.length) {
        yield prisma_1.default.ingredient.createMany({
            data: data.ingredients.map((i) => ({
                value_en: i.en,
                value_az: i.az,
                recipeId: recipe.id
            }))
        });
    }
    if ((_h = data.tips) === null || _h === void 0 ? void 0 : _h.length) {
        yield prisma_1.default.tip.createMany({
            data: data.tips.map((t) => ({
                value_en: t.en,
                value_az: t.az,
                recipeId: recipe.id
            }))
        });
    }
    return recipe;
});
const getAllRecipe = (query, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = query, filter = __rest(query, ["searchTerm"]);
    const { limit, page, skip, sort, order } = (0, pagination_1.default)(options);
    const andCondition = [];
    // 🔎 Search by name/description
    if (searchTerm) {
        andCondition.push({
            OR: ["name_en", "name_az", "description_en", "description_az"].map((field) => ({
                [field]: {
                    contains: searchTerm,
                    mode: "insensitive",
                },
            })),
        });
    }
    // 🎯 Dynamic filters (ignore empty or null values)
    Object.keys(filter).forEach((field) => {
        const value = filter[field];
        if (value === undefined ||
            value === null ||
            value === "" ||
            (Array.isArray(value) && value.length === 0)) {
            return; // skip empty filters
        }
        if (Array.isArray(value)) {
            andCondition.push({
                [field]: { in: value },
            });
        }
        else {
            andCondition.push({
                [field]: { equals: value },
            });
        }
    });
    const whereCondition = andCondition.length ? { AND: andCondition } : {};
    // ✅ Only allow valid Prisma fields for sorting
    const validSortFields = [
        "id",
        "name_en",
        "name_az",
        "description_en",
        "description_az",
        "details_en",
        "details_az",
        "category_en",
        "category_az",
        "minute",
        "chefName_en",
        "chefName_az",
        "imageUrl",
        "videoTitle_en",
        "videoTitle_az",
        "videoDescription_en",
        "videoDescription_az",
        "videoUrl",
        "createdAt",
        "updatedAt",
    ];
    const sortField = validSortFields.includes(sort) ? sort : "createdAt";
    const sortOrder = order === "asc" ? "asc" : "desc";
    const result = yield prisma_1.default.recipe.findMany({
        where: whereCondition,
        skip,
        take: limit,
        orderBy: {
            [sortField]: sortOrder, // ✅ use camelCase
        },
        include: {
            ingredients: true,
            tips: true,
        },
    });
    const total = yield prisma_1.default.recipe.count({
        where: whereCondition,
    });
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleRecipe = () => __awaiter(void 0, void 0, void 0, function* () { });
const updateRecipe = () => __awaiter(void 0, void 0, void 0, function* () { });
const deleteRecipe = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isValidRecipe = yield prisma_1.default.recipe.findUnique({
        where: {
            id: id
        }
    });
    if (!isValidRecipe) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "invalid recipe");
    }
    const reuslt = yield prisma_1.default.recipe.delete({
        where: {
            id: isValidRecipe.id
        }
    });
    return reuslt;
});
exports.RecipeService = {
    createRecipe,
    getAllRecipe,
    getSingleRecipe,
    updateRecipe,
    deleteRecipe
};
