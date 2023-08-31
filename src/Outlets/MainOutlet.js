import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../Parts/NavBar/NavBar";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

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
      <div className="App">
        <NavBar />
        <Outlet />
      </div>
    </UserContext.Provider>
  );
};

export default MainOutlet;

export { UserContext, emptyUser };
