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

				if (foodType === "breakfast") {
					dayObject.breakfast.push(req.body.food);
				}

				if (foodType === "lunch") {
					dayObject.lunch.push(req.body.food);
				}

				if (foodType === "dinner") {
					dayObject.dinner.push(req.body.food);
				}

				return User.findByIdAndUpdate(
					{ _id: id },
					{ $push: { logDays: dayObject } }
				)
					.then((result) => {
						res.status(200).json({ message: "Food added" });
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
						res.status(200).json({ message: "food has been added" });
					})
					.catch((err) => {
						console.log(err);
					});
			}
		})

		.catch((err) => {
			console.log(err);
		});
});

// route to add custom food
router.post("/add-custom-food", (req, res) => {
	const { id } = req.body;
	const { name } = req.body;
	const { calories } = req.body;
	const { fat } = req.body;
	const { protein } = req.body;
	const { carbs } = req.body;
	const { meal } = req.body;
	const { date } = req.body;

	if (
		name === "" ||
		calories === "" ||
		fat === "" ||
		protein === "" ||
		carbs === ""
	) {
		return res.status(400).json({ message: "Please fill out all fields" });
	}

	const foodObj = {
		name,
		calories,
		fat,
		protein,
		carbs,
	};

	User.findById({ _id: id })
		.then((result) => {
			console.log(result);

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

				if (meal === "breakfast") {
					dayObject.breakfast.push(foodObj);
				}

				if (meal === "lunch") {
					dayObject.lunch.push(foodObj);
				}

				if (meal === "dinner") {
					dayObject.dinner.push(foodObj);
				}

				User.findByIdAndUpdate({ _id: id }, { $push: { logDays: dayObject } })
					.then((result) => {
						const logDay = result.logDays.filter((el, index) => {
							return (el.date = date);
						});

						return res.status(200).json({ logDay: logDay });
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
					{ $push: { [`logDays.${dayIndex}.${meal}`]: foodObj } }
				)
					.then((result) => {
						return res.status(200).json({ logDay: result.logDays[dayIndex] });
					})
					.catch((err) => {
						console.log(err);
					});
			}
		})
		.catch((err) => {
			console.log(err);
		});
});

// route to delete food
router.post("/delete-food", (req, res) => {
	const { id } = req.body;
	const { food } = req.body;
	const { foodType } = req.body;
	const { date } = req.body;
	const { index } = req.body;

	console.log(id, food, foodType, date, index);

	let dayIndex = 0;

	User.findById({ _id: id })
		.then((user) => {
			user.logDays.filter((el, index) => {
				if (el.date === date) {
					dayIndex = index;
				}
			});

			return User.findByIdAndUpdate(
				{ _id: id },
				{ $unset: { [`logDays.${dayIndex}.${foodType}.${index}`]: "" } }
			);
		})
		.then((result) => {
			return User.findByIdAndUpdate(
				{ _id: id },
				{ $pull: { [`logDays.${dayIndex}.${foodType}`]: null } }
			);
		})
		.then((result) => {
			return User.findById({ _id: id });
		})
		.then((result) => {
			console.log("THIS IS THE RESULT", result.logDays);
			const logDay = result.logDays.filter((element) => {
				return element.date === date;
			});

			return res.status(200).json({ logDay: logDay[0] });

			console.log(logDay);
		})
		.catch((err) => {
			console.log(err);
		});
});

module.exports = router;
