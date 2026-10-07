import Part from "./Part";
import { type CoursePart } from "../types";

interface ContentProps {
  parts: CoursePart[];
}

const Content = ({ parts }: ContentProps) => (
  <>
    {parts.map((part) => (
      <Part key={part.name} part={part} />
    ))}
  </>
);

export default Content;
