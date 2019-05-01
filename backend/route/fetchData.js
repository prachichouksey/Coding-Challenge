const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const axios = require("axios");
router.get("/graph", async (req, res) => {
  await axios(
    "http://api.worldbank.org/countries/USA/indicators/NY.GDP.MKTP.CD?per_page=5000&format=json"
  )
    .then(response => {
      res.send(response.data[1]);
    })
    .catch(err => {
      res.send(err);
    });
});

module.exports = router;
