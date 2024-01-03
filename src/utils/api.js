import axios from "axios";
import { pokemonAPI } from "./constants";

export const fetchData = async (url) => {
  try {
    const { data } = await axios.get(`${pokemonAPI}/${url}`);

    return data;
  } catch (error) {
    console.log(error);
  }
};
