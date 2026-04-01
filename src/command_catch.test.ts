import { describe, expect, test, vi } from "vitest";
import { State } from "./state.js";
import { commandCatch, caught } from "./command_catch.js";

const State = vi.fn(
  class {
    pokedex = {
      get: vi.fn(),
      add: vi.fn(),
    };
    pokeAPI = {
      fetchPokemon: vi.fn(),
    };
    baseExperience = 9000;
  },
);

// const Math = vi.fn(
//   class {
//     random = vi.fn();
//   },
// );

describe.each([
  {
    pokemonName: "pikachu",
    pokemon: {
      base_experience: 100,
    },
  },
  {
    pokemonName: "mewtwo",
    pokemon: {
      base_experience: 9000,
    },
  },
  {
    pokemonName: "vegeta",
    pokemon: undefined,
  },
])("commandCatch()", ({ pokemonName, pokemon }) => {
  test(`Expected to update state and console.log`, async () => {
    const logSpy = vi.spyOn(console, "log");

    const MOCKED_RANDOM = 0.1;
    vi.spyOn(Math, "random")
      .mockReturnValueOnce(MOCKED_RANDOM)
      .mockReturnValueOnce(MOCKED_RANDOM);

    const state = new State();

    vi.mocked(state.pokeAPI.fetchPokemon).mockReturnValue(pokemon);

    // @ts-ignore
    await commandCatch(state, pokemonName);

    expect(logSpy).toHaveBeenNthCalledWith(
      1,
      `Throwing a Pokeball at ${pokemonName}...`,
    );

    if (!pokemon) {
      expect(logSpy).toHaveBeenNthCalledWith(
        2,
        `The pokemon ${pokemonName} does not exist!`,
      );
    } else {
      const isCaught =
        Math.floor(MOCKED_RANDOM * state.baseExperience) >
        // @ts-ignore
        Math.floor(MOCKED_RANDOM * (pokemon?.base_experience || 0));

      if (!isCaught) {
        expect(logSpy).toHaveBeenNthCalledWith(2, `${pokemonName} escaped!`);
      } else {
        expect(logSpy).toHaveBeenNthCalledWith(2, `${pokemonName} was caught!`);
        expect(state.pokedex.add).toHaveBeenCalledWith(pokemonName, pokemon);
      }
    }

    logSpy.mockRestore();
  });
});
