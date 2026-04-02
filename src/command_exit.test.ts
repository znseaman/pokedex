import { describe, expect, test, vi } from "vitest";
import { State } from "./state.js";
import { commandExit } from "./command_exit.js";

const State = vi.fn(
  class {
    rl = {
      close: vi.fn(),
    };
  },
);

describe("commandExit()", () => {
  test(`Expected to update state and console.log`, async () => {
    const logSpy = vi.spyOn(console, "log");

    // @ts-ignore
    const exitSpy = vi.spyOn(process, "exit").mockImplementation(() => {});

    const state = new State();

    const closeSpy = vi.spyOn(state.rl, "close");

    // @ts-ignore
    await commandExit(state);

    expect(logSpy).toHaveBeenNthCalledWith(
      1,
      "Closing the Pokedex... Goodbye!",
    );
    expect(exitSpy).toHaveBeenCalledWith(0);

    logSpy.mockRestore();
    exitSpy.mockRestore();
    closeSpy.mockRestore();
  });
});
