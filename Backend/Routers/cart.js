const prisma = require("../prisma/client");
const express = require("express");
const router = new express.Router();

router.post("/addItem", async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!productId && !quantity) {
      return res.json({ error: "enter a product id and quntity" }).status(400);
    }
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });
    if (!product) {
      return res.json({ error: "product not found" }).status(404);
    }
    const existingCartItem = await prisma.cart.findFirst({
      where: { userId, productId },
    });

    if (existingCartItem) {
      // Update quantity if item already exists in cart
      const updatedCartItem = await prisma.cart.update({
        where: { id: existingCartItem.id },
        data: { quantity: existingCartItem.quantity + quantity },
      });

      return res.json({ message: "Cart updated", cart: updatedCartItem });
    } else {
      const newCartItem = await prisma.cart.create({
        data: {
          userId,
          productId,
          quantity,
        },
      });
      return res
        .status(201)
        .json({ message: "Item added to cart", cart: newCartItem });
    }
  } catch (error) {
    res.json({ error }).status(500);
  }
});

router.get("/getItem", async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ error: "User ID is required." });
    }
    const cart = await prisma.cart.findMany({
      where: { userId },
      include: {
        product: true,
      },
    });

    if (cart.length === 0) {
      return res.status(404).json({ error: "Cart is empty." });
    }
    res.json(cart).status(200);
  } catch (error) {
    res.json({ error }).status(500);
  }
});

router.delete("/removeItem/:cartId", async (req, res) => {
  try {
    const { cartId } = req.params;

    // Validate cartId
    if (!cartId) {
      return res.status(400).json({ error: "Cart ID is required." });
    }

    // Check if cart item exists
    const existingCartItem = await prisma.cart.findUnique({
      where: { id: parseInt(cartId) },
    });

    if (!existingCartItem) {
      return res.status(404).json({ error: "Cart item not found." });
    }

    // Delete cart item
    await prisma.cart.delete({
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
    const { quantity } = req.body;

    if (!cartId || !quantity || quantity < 1) {
      return res
        .status(400)
        .json({ error: "Cart ID and valid quantity are required." });
    }

    // Check if cart item exists
    const existingCartItem = await prisma.cart.findUnique({
      where: { id: parseInt(cartId) },
    });

    if (!existingCartItem) {
      return res.status(404).json({ error: "Cart item not found." });
    }

    const updatedCartItem = await prisma.cart.update({
      where: { id: parseInt(cartId) },
      data: { quantity: parseInt(quantity) },
    });

    res.json({ message: "Cart item quantity updated.", cart: updatedCartItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
});
module.exports = router;
