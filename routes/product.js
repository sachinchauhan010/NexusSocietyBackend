import {Router} from 'express';
import { createProduct, DeleteProduct, getAllProducts, updateProduct } from '../controllers/product.controller.js';
import { upload } from "../utils/multer.js"

const productRoutes= Router();

productRoutes.post('/add-product', upload.single('image'), createProduct)
productRoutes.get('/get-products',getAllProducts)
productRoutes.put('/update-product/:id', updateProduct);
productRoutes.delete('/delete-product/:id', DeleteProduct);


export default productRoutes;