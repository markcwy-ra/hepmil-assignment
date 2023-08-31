import React, { useContext } from "react";
import { UserContext } from "../../Outlets/MainOutlet";
import { useNavigate } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleNavigate = (e) => {
    const id = e.currentTarget.id;
    if (id === "home") {
      navigate("/");
    } else {
      navigate("/" + id);
    }
  };

  return (
    <div className="navbar">
      <h3 onClick={handleNavigate} id="home">
        PokeFaves
      </h3>
      <div className="navbar__links">
        <h4 onClick={handleNavigate} id="search">
          Search
        </h4>
        {user.uid ? (
          <h4 onClick={handleNavigate} id="favourites">
            {user.username}
          </h4>
        ) : (
          <h4 onClick={handleNavigate} id="login">
            Login
          </h4>
        )}
      </div>
    </div>
  );
};

export default NavBar;
