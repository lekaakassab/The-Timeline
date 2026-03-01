const express = require("express");
const app = express();

require("./config/mongoose");

const routes = require("./config/routes");
const apiRoutes = require("./config/apiRoutes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(apiRoutes);
app.use("/", routes);

app.get("/test", (req, res) => res.send("OK lolo"));

app.listen(1200, () => {
  console.log("server working");
});