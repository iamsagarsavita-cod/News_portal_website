import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaShareAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { isBookmarked, toggleBookmark } from "../utils/bookmarks";

const defaultImage =
  "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80";
function NewsCard({ news, confirmRemoval = false }) {
  const navigate = useNavigate();
  const [bookmarked, setBookmarked] = useState(() => isBookmarked(news));
  if (!news) return null;
  const readingText = news.content || news.description || "";
  const readingTime = Math.max(
    1,
    Math.ceil(readingText.split(/\s+/).filter(Boolean).length / 200),
  );
  const articleId = news.id || news.url || news.title;
  const openArticle = () => {
    try {
      sessionStorage.setItem("newshub-current-article", JSON.stringify(news));
    } catch {
      /* Storage may be unavailable. */
    }
    navigate(`/news/${encodeURIComponent(articleId)}`, { state: { news } });
  };
  const shareArticle = async () => {
    try {
      if (navigator.share)
        await navigator.share({
          title: news.title,
          text: news.description,
          url: news.url,
        });
      else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(news.url);
        toast.success("Article link copied.");
      } else toast.info("Open the article to copy its link.");
    } catch (error) {
      if (error.name !== "AbortError")
        toast.error("Could not share this article.");
    }
  };
  const handleBookmark = () => {
    if (
      bookmarked &&
      confirmRemoval &&
      !window.confirm("Remove this article from your saved list?")
    )
      return;
    try {
      const saved = toggleBookmark(news);
      setBookmarked(saved);
      window.dispatchEvent(new Event("bookmarks-updated"));
      toast.success(
        saved ? "Article saved." : "Article removed from saved list.",
      );
    } catch {
      toast.error(
        "Browser storage is unavailable; this article could not be saved.",
      );
    }
  };
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-md transition-shadow duration-300 hover:shadow-xl">
      <div className="relative h-48 w-full overflow-hidden bg-gray-100">
        <img
          src={news.image || defaultImage}
          alt={news.title || "News"}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          loading="lazy"
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = defaultImage;
          }}
        />
      </div>
      <div className="flex flex-grow flex-col justify-between p-5">
        <div>
          <div className="mb-2 flex items-center justify-between gap-2 text-xs text-gray-500">
            <span className="rounded-full bg-red-50 px-2.5 py-1 font-semibold uppercase tracking-wider text-red-700">
              {news.source?.name || "News source"}
            </span>
            <time
              className="whitespace-nowrap"
              dateTime={news.publishedAt || undefined}
            >
              {news.publishedAt
                ? new Date(news.publishedAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })
                : "Date unavailable"}
            </time>
          </div>
          <p className="mb-3 text-xs text-gray-500">
            {news.author ? `${news.author} · ` : ""}
            {readingTime} min read
          </p>
          <h2 className="mb-2 line-clamp-2 text-lg font-bold text-gray-900">
            <button
              type="button"
              onClick={openArticle}
              className="text-left hover:text-red-700"
            >
              {news.title || "Untitled story"}
            </button>
          </h2>
          <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-gray-700">
            {news.description || "No summary is available for this article."}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <button
            type="button"
            onClick={openArticle}
            className="rounded-lg bg-red-600 px-4 py-2 font-semibold text-white transition hover:bg-red-700"
          >
            Read More
          </button>
          <button
            type="button"
            aria-pressed={bookmarked}
            onClick={handleBookmark}
            className={`rounded-lg px-3 py-2 font-medium text-white transition ${bookmarked ? "bg-gray-800 hover:bg-gray-700" : "bg-red-600 hover:bg-red-700"}`}
          >
            {bookmarked ? "Saved" : "Bookmark"}
          </button>
          <button
            type="button"
            onClick={shareArticle}
            aria-label={`Share ${news.title || "article"}`}
            className="grid h-10 w-10 place-items-center rounded-lg bg-gray-100 text-gray-800 hover:bg-gray-200"
          >
            <FaShareAlt aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
}
export default NewsCard;
