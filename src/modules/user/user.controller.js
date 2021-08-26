import userService from "./services/user.services";
import Response from "../shared/utils/responses";
import Validate from "../shared/utils/validator";
import { userSchemas } from "./validationSchemas/user";
/**
 * @description create a new user
 * @param {Object} request - Http Request object
 * @param {Object} response - Http Request object
 * @returns {Object} return an object of a new user
 */
const createAccount = async (request, response) => {
  const { errors, data } = Validate(
    userSchemas.registrationSchema,
    request.body
  );
  if (errors) {
    return response.status(400).send(Response.error(400, errors));
  }
  const { confirmPassword, ...signupData } = data,
    { isSuccess, message, user } = await userService.createAccount(signupData);
  if (isSuccess) {
    return response.status(200).send(Response.success(200, message, user));
  }
  return response.status(400).send(Response.error(400, message));
};

/**
 * @description login user
 * @param {Object} request - Http Request object
 * @param {Object} response - Http Request object
 * @returns {Object} return an object of a login user
 */
const login = async (request, response) => {
  const { errors, data } = Validate(userSchemas.loginSchema, request.body);
  if (errors) {
    return response.status(400).send(Response.error(400, errors));
  }
  const { isSuccess, message, user } = await userService.login(data);
  if (isSuccess) {
    return response.status(200).send(Response.success(200, message, user));
  }
  return response.status(400).send(Response.error(400, message));
};

export default { createAccount, login };
