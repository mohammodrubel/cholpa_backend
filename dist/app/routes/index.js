"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_routes_1 = require("../modules/auth/auth.routes");
const user_router_1 = require("../modules/user/user.router");
const banner_router_1 = require("../modules/banner/banner.router");
const Recipe_router_1 = require("../modules/Recipe/Recipe.router");
const advertisement_router_1 = require("../modules/advertisement/advertisement.router");
const router = express_1.default.Router();
const routes = [
    {
        path: '/auth',
        route: auth_routes_1.AuthRoutes,
    },
    {
        path: '/user',
        route: user_router_1.userRouter,
    },
    {
        path: '/banner',
        route: banner_router_1.BannerRouter,
    },
    {
        path: '/recipe',
        route: Recipe_router_1.RecipeRouter,
    },
    {
        path: '/advertisement',
        route: advertisement_router_1.advertisementRouter,
    },
];
routes.forEach((route) => {
    router.use(route.path, route.route);
});
exports.default = router;
