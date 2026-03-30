import { createInterface } from "node:readline";
import { stdin, stdout } from "node:process";

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
      const cleanLine = cleanInput(line);
      console.log(`Your command was: ${cleanLine[0]}`);
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
