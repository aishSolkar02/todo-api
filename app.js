const express = require('express');
const app = express();
const PORT = 3000;
let todos = require('./data');

app.use(express.json());

// GET all todos
app.get('/todos', (req, res) => {
  res.json(todos);
});

// GET a single todo
app.get('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(t => t.id === id);
  if (todo) {
    res.json(todo);
  } else {
    res.status(404).json({ message: "Todo not found" });
  }
});

// POST a new todo
app.post('/todos', (req, res) => {
  const newTodo = {
    id: todos.length + 1,
    task: req.body.task
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// PUT to update a todo
app.put('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex(t => t.id === id);
  if (index !== -1) {
    todos[index].task = req.body.task;
    res.json(todos[index]);
  } else {
    res.status(404).json({ message: "Todo not found" });
  }
});

// DELETE a todo
app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.filter(t => t.id !== id);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
