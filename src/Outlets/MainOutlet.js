import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../Parts/NavBar/NavBar";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

// ----- Initial Declarations ----- //

const userObj = {
  uid: null,
  email: null,
  username: null,
};

const UserContext = React.createContext(null);

// ----- //

const MainOutlet = () => {
  const [user, setUser] = useState(userObj);

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

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <NavBar />
      <Outlet />
    </UserContext.Provider>
  );
};

export default MainOutlet;

export { UserContext };
