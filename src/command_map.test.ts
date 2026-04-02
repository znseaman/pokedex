import { describe, expect, test, vi } from "vitest";
import { State } from "./state.js";
import { commandMap, commandExplore, commandMapb } from "./command_map.js";

const State = vi.fn(
  class {
    pokeAPI = {
      fetchLocations: vi.fn(),
      fetchLocation: vi.fn(),
    };
    nextLocationsURL = "";
    previousLocationsURL = "";
  },
);

describe("commandMap()", () => {
  test(`Expected to update state and console.log`, async () => {
    const logSpy = vi.spyOn(console, "log");

    const state = new State();

    vi.mocked(state.pokeAPI.fetchLocations).mockReturnValue({
      next: "next",
      previous: "previous",
      results: [{ name: "bob" }, { name: "henry" }],
    });

    // @ts-ignore
    await commandMap(state);

    expect(state.nextLocationsURL).toBe("next");
    expect(state.previousLocationsURL).toBe("previous");
    expect(logSpy).toHaveBeenCalledTimes(2);

    logSpy.mockRestore();
  });
});

describe("commandMapb()", () => {
  test(`Expected to update state and console.log`, async () => {
    const logSpy = vi.spyOn(console, "log");

    const state = new State();

    vi.mocked(state.pokeAPI.fetchLocations).mockReturnValue({
      next: "next",
      previous: "previous",
      results: [{ name: "bob" }, { name: "henry" }],
    });

    // @ts-ignore
    await commandMapb(state);

    expect(state.nextLocationsURL).toBe("next");
    expect(state.previousLocationsURL).toBe("previous");
    expect(logSpy).toHaveBeenCalledTimes(2);

    logSpy.mockRestore();
  });
});

describe.each([
  {
    locationName: "home",
  },
])("commandExplore()", ({ locationName }) => {
  test(`Expected to explore ${locationName}`, async () => {
    const logSpy = vi.spyOn(console, "log");

    const state = new State();

    vi.mocked(state.pokeAPI.fetchLocation).mockReturnValue({
      next: "next",
      previous: "previous",
      pokemon_encounters: [
        { pokemon: { name: "pikachu" } },
        { pokemon: { name: "pidgey" } },
      ],
    });

    // @ts-ignore
    await commandExplore(state, locationName);

    expect(logSpy).toHaveBeenNthCalledWith(1, `Exploring home`);
    expect(logSpy).toHaveBeenCalledTimes(4);

    logSpy.mockRestore();
  });
});
