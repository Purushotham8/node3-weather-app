const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "https://api.darksky.net/forecast/a119817546b73e2ee2d9d8fd5536c1e7/" +
    latitude +
    "," +
    longitude;

  request({ url: url, json: true }, (err, response) => {
    if (err) {
      callback("Unable to connect to location services", undefined);
    } else if (response.body.error) {
      callback("Unable to find location. Try another search", undefined);
    } else {
      callback(
        undefined,
        response.body.daily.data[0].summary +
          " Currently temperature is " +
          response.body.currently.temperature +
          ", and there is " +
          response.body.currently.precipProbability +
          "% chances of rain"
      );
    }
  });
};

module.exports = forecast;
