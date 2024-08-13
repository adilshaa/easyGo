const express = require("express");
const router = require("./router");
const app = express();
app.use(express.json());
const path = require("path");

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use((req, res, next) => {
  res.locals.layout = "layout";
  next();
});

// Set the views directory (optional if it's 'views' in the root)
app.set("views", path.join(__dirname, "views"));

app.use("/", router);

app.listen(3000, () => {
  console.log("connect");
});

module.exports = app;
