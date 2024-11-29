const {Router} = require("express")
const {register, login, verify, logout} = require("../controller/auth.controller");
const verifyRefreshToken = require("../middleware/refreshToken.middleware");

const authRouter = Router()

authRouter.post("/register", register);
authRouter.post("/verify", verify);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/refresh", verifyRefreshToken);


module.exports = authRouter