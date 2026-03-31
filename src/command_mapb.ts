import { ShallowLocations } from "./poke_api.js";
import { State } from "./state.js";

export async function commandMapb(state: State) {
  const results = await state.pokeAPI.fetchLocations(
    state.pokeAPI.prevLocationsURL,
  );
  results.forEach((o: ShallowLocations) => {
    console.log(o.name);
  });
}
