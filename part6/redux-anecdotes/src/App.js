import { useEffect } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnectodeList from './components/AnectodeList'
import Notification from './components/Notification'

import anecdoteService from './services/anecdotes'
import { initializeAnecdotes} from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])
  

  return (
    <div>
      <Notification />
      <AnectodeList />
      <AnecdoteForm />
    </div>
  )
}

export default App