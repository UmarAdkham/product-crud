import express from "express";
import { createProduct } from "../controllers/productController.js";
import { getAllProducts } from "../controllers/productController.js";
import { getSingleProducts } from "../controllers/productController.js";
import { deleteProduct } from "../controllers/productController.js";

const router = express.Router();	
router.get("/", getAllProducts);
router.get("/:id", getSingleProducts);
router.post("/", createProduct);
router.delete("/:id", deleteProduct);

export default router;