const sinon = require("sinon");
import * as assert from "assert";
import { resetStubAndSpys } from "../../../tests/testHelper";
import * as userMock from "../tests/mocks/user.mock";
import * as hashPassword from "../../shared/utils/hashPassword";
import userService from "../services/user.services";
import userRepository from "../user.repository";

describe("User service", () => {
  config.JWT_SECRET = "92jw0e97823"
  const sandBox = sinon.createSandbox();
  afterEach(() => {
    resetStubAndSpys([sandBox]);
  });

  it("#sign up - failure (payload is empty)", async () => {
    const data = { name: "", email: "", password: "" };
    sandBox.stub(userRepository, "findOne").resolves(false);
    const { isSuccess, user } = await userService.createAccount(data);
    assert.deepStrictEqual(isSuccess, false);
    assert.deepStrictEqual(user, undefined);
  });

  it("#sign up - failure (message return: User already registered)", async () => {
    const data = userMock.signUpMockRequest;
    sandBox.stub(userRepository, "findOne").resolves(true);
    const { isSuccess, user, message } = await userService.createAccount(data);
    assert.deepStrictEqual(isSuccess, false);
    assert.deepStrictEqual(user, undefined);
    assert.deepStrictEqual(message, "User already registered");
  });

  it("#sign up - failure (message return: Unable to create user)", async () => {
    const data = userMock.signUpMockRequest;
    sandBox.stub(userRepository, "findOne").resolves(false);
    sandBox.stub(userRepository, "create").resolves(false);
    const { isSuccess, user, message } = await userService.createAccount(data);
    assert.deepStrictEqual(isSuccess, false);
    assert.deepStrictEqual(user, undefined);
    assert.deepStrictEqual(message, "Unable to create user");
  });

  it("#Sign up - success (message return: User created successfully)", async () => {
    const data = userMock.signUpMockRequest;
    sandBox.stub(userRepository, "findOne").resolves(false);
    sandBox.stub(userRepository, "create").resolves(data);
    const { isSuccess, user, message } = await userService.createAccount(data);
    console.log(isSuccess, user, message)
    assert.ok("user" in user);
    assert.ok("token" in user);
    assert.deepStrictEqual(isSuccess, true);
    assert.deepStrictEqual(message, "User created successfully");
  });

  it("#login - failure (message return: Invalid credentials - user not found)", async () => {
    const data = { email: "", password: "" };
    sandBox.stub(userRepository, "findOne").resolves(false);
    const { isSuccess, user, message } = await userService.login(data);
    assert.deepStrictEqual(isSuccess, false);
    assert.deepStrictEqual(user, undefined);
    assert.deepStrictEqual(message, "Invalid credentials");
  });

  it("#Login - failure (message return: Invalid credentials - wrong password)", async () => {
    const data = userMock.loginMockRequest;
    sandBox.stub(userRepository, "findOne").resolves(true);
    sandBox.stub(hashPassword, "validatePassword").returns(false);
    const { isSuccess, user, message } = await userService.login(data);
    assert.deepStrictEqual(isSuccess, false);
    assert.deepStrictEqual(user, undefined);
    assert.deepStrictEqual(message, "Invalid credentials");
  });

  it("#Login - success (message return: User login successfully)", async () => {
    const data = userMock.loginMockRequest;
    sandBox.stub(userRepository, "findOne").resolves(data);
    sandBox.stub(hashPassword, "validatePassword").returns(true);
    const { isSuccess, user, message } = await userService.login(data);
    assert.ok("user" in user);
    assert.ok("token" in user);
    assert.deepStrictEqual(isSuccess, true);
    assert.deepStrictEqual(message, "User login successfully");
  });
});
