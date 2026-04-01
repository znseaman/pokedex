import { describe, expect, test, vi } from "vitest";
import { State } from "./state.js";
import { commandPokedex } from "./command_pokedex.js";

const State = vi.fn(
  class {
    pokedex = {
      getAllKeys: vi.fn(),
    };
  },
);

describe.each([
  {
    keys: ["pikachu", "pidgey"],
  },
  {
    keys: [],
  },
])("commandPokedex()", ({ keys }) => {
  test(`Expected to update state and console.log`, async () => {
    const logSpy = vi.spyOn(console, "log");

    const state = new State();

    vi.mocked(state.pokedex.getAllKeys).mockReturnValue(keys);

    // @ts-ignore
    await commandPokedex(state);

    expect(logSpy).toHaveBeenNthCalledWith(1, `Your Pokedex:`);

    if (keys.length == 0) {
      expect(logSpy).toHaveBeenNthCalledWith(2, ` - EMPTY -`);
    } else {
      let i = 2;
      for (let key of keys) {
        expect(logSpy).toHaveBeenNthCalledWith(i, ` - ${key}`);
        i++;
      }
    }

    logSpy.mockRestore();
  });
});
