import * as Joi from "joi";

const taskSchemas = {
  createTaskSchema: Joi.object().keys({
    description: Joi.string().trim(true).required().label("description"),
    userId: Joi.string().trim(true).required().label("description"),
    title: Joi.string().trim(true).required().label("title"),
    timeTaskShouldBeDoneInMinutes: Joi.number()
      .required()
      .label("timeTaskShouldBeDoneInMinutes"),
    reminder: Joi.number().required().label("reminder"),
  }),

  validateOptions: {
    abortEarly: false,
    stripUnknown: true,
    convert: true,
  },
};

export { taskSchemas };
