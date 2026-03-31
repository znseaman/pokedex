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
    const isCached = this.cache.get(url);
    if (isCached) {
      // @ts-ignore: todo fix this type
      return isCached.val;
    }

    const request = await fetch(url);
    const locations: ShallowLocations = await request.json();

    this.cache.add(url, locations);

    return locations;
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
