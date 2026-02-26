const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose")
const PORT = 5005;

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...
const cohorts = require("./cohorts.json")
const students = require("./students.json");
const studentModel = require("./models/student.model");
const cohortModel = require("./models/cohort.model")

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();


// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
app.use(cors({ origin: ["http://localhost:5173"] }));

app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

mongoose.connect('mongodb://localhost:27017/cohort-tools-api').
then(()=>{
  console.log("connected to db")
})
.catch ((err) =>console.log(err))

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...
app.get("/api/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

app.get("/api/cohorts", async (req, res)=>{
  try {
    const cohorts = await cohortModel.find()
    res.status(200).json(cohorts);
  }
  catch (err) {
    console.log(err)
    res.status(500).json(err)
  }; 
})

app.get("/api/students", async (req, res) => {
  try {
    const students = await studentModel.find()
    res.status(200).json(students);
  } catch (error) {
    console.log(err)
    res.status(500).json(err)
  }
})

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});