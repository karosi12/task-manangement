import { Schema } from "mongoose";

const task = {
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: false,
    trim: true,
  },
  taskTime: {
    type: Date,
    required: true,
  },
  notificationTime: {
    type: Date,
    required: true,
  },
};

const taskDBSchema = new Schema(task, { timestamps: true });
export { taskDBSchema };
