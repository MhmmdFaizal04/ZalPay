import express from 'express';
import { orderController } from '../controllers/orderController.js';
import { authenticateToken, authorizeAdmin } from '../middleware/auth.js';
import { validateCreateOrder, validateRequest } from '../middleware/validation.js';

const router = express.Router();

// Public routes
router.post('/', validateCreateOrder, validateRequest, orderController.createOrder);
router.get('/order-id/:order_id', orderController.getOrderByOrderId);

// Protected admin routes
router.get('/', authenticateToken, authorizeAdmin, orderController.getAllOrders);
router.get('/stats', authenticateToken, authorizeAdmin, orderController.getOrderStats);
router.get('/:id', authenticateToken, authorizeAdmin, orderController.getOrderById);
router.put('/:id/status', authenticateToken, authorizeAdmin, orderController.updateOrderStatus);
router.delete('/:id', authenticateToken, authorizeAdmin, orderController.deleteOrder);

export default router;
