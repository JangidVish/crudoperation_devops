require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const PORT = 8080;

//Addition OF Parser Json
app.use(bodyParser.json());

//Mongoose COnnnect
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Bhai apka mongodb connect ho chuka hain");
  })
  .catch((e) => {
    console.log("Error agaya: " + e);
  });

//Create a Schema

const todoSchema = new mongoose.Schema({
  title: String,
  completed: Boolean,
});

const Todo = mongoose.model("Todo", todoSchema);

app.get("/", (req, res) => {
  res.send("Deploy Successful Ho gaya hain bhaiyo ye final check hain");
});

//Create a new todo
app.post("/todos", async (req, res) => {
  const newTodo = new Todo(req.body);
  await newTodo.save();
  res.json(newTodo);
});

//Get a todo list Read
app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

//Update a todo entry  Update Operation
app.put("/todos/:id", async (req, res) => {
  const id = req.params.id;
  const updatedTodo = await Todo.findByIdAndUpdate(id, req.body, { new: true });
  res.json(updatedTodo);
});

//Delete Operation
app.delete("/todos/:id", async (req, res) => {
  const id = req.params.id;
  const todo = await Todo.findByIdAndDelete(id);
  res.json(todo);
});

// app.get("/", (req, res) => {
//   return res.json({ message: "THE GET API IS RUNNIG" });
// });

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
