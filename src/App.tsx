import React, { useState, useEffect, useCallback } from 'react';

function App() {
  const [todos, setTodos] = useState<string[]>([]);
  const [newTodo, setNewTodo] = useState('');

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  }, []);

  const addTodo = useCallback(() => {
    if (newTodo.trim()) {
      setTodos((prevTodos) => [...prevTodos, newTodo.trim()]);
      setNewTodo('');
    }
  }, [newTodo]);

  const removeTodo = useCallback((index: number) => {
    setTodos((prevTodos) => prevTodos.filter((_, i) => i !== index));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        addTodo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [addTodo]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>Todo List</h1>
      <div style={{ display: 'flex', marginBottom: '1rem' }}>
        <input
          type="text"
          value={newTodo}
          onChange={handleInputChange}
          style={{ padding: '0.5rem', marginRight: '0.5rem' }}
        />
        <button onClick={addTodo} style={{ padding: '0.5rem' }}>
          Add Todo
        </button>
      </div>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {todos.map((todo, index) => (
          <li key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ marginRight: '0.5rem' }}>{todo}</span>
            <button onClick={() => removeTodo(index)} style={{ padding: '0.25rem' }}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;