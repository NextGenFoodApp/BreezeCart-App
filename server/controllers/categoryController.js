const Category = require("../models/categoryModel");

exports.getAllCategories = async () => {
  try {
    const categories = await Category.find();
    return categories;
  } catch (err) {
    console.log(err);
  }
};

exports.getSpecificCategory = async (id) => {
  try {
    const category = await Category.findOne({ category_id: id });
    console.log(category);
    return category;
  } catch (err) {
    console.log(err);
  }
};

exports.addNewCategory = async (category) => {
  try {
    const newCategory = new Category(category);
    const addedCategory = await newCategory.save();
    console.log(addedCategory);
  } catch (err) {
    console.log(err);
  }
};

exports.deleteCategoryById = async (id) => {
  try {
    const deletedCategory = await Category.findOneAndDelete({
      category_id: id,
    });
    return deletedCategory;
  } catch (err) {
    console.log(err);
  }
};

exports.updateCategoryById = async (id, updateData) => {
  try {
    const updatedCategory = await Category.findOneAndUpdate(
      { category_id: id },
      updateData,
      { new: true } // Return the updated document
    );
    return updatedCategory;
  } catch (err) {
    console.log(err);
  }
};
