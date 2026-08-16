import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  getTopHeadlines,
  getCategoryNews,
  searchNews,
} from "../services/apiService";
import Loader from "../Components/Loader";
import NewsCard from "../Components/NewsCard";
import Category from "../components/Category";
import SeachBar from "../components/SeachBar";

const Home = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newsData, setNewsData] = useState([]);

  const [category, setCategory] = useState("general");

  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    fetchNews();
  }, [category]);

  const fetchNews = async () => {
    try {
      setLoading(true);
      setIsSearching(false);

      let data;

      if (category === "general") {
        data = await getTopHeadlines();
      } else {
        data = await getCategoryNews(category);
      }

      console.log(data);
      setNewsData(data);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!search.trim()) {
      toast.error("Please Enter Something to Search");
      return;
    }

    try {
      setLoading(true);
      setIsSearching(true);

      const data = await searchNews(search);

      console.log(data);
      setNewsData(data);
    } catch (error) {
      console.log(error);
      toast.error("Search Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-6">

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 to-red-800 text-white rounded-xl p-10 text-center">

        <h1 className="text-4xl md:text-5xl font-bold">
          Welcome To News Portal
        </h1>

        <p className="mt-5 text-white/90 text-lg">
          Read the latest news from around the world.
        </p>

        <button
          onClick={() => {
            window.scrollTo({
              top: window.innerHeight * 0.6,
              behavior: "smooth",
            });
          }}
          className="mt-6 bg-white text-red-600 text-lg px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          Explore News
        </button>

      </div>

      {/* Search Bar */}
      <SeachBar
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
      />

      {/* Category */}
      {!isSearching && (
        <Category
          category={category}
          setCategory={setCategory}
        />
      )}

      {/* Heading + Clear Search */}
      <div className="flex justify-between items-center my-8 gap-4">

        <h2 className="text-3xl font-bold capitalize">
          {isSearching
            ? `Search Result For "${search}"`
            : category === "general"
            ? "Top Headlines"
            : `${category} News`}
        </h2>

        {/* Clear Search */}
        {isSearching && (
          <button
            onClick={() => {
              setSearch("");
              setIsSearching(false);
              setCategory("general");
            }}
            className="bg-gray-900 text-white rounded-lg px-5 py-2 text-lg font-medium hover:bg-gray-700"
          >
            Clear Search
          </button>
        )}

      </div>

      {/* Loading / News */}
      {loading ? (
        <Loader />
      ) : newsData.length === 0 ? (
        <div className="text-center py-16">

          <h2 className="text-2xl font-bold">
            No News Found
          </h2>

          <p className="text-gray-500 mt-2">
            Try searching with another keyword
          </p>

        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {newsData.map((n, index) => (
            <NewsCard
              key={n.url || index}
              news={n}
            />
          ))}

        </div>
      )}

    </div>
  );
}

export default Home;