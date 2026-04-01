import { State } from "./state.js";

export async function commandPokedex(state: State) {
  console.log(`Your Pokedex:`);
  let totalPokemon = state.pokedex.getAllKeys();
  if (totalPokemon.length == 0) {
    console.log(" - EMPTY -");
  } else {
    for (const pokemon of totalPokemon) {
      console.log(` - ${pokemon}`);
    }
  }
}
