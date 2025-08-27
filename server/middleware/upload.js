import multer from 'multer';
import { put } from '@vercel/blob';
import { createResponse } from '../utils/response.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure multer for memory storage
const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    // Check file type
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  },
});

export const uploadToBlob = async (req, res, next) => {
  try {
    if (!req.file) {
      return next();
    }

    const filename = `apps/${Date.now()}-${req.file.originalname}`;
    const blob = await put(filename, req.file.buffer, {
      access: 'public'
    });

    req.uploadedImageUrl = blob.url;
    next();
  } catch (error) {
    console.error('Upload to blob error:', error);
    res.status(500).json(createResponse(false, 'Error uploading image'));
  }
};

// QRIS-specific upload middleware
export const uploadQRISToBlob = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json(createResponse(false, 'File QRIS diperlukan'));
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(req.file.mimetype)) {
      return res.status(400).json(createResponse(false, 'Format file tidak didukung. Gunakan JPG, PNG, atau GIF'));
    }

    // Validate file size (5MB max)
    if (req.file.size > 5 * 1024 * 1024) {
      return res.status(400).json(createResponse(false, 'Ukuran file maksimal 5MB'));
    }

    const fileExtension = path.extname(req.file.originalname);
    const filename = `qris/qris-${Date.now()}${fileExtension}`;
    
    const blob = await put(filename, req.file.buffer, {
      access: 'public'
    });

    console.log('QRIS uploaded successfully to Vercel Blob:', blob.url);

    // Save URL to local file for persistence
    const QRIS_FILE_PATH = path.join(__dirname, '../data/current-qris.txt');
    const dataDir = path.dirname(QRIS_FILE_PATH);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(QRIS_FILE_PATH, blob.url);

    req.uploadedQRISUrl = blob.url;
    next();
  } catch (error) {
    console.error('Upload QRIS to blob error:', error);
    res.status(500).json(createResponse(false, 'Error uploading QRIS'));
  }
};
