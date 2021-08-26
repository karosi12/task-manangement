const responses = {
  /**
   * @description A function to return a success object or response
   */
    success: (statusCode, message, data) => {
      const successMessage = {
        success: true,
        statusCode,
        message,
        data,
      };
      return successMessage;
    },
  /**
   * @description A function to return an error object or response
   */
    error: (statusCode, message) => {
      const errorMessage = {
        error: true,
        statusCode,
        message,
      };
      return errorMessage;
    },
  /**
   * @description A function to return a list of object
   */
    output: (statusCode, message, data, meta = {}) => {
      const outputMessage = {
        error: false,
        statusCode,
        message,
        data,
        meta,
      };
      return outputMessage;
    },
  };
  export default responses;