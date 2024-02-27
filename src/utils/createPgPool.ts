import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const createPool = (): Pool => {
  const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.HOST,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: parseInt(process.env.PORT || "5432", 10),
  });

  return pool;
};

export default createPool;
