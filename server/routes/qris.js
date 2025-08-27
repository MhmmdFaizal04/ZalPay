import express from 'express';
import qrisController from '../controllers/qrisController.js';
import { authenticateToken, authorizeAdmin } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

// Upload QRIS (Admin only) - Save to local public folder
router.post('/upload-qris', 
  authenticateToken, 
  authorizeAdmin,
  upload.single('qris'), 
  qrisController.uploadQRIS
);

// Set current QRIS from existing files (Admin only)
router.post('/set-qris', 
  authenticateToken, 
  authorizeAdmin,
  qrisController.setCurrentQRIS
);

// Get list of available QRIS files (Admin only)
router.get('/qris-list', 
  authenticateToken, 
  authorizeAdmin,
  qrisController.getQRISList
);

// Get current QRIS
router.get('/current-qris', qrisController.getCurrentQRIS);

export default router;
