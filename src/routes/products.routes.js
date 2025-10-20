import { Router } from "express";
import pool from '../../config/conexion.js'
import {getAllProduct, getProductById, createProduct, updateProduct, deleteProduct} from "../controllers/products.controllers.js"

const router = Router();

router.get("/products", getAllProduct)
router.get("/products/:id", getProductById)
router.post("/products/", createProduct)
router.put("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);

export default router;