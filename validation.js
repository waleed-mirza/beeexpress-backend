const Joi = require("joi");

//Register Validation

const registerValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
    name: Joi.string().min(6).required(),
    mobilenumber: Joi.string().min(6).required(),
    city: Joi.string().min(6).required(),
    CNIC: Joi.string().min(6).required(),
    userrole: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
