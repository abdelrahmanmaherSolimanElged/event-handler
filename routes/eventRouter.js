const express = require("express");
const { body, param } = require("express-validator");
//
const controller = require("../controllers/eventController");
const validation = require("../utilities/validationMW");
const token = require("../utilities/cheekToken");

const eventRouter = express.Router();

eventRouter.use(token, (request, response, next) => {
  if (request.role == "admin") {
    next();
  } else {
    let error = new Error("not Authorizated");
    error.status = 422;
    next(error);
  }
});
