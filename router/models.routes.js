const {Router} = require("express")
const {getModels, addModel, getOne, updateModel, deleteModel, getCategory} = require("../controller/models.controller")
const { carValidator } = require("../validator/car.validator")
const checkAdmin = require("../middleware/admin.middleware")
const { modelvalidator } = require("../validator/model.validator")



const modelsRouter = Router()

modelsRouter.get("/get_models", getModels)
modelsRouter.get("/get_category", getCategory)
modelsRouter.get("/get_one/:id", getOne)
modelsRouter.post("/add_model", [modelvalidator, checkAdmin], addModel)
modelsRouter.put("/update_model/:id", checkAdmin, updateModel)
modelsRouter.delete("/delete_model/:id", checkAdmin, deleteModel)


module.exports = modelsRouter