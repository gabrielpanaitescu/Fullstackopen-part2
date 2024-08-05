import Person from "./Person";

const PersonList = ({ persons, handleDelete }) => {
  return (
    <ul>
      {persons.map((person) => (
        <Person
          key={person.number}
          person={person}
          handleDelete={() => handleDelete(person)}
        />
      ))}
    </ul>
  );
};

export default PersonList;
