const router = require("express").Router();

router.post("/dimensions", (req, res) => {
	const { inches, feet, weight, gender, age } = req.body;
	const { id } = req.payload;

	console.log(inches, feet, weight, gender, age, id);
});

module.exports = router;
