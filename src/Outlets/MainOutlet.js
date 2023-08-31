import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../Parts/NavBar/NavBar";
import { auth, database } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  onChildAdded,
  onChildChanged,
  onChildRemoved,
  ref,
} from "firebase/database";

// ----- Initial Declarations ----- //

const emptyUser = {
  uid: null,
  email: null,
  username: null,
};

const UserContext = React.createContext(null);

// ----- //

const MainOutlet = () => {
  const [user, setUser] = useState(emptyUser);
  const [userPokemon, setUserPokemon] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
          username: user.displayName,
        });
      }
    });
  }, []);

  useEffect(() => {
    if (user.uid && user.username) {
      const CURRENT_USER_KEY = "users/" + user.username.toLowerCase();
      const favouritesRef = ref(database, CURRENT_USER_KEY + "/favourites");

      onChildAdded(favouritesRef, (data) => {
        const newItem = {
          [data.key]: data.val(),
        };
        setUserPokemon((prevData) => ({ ...prevData, ...newItem }));
      });

      onChildRemoved(favouritesRef, (data) => {
        setUserPokemon((prevData) => {
          const updatedData = { ...prevData };
          delete updatedData[data.key];
          return updatedData;
        });
      });

      onChildChanged(favouritesRef, (data) => {
        setUserPokemon((prevData) => {
          const updatedData = { ...prevData };
          updatedData[data.key] = data.val();
          return updatedData;
        });
      });
    }
  }, [user]);

  return (
    <UserContext.Provider
      value={{ user, setUser, userPokemon, setUserPokemon }}
    >
      <div className="App">
        <NavBar />
        <Outlet />
      </div>
    </UserContext.Provider>
  );
};

export default MainOutlet;

export { UserContext, emptyUser };
