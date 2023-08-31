import React, { useContext, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";

// ----- Firebase ----- //

import { get, ref, set } from "firebase/database";
import { auth, database } from "../../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

// ----- Helpers ----- //

import { UserContext } from "../../Outlets/MainOutlet";
import signUpReducer from "../../Reducers/signUpReducer";
import { onlyAlphaNumeric } from "../../utils";
import ErrorPill from "../../Pieces/ErrorPill/ErrorPill";

// ----- Initial Declarations ----- //

const initialForm = {
  username: "",
  email: "",
  password: "",
  repeatPassword: "",
};

// ----- //

const SignUpPage = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [formState, dispatch] = useReducer(signUpReducer, initialForm);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleForm = (e) => {
    setErrorMessage(null);
    dispatch({
      type: "text-input",
      field: e.currentTarget.id,
      payload: e.currentTarget.value,
    });
  };

  const handleSubmit = async (e) => {
    setErrorMessage(null);
    e.preventDefault();
    let passwordCheck = formState.password === formState.repeatPassword;

    if (!(formState.email && formState.password && formState.username)) {
      setErrorMessage("Please fill in all fields!");
    } else if (!onlyAlphaNumeric(formState.username)) {
      setErrorMessage("Only letters and numbers are allowed in usernames.");
    } else if (!passwordCheck) {
      setErrorMessage("Passwords don't match!");
    } else {
      const userRef = ref(
        database,
        "users/" + formState.username.toLowerCase()
      );
      const userCheck = await get(userRef);

      if (!userCheck.exists()) {
        try {
          await createUserWithEmailAndPassword(
            auth,
            formState.email,
            formState.password
          );
          await updateProfile(auth.currentUser, {
            displayName: formState.username,
          });
          setUser((user) => {
            const userDetails = {
              username: formState.username,
              email: formState.email,
            };
            set(userRef, userDetails);
            return {
              ...user,
              username: formState.username,
            };
          });
          navigate("/");
        } catch {
          setErrorMessage("Email already in use.");
        }
      } else {
        setErrorMessage("Username already exists.");
      }
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form>
        <input
          id="username"
          type="text"
          value={formState.username}
          onChange={(e) => handleForm(e)}
          autoComplete="off"
          placeholder="Enter Username"
        />
        <input
          id="email"
          type="email"
          value={formState.email}
          onChange={(e) => handleForm(e)}
          autoComplete="username"
          placeholder="Enter email"
        />
        <input
          id="password"
          type="password"
          value={formState.password}
          onChange={(e) => handleForm(e)}
          autoComplete="new-password"
          placeholder="Enter password"
        />
        <input
          id="repeatPassword"
          type="password"
          value={formState.repeatPassword}
          onChange={(e) => handleForm(e)}
          autoComplete="new-password"
          placeholder="Re-enter password"
        />
        <button onClick={handleSubmit}>Sign Up</button>
        {errorMessage ? <ErrorPill errorMessage={errorMessage} /> : <></>}
      </form>
    </div>
  );
};

export default SignUpPage;
