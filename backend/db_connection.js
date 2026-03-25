import {Pool} from "pg";
const pool = new Pool({
		user: 'postgres',
		host: 'localhost',
		database: 'postgres',
		password: '1234',
		port: 5400,
});

pool.connect()
	.then(() => console.log("Connected to the database"))
	.catch((err) => console.error("Database connection error", err));

export default pool;