import { IResultsItemProps } from "./types";

export const ResultItem: React.FC<IResultsItemProps> = ({ result }) => {
  return <li>Request {result}</li>;
};
