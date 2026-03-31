import { Cache } from "./poke_cache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  cache: Cache;

  constructor() {
    this.cache = new Cache(5000);
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL || `${PokeAPI.baseURL}/location-area`;

    // @ts-ignore: todo fix this type
    const isCached = this.cache.get<ShallowLocations>(url);
    if (isCached) {
      // @ts-ignore: todo fix this type
      return isCached.val;
    }

    const request = await fetch(url);
    const locations: ShallowLocations = await request.json();

    this.cache.add(url, locations);

    return locations;
  }

  async fetchLocation(locationName: string): Promise<RootLocation> {
    const url = `${PokeAPI.baseURL}/location-area/${locationName}`;

    const isCached = this.cache.get<RootLocation>(url);
    if (isCached) {
      return isCached.val;
    }

    const request = await fetch(url);
    const location: RootLocation = await request.json();

    this.cache.add(url, location);

    return location;
  }
}

export type ShallowLocations = {
  count: number;
  next: string;
  previous: string;
  results: {
    name: string;
    url: string;
  }[];
};

export interface RootLocation {
  id: number;
  name: string;
  game_index: number;
  encounter_method_rates: EncounterMethodRate[];
  location: Location;
  names: Name[];
  pokemon_encounters: PokemonEncounter[];
}

export interface EncounterMethodRate {
  encounter_method: EncounterMethod;
  version_details: VersionDetail[];
}

export interface EncounterMethod {
  name: string;
  url: string;
}

export interface VersionDetail {
  rate: number;
  version: Version;
}

export interface Version {
  name: string;
  url: string;
}

export interface Location {
  name: string;
  url: string;
}

export interface Name {
  name: string;
  language: Language;
}

export interface Language {
  name: string;
  url: string;
}

export interface PokemonEncounter {
  pokemon: Pokemon;
  version_details: VersionDetail2[];
}

export interface Pokemon {
  name: string;
  url: string;
}

export interface VersionDetail2 {
  version: Version2;
  max_chance: number;
  encounter_details: EncounterDetail[];
}

export interface Version2 {
  name: string;
  url: string;
}

export interface EncounterDetail {
  min_level: number;
  max_level: number;
  condition_values: any[];
  chance: number;
  method: Method;
}

export interface Method {
  name: string;
  url: string;
}
