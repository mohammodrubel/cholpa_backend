import express, { NextFunction, Request, Response } from 'express';
import { upload } from '../../utils/sendImageToCloudinary';
import { advertisementController } from './advertisement.controller';

const router = express.Router();

// Create advertisement (requires image)
router.post(
  '/',
  upload.single('file'),
  (req: Request, _res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  advertisementController.createAdvertisement
);

// Get all advertisements
router.get('/', advertisementController.getAllAdvertisements);

// Update advertisement (image optional)
router.patch(
  '/:id',
  upload.single('file'),
  (req: Request, _res: Response, next: NextFunction) => {
    if (req.body.data) {
      req.body = JSON.parse(req.body.data);
    }
    next();
  },
  advertisementController.updateAdvertisement
);

// Delete advertisement
router.delete('/:id', advertisementController.deleteAdvertisement);

export const advertisementRouter = router;