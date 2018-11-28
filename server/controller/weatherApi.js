const _async = require("async");
const { call, getOpenWeatherApiRoute } = require("../utils/helpers");

module.exports = {
  getWeatherReport: async (city1, city2, cb) => {
    _async.parallel(
      {
        [city1]: function(callback) {
          call(getOpenWeatherApiRoute(city1)).then(result => {
            callback(null, result);
          });
        },
        [city2]: function(callback) {
          call(getOpenWeatherApiRoute(city2)).then(result => {
            callback(null, result);
          });
        }
      },
      function(err, results) {
        let response = {
          httpStatusCode: 200
        };
        let keys = Object.keys(results);
        if (results[keys[0]].cod == 200 && results[keys[1]].cod == 200) {
          let result = {};
          if (results[keys[0]].main.temp > results[keys[1]].main.temp) {
            result.warmerCityName = results[keys[0]].name;
            result.colderCityName = results[keys[1]].name;
            result.difference =
              results[keys[0]].main.temp - results[keys[1]].main.temp;
          } else {
            result.warmerCityName = results[keys[1]].name;
            result.colderCityName = results[keys[0]].name;
            result.difference =
              results[keys[1]].main.temp - results[keys[0]].main.temp;
          }
          response.result = result;
        } else {
          response.httpStatusCode = 422;
          let errors = [];
          keys.forEach(item => {
            if (results[item].cod == 404) {
              let error = {
                type: "Invalid City",
                message: `${item} is invalid or does not exist`
              };
              errors.push(error);
            }
          });
          response.errors = errors;
        }

        cb(response);
      }
    );
  }
};
