import * as faker from "faker";
const password = "RandomP330hs";

const signUpMockRequest = {
  email: faker.internet.email(),
  password: password,
  name: faker.name.firstName(),
};

export { signUpMockRequest };
