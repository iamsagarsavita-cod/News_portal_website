import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NewsCard from "../components/NewsCard";
import { getBookmarks } from "../utils/bookmarks";

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState(getBookmarks());
  useEffect(() => {
    const refreshBookmarks = () => setBookmarks(getBookmarks());
    window.addEventListener("bookmarks-updated", refreshBookmarks);
    window.addEventListener("storage", refreshBookmarks);
    return () => {
      window.removeEventListener("bookmarks-updated", refreshBookmarks);
      window.removeEventListener("storage", refreshBookmarks);
    };
  }, []);
  const sortedBookmarks = [...bookmarks].sort(
    (first, second) =>
      new Date(second.publishedAt || 0) - new Date(first.publishedAt || 0),
  );
  return (
    <main className="mx-auto min-h-[58vh] max-w-7xl px-5 py-10 md:px-6">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4 mb-8 border-b border-gray-200 pb-5">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-red-700">
            Your reading list
          </p>
          <h1 className="mt-2 text-4xl font-bold text-gray-950 md:text-4xl">
            Saved Articles
          </h1>
          <p className="mt-2 text-gray-600">
            Sorted by the article’s publication date.
          </p>
        </div>
        <span className="text-sm text-gray-600">{bookmarks.length} saved</span>
      </div>
      {sortedBookmarks.length ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {sortedBookmarks.map((article, index) => (
            <NewsCard
              key={article.url || article.id || index}
              news={article}
              confirmRemoval
            />
          ))}
        </div>
      ) : (
        <section className="rounded-2xl bg-gray-50 px-6 py-16 text-center">
          <h2 className="text-2xl font-bold text-gray-950">
            No saved articles yet
          </h2>
          <p className="mt-3 text-gray-700">
            Use the Bookmark button on any story to build your reading list.
          </p>
          <Link
            to="/"
            className="mt-7 inline-flex rounded-lg bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700"
          >
            Browse the latest news
          </Link>
        </section>
      )}
    </main>
  );
};
export default Bookmarks;
