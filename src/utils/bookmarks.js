const BOOKMARKS_KEY = "newshub-bookmarks";
export const getArticleKey = (article) =>
  article?.url || article?.id || article?.title;

export const getBookmarks = () => {
  try {
    const stored = JSON.parse(localStorage.getItem(BOOKMARKS_KEY) || "[]");
    return Array.isArray(stored)
      ? stored.filter((item) => item && typeof item === "object")
      : [];
  } catch {
    return [];
  }
};

export const saveBookmarks = (articles) => {
  try {
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(articles));
    return true;
  } catch {
    return false;
  }
};

export const isBookmarked = (article) => {
  const key = getArticleKey(article);
  return (
    Boolean(key) && getBookmarks().some((saved) => getArticleKey(saved) === key)
  );
};

export const toggleBookmark = (article) => {
  const saved = getBookmarks();
  const key = getArticleKey(article);
  if (!key) return false;
  const alreadySaved = saved.some((item) => getArticleKey(item) === key);
  const next = alreadySaved
    ? saved.filter((item) => getArticleKey(item) !== key)
    : [article, ...saved];
  if (!saveBookmarks(next)) throw new Error("Browser storage is unavailable");
  return !alreadySaved;
};
