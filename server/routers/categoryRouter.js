const express = require("express");
const router = express.Router();

const CategoryController = require("../controllers/categoryController");

router.get("/", async (req, res) => {
  const categories = await CategoryController.getAllCategories();
  res.send(categories);
});

router.get("/:id", async (req, res) => {
  const category = await CategoryController.getSpecificCategory(req.params.id);
  res.send(category);
});
router.post("/", async (req, res) => {
  try {
    const { category_name, description } = req.body;

    if (!category_name || category_name.trim() === "") {
      return res.status(400).json({ error: "Category name is required." });
    }

    const categories = await CategoryController.getAllCategories();
    const new_category_id = categories.length + 1;

    const new_category = {
      category_id: new_category_id,
      category_name,
      description: description || "", // Optional field
    };

    await CategoryController.addNewCategory(new_category);

    return res.status(201).json({
      message: "Category added successfully",
      category: new_category,
    });
  } catch (error) {
    console.error("Error adding category:", error);
    return res.status(500).json({
      error: "An error occurred while adding the category.",
    });
  }
});

module.exports = router;
