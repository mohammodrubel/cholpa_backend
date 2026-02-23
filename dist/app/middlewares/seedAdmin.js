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
exports.seedAdmin = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
const seedAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const adminEmail = 'admin@gmail.com';
        const existingAdmin = yield prisma.user.findUnique({
            where: { email: adminEmail },
        });
        if (!existingAdmin) {
            const hashedPassword = yield bcrypt_1.default.hash('admin@gmail.com', 10);
            yield prisma.user.create({
                data: {
                    fullName: 'Admin',
                    email: adminEmail,
                    password: hashedPassword,
                    role: client_1.Role.ADMIN,
                    emailVerified: true,
                    isActive: true,
                },
            });
            console.log('✅ Default admin created');
        }
        else {
            console.log('ℹ️ Admin already exists');
        }
    }
    catch (error) {
        console.error('❌ Seed error:', error);
    }
});
exports.seedAdmin = seedAdmin;
