import { model, Model } from "mongoose";
import { userDBSchema } from "../../database/schemas/user";

userDBSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

const userRepository = model("User", userDBSchema);

export default userRepository;
