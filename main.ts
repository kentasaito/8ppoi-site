import { Hono } from "@hono/hono";
import { serveStatic } from "@hono/hono/deno";

const app = new Hono();

import { layout } from "./system/web/layouts/layout.ts";
import { docsLayout } from "./system/web/layouts/docsLayout.ts";

app.get("/", (c) => c.html(layout(c)));
app.get("/play/:memberId/:cartridgeId", (c) => c.html(layout(c)));
app.get("/members", (c) => c.html(layout(c)));
app.get("/profile/:memberId", (c) => c.html(layout(c)));

app.get("/join", (c) => c.html(layout(c)));
app.get("/docs/*", (c) => c.html(docsLayout(c)));

app.post("/api/join", async (c) => {
  const denoPath = "/home/kenta/.deno/bin/deno";
  const shellPath = "/home/kenta/8ppoi/8ppoiShell/remote/8ppoiShell.ts";
  const options = [
    "no-port-forwarding",
    "no-X11-forwarding",
    "no-agent-forwarding",
  ];
  const obj = await c.req.json();
  Deno.writeTextFile(
    "/home/kenta/.ssh/authorized_keys",
    `command="${denoPath} run -A ${shellPath} ${obj.memberId}",${
      options.join(",")
    } ssh-rsa ${obj.publicKey} ${obj.email}\n`,
    { append: true },
  );
  return c.json({ message: "Join API" });
});

app.get("/favicon.ico", (c) => c.html(""));
app.get("/*", serveStatic({ root: "./" }));

Deno.serve({
  port: 6502,
}, app.fetch);
