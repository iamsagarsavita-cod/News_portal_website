import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const apiKey = env.GNEWS_API_KEY;

  return {
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        "/api/news": {
          target: "https://gnews.io",
          changeOrigin: true,
          rewrite: (requestPath) => {
            const requestUrl = new URL(requestPath, "http://localhost");
            const endpoint = requestUrl.searchParams.get("endpoint");
            requestUrl.searchParams.delete("endpoint");
            requestUrl.searchParams.delete("apikey");
            if (!["top-headlines", "search"].includes(endpoint)) {
              return "/api/v4/invalid-endpoint";
            }
            return `/api/v4/${endpoint}?${requestUrl.searchParams.toString()}`;
          },
          configure: (proxy) => {
            proxy.on("proxyReq", (proxyRequest) => {
              if (apiKey) proxyRequest.setHeader("X-Api-Key", apiKey);
            });
          },
        },
      },
    },
  };
});
