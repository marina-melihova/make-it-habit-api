const Joi = require('joi');

const RegistrationSchema = Joi.object({
    name: Joi
        .string()
        .required()
        .pattern(new RegExp('^[a-zA-ZА-Яа-я]{2,8}$'))
        .error(errors => {
            errors.forEach(err => {
                switch (err.code) {
                    case "string.pattern.base":
                        err.message = "\"name\" must consists of only letters, min 2 symbols and max 8 symbols"
                        break;
                    default:
                        break;
                }
            });
            return errors;
        }),

    email: Joi
        .string()
        .required()
        .email()
        .error(errors => {
            errors.forEach(err => {
                switch (err.code) {
                    case "string.email":
                        err.message = "\"email\" must has type as example@mail.com";
                        break;
                    default:
                        break;
                }
            });
            return errors;
        }),

    password: Joi
        .string()
        .required()
        .pattern(/^[a-zA-Z0-9]{8,16}$/)
        .error(errors => {
            errors.forEach(err => {
                switch (err.code) {
                    case "string.pattern.base":
                        err.message = `
                            "password" must has min 8 symbols, max 16 symbols, only digital letters and literal letters`;
                        break;
                    default:
                        break;
                }
            });
            return errors;
        }),
})

const LoginSchema = Joi.object({

    email: Joi
        .string()
        .required()
        .email()
        .error(errors => {
            errors.forEach(err => {
                switch (err.code) {
                    case "string.email":
                        err.message = "\"email\" must has type as example@mail.com";
                        break;
                    default:
                        break;
                }
            });
            return errors;
        }),

    password: Joi
        .string()
        .required()
        .pattern(/^[a-zA-Z0-9]{8,16}$/)
        .error(errors => {
            errors.forEach(err => {
                switch (err.code) {
                    case "string.pattern.base":
                        err.message = `
                            "password" must has min 8 symbols, max 16 symbols, only digital letters and literal letters`;
                        break;
                    default:
                        break;
                }
            });
            return errors;
        }),
})


const validation = async (Schema, data) =>  {
    const {error} = await Schema.validate(data);
    if (error) {
        const message = error.details.reduce((msg, item) => {
            if (msg) return `${msg}, ${item.message}`
            return item.message
        }, '')
        throw new Error(message);
    }
}

const validatorRegistrationMiddleware = async (req, res, next) => {
    try {
        await validation(RegistrationSchema, req.body)
        next()
    } catch (e) {
        res.status(400).send(e.message)
    }
}

const validatorLoginMiddleware = async (req, res, next) => {
    try {
        await validation(LoginSchema, req.body)
        next()
    } catch (e) {
        res.status(400).send(e.message)
    }
}

module.exports = {
    validatorRegistrationMiddleware,
    validatorLoginMiddleware,
}