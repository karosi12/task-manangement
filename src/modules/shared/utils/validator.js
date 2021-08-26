const validate = (schema, data) => {
  data = data == null ? {} : data;
  const validateOptions = {
      abortEarly: false,
      converse: true,
      stripUnknown: true,
    },
    { error, value } = schema.validate(data, validateOptions),
    errors = error ? formatErrors(error.details) : false;
  return { data: value, errors };
},
formatErrors = (errors) => {
  const formattedErrors = {};
  for (const err of errors) {
    const message = err.message.replace(/"/g, '');
    formattedErrors[err.context.key] = message;
  }
  return formattedErrors;
};

export default validate;
