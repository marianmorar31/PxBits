import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';


const getProducts = asyncHandler(async (req, res) => {
  const pageSize = process.env.PAGINATION_LIMIT;
  const page = Number(req.query.pageNumber) || 1;


  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};


  const filter = req.query.filter
    ? {
       
        category: req.query.filter,
      }
    : {};


  const sort = req.query.sortOrder === 'desc' ? -1 : 1;
  const sortBy = req.query.sortBy || 'category';

  const count = await Product.countDocuments({ ...keyword, ...filter });
  const products = await Product.find({ ...keyword, ...filter })
    .sort({ [sortBy]: sort }) 
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    return res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});


const createProduct = asyncHandler(async (req, res) => {
  const { name, price, image, brand, category, description, userId } = req.body;

  const product = new Product({
    name: name,
    price: price,
    user: userId,
    image: "/basic.PNG",
    brand: brand,
    category: category,
    description: description,
  });

  try {
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err) => err.message);
      res.status(400).json({ message: 'Validation Error', errors });
    } else {
      console.error('Error creating product:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
});


export {
  getProducts,
  getProductById,
  createProduct,
};
