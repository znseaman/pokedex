import { describe, expect, test, vi, afterEach } from "vitest";
import { PokeAPI } from "./poke_api.js";

const fetchLocationsResponse = {
  next: "next",
  previous: "previous",
  pokemon_encounters: [
    { pokemon: { name: "pikachu" } },
    { pokemon: { name: "pidgey" } },
  ],
};

const fetchLocationResponse = {
  next: "next",
  previous: "previous",
  pokemon_encounters: [
    { pokemon: { name: "pikachu" } },
    { pokemon: { name: "pidgey" } },
  ],
};

const fetchPokemonResponse = {
  base_experience: 100,
};

describe.each([
  {
    pageURL: "",
  },
  {
    pageURL: "bestPageURL",
  },
])("fetchLocations()", ({ pageURL }) => {
  afterEach(() => {
    vi.restoreAllMocks();
  });
  test(`Expected to handle different pageURL inputs`, async () => {
    // setup mock response
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(fetchLocationsResponse),
    });

    const pokeAPI = new PokeAPI();

    // @ts-ignore
    const result = await pokeAPI.fetchLocations(pageURL ? pageURL : undefined);

    expect(result).toBe(fetchLocationsResponse);
    expect(global.fetch).toHaveBeenCalledWith(
      pageURL ? pageURL : `https://pokeapi.co/api/v2/location-area`,
    );
  });
});

describe.each([
  {
    locationName: "bestLocation",
  },
])("fetchLocation()", ({ locationName }) => {
  afterEach(() => {
    vi.restoreAllMocks();
  });
  test(`Expected to handle different locationName inputs`, async () => {
    // setup mock response
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(fetchLocationResponse),
    });

    const pokeAPI = new PokeAPI();

    const result = await pokeAPI.fetchLocation(
      // @ts-ignore
      locationName ? locationName : undefined,
    );

    expect(result).toBe(locationName ? fetchLocationResponse : false);
    expect(global.fetch).toHaveBeenCalledWith(
      locationName
        ? `https://pokeapi.co/api/v2/location-area/${locationName}`
        : `https://pokeapi.co/api/v2/location-area/`,
    );
  });
});

describe.each([
  {
    pokemonName: "pikachu",
  },
])("fetchLocation()", ({ pokemonName }) => {
  afterEach(() => {
    vi.restoreAllMocks();
  });
  test(`Expected to handle different pokemonName inputs`, async () => {
    // setup mock response
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(fetchPokemonResponse),
    });

    const pokeAPI = new PokeAPI();

    const result = await pokeAPI.fetchPokemon(
      // @ts-ignore
      pokemonName ? pokemonName : undefined,
    );

    expect(result).toBe(pokemonName ? fetchPokemonResponse : false);
    expect(global.fetch).toHaveBeenCalledWith(
      pokemonName
        ? `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
        : `https://pokeapi.co/api/v2/pokemon/`,
    );
  });
});
