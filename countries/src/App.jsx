import { useEffect, useState } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import CountryList from "./components/CountryList";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => setCountries(response.data));
  }, []);

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  let filteredCountries = [];
  if (searchQuery)
    filteredCountries = countries.filter((country) =>
      country.name.official.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div>
      <Filter searchQuery={searchQuery} handleChange={handleChange} />
      <CountryList countries={filteredCountries} />
    </div>
  );
};

export default App;
