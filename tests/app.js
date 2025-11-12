// src/app.js
import express from 'express';

export function createApp() {
  const app = express();
  app.get('/', (_req, res) => {
    res.json({ ok: true, message: 'Hello from CI/CD 👋' });
  });
  return app;
}

// only start server when run directly
if (process.argv[1] && process.argv[1].endsWith('src/app.js')) {
  const app = createApp();
  const port = process.env.PORT || 3000;
  const server = app.listen(port, () => console.log(`App running on :${port}`));
  process.on('SIGINT', () => server.close());
}
