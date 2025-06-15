const express = require("express");
const router = express.Router();

const BulkController = require("../controllers/bulkController");

// Get all bulks in the database.
router.get("/", async (req, res) => {
  const bulks = await BulkController.getAllBulks();
  res.send(bulks);
});

// Get one bulk
router.get("/:id", async (req, res) => {
  const bulk = await BulkController.getSpecificBulk(req.params.id);
  res.send(bulk);
});

// Add new bulk
router.post("/", async (req, res) => {
  const bulks = await BulkController.getAllBulks();
  const new_bulk_id = bulks.length + 1;
  const new_bulk = {
    bulk_id: new_bulk_id,
    items: [],
    frequency: req.body.frequency,
    delivery_starting_date: req.body.delivery_starting_date,
    status: "active",
  };
  await BulkController.addNewBulk(new_bulk);
});

// Add new bulk
router.post("/default", async (req, res) => {
  // 2. Create default bulk
  const bulks = await BulkController.getAllBulks();
  const new_bulk_id = bulks.length + 1;

  const today = new Date();
  const currentDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  const new_bulk = {
    bulk_id: new_bulk_id,
    bulk_name: "Default Bulk",
    items: [],
    createdAt: currentDate,
    user_id: req.body.user_id,
    status: "active",
  };

  await BulkController.addNewBulk(new_bulk);
  console.log("Bulk Created Successfully ------------------ ");
});

// Add an item to a bulk
router.post("/add-to-bulk", async (req, res) => {
  await BulkController.addToBulk(req.body.bulkId, req.body.addItem);
});

// Add cart items to a bulk
router.post("/add-cart-to-bulk", async (req, res) => {
  await BulkController.addCartToBulk(req.body.bulkId, req.body.addItemSet);
});

router.post("/delete-item-from-bulk", async (req, res) => {
  await BulkController.deleteItemFromBulk(
    req.body.bulkId,
    req.body.deleteItemIndex
  );
});

router.post("/update-bulk-item-quantity", async (req, res) => {
  await BulkController.updateBulkItemQuantity(
    req.body.bulkId,
    req.body.updateItemIndex,
    req.body.newQuantity
  );
});

// GET /bulks/active - Get all active bulks
router.get("/active", async (req, res) => {
  try {
    const bulks = await BulkController.getAllActiveBulks();
    res.status(200).json(bulks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch active bulks" });
  }
});

module.exports = router;
