const Joi = require("joi");

exports.carValidator = function (data) {
    const schema = Joi.object({
        name: Joi.string().required(),
        price: Joi.string().required(),
        mini_image: Joi.string().required(),
        mator: Joi.number().min(0.8).max(4).required(),
        marka: Joi.string().required(),
        tanirovka: Joi.string().required(),
        year: Joi.number().min(2000).max(2024).required(),
        color: Joi.string().required(),
        distance: Joi.number().required(),
        description: Joi.string().required(),
        gearbox: Joi.string().required(),
        images: Joi.string().required(),
        owner_info: Joi.string().required(),
    });

    const { error } = schema.validate(data);
    if (error) {
        return { error: error.details[0].message };
    }

    return { error: null };
};