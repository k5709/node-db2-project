const vinValidator = require("vin-validator");
const Car = require("./cars-model");

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
  try {
    if (!req.body.make) {
      return res.status(400).json({ message: `make is missing` });
    } else if (!req.body.model) {
      return res.status(400).json({ message: `model is missing` });
    } else if (!req.body.mileage) {
      return res.status(400).json({ message: `mileage is missing` });
    } else if (!req.body.vin) {
      return res.status(400).json({ message: `vin is missing` });
    }
    next();
  } catch (err) {
    next(err);
  }
};

const checkVinNumberValid = (req, res, next) => {
  if (vinValidator.validate(req.body.vin)) {
    next();
  } else {
    next({
      status: 400,
      message: `vin ${req.body.vin} is invalid`,
    });
  }
};

const checkVinNumberUnique = (req, res, next) => {
  const { vin } = req.body;

  Car.getByVin(vin)
    .then((car) => {
      if (car) {
        next({ status: 400, message: `vin ${vin} already exists` });
      } else {
        next();
      }
    })
    .catch(next);
};

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid,
};
// const vinValidator = require("vin-validator");
// const Car = require("./cars-model");

// const checkCarId = async (req, res, next) => {
//   try {
//     const id = await Car.getById(req.params.id);
//     if (!req.params.id) {
//       res.status(404).json({ message: `car with id ${id} is not found` });
//     } else {
//       req.car = id;
//       next();
//     }
//   } catch (err) {
//     next(err.message);
//   }
// };

// const checkCarPayload = (req, res, next) => {
//   try {
//     if (!req.body.make) {
//       return res.status(400).json({ message: `make is missing` });
//     } else if (!req.body.model) {
//       return res.status(400).json({ message: `model is missing` });
//     } else if (!req.body.mileage) {
//       return res.status(400).json({ message: `mileage is missing` });
//     } else if (!req.body.vin) {
//       return res.status(400).json({ message: `vin is missing` });
//     }
//     next();
//   } catch (err) {
//     next(err);
//   }
// };

// const checkVinNumberValid = (req, res, next) => {
//   vinValidator.validate(req.body.vin)
//     ? next()
//     : next({
//         status: 400,
//         message: `vin ${req.body.vin} is invalid`,
//       });
// };

// const checkVinNumberUnique = (req, res, next) => {
//   const { vin } = req.body;

//   Car.getByVin(vin)
//     .then((car) => {
//       if (car) {
//         next({ status: 400, message: `vin ${vin} already exists` });
//       } else {
//         next();
//       }
//     })
//     .catch(next);
// };

// module.exports = {
//   checkCarId,
//   checkCarPayload,
//   checkVinNumberUnique,
//   checkVinNumberValid,
// };
