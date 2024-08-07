const Filter = ({ filterValue, handleChange }) => {
  return (
    <>
      find countries: <input value={filterValue} onChange={handleChange} />
    </>
  );
};

export default Filter;
