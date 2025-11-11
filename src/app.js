import express from "express";
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (_req, res) => {
  res.json({ ok: true, message: "Hello from CI/CD 👋" });
});

app.listen(port, () => console.log(`App running on :${port}`));
export default app; // for tests (node --test can import)
