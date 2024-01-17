'use client';
import { useEffect, useState, useCallback } from 'react';
import type { Pokemon } from '@nx-pokemon/shared-types';
import { fetchPokemonData } from './fetchdata'; // Update the path accordingly

export default function Index() {
  const [search, setSearch] = useState('');
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  // adding this comment to test Husky
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchPokemonData(search);
        setPokemon(data);
      } catch (error) {
        console.error('There was a problem with the fetch operation: ', error);
      }
    }

    fetchData();
  }, [search]);

  const onSetSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }, []);

  return (
    <div>
      <input
        value={search}
        onChange={onSetSearch}
        style={{
          height: '2rem',
          width: '20rem',
          fontSize: '1.5rem',
          border: '1px solid black',
          padding: '0.5rem',
          margin: '1rem',
        }}
      />
      <div>
        <ul>
          {pokemon.slice(0, 10).map(({ name: { english } }, id) => (
            <li key={id}>{english}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
