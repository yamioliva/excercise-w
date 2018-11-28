const { API_KEY } = require("./constants");
const request = require("request");

module.exports = {
  getOpenWeatherApiRoute: cityName => {
    return `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`;
  },

  call: (url, method = "get", body = null) => {
    let options = {
      url: url,
      method: method,
      body: body,
      headers: {
        Accept: "application/json"
      }
    };

    return new Promise(async (resolve, reject) => {
      request(url, options, (err, resp, body) => {
        if (err) {
          reject(err);
        } else {
          resolve(JSON.parse(body));
        }
      });
    });
  }
};
