import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  addTodoRequest,
  deleteTodo,
  toggleTodo,
  editTodo,
  clearTodos,
} from './store'
import './App.css'

function App() {
  const [text, setText] = useState('')
  const [editId, setEditId] = useState(null)
  const [editText, setEditText] = useState('')

  const todos = useSelector((state) => state.todos.items)
  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!text.trim()) {
      return
    }

    dispatch(addTodoRequest(text.trim()))
    setText('')
  }

  const startEdit = (todo) => {
    setEditId(todo.id)
    setEditText(todo.text)
  }

  const saveEdit = (id) => {
    if (!editText.trim()) {
      return
    }

    dispatch(
      editTodo({
        id,
        text: editText.trim(),
      })
    )

    setEditId(null)
    setEditText('')
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

      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => dispatch(toggleTodo(todo.id))}
            />

            {editId === todo.id ? (
              <>
                <input
                  className="edit-input"
                  value={editText}
                  onChange={(event) =>
                    setEditText(event.target.value)
                  }
                />

                <button onClick={() => saveEdit(todo.id)}>
                  Зберегти
                </button>
              </>
            ) : (
              <>
                <span className={todo.completed ? 'completed' : ''}>
                  {todo.text}
                </span>

                <button onClick={() => startEdit(todo)}>
                  Редагувати
                </button>

                <button
                  className="delete"
                  onClick={() => dispatch(deleteTodo(todo.id))}
                >
                  Видалити
                </button>
              </>
            )}
          </li>
        ))}
      </ul>

      {todos.length > 0 && (
        <button
          className="clear"
          onClick={() => dispatch(clearTodos())}
        >
          Очистити список
        </button>
      )}
    </div>
  )
}

export default App