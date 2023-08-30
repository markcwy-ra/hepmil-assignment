import "./App.css";
import { Route, Routes } from "react-router-dom";

// ----- Pages ----- //

import HomePage from "./Pages/HomePage/HomePage";
import SearchPage from "./Pages/SearchPage/SearchPage";
import FavouritesPage from "./Pages/FavouritesPage/FavouritesPage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import SignUpPage from "./Pages/SignUpPage/SignUpPage";

// ---------- //

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/favourites" element={<FavouritesPage />} />
    </Routes>
  );
}

export default App;
