const router = require("express").Router();

const { response } = require("express");
const DimensionsModel = require("../models/Dimensions.model");
const Macros = require("../models/Macros.model");

router.post("/macros", (req, res) => {
	const { id } = req.payload;
	const { inches, feet, age, weight, gender, goal, activityLevel } = req.body;

	if (
		inches === "" ||
		feet === "" ||
		age === "" ||
		weight === "" ||
		gender === "" ||
		goal === "" ||
		activityLevel === ""
	) {
		return res.status(400).json({ message: "Error" });
	}

	const lbToKg = (weight) => {
		return weight / 2.205;
	};

	const feetToCm = (feet, inches) => {
		const feetCm = 30.48 * feet;
		const inchCm = 2.54 * inches;
		const cm = feetCm + inchCm;
		return cm;
	};

	const kgs = lbToKg(weight);
	const cm = feetToCm(feet, inches);

	let calories = 0;
	let BMR = Number;

	if (gender === "male") {
		BMR = 88.362 + 13.397 * kgs + 4.799 * cm - 5.677 * age;
	}

	if (gender === "female") {
		BMR = 447.593 + 9.247 * kgs + 3.098 * cm - 4.33 * age;
	}

	if (activityLevel === "sedentary") {
		calories = BMR * 1.2;
	} else if (activityLevel === "lightly active") {
		calories = BMR * 1.375;
	} else if (activityLevel === "active") {
		calories = BMR * 1.55;
	} else if (activityLevel === "very active") {
		calories = BMR * 1.725;
	}

	if (goal.includes("-")) {
		const goalPerWeek = goal.split(" ")[0];
		const lbsPerWeek = goal.split(" ")[1].split("l")[0];

		console.log(goalPerWeek);
		console.log(lbsPerWeek);

		if (goalPerWeek === "gain") {
			if (lbsPerWeek === "0.5") {
				calories = calories + 250;
			} else if (lbsPerWeek === "1") {
				calories = calories + 500;
			} else if (lbsPerWeek === "2") {
				calories = calories + 1000;
			}
		} else if (goalPerWeek === "lose") {
			if (lbsPerWeek === "0.5") {
				calories = calories - 250;
			} else if (lbsPerWeek === "1") {
				calories = calories - 500;
			} else if (lbsPerWeek === "2") {
				calories = calories - 1000;
			}
		}
	}

	calories = Number(calories.toFixed());

	// Equation for getting grams of protein
	let protein;

	if (weight < 180) {
		protein = weight * 0.825;
	} else if (weight > 180) {
		protein = weight * 0.65;
	}

	let proteinInCals = protein * 4;
	proteinInCals = Math.ceil(proteinInCals);
	console.log("PROTEIN CALS", proteinInCals);

	protein = Math.ceil(protein);
	console.log("PROTEIN", protein);

	// Equation for getting grams of fat
	let fatInCals = calories * 0.25;
	fatInCals = Math.ceil(fatInCals);

	let fat = fatInCals / 9;
	fat = Math.ceil(fat);

	console.log("FAT IN CALS", fatInCals);
	console.log("FAT", fat);

	// Equation for getting grams of carbs
	let carbsInCals = calories - fatInCals - proteinInCals;
	console.log("CARBS IN CALS", carbsInCals);

	let carbs = carbsInCals / 4;

	carbs = Math.ceil(carbs);
	console.log(calories);

	Macros.create({
		calories: calories,
		protein: proteinInCals,
		carbohydrates: carbsInCals,
		fat: fatInCals,
		user: id,
	})
		.then((macros) => {
			console.log(macros);
			res.status(200).json({ message: "macros created" });
		})
		.catch((err) => {
			res.status(400).json({ message: "Something went wrong" });
		});
});

router.post("/edit/macros", (req, res) => {
	const { id } = req.payload;
	const { inches, feet, age, weight, gender, goal, activityLevel } = req.body;

	if (
		inches === "" ||
		feet === "" ||
		age === "" ||
		weight === "" ||
		gender === "" ||
		goal === "" ||
		activityLevel === ""
	) {
		return res.status(400).json({ message: "Error" });
	}

	const lbToKg = (weight) => {
		return weight / 2.205;
	};

	const feetToCm = (feet, inches) => {
		const feetCm = 30.48 * feet;
		const inchCm = 2.54 * inches;
		const cm = feetCm + inchCm;
		return cm;
	};

	const kgs = lbToKg(weight);
	const cm = feetToCm(feet, inches);

	let calories = 0;
	let BMR = Number;

	if (gender === "male") {
		BMR = 88.362 + 13.397 * kgs + 4.799 * cm - 5.677 * age;
	}

	if (gender === "female") {
		BMR = 447.593 + 9.247 * kgs + 3.098 * cm - 4.33 * age;
	}

	if (activityLevel === "sedentary") {
		calories = BMR * 1.2;
	} else if (activityLevel === "lightly active") {
		calories = BMR * 1.375;
	} else if (activityLevel === "active") {
		calories = BMR * 1.55;
	} else if (activityLevel === "very active") {
		calories = BMR * 1.725;
	}

	if (goal.includes("-")) {
		const goalPerWeek = goal.split(" ")[0];
		const lbsPerWeek = goal.split(" ")[1].split("l")[0];

		console.log(goalPerWeek);
		console.log(lbsPerWeek);

		if (goalPerWeek === "gain") {
			if (lbsPerWeek === "0.5") {
				calories = calories + 250;
			} else if (lbsPerWeek === "1") {
				calories = calories + 500;
			} else if (lbsPerWeek === "2") {
				calories = calories + 1000;
			}
		} else if (goalPerWeek === "lose") {
			if (lbsPerWeek === "0.5") {
				calories = calories - 250;
			} else if (lbsPerWeek === "1") {
				calories = calories - 500;
			} else if (lbsPerWeek === "2") {
				calories = calories - 1000;
			}
		}
	}

	calories = Number(calories.toFixed());

	// Equation for getting grams of protein
	let protein;

	if (weight < 180) {
		protein = weight * 0.825;
	} else if (weight > 180) {
		protein = weight * 0.65;
	}

	let proteinInCals = protein * 4;
	proteinInCals = Math.ceil(proteinInCals);
	console.log("PROTEIN CALS", proteinInCals);

	protein = Math.ceil(protein);
	console.log("PROTEIN", protein);

	// Equation for getting grams of fat
	let fatInCals = calories * 0.25;
	fatInCals = Math.ceil(fatInCals);

	let fat = fatInCals / 9;
	fat = Math.ceil(fat);

	console.log("FAT IN CALS", fatInCals);
	console.log("FAT", fat);

	// Equation for getting grams of carbs
	let carbsInCals = calories - fatInCals - proteinInCals;
	console.log("CARBS IN CALS", carbsInCals);

	let carbs = carbsInCals / 4;

	carbs = Math.ceil(carbs);
	console.log(calories);

	Macros.findOneAndUpdate(
		{ user: id },
		{
			calories: calories,
			protein: proteinInCals,
			carbohydrates: carbsInCals,
			fat: fatInCals,
		}
	)
		.then((macros) => {
			console.log(macros);
			res.status(200).json({ message: "macros updateds" });
		})
		.catch((err) => {
			res.status(400).json({ message: "Something went wrong" });
		});
});

module.exports = router;
