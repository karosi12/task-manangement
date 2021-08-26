import taskService from "./services/task.services";
import Response from "../shared/utils/responses";
import Validate from "../shared/utils/validator";
import { taskSchemas } from "./validationSchemas/task";

/**
 * @description create a task
 * @param {Object} request - Http Request object
 * @param {Object} response - Http Request object
 * @returns {Object} return an object of a new task
 */
const createTask = async (request, response) => {
  const { errors, data } = Validate(taskSchemas.createTaskSchema, request.body);
  if (errors) {
    return response.status(400).send(Response.error(400, errors));
  }
  const { isSuccess, message, task } = await taskService.createTask(data);
  if (isSuccess) {
    return response.status(200).send(Response.success(200, message, task));
  }
  return response.status(400).send(Response.error(400, message));
};

export default { createTask };
