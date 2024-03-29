import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const filterReducer = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setFilter: (state, action) => {
            return action.payload
        }
    }
})

export const { setFilter } = filterReducer.actions

export default filterReducer.reducer