import mongoose from 'mongoose';
import Order from '../models/order.model.js';
import Product from '../models/product.model.js';
import User from '../models/user.model.js';

export async function createOrder(req, res, next) {
  try {
    const { userId, products } = req.body;

    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({ success: false, message: 'Invalid user id' });
    }

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ success: false, message: 'Products must be a non-empty array' });
    }

    for (const line of products) {
      if (
        !line ||
        !mongoose.isValidObjectId(line.productId) ||
        !Number.isInteger(line.quantity) ||
        line.quantity < 1
      ) {
        return res.status(400).json({
          success: false,
          message: 'Each product must include valid productId and quantity >= 1',
        });
      }
    }

    const ids = products.map(p => p.productId);
    const dbProducts = await Product.find({ _id: { $in: ids } }).select('_id price');

    if (dbProducts.length !== new Set(ids.map(String)).size) {
      return res.status(400).json({ success: false, message: 'One or more products not found' });
    }

    const priceById = new Map(dbProducts.map(p => [String(p._id), p.price]));
    const totalPrice = products.reduce(
      (sum, p) => sum + (priceById.get(String(p.productId)) || 0) * p.quantity,
      0
    );

    const order = await Order.create({
      user: userId, // ✅ match schema
      products,
      totalPrice,
      status: 'pending',
    });

    const populated = await Order.findById(order._id)
      .populate('user', '-password')
      .populate('products.productId');

    return res.status(201).json({ success: true, data: populated });
  } catch (err) {
    next(err);
  }
}

export async function getAllOrders(req, res, next) {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .populate('user', '-password')
      .populate('products.productId');

    res.json({ success: true, data: orders });
  } catch (err) {
    next(err);
  }
}

export async function getOrdersByUser(req, res, next) {
  try {
    const { userId } = req.params;

    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({ success: false, message: 'Invalid user id' });
    }

    const orders = await Order.find({ user: userId }) // ✅ consistent
      .sort({ createdAt: -1 })
      .populate('user', '-password')
      .populate('products.productId');

    res.json({ success: true, data: orders });
  } catch (err) {
    next(err);
  }
}