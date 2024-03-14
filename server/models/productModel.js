import mongoose from 'mongoose';

const productSchema = mongoose.Schema(
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      name: {
        type: String,
        required: true,
      },
      image: {
        type: String,
      },
      brand: {
        type: String,
        required: true,
      },
      category: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        default: 0,
      },
      numReviews: {
        type: Number,
        default: 0,
      },
      price: {
        type: Number,
        required: true,
        default: 0,
      },
      countInStock: {
        type: Number,
        default: 0,
      },
    },
    {
      timestamps: true,
    }
  );
  
  const Product = mongoose.model('Product', productSchema);

  export default Product;