import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm.jsx";
import PersonList from "./components/PersonList.jsx";
import personService from "./services/persons.js";
import Notification from "./components/Notification.jsx";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("");
  const [notificationTimeoutID, setNotificationTimeoutID] = useState("");

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const setNotificationMessage = (msg, msgType) => {
    if (notificationTimeoutID) clearTimeout(notificationTimeoutID);

    setMessage(msg);
    setMessageType(msgType);

    const timeoutID = setTimeout(() => {
      setMessage(null);
      setMessageType("");
      setNotificationTimeoutID("");
    }, 3000);

    setNotificationTimeoutID(timeoutID);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPersonObj = {
      name: newName,
      number: newNumber,
    };

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

    if (isNumberDuplicate) {
      const personLinkedWithNumber = persons.find(
        (person) => person.number === newNumber
      );
      alert(
        `Number '${newNumber}' is already added to phonebook. It corresponds to '${personLinkedWithNumber.name}'`
      );
      return;
    } else if (isNameDuplicate) {
      const replaceNumber = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );
      if (!replaceNumber) return;

      const personToUpdate = persons.find(
        (person) => person.name.toLowerCase() === newName.toLowerCase()
      );
      personService
        .update(personToUpdate.id, newPersonObj)
        .then((returnedPerson) => {
          setPersons(
            persons.map((person) =>
              person.id !== personToUpdate.id ? person : returnedPerson
            )
          );
          setNotificationMessage(
            `Updated the number of person '${personToUpdate.name}'`,
            "success"
          );
        })
        .catch((error) => {
          setNotificationMessage(
            `person '${personToUpdate.name}' was already deleted from server`,
            "error"
          );
          setPersons(
            persons.filter((person) => person.id !== personToUpdate.id)
          );
        });
      return;
    }

    personService.create(newPersonObj).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setNewName("");
      setNewNumber("");
      setNotificationMessage(`Added '${returnedPerson.name}'`, "success");
    });
  };

  const handleDeleteOf = (person) => {
    if (
      !window.confirm(
        `Are you sure you want to delete '${person.name}' from phonebook?`
      )
    )
      return;

    const id = person.id;
    personService
      .deleteItem(id)
      .then((deletedNote) => {
        setNotificationMessage(`Deleted '${person.name}'`, "success");
        setPersons(persons.filter((person) => person.id !== id));
      })
      .catch((error) => {
        setNotificationMessage(
          `person '${person.name}' was already deleted from server`,
          "error"
        );
        setPersons(persons.filter((person) => person.id !== id));
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
      <Notification message={message} messageType={messageType} />
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
      <PersonList persons={personsToShow} handleDelete={handleDeleteOf} />
    </div>
  );
};

export default App;
