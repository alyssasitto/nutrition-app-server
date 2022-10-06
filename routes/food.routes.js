const router = require("express").Router();
const axios = require("axios");
const Day = require("../models/Day.model");
const User = require("../models/User.model");

// Get route for list of food that matched search
router.get("/food/:searchedFood", (req, res) => {
	const food = req.params.searchedFood;

	console.log(req.params.searchedFood);

	axios
		.get(
			`https://api.edamam.com/api/food-database/v2/parser?app_id=${process.env.app_id}&app_key=${process.env.app_key}&ingr=${food}`
		)
		.then((response) => {
			console.log(response.data.hints);
			res.status(200).json({ foodArray: response.data.hints });
		})
		.catch((err) => {
			console.log(err);
			res.status(400).json({ message: "Something went wrong" });
		});
});

// Get route for individual item user want to view
router.post("/food/details", (req, res) => {
	console.log(req.body.index);
	console.log(req.body.searchedFood);

	axios
		.get(
			`https://api.edamam.com/api/food-database/v2/parser?app_id=${process.env.app_id}&app_key=${process.env.app_key}&ingr=${req.body.searchedFood}`
		)
		.then((response) => {
			console.log(response.data.hints[req.body.index]);

			const foodItem = response.data.hints[req.body.index];

			res.status(200).json({ foodItem });
		})
		.catch((err) => res.status(400).json({ message: "Something went wrong" }));
});

// Post route for adding food to day

router.post("/add-food", (req, res) => {
	const { date } = req.body;
	const { foodType } = req.body;

	console.log(req.body);

	console.log("this is the date", date);
	console.log("this is the food type", foodType);

	res.status(200).json({ message: "request sent" });
});

module.exports = router;
