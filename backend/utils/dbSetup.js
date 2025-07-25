const db = require("./db");

async function setupDB() {
  try {
    await db`CREATE SCHEMA IF NOT EXISTS FIMoney`;

    await db`CREATE TABLE IF NOT EXISTS FIMoney.users(
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        password TEXT NOT NULL
        )`;

    await db`CREATE TABLE IF NOT EXISTS FIMoney.products(
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        type VARCHAR(50),
        sku VARCHAR(20) NOT NULL UNIQUE,
        image_url TEXT,
        description TEXT,
        quantity INTEGER DEFAULT 0,
        price NUMERIC NOT NULL)`;

    console.log("Database Ready");
  } catch (err) {
    console.log("Error Setting Up Database:" + err.message);
  }
}

setupDB();
