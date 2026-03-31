import { createInterface, type Interface } from "node:readline";
import { stdin, stdout } from "node:process";
import { getCommands } from "./command.js";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State) => void;
};

export type State = {
  rl: Interface;
  commands: any;
};

export function initState(): State {
  const prompt = "Pokedex > ";
  const rl = createInterface({
    input: stdin,
    output: stdout,
    prompt,
  });

  const commands = getCommands();

  return { rl, commands };
}
