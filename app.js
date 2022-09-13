const express = require("express");
const app = express();

require("dotenv/config");
require("./db/index");

const configMiddleware = require("./config/index");
configMiddleware(app);

module.exports = app;
