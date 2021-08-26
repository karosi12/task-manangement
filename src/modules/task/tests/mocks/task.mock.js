import * as faker from "faker";

const createTaskMockRequest = {
  title: faker.random.word(),
  description: faker.random.words(),
  timeTaskShouldBeDoneInMinutes: 40,
  reminder: 20,
  userId: "606594de9a2f2b23a8b163e5",
};

export { createTaskMockRequest };
