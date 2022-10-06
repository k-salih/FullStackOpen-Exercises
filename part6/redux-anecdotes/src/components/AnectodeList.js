import { useSelector, useDispatch } from 'react-redux'
import { voteToAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'
import Filter from './Filter'
import anecdoteService from '../services/anecdotes'

const AnectodeList = () => {
    const unorderedAnecdotes = useSelector(state => {
        if (state.filter === '') {
            return state.anecdotes
        }
        return state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
    })
    
    const anecdotes = unorderedAnecdotes.slice().sort((a, b) => b.votes - a.votes)
    
    const dispatch = useDispatch()

    const voteHandler = async (anecdote) => {
        dispatch(voteToAnecdote(anecdote))
        dispatch(setNotification(`You voted '${anecdote.content}'`))
        setTimeout(() => {
            dispatch(clearNotification())
        }, 5000)
    }


    return (
        <div>
            <h2>Anecdotes</h2>
            <Filter />
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => voteHandler(anecdote)}>vote</button>
                </div>
        </div>
      )}
        </div>
    )
}

export default AnectodeList

