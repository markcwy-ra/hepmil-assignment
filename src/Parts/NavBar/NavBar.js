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
      <h3 className="clickable" onClick={handleNavigate} id="home">
        PokéFaves
      </h3>
      <div className="navbar__links">
        <h4 className="clickable" onClick={handleNavigate} id="search">
          Search
        </h4>
        {user.uid && user.username ? (
          <h4 className="clickable" onClick={handleNavigate} id="favourites">
            {user.username}
          </h4>
        ) : (
          <h4 className="clickable" onClick={handleNavigate} id="login">
            Login
          </h4>
        )}
      </div>
    </div>
  );
};

export default NavBar;
