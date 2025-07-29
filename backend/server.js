const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 8080;

const productRouter = require("./routes/products");
const authRouter = require("./routes/auth");

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.get("/", (req, res) => {
  res.status(200).json({ message: "working" });
});

app.use("/", authRouter);
app.use("/products", productRouter);

app.listen(PORT, () => {
  console.log("Server Running on " + PORT);
});
