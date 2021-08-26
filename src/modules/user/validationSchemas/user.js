import * as Joi from "joi";

const passwordSchema = Joi.string()
    .min(6)
    .regex(/^[A-Za-z]/)
    .trim()
    .label("Password")
    .messages({
      "string.pattern.base":
        "Password must be at least 6 characters long contain a number and an uppercase and a lowercase letter",
      "any.required": "Password must be at least 6 characters",
    }),
  confirmPasswordSchema = Joi.string()
    .valid(Joi.ref("password"))
    .trim()
    .label("Confirm password"),
  emailSchema = Joi.string().required().email().trim().label("Email").messages({
    "string.email": "Invalid email",
    "any.required": "Email is required",
  });

const userSchemas = {
  registrationSchema: Joi.object().keys({
    name: Joi.string()
      .trim(true)
      .required()
      .regex(/^[A-Za-z]/)
      .label("Name"),
    email: emailSchema,
    password: passwordSchema.required(),
    confirmPassword: confirmPasswordSchema.required(),
  }),

  loginSchema: Joi.object().keys({
    email: emailSchema,
    password: passwordSchema.required(),
  }),

  validateOptions: {
    abortEarly: false,
    stripUnknown: true,
    convert: true,
  },
};

export { userSchemas };
