"use strict";

const Weather = require("../controller/weatherApi");

module.exports = function(app) {
  var router = app.Router();

  // Route to compare temperature of any city with madrid
  router.get("/compareWithMadrid/:cityName", async (req, res) => {
    let cityName = req.params.cityName;

    // Get weather report of any city with madrid
    Weather.getWeatherReport("Madrid", cityName, result => {
      res.status(result.httpStatusCode).json(result);
    });
  });

  // Route to compare temperature of two cities
  router.get("/compareTwoCities/:cityName1/:cityName2", async (req, res) => {
    let cityName1 = req.params.cityName1;
    let cityName2 = req.params.cityName2;

    // Get weather report of two cities
    Weather.getWeatherReport(cityName1, cityName2, result => {
      res.status(result.httpStatusCode).json(result);
    });
  });

  return router;
};
