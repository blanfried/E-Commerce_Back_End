const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const allCategories = await Category.findAll({
      include: Product,
    });
    if (!allCategories) {
      res.status(404).json({ message: "No categories in database!" });
      return;
    }
    res.status(200).json(allCategories);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoriesId = await Category.findByPk(req.params.id, {
      include: Product,
    });
    if (!categoriesId) {
      res
        .status(404)
        .json({ message: "No categories in database with this id!" });
      return;
    }
    res.status(200).json(categoriesId);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  // create a new category
   /* req.body should look like this...
     {
	"category_name": "test 2"
    }
  */
  try {
    const newCategory = await Category.create({
      category_name: req.body.category_name,
    });
    if (!newCategory) {
      res.status(404).json({ message: "Cannot create category!" });
      return;
    }
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  try {
    const updateCategory = await Category.update(
      { category_name: req.body.category_name },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (!updateCategory) {
      res.status(404).json({ message: "No user with this id!" });
      return;
    }
    res
      .status(200)
      .json(updateCategory + " : 1 means success, 0 means failed.");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteProduct = await Product.destroy({
      where: { category_id: req.params.id },
    });
    const deleteCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deleteCategory) {
      res.status(404).json({ message: "No category with this id!" });
      return;
    }
    res
      .status(200)
      .json(deleteCategory + " : 1 means success, 0 means failed.");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;