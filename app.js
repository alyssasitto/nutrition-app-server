const express = require("express");
const app = express();

require("dotenv/config");

const { isAuthenticated } = require("./middleware/jwt.middleware");

require("./db/index");

const configMiddleware = require("./config/index");
configMiddleware(app);

const authRoutes = require("./routes/auth.routes");
app.use("/", authRoutes);

const dimensionRoutes = require("./routes/dimensions.routes");
app.use("/", isAuthenticated, dimensionRoutes);

module.exports = app;
