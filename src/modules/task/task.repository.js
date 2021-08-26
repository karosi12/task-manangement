import { model } from "mongoose";
import { taskDBSchema } from "../../database/schemas/task";

const taskRepository = model("Task", taskDBSchema);

export default taskRepository;
