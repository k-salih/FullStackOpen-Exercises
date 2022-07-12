const PersonForm = ({name, number, onSubmit, onNameChange, onNumberChange}) => {
  return (
    <form onSubmit={onSubmit}>
      
      <div>
        name: <input 
        value={name}
        onChange={onNameChange}/>
      </div>

      <div>
        number: <input
        value={number}
        onChange={onNumberChange}></input>
      </div>

      <div>
        <button type="submit">add</button>
      </div>

    </form>
  )
}
