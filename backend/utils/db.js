const dotenv = require("dotenv");
dotenv.config();

const { neon } = require("@neondatabase/serverless");
const db = neon(process.env.DATABASE_URL);

module.exports = db;
