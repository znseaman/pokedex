import { RootPokemon } from "./poke_api.js";
import { State } from "./state.js";

export async function commandCatch(state: State, pokemonName: string) {
  console.log(`Throwing a Pokeball at ${pokemonName}...`);
  const pokemon = await state.pokeAPI.fetchPokemon(pokemonName);

  if (!pokemon) {
    console.log(`The pokemon ${pokemonName} does not exist!`);
    return;
  }

  const isCaught = caught(state, pokemon);
  if (isCaught) {
    console.log(`${pokemonName} was caught!`);
    state.pokedex.add(pokemonName, pokemon);
  } else {
    console.log(`${pokemonName} escaped!`);
  }
}

export function caught(state: State, pokemon: RootPokemon) {
  return (
    Math.floor(Math.random() * state.baseExperience) >
    Math.floor(Math.random() * pokemon.base_experience)
  );
}
