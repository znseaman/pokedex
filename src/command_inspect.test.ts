import { describe, expect, test, vi } from "vitest";
import { State } from "./state.js";
import { commandInspect } from "./command_inspect.js";

const State = vi.fn(
  class {
    pokedex = {
      get: vi.fn(),
    };
  },
);

describe.each([
  {
    pokemonName: "pikachu",
    hasCaught: {
      val: {
        name: "pickachu",
        height: 67,
        weight: 76,
        stats: [
          {
            base_stat: 10,
            stat: {
              name: "personality",
            },
          },
        ],
        types: [
          {
            type: {
              name: "electric",
            },
          },
        ],
      },
    },
  },
  {
    pokemonName: "pikachu",
    hasCaught: undefined,
  },
])("commandInspect()", ({ pokemonName, hasCaught }) => {
  test(`Expected to update state and console.log`, async () => {
    const logSpy = vi.spyOn(console, "log");

    const state = new State();

    vi.mocked(state.pokedex.get).mockReturnValue(hasCaught);

    // @ts-ignore
    await commandInspect(state, pokemonName);

    if (!hasCaught) {
      expect(logSpy).toHaveBeenNthCalledWith(
        1,
        `you have not caught that pokemon`,
      );
    } else {
      expect(logSpy).toHaveBeenNthCalledWith(1, `Name: ${hasCaught.val.name}`);
      expect(logSpy).toHaveBeenNthCalledWith(
        2,
        `Height: ${hasCaught.val.height}`,
      );
      expect(logSpy).toHaveBeenNthCalledWith(
        3,
        `Weight: ${hasCaught.val.weight}`,
      );
      expect(logSpy).toHaveBeenNthCalledWith(4, `Stats:`);

      let i = 5;
      for (let stat of hasCaught.val.stats) {
        const { base_stat } = stat;
        const { name } = stat.stat;
        expect(logSpy).toHaveBeenNthCalledWith(i, `  - ${name}: ${base_stat}`);
        i++;
      }

      expect(logSpy).toHaveBeenNthCalledWith(i, `Types:`);
      i++;
      for (let t of hasCaught.val.types) {
        const { name } = t.type;
        expect(logSpy).toHaveBeenNthCalledWith(i, `  - ${name}`);
        i++;
      }
    }

    logSpy.mockRestore();
  });
});
