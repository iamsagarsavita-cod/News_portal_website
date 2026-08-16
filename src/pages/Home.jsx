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

  const handleSerach = async () => {
    if (!search.trim()) {
      toast.error("Please Enter Something to search");
      return;
    }

    try {
      setLoading(true);
      setIsSearching(true);

      const data = await searchNews(search);
      setNewsData(data);
    } catch (error) {
      console.log(error);
      toast.error("Search Failed");
    } finally {
      setLoading(false);
    }
  };

  const fetchNews = async () => {
    try {
      setLoading(true);
      let data;
      if (category === "general") {
        data = await getTopHeadlines();
      } else {
        data = await getCategoryNews(category);
      }
      console.log(data);
      setNewsData(data);
    } catch (error) {
      console.error("Failed to fetch news:", error);
      toast.error("Something went wrong :(");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader size="medium" />;
  }

  return (
    <div className="container mx-auto px-4">
      {/* Red Hero Banner Section */}
      <div className="mx-auto my-6 py-12 px-6 bg-red-600 rounded-2xl shadow-lg text-center">
        <style>
          {`
            html {
              scroll-behavior: smooth;
            }
            @keyframes fadeInUp {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
            .animate-hero-title {
              animation: fadeInUp 0.6s ease-out forwards;
            }
            .animate-hero-subtitle {
              animation: fadeInUp 0.6s ease-out 0.2s forwards;
              opacity: 0;
            }
            .animate-hero-btn {
              animation: fadeInUp 0.6s ease-out 0.4s forwards;
              opacity: 0;
            }
          `}
        </style>

        <h1 className="animate-hero-title text-4xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight">
          Welcome To News Portal
        </h1>

        <p className="animate-hero-subtitle font-bold text-xl sm:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
          Read the latest news from around the world.
        </p>

        <button
          onClick={() => {
            window.scrollTo({
              top: window.innerHeight * 0.5,
              behavior: "smooth",
            });
          }}
          className="animate-hero-btn inline-block bg-white text-red-600 font-bold text-lg px-8 py-5 rounded-full shadow-md hover:bg-gray-100 hover:scale-105 transition-all duration-300 cursor-pointer"
        >
          Explore News ↓
        </button>
      </div>

      <SeachBar
        search={search}
        setSearch={setSearch}
        handleSearch={handleSerach}
      />
      {!isSearching && (
        <Category category={category} setCategory={setCategory} />
      )}

      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold capitalize">
          {isSearching
            ? `Search Result for "${search}"`
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
              fetchNews();
            }}
            className="bg-gray-800 text-white rounded-lg px-5 py-2 text-lg font-medium hover:bg-gray-700"
          >
            Clear Search
          </button>
        )}
      </div>

      {/* News Grid */}
      {loading ? (
        <Loader />
      ) : newsData.length === 0 ? (
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold"> No News Found </h2>
          <p className="text-gray-500 mt-2">
            Try searching with another keyword
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsData.map((n, index) => (
            <NewsCard key={index} news={n} />
          ))}
        </div>
      )}
      {/* <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 py-6">
        {news && news.length > 0 ? (
          // Use parentheses () for implicit return in map
          news.map((n, index) => <NewsCard key={n.url || index} news={n} />)
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No news articles available.
          </p>
        )}
      </div> */}
    </div>
  );
};

export default Home;
