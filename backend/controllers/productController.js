import pool from "../db_connection.js";

export const getAllProducts = async (req, res) => {
  try {
    const response = await pool.query(
      `SELECT title, price, images.url 
			FROM products p 
			JOIN images ON p.id = images.product_id`,
    );
    res.json(response.rows);
  } catch (error) {
    console.error("Error fetching products", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
