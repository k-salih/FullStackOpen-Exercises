import { createSlice } from '@reduxjs/toolkit'

const initialState = 'Welcome to anecdotes application.'

const notificationReducer = createSlice({
  name: 'notification',
  initialState,
})


export default notificationReducer.reducer