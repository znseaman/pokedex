import { describe, expect, test, vi } from "vitest";
import { State } from "./state.js";
import { commandMapb } from "./command_mapb.js";

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
