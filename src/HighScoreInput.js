import PropTypes from 'prop-types'
import React, { Component } from 'react'
import './HighScoreInput.css'
import { saveHOFEntry } from './HallOfFame'

class HighScoreInput extends Component {
  state = {winner: ''}

  // Arrow fx for binding
  handleWinnerUpdate = (event) => {
    this.setState({winner: event.target.value.toUpperCase()})
  }

  // Arrow fx for binding
  persisWinner = (event) =>{
    event.preventDefault()
    const newEntry = {guesses: this.props.guesses, player: this.state.winner}
    saveHOFEntry(newEntry, this.props.onStored)
  }

  render() {
    return (
      <form className="highScoreInput" onSubmit={this.persisWinner}>
        <p>
          <label>
            Great ! Please enter your name :
            <input
              autoComplete="given-name"
              type="text"
              onChange={this.handleWinnerUpdate}
              value={this.state.winner}
            />
          </label>
          <button type="submit">I win!</button>
        </p>
      </form>
    )
  }
}

HighScoreInput.propTypes = {
  guesses: PropTypes.number.isRequired,
  onStored: PropTypes.func.isRequired,
}

export default HighScoreInput
