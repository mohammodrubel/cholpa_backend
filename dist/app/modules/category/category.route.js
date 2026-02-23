"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRouter = void 0;
const express_1 = require("express");
const category_controller_1 = require("./category.controller");
const sendImageToCloudinary_1 = require("../../utils/sendImageToCloudinary");
const router = (0, express_1.Router)();
router
    .route('/')
    .post(sendImageToCloudinary_1.upload.single('file'), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, category_controller_1.CategoryController.createCategory)
    .get(category_controller_1.CategoryController.getCategories);
router
    .route('/:id')
    .get(category_controller_1.CategoryController.getCategory)
    .put(category_controller_1.CategoryController.updateCategory)
    .delete(category_controller_1.CategoryController.deleteCategory);
exports.categoryRouter = router;
