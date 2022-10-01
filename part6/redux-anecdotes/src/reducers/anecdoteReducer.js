import {createSlice} from '@reduxjs/toolkit'

const reducer = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    vote: (state, action) => {
      const id = action.payload
      const anecdoteToChange = state.find(a => a.id === id)
      anecdoteToChange.votes++
    },
    createAnecdote: (state, action) => {
      state.push(action.payload)
    },
    appendAnecdote: (state, action) => {
      state.push(action.payload)
    },
    initializeAnecdotes: (state, action) => {
      return action.payload
    }
  }
})

export const { vote, createAnecdote, appendAnecdote, initializeAnecdotes} = reducer.actions

export default reducer.reducer