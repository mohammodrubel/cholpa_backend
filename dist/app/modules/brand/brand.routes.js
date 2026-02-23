"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.brandRouter = void 0;
const express_1 = require("express");
const brand_controller_1 = require("./brand.controller");
const sendImageToCloudinary_1 = require("../../utils/sendImageToCloudinary");
const router = (0, express_1.Router)();
router
    .route('/')
    .post(sendImageToCloudinary_1.upload.single('file'), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, brand_controller_1.BrandController.createBrand)
    .get(brand_controller_1.BrandController.getAllBrand);
router
    .route('/:id')
    .get(brand_controller_1.BrandController.getBrand)
    .put(brand_controller_1.BrandController.updateBrand)
    .patch(sendImageToCloudinary_1.upload.single('file'), brand_controller_1.BrandController.updateBrandPhoto)
    .delete(brand_controller_1.BrandController.deleteBrand);
exports.brandRouter = router;
