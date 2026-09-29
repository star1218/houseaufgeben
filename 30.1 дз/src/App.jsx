import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSwapiData, clearData } from './store'
import './App.css'

function App() {
  const [endpoint, setEndpoint] = useState('people/1')
  const dispatch = useDispatch()

  const { data, loading, error } = useSelector(
    (state) => state.swapi
  )

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!endpoint.trim()) {
      return
    }

    dispatch(fetchSwapiData(endpoint.trim()))
  }

  return (
    <div className="app">
      <h1>SWAPI</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={endpoint}
          onChange={(event) => setEndpoint(event.target.value)}
          placeholder="people/1"
        />

        <button type="submit">
          Get Info
        </button>
      </form>

      {loading && <p>Завантаження...</p>}

      {error && <p className="error">{error}</p>}

      {data && (
        <pre className="result">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}

      <button
        className="clear-button"
        onClick={() => dispatch(clearData())}
      >
        Clear
      </button>
    </div>
  )
}

export default App