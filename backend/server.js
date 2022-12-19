// NPM install mongoose dotenv cors nodemon express

require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const workoutRoutes = require("./routes/workout");
const app = express();

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
//Middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//Routes
app.use("/api/workouts", workoutRoutes);

//Connect to DB
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGOOSE_URI)
  .then(() => {
    //Listen
    app.listen(process.env.PORT, () => {
      console.log(
        `Connected to the db and also listening on port ${process.env.PORT}`
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });
