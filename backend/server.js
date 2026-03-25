import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import productRouter from "./routes/productRoute.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());	

const PORT = process.env.PORT || 5000;

app.use("/products", productRouter)

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});