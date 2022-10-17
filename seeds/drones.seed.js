// Iteration #1
const dronesArr = require("./drone.seed.json")

require("../db/index.js")

const Drone = require("../models/Drone.model.js");
const { default: mongoose } = require("mongoose");

Drone.insertMany(dronesArr)
.then(() => {
    console.log("drones añadidos");
})
.catch((err) => {
    console.log(err);
})

mongoose.connection.close(function () {
    console.log('Mongoose default connection closed');
  });