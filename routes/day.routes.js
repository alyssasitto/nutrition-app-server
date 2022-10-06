const router = require("express").Router();

router.get("/day", (req, res) => {
	res.status(200).json({ message: "Request made" });
});

module.exports = router;
