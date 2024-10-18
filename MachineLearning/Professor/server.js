const express = require("express");
const connectDB = require("./config/db");
const Professor = require("./models/Professor"); // Import your Professor model

const app = express();

// Middleware to parse incoming JSON
app.use(express.json());

// Connect to the Database
connectDB();

// Define a route to handle POST requests from the scraper
app.post("/api/professors", async (req, res) => {
  try {
    const { professor_name, rating, department, comments } = req.body;

    // Create a new Professor document
    const newProfessor = new Professor({
      professor_name,
      rating,
      department,
      comments,
    });

    // Save the professor to the database
    await newProfessor.save();

    // Send a response to the client
    res.status(201).json({ message: "Professor data successfully saved" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
