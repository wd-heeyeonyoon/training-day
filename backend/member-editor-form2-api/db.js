// db.js
import pkg from "pg";

const { Pool } = pkg;

const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "peakon",
  password: "peakon",
  database: "peakon_api",
});

export default pool;
