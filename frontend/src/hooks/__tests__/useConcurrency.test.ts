import { renderHook } from "@testing-library/react";
import { useConcurrency } from "../useConcurrency";
import { act } from "react";
import pLimit from "p-limit";
import axios from "axios";

jest.mock("axios");
jest.mock("p-limit");

describe("useConcurrency", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return an object with current properties", () => {
    const { result } = renderHook(useConcurrency);

    expect(result.current).toHaveProperty("setConcurrency");
    expect(result.current).toHaveProperty("concurrency");
    expect(result.current).toHaveProperty("results");
    expect(result.current).toHaveProperty("isRunning");
    expect(result.current).toHaveProperty("handleStart");
    expect(result.current).toHaveProperty("setResults");

    expect(typeof result.current.concurrency).toBe("number");
    expect(typeof result.current.handleStart).toBe("function");
    expect(typeof result.current.isRunning).toBe("boolean");
    expect(typeof result.current.results).toBe("object");
    expect(typeof result.current.setConcurrency).toBe("function");
    expect(typeof result.current.setResults).toBe("function");
  });

  it("should set the concurrency value", () => {
    const { result } = renderHook(useConcurrency);

    expect(result.current.concurrency).toBe(10);

    act(() => {
      result.current.setConcurrency(100);
    });

    expect(result.current.concurrency).toBe(100);
  });

  it("should set the results value", () => {
    const { result } = renderHook(useConcurrency);

    expect(result.current.results.length).toBe(0);

    act(() => {
      result.current.setResults((prev) => [...prev, 11]);
    });

    expect(result.current.results.length).toBe(1);
  });

  it("should initialize with correct default values", () => {
    const { result } = renderHook(() => useConcurrency());

    expect(result.current.concurrency).toBe(10);
    expect(result.current.results).toEqual([]);
    expect(result.current.isRunning).toBe(false);
    expect(typeof result.current.handleStart).toBe("function");
  });

  it("should handle concurrent requests with handleStart", async () => {
    const mockPLimit = jest.fn().mockImplementation((fn) => fn());
    (pLimit as jest.Mock).mockReturnValue(mockPLimit);

    const mockAxiosPost = jest.fn((_, { index }) =>
      Promise.resolve({ data: { index } })
    );
    (axios.post as jest.Mock).mockImplementation(mockAxiosPost);

    const { result } = renderHook(() => useConcurrency());

    await act(async () => {
      await result.current.handleStart();
    });

    expect(result.current.isRunning).toBe(false);
    expect(mockAxiosPost).toHaveBeenCalledTimes(1000);
    expect(result.current.results).toHaveLength(1000);
    expect(result.current.results[0]).toBe(1);
    expect(result.current.results[99]).toBe(100);
  });

  it("should handle errors gracefully", async () => {
    const mockAxiosPost = jest.fn((_, { index }) =>
      Promise.reject(new Error(`Request ${index} failed`))
    );
    (axios.post as jest.Mock).mockImplementation(mockAxiosPost);

    const { result } = renderHook(() => useConcurrency());

    await act(async () => {
      await result.current.handleStart();
    });

    expect(result.current.isRunning).toBe(false);
    expect(mockAxiosPost).toHaveBeenCalledTimes(1000);
    expect(result.current.results).toHaveLength(0);
  });
});
