const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const GrocerySchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "users" },
  name: { type: String, required: true },
  quantity: { type: String },
  stock: { type: String },
  date: { type: Date, default: Date.now },
});

module.exports = Grocery = mongoose.model("grocery", GrocerySchema);
