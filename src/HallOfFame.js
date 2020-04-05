import React from 'react'
import './HallOfFame.css'
import PropTypes from 'prop-types'

const HallOfFame = ({ entries }) => (
  <table className="hallOfFame">
    <tbody>
      {entries.map(({id,guesses, date, player})=>(
        <tr key={id}>
          <td className="date">{date}</td>
          <td className="guesses">{guesses}</td>
          <td className="player">{player}</td>
        </tr>
      ))}
    </tbody>
  </table>
)

HallOfFame.propTypes = {
  entries: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      guesses: PropTypes.number.isRequired,
      player: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
}

export default HallOfFame

// == Internal helpers ==============================================
const HOF_KEY = '::Memory::HallofFame'
const HOF_MAX_SIZE = 10

export function saveHOFEntry(entry, onStored){
  entry.date = new Date().toLocaleDateString()
  entry.id = Date.now()

  const entries = JSON.parse(localStorage.getItem(HOF_KEY) || '[]')

  //findIndex() method returns the index of the first
  //element in the array that satisfies the provided testing function
  const insertionPoint = entries.findIndex(
    ({guesses})=> guesses >= entry.guesses
  )

  //if the entries.guesses if the biggest element, then add it in the end
  //else, it should be insert in the middle
  if (insertionPoint ===-1){
    entries.push(entry)
  } else{
    entries.splice(insertionPoint, 0, entry)
  }

  //we only take the TOP "HOF_MAX_SIZE" of elements
  if (entries.length > HOF_MAX_SIZE){
    entries.splice(HOF_MAX_SIZE, entries.length)
  }

  localStorage.setItem(HOF_KEY, JSON.stringify(entries))
  onStored(entries)
}
