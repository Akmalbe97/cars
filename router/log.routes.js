const {Router} = require("express")
const getLogs = require("../controller/logger.controller")



const logRouter = Router()

logRouter.get("/get_log", getLogs)

module.exports = logRouter