import { createInterface, type Interface } from "node:readline";
import { stdin, stdout } from "node:process";
import { getCommands } from "./command.js";
import { PokeAPI } from "./poke_api.js";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State) => Promise<void>;
};

export type State = {
  rl: Interface;
  commands: any;
  pokeAPI: PokeAPI;
};

export function initState(): State {
  const prompt = "Pokedex > ";
  const rl = createInterface({
    input: stdin,
    output: stdout,
    prompt,
  });

  const commands = getCommands();
  const pokeAPI = new PokeAPI();

  return { rl, commands, pokeAPI };
}
