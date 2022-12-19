const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");

//GET all data

const getWorkouts = async (req, res) => {
  const workouts = await Workout.find({}).sort({ createdAt: -1 });

  res.status(200).json(workouts);
};

//GET specific data
const getSingleWorkouts = async (req, res) => {
  const { id } = req.params;
  const workout = await Workout.findById(id);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such data" });
  }
  if (!workout) {
    return res.status(404).json({
      error: "No such data",
    });
  }
  res.status(200).json(workout);
};

//POST a data
const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;

  //Add doc to DB collection
  try {
    const workout = await Workout.create({ title, load, reps });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//UPDATE a data
const updateWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such data" });
  }

  const workout = await Workout.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!workout) {
    return res.status(404).json({
      error: "No such data",
    });
  }
  res.status(200).json(workout);
};
//DELETE a data
const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such data" });
  }

  const workout = await Workout.findOneAndDelete({ _id: id });

  if (!workout) {
    return res.status(404).json({
      error: "No such data",
    });
  }
  res.status(200).json(workout);
};

module.exports = {
  createWorkout,
  getWorkouts,
  getSingleWorkouts,
  deleteWorkout,
  updateWorkout,
};
