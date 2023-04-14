const Car = require("./cars-model");
const db = require("../../data/db-config");

const checkCarId = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const id = await Car.getById(req.params.id);
    if (!req.params.id) {
      res.status(404).json({ message: `car with id ${id} is not found` });
    } else {
      req.car = id;
      next();
    }
  } catch (err) {
    next(err.message);
  }
};

const checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC
  const { make, model, mileage, vin } = req.body;

  try {
    if (!make) {
      res.status(400).json({ message: `make is missing` });
    } else if (!model) {
      res.status(400).json({ message: `model is missing` });
    } else if (!mileage) {
      res.status(400).json({ message: `mileage is missing` });
    } else if (!vin) {
      res.status(400).json({ message: `vin is missing` });
    }
  } catch (err) {
    next(err.message);
  }
};

const checkVinNumberValid = async (req, res, next) => {
  const { vin } = req.body;
  try {
    if (!vin) {
      res.status(400).json({ message: `vin is invalid` });
    }
  } catch (err) {
    next(err.message);
  }
};

const checkVinNumberUnique = async (req, res, next) => {
  // DO YOUR MAGIC
};
module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid,
};
