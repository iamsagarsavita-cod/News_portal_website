import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NewsCard from "../components/NewsCard";
import { getBookmarks } from "../utils/bookmarks";

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState(getBookmarks());

  useEffect(() => {
    const refreshBookmarks = () => setBookmarks(getBookmarks());
    window.addEventListener("bookmarks-updated", refreshBookmarks);
    return () => window.removeEventListener("bookmarks-updated", refreshBookmarks);
  }, []);

  return (
    <main className="max-w-7xl mx-auto min-h-[58vh] py-10 px-6">
      <div className="flex flex-wrap justify-between items-end gap-4 mb-8">
        <div>
          <p className="text-red-600 font-semibold uppercase tracking-widest text-sm">Your reading list</p>
          <h1 className="text-4xl font-bold text-gray-900 mt-2">Saved Articles</h1>
        </div>
        <span className="text-gray-500">{bookmarks.length} saved</span>
      </div>

      {bookmarks.length ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bookmarks.map((article, index) => <NewsCard key={article.url || article.id || index} news={article} />)}
        </div>
      ) : (
        <section className="text-center bg-gray-50 rounded-2xl py-20 px-6">
          <h2 className="text-2xl font-bold text-gray-900">No saved articles yet</h2>
          <p className="text-gray-500 mt-3">Use the Bookmark button on any story to build your reading list.</p>
          <Link to="/" className="inline-block mt-7 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700">Browse the latest news</Link>
        </section>
      )}
    </main>
  );
};

export default Bookmarks;
