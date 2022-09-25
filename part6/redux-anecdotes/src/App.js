import AnecdoteForm from './components/AnecdoteForm'
import AnectodeList from './components/AnectodeList'
import Notification from './components/Notification'

const App = () => {

  return (
    <div>
      <Notification />
      <AnectodeList />
      <AnecdoteForm />
    </div>
  )
}

export default App