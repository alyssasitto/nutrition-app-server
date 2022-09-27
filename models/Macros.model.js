const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const macrosSchema = new Schema({
	calories: Number,
	protein: Number,
	carbohydrates: Number,
	fat: Number,
});

module.exports = model("Macros", macrosSchema);
