import express, { NextFunction, Request, Response } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BannerController } from './banner.controller';
import { upload } from '../../utils/sendImageToCloudinary';


const router = express.Router();

router.post(
  '/create-banner',
  upload.single('file'),
  BannerController.createBanner
);
router.get(
    '/create-banner',
    BannerController.getAllBanner,
);
router.get(
    '/create-banner/:id',
    BannerController.getSingleBanner,
);
router.patch(
    '/create-banner/:id',
    BannerController.updateBanner,
);
router.delete(
    '/create-banner/:id',
    BannerController.deleteBanner,
);




export const BannerRouter = router;
