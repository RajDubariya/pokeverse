import { useNavigate, useParams } from "react-router-dom";
import { fetchData } from "../utils/api";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSinglePokemonData } from "../app/reducers/singlePokemonSlice";
import { ColorExtractor } from "react-color-extractor";
import { motion } from "framer-motion";
import Spinner from "./components/Spinner";

const SinglePokemon = () => {
  const navigate = useNavigate();
  const { pokemonName } = useParams();
  const dispatch = useDispatch();

  const { pokemonData } = useSelector((state) => state.singlePokemon);

  const [dominantColor, setDominantColor] = useState(null);

  useEffect(() => {
    fetchData(`pokemon/${pokemonName}`).then((res) => {
      dispatch(getSinglePokemonData(res));
    });
  }, []);

  const handleColors = useCallback(
    (colors) => {
      const dominantColor = colors[1];
      setDominantColor(dominantColor);
    },
    [pokemonName]
  );

  const handleOnClick = () => {
    let color = dominantColor?.slice(1);
    navigate(`moves/${color}`);
  };

  return (
    <>
      {pokemonData ? (
        <div className="w-full min-h-screen uppercase text-slate-300 p-2">
          {pokemonData && (
            <>
              <motion.div
                initial={{ x: -50, scale: 0.8 }}
                animate={{ x: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                style={{
                  background: `linear-gradient(to right bottom, ${dominantColor}10, ${dominantColor}20, ${dominantColor}10)`,
                }}
                className="relative p-4 md:w-1/4 rounded-lg"
              >
                <div
                  style={{
                    backgroundColor: `${dominantColor}`,
                  }}
                  className="absolute top-0 left-0 h-1.5 w-full rounded-t-lg"
                ></div>
                <p className=" text-2xl text-white">{pokemonData?.name}</p>
                <div className="flex items-center text-xl mt-2">
                  <p>type : </p>
                  {pokemonData?.types?.map((type, index) => (
                    <span key={type?.slot} className="flex">
                      {index > 0 && <span>, </span>}
                      <p> {type.type.name}</p>
                    </span>
                  ))}
                </div>
              </motion.div>
              <motion.div
                initial={{ x: 50, scale: 0.8 }}
                animate={{ x: 0, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex items-center justify-end text-white px-4 mt-3 md:mt-0"
              >
                <button
                  onClick={handleOnClick}
                  style={{
                    background: `${dominantColor}50`,
                  }}
                  className="py-6 md:px-[6rem] md:w-auto w-full uppercase text-xl rounded-xl"
                >
                  capable moves
                </button>
              </motion.div>
            </>
          )}

          <div className="flex justify-center items-center p-3 pb-7">
            {pokemonData && (
              <motion.div
                initial={{ scale: 0.7 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <ColorExtractor
                  onError={(error) => console.log(error)}
                  src={pokemonData?.sprites?.other?.home?.front_default}
                  getColors={handleColors}
                >
                  <img
                    src={pokemonData?.sprites?.other?.home?.front_default}
                    alt={pokemonData.name}
                    style={{
                      filter: `drop-shadow(0px 0px 50px ${dominantColor}) `,
                    }}
                    className={`h-[13rem] md:h-[18rem]`}
                  />
                </ColorExtractor>
              </motion.div>
            )}
          </div>

          <motion.div
            initial={{ x: -50, scale: 0.8 }}
            animate={{ x: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col md:flex-row p-4 gap-3 w-full justify-between"
          >
            <div
              style={{
                background: `linear-gradient(to right bottom, ${dominantColor}10, ${dominantColor}15, ${dominantColor}10)`,
              }}
              className="py-2 px-4 rounded-2xl h-fit"
            >
              {pokemonData
                ? pokemonData.stats?.map((stat, index) => (
                    <div key={index} className=" grid grid-cols-2 items-center">
                      <div className="p-1">
                        <div className="flex text-xs md:text-sm justify-end">
                          <p>
                            {stat.stat?.name} : {stat.base_stat}
                          </p>
                        </div>
                      </div>

                      <div
                        className={`h-1 rounded-full ml-2 justify-start`}
                        style={{
                          width: `${(stat.base_stat / 140) * 100}%`,
                          backgroundColor: `${dominantColor}`,
                        }}
                      ></div>
                    </div>
                  ))
                : null}
            </div>

            <div
              style={{
                background: `linear-gradient(to right bottom, ${dominantColor}10, ${dominantColor}20, ${dominantColor}10)`,
              }}
              className="px-4 py-2 rounded-2xl text-sm "
            >
              {pokemonData && (
                <>
                  <div className="px-2 p-1">
                    height : {pokemonData.height} meters
                  </div>
                  <div className="px-2 p-1">
                    weight : {pokemonData.weight} kilograms
                  </div>
                  <div className="px-2 p-1">
                    base exp : {pokemonData.base_experience}
                  </div>
                  <div className="px-2 p-1">order : {pokemonData.order}</div>
                </>
              )}

              <div className="flex px-2 p-1">
                <p>abilities : </p>
                {pokemonData &&
                  pokemonData.abilities?.map((ability, index) => (
                    <div key={index} className="flex">
                      {index > 0 && <span>,</span>}
                      <p>{ability.ability?.name}</p>
                    </div>
                  ))}
              </div>
              <div className="flex px-2 p-1">
                <p>held items : </p>
                {pokemonData.held_items?.length > 0
                  ? pokemonData.held_items?.map((item, index) => (
                      <div key={index} className="flex">
                        {index > 0 && <span>,</span>}
                        <p>{item.item.name}</p>
                      </div>
                    ))
                  : "no items"}
              </div>
            </div>
          </motion.div>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default SinglePokemon;
