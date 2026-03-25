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


export const getSingleProducts = async (req, res) => {
  try {
    const { id } = req.params;
		const response = await pool.query(
			`SELECT title, price, images.url
			FROM products p 
			JOIN images ON p.id = images.product_id
			WHERE p.id = $1`,
			[id]
		);
    res.json(response.rows[0]);
  } catch (error) {
    console.error("Error fetching products", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createProduct = async (req, res) => {
	try {	
		const { title, price, description, imageUrl } = req.body;
		const response = await pool.query(
			`INSERT INTO products (title, price, description) VALUES ($1, $2, $3) RETURNING id`,
			[title, price, description]
		);	
		const productId = response.rows[0].id;
		await pool.query(
			`INSERT INTO images (product_id, url) VALUES ($1, $2)`,	
			[productId, imageUrl]
		);
		res.status(201).json({ message: "Product created successfully", productId });
	} catch (error) {
		console.error("Error creating product", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
}

export const deleteProduct = async (req, res) => {
	try {
		const { id } = req.params;
		await pool.query(`DELETE FROM images WHERE product_id = $1`, [id]);
		await pool.query(`DELETE FROM products WHERE id = $1`, [id]);
		res.json({ message: "Product deleted successfully" });
	} catch (error) {
		console.error("Error deleting product", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
}