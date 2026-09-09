import { IoMdArrowBack } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { isBookmarked, toggleBookmark } from "../utils/bookmarks";

const NewsDetails = () => {
  const location = useLocation();
  const newsData = location?.state?.news;
  const [bookmarked, setBookmarked] = useState(() => isBookmarked(newsData));

  console.log(newsData);
  
  if (!newsData) {
    return (
      <div className="min-h-[58vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold ">No News Found</h1>
          <p className="text-gray-500 mt-4">
            Please go back and select a news article.
          </p>
          <Link
            to="/"
            className="inline-block mt-6 bg-purple-600 text-white px-6 py-4 rounded-lg"
          >
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <Link
        className="flex items-center gap-3 font-semibold hover:underline text-red-600"
        to="/"
      >
        <IoMdArrowBack /> Back To Home
      </Link>

      <div className="bg-white rounded-3xl shadow-lg overflow-hidden mt-5">
        <img
          src={newsData.image || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80"}
          alt={newsData.title || "News article"}
          className="w-full object-cover h-65"
        />
        <div className="p-6 ">
          <p className="text-red-600 text-sm font-medium">
            {newsData.source?.name || "General News"}
          </p>
          <h1 className="text-3xl font-bold mt-2">{newsData.title}</h1>
          <p className="text-gray-500 mt-4">
            Published on {newsData.publishedAt ? new Date(newsData.publishedAt).toLocaleDateString() : "Unknown date"}
          </p>

          <div className="border-t my-5">
            <p className="text-lg text-gray-700 font-medium text-justify">
              {newsData.description}
            </p>
            <p className="text-gray-700 text-md mt-3 text-justify">
              {newsData.content}
            </p>

            <Link
              to={newsData.url || "#"}
              target="_blank"
              rel="noreferrer"
              className="inline-block mt-5 font-medium bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700"
            >
              Read Full Article
            </Link>
            <button
              type="button"
              aria-pressed={bookmarked}
              onClick={() => {
                const saved = toggleBookmark(newsData);
                setBookmarked(saved);
                window.dispatchEvent(new Event("bookmarks-updated"));
              }}
              className="inline-block ml-3 mt-5 font-medium bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-700"
            >
              {bookmarked ? "Remove Bookmark" : "Bookmark Article"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetails;
