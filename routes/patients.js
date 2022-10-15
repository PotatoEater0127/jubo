var express = require("express");
var router = express.Router();

/* GET patients listing. */
router.get("/", function (req, res, next) {
  res.send("GET /patients response");
});

module.exports = router;
