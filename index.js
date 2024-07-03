const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userModel = require("./model/user");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = 5000;

mongoose
  .connect("mongodb://localhost:27017/crud")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.get("/getData", (req, res) => {
  userModel
    .find()
    .then((data) => res.send(data))
    .catch((err) => res.status(500).json({ error: err.message }));
});

app.post("/create", (req, res) => {
  const { name, email, age } = req.body;
  userModel
    .create({ name, email, age })
    .then((res1) => res.status(201).json(res1))
    .catch((err) => res.json(err));
});

app.put("/:id/update", (req, res) => {
  const { id } = req.params;
  const { name, email, age } = req.body;
  userModel
    .findByIdAndUpdate({ _id: id }, { name, email, age })
    .then((res2) => res.status(200).json(res2))
    .catch((err) => res.status(500).json(err));
});

app.delete("/:id/delete", (req, res) => {
  const { id } = req.params;
  userModel
    .findByIdAndDelete({ _id: id })
    .then((res5) => res.status(200).json(res5))
    .catch((err) => res.status(500).json(err));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
