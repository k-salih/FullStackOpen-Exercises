import { useState } from 'react'

const Button = ({handleClick, text}) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [score, setScore] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
    setAll(all + 1)
    setScore(score + 1)
  }
  

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
  }
  

  const handleBadClick = () => {
    setBad(bad + 1)
    setAll(all + 1)
    setScore(score - 1)
  }
  

  return (
    <div>
        <h1>give feedback</h1>
        <Button handleClick={handleGoodClick} text="Good" />
        <Button handleClick={handleNeutralClick} text="Neutral" />
        <Button handleClick={handleBadClick} text="Bad" />
        <Statistics good={good} neutral={neutral} bad={bad} all={all} score={score}/>
    </div>
  )
}

const Statistics = (props) => {
  if (props.all === 0) {
    return (
      <div>
        <h1>statistics</h1>
        No feedback given
      </div>
    )
  }

  return(
  <div>
    <h1>statistics</h1>
    <table>
      <tbody> 
        <StatisticLine text="good" statistic={props.good}/>
        <StatisticLine text="neutral" statistic={props.neutral}/>
        <StatisticLine text="bad" statistic={props.bad}/>
        <StatisticLine text="all" statistic={props.all}/>
        <StatisticLine text="average" statistic={props.score/props.all}/>
        <StatisticLine text="positive %" statistic={props.good/props.all*100}/>
      </tbody>
    </table>
  </div>
  )
}
const StatisticLine = ({text, statistic}) => {
  return(
    <tr>
      <td>
        {text} {statistic}
      </td>
    </tr>
  )
}

export default App

