const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const macrosSchema = new Schema({
	calories: Number,
	protein: Number,
	carbohydrates: Number,
	fat: Number,
	user: { type: Schema.Types.ObjectId, ref: "User", unique: true },
});

module.exports = model("Macros", macrosSchema);
