//require area
const express = require("express");
const { body, param } = require("express-validator");
//
const controller = require("../controllers/studentController");
const validation = require("../utilities/validationMW");
//end require area
const studentRouter = express.Router();
studentRouter.post(
  "/student/register",
  [
    body("fullname")
      .isAlpha("en-US", { ignore: " " })
      .withMessage("student's name should be characters"),
    body("password").isString().withMessage("invalid student's password"),
    body("email").isEmail().withMessage("invalid student's email"),
  ],
  validation,
  controller.createNewStudent
);
studentRouter.post(
  "/speaker/login",
  [
    body("password").isString().withMessage("invalid speaker's password"),
    body("email").isEmail().withMessage("invalid speaker's email"),
  ],
  validation,
  controller.getLoginStudent
);
///
module.exports = studentRouter;
