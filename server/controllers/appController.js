import { Application } from '../models/Application.js';
import { createResponse } from '../utils/response.js';

export const appController = {
  async getAllApps(req, res) {
    try {
      const apps = await Application.findAll();
      res.json(createResponse(true, 'Aplikasi berhasil diambil', { apps }));
    } catch (error) {
      console.error('Get all apps error:', error);
      res.status(500).json(createResponse(false, 'Server error'));
    }
  },

  async getAppById(req, res) {
    try {
      const { id } = req.params;
      const app = await Application.findById(id);
      
      if (!app) {
        return res.status(404).json(createResponse(false, 'Aplikasi tidak ditemukan'));
      }

      res.json(createResponse(true, 'Aplikasi berhasil diambil', { app }));
    } catch (error) {
      console.error('Get app by id error:', error);
      res.status(500).json(createResponse(false, 'Server error'));
    }
  },

  async getAppBySlug(req, res) {
    try {
      const { slug } = req.params;
      const app = await Application.findBySlug(slug);
      
      if (!app) {
        return res.status(404).json(createResponse(false, 'Aplikasi tidak ditemukan'));
      }

      res.json(createResponse(true, 'Aplikasi berhasil diambil', { app }));
    } catch (error) {
      console.error('Get app by slug error:', error);
      res.status(500).json(createResponse(false, 'Server error'));
    }
  },

  async createApp(req, res) {
    try {
      const { name, slug, price, variants, features, category, description, available } = req.body;
      console.log('Create app request body:', req.body);

      if (!name || !slug || !price) {
        return res.status(400).json(createResponse(false, 'Name, slug, dan price harus diisi'));
      }

      // Check if slug exists
      const existingApp = await Application.findBySlug(slug);
      if (existingApp) {
        return res.status(400).json(createResponse(false, 'Slug sudah digunakan'));
      }

      // Parse arrays if they're strings
      let parsedVariants = variants;
      let parsedFeatures = features;
      
      if (typeof variants === 'string') {
        parsedVariants = JSON.parse(variants);
      }
      if (typeof features === 'string') {
        parsedFeatures = JSON.parse(features);
      }

      const image_path = req.uploadedImageUrl || `/images/apps/${slug}.png`;

      const newApp = await Application.create({
        name,
        slug,
        price: parseFloat(price),
        variants: parsedVariants || [],
        features: parsedFeatures || [],
        category: category || 'Other',
        available: available !== undefined ? available : true,
        image_path,
        description: description || ''
      });

      res.status(201).json(createResponse(true, 'Aplikasi berhasil dibuat', { app: newApp }));
    } catch (error) {
      console.error('Create app error:', error);
      res.status(500).json(createResponse(false, 'Server error'));
    }
  },

  async updateApp(req, res) {
    try {
      const { id } = req.params;
      const { name, slug, price, variants, features, category, description, available } = req.body;
      console.log('Update app request:', { id, body: req.body });

      const existingApp = await Application.findById(id);
      if (!existingApp) {
        return res.status(404).json(createResponse(false, 'Aplikasi tidak ditemukan'));
      }

      // Check if slug exists (except current app)
      if (slug && slug !== existingApp.slug) {
        const slugExists = await Application.findBySlug(slug);
        if (slugExists) {
          return res.status(400).json(createResponse(false, 'Slug sudah digunakan'));
        }
      }

      // Parse arrays if they're strings
      let parsedVariants = variants;
      let parsedFeatures = features;
      
      if (typeof variants === 'string') {
        parsedVariants = JSON.parse(variants);
      }
      if (typeof features === 'string') {
        parsedFeatures = JSON.parse(features);
      }

      const image_path = req.uploadedImageUrl || existingApp.image_path;

      const updatedApp = await Application.update(id, {
        name: name || existingApp.name,
        slug: slug || existingApp.slug,
        price: price ? parseFloat(price) : existingApp.price,
        variants: parsedVariants !== undefined ? parsedVariants : existingApp.variants,
        features: parsedFeatures !== undefined ? parsedFeatures : existingApp.features,
        category: category || existingApp.category,
        available: available !== undefined ? available : existingApp.available,
        image_path,
        description: description !== undefined ? description : existingApp.description
      });

      res.json(createResponse(true, 'Aplikasi berhasil diupdate', { app: updatedApp }));
    } catch (error) {
      console.error('Update app error:', error);
      res.status(500).json(createResponse(false, 'Server error'));
    }
  },

  async deleteApp(req, res) {
    try {
      const { id } = req.params;

      const existingApp = await Application.findById(id);
      if (!existingApp) {
        return res.status(404).json(createResponse(false, 'Aplikasi tidak ditemukan'));
      }

      // Check if there are any orders for this app
      const hasOrders = await Application.checkHasOrders(id);
      if (hasOrders) {
        return res.status(400).json(createResponse(false, 'Tidak dapat menghapus aplikasi karena masih ada pesanan yang menggunakan aplikasi ini. Anda dapat menonaktifkan aplikasi ini sebagai gantinya.'));
      }

      await Application.delete(id);
      res.json(createResponse(true, 'Aplikasi berhasil dihapus'));
    } catch (error) {
      console.error('Delete app error:', error);
      if (error.code === '23503') {
        res.status(400).json(createResponse(false, 'Tidak dapat menghapus aplikasi karena masih ada pesanan yang menggunakan aplikasi ini. Anda dapat menonaktifkan aplikasi ini sebagai gantinya.'));
      } else {
        res.status(500).json(createResponse(false, 'Server error'));
      }
    }
  },

  async toggleAvailability(req, res) {
    try {
      const { id } = req.params;
      const { available } = req.body;

      const existingApp = await Application.findById(id);
      if (!existingApp) {
        return res.status(404).json(createResponse(false, 'Aplikasi tidak ditemukan'));
      }

      const updatedApp = await Application.updateAvailability(id, available);
      res.json(createResponse(true, 'Status ketersediaan berhasil diupdate', { app: updatedApp }));
    } catch (error) {
      console.error('Toggle availability error:', error);
      res.status(500).json(createResponse(false, 'Server error'));
    }
  }
};
