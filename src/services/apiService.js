import Axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

const getParams = ({ category, country, language, page, query, sortBy }) => {
    const params = new URLSearchParams({
        lang: language,
        country,
        max: "9",
        page: String(page),
        apikey: API_KEY,
    });

    if (category) params.set("category", category);
    if (query) params.set("q", query);
    if (query && sortBy) params.set("sortby", sortBy);
    return params.toString();
};

export const getTopHeadlines = async ({ country = "us", language = "en", page = 1 } = {}) => {
    try{
        const res = await Axios.get(
            `${BASE_URL}/top-headlines?${getParams({ category: "general", country, language, page })}`,
        );
        console.log(res.data.articles);
        
        return res.data.articles;
    }catch(error){
        console.log(error, "Error in Fetch  Top Headlines");
        return []
    }
};

// Category News
export const getCategoryNews = async (category, { country = "us", language = "en", page = 1 } = {}) => {
    try{
        const res = await Axios.get(
            `${BASE_URL}/top-headlines?${getParams({ category, country, language, page })}`,
        );
        return res.data.articles;
    }catch (error) {
    console.log(error, "Error in Fetching Category News");
    return []
    }
};

// Search News
export const searchNews = async (query, { country = "us", language = "en", page = 1, sortBy = "publishedAt" } = {}) => {
    try {
        const res = await Axios.get(
            `${BASE_URL}/search?${getParams({ query, country, language, page, sortBy })}`,
        );
        return res.data.articles;
    } catch (error) {
        console.log(error, "Error in Fetching Category News");
        return[];
    }
};
