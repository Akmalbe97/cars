const carsSchemas = require("../schema/cars.schema");

const getCars = async (req, res, next) => {
  try {
    const cars = await carsSchemas
      .find()
      .populate("owner_info", "-createdAt -updatedAt -_id -image -email -password -__v")
    res.json(cars);
  } catch (error) {
    next(error);
  }
};

const getOne = async (req, res, next) => {
  const { id } = req.params;
  const foundedCar = await carsSchemas.findById(id);

  if (!foundedCar) {
    return res.status(404).json({ message: "Car not found" });
  }
  res.status(201).json(foundedCar);
};

const addCar = async (req, res, next) => {
  try {
    const {
      name,
      price,
      mini_image,
      marka,
      tanirovka,
      motor,
      year,
      color,
      distance,
      gearbox,
      description,
      total_price,
      owner_info,
    } = req.body;
    const exsistCar = await carsSchemas.findOne({ name });
    if (exsistCar) {
      return res.status(409).json({ message: "Car already exsists" });
    }
    const images = req.body.images ? req.file.path : null;

    const newCar = new carsSchemas({
      name,
      price,
      mini_image,
      marka,
      tanirovka,
      motor,
      year,
      color,
      distance,
      gearbox,
      description,
      total_price,
      images,
      owner_info
    });
    await newCar.save();

    res.status(200).json({
      message: "added new Car",
      data: newCar,
    });
  } catch (error) {
    next(error);
  }
};

const updateCar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      name,
      price,
      mini_image,
      marka,
      tanirovka,
      motor,
      year,
      color,
      distance,
      gearbox,
      description,
      total_price,
      images,
      owner_info
    } = req.body;

    const foundedCar = await carsSchemas.findById(id);

    if (!foundedCar) {
      return res.status(404).json({ message: "Car not found" });
    }

    let result = await carsSchemas.findByIdAndUpdate(
      id,
      {
        name,
        price,
        mini_image,
        marka,
        tanirovka,
        motor,
        year,
        color,
        distance,
        gearbox,
        description,
        total_price,
        images,
        owner_info
      },
      { new: true }
    );

    res.status(201).json({ message: "Car has been updated successfully" });
  } catch (error) {
    next(error);
  }
};

const deleteCar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const foundedCar = await carsSchemas.findById(id);

    if (!foundedCar) {
      return res.status(404).json({
        message: "Car not found",
      });
    }

    await carsSchemas.findByIdAndDelete(id);

    res.status(200).json({
      message: "Car deleted successfully!",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCars,
  getOne,
  addCar,
  updateCar,
  deleteCar,
};
