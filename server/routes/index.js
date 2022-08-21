const {
  getAllURLs,
  login,
  addURL,
  getURL,
} = require("../controllers/index.controller");

const router = require("express").Router();

router.get("/all-links", getAllURLs);

router.get("/login", login);

router.post("/add", addURL);

router.get("/:url", getURL);

module.exports = router;
