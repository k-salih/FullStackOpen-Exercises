import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

const AnectodeList = () => {
    const anecdotes = useSelector(state => state)
    anecdotes.sort((a, b) => b.votes - a.votes)
    const dispatch = useDispatch()

    const voteAnecdote = (id) => {
        dispatch(vote(id))
        console.log('vote', id)
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
        </div>
    )
}

export default AnectodeList

