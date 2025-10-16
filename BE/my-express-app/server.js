const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Global array to store tasks (in-memory database)
let todos = [
    { id: 1, text: "Set up Express API", completed: true },
    { id: 2, text: "Create React components", completed: false }
];
let nextId = 3;

// Middleware
app.use(cors()); // Allow cross-origin requests from the front-end
app.use(express.json()); // Enable reading JSON body from requests

// --- API Endpoints ---

// 1. GET: Fetch all To-Dos
app.get('/api/todos', (req, res) => {
    res.json(todos);
});

// 2. POST: Add a new To-Do
app.post('/api/todos', (req, res) => {
    const newTodo = {
        id: nextId++,
        text: req.body.text,
        completed: false
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// 3. PUT: Toggle 'completed' status
app.put('/api/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find(t => t.id === id);

    if (todo) {
        todo.completed = !todo.completed;
        res.json(todo);
    } else {
        res.status(404).send('Task not found');
    }
});

// 4. DELETE: Remove a To-Do
app.delete('/api/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const initialLength = todos.length;
    
    // Filter out the task with the given ID
    todos = todos.filter(t => t.id !== id);

    if (todos.length < initialLength) {
        res.status(204).send(); // No Content, successful deletion
    } else {
        res.status(404).send('Task not found');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});