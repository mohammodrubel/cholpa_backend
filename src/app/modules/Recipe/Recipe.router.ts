import express, { NextFunction, Request, Response } from 'express';
import { upload } from '../../utils/sendImageToCloudinary';
import { RecipeController } from './Recipe.controller';


const router = express.Router();

router.post(
  '/create-recipe',
  upload.single('file'),
  (req: Request, _res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  RecipeController.createRecipe
);
router.get(
    '/',
    RecipeController.getAllRecipe,
);
router.get(
    '/:id',
    RecipeController.getSingleRecipe,
);
router.patch(
    '/:id',
    RecipeController.updateRecipe,
);
router.delete(
    '/:id',
    RecipeController.deleteRecipe,
);




export const RecipeRouter = router;
