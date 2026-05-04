import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  unit: { type: String, required: true },
  stock: { type: Number, required: true },
  image: { type: String, required: false },
  badge: { type: String },
  rating: { type: Number },
  reviews: { type: Number },
  description: { type: String, required: true },
  tags: { type: [String] },
  featured: { type: Boolean, default: false }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

export default Product; 