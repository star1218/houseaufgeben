import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'

function Home() {
  const [task, setTask] = useState('')
  const [todos, setTodos] = useState([])

  const addTodo = (event) => {
    event.preventDefault()

    if (task.trim() === '') {
      return
    }

    setTodos([...todos, task])
    setTask('')
  }

  return (
    <main className="page">
      <h1>Головна</h1>

      <div className="todo">
        <h2>TODO List</h2>

        <form onSubmit={addTodo}>
          <input
            type="text"
            value={task}
            onChange={(event) => setTask(event.target.value)}
            placeholder="Введіть завдання"
          />

          <button type="submit">Додати</button>
        </form>

        <ul>
          {todos.map((todo, index) => (
            <li key={index}>{todo}</li>
          ))}
        </ul>
      </div>
    </main>
  )
}

function Contacts() {
  return (
    <main className="page">
      <h1>Контакти</h1>
      <p>Email: example@gmail.com</p>
      <p>Телефон: +380 00 000 00 00</p>
    </main>
  )
}

function About() {
  return (
    <main className="page">
      <h1>Про мене</h1>
      <p>
        Це навчальний SPA-додаток, створений за допомогою React та Vite.
      </p>
    </main>
  )
}

function App() {
  const [darkTheme, setDarkTheme] = useState(false)

  return (
    <BrowserRouter>
      <div className={darkTheme ? 'app dark' : 'app'}>
        <header>
          <nav>
            <Link to="/">Головна</Link>
            <Link to="/contacts">Контакти</Link>
            <Link to="/about">Про мене</Link>
          </nav>

          <button
            className="theme-button"
            onClick={() => setDarkTheme(!darkTheme)}
          >
            {darkTheme ? 'Світла тема' : 'Темна тема'}
          </button>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App