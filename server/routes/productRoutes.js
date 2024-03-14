import express from 'express';
const router = express.Router();
import {
  getProducts,
  getProductById,
  createProduct,
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';


router.route('/').get(getProducts)
router.route('/create').post(createProduct);
router
  .route('/:id')
  .get(getProductById)


export default router;
