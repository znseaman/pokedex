import { CLICommand, State } from "./state.js";

export async function commandHelp(state: State) {
  console.log(`Welcome to the Pokedex!`);
  console.log(`Usage:`);
  console.log(``);

  const commandDictionary: Record<string, CLICommand> = state.commands;
  for (let [, value] of Object.entries(commandDictionary)) {
    console.log(`${value?.name}: ${value?.description}`);
  }
}
