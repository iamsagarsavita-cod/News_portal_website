import { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import { FaShareAlt, FaBookmark } from "react-icons/fa";
import { toast } from "react-toastify";
import {
  getArticleKey,
  getBookmarks,
  isBookmarked,
  toggleBookmark,
} from "../utils/bookmarks";

const readSessionArticle = (articleId) => {
  try {
    const stored = JSON.parse(
      sessionStorage.getItem("newshub-current-article") || "null",
    );
    return stored &&
      String(stored.id || stored.url || stored.title) === articleId
      ? stored
      : null;
  } catch {
    return null;
  }
};
const NewsDetails = () => {
  const { id = "" } = useParams();
  const location = useLocation();
  const [newsData] = useState(
    () =>
      location.state?.news ||
      readSessionArticle(id) ||
      getBookmarks().find((item) => String(getArticleKey(item)) === id) ||
      null,
  );
  const [bookmarked, setBookmarked] = useState(() => isBookmarked(newsData));
  if (!newsData) {
    return (
      <main className="grid min-h-[58vh] place-items-center px-6 py-16">
        <div className="max-w-lg text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            This article is unavailable
          </h1>
          <p className="mt-4 text-gray-600">
            Open a story from NewsHub to see its details. Some stories may no
            longer be in your saved reading list.
          </p>
          <Link
            to="/"
            className="mt-6 inline-flex rounded-lg bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700"
          >
            Explore the latest news
          </Link>
        </div>
      </main>
    );
  }
  const articleText =
    `${newsData.description || ""} ${newsData.content || ""}`.trim();
  const readingTime = Math.max(
    1,
    Math.ceil(articleText.split(/\s+/).filter(Boolean).length / 200),
  );
  const publishedDate = newsData.publishedAt
    ? new Date(newsData.publishedAt)
    : null;
  const sourceUrl = /^https?:\/\//i.test(newsData.url || "")
    ? newsData.url
    : null;
  const shareArticle = async () => {
    try {
      if (navigator.share)
        await navigator.share({
          title: newsData.title,
          text: newsData.description,
          url: sourceUrl || window.location.href,
        });
      else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(sourceUrl || window.location.href);
        toast.success("Article link copied.");
      } else toast.info("Sharing is not available in this browser.");
    } catch (error) {
      if (error.name !== "AbortError")
        toast.error("Could not share this article.");
    }
  };
  const handleBookmark = () => {
    try {
      const saved = toggleBookmark(newsData);
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
    <main className="mx-auto max-w-4xl px-5 py-8 md:px-8 md:py-10">
      <Link
        className="inline-flex items-center gap-2 rounded-md font-semibold text-red-700 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600"
        to="/"
        aria-label="Back to news"
      >
        {" "}
        <IoMdArrowBack aria-hidden="true" /> Back to news
      </Link>
      <article className="mt-5 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-lg">
        <img
          src={
            newsData.image ||
            "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80"
          }
          alt=""
          className="h-56 w-full bg-gray-100 object-cover sm:h-80"
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src =
              "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80";
          }}
        />
        <div className="p-6 md:p-10">
          <p className="text-sm font-bold uppercase tracking-wide text-red-700">
            {newsData.source?.name || "News source"}
          </p>
          <h1 className="mt-3 text-3xl font-bold leading-tight text-gray-950 md:text-4xl">
            {newsData.title || "Untitled story"}
          </h1>
          <div className="mt-4 flex flex-wrap gap-x-2 gap-y-1 text-sm text-gray-600">
            <span>
              {newsData.author ? `By ${newsData.author}` : "Author unavailable"}
            </span>
            <span aria-hidden="true">·</span>
            <span>
              {publishedDate && !Number.isNaN(publishedDate.getTime())
                ? `Published ${publishedDate.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}`
                : "Publication date unavailable"}
            </span>
            <span aria-hidden="true">·</span>
            <span>About {readingTime} min read*</span>
          </div>
          <p className="mt-7 text-lg leading-8 text-gray-800">
            {newsData.description || "No summary is available for this story."}
          </p>
          {newsData.content && (
            <p className="mt-5 whitespace-pre-line leading-8 text-gray-700">
              {newsData.content}
            </p>
          )}
          <p className="mt-6 text-xs leading-5 text-gray-500">
            *Reading time is an estimate based on the article text supplied by
            the news API. The full story is on the publisher’s website.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 border-t border-gray-200 pt-5">
            {sourceUrl ? (
              <a
                href={sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center rounded-lg bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700"
              >
                Read full story at {newsData.source?.name || "publisher"}
              </a>
            ) : (
              <p className="text-sm text-gray-600">
                Original publisher link is unavailable.
              </p>
            )}
            <button
              type="button"
              aria-pressed={bookmarked}
              onClick={handleBookmark}
              className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-gray-900 px-4 py-3 font-semibold text-white hover:bg-gray-700"
            >
              <FaBookmark aria-hidden="true" />
              {bookmarked ? "Remove bookmark" : "Save article"}
            </button>
            <button
              type="button"
              onClick={shareArticle}
              className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-gray-900 px-4 py-3 font-semibold text-white hover:bg-gray-700"
            >
              <FaShareAlt aria-hidden="true" />
              Share
            </button>
          </div>
        </div>
      </article>
    </main>
  );
};
export default NewsDetails;
