# NewsHub

NewsHub is a React + Vite news reader. Browse current articles, search by topic, filter by category/country/language, open publisher links, and keep a browser-local reading list.

## Run locally

1. Install Node.js and npm.
2. Copy `.env.example` to `.env`.
3. Add a GNews API key to `VITE_API_KEY` in `.env`.
4. Install dependencies and start Vite:

   ```sh
   npm install
   npm run dev
   ```

5. Open the local URL printed by Vite.

`VITE_BASE_URL` defaults to `https://gnews.io/api/v4` in `.env`. The contact form uses FormSubmit and sends valid messages to `sagarsupport1@gmail.com`; that address must complete FormSubmit's one-time confirmation email before delivery is activated.

## Environment variables

| Variable        | Purpose                                                     |
| --------------- | ----------------------------------------------------------- |
| `VITE_API_KEY`  | GNews API key used to request headlines and search results. |
| `VITE_BASE_URL` | GNews API base URL, normally `https://gnews.io/api/v4`.     |

Vite embeds variables prefixed with `VITE_` in browser code. The API key is therefore visible to visitors in the deployed site. GNews documents localhost-only browser requests on its Free plan; for a public production deployment, use a plan that supports your domain or proxy requests through a server that keeps the key private. Restrict quotas where possible.

## App behavior

- Articles are requested when the feed loads, when country/language/category filters change, and when you search or load another page. There is no automatic background refresh. Identical requests share one in-flight request and successful responses are cached for 45 seconds. Requests are spaced to stay under the GNews Free plan rate of one request per second; a `429` response gets two backoff retries.
- Bookmarks are stored in the browser's `localStorage`; they are not synced between devices.
- Contact form details are submitted through FormSubmit. Review its privacy policy before sending sensitive information.
