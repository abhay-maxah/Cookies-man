const express = require("express");
const router = new express.Router();
const prisma = require("../prisma/client");
const multer = require("multer");
const app = express();
const path = require("path"); 
const fs = require("fs");
const uploadDir = "./uploads";

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

//upload a single image
router.post("/image", upload.single("image"), async (req, res) => {
  try {
    const { ImageId } = req.body;
    const imagePath = req.file.path;
    const image = await prisma.images.create({
      data: {
        ImageId: parseInt(ImageId),
        image: imagePath,
        fileName: req.file.originalname,
      },
    });
    // res.json(image).status(200);
    res.json({ success: true, image, file: req.file }).status(200);
  } catch (error) {
    res.send(error);
  }
});
//upload a multiple image
router.post("/images/upload", upload.array("images", 5), async (req, res) => {
  try {
    const { id } = req.body;
    const ImageId = parseInt(id);
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }
    const imageRecords = await prisma.images.createMany({
      data: req.files.map((file) => ({
        image: file.path,
        ImageId,
        fileName: file.filename,
      })),
    });
    res.json({
      message: "Images uploaded successfully",
      files: req.files,
      imageRecords,
    });
  } catch (error) {
    res.json(error);
  }
});

// GET route to fetch all images
router.get("/images", async (req, res) => {
  try {
    const images = await prisma.images.findMany({ include: { Product: true } });
    const imagesWithUrls = images.map((img) => ({
      id: img.id,
      filename: img.fileName,
      ImageId: img.ImageId,
      url: `D:/Cookies-man/Backend/uploads/${img.fileName}`, // Image URL
    }));
    res.json(imagesWithUrls).status(200);
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Add Price for Specific cookies
router.post("/add/prices", async (req, res) => {
  try {
    const { productId, Weight, Price } = req.body;
    const validWeights = ["250g", "500g", "1kg"];
    if (!validWeights.includes(Weight)) {
      return res.status(400).json({ message: "Weight must be either 250, 500, or 1 (in kg)" });
    }
    const addPrice = await prisma.price.create({
      data: {
        productId,
        Weight,
        Price,
      },
    });
    res.json(addPrice).status(200);
  } catch (error) {
    res.json(error).status(500);
  }
});

router.post('/cart',async(req,res)=>{

})

module.exports = router;
