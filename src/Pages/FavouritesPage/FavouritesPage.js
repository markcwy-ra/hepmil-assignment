import { signOut } from "firebase/auth";
import React, { useContext, useEffect } from "react";
import { auth } from "../../firebase";
import { UserContext, emptyUser } from "../../Outlets/MainOutlet";
import { useNavigate } from "react-router-dom";

const FavouritesPage = () => {
  const { user, setUser } = useContext(UserContext);
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
    <div>
      <h1>FavouritesPage</h1>
      <button onClick={handleLogOut}>Log Out</button>
    </div>
  );
};

export default FavouritesPage;
