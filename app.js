const express = require("express");
const app = express();

require("dotenv/config");

const { isAuthenticated } = require("./middleware/jwt.middleware");

require("./db/index");

const configMiddleware = require("./config/index");
configMiddleware(app);

const authRoutes = require("./routes/auth.routes");
app.use("/", authRoutes);

const recipeRoutes = require("./routes/recipe.routes");
app.use("/", recipeRoutes);

const dimensionRoutes = require("./routes/dimensions.routes");
app.use("/", isAuthenticated, dimensionRoutes);

const macroRoutes = require("./routes/macros.routes");
app.use("/", isAuthenticated, macroRoutes);

const dayRoutes = require("./routes/day.routes");
app.use("/", isAuthenticated, dayRoutes);

const foodRoutes = require("./routes/food.routes");
app.use("/", isAuthenticated, foodRoutes);

module.exports = app;
