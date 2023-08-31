import axios from "axios";

export const onlyAlphaNumeric = (input) => {
  const regex = /^[A-Za-z0-9]+$/;
  return regex.test(input);
};

export const isValidPokeSearch = (input) => {
  const regex = /^[A-Za-z0-9.-\s]+$/;
  return regex.test(input);
};

export const randomNumber = (number) => {
  return Math.ceil(Math.random() * number);
};

const capitalise = (word) => {
  const firstLetter = word.charAt(0).toUpperCase();
  const remainingLetters = word.slice(1);
  return firstLetter + remainingLetters;
};

export const titleCase = (input) => {
  if (input.includes("-")) {
    const name = input.split("-");
    let result = "";
    for (let i = 0; i < name.length; i++) {
      result += capitalise(name[i]);
      if (i !== name.length - 1) {
        result += " ";
      }
    }
    return result;
  } else {
    return capitalise(input);
  }
};

export const formatSearchQuery = (input) => {
  let cleanedInput = input;
  cleanedInput = cleanedInput.replace(/\./g, "");
  cleanedInput = cleanedInput.replace(/\s/g, "-");
  return cleanedInput.toLowerCase();
};

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
