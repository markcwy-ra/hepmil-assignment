import React, { useEffect, useState } from "react";
import PokeCard from "../../Parts/PokeCard/PokeCard";
import { fetchPokemon, randomNumber } from "../../utils";
import "./HomePage.css";

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
    <div className="content">
      <h1>Welcome to PokéFaves!</h1>

      <div className="home__pokemon">
        <h4>Random Pokémon:</h4>
        <PokeCard pokeData={pokeData} />
        <button onClick={handleRandomPoke}>
          Give me another random Pokémon
        </button>
      </div>
    </div>
  );
};

export default HomePage;
