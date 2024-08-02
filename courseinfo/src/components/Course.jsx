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

const Total = ({ parts }) => {
  const totalExercises = parts.reduce(
    (accum, part) => accum + part.exercises,
    0
  );
  return <p>total of {totalExercises} exercises</p>;
};

const Course = ({ course }) => {
  console.log(course);
  return (
    <section>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </section>
  );
};

export default Course;
