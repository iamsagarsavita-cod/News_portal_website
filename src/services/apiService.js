import Axios from "axios";

const CACHE_TTL_MS = 45_000;
const MIN_REQUEST_INTERVAL_MS = 1_100;
const MAX_RATE_LIMIT_RETRIES = 2;
const articleCache = new Map();
const inFlightRequests = new Map();
let requestQueue = Promise.resolve();
let lastRequestStartedAt = 0;

const getParams = (endpoint, { category, country, language, page, query, sortBy }) => {
  const params = new URLSearchParams({
    endpoint,
    lang: language,
    country,
    max: "9",
    page: String(page),
  });
  if (category) params.set("category", category);
  if (query) params.set("q", query);
  if (query && sortBy) params.set("sortby", sortBy);
  return `/api/news?${params.toString()}`;
};

const enqueueRateLimited = (task) => {
  const result = requestQueue
    .catch(() => {})
    .then(async () => {
      const waitMs = Math.max(
        0,
        lastRequestStartedAt + MIN_REQUEST_INTERVAL_MS - Date.now(),
      );
      if (waitMs) await new Promise((resolve) => setTimeout(resolve, waitMs));
      lastRequestStartedAt = Date.now();
      return task();
    });
  requestQueue = result.then(
    () => undefined,
    () => undefined,
  );
  return result;
};

const fetchWithRateLimitRetry = async (url) => {
  let retries = 0;
  while (true) {
    try {
      return await enqueueRateLimited(() =>
        Axios.get(url, { timeout: 12_000 }),
      );
    } catch (error) {
      if (error.response?.status !== 429 || retries >= MAX_RATE_LIMIT_RETRIES)
        throw error;
      retries += 1;
      const retryValue = error.response.headers?.["retry-after"];
      const retrySeconds = Number(retryValue);
      const retryDateDelay = Date.parse(retryValue) - Date.now();
      const retryAfter = Number.isFinite(retrySeconds)
        ? retrySeconds * 1000
        : Math.max(0, retryDateDelay || 0);
      const backoff = Math.max(retryAfter, 1_000 * 2 ** retries);
      await new Promise((resolve) => setTimeout(resolve, backoff));
    }
  }
};
const errorMessageFor = (error) => {
  const status = error.response?.status;
  if (status === 429)
    return "GNews is rate-limiting requests. Wait a few seconds, then retry.";
  if (status === 403)
    return "GNews rejected the request or the daily quota is used up. Check the GNews account and try again later.";
  if (status === 401)
    return "The GNews API key was rejected. Check the GNEWS_API_KEY environment variable.";
  if (status === 400)
    return "GNews rejected the request. Check the API configuration and selected filters.";
  if (status === 500)
    return "The news service is not configured. Set GNEWS_API_KEY in Vercel's server environment variables.";
  return "News could not load. Check your connection and try again.";
};

const requestArticles = async (endpoint, options) => {
  const url = getParams(endpoint, options);
  const cached = articleCache.get(url);
  if (cached && Date.now() - cached.createdAt < CACHE_TTL_MS)
    return cached.articles;
  if (inFlightRequests.has(url)) return inFlightRequests.get(url);

  const request = fetchWithRateLimitRetry(url)
    .then(({ data }) => {
      const articles = Array.isArray(data?.articles) ? data.articles : [];
      articleCache.set(url, { articles, createdAt: Date.now() });
      return articles;
    })
    .catch((error) => {
      const friendlyError = new Error(errorMessageFor(error));
      friendlyError.status = error.response?.status;
      throw friendlyError;
    })
    .finally(() => inFlightRequests.delete(url));

  inFlightRequests.set(url, request);
  for (const [key, value] of articleCache) {
    if (Date.now() - value.createdAt >= CACHE_TTL_MS) articleCache.delete(key);
  }
  return request;
};

export const getTopHeadlines = ({
  country = "us",
  language = "en",
  page = 1,
} = {}) =>
  requestArticles("top-headlines", {
    category: "general",
    country,
    language,
    page,
  });

export const getCategoryNews = (
  category,
  { country = "us", language = "en", page = 1 } = {},
) => requestArticles("top-headlines", { category, country, language, page });

export const searchNews = (
  query,
  { country = "us", language = "en", page = 1, sortBy = "publishedAt" } = {},
) => requestArticles("search", { query, country, language, page, sortBy });
