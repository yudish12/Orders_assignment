import express from 'express';
import { createProduct, deleteProduct, getAllProducts, getProducts, searchProducts, updateProduct } from '../controllers/ProductControllers.js';
const router = express.Router();

router.get('/allproducts',getAllProducts)
router.get('/search',searchProducts)

router.route('/')
.get(getProducts)
.post(createProduct)

router.route('/:id')
.get()
.delete(deleteProduct)
.patch(updateProduct)

export default router