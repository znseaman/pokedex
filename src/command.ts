import { commandCatch } from "./command_catch.js";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandInspect } from "./command_inspect.js";
import { commandExplore, commandMap } from "./command_map.js";
import { commandMapb } from "./command_mapb.js";
import { commandPokedex } from "./command_pokedex.js";
import { CLICommand } from "./state.js";

export function getCommands(): Record<string, CLICommand> {
  return {
    pokedex: {
      name: "pokedex",
      description: "Display Pokemon in Pokedex",
      callback: commandPokedex,
    },
    inspect: {
      name: "inspect",
      description: "Inspect Pokemon based on pokemon name",
      callback: commandInspect,
    },
    catch: {
      name: "catch",
      description: "Catch Pokemon based on pokemon name",
      callback: commandCatch,
    },
    explore: {
      name: "explore",
      description: "Display Pokemon based on location name",
      callback: commandExplore,
    },
    map: {
      name: "map",
      description: "Displays the names of 20 locations",
      callback: commandMap,
    },
    mapb: {
      name: "mapb",
      description: "Displays the previous names of 20 locations",
      callback: commandMapb,
    },
    help: {
      name: "help",
      description: "Displays a help message",
      callback: commandHelp,
    },
    exit: {
      name: "exit",
      description: "Exits the pokedex",
      callback: commandExit,
    },
  };
}
