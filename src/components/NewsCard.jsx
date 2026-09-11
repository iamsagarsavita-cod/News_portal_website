import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaShareAlt } from "react-icons/fa";
import { isBookmarked, toggleBookmark } from "../utils/bookmarks";

const NewsCard = ({ news }) => {
  const navigate = useNavigate();
  const [bookmarked, setBookMarked] = useState(() => isBookmarked(news));
  // Defensive check to avoid runtime errors if news is undefined
  if (!news) return null;
  const defaultImage =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR046TIwghhR9kPLo29rgRTuVdJmqNQs2iFZG5is60nZQ&s=10";
  const readingTime = Math.max(
    1,
    Math.ceil((news.content || news.description || "").split(/\s+/).filter(Boolean).length / 200),
  );

  const shareArticle = async () => {
    const shareData = { title: news.title, text: news.description, url: news.url };
    try {
      if (navigator.share) await navigator.share(shareData);
      else {
        await navigator.clipboard.writeText(news.url);
        window.alert("Article link copied to clipboard.");
      }
    } catch (error) {
      if (error.name !== "AbortError") console.log("Unable to share article", error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full border border-gray-100">
      {/* Article Image with Fallback */}
      <div className="h-48 w-full overflow-hidden bg-gray-100 relative">
        <img
          src={news.image || defaultImage}
          alt={news.title || "News"}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = defaultImage;
          }}
        />
      </div>

      {/* Card Content */}
      <div className="p-5 flex flex-col flex-grow justify-between">
        <div>
          {/* Source Name & Date Header */}
          <div className="flex items-center justify-between gap-2 text-xs text-gray-500 mb-2">
            <span className="font-semibold text-red-600 bg-red-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
              {news.source?.name || "General News"}
            </span>
            <span className="whitespace-nowrap">
              {news.publishedAt
                ? new Date(news.publishedAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })
                : ""}
            </span>
          </div>

          <p className="text-xs text-gray-500 mb-3">{news.author || "NewsHub Desk"} · {readingTime} min read</p>

          {/* Title */}
          <h2 className="text-lg font-bold text-gray-800 hover:text-red-600 transition-colors line-clamp-2 mb-2">
            {news.title}
          </h2>

          {/* Description */}
          <p className="text-sm text-gray-600 line-clamp-3 mb-4 leading-relaxed">
            {news.description || "No description available for this article."}
          </p>
        </div>

        {/* Action Button Link */}
        <div className="pt-2">
          <button
            className="mt-4 bg-red-600 px-5 py-2 rounded-lg text-white hover:bg-red-700"
            onClick={() => navigate(`/news/${news.id}`, { state: { news } })}
          >
            Read More
          </button>

          {/* BookMark add  */}
          <button
            type="button"
            aria-pressed={bookmarked}
            onClick={() => {
              const saved = toggleBookmark(news);
              setBookMarked(saved);
              window.dispatchEvent(new Event("bookmarks-updated"));
            }}
            className={`px-4 py-2 rounded-lg ml-3 text-white transition ${bookmarked ? "bg-gray-800 hover:bg-gray-700" : "bg-red-600 hover:bg-red-700"}`}
          >
            {bookmarked ? "Saved" : "Bookmark"}
          </button>
          <button type="button" onClick={shareArticle} aria-label={`Share ${news.title || "article"}`} className="p-2.5 rounded-lg ml-3 text-gray-700 bg-gray-100 hover:bg-gray-200">
            <FaShareAlt />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
