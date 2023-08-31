import React from "react";
import { titleCase } from "../../utils";
import TypeTag from "../../Pieces/TypeTag/TypeTag";
import "./PokeCard.css";

const PokeCard = ({ pokeData, config = "default" }) => {
  if (pokeData) {
    const { name, photoUrl, types } = pokeData;
    return (
      <div className={`poke_card poke_card__${config}`}>
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
      <div className={`poke_card poke_card__${config}`}>
        <h4>Getting Poké data...</h4>
      </div>
    );
  }
};

export default PokeCard;
