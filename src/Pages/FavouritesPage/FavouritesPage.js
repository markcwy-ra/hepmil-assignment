import { signOut } from "firebase/auth";
import React, { useContext, useEffect } from "react";
import { auth } from "../../firebase";
import { UserContext, emptyUser } from "../../Outlets/MainOutlet";
import { useNavigate } from "react-router-dom";
import PokeCard from "../../Parts/PokeCard/PokeCard";
import "./FavouritesPage.css";
import Header from "../../Parts/Header/Header";

const FavouritesPage = () => {
  const { user, setUser, userPokemon } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.uid) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, [user]);

  const handleLogOut = async () => {
    await signOut(auth);
    setUser(emptyUser);
  };

  return (
    <>
      <Header>
        <h2>@{user.username}</h2>
        <button onClick={handleLogOut}>
          <h5>Log Out</h5>
        </button>
      </Header>
      <div className="favourites">
        {userPokemon && Object.keys(userPokemon).length ? (
          <div className="favourites__list">
            {Object.entries(userPokemon).map(([key, data]) => {
              return <PokeCard key={key} config="list" pokeData={data} />;
            })}
          </div>
        ) : (
          <h3>You don't have any favourites!</h3>
        )}
      </div>
    </>
  );
};

export default FavouritesPage;
