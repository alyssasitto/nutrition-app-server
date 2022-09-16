const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const dimensionsSchema = new Schema({
	inches: { type: Number, required: true },
	feet: { type: Number, required: true },
	weight: { type: Number, required: true },
	gender: { type: String, required: true },
	age: { type: Number, required: true },
	user: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = model("Dimensions", dimensionsSchema);
