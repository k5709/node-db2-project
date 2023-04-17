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

router.get("/:id", middleware.checkCarId, async (req, res, next) => {
  //later
  try {
    const carId = await Car.getById(req.params.id);
    if (!carId) {
      res.status(404).json({ message: "id not found" });
    } else {
      return res.json(carId);
    }
  } catch (err) {
    next(err.message);
  }
});

router.post(
  "/",
  middleware.checkCarPayload,
  middleware.checkVinNumberValid,
  middleware.checkVinNumberUnique,
  async (req, res, next) => {
    try {
      const newCar = await Car.create(req.body);
      res.status(201).json(newCar);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
