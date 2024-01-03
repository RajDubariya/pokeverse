import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pokemons: [],
  pokemonData: [],
};

export const pokemonsSlice = createSlice({
  name: "pokemons",
  initialState,
  reducers: {
    getAllPokemons: (state, action) => {
      state.pokemons = action.payload;
    },

    getPokemonData: (state, action) => {
      state.pokemonData.push({
        name: action.payload.name,
        data: action.payload.pokemonData,
      });
    },
  },
});

export const { getAllPokemons, getPokemonData } = pokemonsSlice.actions;

export default pokemonsSlice.reducer;
