import Country from "./Country";

const CountryList = ({ countries }) => {
  if (countries.length < 1) return <p>Type to search for a country!</p>;

  if (countries.length > 10)
    return <p>Too many matches, specify another filter</p>;

  return countries.length === 1 ? (
    <Country country={countries[0]} showMore={true} />
  ) : (
    <ul>
      {countries.map((country) => {
        return (
          <Country key={country.ccn3} country={country} showMore={false} />
        );
      })}
    </ul>
  );
};

export default CountryList;
