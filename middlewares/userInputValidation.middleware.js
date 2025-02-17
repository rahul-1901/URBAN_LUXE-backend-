import Joi from 'joi';

export const userSignUpValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().required().messages({
            "string.empty": "Name is required..."
        }),
        email: Joi.string().email().required().messages({
            "string.empty": "Email is required...",
            "string.email": "Invalid email format..."
        }),
        password: Joi.string().min(8).max(100).required().messages({
            "string.empty": "Password is required...",
            "string.min": "Password must be atleast 8 characters long...",
            "string.max": "Password must not be more than 100 characters...."
        })
    });
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details.map((detail) => detail.message).join("\n")
        })
    }
    next();
}

export const userLoginValidation = (req, res, next) => {
    const schema = Joi.object({
        password: Joi.string().min(8).max(100).required().messages({
            "string.empty": "Password is required...",
            "string.min": "Password must be atleast 8 characters long...",
            "string.max": "Password must not be more than 100 characters...."
        }),
        email: Joi.string().email().required().messages({
            "string.empty": "Email is required...",
            "string.email": "Invalid email format..."
        })
    })
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details.map((detail) => detail.message).join("\n")
        })
    }
    next();
}