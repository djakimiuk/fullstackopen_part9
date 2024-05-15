interface HeaderProps {
  name: string;
}

interface ContentProps {
  courseParts: CoursePart[];
}

interface PartProps {
  coursePart: CoursePart;
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartDescription {
  kind: "basic";
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

interface CoursePartBackground extends CoursePartDescription {
  backgroundMaterial: string;
  kind: "background";
}

interface CoursePartRequirements extends CoursePartDescription {
  requirements: string[];
  kind: "special";
}

type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartRequirements;

interface TotalProps {
  totalExercises: number;
}
const Header = (props: HeaderProps) => {
  return <h1>{props.name}</h1>;
};

const Content = (props: ContentProps) => {
  const { courseParts } = props;
  return (
    <>
      {courseParts.map((part, index) => (
        <Part key={index} coursePart={part} />
      ))}
    </>
  );
};

const Part = (props: PartProps) => {
  const { coursePart } = props;
  switch (coursePart.kind) {
    case "basic":
      return (
        <p>
          <b>
            {coursePart.name} {coursePart.exerciseCount}
          </b>
          <br></br>
          <i>{coursePart.description}</i>
        </p>
      );
    case "group":
      return (
        <p>
          <b>
            {coursePart.name} {coursePart.exerciseCount}
          </b>
          <br></br>
          project exercises {coursePart.groupProjectCount}
        </p>
      );
    case "background":
      return (
        <p>
          <b>
            {coursePart.name} {coursePart.exerciseCount}
          </b>
          <br></br>
          <i>{coursePart.description}</i>
          <br></br>
          submit to {coursePart.backgroundMaterial}
        </p>
      );
    case "special":
      return (
        <p>
          <b>
            {coursePart.name} {coursePart.exerciseCount}
          </b>
          <br></br>
          <i>{coursePart.description}</i>
          <br></br>
          required skills: {coursePart.requirements.join(", ")}
        </p>
      );
  }
};

const Total = (props: TotalProps) => {
  return <p>Number of exercises {props.totalExercises}</p>;
};

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic",
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group",
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic",
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial:
        "https://type-level-typescript.com/template-literal-types",
      kind: "background",
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special",
    },
  ];

  const totalExercises = courseParts.reduce(
    (sum, part) => sum + part.exerciseCount,
    0
  );

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts} />
      <Total totalExercises={totalExercises} />
    </div>
  );
};

export default App;
