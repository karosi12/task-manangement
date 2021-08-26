import userRepository from "../user.repository";
import {
  generateHash,
  validatePassword,
} from "../../shared/utils/hashPassword";
import { generateJWT } from "../../shared/utils/generateToken";
/**
 * Create user
 * @param data
 * @returns
 */
const createAccount = async (data) => {
  try {
    const { email, password } = data;
    let emailExist = await userRepository.findOne({ email });
    if (emailExist) {
      return {
        isSuccess: false,
        message: "User already registered",
      };
    }
    data.password = generateHash(password);
    const user = await userRepository.create(data);
    if (!user) {
      return {
        isSuccess: false,
        message: "Unable to create user",
      };
    }
    const responseData = { user, token: generateJWT(user) };
    return {
      isSuccess: true,
      user: responseData,
      message: "User created successfully",
    };
  } catch (error) {
    return { isSuccess: false, message: error.message };
  }
};

/**
 * Login user
 * @param data
 * @returns
 */
const login = async (data) => {
  try {
    const { email, password } = data;
    let user = await userRepository.findOne({ email });
    if (!user) {
      return {
        isSuccess: false,
        message: "Invalid credentials",
      };
    }
    const passwordCheck = validatePassword(password, user.password);
    if (!passwordCheck) {
      return {
        isSuccess: false,
        message: "Invalid credentials",
      };
    }
    const responseData = { user, token: generateJWT(user) };
    return {
      isSuccess: true,
      user: responseData,
      message: "User login successfully",
    };
  } catch (error) {
    return { isSuccess: false, message: error.message };
  }
};

export default { createAccount, login };
