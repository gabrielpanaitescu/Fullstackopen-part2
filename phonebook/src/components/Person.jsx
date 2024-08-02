const Person = ({ person }) => {
  return (
    <li key={person.number}>
      {person.name} {person.number}
    </li>
  );
};

export default Person;
