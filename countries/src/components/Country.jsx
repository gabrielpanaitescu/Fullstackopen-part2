import { useState, useEffect } from "react";

const Country = ({ country, showMore }) => {
  const [show, setShow] = useState(showMore);

  useEffect(() => {
    setShow(showMore);
  }, [showMore]);

  const handleToggle = () => {
    console.log(show);
    setShow(!show);
  };

  const createToggleShowButton = () => {
    return <button onClick={handleToggle}>{show ? "hide" : "show"}</button>;
  };

  return !show ? (
    <li>
      {country.name.common} {createToggleShowButton()}
    </li>
  ) : (
    <div>
      <h1>{country.name.common}</h1>
      {createToggleShowButton()}
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
    </div>
  );
};

export default Country;
