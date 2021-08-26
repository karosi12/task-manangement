const sinon = require("sinon");
const httpMocks = require("node-mocks-http");
import * as assert from "assert";
import { resetStubAndSpys } from "../../../tests/testHelper";
import * as userMocks from "./mocks/user.mock";
import userController from "../user.controller";
import userService from "../services/user.services";
import userRepository from "../user.repository";
import * as hashPassword from "../../shared/utils/hashPassword";

describe("User Controller", () => {
  const sandBox = sinon.createSandbox();
  afterEach(() => {
    resetStubAndSpys([sandBox]);
  });
  beforeEach(() => {
    resetStubAndSpys([sandBox]);
  });

  it("Create account  - invalid request : 400", async () => {
    const request = { body: {} };
    const response = httpMocks.createResponse();
    await userController.createAccount(request, response);
    const responseData = response._getData();
    assert.deepStrictEqual(response.statusCode, 400);
    assert.ok(Object.keys(responseData.message).length !== 0);
  });

  it("Create account  - Success : 200", async () => {
    const request = { body: userMocks.signUpMockRequest };
    const response = httpMocks.createResponse();
    sandBox.stub(userRepository, "findOne").resolves(false);
    sandBox
      .stub(userRepository, "create")
      .resolves(userMocks.signUpMockRequest);
    sandBox.stub(userService, "createAccount").resolves({
      isSuccess: true,
      user: { token: "23ddsd32)#@", user: userMocks.signUpMockRequest },
      message: "User created successfully",
    });
    await userController.createAccount(request, response);
    const responseData = response._getData();
    const { data } = responseData;
    assert.deepStrictEqual(response.statusCode, 201);
    assert.deepStrictEqual(responseData.message, "User created successfully");
    assert.ok("user" in data);
    assert.ok("token" in data);
  });

  it("Login  - Success : 200", async () => {
    const request = { body: userMocks.loginMockRequest };
    const response = httpMocks.createResponse();
    sandBox
      .stub(userRepository, "findOne")
      .resolves(userMocks.signUpMockRequest);
    sandBox.stub(hashPassword, "validatePassword").returns(true);
    await userController.login(request, response);
    const responseData = response._getData();
    const { data } = responseData;
    assert.deepStrictEqual(response.statusCode, 200);
    assert.deepStrictEqual(responseData.message, "User login successfully");
    assert.ok("user" in data);
    assert.ok("token" in data);
  });
});
