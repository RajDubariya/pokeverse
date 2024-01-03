import { useEffect, useState } from "react";
import { fetchData } from "../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { getAllPokemons } from "../app/reducers/pokemonsSlice";
import PokemonCard from "./PokemonCard";
import Spinner from "./components/Spinner";

const Home = () => {
  const dispatch = useDispatch();
  const { pokemons } = useSelector((state) => state.pokemons);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData("pokemon?limit=10").then((res) => {
      dispatch(getAllPokemons(res.results));
      setLoading(false);
    });
  }, []);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 md:gap-10 gap-4 p-4">
          {pokemons &&
            pokemons.map((pokemon, index) => (
              <div key={index}>
                <PokemonCard pokemon={pokemon} />
              </div>
            ))}
        </div>
      )}
    </>
  );
};

export default Home;
