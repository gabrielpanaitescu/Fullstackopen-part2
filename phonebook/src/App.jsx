import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm.jsx";
import PersonList from "./components/PersonList.jsx";
import personService from "./services/persons.js";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newName || !newNumber) {
      alert("Please complete the form with a name and a number");
      return;
    }

    const isNameDuplicate = persons.some(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );
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

    personService.create(newPersonObj).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setNewName("");
      setNewNumber("");
    });
  };

  const personsToShow = filter
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
      <PersonList persons={personsToShow} />
    </div>
  );
};

export default App;
