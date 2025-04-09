import { Hono } from "@hono/hono";
import { serveStatic } from "@hono/hono/deno";

const app = new Hono();

import { layout } from "./system/web/layouts/layout.ts";

app.get("/", (c) => c.html(layout(c)));
app.get("/play/:memberId/:cartridgeId", (c) => c.html(layout(c)));
app.get("/members", (c) => c.html(layout(c)));
app.get("/profile/:memberId", (c) => c.html(layout(c)));

app.get("/favicon.ico", (c) => c.html(""));
app.get("/*", serveStatic({ root: "./" }));

Deno.serve({
  port: 6502,
}, app.fetch);
