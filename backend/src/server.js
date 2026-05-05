import express from 'express';
import cors from 'cors';
// import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import connectDB from './config/database.js';

// Load environment variables
dotenv.config();

// Import routes
import healthRoutes from './routes/health.routes.js';
import productRoutes from './routes/product.routes.js';
import userRoutes from './routes/user.routes.js';
import orderRoutes from './routes/order.routes.js';

// Initialize express app
const app = express();

// Middleware
const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:5173').split(',');

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API prefix
const apiPrefix = process.env.API_PREFIX || '/api/v1';

// Routes
app.use(`${apiPrefix}/health`, healthRoutes);
app.use(`${apiPrefix}/products`, productRoutes);
app.use(`${apiPrefix}/users`, userRoutes);
// Requirement endpoints:
// POST /api/orders, GET /api/orders, GET /api/orders/:userId
app.use('/api/v1/orders', orderRoutes);
// app.use('/api/users', userRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Start server
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}${process.env.API_PREFIX || '/api/v1'}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  });
});

export default app;





// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';
// // import helmet from 'helmet';
// import morgan from 'morgan';
// import dotenv from 'dotenv';

// // Load environment variables
// dotenv.config();

// // Import routes
// import healthRoutes from './routes/health.routes.js';
// import productRoutes from './routes/product.routes.js';

// const apiPrefix = process.env.API_PREFIX || '/api/v1';

// // existing health route
// app.use(`${apiPrefix}/health`, healthRoutes);

// // new product route
// app.use(`${apiPrefix}/products`, productRoutes);

// // Initialize express app
// const app = express();

// // Middleware
// const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:5173').split(',');

// app.use(cors({
//   origin: (origin, callback) => {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true
// }));
// // app.use(helmet());
// // app.use(cors({
// //   origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
// //   credentials: true
// // }));
// app.use(morgan('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Database Connection
// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/db_kiosk');
//     console.log(`MongoDB Connected: ${conn.connection.host}`);
//   } catch (error) {
//     console.error(`Error connecting to MongoDB: ${error.message}`);
//     process.exit(1);
//   }
// };

// // Routes
// const apiPrefix = process.env.API_PREFIX || '/api/v1';
// app.use(`${apiPrefix}/health`, healthRoutes);

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(err.status || 500).json({
//     success: false,
//     message: err.message || 'Internal server error',
//     ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
//   });
// });

// // 404 handler
// app.use((req, res) => {
//   res.status(404).json({
//     success: false,
//     message: 'Route not found'
//   });
// });

// // Connect to database and start server
// const PORT = process.env.PORT || 5000;

// connectDB().then(() => {
//   app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
//     console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
//   });
// });

// export default app;
