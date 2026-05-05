import express from 'express';
import User from '../models/user.model.js';
import bcrypt from 'bcrypt';

const router = express.Router();

// LOGIN
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    res.json({
      user: {
        id: user._id,
        email: user.email,
        role: user.role
      },
      token: 'sample-token'
    });
  } catch (err) {
    next(err);
  }
});

// SIGNUP
router.post('/signup', async (req, res, next) => {
  try {
    const { full_name, username, email, password } = req.body;

    const exists = await User.findOne({ username });
    if (exists) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const user = await User.create({ full_name, username, email, password, role: 'customer', phone: req.body.phone, address: req.body.address });

    res.status(201).json({
      user: {
        id: user._id,
        full_name,
        username,
        email,
        role: user.role,
        phone: user.phone,
        address: user.address
      },
      token: 'sample-token'
    });
  } catch (err) {
    next(err);
  }
});

// retrieve all method
router.get('/', async (req, res, next) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// insert data method
router.post('/', async (req, res, next) => {
  try {
    const { full_name, username, email, password, role, address, phone } = req.body;

    const exists = await User.findOne({ username });
    if (exists) return res.status(400).json({ message: 'Username already exists' });

    const user = await User.create({ full_name, username, email, password, role, address, phone });

    res.status(201).json({
      id: user._id,
      full_name,
      username,
      email,
      role,
      address,
      phone
    });
  } catch (err) {
    next(err);
  }
});

// retrieve specific method
router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

// update all method
router.put('/:id', async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (err) {
    next(err);
  }
});


// update specific method
router.patch('/:id', async (req, res, next) => {
  try {
    // Only hash password if it's being updated
    const updateData = {
      full_name: req.body.full_name,
      username: req.body.username,
      email: req.body.email,
      address: req.body.address,
      phone: req.body.phone,
      // role: req.body.role
    };
    
    // If password is provided, hash it before updating
    if (req.body.password) {
      updateData.password = await bcrypt.hash(req.body.password, 10);
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).select('-password');

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (err) {
    next(err);
  }
});


// delete specific method
router.delete('/:id', async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ message: 'User deleted' });
  } catch (err) {
    next(err);
  }
});

//Admin router - Fetch all customers
// Removed undefined authenticateAdmin middleware for now
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({ role: 'customer' }).select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});


export default router;