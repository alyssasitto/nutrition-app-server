const express = require("express");
const app = express();

require("dotenv/config");
require("./db/index");

const configMiddleware = require("./config/index");
configMiddleware(app);

const authRoutes = require("./routes/auth.routes");
app.use("/", authRoutes);

module.exports = app;
