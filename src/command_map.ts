import { State } from "./state.js";

export async function commandMap(state: State) {
  const locations = await state.pokeAPI.fetchLocations(state.nextLocationsURL);

  state.nextLocationsURL = locations.next;
  state.previousLocationsURL = locations.previous;

  locations.results.forEach((o: Record<string, string>) => {
    console.log(o.name);
  });
}
