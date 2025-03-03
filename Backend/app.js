const express = require("express");
const app = express();
const cors = require('cors')
const User = require("./Routers/user");
const commonRouter = require("./Routers/commonRouters");
const ProductType = require("./Routers/productType");
const Product = require("./Routers/Product");
const cart = require('./Routers/cart')
app.use('/uploads', express.static('uploads'));

app.use(express.json());
app.use(cors())
app.use(User);
app.use(ProductType);
app.use(Product);
app.use(commonRouter);
app.use(cart)
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/*", (req, res) => {
  res.send("404 File not Found");
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
