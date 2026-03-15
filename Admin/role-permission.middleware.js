const joi = require("joi");

const joiSchema = joi.object({
    permission: joi.string().required()
});

module.exports = {joiSchema};