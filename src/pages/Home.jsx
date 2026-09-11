import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  getTopHeadlines,
  getCategoryNews,
  searchNews,
} from "../services/apiService";
import Loader from "../components/Loader";
import NewsCard from "../components/NewsCard";
import Category from "../components/Category";
import SeachBar from "../components/SeachBar";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [newsData, setNewsData] = useState([]);
  const [category, setCategory] = useState("general");
  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [submittedSearch, setSubmittedSearch] = useState("");
  const [country, setCountry] = useState("us");
  const [language, setLanguage] = useState("en");
  const [sortBy, setSortBy] = useState("publishedAt");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchNews({ pageToLoad: 1 });
  }, [category, country, language]);

  const fetchNews = async ({ pageToLoad = 1, append = false, searchTerm = submittedSearch, sort = sortBy } = {}) => {
    try {
      append ? setLoadingMore(true) : setLoading(true);

      let data;
      const options = { country, language, page: pageToLoad, sortBy: sort };
      if (searchTerm) {
        data = await searchNews(searchTerm, options);
      } else if (category === "general") {
        data = await getTopHeadlines(options);
      } else {
        data = await getCategoryNews(category, options);
      }
      const sortedData = [...data].sort((a, b) => {
        if (sort === "relevance") return 0;
        return new Date(b.publishedAt || 0) - new Date(a.publishedAt || 0);
      });
      setNewsData((current) => append ? [...current, ...sortedData] : sortedData);
      setPage(pageToLoad);
      setHasMore(data.length === 9);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleSearch = async () => {
    if (!search.trim()) {
      toast.error("Please Enter Something to Search");
      return;
    }

    setIsSearching(true);
    setSubmittedSearch(search.trim());
    fetchNews({ pageToLoad: 1, searchTerm: search.trim() });
  };

  const handleLoadMore = () => fetchNews({ pageToLoad: page + 1, append: true });

  const handleSortChange = (nextSort) => {
    setSortBy(nextSort);
    fetchNews({ pageToLoad: 1, searchTerm: isSearching ? submittedSearch : "", sort: nextSort });
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

      <section className="mb-8 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-4xl mx-auto" aria-label="News filters">
        <label className="text-sm font-medium text-gray-700">Country
          <select value={country} onChange={(e) => setCountry(e.target.value)} className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 bg-white">
            <option value="us">United States</option><option value="in">India</option><option value="gb">United Kingdom</option><option value="ca">Canada</option><option value="au">Australia</option>
          </select>
        </label>
        <label className="text-sm font-medium text-gray-700">Language
          <select value={language} onChange={(e) => setLanguage(e.target.value)} className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 bg-white">
            <option value="en">English</option><option value="hi">Hindi</option><option value="fr">French</option><option value="de">German</option>
          </select>
        </label>
        <label className="text-sm font-medium text-gray-700">Sort stories by
          <select value={sortBy} onChange={(e) => handleSortChange(e.target.value)} className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 bg-white">
            <option value="publishedAt">Newest first</option><option value="relevance">Relevance</option>
          </select>
        </label>
      </section>

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
              setSubmittedSearch("");
              setIsSearching(false);
              setCategory("general");
              fetchNews({ pageToLoad: 1, searchTerm: "" });
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

      {!loading && newsData.length > 0 && hasMore && (
        <div className="text-center mt-10">
          <button onClick={handleLoadMore} disabled={loadingMore} className="bg-gray-900 text-white rounded-lg px-7 py-3 font-semibold hover:bg-gray-700 disabled:opacity-60">
            {loadingMore ? "Loading stories..." : "Load more stories"}
          </button>
        </div>
      )}

    </div>
  );
}

export default Home;
