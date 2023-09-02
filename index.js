require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

require("./routes.js")(app);


// a route for checking node status
app.get("/status", (req, res) => {
  res.json({
    message: "Congratulations! Node have been setup properly!"
  });
});


// setting port to 3000, & listening for requests http request.
app.listen(port, () => {
  console.log('Server is running on port '+port);
});