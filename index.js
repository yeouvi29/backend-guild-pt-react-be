import express from "express";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import cors from "cors";

// initialize configuration for dotenv to use .env file
dotenv.config();

// create a new express application
const app = express();
const port = process.env.PORT || 8000;
const clientURL = process.env.CLIENT_URL;
let db;

// connect to the database
const startDatabase = async () => {
  try {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    db = client.db("web_app");
    console.log("Connected to the database");
  } catch (error) {
    console.error("Error connecting to the database", error);
  }
};

startDatabase();
// enable cors
app.use(
  cors({
    origin: clientURL,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
// enable parsing of json objects in the request body
app.use(express.json());

// get all todos from the database
app.get("/api/todos", async (req, res) => {
  if (!db) {
    res.status(500).send({ message: "Error fetching todos from the database" });
    return;
  }

  const todos = await db.collection("todos").find({}).toArray();

  res.status(200).send(todos);
});

// delete a todo from the database
app.delete("/api/todos/:id", async (req, res) => {
  if (!db) {
    res.status(500).send({ message: "Error connecting to the database" });
    return;
  }

  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).send({ message: "Todo id is required." });
      retur;
      n;
    }
    const todos = db.collection("todos");
    await todos.deleteOne({ id: id });

    res.status(200).send({ message: "Todo is deleted successfully." });
  } catch (error) {
    res.status(500).send({ message: "Error deleting todo." });
  }
});

// update a todo in the database
app.put("/api/todos/:id", async (req, res) => {
  if (!db) {
    res.status(500).send({ message: "Error connecting to the database" });
    return;
  }

  try {
    const { id } = req.params;
    const { completed } = req.body;

    if (!id) {
      res.status(400).send({ message: "Todo id is required." });
      return;
    }

    const todos = db.collection("todos");
    await todos.findOneAndUpdate({ id }, { $set: { completed } });

    res.status(200).send({ message: "Todo is updated successfully." });
  } catch (error) {
    res.status(500).send({ message: "Error updating todo." });
  }
});

// add a new todo to the database
app.post("/api/todos", async (req, res) => {
  if (!db) {
    res.status(500).send({ message: "Error connecting to the database" });
    return;
  }

  try {
    const { todo } = req.body;

    if (!todo) {
      res.status(400).send({ message: "Todo is required." });
      return;
    }

    const todos = db.collection("todos");
    await todos.insertOne({ ...todo });

    res.status(200).send({ message: "Todo is added successfully." });
  } catch (error) {
    res.status(500).send({ message: "Error adding todo." });
  }
});

// start the server
app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
