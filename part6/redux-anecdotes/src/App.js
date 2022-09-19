import { useSelector, useDispatch } from 'react-redux'
import { vote, createAnecdote } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => state)
  anecdotes.sort((a, b) => b.votes - a.votes)
  const dispatch = useDispatch()

  const voteAnecdote = (id) => {
    dispatch(vote(id))
    console.log('vote', id)
  }

  const addAnectode = (event) => {
    event.preventDefault()
    const content = event.target.anectode.value
    event.target.anectode.value = ''
    dispatch(createAnecdote(content))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteAnecdote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={addAnectode}>
        <div><input name="anectode"/></div>
        <button type="submit" >create</button>
      </form>
    </div>
  )
}

export default App