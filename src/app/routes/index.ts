import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { userRouter } from '../modules/user/user.router';
import { BannerRouter } from '../modules/banner/banner.router';
import { RecipeRouter } from '../modules/Recipe/Recipe.router';
import { advertisementRouter } from '../modules/advertisement/advertisement.router';

const router = express.Router();

type Route = {
  path: string;
  route: express.Router;
};

const routes: Route[] = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/user',
    route: userRouter,
  },
  {
    path: '/banner',
    route: BannerRouter,
  },
  {
    path: '/recipe',
    route: RecipeRouter,
  },
  {
    path: '/advertisement',
    route: advertisementRouter,
  },
 
];
routes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
