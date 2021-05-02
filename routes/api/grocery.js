const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");

const Grocery = require("../../models/Grocery");
const User = require("../../models/User");
const checkObjectId = require("../../middleware/checkObjectId");

// @route    POST api/grocery
// @desc     Add a new Grocery Item
// @access   Private
router.post(
  "/",
  auth,
  [
    check("name", "Name is required").not().isEmpty(),
    check("quantity", "Quantity is  required").not().isEmpty(),
    check("stock", "Stock is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");

      const newItem = new Grocery({
        name: req.body.name,
        stock: req.body.stock,
        quantity: req.body.quantity,
        user: req.user.id,
      });

      const groceryItem = await newItem.save();

      res.json(groceryItem);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    GET api/grocery
// @desc     Get all groceries
// @access   Private
router.get("/:user_id", auth, async (req, res) => {
  try {
    const groceries = await Grocery.find({
      user: req.params.user_id,
    }).sort({ date: -1 });
    res.json(groceries);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    PUT api/posts/like/:id
// @desc     Like a post
// @access   Private
router.put("/:id", auth, async (req, res) => {
  try {
    const groceryItem = await Grocery.findById(req.params.id);
    if (!grocery) {
      return res.status(404).json({ msg: "Grocery not found" });
    }
    groceryItem.name = req.body.name;
    groceryItem.quantity = req.body.quantity;
    groceryItem.stock = req.body.stock;
    await groceryItem.save();
    return res.json(groceryItem);
  } catch (err) {
    console.log("ERRRRROOORRRRR" + err);
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const groceryItem = await Grocery.findById(req.params.id);
    console.log("HEHEHEHEHEHEH");
    console.log("grocery item", groceryItem);
    if (!groceryItem) {
      return res.status(404).json({ msg: "Grocery not found" });
    }

    await groceryItem.remove();
    return res.json(groceryItem);
  } catch (err) {
    console.log("ERRRRROOORRRRR" + err);
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
