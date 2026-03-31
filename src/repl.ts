import { createInterface } from "node:readline";
import { stdin, stdout } from "node:process";
import { getCommands } from "./command.js";

const prompt = "Pokedex > ";
const rl = createInterface({
  input: stdin,
  output: stdout,
  prompt,
});

export function startREPL() {
  rl.prompt();

  rl.on("line", (line: string) => {
    if (line) {
      const [commandName] = cleanInput(line);
      const command: any = getCommands()[commandName]?.callback;
      if (command) {
        command();
      }
    }

    rl.prompt();
  });
}

export function cleanInput(input: string): string[] {
  return input
    .split(/\s/)
    .map((c) => c.toLowerCase())
    .filter((c) => c);
}
