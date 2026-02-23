"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeRouter = void 0;
const express_1 = __importDefault(require("express"));
const sendImageToCloudinary_1 = require("../../utils/sendImageToCloudinary");
const Recipe_controller_1 = require("./Recipe.controller");
const router = express_1.default.Router();
router.post('/create-recipe', sendImageToCloudinary_1.upload.single('file'), (req, _res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, Recipe_controller_1.RecipeController.createRecipe);
router.get('/', Recipe_controller_1.RecipeController.getAllRecipe);
router.get('/:id', Recipe_controller_1.RecipeController.getSingleRecipe);
router.patch('/:id', Recipe_controller_1.RecipeController.updateRecipe);
router.delete('/:id', Recipe_controller_1.RecipeController.deleteRecipe);
exports.RecipeRouter = router;
