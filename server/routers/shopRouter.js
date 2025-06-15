const express = require("express");
const router = express.Router();

const ShopController = require("../controllers/shopController");

router.get("/", async (req, res) => {
  const shops = await ShopController.getAllShops();
  res.send(shops);
});

router.get("/:id", async (req, res) => {
  const shop = await ShopController.getSpecificShop(req.params.id);
  res.send(shop);
});

router.post("/", async (req, res) => {
  try {
    const {
      shop_name,
      password,
      shop_owner,
      address,
      postal_code,
      phone_no,
      email,
      logo,
      bank_acc_number,
      bank_acc_holder,
      bank,
      bank_branch,
    } = req.body;

    // Basic validation (optional: enhance with a validation library)
    if (!shop_name || !password || !email || !shop_owner) {
      return res.status(400).json({
        error: "Required fields: shop_name, password, shop_owner, and email.",
      });
    }

    const shops = await ShopController.getAllShops();
    const new_shop_id = shops.length + 1;

    const new_shop = {
      shop_id: new_shop_id,
      shop_name,
      password,
      shop_owner,
      address,
      postal_code,
      phone_no,
      email,
      products: [],
      orders: [],
      logo,
      bank_acc_number,
      bank_acc_holder,
      bank,
      bank_branch,
    };

    await ShopController.addNewShop(new_shop);

    return res.status(201).json({
      message: "Shop added successfully.",
      shop: new_shop,
    });
  } catch (error) {
    console.error("Error adding new shop:", error);
    return res.status(500).json({
      error: "An error occurred while adding the shop.",
    });
  }
});

router.post("/login", async (req, res) => {
  const { shop_id, password } = req.body;
  const shop = await ShopController.loginShop(shop_id, password);
  res.send(shop);
});

router.post("/update", async (req, res) => {
  await ShopController.updateShop(
    req.body.shop_id,
    req.body.shop_name,
    req.body.shop_owner,
    req.body.address,
    req.body.postal_code,
    req.body.email,
    req.body.phone
  );
});

// Get shop count
router.get("/count", async (req, res) => {
  console.log("Fetching shop count...");
  try {
    const count = await ShopController.getShopCount();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch shop count" });
  }
});

router.delete("/:id", async (req, res) => {
  const shopId = req.params.id;
  try {
    const deleted = await ShopController.deleteShop(shopId);
    if (!deleted) {
      return res.status(404).json({ message: "Shop not found" });
    }
    res
      .status(200)
      .json({ message: "Shop deleted successfully", shop: deleted });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete shop", error: err.message });
  }
});
module.exports = router;
