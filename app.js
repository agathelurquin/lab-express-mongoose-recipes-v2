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

app.post("/recipes", (req, res, next) => {
  const {
    title,
    instructions,
    level,
    ingredients,
    image,
    duration,
    isArchived,
    created,
  } = req.body;
  if (!title || !instructions) {
    // res.status(404);
    return res.json({
      message: "Please provide all required information: title, instructions",
    });
  }

  const newRecipe = {
    title,
    instructions,
    level,
    ingredients,
    image,
    duration,
    isArchived,
    created,
  };

  Recipe.create(newRecipe)
    .then((newDbEntry) =>
      res
        .status(201)
        .console.log(`Done ! PUT METHOD WORKS, added ${newDbEntry} to your db `)
    )
    .catch((e) => console.log("OUPS! :", e));
});

//  Iteration 4 - Get All Recipes

app.get("/recipes", async (req, res, next) => {
  console.log(req);
  try {
    const allRecipes = await Recipe.find();
    res.json(allRecipes);
  } catch (error) {
    console.log(error);
  }
});

//  Iteration 5 - Get a Single Recipe
app.get("/recipes/:id", (res, req, next) => {
  const recipeId = req.params.id;
  Recipe.findById(recipeId)
    .then((oneRecipe) => res.json(oneRecipe))
    .catch((e) => console.log(e));
});
//  Iteration 6 - Update a Single Recipe
app.put("/recipes/:id", (req, res, next) => {
  const recipeId = req.params.id;
  Recipe.findByIdAndUpdate(recipeId, req.body, { new: true }).then(
    res((updatedRecipe) => res.status(200).json(updatedRecipe)).catch((e) =>
      console.log(e)
    )
  );
});

//  Iteration 7 - Delete a Single Recipe
app.delete("recipes/:id", (req, res, next) => {
  const recipeId = req.params.id;
  Recipe.findByIdAndDelete(recipeId)
    .then(() => res.status(204).json({ message: `Recipe ${id} deleted` }))
    .catch((e) =>
      res.status(500).json({ message: "Error while deleting the recipe" })
    );
});
// BONUS
//  Bonus: Iteration 9 - Create a Single User
//  POST  /users route
app.post("/users");

//  Bonus: Iteration 10 | Get a Single User
//  GET /users/:id route

//  Bonus: Iteration 11 | Update a Single User
//  GET /users/:id route

// Start the server
app.listen(3000, () => console.log("My first app listening on port 3000!"));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
