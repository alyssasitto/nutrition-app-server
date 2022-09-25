const router = require("express").Router();

const Dimensions = require("../models/Dimensions.model");

// Route for creating dimensions for user
router.post("/dimensions", (req, res) => {
	const { inches, feet, weight, gender, age } = req.body;
	const { id } = req.payload;

	console.log(inches, feet, weight, gender, age, id);

	if (
		inches === "" ||
		feet === "" ||
		weight === "" ||
		gender === "" ||
		age === ""
	) {
		return res.status(400).json({ message: "Please enter all fields" });
	}

	Dimensions.create({
		inches,
		feet,
		gender,
		weight,
		age,
		user: id,
	})
		.then((user) => {
			console.log(user);
		})
		.catch((err) => {
			console.log(err);
		});
});

// Route for getting dimensions
router.get("/dimensions", (req, res) => {
	const { id } = req.payload;

	Dimensions.findOne({ user: id })
		.then((user) => {
			res.status(200).json({ dimensions: user });
		})
		.catch((err) => {
			console.log(err);
		});
});

// Route for editing dimensions
router.get("/edit", (req, res) => {
	const { id } = req.payload;

	Dimensions.findOne({ user: id })
		.then((user) => {
			res.status(200).json({ dimensions: user });
		})
		.catch((err) => {
			console.log(err);
		});
});

module.exports = router;
