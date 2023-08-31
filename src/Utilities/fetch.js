import axios from "axios";
import { get, ref, remove, set } from "firebase/database";
import { database } from "../firebase";

export const fetchPokemon = async (query) => {
  const response = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/${query}`
  );
  return {
    name: response.data.name,
    photoUrl: response.data.sprites.front_default,
    types: response.data.types,
  };
};

export const fetchPokemonSpecies = async (query) => {
  const response = await axios.get(
    `https://pokeapi.co/api/v2/pokemon-species/${query}`
  );

  const pokeSearchArray = response.data.varieties.map(
    (pokemon) => pokemon.pokemon.name
  );

  const promiseArray = pokeSearchArray.map(fetchPokemon);

  const newResponse = await Promise.all(promiseArray);

  return newResponse;
};

export const toggleFavourite = async ({ username, pokeData }) => {
  const pokeRef = ref(
    database,
    `users/${username}/favourites/${pokeData.name}`
  );
  const response = await get(pokeRef);
  if (response.exists()) {
    remove(pokeRef);
  } else {
    set(pokeRef, pokeData);
  }
};
