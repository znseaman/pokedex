import { RootPokemon } from "./poke_api.js";
import { State } from "./state.js";

export async function commandInspect(state: State, pokemonName: string) {
  const hasCaught = state.pokedex.get(pokemonName);
  if (hasCaught) {
    printPokemonFacts(hasCaught.val);
  } else {
    console.log("you have not caught that pokemon");
  }
}

function printPokemonFacts(pokemon: RootPokemon) {
  const { name, height, weight, stats, types } = pokemon;

  console.log(`Name: ${name}`);
  console.log(`Height: ${height}`);
  console.log(`Weight: ${weight}`);

  console.log(`Stats:`);
  for (let stat of stats) {
    const { base_stat } = stat;
    const { name } = stat.stat;
    console.log(`  - ${name}: ${base_stat}`);
  }

  console.log(`Types:`);
  for (let t of types) {
    const { name } = t.type;
    console.log(`  - ${name}`);
  }
}
