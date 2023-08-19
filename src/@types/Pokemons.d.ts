export interface Pokemon {
  id: number;
  pokedexId: number;
  name: string;
  image: string;
  sprite: string;
  slug: string;
  stats: Stats;
  apiTypes: Type[];
  apiGeneration: number;
  apiResistances: Resistance[];
  resistanceModifyingAbilitiesForApi: any[];
  apiEvolutions: Evolution[];
  apiPreEvolution: PreEvolution;
  apiResistancesWithAbilities: any[];
}

export interface Stats {
  HP: number;
  attack: number;
  defense: number;
  special_attack: number;
  special_defense: number;
  speed: number;
}

export interface Type {
  name: string;
  image: string;
}

export interface Resistance {
  name: string;
  damage_multiplier: number;
  damage_relation: string;
}

export interface Evolution {
  name: string;
  pokedexId: number;
}

export interface PreEvolution {
  name: string;
  pokedexIdd: number;
}
