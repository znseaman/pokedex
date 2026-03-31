import { State } from "./state.js";

export function startREPL(state: State) {
  state.rl.prompt();

  state.rl.on("line", (line: string) => {
    if (line) {
      const [commandName] = cleanInput(line);
      const command: any = state.commands[commandName]?.callback;
      if (command) {
        command(state);
      }
    }

    state.rl.prompt();
  });
}

export function cleanInput(input: string): string[] {
  return input
    .split(/\s/)
    .map((c) => c.toLowerCase())
    .filter((c) => c);
}
