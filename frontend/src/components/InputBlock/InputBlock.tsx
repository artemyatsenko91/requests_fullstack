import { IInputBlockProps } from "./types";

export const InputBlock: React.FC<IInputBlockProps> = ({
  value,
  setConcurrency,
  handleStart,
  isRunning,
  setResults,
}) => {
  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
      }}
    >
      <input
        type="number"
        min="0"
        max="100"
        value={value}
        onChange={(e) => setConcurrency(Number(e.target.value))}
        required
        style={{ width: "100%", maxWidth: "200px" }}
      />
      <button onClick={handleStart} disabled={isRunning}>
        Start
      </button>
      <button
        onClick={() => {
          setResults([]);
        }}
      >
        Clear
      </button>
    </div>
  );
};
