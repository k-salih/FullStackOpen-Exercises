const SearchFilter = ({ filter, onChange }) => {
  return (
    <div>
      <input value={filter} onChange={onChange} />
    </div>
  )
}