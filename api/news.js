const allowedEndpoints = new Set(["top-headlines", "search"]);
const allowedCategories = new Set([
  "general",
  "world",
  "nation",
  "business",
  "technology",
  "entertainment",
  "sports",
  "science",
  "health",
]);

const getStringParam = (value) =>
  typeof value === "string" ? value.trim() : "";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.GNEWS_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "GNEWS_API_KEY is not configured" });
  }

  const endpoint = getStringParam(req.query.endpoint);
  if (!allowedEndpoints.has(endpoint)) {
    return res.status(400).json({ error: "Invalid news endpoint" });
  }

  const params = new URLSearchParams();
  const language = getStringParam(req.query.lang);
  const country = getStringParam(req.query.country);
  const category = getStringParam(req.query.category);
  const query = getStringParam(req.query.q);
  const sortBy = getStringParam(req.query.sortby);
  const page = Number.parseInt(getStringParam(req.query.page) || "1", 10);
  const max = Number.parseInt(getStringParam(req.query.max) || "9", 10);

  if (language && /^[a-z]{2}$/i.test(language)) params.set("lang", language);
  if (country && /^[a-z]{2}$/i.test(country)) params.set("country", country);
  if (category && allowedCategories.has(category)) {
    params.set("category", category);
  }
  if (query) params.set("q", query.slice(0, 200));
  if (endpoint === "search" && !query) {
    return res.status(400).json({ error: "A search query is required" });
  }
  if (sortBy && ["publishedAt", "relevance"].includes(sortBy)) {
    params.set("sortby", sortBy);
  }
  params.set("page", String(Number.isFinite(page) ? Math.max(1, page) : 1));
  params.set("max", String(Number.isFinite(max) ? Math.min(9, Math.max(1, max)) : 9));

  try {
    const upstreamResponse = await fetch(
      `https://gnews.io/api/v4/${endpoint}?${params.toString()}`,
      { headers: { "X-Api-Key": apiKey } },
    );
    const data = await upstreamResponse.json();

    res.setHeader(
      "Cache-Control",
      upstreamResponse.ok
        ? "public, s-maxage=45, stale-while-revalidate=60"
        : "no-store",
    );
    return res.status(upstreamResponse.status).json(data);
  } catch (error) {
    console.error("GNews request failed:", error);
    return res.status(502).json({ error: "News provider is unavailable" });
  }
}
