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
exports.SpecialOfferController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const special_offer_service_1 = require("./special-offer.service");
const createSpecialOffer = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield special_offer_service_1.SpecialOfferService.createSpecialOffer(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: 'Special offer created successfully',
        data: result,
    });
}));
const getAllSpecialOffers = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield special_offer_service_1.SpecialOfferService.getAllSpecialOffers();
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Special offers retrieved successfully',
        data: result,
    });
}));
const getSingleSpecialOffer = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield special_offer_service_1.SpecialOfferService.getSingleSpecialOffer(req.params.id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Special offer retrieved successfully',
        data: result,
    });
}));
const editSpecialOffer = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    const result = yield special_offer_service_1.SpecialOfferService.editSpecialOffer(req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Special offer updated successfully',
        data: result,
    });
}));
const deleteSpecialOffer = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield special_offer_service_1.SpecialOfferService.deleteSpecialOffer(req.params.id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Special offer deleted successfully',
        data: result,
    });
}));
exports.SpecialOfferController = {
    createSpecialOffer, // Fixed typo
    getAllSpecialOffers,
    getSingleSpecialOffer,
    editSpecialOffer,
    deleteSpecialOffer,
};
