const colors = require("colors");
const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const app = express();
const server = http.createServer(app);
const routes = require("./routes/weatherRoutes")(express);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With, Authorization, content-type, If-Modified-Since,cache-control"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use("/api", routes);
app.use("*", (req, res) => {
  res.send("Weather API is ready.");
});

app.set("port", process.env.PORT || 3000);
const port = process.env.PORT || 3000;

server.listen(app.get("port"), "0.0.0.0");
console.log(("Express server is listening on port : " + port).bold.green);
