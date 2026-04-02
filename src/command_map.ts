import { State } from "./state.js";

export async function commandMap(state: State) {
  const locations = await state.pokeAPI.fetchLocations(state.nextLocationsURL);

  state.nextLocationsURL = locations.next;
  state.previousLocationsURL = locations.previous;

  locations.results.forEach((o: Record<string, string>) => {
    console.log(o.name);
  });
}

export async function commandMapb(state: State) {
  const locations = await state.pokeAPI.fetchLocations(
    state.previousLocationsURL,
  );

  state.nextLocationsURL = locations.next;
  state.previousLocationsURL = locations.previous;

  locations.results.forEach((o: Record<string, string>) => {
    console.log(o.name);
  });
}

export async function commandExplore(state: State, locationName: string) {
  console.log(`Exploring ${locationName}`);
  const location = await state.pokeAPI.fetchLocation(locationName);

  if (location.pokemon_encounters) {
    console.log("Found Pokemon:");
  }

  for (const encounter of location.pokemon_encounters) {
    console.log(` - ${encounter.pokemon.name}`);
  }
}
