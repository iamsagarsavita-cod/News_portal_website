const BOOKMARKS_KEY = "newshub-bookmarks";

export const getArticleKey = (article) => article?.url || article?.id || article?.title;

export const getBookmarks = () => {
  try {
    return JSON.parse(localStorage.getItem(BOOKMARKS_KEY) || "[]");
  } catch {
    return [];
  }
};

export const saveBookmarks = (articles) => {
  localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(articles));
};

export const isBookmarked = (article) =>
  getBookmarks().some((saved) => getArticleKey(saved) === getArticleKey(article));

export const toggleBookmark = (article) => {
  const saved = getBookmarks();
  const key = getArticleKey(article);
  const alreadySaved = saved.some((item) => getArticleKey(item) === key);
  const next = alreadySaved
    ? saved.filter((item) => getArticleKey(item) !== key)
    : [article, ...saved];

  saveBookmarks(next);
  return !alreadySaved;
};
