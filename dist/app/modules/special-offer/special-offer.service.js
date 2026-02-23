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
exports.SpecialOfferService = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const prisma_1 = __importDefault(require("../../utils/prisma"));
// ✅ Create Special Offer
const createSpecialOffer = (data) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!data.title || !data.productId || !data.validFrom) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Title, ProductID, and validFrom are required');
    }
    // Check product exists
    const product = yield prisma_1.default.product.findUnique({
        where: { id: data.productId },
    });
    if (!product || product.isDeleted) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Product not found');
    }
    const result = yield prisma_1.default.specialOffer.create({
        data: {
            title: data.title,
            productId: data.productId,
            validFrom: new Date(data.validFrom),
            validUntil: data.validUntil ? new Date(data.validUntil) : null,
            description: (_a = data.description) !== null && _a !== void 0 ? _a : null,
        },
        include: {
            product: {
                select: {
                    id: true,
                    name: true,
                    images: true,
                },
            },
        },
    });
    return result;
});
// ✅ Edit Special Offer
const editSpecialOffer = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const offer = yield prisma_1.default.specialOffer.findUnique({ where: { id } });
    if (!offer)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Special offer not found');
    // Validate product if changed
    if (data.productId && data.productId !== offer.productId) {
        const product = yield prisma_1.default.product.findUnique({
            where: { id: data.productId },
        });
        if (!product || product.isDeleted)
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Product not found');
    }
    const updatedOffer = yield prisma_1.default.specialOffer.update({
        where: { id },
        data: {
            title: (_a = data.title) !== null && _a !== void 0 ? _a : offer.title,
            productId: (_b = data.productId) !== null && _b !== void 0 ? _b : offer.productId,
            validFrom: data.validFrom ? new Date(data.validFrom) : offer.validFrom,
            validUntil: data.validUntil
                ? new Date(data.validUntil)
                : offer.validUntil,
            description: (_c = data.description) !== null && _c !== void 0 ? _c : offer.description,
        },
        include: {
            product: {
                select: {
                    id: true,
                    name: true,
                    images: true,
                },
            },
        },
    });
    return updatedOffer;
});
// ✅ Delete Special Offer
const deleteSpecialOffer = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const offer = yield prisma_1.default.specialOffer.findUnique({ where: { id } });
    if (!offer)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Special offer not found');
    return yield prisma_1.default.specialOffer.delete({
        where: { id },
        include: {
            product: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    });
});
// ✅ Get all special offers
const getAllSpecialOffers = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.specialOffer.findMany({
        include: {
            product: {
                select: {
                    id: true,
                    name: true,
                    images: true,
                    price: true
                },
            },
        },
    });
});
// ✅ Get single special offer
const getSingleSpecialOffer = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const offer = yield prisma_1.default.specialOffer.findUnique({
        where: { id },
        include: {
            product: {
                select: {
                    id: true,
                    name: true,
                    images: true,
                },
            },
        },
    });
    if (!offer)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Special offer not found');
    return offer;
});
exports.SpecialOfferService = {
    createSpecialOffer,
    editSpecialOffer,
    deleteSpecialOffer,
    getAllSpecialOffers,
    getSingleSpecialOffer,
};
