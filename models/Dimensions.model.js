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
			"gain-0.5lb",
			"gain-1lb",
			"gain-2lb",
			"maintain",
			"lose-0.5lb",
			"lose-1lb",
			"lose-2lb",
		],
		required: true,
	},
	activityLevel: {
		type: String,
		enum: ["sedentary", "lightly-active", "active", "very-active"],
		required: true,
	},
	user: { type: Schema.Types.ObjectId, ref: "User", unique: true },
});

module.exports = model("Dimensions", dimensionsSchema);
