import express from "express";

export function createApp() {
  const app = express();
  app.get("/", (_req, res) => {
    res.json({ ok: true, message: "Hello from CI/CD 👋" });
  });
  return app;
}

export function createServer(port = process.env.PORT || 3000) {
  const app = createApp();
  const server = app.listen(port, () => console.log(`App running on :${port}`));
  return { app, server, close: () => server.close() };
}

// if run directly start the server
if (process.argv[1] && process.argv[1].endsWith('src/app.js')) {
  createServer();
}
