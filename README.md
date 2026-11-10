# NewsHub

NewsHub is a React + Vite news reader. Browse current articles, search by topic, filter by category/country/language, open publisher links, and keep a browser-local reading list.

## Run locally

1. Install Node.js and npm.
2. Create a `.env` file in the project root and add `GNEWS_API_KEY=your_gnews_api_key`.
4. Install dependencies and start Vite:

   ```sh
   npm install
   npm run dev
   ```

5. Open the local URL printed by Vite.

The local Vite server proxies `/api/news` to GNews. In production, the Vercel function at `/api/news` proxies requests so the browser never calls GNews directly. The contact form uses FormSubmit and sends valid messages to `sagarsupport1@gmail.com`; that address must complete FormSubmit's one-time confirmation email before delivery is activated.

## Environment variables

| Variable        | Purpose                                                                 |
| --------------- | ----------------------------------------------------------------------- |
| `GNEWS_API_KEY` | GNews API key used by the local Vite proxy and Vercel serverless function. Keep this file private and never commit it. |

For Vercel, add `GNEWS_API_KEY` under the project's Environment Variables for Production, then redeploy. Keep the key out of `VITE_` variables: those are included in browser builds. The serverless function only allows the headlines and search endpoints and forwards the key in the `X-Api-Key` header.

## App behavior

- Articles are requested when the feed loads, when country/language/category filters change, and when you search or load another page. There is no automatic background refresh. Identical requests share one in-flight request and successful responses are cached for 45 seconds. Requests are spaced to stay under the GNews Free plan rate of one request per second; a `429` response gets two backoff retries.
- Bookmarks are stored in the browser's `localStorage`; they are not synced between devices.
- Contact form details are submitted through FormSubmit. Review its privacy policy before sending sensitive information.
