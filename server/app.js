const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const apiRouter = require("./routes/api");
const initialData = require("./initialData/initialData");
const chalk = require("chalk");
const morgan = require("morgan");

const app = express();

app.use(cors());

app.use(
  morgan((tokens, req, res) => {
    const status = res.statusCode;
    const color = status < 400 ? chalk.green : chalk.red;
    const statusText = color(status);
    const method = tokens.method(req, res);
    const url = tokens.url(req, res);
    const responseTime = tokens["response-time"](req, res);
    return `${chalk.gray(
      tokens.date(req, res, "iso")
    )} ${method} ${url} ${statusText} ${color(`${responseTime}ms`)}`;
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
initialData();
app.use("/api", apiRouter);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public", "images")));
app.use((req, res, next) => {
  res.status(404).json({ err: "page not found" });
});

module.exports = app;
