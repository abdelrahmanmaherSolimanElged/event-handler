//require area
/****************node package*******************/
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
/****************my modules*******************/
const studentRouter = require("./routes/studentRouter");
const speakerRouter = require("./routes/speakerRouter");

//end require area
//create express server, then open the server on port number 8080
//creat the server
const server = express();

//mongoose connection to mongo server
//connect(url) it's a promise
mongoose
  .connect("mongodb://127.0.0.1:27017/EventSystemDB")
  .then(() => {
    console.log("connected to data base");
    //set port and start listen
    server.listen(process.env.PORT || 8080, () => {
      console.log("I am lisninng on port number 8080");
    });
  })
  .catch((error) => console.log("Db Connection Error " + error));

//MW print method and url
server.use(morgan(":method :url"));

//parsing requist
server.use(express.json());
//routes
server.use(studentRouter);
server.use(speakerRouter);

//end routes

//Not FoundMW==>404
server.use((request, response) => {
  response.status(404).json({ message: "Not Found" });
});

// Error MW==>server crashed
server.use((error, request, response, next) => {
  let status = error.status || 500;
  response.status(status).json({ message: "Internal Error" + error });
});
