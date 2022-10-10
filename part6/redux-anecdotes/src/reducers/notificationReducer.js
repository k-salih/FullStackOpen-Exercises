import { createSlice } from '@reduxjs/toolkit'


const initialState = 'Welcome to anecdotes application.'

const notificationReducer = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state, action) => {
      return action.payload
    },
    clearNotification: (state, action) => {
      return ""
    }
  }
})

export const notificationCreator = (notification, time) => {
  return async dispatch => {
    dispatch(notificationReducer.actions.setNotification(notification))
    setTimeout(() => {
      dispatch(notificationReducer.actions.clearNotification())
    }, time * 1000)
  }
}

export const { setNotification, clearNotification } = notificationReducer.actions

export default notificationReducer.reducer