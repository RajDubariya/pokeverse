import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import SinglePokemon from "./pages/SinglePokemon";
import CapableMoves from "./pages/CapableMoves";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/:pokemonName" element={<SinglePokemon />} />
        <Route
          exact
          path="/:pokemonName/moves/:color"
          element={<CapableMoves />}
        />
      </Routes>
    </>
  );
}

export default App;
