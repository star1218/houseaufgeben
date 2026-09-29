import { useState } from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Card,
  CardContent,
  TextField,
  Stack,
  Chip,
  Divider,
} from '@mui/material'

function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          Ihor Tkachenko
        </Typography>

        <Button color="inherit" component={NavLink} to="/">
          Головна
        </Button>

        <Button color="inherit" component={NavLink} to="/todo">
          TODO
        </Button>

        <Button color="inherit" component={NavLink} to="/swapi">
          SWAPI
        </Button>
      </Toolbar>
    </AppBar>
  )
}

function Home() {
  return (
    <Container maxWidth="md">
      <Box sx={{ py: 6 }}>
        <Typography variant="h2" fontWeight="bold" gutterBottom>
          Ihor Tkachenko
        </Typography>

        <Typography variant="h5" color="primary" gutterBottom>
          Front-End Developer
        </Typography>

        <Typography sx={{ mt: 3, mb: 4 }} fontSize={18}>
          Я вивчаю Front-End розробку та створюю сучасні
          веб-додатки. Працюю з JavaScript, React, HTML та CSS.
          Також цікавлюся кібербезпекою та програмуванням.
        </Typography>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Навички
        </Typography>

        <Stack
          direction="row"
          spacing={1}
          useFlexGap
          flexWrap="wrap"
          sx={{ mb: 5 }}
        >
          <Chip label="HTML" color="primary" />
          <Chip label="CSS" color="primary" />
          <Chip label="JavaScript" color="primary" />
          <Chip label="React" color="primary" />
          <Chip label="Redux" color="primary" />
          <Chip label="Git" color="primary" />
          <Chip label="Python" color="primary" />
        </Stack>

        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Про мене
        </Typography>

        <Card>
          <CardContent>
            <Typography>
              Навчаюся та розвиваюся у сфері IT. Моя мета —
              розвивати навички Front-End розробки та створювати
              зручні й сучасні веб-додатки.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Container>
  )
}

function Todo() {
  const [text, setText] = useState('')
  const [todos, setTodos] = useState([])

  const addTodo = (event) => {
    event.preventDefault()

    if (!text.trim()) {
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
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 6 }}>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          TODO List
        </Typography>

        <Box
          component="form"
          onSubmit={addTodo}
          sx={{ display: 'flex', gap: 2, mb: 4 }}
        >
          <TextField
            fullWidth
            label="Нове завдання"
            value={text}
            onChange={(event) => setText(event.target.value)}
          />

          <Button type="submit" variant="contained">
            Додати
          </Button>
        </Box>

        <Stack spacing={2}>
          {todos.map((todo) => (
            <Card key={todo.id}>
              <CardContent
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography>{todo.text}</Typography>

                <Button
                  color="error"
                  onClick={() => deleteTodo(todo.id)}
                >
                  Видалити
                </Button>
              </CardContent>
            </Card>
          ))}
        </Stack>

        <Typography sx={{ mt: 3 }}>
          Всього: {todos.length}
        </Typography>
      </Box>
    </Container>
  )
}

function Swapi() {
  const [endpoint, setEndpoint] = useState('people/1')
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const getInfo = async () => {
    try {
      setLoading(true)
      setError('')

      const response = await fetch(
        `https://swapi.py4e.com/api/${endpoint}`
      )

      if (!response.ok) {
        throw new Error('Помилка')
      }

      const result = await response.json()
      setData(result)
    } catch {
      setData(null)
      setError('Не вдалося отримати дані')
    } finally {
      setLoading(false)
    }
  }

  const clear = () => {
    setData(null)
    setError('')
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 6 }}>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          SWAPI
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <TextField
            fullWidth
            label="SWAPI endpoint"
            value={endpoint}
            onChange={(event) => setEndpoint(event.target.value)}
          />

          <Button variant="contained" onClick={getInfo}>
            Get Info
          </Button>
        </Box>

        {loading && <Typography>Завантаження...</Typography>}

        {error && (
          <Typography color="error">
            {error}
          </Typography>
        )}

        {data && (
          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Box
                component="pre"
                sx={{
                  whiteSpace: 'pre-wrap',
                  overflowWrap: 'anywhere',
                  margin: 0,
                }}
              >
                {JSON.stringify(data, null, 2)}
              </Box>
            </CardContent>
          </Card>
        )}

        <Button
          variant="contained"
          color="warning"
          onClick={clear}
          sx={{ mt: 3 }}
        >
          Clear
        </Button>
      </Box>
    </Container>
  )
}

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto',
        bgcolor: '#1976d2',
        color: 'white',
        textAlign: 'center',
        py: 3,
      }}
    >
      <Typography fontWeight="bold">
        Ihor Tkachenko
      </Typography>

      <Typography>
        Front-End Developer
      </Typography>

      <Typography sx={{ mt: 1 }}>
        © 2026 Ihor Tkachenko
      </Typography>
    </Box>
  )
}

function App() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Header />

      <Box sx={{ flexGrow: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/swapi" element={<Swapi />} />
        </Routes>
      </Box>

      <Footer />
    </Box>
  )
}

export default App