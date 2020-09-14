const Joi = require('joi');

const UpdateUserSchema = Joi.object({
    firstName: Joi
        .string()
        .allow('')
        .pattern(new RegExp('^[a-zA-ZА-Яа-я]{2,8}$'))
        .error(errors => {
            errors.forEach(err => {
                switch (err.code) {
                    case "string.pattern.base":
                        err.message = "\"firstName\" must consists of only letters, min 2 symbols and max 8 symbols"
                        break;
                    default:
                        break;
                }
            });
            return errors;
        }),

    lastName: Joi
        .string()
        .allow('')
        .pattern(new RegExp('^[a-zA-ZА-Яа-я]{2,8}$'))
        .error(errors => {
            errors.forEach(err => {
                switch (err.code) {
                    case "string.pattern.base":
                        err.message = "\"lastName\" must consists of only letters, min 2 symbols and max 8 symbols"
                        break;
                    default:
                        break;
                }
            });
            return errors;
        }),

    phone: Joi
        .string()
        .allow('')
        .pattern(new RegExp('^[0-9]{11}$'))
        .error(errors => {
            errors.forEach(err => {
                switch (err.code) {
                    case "string.pattern.base":
                        err.message = "\"phone\" must consists of only 11 numbers"
                        break;
                    default:
                        break;
                }
            });
            return errors;
        }),

    avatar: Joi
        .string()
        .allow(''),

    email: Joi
        .string()
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

const validatorUpdateUserMiddleware = async (req, res, next) => {
    try {
        await validation(UpdateUserSchema, req.body)
        next()
    } catch (e) {
        res.status(400).send(e.message)
    }
}

module.exports = {
    validatorUpdateUserMiddleware
}