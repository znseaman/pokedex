import { getCommands } from "./command.js";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { describe, expect, test } from "vitest";

describe.each([
  {
    expected: {
      help: {
        name: "help",
        description: "Displays a help message",
        callback: commandHelp,
      },
      exit: {
        name: "exit",
        description: "Exits the pokedex",
        callback: commandExit,
      },
    },
  },
])("getCommands()", ({ expected }) => {
  test(`Expected: ${expected}`, () => {
    const actual = getCommands();

    expect(actual).toStrictEqual(expected);
  });
});
