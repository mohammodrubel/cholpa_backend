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
exports.upload = exports.sendImageCloudinary = void 0;
const cloudinary_1 = require("cloudinary");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
// Cloudinary config
cloudinary_1.v2.config({
    cloud_name: "de2ysphks",
    api_key: "426748166613985",
    api_secret: "7gqc9Xwit13V0MP58NqqOqRLKNs",
});
// 🔹 Helper to sanitize filenames for Cloudinary
const sanitizeFileName = (filename) => {
    const name = path_1.default.parse(filename).name; // without extension
    return name
        .replace(/[^a-zA-Z0-9-_]/g, "_") // replace spaces & symbols with "_"
        .toLowerCase();
};
// 🔹 Upload buffer directly to Cloudinary
const sendImageCloudinary = (buffer_1, originalName_1, ...args_1) => __awaiter(void 0, [buffer_1, originalName_1, ...args_1], void 0, function* (buffer, originalName, folder = "specialOffers" // default folder
) {
    return new Promise((resolve, reject) => {
        let options = { folder };
        // If originalName provided → sanitize & set as public_id
        if (originalName) {
            options.public_id = sanitizeFileName(originalName);
        }
        const stream = cloudinary_1.v2.uploader.upload_stream(options, (error, result) => {
            if (error)
                return reject(error);
            if (result)
                return resolve(result);
        });
        stream.end(buffer);
    });
});
exports.sendImageCloudinary = sendImageCloudinary;
// 🔹 Multer config (memory storage → keeps files in RAM, no disk writes)
const storage = multer_1.default.memoryStorage();
exports.upload = (0, multer_1.default)({ storage });
