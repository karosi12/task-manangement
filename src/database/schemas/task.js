import { Schema } from "mongoose";

const task = {
  title: {
    type: String,
    required: true,
    trim: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: false,
    trim: true,
  },
  timeTaskShouldBeDoneInMinutes: {
    type: Number,
    required: true,
  },
  reminder: {
    type: Number,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
};

const taskDBSchema = new Schema(task, { timestamps: true });
export { taskDBSchema };
