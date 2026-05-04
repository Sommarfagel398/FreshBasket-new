import express from 'express';
import Product from '../models/product.model.js';

const router = express.Router();

// GET all products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.find();
    res.json({ success: true, data: products });
  } catch (err) {
    next(err);
  }
});

// GET one product by id
router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    res.json({ success: true, data: product });
  } catch (err) {
    next(err);
  }
});

// POST a new product
router.post('/', async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json({ success: true, data: newProduct });
  } catch (err) {
    next(err);
  }
});

// PUT (replace) a product by id
router.put('/:id', async (req, res, next) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedProduct) return res.status(404).json({ success: false, message: 'Product not found' });
    res.json({ success: true, data: updatedProduct });
  } catch (err) {
    next(err);
  }
});

// PATCH (update partially) a product by id
router.patch('/:id', async (req, res, next) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) return res.status(404).json({ success: false, message: 'Product not found' });
    res.json({ success: true, data: updatedProduct });
  } catch (err) {
    next(err);
  }
});

// DELETE a product by id
router.delete('/:id', async (req, res, next) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ success: false, message: 'Product not found' });
    res.json({ success: true, message: 'Product deleted' });
  } catch (err) {
    next(err);
  }
});

export default router;