const router = require("express").Router();
const Category = require("../models/Category");

// Create

router.post("/", async (req, res) => {
  const newCat = new Category(req.body);
  try {
    const savedCat = await newCat.save();
    res.status(200).json(savedCat);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Update
router.get("/", async (req, res) => {
  try {
    const cats = await Category.find(req.body);

    res.status(200).json(cats);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//Delete

router.delete("/:id", async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);

    res.status(200).json("La categorie a été supprimer avec succès!");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
