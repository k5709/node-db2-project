// DO YOUR MAGIC
const router = require("express").Router();
const middleware = require("./cars-middleware");
const Car = require("./cars-model");

router.get("/", async (req, res, next) => {
  //later
  try {
    const cars = await Car.getAll();
    res.json(cars);
  } catch (err) {
    next(err.message);
  }
});

router.get("/:id", (req, res, next) => {
  //later
  try {
  } catch (err) {
    next(err.message);
  }
});

router.post("/", (req, res, next) => {
  //later
});

module.exports = router;
