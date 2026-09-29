import React, { Component } from 'react'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    const savedVotes = localStorage.getItem('emojiVotes')

    this.state = {
      emojis: ['😀', '😊', '😎', '🤩', '😍'],
      votes: savedVotes
        ? JSON.parse(savedVotes)
        : [0, 0, 0, 0, 0],
      showResults: false,
    }
  }

  vote = (index) => {
    const newVotes = [...this.state.votes]
    newVotes[index] += 1

    this.setState({
      votes: newVotes,
      showResults: false,
    })

    localStorage.setItem('emojiVotes', JSON.stringify(newVotes))
  }

  showResults = () => {
    this.setState({
      showResults: true,
    })
  }

  clearResults = () => {
    const newVotes = [0, 0, 0, 0, 0]

    this.setState({
      votes: newVotes,
      showResults: false,
    })

    localStorage.removeItem('emojiVotes')
  }

  getWinner = () => {
    const { votes, emojis } = this.state

    const maxVotes = Math.max(...votes)
    const winnerIndex = votes.indexOf(maxVotes)

    return {
      emoji: emojis[winnerIndex],
      votes: maxVotes,
    }
  }

  render() {
    const { emojis, votes, showResults } = this.state
    const winner = this.getWinner()

    return (
      <div className="app">
        <h1>Голосування за найкращий смайлик</h1>

        <div className="emojis">
          {emojis.map((emoji, index) => (
            <div className="emoji-item" key={emoji}>
              <button
                className="emoji-button"
                onClick={() => this.vote(index)}
              >
                {emoji}
              </button>

              <span className="votes">
                {votes[index]}
              </span>
            </div>
          ))}
        </div>

        <div className="buttons">
          <button
            className="show-button"
            onClick={this.showResults}
          >
            Show Results
          </button>

          <button
            className="clear-button"
            onClick={this.clearResults}
          >
            Очистити результати
          </button>
        </div>

        {showResults && (
          <div className="results">
            <h2>Результати голосування:</h2>

            <h3>Переможець:</h3>

            <div className="winner">
              <span className="winner-emoji">
                {winner.emoji}
              </span>

              <p>
                Кількість голосів: {winner.votes}
              </p>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default App