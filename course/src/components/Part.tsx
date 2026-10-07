import type { CoursePart } from "../types";

interface PartProps {
  part: CoursePart;
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`,
  );
};

const Part = ({ part }: PartProps) => {
  switch (part.kind) {
    case "basic":
      return (
        <p>
          {part.name} {part.exerciseCount}
          <br />
          {part.description}
        </p>
      );

    case "group":
      return (
        <p>
          {part.name} {part.exerciseCount}
          <br />
          project exercises: {part.groupProjectCount}
        </p>
      );

    case "background":
      return (
        <p>
          {part.name} {part.exerciseCount}
          <br />
          {part.description}
          <br />
          background material: {part.backgroundMaterial}
        </p>
      );
    case "special":
      return (
        <p>
          {part.name} {part.exerciseCount}
          <br />
          {part.description}
          <br />
          requirements: {part.requirements.join(", ")}
        </p>
      );

    default:
      return assertNever(part);
  }
};

export default Part;
