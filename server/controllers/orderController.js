import { Order } from '../models/Order.js';
import { Application } from '../models/Application.js';
import { createResponse } from '../utils/response.js';
import { v4 as uuidv4 } from 'uuid';

export const orderController = {
  async createOrder(req, res) {
    try {
      const { app_id, variant_name, variant_price, quantity, customer_info } = req.body;
      console.log('Create order request:', req.body);

      if (!app_id || !variant_name || !variant_price || !quantity || !customer_info) {
        return res.status(400).json(createResponse(false, 'Semua field harus diisi'));
      }

      // Validate app exists and available
      const app = await Application.findById(app_id);
      console.log('Found app:', app);
      
      if (!app) {
        return res.status(404).json(createResponse(false, 'Aplikasi tidak ditemukan'));
      }

      if (!app.available) {
        return res.status(400).json(createResponse(false, 'Aplikasi sedang tidak tersedia'));
      }

      // Calculate total price
      const total_price = parseFloat(variant_price) * parseInt(quantity);

      // Generate unique order ID
      const order_id = `ZP${Date.now()}${Math.random().toString(36).substr(2, 4).toUpperCase()}`;

      const newOrder = await Order.create({
        order_id,
        app_id,
        variant_name,
        variant_price: parseFloat(variant_price),
        quantity: parseInt(quantity),
        total_price,
        customer_info
      });

      console.log('Order created:', newOrder);

      // Get order with app details
      const orderWithApp = await Order.findByOrderId(order_id);
      console.log('Order with app details:', orderWithApp);

      res.status(201).json(createResponse(true, 'Order berhasil dibuat', { order: orderWithApp }));
    } catch (error) {
      console.error('Create order error:', error);
      res.status(500).json(createResponse(false, 'Server error'));
    }
  },

  async getAllOrders(req, res) {
    try {
      const orders = await Order.findAll();
      res.json(createResponse(true, 'Orders berhasil diambil', { orders }));
    } catch (error) {
      console.error('Get all orders error:', error);
      res.status(500).json(createResponse(false, 'Server error'));
    }
  },

  async getOrderById(req, res) {
    try {
      const { id } = req.params;
      const order = await Order.findById(id);

      if (!order) {
        return res.status(404).json(createResponse(false, 'Order tidak ditemukan'));
      }

      res.json(createResponse(true, 'Order berhasil diambil', { order }));
    } catch (error) {
      console.error('Get order by id error:', error);
      res.status(500).json(createResponse(false, 'Server error'));
    }
  },

  async getOrderByOrderId(req, res) {
    try {
      const { order_id } = req.params;
      const order = await Order.findByOrderId(order_id);

      if (!order) {
        return res.status(404).json(createResponse(false, 'Order tidak ditemukan'));
      }

      res.json(createResponse(true, 'Order berhasil diambil', { order }));
    } catch (error) {
      console.error('Get order by order_id error:', error);
      res.status(500).json(createResponse(false, 'Server error'));
    }
  },

  async deleteOrder(req, res) {
    try {
      const { id } = req.params;

      const existingOrder = await Order.findById(id);
      if (!existingOrder) {
        return res.status(404).json(createResponse(false, 'Order tidak ditemukan'));
      }

      await Order.delete(id);
      res.json(createResponse(true, 'Order berhasil dihapus'));
    } catch (error) {
      console.error('Delete order error:', error);
      res.status(500).json(createResponse(false, 'Server error'));
    }
  },

  async getOrderStats(req, res) {
    try {
      const stats = await Order.getStats();
      res.json(createResponse(true, 'Statistik order berhasil diambil', { stats }));
    } catch (error) {
      console.error('Get order stats error:', error);
      res.status(500).json(createResponse(false, 'Server error'));
    }
  }
};
