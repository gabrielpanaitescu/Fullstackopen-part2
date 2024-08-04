import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm.jsx";
import PersonList from "./components/PersonList.jsx";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newName || !newNumber) {
      alert("Please complete the form with a name and a number");
      return;
    }

    const isNameDuplicate = persons.some((person) => person.name === newName);
    const isNumberDuplicate = persons.some(
      (person) => person.number === newNumber
    );

    if (isNameDuplicate) {
      alert(`${newName} is already added to phonebook`);
      return;
    } else if (isNumberDuplicate) {
      alert(`${newNumber} is already added to phonebook`);
      return;
    }

    const newPersonObj = {
      name: newName,
      number: newNumber,
    };

    setPersons(persons.concat(newPersonObj));
    setNewName("");
    setNewNumber("");
  };

  const filteredPersons = filter
    ? [...persons].filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      )
    : [...persons];

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <h2>add new contact</h2>
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />
      <h2>Numbers</h2>
      <PersonList persons={filteredPersons} />
    </div>
  );
};

export default App;
