const carModelsSchema = require("../schema/models.schema");

const getModels = async (req, res, next) => {
  try {
    const models = await carModelsSchema.find().populate({
      path: "cars_info",
      select: "name price"
    });
    res.json(models);
  } catch (error) {
    next(error);
  }
};

const getCategory = async (req, res, next) => {
  try {
    const {marka} = req.body
    const models = await carModelsSchema.find(marka).populate({
      path: "cars_info",
      select: "name price"
    });
    res.json(models);
  } catch (error) {
    next(error);
  }
};

const getOne = async (req, res, next) => {
  const { id } = req.params;
  const foundedModel = await carModelsSchema.findById(id);

  if (!foundedModel) {
    return res.status(404).json({ message: "model not found" });
  }
  res.status(201).json(foundedModel);
};

const addModel = async (req, res, next) => {
  try {
    const { brand, cars_info } = req.body;
    const exsistModel = await carModelsSchema.findOne({ brand });
    if (exsistModel) {
      return res.status(409).json({ message: "model already exsists" });
    }

    const newModel = new carModelsSchema({ brand, cars_info });
    await newModel.save();

    res.status(200).json({
      message: "added new model",
      data: newModel,
    });
  } catch (error) {
    next(error);
  }
};

const updateModel = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { brand, cars_info } = req.body;

    const foundedModel = await carModelsSchema.findById(id);

    if (!foundedModel) {
      return res.status(404).json({ message: "model not found" });
    }

    let result = await carModelsSchema.findByIdAndUpdate(
      id,
      {
        brand,
        cars_info
      },
      { new: true }
    );

    res.status(201).json({ message: "Model has been updated successfully" });
  } catch (error) {
    next(error);
  }
};

const deleteModel = async (req, res, next) => {
  try {
    const { id } = req.params;
    const foundedModel = await carModelsSchema.findById(id);

    if (!foundedModel) {
      return res.status(404).json({
        message: "model not found",
      });
    }

    await carModelsSchema.findByIdAndDelete(id);

    res.status(200).json({
      message: "model deleted successfully!",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getModels,
  getCategory,
  getOne,
  addModel,
  updateModel,
  deleteModel
};
