const Joi = require("joi");

exports.modelvalidator = function (data) {
    const schema = Joi.object({
        brand: Joi.string().required([true, "model nomi kiritilishi shart"]),
        cars_info: Joi.array(),
    });

    const { error } = schema.validate(data);
    if (error) {
        return { error: error.details[0].message };
    }

    return { error: null };
};