const router = require("express").Router();

const { isAuthenticated } = require("../middleware/jwt.middleware");
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
router.post("/edit/dimensions", (req, res) => {
	const { id } = req.payload;
	const { feet, inches, age, weight, gender } = req.body;

	console.log(id, feet, inches, age, weight, gender);

	if (
		feet === "" ||
		inches === "" ||
		age === "" ||
		weight === "" ||
		gender === ""
	) {
		return res.status(400).json({ message: "Please fill out all fields" });
	}

	Dimensions.findOneAndUpdate(
		{ user: id },
		{ feet, inches, age, weight, gender }
	)
		.then((dimensions) => {
			res.status(200).json({ message: "Success" });
		})
		.catch((err) => {
			console.log(err);
			res.status(400).json({ message: "Could not update dimensions" });
		});
});

module.exports = router;
