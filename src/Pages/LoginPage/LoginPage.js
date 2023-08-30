import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/favourites");
    } catch {
      alert("Login Failed");
    }
  };
  return (
    <div>
      <h1>Login</h1>
      <form>
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
        <button onClick={handleLogin} id="login">
          Login
        </button>
      </form>
      <p>Don't have an account?</p>
      <button onClick={() => navigate("/signup")} id="signup">
        Sign Up
      </button>
    </div>
  );
};

export default LoginPage;
