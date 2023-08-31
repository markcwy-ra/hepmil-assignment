import React, { useEffect, useState } from "react";
import PokeCard from "../../Parts/PokeCard/PokeCard";
import { randomNumber } from "../../Utilities/utils";
import "./HomePage.css";
import { fetchPokemon } from "../../Utilities/fetch";

const HomePage = () => {
  const [pokeData, setPokeData] = useState(null);
  const [pokeNumber, setPokeNumber] = useState(randomNumber(1010));

  useEffect(() => {
    const getPokeData = async () => {
      const response = await fetchPokemon(pokeNumber);
      setPokeData(response);
    };
    setPokeData(null);
    getPokeData();
  }, [pokeNumber]);

  const handleRandomPoke = () => {
    setPokeNumber(randomNumber(1010));
  };

  return (
    <div className="content home">
      <h1>Welcome to PokéFaves!</h1>

      <div className="flex_column home__pokemon">
        <h4>Pokédex Entry #{pokeNumber}</h4>
        <PokeCard pokeData={pokeData} />
        <button onClick={handleRandomPoke}>
          <h5>Another Pokémon please!</h5>
        </button>
      </div>
    </div>
  );
};

export default HomePage;
