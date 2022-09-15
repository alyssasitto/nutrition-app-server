const jwt = require("jsonwebtoken");

let token;

const isAuthenticated = (req, res, next) => {
	if (
		req.headers.authorization &&
		req.headers.authorization.split(" ")[0] === "Bearer"
	) {
		token = req.headers.authorization.split(" ")[1];
	}

	if (token) {
		jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
			if (err) {
				res.status(400).json({ message: "You do not have access" });
			} else {
				req.payload = decoded;
				next();
			}
		});
	} else {
		res.status(500).json({ message: "Internal server error" });
	}
};

module.exports = { isAuthenticated };
