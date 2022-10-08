const router = require("express").Router();

const User = require("../models/User.model");

router.post("/day", (req, res) => {
	const { id } = req.body;
	const { date } = req.body;

	User.findById({ _id: id })
		.then((user) => {
			console.log(user);

			const logDay = user.logDays.filter((element) => {
				return element.date === date;
			});

			if (logDay === []) {
				return res.status(200).json({ logday: logDay[0] });
			} else {
				return res.status(200).json({ logDay: logDay[0] });
			}
		})
		.catch((err) => {
			console.log(err);
		});
});

module.exports = router;
