const express = require("express");
const app = express();
const User = require("./Routers/user");
const commonRouter = require("./Routers/commonRouters");
const ProductType = require("./Routers/productType");
const Product = require("./Routers/product");
app.use(express.json());
app.use(User);
app.use(ProductType);
app.use(Product);
app.use(commonRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/*", (req, res) => {
  res.send("404 File not Found");
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
