const sinon = require("sinon");
const httpMocks = require("node-mocks-http");
import * as assert from "assert";
import { resetStubAndSpys } from "../../../tests/testHelper";
import * as taskMocks from "./mocks/task.mock";
import taskController from "../task.controller";
import taskService from "../services/task.services";
import taskRepository from "../task.repository";

describe("Task Controller", () => {
  const sandBox = sinon.createSandbox();
  afterEach(() => {
    resetStubAndSpys([sandBox]);
  });
  beforeEach(() => {
    resetStubAndSpys([sandBox]);
  });

  it("Create task  - invalid request : 400", async () => {
    const request = { body: {} };
    const response = httpMocks.createResponse();
    await taskController.createTask(request, response);
    const responseData = response._getData();
    assert.deepStrictEqual(response.statusCode, 400);
    assert.ok(Object.keys(responseData.message).length !== 0);
  });

  it("Create task  - Success : 200", async () => {
    const request = { body: taskMocks.createTaskMockRequest };
    const response = httpMocks.createResponse();
    sandBox
      .stub(taskRepository, "create")
      .resolves(taskMocks.createTaskMockRequest);
    sandBox.stub(taskService, "createTask").resolves({
      isSuccess: true,
      task: taskMocks.createTaskMockRequest,
      message: "Task created successfully",
    });
    await taskController.createTask(request, response);
    const responseData = response._getData();
    assert.deepStrictEqual(response.statusCode, 201);
    assert.deepStrictEqual(responseData.message, "Task created successfully");
  });

  it("Find task  - invalid request : 400", async () => {
    const request = { params: {} };
    const response = httpMocks.createResponse();
    await taskController.findTask(request, response);
    const responseData = response._getData();
    assert.deepStrictEqual(response.statusCode, 400);
    assert.ok(Object.keys(responseData.message).length !== 0);
    assert.deepStrictEqual(responseData.message.id, "task id is required");
  });

  it("Find task  - Success : 200", async () => {
    const request = { params: { id: "dummyid" } };
    const response = httpMocks.createResponse();
    sandBox
      .stub(taskRepository, "findOne")
      .resolves(taskMocks.createTaskMockRequest);
    await taskController.findTask(request, response);
    const responseData = response._getData();
    console.log("responseData ->", responseData);
    assert.deepStrictEqual(response.statusCode, 200);
    assert.deepStrictEqual(responseData.message, "Task retrieved successfully");
  });

  it("Update task  - invalid request : 400", async () => {
    const request = { params: {} };
    const response = httpMocks.createResponse();
    await taskController.updateTask(request, response);
    const responseData = response._getData();
    assert.deepStrictEqual(response.statusCode, 400);
    assert.ok(Object.keys(responseData.message).length !== 0);
    assert.deepStrictEqual(responseData.message.id, "task id is required");
  });

  it("Update task  - Success : 200", async () => {
    const request = {
      params: { id: "dummyid" },
      body: taskMocks.createTaskMockRequest,
    };
    const response = httpMocks.createResponse();
    sandBox
      .stub(taskRepository, "findOneAndUpdate")
      .resolves(taskMocks.createTaskMockRequest);
    await taskController.updateTask(request, response);
    const responseData = response._getData();
    assert.deepStrictEqual(response.statusCode, 200);
    assert.deepStrictEqual(responseData.message, "Task updated successfully");
  });

  it("Delete task  - invalid request : 400", async () => {
    const request = { params: {} };
    const response = httpMocks.createResponse();
    await taskController.deleteTask(request, response);
    const responseData = response._getData();
    assert.deepStrictEqual(response.statusCode, 400);
    assert.ok(Object.keys(responseData.message).length !== 0);
    assert.deepStrictEqual(responseData.message.id, "task id is required");
  });

  it("Delete task  - Success : 200", async () => {
    const request = { params: { id: "dummyid" } };
    const response = httpMocks.createResponse();
    sandBox
      .stub(taskRepository, "findByIdAndRemove")
      .resolves(taskMocks.createTaskMockRequest);
    await taskController.deleteTask(request, response);
    const responseData = response._getData();
    assert.deepStrictEqual(response.statusCode, 200);
    assert.deepStrictEqual(responseData.message, "Task deleted successfully");
  });
});
