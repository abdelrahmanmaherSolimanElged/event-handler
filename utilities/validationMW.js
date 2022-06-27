const { validationResult } = require("express-validator");
//collect all error message from validation and throw it to error midelWare
module.exports = (request, response, next) => {
  let result = validationResult(request);
  if (!result.isEmpty()) {
    let errorMessage = result.errors.reduce(
      (current, error) => current + error.msg + " ",
      ""
    );
    let error = new Error(errorMessage);
    error.status = 422;
    throw error;
  } else next();
};
