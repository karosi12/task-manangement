import * as Joi from "joi";

const taskSchemas = {
  createTaskSchema: Joi.object().keys({
    description: Joi.string().trim(true).required().label("description"),
    userId: Joi.string().trim(true).required().label("user id"),
    title: Joi.string().trim(true).required().label("title"),
    timeTaskShouldBeDoneInMinutes: Joi.number()
      .required()
      .label("timeTaskShouldBeDoneInMinutes"),
    reminder: Joi.number().required().label("reminder"),
  }),

  findTaskSchema: Joi.object().keys({
    id: Joi.string().trim(true).required().label("task id"),
  }),

  updateTaskSchema: Joi.object().keys({
    id: Joi.string().trim(true).required().label("task id"),
    reminder: Joi.number().label("reminder"),
    timeTaskShouldBeDoneInMinutes: Joi.number().label(
      "timeTaskShouldBeDoneInMinutes"
    ),
    description: Joi.string().trim(true).label("description"),
    userId: Joi.string().trim(true).label("user id"),
    title: Joi.string().trim(true).label("title"),
  }),

  validateOptions: {
    abortEarly: false,
    stripUnknown: true,
    convert: true,
  },
};

export { taskSchemas };
