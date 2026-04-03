import { State } from "./state.js";

export async function startREPL(state: State) {
  state.rl.prompt();

  const onLineEventHandler: any = await getOnLineEventHandler(state);
  state.rl.on("line", onLineEventHandler);
}

export async function getOnLineEventHandler(state: State) {
  return async function onLineEvent(line: string) {
    if (line) {
      const [commandName, ...args] = cleanInput(line);
      const command: any = state.commands[commandName]?.callback;
      if (command) {
        try {
          await command(state, ...args);
        } catch (error) {
          console.log((error as Error).message);
        }
      }
    }

    state.rl.prompt();
  };
}

export function cleanInput(input: string): string[] {
  return input
    .split(/\s/)
    .map((c) => c.toLowerCase())
    .filter((c) => c);
}
