import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchData } from "../utils/api";
import { getSinglePokemonData } from "../app/reducers/singlePokemonSlice";
import { motion } from "framer-motion";

const CapableMoves = () => {
  const { pokemonName, color } = useParams();
  const dispatch = useDispatch();
  const { pokemonData } = useSelector((state) => state.singlePokemon);

  useEffect(() => {
    fetchData(`pokemon/${pokemonName}`).then((res) => {
      dispatch(getSinglePokemonData(res));
    });
  }, []);

  return (
    <div className="w-full">
      <div className="flex items-center justify-center p-3 uppercase text-white text-xl md:text-2xl">
        <p
          style={{
            borderBottom: `2px solid #${color}`,
          }}
          className="p-1 rounded-lg"
        >
          capable moves of {pokemonName}
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 p-2 ">
        {pokemonData &&
          pokemonData.moves?.map((move, index) => (
            <motion.div
              initial={{ opacity: 0.5, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              style={{
                backgroundColor: `#${color}20`,
                borderTop: `2px solid #${color}`,
              }}
              key={index}
              className="p-2 bg-slate-600 rounded-lg uppercase relative text-white"
            >
              <p className="p-1 px-3">{move.move.name}</p>
              <span
                style={{
                  background: `#${color}`,
                }}
                className={` absolute top-0 left-0 w-1.5 h-full rounded-l-lg`}
              ></span>
            </motion.div>
          ))}
      </div>
    </div>
  );
};

export default CapableMoves;
