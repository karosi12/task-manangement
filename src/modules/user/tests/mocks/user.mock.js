import * as faker from "faker";
const password = "RandomP330hs";

const signUpMockRequest = {
  email: faker.internet.email(),
  password: password,
  confirmPassword: password,
  name: faker.name.firstName(),
};

const loginMockRequest = {
  email: faker.internet.email(),
  password: password,
};

export { signUpMockRequest, loginMockRequest };
