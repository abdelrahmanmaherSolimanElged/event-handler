//require area
const express = require("express");
const { body, param } = require("express-validator");
//
const controller = require("../controllers/speakerController");
const validation = require("../utilities/validationMW");
//end require area
const speakerRouter = express.Router();

//register
speakerRouter.post(
  "/speaker/register",
  [
    body("fullname")
      .isAlpha("en-US", { ignore: " " })
      .withMessage("speaker's name should be characters"),
    body("password").isString().withMessage("invalid speaker's password"),
    body("city").isString().withMessage("invalid speaker's address"),

    body("street").isString().withMessage("invalid speaker's address"),
    body("building").isString().withMessage("invalid speaker's address"),
    body("role")
      .isAlphanumeric()
      .isIn(["admin", "speaker"])
      .withMessage("speaker's role should be characters"),
    body("email").isEmail().withMessage("invalid speaker's email"),
  ],
  validation,
  controller.createNewSpeaker
);
speakerRouter.post(
  "/speaker/login",
  [
    body("password").isString().withMessage("invalid speaker's password"),
    body("email").isEmail().withMessage("invalid speaker's email"),
  ],
  validation,
  controller.getLoginSpeaker
);
module.exports = speakerRouter;
