const Joi = require("joi");

exports.registerValidator = function (data) {
  try {
    const schema = Joi.object({
      name: Joi.string().required(),
      surname: Joi.string().required(),
      phone: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
      role: Joi.string().required(),
      verify_code: Joi.string().min(2).max(10),
    });
    return schema.validate(data);
  } catch (error) {
    res.json(details[0].message);
  }
};