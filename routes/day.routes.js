const router = require("express").Router();

const User = require("../models/User.model");

router.post("/day", (req, res) => {
	const { id } = req.body;
	const { date } = req.body;

	User.findById({ _id: id })
		.then((user) => {
			const logDay = user.logDays.filter((element) => {
				return element.date === date;
			});

			if (logDay.length === 0) {
				return res.status(200).json({ logDay: null });
			} else {
				return res.status(200).json({ logDay: logDay[0] });
			}
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ message: "Something went wrong" });
		});
});

module.exports = router;
