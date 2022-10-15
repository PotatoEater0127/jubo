var express = require("express");
var router = express.Router();

/* GET orders listing. */
router.get("/", function (req, res, next) {
  res.send("GET /orders response");
});

/* POST create an order. */
router.post("/", function (req, res, next) {
  res.send("POST /orders response");
});

/* PATCH update an order. */
router.patch("/", function (req, res, next) {
  res.send("PATCH /orders response");
});

module.exports = router;
