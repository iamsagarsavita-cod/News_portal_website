import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getTopHeadlines,
  getCategoryNews,
  searchNews,
} from "../services/apiService";
import Loader from "../components/Loader";
import NewsCard from "../components/NewsCard";
import Category from "../components/Category";
import SearchBar from "../components/SeachBar";

const DEFAULT_COUNTRY = "us";
const DEFAULT_LANGUAGE = "en";
const DEFAULT_SORT = "publishedAt";
const countryNames = {
  us: "United States",
  in: "India",
  gb: "United Kingdom",
  ca: "Canada",
  au: "Australia",
};
const languageNames = {
  en: "English",
  hi: "Hindi",
  fr: "French",
  de: "German",
};
function Home() {
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [newsData, setNewsData] = useState([]);
  const [loadError, setLoadError] = useState("");
  const [category, setCategory] = useState("general");
  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [submittedSearch, setSubmittedSearch] = useState("");
  const [country, setCountry] = useState(DEFAULT_COUNTRY);
  const [language, setLanguage] = useState(DEFAULT_LANGUAGE);
  const [sortBy, setSortBy] = useState(DEFAULT_SORT);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchNews = useCallback(
    async ({
      pageToLoad = 1,
      append = false,
      searchTerm,
      sort,
      selectedCategory,
      selectedCountry,
      selectedLanguage,
    } = {}) => {
      try {
        if (append) setLoadingMore(true);
        else setLoading(true);
        const options = {
          country: selectedCountry,
          language: selectedLanguage,
          page: pageToLoad,
          sortBy: sort,
        };
        let data;
        if (searchTerm) data = await searchNews(searchTerm, options);
        else if (selectedCategory === "general")
          data = await getTopHeadlines(options);
        else data = await getCategoryNews(selectedCategory, options);
        setLoadError("");
        const stories = Array.isArray(data) ? data : [];
        const sorted =
          sort === "relevance"
            ? stories
            : [...stories].sort(
                (a, b) =>
                  new Date(b.publishedAt || 0) - new Date(a.publishedAt || 0),
              );
        setNewsData((current) => (append ? [...current, ...sorted] : sorted));
        setPage(pageToLoad);
        setHasMore(stories.length === 9);
      } catch (error) {
        const message =
          error?.message ||
          "News could not load. Check your connection and try again.";
        setLoadError(message);
        toast.error(message, { toastId: "news-load-error" });
        if (!append) setNewsData([]);
        setHasMore(false);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [],
  );

  useEffect(() => {
    const debounce = setTimeout(
      () =>
        fetchNews({
          pageToLoad: 1,
          searchTerm: isSearching ? submittedSearch : "",
          sort: sortBy,
          selectedCategory: category,
          selectedCountry: country,
          selectedLanguage: language,
        }),
      250,
    );
    return () => clearTimeout(debounce);
  }, [
    category,
    country,
    fetchNews,
    isSearching,
    language,
    sortBy,
    submittedSearch,
  ]);

  const handleSearch = () => {
    const query = search.trim();
    if (!query) {
      toast.error("Enter a topic to search for.");
      return;
    }
    setIsSearching(true);
    setSubmittedSearch(query);
  };
  const clearSearch = () => {
    setSearch("");
    setSubmittedSearch("");
    setIsSearching(false);
  };
  const clearAllFilters = () => {
    setSearch("");
    setSubmittedSearch("");
    setIsSearching(false);
    setCategory("general");
    setCountry(DEFAULT_COUNTRY);
    setLanguage(DEFAULT_LANGUAGE);
    setSortBy(DEFAULT_SORT);
  };
  const handleLoadMore = () =>
    fetchNews({
      pageToLoad: page + 1,
      append: true,
      searchTerm: isSearching ? submittedSearch : "",
      sort: sortBy,
      selectedCategory: category,
      selectedCountry: country,
      selectedLanguage: language,
    });
  const hasActiveFilters =
    isSearching ||
    category !== "general" ||
    country !== DEFAULT_COUNTRY ||
    language !== DEFAULT_LANGUAGE ||
    sortBy !== DEFAULT_SORT;

  return (
    <main className="mx-auto max-w-7xl px-5 py-8 md:px-6 md:py-10">
      <section className="rounded-2xl bg-gradient-to-r from-red-600 to-red-800 px-7 py-12 text-center text-white md:rounded-3xl md:px-12 md:py-16">
        <h1 className="text-4xl font-bold md:text-5xl">News that matters</h1>
        <p className="mt-4 text-lg text-white/90">
          Explore the latest stories from around the world.
        </p>
        <a
          href="#latest-news"
          className="mt-6 inline-flex rounded-lg bg-white px-6 py-3 font-semibold text-red-700 transition hover:bg-gray-100"
        >
          Explore news
        </a>
      </section>

      <SearchBar
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
        onClear={() => (isSearching ? clearSearch() : setSearch(""))}
      />
      <section
        className="mx-auto mb-8 grid max-w-5xl grid-cols-1 gap-3 rounded-2xl border border-gray-200 bg-white p-4 sm:grid-cols-3"
        aria-label="News filters"
      >
        <label className="text-sm font-semibold text-gray-700">
          Country
          <select
            value={country}
            onChange={(event) => setCountry(event.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900"
          >
            <option value="us">United States</option>
            <option value="in">India</option>
            <option value="gb">United Kingdom</option>
            <option value="ca">Canada</option>
            <option value="au">Australia</option>
          </select>
        </label>
        <label className="text-sm font-semibold text-gray-700">
          Language
          <select
            value={language}
            onChange={(event) => setLanguage(event.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900"
          >
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="fr">French</option>
            <option value="de">German</option>
          </select>
        </label>
        <label className="text-sm font-semibold text-gray-700">
          Sort stories by
          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900"
          >
            <option value="publishedAt">Newest first</option>
            <option value="relevance">Relevance</option>
          </select>
        </label>
      </section>

      {!isSearching && (
        <Category category={category} setCategory={setCategory} />
      )}
      <div
        className="mt-7 flex flex-wrap items-center gap-2"
        aria-label="Active filters"
      >
        <span className="mr-1 text-sm font-semibold text-gray-700">
          Showing:
        </span>
        {isSearching ? (
          <button
            type="button"
            onClick={clearSearch}
            className="rounded-full bg-red-50 px-3 py-1.5 text-sm font-medium text-red-800 hover:bg-red-100"
          >
            Search: “{submittedSearch}” ×
          </button>
        ) : (
          <span className="rounded-full bg-gray-100 px-3 py-1.5 text-sm font-medium capitalize text-gray-800">
            {category} news
          </span>
        )}
        <span className="rounded-full bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-800">
          {countryNames[country] || country}
        </span>
        <span className="rounded-full bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-800">
          {languageNames[language] || language}
        </span>
        {sortBy === "relevance" && (
          <span className="rounded-full bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-800">
            Relevance
          </span>
        )}
        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearAllFilters}
            className="ml-auto text-sm font-semibold text-red-700 underline underline-offset-2"
          >
            Clear filters
          </button>
        )}
      </div>

      <section
        id="latest-news"
        className="scroll-mt-24"
        aria-live="polite"
        aria-busy={loading}
      >
        <div className="my-7 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-red-700">
              Latest
            </p>
            <h2 className="mt-1 text-2xl font-bold capitalize text-gray-950 md:text-3xl">
              {isSearching
                ? `Results for “${submittedSearch}”`
                : category === "general"
                  ? "Top headlines"
                  : `${category} news`}
            </h2>
          </div>
          {!loading && newsData.length > 0 && (
            <span className="text-sm text-gray-600">
              {newsData.length} stories loaded
            </span>
          )}
        </div>
        {loading ? (
          <Loader />
        ) : newsData.length === 0 ? (
          <div className="rounded-2xl bg-gray-50 px-5 py-14 text-center">
            <h3 className="text-2xl font-bold text-gray-950">
              {loadError ? "News could not load" : "No stories found"}
            </h3>
            <p className="mx-auto mt-3 max-w-lg text-gray-700">
              {loadError ||
                "Try another search, country or language, or clear the filters to see more headlines."}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={
                  loadError
                    ? () =>
                        fetchNews({
                          pageToLoad: 1,
                          searchTerm: isSearching ? submittedSearch : "",
                          sort: sortBy,
                          selectedCategory: category,
                          selectedCountry: country,
                          selectedLanguage: language,
                        })
                    : hasActiveFilters
                      ? clearAllFilters
                      : () =>
                          fetchNews({
                            pageToLoad: 1,
                            searchTerm: "",
                            sort: sortBy,
                            selectedCategory: category,
                            selectedCountry: country,
                            selectedLanguage: language,
                          })
                }
                className="rounded-lg bg-red-600 px-5 py-3 font-semibold text-white hover:bg-red-700"
              >
                {loadError
                  ? "Try again"
                  : hasActiveFilters
                    ? "Clear filters"
                    : "Refresh headlines"}
              </button>
              {!loadError &&
                ["technology", "business", "sports"].map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => {
                      setIsSearching(false);
                      setSubmittedSearch("");
                      setSearch("");
                      setCategory(suggestion);
                    }}
                    className="rounded-lg border border-gray-300 bg-white px-4 py-3 font-semibold capitalize text-gray-800 hover:bg-gray-100"
                  >
                    Try {suggestion}
                  </button>
                ))}
            </div>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {newsData.map((article, index) => (
              <NewsCard
                key={article.url || article.id || index}
                news={article}
              />
            ))}
          </div>
        )}
      </section>
      {!loading && newsData.length > 0 && hasMore && (
        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={handleLoadMore}
            disabled={loadingMore}
            className="rounded-lg bg-gray-900 px-7 py-3 font-semibold text-white hover:bg-gray-700 disabled:opacity-60"
          >
            {loadingMore ? "Loading stories..." : "Load more stories"}
          </button>
        </div>
      )}
    </main>
  );
}
export default Home;
