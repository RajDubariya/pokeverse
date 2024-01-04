import { useEffect, useState } from "react";
import { fetchData } from "../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { getAllPokemons } from "../app/reducers/pokemonsSlice";
import PokemonCard from "./PokemonCard";
import Spinner from "./components/Spinner";
import { useLocation } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const { pokemons } = useSelector((state) => state.pokemons);

  const location = useLocation();

  const [data, setData] = useState([...pokemons]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);

  const handleInfiniteScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setOffset((prev) => prev + 14);
    }
  };
  const fetchPokemonData = () => {
    // setLoading(true);
    fetchData(`pokemon?limit=14&offset=${offset}`).then((res) => {
      dispatch(getAllPokemons(res.results));
      setData((prev) => [...prev, ...res.results]);
      setLoading(false);
    });
  };
  useEffect(() => {
    fetchPokemonData();
  }, [offset]);

  useEffect(() => {
    setOffset(0);
  }, [location.pathname]);

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);

    return () => {
      window.removeEventListener("scroll", handleInfiniteScroll);
    };
  }, []);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 md:gap-10 gap-4 p-4">
          {data &&
            data.map((pokemon, index) => (
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
