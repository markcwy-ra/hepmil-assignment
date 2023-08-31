import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchFullPokemon } from "../../Utilities/fetch";
import Header from "../../Parts/Header/Header.js";
import { titleCase } from "../../Utilities/utils";
import { UserContext } from "../../Outlets/MainOutlet";
import FavouriteButton from "../../Pieces/FavouriteButton/FavouriteButton";
import "./PokemonPage.css";
import TypeTag from "../../Pieces/TypeTag/TypeTag";

const PokemonPage = () => {
  const { pokeName } = useParams();
  const { user } = useContext(UserContext);
  const [pokeData, setPokeData] = useState(null);
  const [pokeFullData, setPokeFullData] = useState(null);

  useEffect(() => {
    const getPokeData = async () => {
      const response = await fetchFullPokemon(pokeName);
      setPokeData(response.pokeData);
      setPokeFullData(response.pokeFullData);
    };
    getPokeData();
  }, [pokeName]);
  console.log(pokeFullData);

  if (pokeData && pokeFullData) {
    return (
      <>
        <Header>
          <h2>#{pokeFullData.id}</h2>
          {user.uid && pokeData ? (
            <FavouriteButton pokeData={pokeData} />
          ) : (
            <></>
          )}
        </Header>
        <div className="pokemon_page flex_column">
          <h1>{titleCase(pokeData.name)}</h1>
          <div className="poke_page_types__list">
            {pokeData.types.map((type) => (
              <TypeTag key={type.type.name} type={type.type.name} />
            ))}
          </div>
          <img src={pokeData.photoUrl} alt={pokeData.name} />
          <h4>Abilties</h4>
          <div className="flex_row">
            {pokeFullData.abilities.map((ability, i) => (
              <h3 className="pokemon__ability" key={i}>
                {titleCase(ability.ability.name)}
              </h3>
            ))}
          </div>
          <p>{pokeFullData.flavor_text}</p>
        </div>
      </>
    );
  } else {
    return <h4 className="content">Loading Data</h4>;
  }
};

export default PokemonPage;
