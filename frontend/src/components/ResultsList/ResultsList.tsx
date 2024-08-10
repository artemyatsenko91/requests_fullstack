import { ResultItem } from "./ResultItem/ResultItem";
import { IResultsListProps } from "./types";

export const ResultsList: React.FC<IResultsListProps> = ({ results }) => {
  return (
    <ul>
      {results.map((result, index) => (
        <ResultItem result={result} key={index} />
      ))}
    </ul>
  );
};
