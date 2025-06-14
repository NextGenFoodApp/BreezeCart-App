const express = require("express");
const multer = require("multer");
const uploadImageToImgbb = require("../utils/uploadImage");
const router = express.Router();

const ProductController = require("../controllers/productController");

const upload = multer({ storage: multer.memoryStorage() });

// Get all products in the database.
router.get("/", async (req, res) => {
  const products = await ProductController.getAllProducts();
  res.send(products);
});

// Get one product
router.get("/:id", async (req, res) => {
  const product = await ProductController.getSpecificProduct(req.params.id);
  res.send(product);
});

// Get all products in one shop
router.get("/s/:shop_id", async (req, res) => {
  const products = await ProductController.getShopProducts(req.params.shop_id);
  res.send(products);
});

// Get all products in one category
router.get("/c/:category_id", async (req, res) => {
  const products = await ProductController.getCategoryProducts(
    req.params.category_id
  );
  res.send(products);
});

// Add new product
router.post("/", async (req, res) => {
  console.log("Comes to the product add method .");
  console.log("Received body:", req.body);
  const products = await ProductController.getAllProducts();
  const new_product_id = products.length + 1;
  const new_product = {
    product_id: new_product_id,
    product_name: req.body.product_name,
    category_id: req.body.category_id,
    shop_id: req.body.shop_id,
    price: req.body.price,
    attribute: req.body.attribute,
    items: req.body.items,
  };
  await ProductController.addNewProduct(new_product);
});

// Add item iamge to imgbb
router.post("/upload-item-image", upload.single("image"), async (req, res) => {
  console.log("Comes to the image upload method .");
  console.log("Received file:", req.file);
  try {
    const fileBuffer = req.file.buffer.toString("base64");
    const imageUrl = await uploadImageToImgbb(fileBuffer);
    res.status(200).json({ url: imageUrl });
  } catch (err) {
    res.status(500).json({ error: "Image upload failed" });
  }
});

module.exports = router;
