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

// Post route for adding food to day

router.post("/add-food", (req, res) => {
	const { id } = req.body;
	const { date } = req.body;
	const { foodType } = req.body;

	console.log(req.body);

	User.findById(id)
		.then((result) => {
			const day = result.logDays.filter((el, index) => {
				return el.date === date;
			});

			if (day.length === 0) {
				const dayObject = {
					date: date,
					breakfast: [],
					lunch: [],
					dinner: [],
				};

				return User.findByIdAndUpdate(
					{ _id: id },
					{ $push: { logDays: dayObject } }
				)
					.then((result) => {
						console.log("RESUUUULT", result);

						console.log("hahahaha", result);

						// let newDayIndex;

						// result.logDays.filter((el, index) => {
						// 	if (el.date === date) {
						// 		newDayIndex = index;
						// 	}
						// });
						// console.log("THIS IS THE NEW DAY", newDayIndex);
					})
					.catch((err) => {
						console.log(err);
					});
			} else {
				let dayIndex;

				result.logDays.filter((el, index) => {
					if (el.date === date) {
						dayIndex = index;
					}
				});

				User.findByIdAndUpdate(
					{ _id: id },
					{ $push: { [`logDays.${dayIndex}.${foodType}`]: req.body.food } }
				)
					.then((result) => {
						console.log("OMG THI SIS THE RESUKT", result);
					})
					.catch((err) => {
						console.log(err);
					});

				console.log(result.logDays[dayIndex].breakfast);

				console.log(dayIndex);
			}
		})

		.catch((err) => {
			console.log(err);
		});

	console.log("this is the id", id);
	console.log("this is the date", date);
	console.log("this is the food type", foodType);

	res.status(200).json({ message: "request sent" });
});

module.exports = router;
