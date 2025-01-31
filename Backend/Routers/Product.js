const express = require("express");
const router = new express.Router();
const prisma = require("../prisma/client");

//create a Product
router.post("/product", async (req, res) => {
  try {
    const { name, CookiesType, ProductId } = req.body;
    const product = await prisma.product.create({
      data: {
        name,
        CookiesType,
        ProductId,
      },
    });
    res.json(product).status(200);
  } catch (error) {
    res.send(error).status(500);
  }
});
//list of all Cookies
router.get("/coockies/products", async (req, res) => {
  try {
    const cookies = await prisma.product.findMany({
      where: { ProductId: 1 },
      include: {
        cookiesP: true,
        Image: true,
      },
    });
    res.send(cookies);
  } catch (error) {
    res.send(error);
  }
});
//list of all Chocolates
router.get("/chocolates/products", async (req, res) => {
  try {
    const cookies = await prisma.product.findMany({
      where: { ProductId: 2 },
      include: {
        cookiesP: true,
        Image: true,
      },
    });
    res.send(cookies);
  } catch (error) {
    res.send(error);
  }
});
//get all all information for specific product
router.get("/product/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const product = await prisma.product.findFirst({
      where: { id },
      include: { cookiesP: true, Image: true },
    });
    res.send(product);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
