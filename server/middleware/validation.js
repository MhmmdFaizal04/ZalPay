import { body, validationResult } from 'express-validator';
import { createResponse } from '../utils/response.js';

export const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(createResponse(false, 'Validation error', { errors: errors.array() }));
  }
  next();
};

export const validateLogin = [
  body('username').notEmpty().withMessage('Username harus diisi'),
  body('password').isLength({ min: 6 }).withMessage('Password minimal 6 karakter'),
];

export const validateRegister = [
  body('username').isLength({ min: 3 }).withMessage('Username minimal 3 karakter'),
  body('email').isEmail().withMessage('Email tidak valid'),
  body('password').isLength({ min: 6 }).withMessage('Password minimal 6 karakter'),
];

export const validateCreateApp = [
  body('name').notEmpty().withMessage('Nama aplikasi harus diisi'),
  body('slug').notEmpty().withMessage('Slug harus diisi'),
  body('price').isNumeric().withMessage('Harga harus berupa angka'),
];

export const validateCreateOrder = [
  body('app_id').isNumeric().withMessage('App ID harus berupa angka'),
  body('variant').notEmpty().withMessage('Variant harus diisi'),
  body('quantity').isInt({ min: 1 }).withMessage('Quantity minimal 1'),
  body('customer_info.name').notEmpty().withMessage('Nama customer harus diisi'),
  body('customer_info.email').isEmail().withMessage('Email customer tidak valid'),
  body('customer_info.phone').notEmpty().withMessage('Nomor telepon harus diisi'),
];
