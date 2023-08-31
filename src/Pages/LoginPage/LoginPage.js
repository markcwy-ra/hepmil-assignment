import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import ErrorPill from "../../Pieces/ErrorPill/ErrorPill";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    try {
      setIsLoggingIn(true);
      await signInWithEmailAndPassword(auth, email, password);
      setIsLoggingIn(false);
      navigate("/favourites");
    } catch (err) {
      setIsLoggingIn(false);
      const error = err.code;
      if (error === "auth/user-not-found") {
        setErrorMessage("User not found!");
      } else {
        setErrorMessage("Please try again!");
      }
    }
  };
  return (
    <div className="content">
      <div className="flex_column">
        <h1>Login</h1>
        <p>Sign in to manage your favourite Pokémon!</p>
      </div>
      <form className="flex_column custom_form">
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
          autoComplete="username"
          placeholder="Enter email"
        />
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
          autoComplete="current-password"
          placeholder="Enter password"
        />
        {isLoggingIn ? (
          <h4>Logging In...</h4>
        ) : (
          <button onClick={handleLogin} id="login">
            <h5>Login</h5>
          </button>
        )}
        {errorMessage ? <ErrorPill errorMessage={errorMessage} /> : <></>}
      </form>
      <div className="flex_column">
        <p>Don't have an account?</p>
        <button onClick={() => navigate("/signup")} id="signup">
          <h5>Sign Up</h5>
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
