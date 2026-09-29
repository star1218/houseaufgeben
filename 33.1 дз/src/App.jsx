import { useState } from 'react'
import './App.css'

function App() {
  const [text, setText] = useState('')
  const [todos, setTodos] = useState([])
  const [error, setError] = useState('')

  const addTodo = (event) => {
    event.preventDefault()

    if (!text.trim()) {
      setError('Введіть завдання')
      return
    }

    setTodos([
      ...todos,
      {
        id: Date.now(),
        text: text.trim(),
      },
    ])

    setText('')
    setError('')
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  return (
    <div className="app">
      <h1>TODO</h1>

      <form onSubmit={addTodo}>
        <input
          type="text"
          placeholder="Введіть завдання"
          value={text}
          onChange={(event) => setText(event.target.value)}
        />

        <button type="submit">
          Додати
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span>{todo.text}</span>

            <button onClick={() => deleteTodo(todo.id)}>
              Видалити
            </button>
          </li>
        ))}
      </ul>

      <p>Всього: {todos.length}</p>
    </div>
  )
}

export default App