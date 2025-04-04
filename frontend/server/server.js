import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

const FRONTEND_PORT = 8080;
const BACKEND_URL = "http://127.0.0.1:23456/api";

const apiProxy = createProxyMiddleware({
  target: BACKEND_URL,
  changeOrigin: true,
  logLevel: "debug",
});

app.use("/api", apiProxy);
app.use(express.static(path.join(__dirname, "../dist")));
app.get(/(.*)/, (req, res) => {
  res.sendFile(path.join(__dirname, "../dist", "index.html"));
});

app.listen(FRONTEND_PORT, async () => {
  console.log(`Фронтенд запущен: http://localhost:${FRONTEND_PORT}`);
});
