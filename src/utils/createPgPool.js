const { Pool } = require("pg");
require("dotenv").config();

module.exports = () => {
  const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.HOST,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.PORT,
  });
  return pool
};
