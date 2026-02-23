"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.advertisementRouter = void 0;
const express_1 = __importDefault(require("express"));
const sendImageToCloudinary_1 = require("../../utils/sendImageToCloudinary");
const advertisement_controller_1 = require("./advertisement.controller");
const router = express_1.default.Router();
// Create advertisement (requires image)
router.post('/', sendImageToCloudinary_1.upload.single('file'), (req, _res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, advertisement_controller_1.advertisementController.createAdvertisement);
// Get all advertisements
router.get('/', advertisement_controller_1.advertisementController.getAllAdvertisements);
// Update advertisement (image optional)
router.patch('/:id', sendImageToCloudinary_1.upload.single('file'), (req, _res, next) => {
    if (req.body.data) {
        req.body = JSON.parse(req.body.data);
    }
    next();
}, advertisement_controller_1.advertisementController.updateAdvertisement);
// Delete advertisement
router.delete('/:id', advertisement_controller_1.advertisementController.deleteAdvertisement);
exports.advertisementRouter = router;
