import Axios from "axios";

const API_KEY = import.meta.env.API_KEY;
const BASE_URL = import.meta.env.BASE_URL;

export const getTopHeadlines = async () => {
    const res = await Axios.get(
        `${BASE_URL}/top-headlines?category=general&lang=en&apikey=${API_KEY}`,
    );
};