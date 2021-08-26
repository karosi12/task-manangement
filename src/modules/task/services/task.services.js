import taskRepository from "../task.repository";

/**
 * Create task
 * @param data
 * @returns
 */
const createTask = async (data) => {
  try {
    const task = await taskRepository.create(data);
    if (!task) {
      return {
        isSuccess: false,
        message: "Unable to create task",
      };
    }
    return {
      isSuccess: true,
      task,
      message: "Task created successfully",
    };
  } catch (error) {
    return { isSuccess: false, message: error.message };
  }
};

/**
 * Find task
 * @param param
 * @returns
 */
const findTask = async (param) => {
  try {
    const { id } = param;
    let task = await taskRepository.findOne({ _id: id });
    if (!task) {
      return {
        isSuccess: false,
        message: "task not found",
      };
    }
    return {
      isSuccess: true,
      task,
      message: "Task retrieved successfully",
    };
  } catch (error) {
    return { isSuccess: false, message: error.message };
  }
};

/**
 * Update task
 * @param param
 * @returns
 */
const updateTask = async (param) => {
  try {
    const { id, ...updateData } = param;
    let task = await taskRepository.findOneAndUpdate({ _id: id }, updateData, {
      new: true,
    });
    if (!task) {
      return {
        isSuccess: false,
        message: "task not found",
      };
    }
    return {
      isSuccess: true,
      task,
      message: "Task updated successfully",
    };
  } catch (error) {
    return { isSuccess: false, message: error.message };
  }
};

/**
 * Delete task
 * @param param
 * @returns
 */
const deleteTask = async (param) => {
  try {
    const { id } = param;
    let task = await taskRepository.findByIdAndRemove({ _id: id });
    if (!task) {
      return {
        isSuccess: false,
        message: "task not deleted",
      };
    }
    return {
      isSuccess: true,
      task: {},
      message: "Task deleted successfully",
    };
  } catch (error) {
    return { isSuccess: false, message: error.message };
  }
};

export default { createTask, findTask, updateTask, deleteTask };
