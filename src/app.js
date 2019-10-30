const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;
const name = "Purushotham";
// app.engine(".hbs", exphbs({ extname: ".hbs" }));

const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather Home Page",
    name
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "Weather About Page",
    name
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Weather Help Page",
    name
  });
});

app.get("/weather", (req, res) => {
  // const errorHandler = error => {
  //   res.send({ error });
  // };

  if (!req.query.address)
    return res.send({ error: "You must provide an address" });

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) return res.send({ error });

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) return res.send({ error });

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address
        });
      });
    }
  );
});

// Handles other help routes not specified
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    error: "Help page not found.",
    name
  });
});

// Handles all other routes not specified
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    error: "Page not found.",
    name
  });
});
app.listen(port, () => {
  console.log("Server is up on port " + port);
});

// const path = require("path");
// const express = require("express");
// const hbs = require("hbs");
// const geocode = require("./utils/geocode");
// const weather = require("./utils/weather");
// const PORT = process.env.PORT || 3000;

// const app = express();
// const name = "Tim Acker";

// // Configure handlebars templating engine and define
// // a custom handlebars directory versus the views default
// app.set("view engine", "hbs");
// app.set("views", path.join(__dirname, "../templates/views"));
// hbs.registerPartials(path.join(__dirname, "../templates/partials"));

// // Set location of static assets. This is default to serving
// // index.html at the root url
// app.use(express.static(path.join(__dirname, "../public")));

// app.get("/", (req, res) => {
//   res.render("index", {
//     title: "Weather Home Page",
//     name
//   });
// });

// app.get("/about", (req, res) => {
//   res.render("about", {
//     title: "Weather About Page",
//     name
//   });
// });

// app.get("/help", (req, res) => {
//   res.render("help", {
//     title: "Weather Help Page",
//     name
//   });
// });

// app.get("/weather", (req, res) => {
//   const errorHandler = error => {
//     res.send({ error });
//   };

//   if (!req.query.location)
//     return errorHandler({ message: "No location provided" });

//   geocode(
//     req.query.location,
//     (error, { lat, lng, street, adminArea5, adminArea3, postalCode } = {}) => {
//       if (error) return errorHandler(error);

//       weather(
//         lat,
//         lng,
//         (error, { summary, temperature, apparentTemperature } = {}) => {
//           if (error) return errorHandler(error);

//           res.send({
//             location: `${street} ${adminArea5}, ${adminArea3} ${postalCode}`.trim(),
//             summary,
//             temperature,
//             apparentTemperature
//           });
//         }
//       );
//     }
//   );
// });

// // Handles other help routes not specified
// app.get("/help/*", (req, res) => {
//   res.render("404", {
//     title: "404",
//     error: "Help page not found.",
//     name: "Tim Acker"
//   });
// });

// // Handles all other routes not specified
// app.get("*", (req, res) => {
//   res.render("404", {
//     title: "404",
//     error: "Page not found.",
//     name: "Tim Acker"
//   });
// });

// app.listen(3000, () => {
//   console.info(`Server listening on port ${PORT}.`);
// });
