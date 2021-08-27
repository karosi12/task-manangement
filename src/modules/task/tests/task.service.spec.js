const sinon = require("sinon");
import * as assert from "assert";
import { resetStubAndSpys } from "../../../tests/testHelper";
import * as taskMock from "./mocks/task.mock";
import taskService from "../services/task.services";
import taskRepository from "../task.repository";

describe("Task service", () => {
  const sandBox = sinon.createSandbox();
  afterEach(() => {
    resetStubAndSpys([sandBox]);
  });

  it("#Create task - failure (payload is empty)", async () => {
    const data = {};
    sandBox.stub(taskRepository, "create").resolves(false);
    const { isSuccess, task, message } = await taskService.createTask(data);
    assert.deepStrictEqual(isSuccess, false);
    assert.deepStrictEqual(task, undefined);
    assert.deepStrictEqual(message, "Unable to create task");
  });

  it("#Create task - success (message return: Task created successfully)", async () => {
    const data = taskMock.createTaskMockRequest;
    sandBox.stub(taskRepository, "create").resolves(data);
    const { isSuccess, task, message } = await taskService.createTask(data);
    assert.deepStrictEqual(isSuccess, true);
    assert.deepStrictEqual(task, data);
    assert.deepStrictEqual(message, "Task created successfully");
  });

  it("#Find task - failure (task not found)", async () => {
    const data = {};
    sandBox.stub(taskRepository, "findOne").returns({ populate: () => false });
    const { isSuccess, task, message } = await taskService.findTask(data);
    assert.deepStrictEqual(isSuccess, false);
    assert.deepStrictEqual(task, undefined);
    assert.deepStrictEqual(message, "task not found");
  });

  it("#Find task - success (message return: Task retrieved successfully)", async () => {
    const data = {
      title: "Tasty",
      desciption: "Borders Group mobile",
      timeTaskShouldBeDoneInMinutes: 40,
      reminder: 20,
      userId: "606594de9a2f2b23a8b163e5",
    };
    sandBox.stub(taskRepository, "findOne").returns({ populate: () => data });
    const { isSuccess, task, message } = await taskService.findTask(data);
    assert.deepStrictEqual(isSuccess, true);
    assert.deepStrictEqual(task, data);
    assert.deepStrictEqual(message, "Task retrieved successfully");
  });

  it("#Update task - failure (task not found)", async () => {
    const data = {};
    sandBox.stub(taskRepository, "findOneAndUpdate").resolves(false);
    const { isSuccess, task, message } = await taskService.updateTask(data);
    assert.deepStrictEqual(isSuccess, false);
    assert.deepStrictEqual(task, undefined);
    assert.deepStrictEqual(message, "task not found");
  });

  it("#Update task - success (message return: Task updated successfully)", async () => {
    const data = {
      title: "Tasty",
      desciption: "Borders Group mobile",
      timeTaskShouldBeDoneInMinutes: 40,
      reminder: 20,
      userId: "606594de9a2f2b23a8b163e5",
    };
    sandBox.stub(taskRepository, "findOneAndUpdate").resolves(data);
    const { isSuccess, task, message } = await taskService.updateTask(data);
    assert.deepStrictEqual(isSuccess, true);
    assert.deepStrictEqual(task, data);
    assert.deepStrictEqual(message, "Task updated successfully");
  });

  it("#Deleted task - failure (task not deleted)", async () => {
    const data = {};
    sandBox.stub(taskRepository, "findByIdAndRemove").resolves(false);
    const { isSuccess, task, message } = await taskService.deleteTask(data);
    assert.deepStrictEqual(isSuccess, false);
    assert.deepStrictEqual(task, undefined);
    assert.deepStrictEqual(message, "task not deleted");
  });

  it("#Deleted task - success (message return: Task deleted successfully)", async () => {
    const data = {
      title: "Tasty",
      desciption: "Borders Group mobile",
      timeTaskShouldBeDoneInMinutes: 40,
      reminder: 20,
      userId: "606594de9a2f2b23a8b163e5",
    };
    sandBox.stub(taskRepository, "findByIdAndRemove").resolves(data);
    const { isSuccess, task, message } = await taskService.deleteTask(data);
    assert.deepStrictEqual(isSuccess, true);
    assert.deepStrictEqual(task, {});
    assert.deepStrictEqual(message, "Task deleted successfully");
  });
});
