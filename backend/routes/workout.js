const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");
const {
  createWorkout,
  getWorkouts,
  getSingleWorkouts,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/workoutController");

//Require auth for all the workout routes
router.use(requireAuth)
//GET all data
router.get("/", getWorkouts);

//GET specific data
router.get("/:id", getSingleWorkouts);

//POST a data
router.post("/", createWorkout);

//UPDATE a data
router.patch("/:id", updateWorkout);

//DELETE a data
router.delete("/:id", deleteWorkout);

module.exports = router;
