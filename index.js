const express = require("express")
require("dotenv").config()
const cors = require("cors")
const connectDB = require("./db/config.db")
const modelsRouter = require("./router/models.routes")
const authRouter = require("./router/auth.routes")
const carRouter = require("./router/cars.routes")
const cookieParser = require("cookie-parser")
const path = require("path");
const bodyParser = require("body-parser");
const profileRouter = require("./router/profile.routes")
const logger = require("./service/logger")

const app = express()

app.use(express.json())
app.use(cors({origin: true, credentials: true}))
app.use(cookieParser());
app.use(bodyParser.json());

const PORT = process.env.PORT || 2555
//////////////////////////// connect to database
connectDB()

/////////////////////////////////// logger
// logger.error("talaba tizzimga kirdi")
// logger.warn("talaba tizzimga kirdi")
// logger.info("talaba tizzimga kirdi")

//////////////////////////// Router
app.use(modelsRouter)
app.use(authRouter)
app.use(carRouter)
app.use(profileRouter)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));



app.listen(PORT, () => {
  console.log(`Server is running on the ${PORT} port`)
})