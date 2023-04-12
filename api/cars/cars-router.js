// DO YOUR MAGIC
const router = require("express").Router();
const middleware = require("./cars-middleware");
const Car = require("./cars-model");

router.get("/", (req, res, next) => {
  //later
});

router.get("/:id", (req, res, next) => {
  //later
});

router.post("/", (req, res, next) => {
  //later
});

module.exports = router;
