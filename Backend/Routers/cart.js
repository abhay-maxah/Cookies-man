const prisma = require("../prisma/client");
const express = require("express");
const router = new express.Router();

router.post("/addItem", async (req, res) => {
  try {
    const { userId, productId, quantity, selectedWeight, selectedPrice } = req.body;

    if (!userId || !productId || !quantity) {
      return res.status(400).json({ error: "Please provide userId, productId, and quantity" });
    }

    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    } 

    let cart = await prisma.cart.findUnique({
      where: { userId },
      include: { products: true },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: {
          user: { connect: { id: userId } },
        },
        include: { products: true },
      });
    }

    const existingCartProduct = cart.products.find((cp) => cp.productId === productId);

    if (existingCartProduct) {
      await prisma.cartProduct.update({
        where: { id: existingCartProduct.id },
        data: {
          quantity: existingCartProduct.quantity + quantity,
          selectedWeight,
          selectedPrice,
        },
      });
      return res.json({ message: "Cart updated successfully" });
    } else {
      await prisma.cartProduct.create({
        data: {
          cart: { connect: { id: cart.id } },
          product: { connect: { id: productId } },
          quantity,
          selectedWeight,
          selectedPrice,
        },
      });
      return res.status(201).json({ message: "Item added to cart successfully" });
    }
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/getItem/:userId", async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        products: {
          include: {
            product: {
              include: {
                cookiesP: true,
                Image: true,
              },
            },
          },
        },
      },
    });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    res.json(cart);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/removeItem/:cartId", async (req, res) => {
  try {
    const { cartId } = req.params;

    if (!cartId) {
      return res.status(400).json({ error: "Cart ID is required." });
    }

    const existingCartItem = await prisma.cartProduct.findUnique({
      where: { id: parseInt(cartId) },
    });

    if (!existingCartItem) {
      return res.status(404).json({ error: "Cart item not found." });
    }

    await prisma.cartProduct.delete({
      where: { id: parseInt(cartId) },
    });

    res.json({ message: "Cart item deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
});

router.patch("/update/:cartId", async (req, res) => {
  try {
    const { cartId } = req.params;
    const { quantity, selectedWeight, selectedPrice } = req.body;

    if (!cartId || !quantity || quantity < 1) {
      return res.status(400).json({ error: "Cart ID and valid quantity are required." });
    }

    const existingCartItem = await prisma.cartProduct.findUnique({
      where: { id: parseInt(cartId) },
    });

    if (!existingCartItem) {
      return res.status(404).json({ error: "Cart item not found." });
    }

    const updatedCartItem = await prisma.cartProduct.update({
      where: { id: parseInt(cartId) },
      data: {
        quantity: parseInt(quantity),
        selectedWeight,
        selectedPrice,
      },
    });

    res.json({ message: "Cart item quantity updated.", cart: updatedCartItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
});

module.exports = router;
