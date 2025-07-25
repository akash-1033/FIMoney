const express = require("express");
const router = express.Router();
const db = require("../utils/db");
const verifyToken = require("../middlewares/auth");

router.get("/", verifyToken, async (req, res) => {
  try {
    const page = req.query.page ? req.query.page : 1;
    const limit = 10;
    const offset = (page - 1) * limit;
    const results =
      await db`SELECT * FROM FIMoney.products LIMIT ${limit} OFFSET ${offset}`;
    if (results.length == 0) {
      res.status(404).json({ message: "No Products Found" });
    }
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

router.post("/", verifyToken, async (req, res) => {
  try {
    const { name, type, sku, image_url, description, quantity, price } =
      req.body;
    const result =
      await db`INSERT INTO FIMoney.products (name, type, sku, image_url, description, quantity, price)
      VALUES(${name}, ${type}, ${sku}, ${image_url}, ${description}, ${quantity}, ${price}) returning id`;
    res.status(201).json({ product_id: result[0].id });
  } catch (err) {
    res.status(409).json({ error: err.message });
  }
});

router.put("/:product_id/quantity", verifyToken, async (req, res) => {
  try {
    const { product_id } = req.params;
    const { quantity } = req.body;
    await db`UPDATE FIMoney.products
              SET quantity=${quantity}
              WHERE id=${product_id}`;
    res.status(200).json({ quantity: quantity });
  } catch (err) {
    res.status(409).json({ error: err.message });
  }
});

module.exports = router;
