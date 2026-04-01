import { describe, expect, test, vi } from "vitest";
import { State } from "./state.js";
import { commandHelp } from "./command_help.js";

const State = vi.fn(
  class {
    commands = {
      thing: {
        name: "thing",
        description: "does a thing",
      },
      another_thing: {
        name: "another_thing",
        description: "does another thing",
      },
    };
  },
);

describe("commandHelp()", () => {
  test(`Expected to update state and console.log`, async () => {
    const logSpy = vi.spyOn(console, "log");

    const state = new State();

    // @ts-ignore
    await commandHelp(state);

    expect(logSpy).toHaveBeenNthCalledWith(1, `Welcome to the Pokedex!`);
    expect(logSpy).toHaveBeenNthCalledWith(2, `Usage:`);
    expect(logSpy).toHaveBeenNthCalledWith(3, ``);
    expect(logSpy).toHaveBeenNthCalledWith(4, `thing: does a thing`);
    expect(logSpy).toHaveBeenNthCalledWith(
      5,
      `another_thing: does another thing`,
    );

    logSpy.mockRestore();
  });
});
