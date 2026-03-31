import { State } from "./state.js";

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
