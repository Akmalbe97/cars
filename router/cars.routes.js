const {Router} = require("express")
const {getCars, getOne, addCar, updateCar, deleteCar} = require("../controller/cars.controller")
const { carValidator } = require("../validator/car.validator")
const checkAdmin = require("../middleware/admin.middleware")
const verifyAccessToken = require("../middleware/accessToken.middleware")
const uploadImage = require("../multer/uploadFile")


const carRouter = Router()

carRouter.get("/get_cars", getCars)
carRouter.get("/get_one/:id", getOne)
carRouter.post("/add_car", [verifyAccessToken, carValidator, checkAdmin], addCar)
carRouter.put("/update_car/:id", [verifyAccessToken, carValidator, checkAdmin], updateCar)
carRouter.delete("/delete_car/:id", [verifyAccessToken, carValidator, checkAdmin], deleteCar)
carRouter.post("/upload_carImages", uploadImage.array("images"), (req, res) => {
  if (req.files && req.files.length > 0) {
    res.json({ message: "Rasmlar yuklandi!", file: req.files });
  } else {
    res.status(400).json({ message: "Rasmlar yuklanmadi!" });
  }
})


module.exports = carRouter