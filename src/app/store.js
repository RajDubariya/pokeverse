import { configureStore } from "@reduxjs/toolkit";
import pokemonsSlice from "./reducers/pokemonsSlice";
import singlePokemonSlice from "./reducers/singlePokemonSlice";

const store = configureStore({
  reducer: {
    pokemons: pokemonsSlice,
    singlePokemon: singlePokemonSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: { warnAfter: 128 },
      serializableCheck: { warnAfter: 128 },
    }),
  devTools: {
    actionSanitizer: (action) => {
      if (action.type === "fetch_pokemons_success") {
        return { ...action, payload: "[Large pokemon list omitted]" };
      }
      return action; // No sanitization needed for other actions
    },
    stateSanitizer: (state) => {
      return {
        ...state,
        pokemons: {
          ...state.pokemons,
          pokemonList: "[Large pokemon list omitted]",
        },
      };
    },
  },
});

export default store;
