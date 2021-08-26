const sinon = require("sinon");
import * as assert from "assert";
import { resetStubAndSpys } from "../../../tests/testHelper";
import * as userMock from "../tests/mocks/user.mock";
import userService from "../services/user.services";
import userRepository from "../user.repository";

describe("User Service", () => {
  const sandBox = sinon.createSandbox();
  afterEach(() => {
    resetStubAndSpys([sandBox]);
  });

  it("#sign up  - failure (payload is empty)", async () => {
    const data = { name: "", email: "", password: "" };
    sandBox.stub(userRepository, "findOne").resolves(false);
    const { isSuccess, user } = await userService.createAccount(data);
    assert.deepStrictEqual(isSuccess, false);
    assert.deepStrictEqual(user, undefined);
  });

  it("#sign up  - failure (payload is empty) message return: 'User already registered'", async () => {
    const data = userMock.signUpMockRequest;
    sandBox.stub(userRepository, "findOne").resolves(true);
    const { isSuccess, user, message } = await userService.createAccount(data);
    assert.deepStrictEqual(isSuccess, false);
    assert.deepStrictEqual(user, undefined);
    assert.deepStrictEqual(message, "User already registered");
  });

  it("#sign up  - failure (payload is empty) message return: 'Unable to create user'", async () => {
    const data = userMock.signUpMockRequest;
    sandBox.stub(userRepository, "findOne").resolves(false);
    sandBox.stub(userRepository, "create").resolves(false);
    const { isSuccess, user, message } = await userService.createAccount(data);
    assert.deepStrictEqual(isSuccess, false);
    assert.deepStrictEqual(user, undefined);
    assert.deepStrictEqual(message, "Unable to create user");
  });

  it("#Sign up  - success", async () => {
    const data = userMock.signUpMockRequest;
    sandBox.stub(userRepository, "findOne").resolves(false);
    sandBox.stub(userRepository, "create").resolves(data);
    const { isSuccess, user, message } = await userService.createAccount(data);
    assert.ok("user" in user);
    assert.ok("token" in user);
    assert.deepStrictEqual(isSuccess, true);
    assert.deepStrictEqual(message, "User created successfully");
  });
});
