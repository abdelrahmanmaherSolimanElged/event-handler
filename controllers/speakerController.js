//require
const Speaker = require("../modules/Speaker");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//end require
//create student by registre
module.exports.createNewSpeaker = (request, response, next) => {
  //   console.log(request.body);
  let object = new Speaker({
    fullname: request.body.fullname,
    email: request.body.email,
    role: request.body.role,
    "address.city": request.body.city,
    "address.street": request.body.street,
    "address.building": request.body.building,
  });
  bcrypt.genSalt(10, function (saltError, salt) {
    if (saltError) {
      throw saltError;
    } else {
      bcrypt.hash(request.body.password, salt, function (hashError, hash) {
        if (hashError) {
          throw hashError;
        } else {
          object.password = hash;
        }
      });
    }
  });

  object
    .save()
    .then(() => {
      response.status(201).json({ data: "added" });
    })
    .catch((error) => next(error));
};

module.exports.getLoginSpeaker = (request, response, next) => {
  Speaker.findOne({ email: request.body.email })
    .then((data) => {
      if (data) {
        bcrypt
          .compare(request.body.password, data.password)
          .then(() => {
            let token = jwt.sign(
              {
                id: data._id,
                role: data.role,
              },
              "my speaker",
              { expiresIn: "1h" }
            );
            response.status(200).json({ token, msg: "hi" });
          })
          .catch(() => {
            const name = new Error("username or password in correct");
            name.status = 401;
            throw name;
          });
      } else {
        const name = new Error("username or password in correct");
        name.status = 401;
        throw name;
      }
    })
    .catch((error) => next(error));
};
