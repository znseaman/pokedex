export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  limit: number;
  offset: number;
  nextLocationsURL: string;
  prevLocationsURL: string;

  constructor() {
    this.limit = 20;
    this.offset = 0;
    this.nextLocationsURL = `${PokeAPI.baseURL}/location-area?limit=${this.limit}&offset=${this.offset}`;
    this.prevLocationsURL = "";
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations[]> {
    const request = await fetch(pageURL ? pageURL : this.nextLocationsURL);
    const response = await request.json();

    this.nextLocationsURL = response?.next || "";
    this.prevLocationsURL = response?.previous || "";

    return response.results;
  }
}

export type ShallowLocations = {
  id: number;
  name: string;
};
