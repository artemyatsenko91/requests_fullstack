import { InputBlock } from "./components/InputBlock/InputBlock";
import { ResultsList } from "./components/ResultsList/ResultsList";
import { useConcurrency } from "./hooks/useConcurrency";

function App() {
  const {
    concurrency,
    handleStart,
    isRunning,
    results,
    setConcurrency,
    setResults,
  } = useConcurrency();

  return (
    <div
      style={{
        padding: "20px",
      }}
      data-testid="app"
    >
      <InputBlock
        value={concurrency}
        handleStart={handleStart}
        isRunning={isRunning}
        setConcurrency={setConcurrency}
        setResults={setResults}
      />
      <ResultsList results={results} />
    </div>
  );
}

export default App;
