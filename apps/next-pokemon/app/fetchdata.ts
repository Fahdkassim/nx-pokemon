import type { Pokemon } from '@nx-pokemon/shared-types';

export async function fetchPokemonData(search: string): Promise<Pokemon[]> {
  const res = await fetch(`http://localhost:3000/search?q=${search}`);

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const data = await res.json();
  return data;
}
