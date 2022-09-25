import reducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import { configureStore} from '@reduxjs/toolkit'

const store = configureStore({
    reducer: {
        anecdotes: reducer,
        notification: notificationReducer
    }
})

export default store