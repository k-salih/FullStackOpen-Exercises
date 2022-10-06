import {createSlice} from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const reducer = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    vote: (state, action) => {
      const id = action.payload
      const anecdoteToChange = state.find(a => a.id === id)
      anecdoteToChange.votes++
    },
    appendAnecdote: (state, action) => {
      state.push(action.payload)
    },
    setNotes: (state, action) => {
      return action.payload
    }
  }
})

export const { vote, appendAnecdote, setNotes} = reducer.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setNotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteToAnecdote = (anecdote) => {
  return async dispatch => {
    await anecdoteService.vote(anecdote.id)
    dispatch(vote(anecdote.id))
  }
}

export default reducer.reducer