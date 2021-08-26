import { Schema } from "mongoose";

const user = {
  name: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: false,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
};

const userDBSchema = new Schema(user, { timestamps: true });
export { userDBSchema };
