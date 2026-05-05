import express from 'express';
import { createOrder, getAllOrders, getOrdersByUser } from '../controllers/order.controller.js';

const router = express.Router();

// POST /api/orders (create order)
router.post('/', createOrder);

// GET /api/orders (get all orders)
router.get('/', getAllOrders);

// GET /api/orders/:userId (get orders of a user)
router.get('/:userId', getOrdersByUser);

export default router;

