const {Router} = require("express")
const { getProfile } = require("../controller/profile.controller")

const profileRouter = Router()

profileRouter.get("/get_profile", getProfile)

module.exports = profileRouter