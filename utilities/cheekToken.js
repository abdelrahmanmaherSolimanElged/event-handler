const jwt = require("jsonwebtoken");
const { request } = require("express");
module.exports = (request, response, next) => {
  try {
    let token = request.get("Authorization").split(" ")[1];
    let unEncrpted = jwt.verify(token, "my speaker");
  } catch (err) {
    err.massage = "not Authorizated";
    err.status = 403;
    next(err);
  }
  request.role = unEncrpted.role;
  request.id = unEncrpted.id;
  next();
};
