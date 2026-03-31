import { getCommands } from "./command.js";

export function commandHelp() {
  console.log(`Welcome to the Pokedex!`);
  console.log(`Usage:`);
  console.log(``);

  const commandDictionary = getCommands();
  for (let [key, value] of Object.entries(commandDictionary)) {
    console.log(`${value.name}: ${value.description}`);
  }
}
