import Person from "./Person";

const PersonList = ({ persons }) => {
  return (
    <ul>
      {persons.map((person) => (
        <Person key={person.number} person={person} />
      ))}
    </ul>
  );
};

export default PersonList;
