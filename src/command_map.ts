import { ShallowLocations } from "./poke_api.js";
import { State } from "./state.js";

export async function commandMap(state: State) {
  const results = await state.pokeAPI.fetchLocations();
  results.forEach((o: ShallowLocations) => {
    console.log(o.name);
  });
}
