import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { createResponse } from '../utils/response.js';

export const authController = {
  async login(req, res) {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json(createResponse(false, 'Username dan password harus diisi'));
      }

      // Try to find user by username first, then by email
      let user = await User.findByUsername(username);
      if (!user) {
        user = await User.findByEmail(username);
      }
      
      if (!user) {
        return res.status(401).json(createResponse(false, 'Username atau password salah'));
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json(createResponse(false, 'Username atau password salah'));
      }

      const token = jwt.sign(
        { userId: user.id, username: user.username, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      const userData = {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      };

      res.json(createResponse(true, 'Login berhasil', { user: userData, token }));
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json(createResponse(false, 'Server error'));
    }
  },

  async register(req, res) {
    try {
      const { username, email, password } = req.body;

      if (!username || !email || !password) {
        return res.status(400).json(createResponse(false, 'Semua field harus diisi'));
      }

      // Check if user exists
      const existingUser = await User.findByUsername(username);
      if (existingUser) {
        return res.status(400).json(createResponse(false, 'Username sudah digunakan'));
      }

      const existingEmail = await User.findByEmail(email);
      if (existingEmail) {
        return res.status(400).json(createResponse(false, 'Email sudah digunakan'));
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user
      const newUser = await User.create({
        username,
        email,
        password: hashedPassword
      });

      res.status(201).json(createResponse(true, 'Registrasi berhasil', { user: newUser }));
    } catch (error) {
      console.error('Register error:', error);
      res.status(500).json(createResponse(false, 'Server error'));
    }
  },

  async getProfile(req, res) {
    try {
      const user = await User.findById(req.user.userId);
      if (!user) {
        return res.status(404).json(createResponse(false, 'User tidak ditemukan'));
      }

      res.json(createResponse(true, 'Profile berhasil diambil', { user }));
    } catch (error) {
      console.error('Get profile error:', error);
      res.status(500).json(createResponse(false, 'Server error'));
    }
  },

  async changePassword(req, res) {
    try {
      const { currentPassword, newPassword } = req.body;

      if (!currentPassword || !newPassword) {
        return res.status(400).json(createResponse(false, 'Password lama dan baru harus diisi'));
      }

      if (!req.user?.userId) {
        return res.status(401).json(createResponse(false, 'User tidak terautentikasi'));
      }

      const user = await User.findById(req.user.userId);
      
      if (!user) {
        return res.status(404).json(createResponse(false, 'User tidak ditemukan'));
      }

      if (!user.password) {
        return res.status(500).json(createResponse(false, 'Data user tidak valid'));
      }

      const isValidPassword = await bcrypt.compare(currentPassword, user.password);
      
      if (!isValidPassword) {
        return res.status(400).json(createResponse(false, 'Password lama salah'));
      }

      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      await User.updatePassword(req.user.userId, hashedNewPassword);

      res.json(createResponse(true, 'Password berhasil diubah'));
    } catch (error) {
      console.error('Change password error:', error);
      res.status(500).json(createResponse(false, 'Server error'));
    }
  }
};
