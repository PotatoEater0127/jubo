const express = require("express");
const router = express.Router();
const path = require("path");

// Have Node serve the files for our built React app
router.use(express.static(path.resolve(__dirname, "../client/build")));

// /* GET home page. */
router.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

module.exports = router;
