const express = require("express");
const mongoose = require("mongoose");
const app = express();

const routes = require("./config/routes");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://lolo:fHZzjXiqlPwFwnZp@time-line-project.ampjlle.mongodb.net/")
  .then(() => console.log("DB is working"))
  .catch(err => console.log(err));
  app.listen(1200, ()=> 
console.log("server work")
  );

app.use("/", routes);