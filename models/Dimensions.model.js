const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const dimensionsSchema = new Schema({
	inches: { type: Number, required: true },
	feet: { type: Number, required: true },
	weight: { type: Number, required: true },
	gender: { type: String, required: true },
	age: { type: Number, required: true },
	goal: {
		type: String,
		enum: [
			"gain0.5lb",
			"gain1lb",
			"gain2lb",
			"maintain",
			"lose0.5lb",
			"lose1lb",
			"lose2lb",
		],
	},
	activityLevel: {
		type: String,
		enum: ["not-active", "lightly-active", "active", "very-active"],
	},
	user: { type: Schema.Types.ObjectId, ref: "User", unique: true },
});

module.exports = model("Dimensions", dimensionsSchema);
