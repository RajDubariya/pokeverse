import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pokemonData: [],
};

const singlePokemonSlice = createSlice({
  name: "singlePokemon",
  initialState,
  reducers: {
    getSinglePokemonData: (state, action) => {
      state.pokemonData = action.payload;
    },
  },
});

export const { getSinglePokemonData } = singlePokemonSlice.actions;

export default singlePokemonSlice.reducer;
