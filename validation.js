import Joi from "Joi";

const registerValidation = data => {
	const RegistrationSchema = Joi.object({
		name: Joi.string().min(5).required(),
		email: Joi.string().min(5).required().email(),
		password: Joi.string().min(5).required()
	});

	return RegistrationSchema.validate(data);
};

const loginValidation = data => {
	const LoginSchema = Joi.object({
		email: Joi.string().min(5).required().email(),
		password: Joi.string().min(5).required()
	});

	return LoginSchema.validate(data);
};

export {registerValidation, loginValidation};
