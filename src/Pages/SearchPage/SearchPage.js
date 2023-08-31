import React, { useState } from "react";
import "./SearchPage.css";
import axios from "axios";
import ErrorPill from "../../Pieces/ErrorPill/ErrorPill";
import {
  fetchPokemon,
  fetchPokemonSpecies,
  formatSearchQuery,
  isValidPokeSearch,
} from "../../utils";
import PokeCard from "../../Parts/PokeCard/PokeCard";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [pokeData, setPokeData] = useState([]);

  const handleInput = (e) => {
    setErrorMessage(null);
    setQuery(e.currentTarget.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    if (query) {
      if (isValidPokeSearch(query)) {
        const formattedQuery = formatSearchQuery(query);
        try {
          const response = await fetchPokemon(formattedQuery);
          setPokeData([response]);
        } catch {
          try {
            const response = await fetchPokemonSpecies(query);
            setPokeData(response);
          } catch {
            setErrorMessage("Not found");
          }
        }
      } else {
        setErrorMessage("Invalid characters detected!");
      }
    } else {
      setErrorMessage("Please input search term!");
    }
  };

  return (
    <div className="content">
      <h1>Search</h1>
      <form className="search__form" onSubmit={handleSearch}>
        <h4>Enter Pokémon name or Pokédex no:</h4>
        <input type="text" value={query} onChange={handleInput} />
      </form>
      {pokeData ? (
        pokeData.map((pokemon) => (
          <PokeCard key={pokemon.name} pokeData={pokemon} />
        ))
      ) : (
        <></>
      )}
      {errorMessage ? <ErrorPill errorMessage={errorMessage} /> : <></>}
    </div>
  );
};

export default SearchPage;
