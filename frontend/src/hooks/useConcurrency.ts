import axios from "axios";
import pLimit from "p-limit";
import { useState } from "react";

export const useConcurrency = () => {
  const [concurrency, setConcurrency] = useState<number>(10);
  const [results, setResults] = useState<number[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const handleStart = async (): Promise<void> => {
    setIsRunning(true);
    const limit = pLimit(concurrency);

    const sendRequests = async (i: number) => {
      try {
        const response = await axios.post("http://localhost:5000/api", {
          index: i,
        });
        setResults((prev) => [...prev, response.data.index]);
      } catch (error) {
        console.error(`Ошибка при отправке запроса ${i}: `, error);
      }
    };

    for (let i = 1; i <= 1000; i++) {
      await limit(() => sendRequests(i));
    }

    setIsRunning(false);
  };

  return {
    setConcurrency,
    concurrency,
    results,
    isRunning,
    handleStart,
    setResults,
  };
};
