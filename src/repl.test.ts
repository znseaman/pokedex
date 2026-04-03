import { cleanInput, startREPL, getOnLineEventHandler } from "./repl.js";
import { describe, expect, test, vi } from "vitest";

const State = vi.fn(
  class {
    rl = {
      prompt: vi.fn(),
      on: vi.fn(),
    };
    commands = {
      map: {
        callback: vi.fn(),
      },
    };
  },
);

describe.each([
  {
    input: "   hello  world    ",
    expected: ["hello", "world"],
  },
  {
    input: " HELLO WORLD ",
    expected: ["hello", "world"],
  },
  {
    input: " HEllo WOrLD ",
    expected: ["hello", "world"],
  },
  {
    input: "  Lol	Lol  \n   Lol ",
    expected: ["lol", "lol", "lol"],
  },
])("cleanInput($input)", ({ input, expected }) => {
  test(`Expected: ${expected}`, () => {
    const actual = cleanInput(input);

    expect(actual).toHaveLength(expected.length);
    for (const i in expected) {
      expect(actual[i]).toBe(expected[i]);
    }
  });
});

describe.each([
  {
    input: "map",
  },
  {
    input: "",
  },
])("startREPL()", ({ input }) => {
  test(`Expected: ${input}`, async () => {
    const state = new State();
    const promptSpy = vi.spyOn(state.rl, "prompt");
    const onSpy = vi.spyOn(state.rl, "on");

    // @ts-ignore
    await startREPL(state);

    expect(promptSpy).toHaveBeenCalledTimes(1);
    expect(onSpy).toHaveBeenCalledTimes(1);

    promptSpy.mockRestore();
    onSpy.mockRestore();
  });
});

describe.each([
  {
    input: "map",
  },
  {
    input: "",
  },
])("getOnLineEventHandler()", ({ input }) => {
  test(`Verify onLineEventHandler works for inputs: ${input}`, async () => {
    const state = new State();
    const promptSpy = vi.spyOn(state.rl, "prompt");

    const [callbackName] = cleanInput(input);

    let callbackSpy;
    if (input) {
      // @ts-ignore
      callbackSpy = vi.spyOn(state.commands[callbackName], "callback");
    }

    // @ts-ignore
    const onLineEventHandler = await getOnLineEventHandler(state);
    await onLineEventHandler(input);

    expect(promptSpy).toHaveBeenCalledTimes(1);

    if (input) {
      expect(callbackSpy).toHaveBeenCalledTimes(input ? 1 : 0);
      expect(callbackSpy).toHaveBeenCalledWith(state);
    }

    if (input) callbackSpy.mockRestore();

    promptSpy.mockRestore();
  });
});
