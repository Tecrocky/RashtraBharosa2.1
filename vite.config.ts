import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function resendDevProxyPlugin(): Plugin {
  return {
    name: "resend-dev-proxy",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url === "/api/resend/emails" && req.method === "POST") {
          let body = "";
          req.on("data", (chunk) => {
            body += chunk;
          });
          req.on("end", async () => {
            try {
              const parsed = JSON.parse(body);
              const apiKey = process.env.VITE_RESEND_API_KEY || "";
              const response = await fetch("https://api.resend.com/emails", {
                method: "POST",
                headers: {
                  "Authorization": `Bearer ${apiKey}`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(parsed),
              });
              const data = await response.json();
              res.setHeader("Content-Type", "application/json");
              res.statusCode = response.status;
              res.end(JSON.stringify(data));
            } catch (err: any) {
              res.statusCode = 500;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ error: err?.message || "Server Error" }));
            }
          });
          return;
        }
        next();
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), resendDevProxyPlugin()],
  assetsInclude: ["**/*.glb", "**/*.gltf", "**/*.mp4"],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

