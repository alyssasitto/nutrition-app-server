const router = require("express").Router();
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { isAuthenticated } = require("../middleware/jwt.middleware");

// Signup post route
router.post("/signup", (req, res) => {
	const { name, email, password } = req.body;

	// Check if any fields are empty
	if (name === "" || email === "" || password === "") {
		res
			.status(400)
			.json({ message: "Please provide a name, email, and password" });
		return;
	}

	// Check is email in a valid format
	const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
	if (!emailRegEx.test(email)) {
		res.status(400).json({ message: "Please enter a valid email address." });
		return;
	}

	// Check if password meets all requirements
	const passwordRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
	if (!passwordRegEx.test(password)) {
		res.status(400).json({
			message: `Password must include:
	  . One uppercase letter
	  . One lowercase letter
	  . More than 8 characters
	  . At least one special character`,
		});
		return;
	}

	// Check if user already exists
	User.findOne({ email }).then((user) => {
		// If user exists return a 400 error
		if (user) {
			res.status(400).json({ message: "User already exists" });
			return;
		}

		// If user doesn't exist hash password with bcryptjs
		const salt = bcrypt.genSaltSync(10);
		const hashedPassword = bcrypt.hashSync(password, salt);

		// Create the user with the hashed password
		User.create({
			name,
			email,
			password: hashedPassword,
		})
			.then((user) => {
				res.status(200).json({ message: "User created" });
			})
			.catch((err) => {
				res.status(400).json({ message: "Could not create user" });
			});
	});
});

// Login post route
router.post("/login", (req, res) => {
	const { email, password } = req.body;

	// Check if any fields are empty
	if (email === "" || password === "") {
		res.status(400).json({ message: "Please provide an email and password" });
		return;
	}

	// Check if user exists
	User.findOne({ email })
		.then((user) => {
			// If the user doesn't exist send a 404 error
			if (!user) {
				res.status(404).json({ message: "User does not exist" });
				return;
			}

			// Check if the user entered the correct password
			const correctPassword = bcrypt.compareSync(password, user.password);

			const payload = {
				name: user.name,
				id: user._id,
			};

			if (!correctPassword) {
				res.status(400).json({ message: "Could not verify credentials" });
				return;
			} else {
				const accessToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
					algorithm: "HS256",
					expiresIn: "30m",
				});

				res.status(200).json({ accessToken: accessToken });
				return;
			}
		})
		.catch((err) => res.status(500).json({ message: "Internal server error" }));
});

router.get("/verify", isAuthenticated, (req, res) => {
	console.log(req.headers);
	res.status(200).json(req.payload);
});

module.exports = router;
