"use strict";
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
// var logger = require("morgan");
var cors = require("cors");

const routerAuth = require("./auth.js");

const leetcodeListRouter = require("./leetcode/leetcodeList");
const newLeetcodeRouter = require("./leetcode/newLeetcode");
const leetcodeDelRouter = require("./leetcode/delLeetcode");
const leetcodeUpdateRouter = require("./leetcode/updateLeetcode");

const router = express.Router();

app.use(express.json());
app.use(bodyParser.json({ limit: "50mb" }));
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// for parsing multipart/form-data
app.use(express.static("public"));
app.use(cors({ origin: '*' }));
app.use(cookieParser());
// app.use(logger("dev"));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use("/", router); // path must route to lambda
app.use("/auth", routerAuth);

app.use("/leetcode/list", leetcodeListRouter);
app.use("/leetcode/new", newLeetcodeRouter);
app.use("/leetcode/del", leetcodeDelRouter);
app.use("/leetcode/update", leetcodeUpdateRouter);

router.get("/", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write("<h1>Hello from Express.js!!!!!!!!</h1>");
  res.end();
});

// FUNCTIONS
module.exports = app;
