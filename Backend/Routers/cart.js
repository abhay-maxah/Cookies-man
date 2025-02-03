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

router.get('/getItem',async(req,res)=>{
  try{
    const {userId}=req.body;
    const cart=await prisma.cart.findMany({
      where:{userId},
      include:{
        user:true,
      product:true
      }})
      res.json(cart).status(200);
    }catch(error){
        res.json({error}).status(500);  
      }

})

module.exports = router