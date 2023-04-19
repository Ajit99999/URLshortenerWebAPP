const express = require("express");
const app = express();
require("dotenv").config();
const router = require("./routes/urlroutes");
const bodyParser = require("body-parser");
const cors = require('cors');
const path = require("path");
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

// deployment code

if (process.env.NODE_ENV === "PROD") {
  app.use(express.static(path.join(__dirname, "./client/urlshortenerapp/dist")));
} else {
  app.get("/", (_, res) => {
    res.send("API is running..");
  });
}

// deployment code


app.use("/", router);
app.get("*", (req, res) => {
  res.status(404).json({
    message:"Page not found"
  })
});
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`);
});
