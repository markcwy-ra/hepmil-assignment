import React from "react";
import { titleCase } from "../../Utilities/utils";
import TypeTag from "../../Pieces/TypeTag/TypeTag";
import "./PokeCard.css";
import FavouriteButton from "../../Pieces/FavouriteButton/FavouriteButton";

const PokeCard = ({ pokeData, config = "default" }) => {
  if (pokeData) {
    const { name, photoUrl, types } = pokeData;
    if (config === "default") {
      return (
        <div className={`poke_card poke_card__default`}>
          <h2>{titleCase(name)}</h2>
          <img src={photoUrl} alt={name} />
          <div className="poke_card__types">
            {types.map((type) => (
              <TypeTag key={type.type.name} type={type.type.name} />
            ))}
          </div>
        </div>
      );
    } else {
      return (
        <div className={`poke_card poke_card__list`}>
          <img src={photoUrl} alt={name} />
          <h3>{titleCase(name)}</h3>

          <div className="poke_card__types">
            {types.map((type) => (
              <TypeTag key={type.type.name} type={type.type.name} />
            ))}
          </div>
          <FavouriteButton pokeData={pokeData} />
        </div>
      );
    }
  } else {
    return (
      <div className={`poke_card poke_card__${config}`}>
        <h4>Getting Poké data...</h4>
      </div>
    );
  }
};

export default PokeCard;
