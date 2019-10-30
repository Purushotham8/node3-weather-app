const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    address +
    ".json?access_token=pk.eyJ1IjoiYnB1cnVzaG90aGFtIiwiYSI6ImNrMmJpcDRjZDAxYmgzaXFtbnBra2RzMHkifQ.dWTbUletQsXK6kH9lwnh_A";

  request({ url: url, json: true }, (err, response) => {
    if (err) {
      callback("Unable to connect to location services", undefined);
    } else if (response.body.features.length === 0) {
      callback("Unable to find location. Try another search", undefined);
    } else {
      callback(undefined, {
        longitude: response.body.features[0].center[0],
        latitude: response.body.features[0].center[1],
        location: response.body.features[0].place_name
      });
    }
  });
};

module.exports = geocode;
