import { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])

  const validate = (values) => {
    const errors = {}

    if (!values.todo.trim()) {
      errors.todo = 'Введіть завдання'
    } else if (values.todo.trim().length < 5) {
      errors.todo = 'Мінімальна довжина завдання — 5 символів'
    }

    return errors
  }

  return (
    <div className="app">
      <h1>TODO List</h1>

      <Formik
        initialValues={{ todo: '' }}
        validate={validate}
        onSubmit={(values, { resetForm }) => {
          setTodos([...todos, values.todo.trim()])
          resetForm()
        }}
      >
        <Form className="todo-form">
          <Field
            type="text"
            name="todo"
            placeholder="Введіть завдання"
          />

          <button type="submit">Додати</button>

          <ErrorMessage
            name="todo"
            component="div"
            className="error"
          />
        </Form>
      </Formik>

      <ul className="todo-list">
        {todos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>
    </div>
  )
}

export default App