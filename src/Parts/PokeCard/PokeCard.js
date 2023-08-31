import React, { useContext } from "react";
import { titleCase } from "../../Utilities/utils";
import TypeTag from "../../Pieces/TypeTag/TypeTag";
import "./PokeCard.css";
import FavouriteButton from "../../Pieces/FavouriteButton/FavouriteButton";
import { UserContext } from "../../Outlets/MainOutlet";
import { useNavigate } from "react-router-dom";

const PokeCard = ({ pokeData, config = "default" }) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/pokemon/" + pokeData.name);
  };

  if (pokeData) {
    const { name, photoUrl, types } = pokeData;
    if (config === "default") {
      return (
        <div className={`poke_card poke_card__default`}>
          <h2 onClick={handleClick}>{titleCase(name)}</h2>
          <img onClick={handleClick} src={photoUrl} alt={name} />
          <div className="poke_card_types__default">
            {types.map((type) => (
              <TypeTag key={type.type.name} type={type.type.name} />
            ))}
          </div>
          {user.uid ? <FavouriteButton pokeData={pokeData} /> : <></>}
        </div>
      );
    } else {
      return (
        <div className={`poke_card poke_card__list`}>
          <div onClick={handleClick} className="flex_row">
            <img src={photoUrl} alt={name} />
            <h3>{titleCase(name)}</h3>
          </div>
          <div className="flex_row ">
            <div className="poke_card_types__list">
              {types.map((type) => (
                <TypeTag key={type.type.name} type={type.type.name} />
              ))}
            </div>
            {user.uid ? <FavouriteButton pokeData={pokeData} /> : <></>}
          </div>
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
