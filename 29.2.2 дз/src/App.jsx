import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo } from './store'
import './App.css'

function App() {
  const [text, setText] = useState('')
  const todos = useSelector((state) => state.todos.items)
  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!text.trim()) {
      return
    }

    dispatch(addTodo(text.trim()))
    setText('')
  }

  return (
    <div className="app">
      <h1>TODO List</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Введіть завдання"
        />

        <button type="submit">Додати</button>
      </form>

      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>

      <div className="total">
        Всього: {todos.length}
      </div>
    </div>
  )
}

export default App