import express from "express";
import ViteExpress from "vite-express";

import { students } from "./data.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to express app!");
});

app.get('/students', (req, res) => {
  res.json({
    data: students
  });
});

app.get('/students/:id', (req, res) => {
  const id = req.params.id;
  const student = students.find(student => student.id == id);

  if(student) {
    return res.json({data: student});
  }
  else {
    return res.status(404).json({error: 'Student not found!'});
  }
});

app.post('/students', (req, res) => {
  const student = req.body;
  students.push({id:students.length + 1, ...student});
  res.json({data: students});
});

app.put('/students/:id', (req, res) => {
  const id = req.params.id;
  const student = req.body;
  const existing = students.find(student => student.id == id);

  if(existing) {
    const updatedStudents = students.map(item => {
      if(item.id == id) {
        return {...item, ...student};
      }
      return item;
    })
    return res.json({data: updatedStudents});
  }
  else {
    return res.status(404).json({error: 'Student not found!'});
  }
});

app.delete('/students/:id', (req, res) => {
  const id = req.params.id;
  const student = students.find(student => student.id == id);

  if(student) {
    const updatedStudents = students.filter(item => item.id != id);
    return res.json({data: updatedStudents});
  }
  else {
    return res.status(404).json({error: 'Student not found!'});
  }
});

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000..."),
);
