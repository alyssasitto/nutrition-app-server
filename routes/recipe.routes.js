const router = require("express").Router();
const axios = require("axios");

// router.get("/recipe/:recipe", (req, res) => {
// 	const { recipe } = req.params;

// 	axios
// 		.get(
// 			`https://api.edamam.com/api/recipes/v2?app_id=${process.env.recipeId}&app_key=${process.env.recipeKey}&q=${recipe}&type=public`
// 		)
// 		.then((response) => {
// 			console.log("THIS IS THE RESPONSE", response);
// 			console.log(response.data.hits);

// 			res.status(200).json({ recipeList: response.data.hits });
// 		})
// 		.catch((err) => {
// 			res.status(400).json({ message: "Something went wrong" });
// 		});
// });

router.post("/recipe", (req, res) => {
	console.log(req.body);

	const { recipe } = req.body;
	const { cuisine } = req.body;
	const { diet } = req.body;
	const { intolerance } = req.body;

	const options = {
		method: "GET",
		url: "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch",
		params: {
			query: recipe,
			cuisine: cuisine.toString(),
			diet: diet.toString(),
			intolerances: intolerance.toString(),
		},
		headers: {
			"X-RapidAPI-Key": process.env.rapidKey,
			"X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
		},
	};
	axios
		.request(options)
		.then((response) => {
			res.status(200).json({ recipeList: response.data.results });
		})
		.catch((error) => {
			console.error(error);
			res.status(400).json({ message: "Something went wrong" });
		});
});

router.get("/details/:id", (req, res) => {
	const { id } = req.params;

	console.log(req);
	console.log(id);

	const options = {
		method: "GET",
		url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/information`,
		headers: {
			"X-RapidAPI-Key": process.env.rapidKey,
			"X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
		},
	};

	axios
		.request(options)
		.then((response) => {
			console.log(response.data);
			res.status(200).json({ recipeInfo: response.data });
		})
		.catch((error) => {
			console.error(error);
			res.status(400).json({ message: "Something went wrong" });
		});
});

module.exports = router;
