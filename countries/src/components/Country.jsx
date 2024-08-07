import { useState, useEffect } from "react";
import Weather from "./Weather";

const Country = ({ country, showMore }) => {
  const [show, setShow] = useState(showMore);

  useEffect(() => {
    setShow(showMore);
  }, [showMore]);

  const handleToggle = () => {
    setShow(!show);
  };

  return (
    <li>
      {!show ? country.name.common : <h1>{country.name.common}</h1>}
      <button onClick={handleToggle}>{show ? "hide" : "show"}</button>
      {show && (
        <>
          <p>capital: {country.capital}</p>
          <p> area: {country.area}</p>
          <p>
            <strong>languages:</strong>
          </p>
          <ul>
            {Object.values(country.languages).map((language) => {
              return <li key={language}>{language}</li>;
            })}
          </ul>
          <img src={country.flags.png} alt={country.flags.alt} />
          <Weather
            capital={country.capital}
            coords={country.capitalInfo.latlng}
          />
        </>
      )}
    </li>
  );
};

export default Country;
