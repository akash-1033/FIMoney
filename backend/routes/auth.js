const express = require("express");
const router = express.Router();
const db = require("../utils/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await db`INSERT INTO FIMoney.users (username, password)
      VALUES (${username}, ${hashedPassword})`;
    res.status(201).json({ message: "User Created" });
  } catch (err) {
    res.status(409).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const result =
      await db`SELECT * FROM FIMoney.users WHERE username=${username}`;
    if (result.length === 0) {
      res.status(404).json({ message: "User Not Found" });
    }
    const isValid = await bcrypt.compare(password, result[0].password);
    if (isValid) {
      const access_token = jwt.sign(
        { username: result[0].username },
        process.env.JWT_SECRET
      );
      res.status(200).json({ access_token, username });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
