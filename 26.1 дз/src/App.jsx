import { useState } from 'react'
import './App.css'

const emojis = ['😀', '😊', '😎', '🤩', '😍']

function App() {
  const [votes, setVotes] = useState([0, 0, 0, 0, 0])

  const handleVote = (index) => {
    const newVotes = [...votes]
    newVotes[index] += 1
    setVotes(newVotes)
  }

  return (
    <div className="app">
      <h1>Голосування за найкращий смайлик</h1>

      <div className="emojis">
        {emojis.map((emoji, index) => (
          <div className="emoji-item" key={emoji}>
            <button
              className="emoji-button"
              onClick={() => handleVote(index)}
            >
              {emoji}
            </button>

            <span className="votes">
              {votes[index]}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App