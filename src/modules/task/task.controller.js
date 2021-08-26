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
    return response.status(201).send(Response.success(201, message, task));
  }
  return response.status(400).send(Response.error(400, message));
};

/**
 * @description find a task
 * @param {Object} request - Http Request object
 * @param {Object} response - Http Request object
 * @returns {Object} return an object of a task
 */
const findTask = async (request, response) => {
  const { errors, data } = Validate(taskSchemas.findTaskSchema, request.params);
  if (errors) {
    return response.status(400).send(Response.error(400, errors));
  }
  const { isSuccess, message, task } = await taskService.findTask(data);
  if (isSuccess) {
    return response.status(200).send(Response.success(200, message, task));
  }
  return response.status(400).send(Response.error(400, message));
};

/**
 * @description update a task
 * @param {Object} request - Http Request object
 * @param {Object} response - Http Request object
 * @returns {Object} return an object of a task
 */
const updateTask = async (request, response) => {
  const requestData = { ...request.params, ...request.body };
  const { errors, data } = Validate(taskSchemas.updateTaskSchema, requestData);
  if (errors) {
    return response.status(400).send(Response.error(400, errors));
  }
  const { isSuccess, message, task } = await taskService.updateTask(data);
  if (isSuccess) {
    return response.status(200).send(Response.success(200, message, task));
  }
  return response.status(400).send(Response.error(400, message));
};

/**
 * @description delete a task
 * @param {Object} request - Http Request object
 * @param {Object} response - Http Request object
 * @returns {Object} return an object empty
 */
const deleteTask = async (request, response) => {
  const { errors, data } = Validate(taskSchemas.findTaskSchema, request.params);
  if (errors) {
    return response.status(400).send(Response.error(400, errors));
  }
  const { isSuccess, message, task } = await taskService.deleteTask(data);
  if (isSuccess) {
    return response.status(200).send(Response.success(200, message, task));
  }
  return response.status(400).send(Response.error(400, message));
};

export default { createTask, findTask, updateTask, deleteTask };
