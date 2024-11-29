const authSchemas = require("../schema/auth.schema")

const getProfile = async (req, res, next) => {
  try {

    const userId = req.user?.id

    if(!userId) {
      return res.status(401).json({message: "bu foydalanuvchi ro'yxatdan o'tmagan"})
    }

    const profile = await authSchemas.findById(userId).populate({
      path: "auth",
      select: "name email, image"
    })

    if(!profile) {
      return res.status(404).json({message: "profil topilmadi"})
    }
    res.json(profile);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProfile
}


