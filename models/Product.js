import mongoose from 'mongoose';
// db structure
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    brand: { type: String, required: true },
    rating: { type: Number, required: true },
    numReviews: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
// if Product exist return Product else return a new mongoose.model
const Product =
  mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product;
