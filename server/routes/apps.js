import express from 'express';
import { appController } from '../controllers/appController.js';
import { authenticateToken, authorizeAdmin } from '../middleware/auth.js';
import { upload, uploadToBlob } from '../middleware/upload.js';
import { validateCreateApp, validateRequest } from '../middleware/validation.js';

const router = express.Router();

// Public routes
router.get('/', appController.getAllApps);
router.get('/id/:id', appController.getAppById);
router.get('/slug/:slug', appController.getAppBySlug);

// Protected admin routes
router.post('/', 
  authenticateToken, 
  authorizeAdmin, 
  upload.single('image'),
  uploadToBlob,
  validateCreateApp, 
  validateRequest, 
  appController.createApp
);

router.put('/:id', 
  authenticateToken, 
  authorizeAdmin, 
  upload.single('image'),
  uploadToBlob,
  appController.updateApp
);

router.delete('/:id', authenticateToken, authorizeAdmin, appController.deleteApp);
router.patch('/:id/availability', authenticateToken, authorizeAdmin, appController.toggleAvailability);

export default router;
