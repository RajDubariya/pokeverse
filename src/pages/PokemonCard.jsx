import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../utils/api";
import { getPokemonData } from "../app/reducers/pokemonsSlice";
import { motion } from "framer-motion";
import { ColorExtractor } from "react-color-extractor";
import { useNavigate } from "react-router-dom";

const PokemonCard = ({ pokemon }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pokemonData } = useSelector((state) => state.pokemons);
  const matchedPokemon = pokemonData.find((p) => p.name === pokemon.name);

  const [dominantColor, setDominantColor] = useState(null);

  useEffect(() => {
    fetchData(`pokemon/${pokemon?.name}`).then((res) => {
      dispatch(getPokemonData({ name: pokemon?.name, pokemonData: res }));
    });
  }, [pokemon.name]);

  const handleColors = useCallback((colors) => {
    const dominantColor = colors[1];
    setDominantColor(dominantColor);
  }, []);
  const handleOnClick = (selectedPokemon) => {
    navigate(`/${selectedPokemon.name}`);
  };

  const cardVariants = {
    hover: {
      scale: 1.07,
      boxShadow: "0px 7px 45px rgba(2,132,199,0.5)",
      borderColor: "rgba(2,132,199,0.7)",
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    initial: {
      scale: 1,
      boxShadow: "0px 7px 10px rgba(2,132,199,0.2)",
    },
  };
  return (
    <>
      {matchedPokemon && (
        <motion.div
          className="card text-slate-300 border border-slate-700 rounded-3xl text-center flex items-center justify-center flex-col h-[19rem] w-54 bg-gradient-to-b from-slate-800 to-slate-900 capitalize"
          style={{
            boxShadow: `0px 7px 10px rgba(2,132,199,0.2)`,
          }}
          variants={cardVariants}
          whileHover="hover"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          onClick={() => handleOnClick(matchedPokemon)}
        >
          <motion.div
            initial={{ scale: 0.6 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {matchedPokemon && (
              <ColorExtractor
                onError={(error) => console.log(error)}
                src={matchedPokemon?.data.sprites.other.home.front_default}
                getColors={(colors) => {
                  handleColors(colors);
                }}
              >
                <img
                  src={matchedPokemon?.data.sprites.other.home.front_default}
                  alt={pokemon.name}
                  style={{
                    filter: `drop-shadow(0px 0px 27px ${dominantColor})`,
                  }}
                  className={`h-36`}
                />
              </ColorExtractor>
            )}
          </motion.div>

          <p className="capitalize text-lg border-b border-b-sky-600/50 rounded-2xl py-1 px-5 my-3">
            {pokemon.name}
          </p>
          <span className="w-full flex items-center justify-between py-3 px-5 text-sm">
            <span className="flex flex-col items-center">
              <span className="border-b border-sky-700 py-1 mb-0.5">
                height
              </span>
              <span>{matchedPokemon.data.height}</span>
            </span>
            <span className="flex flex-col items-center">
              <span className="border-b border-sky-700 py-1 mb-0.5">
                weight
              </span>
              <span>{matchedPokemon.data.weight}</span>
            </span>
          </span>
        </motion.div>
      )}
    </>
  );
};

export default PokemonCard;

PokemonCard.propTypes = {
  pokemon: PropTypes.shape({
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};
