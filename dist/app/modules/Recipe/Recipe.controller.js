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
exports.RecipeController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const Recipe_service_1 = require("./Recipe.service");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const PickFunction_1 = __importDefault(require("../../utils/PickFunction"));
const Recipe_constant_1 = require("./Recipe.constant");
const createRecipe = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    if (!file) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Recipe image is required');
    }
    const result = yield Recipe_service_1.RecipeService.createRecipe(file, req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: "Create New Recipe Successfully",
        data: result
    });
}));
const getAllRecipe = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = (0, PickFunction_1.default)(req.query, Recipe_constant_1.productSearchFields); // now only valid columns
    const options = (0, PickFunction_1.default)(req.query, Recipe_constant_1.paginationFields);
    const result = yield Recipe_service_1.RecipeService.getAllRecipe(filter, options);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'All recipes shown successfully',
        meta: result === null || result === void 0 ? void 0 : result.meta,
        data: result.data,
    });
}));
const getSingleRecipe = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () { }));
const updateRecipe = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () { }));
const deleteRecipe = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const reuslt = yield Recipe_service_1.RecipeService.deleteRecipe(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "recipe remove successfully",
        data: reuslt
    });
}));
exports.RecipeController = {
    createRecipe,
    getAllRecipe,
    getSingleRecipe,
    updateRecipe,
    deleteRecipe
};
