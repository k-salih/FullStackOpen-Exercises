import reducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import { configureStore} from '@reduxjs/toolkit'
import filterReducer from './reducers/filterReducer'

const store = configureStore({
    reducer: {
        anecdotes: reducer,
        notification: notificationReducer,
        filter: filterReducer
    }
})

export default store