const router = require("express").Router();

const { isAuthenticated } = require("../middleware/jwt.middleware");
const Dimensions = require("../models/Dimensions.model");

// Route for creating dimensions for user
router.post("/dimensions", (req, res) => {
	const { inches, feet, weight, gender, age, goal, activityLevel } = req.body;
	const { id } = req.payload;

	console.log(inches, feet, weight, gender, age, goal, activityLevel, id);

	if (
		inches === "" ||
		feet === "" ||
		weight === "" ||
		gender === "" ||
		age === "" ||
		goal === "" ||
		activityLevel === ""
	) {
		return res.status(400).json({ message: "Please enter all fields" });
	}

	Dimensions.create({
		inches,
		feet,
		weight,
		gender,
		age,
		goal,
		activityLevel,
		user: id,
	})
		.then((user) => {
			res.status(200).json({
				dimensions: { inches, weight, gender, age, goal, activityLevel },
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(400).json({ message: "something went wrong" });
		});
});

// Route for getting dimensions
router.get("/dimensions", (req, res) => {
	const { id } = req.payload;

	Dimensions.findOne({ user: id })
		.then((user) => {
			console.log(user);
			res.status(200).json({ dimensions: user });
		})
		.catch((err) => {
			console.log(err);
		});
});

// Route for editing dimensions
router.post("/edit/dimensions", (req, res) => {
	const { id } = req.payload;
	const { feet, inches, age, weight, gender, goal, activityLevel } = req.body;

	console.log(id, feet, inches, age, weight, gender);

	if (
		feet === "" ||
		inches === "" ||
		age === "" ||
		weight === "" ||
		gender === "" ||
		goal === "" ||
		activityLevel === ""
	) {
		return res.status(400).json({ message: "Please fill out all fields" });
	}

	Dimensions.findOneAndUpdate(
		{ user: id },
		{ feet, inches, age, weight, gender, goal, activityLevel }
	)
		.then(() => {
			res.status(200).json({ message: "Success" });
		})
		.catch((err) => {
			res.status(400).json({ message: "Could not update dimensions" });
		});
});

module.exports = router;
