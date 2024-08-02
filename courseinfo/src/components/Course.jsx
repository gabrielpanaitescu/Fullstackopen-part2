const Header = ({ name }) => {
  return <h1>{name}</h1>;
};

const Part = ({ part }) => {
  return (
    <li>
      {part.name} {part.exercises}
    </li>
  );
};

const Content = ({ parts }) => {
  return (
    <ul>
      {parts.map((part) => {
        return <Part key={part.id} part={part} />;
      })}
    </ul>
  );
};

const Course = ({ course }) => {
  return (
    <section>
      <Header name={course.name} />
      <Content parts={course.parts} />
    </section>
  );
};

export default Course;
