import express from 'express';
import { authController } from '../controllers/authController.js';
import { authenticateToken } from '../middleware/auth.js';
import { validateLogin, validateRegister, validateRequest } from '../middleware/validation.js';

const router = express.Router();

// Public routes
router.post('/login', validateLogin, validateRequest, authController.login);
router.post('/register', validateRegister, validateRequest, authController.register);

// Protected routes
router.get('/profile', authenticateToken, authController.getProfile);
router.put('/change-password', authenticateToken, authController.changePassword);

export default router;
