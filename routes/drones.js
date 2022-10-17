const express = require("express");
const { format } = require("morgan");
const router = express.Router();
const Drone = require("../models/Drone.model.js");

router.get("/", (req, res, next) => {
  // Iteration #2: List the drones
  Drone.find()
    .then((response) => {
      res.render("drones/list.hbs", {
        droneList: response,
      });
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/drones/create", (req, res, next) => {
  // Iteration #3: Add a new drone
  res.render("drones/create-form.hbs");
});

router.post("/drones/create", (req, res, next) => {
  // Iteration #3: Add a new drone
  const droneToAdd = {
    name: req.body.name,
    propellers: req.body.propellers,
    maxSpeed: req.body.maxSpeed,
  };
  Drone.create(droneToAdd)
    .then((response) => {
      console.log("dron añadido");
      res.redirect("/drones");
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/drones/:id/edit", (req, res, next) => {
  // Iteration #4: Update the drone
  let { id } = req.params;

  Drone.findById(id)
    .then((response) => {
      res.render("drones/update-form.hbs", {
        droneUpdate: response,
      });
    })
    .catch((error) => {
      next(error);
    });
});

router.post("/drones/:id/edit", (req, res, next) => {
  // Iteration #4: Update the drone
  const {id} = req.params
  const {name, propellers, maxSpeed} =req.body

  Drone.findByIdAndUpdate(id, {
    name,
    propellers,
    maxSpeed
  })
  .then((response) => {
    res.redirect("/drones")
  })
  .catch((err) => {
    next(err)
  })
});

router.post("/drones/:id/delete", (req, res, next) => {
  // Iteration #5: Delete the drone
  const {id} = req.params
  Drone.findByIdAndDelete(id)
  .then(() =>{
    res.redirect("/drones")
  })
  .catch((err) => {
    next(err)
  })
});

module.exports = router;
