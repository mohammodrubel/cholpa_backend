"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BannerRouter = void 0;
const express_1 = __importDefault(require("express"));
const banner_controller_1 = require("./banner.controller");
const sendImageToCloudinary_1 = require("../../utils/sendImageToCloudinary");
const router = express_1.default.Router();
router.post('/create-banner', sendImageToCloudinary_1.upload.single('file'), banner_controller_1.BannerController.createBanner);
router.get('/create-banner', banner_controller_1.BannerController.getAllBanner);
router.get('/create-banner/:id', banner_controller_1.BannerController.getSingleBanner);
router.patch('/create-banner/:id', banner_controller_1.BannerController.updateBanner);
router.delete('/create-banner/:id', banner_controller_1.BannerController.deleteBanner);
exports.BannerRouter = router;
