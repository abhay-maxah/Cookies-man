const express = require("express");
const router = new express.Router();
const prisma = require("../prisma/client");

//add product
router.post("/add/product", async (req, res) => {
  try {
    const { ProductType } = req.body;
    const validCatagory = ["CHOCOLATE", "COOKIE", "DESSERTS"];
    if (!validCatagory.includes(ProductType)) {
      return res.status(400).json({ error: "Invalid product type" });
    }
    const product = await prisma.ProductTypes.create({
      data: {
        ProductType,
      },
    });
    res.json({ message: "Product added successfully", product });
  } catch (error) {
    res.json(error);
  }
});
//get product
router.get("/get/product", async (req, res) => {
  try {
    const product = await prisma.ProductTypes.findMany({
      // include: { cookies: true },
    });
    res.json(product);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
