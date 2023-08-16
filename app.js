const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const Recipe = require("./models/Recipe.model");
const app = express();
const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());

// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION

mongoose
  .connect(MONGODB_URI)
  .then((db) => {
    console.log(`Connected to database, name: ${db.connections[0].name}`);
  })
  .catch((e) => console.log("error connecting to Mongo", e));

// ROUTES
//  GET  / route - This is just an example route
app.get("/", (req, res) => {
  res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});

//  Iteration 3 - Create a Recipe route
//  POST  /recipes route

//  Iteration 4 - Get All Recipes
//  GET  /recipes route

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route

// BONUS
//  Bonus: Iteration 9 - Create a Single User
//  POST  /users route

//  Bonus: Iteration 10 | Get a Single User
//  GET /users/:id route

//  Bonus: Iteration 11 | Update a Single User
//  GET /users/:id route

// Start the server
app.listen(3000, () => console.log("My first app listening on port 3000!"));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
