const Search = ({ filter, onChange }) => {
  return (
      <input value={filter} onChange={onChange} />
  )
}

export default Search