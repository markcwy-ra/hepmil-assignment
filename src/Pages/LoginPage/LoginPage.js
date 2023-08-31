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
    try {
      setIsLoggingIn(true);
      await signInWithEmailAndPassword(auth, email, password);
      setIsLoggingIn(false);
      navigate("/favourites");
    } catch {
      setErrorMessage("We had trouble logging you in. Please try again!");
    }
  };
  return (
    <div className="content">
      <h1>Login</h1>
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
            Login
          </button>
        )}
        {errorMessage ? <ErrorPill errorMessage={errorMessage} /> : <></>}
      </form>
      <div className="flex_column">
        <p>Don't have an account?</p>
        <button onClick={() => navigate("/signup")} id="signup">
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
