const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const daySchema = new Schema({
	date: String,
	breakfast: [Schema.Types.Mixed],
	lunch: [Schema.Types.Mixed],
	dinner: [Schema.Types.Mixed],
});

module.exports = model("Day", daySchema);
