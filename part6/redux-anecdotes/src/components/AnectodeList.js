import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

const AnectodeList = () => {
    const unorderedAnecdotes = useSelector(state => state)
    const anecdotes = unorderedAnecdotes.slice().sort((a, b) => b.votes - a.votes)
    const dispatch = useDispatch()

    const voteAnecdote = (anecdote) => {
        dispatch(vote(anecdote.id))
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
                    <button onClick={() => voteAnecdote(anecdote)}>vote</button>
                </div>
        </div>
      )}
        </div>
    )
}

export default AnectodeList

