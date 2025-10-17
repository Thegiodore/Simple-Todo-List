import React, { useState, useEffect } from 'react';
import './App.css';

// Ensure this line uses the VITE_BACKEND_URL environment variable:
const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001/api/todos';

function App() {
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(true);

  // --- API Functions ---

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText.trim() })
      });
      const newTodo = await response.json();
      setTodos(prevTodos => [...prevTodos, newTodo]);
      setInputText('');
    } catch (error) {
      console.error("Failed to add todo:", error);
    }
  };

  const toggleTodo = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: 'PUT' });
      const updatedTodo = await response.json();
      
      setTodos(prevTodos => 
        prevTodos.map(todo => 
          todo.id === id ? updatedTodo : todo
        )
      );
    } catch (error) {
      console.error("Failed to toggle todo:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // --- Rendering Logic ---

  if (loading) return <div className="loading">Loading tasks...</div>;

  const todoTasks = todos.filter(t => !t.completed);
  const doneTasks = todos.filter(t => t.completed);

  const TaskItem = ({ todo }) => (
    <li className={`task-item ${todo.completed ? 'completed' : ''}`}>
      <input 
        type="checkbox" 
        checked={todo.completed} 
        onChange={() => toggleTodo(todo.id)} 
      />
      <span className="task-text">{todo.text}</span>
      <button onClick={() => deleteTodo(todo.id)} className="delete-btn">
        &times;
      </button>
    </li>
  );

  return (
    <div className="todo-container">
      <h1>Simple To-Do List</h1>
      
      <form onSubmit={addTodo} className="input-form">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Add a new task..."
        />
        <button type="submit">Add Task</button>
      </form>

      <section className="todo-section">
        <h2>TODO ({todoTasks.length})</h2>
        <ul className="task-list">
          {todoTasks.map(todo => <TaskItem key={todo.id} todo={todo} />)}
          {!todoTasks.length && <p className="empty-message">No tasks left to do!</p>}
        </ul>
      </section>

      <section className="done-section">
        <h2>DONE ({doneTasks.length})</h2>
        <ul className="task-list">
          {doneTasks.map(todo => <TaskItem key={todo.id} todo={todo} />)}
          {!doneTasks.length && <p className="empty-message">No completed tasks yet.</p>}
        </ul>
      </section>
    </div>
  );
}

export default App;