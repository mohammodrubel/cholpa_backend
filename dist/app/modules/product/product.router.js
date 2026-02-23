"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = require("express");
const product_controller_1 = require("./product.controller");
const sendImageToCloudinary_1 = require("../../utils/sendImageToCloudinary");
const router = (0, express_1.Router)();
router
    .route('/')
    .post(sendImageToCloudinary_1.upload.array('files', 3), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, product_controller_1.ProductController.createProduct)
    .get(product_controller_1.ProductController.getAllProducts);
router
    .route('/:id')
    .get(product_controller_1.ProductController.getProduct)
    .put(product_controller_1.ProductController.updateProduct)
    .delete(product_controller_1.ProductController.deleteProduct);
exports.productRouter = router;
