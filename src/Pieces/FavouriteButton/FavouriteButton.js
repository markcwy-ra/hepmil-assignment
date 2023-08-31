import React, { useContext } from "react";
import { ReactComponent as StarEmpty } from "../../Icons/Star-Empty.svg";
import { ReactComponent as StarFilled } from "../../Icons/Star-Filled.svg";
import { UserContext } from "../../Outlets/MainOutlet";
import { toggleFavourite } from "../../Utilities/fetch";

const FavouriteButton = ({ pokeData }) => {
  const { user, userPokemon } = useContext(UserContext);
  const isFavourite = userPokemon && userPokemon[pokeData.name] ? true : false;
  return (
    <div
      onClick={() =>
        toggleFavourite({
          username: user.username,
          pokeData,
        })
      }
    >
      {isFavourite ? <StarFilled /> : <StarEmpty />}
    </div>
  );
};

export default FavouriteButton;
