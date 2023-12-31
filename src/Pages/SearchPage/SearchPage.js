import React, { useState } from "react";
import "./SearchPage.css";
import ErrorPill from "../../Pieces/ErrorPill/ErrorPill";
import { formatSearchQuery, isValidPokeSearch } from "../../Utilities/utils";
import { fetchPokemon, fetchPokemonSpecies } from "../../Utilities/fetch";
import PokeCard from "../../Parts/PokeCard/PokeCard";
import Header from "../../Parts/Header/Header";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [pokeData, setPokeData] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleInput = (e) => {
    setErrorMessage(null);
    setQuery(e.currentTarget.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setPokeData([]);
    setIsSearching(true);
    setErrorMessage(null);
    if (query) {
      if (isValidPokeSearch(query)) {
        const formattedQuery = formatSearchQuery(query);
        try {
          const response = await fetchPokemon(formattedQuery);
          setPokeData([response]);
          setIsSearching(false);
        } catch {
          try {
            const response = await fetchPokemonSpecies(query);
            setPokeData(response);
            setIsSearching(false);
          } catch {
            setErrorMessage("Not found");
            setIsSearching(false);
          }
        }
      } else {
        setErrorMessage("Invalid characters detected!");
        setIsSearching(false);
      }
    } else {
      setErrorMessage("Please input search term!");
      setIsSearching(false);
    }
  };

  return (
    <>
      <Header>
        <h1>Search</h1>
      </Header>
      <div className="search flex_column">
        <form className="flex_column search__form" onSubmit={handleSearch}>
          <input
            type="text"
            value={query}
            onChange={handleInput}
            placeholder="Enter Pokémon name or Pokédex no:"
          />
        </form>
        {isSearching ? <h4>Searching database...</h4> : <></>}
        {errorMessage ? <ErrorPill errorMessage={errorMessage} /> : <></>}

        <div className="search__results">
          {pokeData ? (
            pokeData.map((pokemon) => (
              <PokeCard key={pokemon.name} pokeData={pokemon} config="list" />
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchPage;
