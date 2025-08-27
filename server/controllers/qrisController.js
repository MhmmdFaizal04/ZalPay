import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path untuk menyimpan info QRIS yang aktif
const QRIS_FILE_PATH = path.join(__dirname, '../data/current-qris.txt');
// Path ke folder public/images/qris
const QRIS_PUBLIC_PATH = path.join(__dirname, '../../public/images/qris');

// Helper functions
const getCurrentQRISFromFile = () => {
  try {
    if (fs.existsSync(QRIS_FILE_PATH)) {
      const qrisPath = fs.readFileSync(QRIS_FILE_PATH, 'utf8').trim();
      return qrisPath;
    }
    // Default ke QRIS di Vercel Blob
    return 'https://x8aws9mwiwrpecah.public.blob.vercel-storage.com/qris.jpg';
  } catch (error) {
    console.error('Error reading QRIS file:', error);
    return 'https://x8aws9mwiwrpecah.public.blob.vercel-storage.com/qris.jpg';
  }
};

const setCurrentQRISToFile = (qrisPath) => {
  try {
    // Ensure data directory exists
    const dataDir = path.dirname(QRIS_FILE_PATH);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(QRIS_FILE_PATH, qrisPath);
    console.log('QRIS path saved:', qrisPath);
  } catch (error) {
    console.error('Error saving QRIS file:', error);
  }
};

const uploadQRIS = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'File QRIS diperlukan'
      });
    }

    const file = req.file;
    
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.mimetype)) {
      return res.status(400).json({
        success: false,
        message: 'Format file tidak didukung. Gunakan JPG, PNG, atau GIF'
      });
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      return res.status(400).json({
        success: false,
        message: 'Ukuran file maksimal 5MB'
      });
    }

    // Ensure qris directory exists
    if (!fs.existsSync(QRIS_PUBLIC_PATH)) {
      fs.mkdirSync(QRIS_PUBLIC_PATH, { recursive: true });
    }

    // Generate filename
    const fileExtension = path.extname(file.originalname);
    const filename = `qris-${Date.now()}${fileExtension}`;
    const filePath = path.join(QRIS_PUBLIC_PATH, filename);
    const publicPath = `/images/qris/${filename}`;

    // Save file to public/images/qris
    fs.writeFileSync(filePath, file.buffer);
    
    console.log('QRIS uploaded successfully to:', publicPath);

    // Set as current QRIS
    setCurrentQRISToFile(publicPath);

    res.json({
      success: true,
      message: 'QRIS berhasil diupload',
      data: {
        qris_url: publicPath
      }
    });

  } catch (error) {
    console.error('Error uploading QRIS:', error);
    res.status(500).json({
      success: false,
      message: 'Gagal mengupload QRIS'
    });
  }
};

const getCurrentQRIS = async (req, res) => {
  try {
    const qrisUrl = getCurrentQRISFromFile();
    
    res.json({
      success: true,
      data: {
        qris_url: qrisUrl
      }
    });

  } catch (error) {
    console.error('Error getting current QRIS:', error);
    res.status(500).json({
      success: false,
      message: 'Gagal mengambil QRIS'
    });
  }
};

// Get list of available QRIS files
const getQRISList = async (req, res) => {
  try {
    if (!fs.existsSync(QRIS_PUBLIC_PATH)) {
      return res.json({
        success: true,
        data: { qris_files: [] }
      });
    }

    const files = fs.readdirSync(QRIS_PUBLIC_PATH)
      .filter(file => {
        const ext = path.extname(file).toLowerCase();
        return ['.jpg', '.jpeg', '.png', '.gif'].includes(ext);
      })
      .map(file => ({
        filename: file,
        url: `/images/qris/${file}`
      }));

    res.json({
      success: true,
      data: { qris_files: files }
    });

  } catch (error) {
    console.error('Error getting QRIS list:', error);
    res.status(500).json({
      success: false,
      message: 'Gagal mengambil daftar QRIS'
    });
  }
};

// Set current QRIS (for selecting from existing files)
const setCurrentQRIS = async (req, res) => {
  try {
    const { qris_url } = req.body;
    
    if (!qris_url) {
      return res.status(400).json({
        success: false,
        message: 'QRIS URL diperlukan'
      });
    }

    setCurrentQRISToFile(qris_url);

    res.json({
      success: true,
      message: 'QRIS berhasil diatur',
      data: {
        qris_url: qris_url
      }
    });

  } catch (error) {
    console.error('Error setting current QRIS:', error);
    res.status(500).json({
      success: false,
      message: 'Gagal mengatur QRIS'
    });
  }
};

export default {
  uploadQRIS,
  getCurrentQRIS,
  getQRISList,
  setCurrentQRIS
};
