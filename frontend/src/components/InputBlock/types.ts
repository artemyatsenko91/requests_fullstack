export interface IInputBlockProps {
  setConcurrency: React.Dispatch<React.SetStateAction<number>>;
  value: number;
  handleStart: () => Promise<void>;
  isRunning: boolean;
  setResults: React.Dispatch<React.SetStateAction<number[]>>;
}
