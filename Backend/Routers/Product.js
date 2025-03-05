const express = require("express");
const router = new express.Router();
const prisma = require("../prisma/client");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });
router.post("/product/create", upload.array("images", 5), async (req, res) => {
  const { name, CookiesType, ProductId, prices } = req.body;

  try {
    const validWeights = ["250g", "500g", "1kg"];
    let imageRecords = [];
    let priceRecords = [];

    const transaction = await prisma.$transaction(async (prisma) => {
      // Create Product
      const product = await prisma.product.create({
        data: {
          name,
          CookiesType,
          ProductId: parseInt(ProductId), // Convert to integer if necessary
        },
      });

      // Upload Images if provided
      if (req.files && req.files.length > 0) {
        imageRecords = await prisma.images.createMany({
          data: req.files.map((file) => ({
            image: file.path,
            ImageId: product.id,
            fileName: file.filename,
          })),
        });
      }

      // Add Prices
      if (Array.isArray(prices)) {
        for (const { Weight, Price } of prices) {
          if (!validWeights.includes(Weight)) {
            throw new Error(`Invalid Weight: ${Weight}`);
          }
          const price = await prisma.price.create({
            data: {
              productId: product.id,
              Weight,
              Price: parseFloat(Price), // Convert Price to Float if needed
            },
          });
          priceRecords.push(price);
        }
      }

      return { product, imageRecords, priceRecords };
    });

    res.status(200).json({
      message: "Product created successfully",
      product: transaction.product,
      imageRecords: transaction.imageRecords,
      priceRecords: transaction.priceRecords,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

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
//list of all product like 1 for cookies and 2 for chocolates
router.get("/products", async (req, res) => {
  try {
    const { productId } = req.query;
    const cookies = await prisma.product.findMany({
      where: { ProductId: Number(productId) },
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
// //list of all Chocolates
// router.get("/chocolates/products", async (req, res) => {
//   const { productId } = req.query;

//   try {
//     const cookies = await prisma.product.findMany({
//       where: { ProductId: Number(productId)},
//       include: {
//         cookiesP: true,
//         Image: true,
//       },
//     });
//     res.send(cookies);
//   } catch (error) {
//     res.send(error);
//   }
// });
//get all information for specific product
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
