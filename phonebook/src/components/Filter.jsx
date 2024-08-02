const Filter = ({ filter, setFilter }) => {
  return (
    <label>
      filter shown with
      <input value={filter} onChange={(e) => setFilter(e.target.value)} />
    </label>
  );
};

export default Filter;
