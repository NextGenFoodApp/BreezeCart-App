const express = require("express");
const router = express();
const User = require("../models/userModel");
const UserController = require("../controllers/userController");
const BulkController = require("../controllers/bulkController");

router.get("/", async (req, res) => {
  const users = await UserController.getAllUsers();
  res.send(users);
});

router.get("/:id", async (req, res) => {
  const user = await UserController.getSpecificUser(req.params.id);
  res.send(user);
});

router.post("/register", async (req, res) => {
  const user = await UserController.registerUser(req.body);
  res.send(user);
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserController.loginUser(email, password);
  res.send(user);
});

router.post("/", async (req, res) => {
  try {
    console.log("Comes to the Register User method ------ ", req.body);

    // Fetch all users to calculate new user ID
    const users = await UserController.getAllUsers();
    const new_user_id = users.length + 1;

    //Create Default Bulk
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
      user_id: new_user_id,
      status: "active",
    };
    await BulkController.addNewBulk(new_bulk);

    console.log("Bulk Created Successfully ------------------ ");

    // Construct new user object
    const new_user = {
      user_id: new_user_id,
      name: req.body.name,
      password: req.body.password,
      address: req.body.address,
      phone: req.body.phone_no,
      email: req.body.email,
      is_admin: req.body.is_admin || false,
      current_bulk_id: [new_bulk_id],
      bulk_history: [],
      cart: [],
    };

    // Register user
    await UserController.registerUser(new_user);

    // Send success response
    return res.status(201).json({
      message: "User registered successfully --------------- ",
      user: new_user,
    });
  } catch (error) {
    console.error("Error registering user:", error);

    // Send error response
    return res.status(500).json({
      message: "Internal server error while registering user",
      error: error.message,
    });
  }
});

router.post("/update", async (req, res) => {
  await UserController.updateUser(
    req.body.id,
    req.body.name,
    req.body.address,
    req.body.email,
    req.body.phone
  );
});

router.post("/update-bulks", async (req, res) => {
  await UserController.updateBulks(
    req.body.userId,
    req.body.currentBulks,
    req.body.bulkHistory
  );
});

router.post("/activate-bulk", async (req, res) => {
  await UserController.activateBulk(req.body.bulkId);
});

router.post("/deactivate-bulk", async (req, res) => {
  await UserController.deactivateBulk(req.body.bulkId);
});

router.post("/add-to-cart", async (req, res) => {
  await UserController.addToCart(req.body.userId, req.body.addItem);
});

router.post("/delete-item-from-cart", async (req, res) => {
  await UserController.deleteItemFromCart(
    req.body.userId,
    req.body.deleteItemIndex
  );
});

router.post("/update-cart-item-quantity", async (req, res) => {
  await UserController.updateCartItemQuantity(
    req.body.userId,
    req.body.updateItemIndex,
    req.body.newQuantity
  );
});

router.post("/empty-the-cart", async (req, res) => {
  const response = await UserController.emptyTheCart(req.body.userId);
  res.send(response);
});

router.get("/count", async (req, res) => {
  try {
    const count = await UserController.getUsersCount();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch shop count" });
  }
});

module.exports = router;
