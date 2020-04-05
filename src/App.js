import React, { Component } from 'react'
import shuffle from 'lodash.shuffle'
import Card from './Card'
import GuessCount from './GuessCount'
import './App.css'
import HallOfFame from './HallOfFame'
import HighScoreInput from './HighScoreInput'


const SIDE = 6
const SYMBOLS = '😀🎉💖🎩🐶🐱🦄🐬🌍🌛🌞💫🍎🍌🍓🍐🍟🍿'
const VISUAL_DELAY = 500

class App extends Component {
  state = {
    cards: this.generateCards(),
    currentPair: [],
    guesses: 0,
    hallOfFame: null,
    matchedCardIndices: [],
  }

  generateCards(){
    const result = []
    const size = SIDE*SIDE
    const candidates = shuffle(SYMBOLS)
    while (result.length < size){
      const card = candidates.pop()
      result.push(card,card)
    }
    return shuffle(result)
  }

  getFeedbackForCard(index) {
    const { currentPair, matchedCardIndices } = this.state
    const indexMatched = matchedCardIndices.includes(index)

    if (currentPair.length < 2) {
      return indexMatched || index === currentPair[0] ? 'visible' : 'hidden'
    }

    if (currentPair.includes(index)) {
      return indexMatched ? 'justMatched' : 'justMismatched'
    }

    return indexMatched ? 'visible' : 'hidden'
  }


  // Arrow fx for binding
  handlerCardClick=index => {
    const {cards, currentPair, guesses, matchedCardIndices} = this.state

    if (currentPair.length===2){
      console.log("length = 2")
      return
    }

    if (currentPair.length ===0){
      this.setState({currentPair: [index]})
      return
    }

    if (currentPair.length ===1){
      const newPair = [currentPair[0], index]
      const newGuesses = guesses +1
      const matched = cards[newPair[0]] === cards[newPair[1]]
      console.log(newPair)

      this.setState({currentPair:newPair, guesses: newGuesses})
      if (matched){
        this.setState({matchedCardIndices: [...matchedCardIndices, ...newPair]})
      }
      setTimeout(()=> this.setState({currentPair:[]}), VISUAL_DELAY)
    }
  }

  // Arrow fx for binding
  displayHallOfFame = (hallOfFame) => {
    this.setState({hallOfFame})
  }

  render() {
    const { cards, guesses, hallOfFame, matchedCardIndices} = this.state
    const won = matchedCardIndices.length ===cards.length
    return (
      <div className="memory">
        <GuessCount guesses={guesses} />
        {cards.map((card,index)=>(
          <Card
            card={card}
            feedback={this.getFeedbackForCard(index)}
            index = {index}
            key={index}
            onClick={this.handlerCardClick}
          />

        ))}

        {
          won && (hallOfFame?(
            <HallOfFame entries={hallOfFame}/>
          ):(
            <HighScoreInput guesses={guesses} onStored={this.displayHallOfFame}/>
          ))
        }
      </div>
    )
  }
}

export default App
