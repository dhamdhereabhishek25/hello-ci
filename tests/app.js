import test from "node:test";
import assert from "node:assert/strict";
import http from "http";

test("GET / returns JSON", async () => {
  const res = await fetch("http://localhost:3000/").catch(()=>null);
  if (!res) {
    // start a temp server for test (simple)
    const { default: app } = await import("../src/app.js");
    const server = http.createServer(app);
    await new Promise(r => server.listen(3000, r));
    const res2 = await fetch("http://localhost:3000/");
    const json = await res2.json();
    assert.equal(json.ok, true);
    server.close();
  } else {
    const json = await res.json();
    assert.equal(json.ok, true);
  }
});
