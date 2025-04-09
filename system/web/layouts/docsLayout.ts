import { Indentdown } from "@kentasaito/indntdown";
import { Context } from "@hono/hono";

export const docsLayout = (c: Context) =>
  `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>8ppoi</title>
  <link rel="stylesheet" href="/style.css">
  <script type="module" src="/script.js"></script>
</head>
<body>
  <header>
    <nav>
      <a href="/">8ppoi</a>
      <a href="/members">メンバー一覧</a>
      <a href="/join">メンバー登録</a>
      <a href="/docs/">ドキュメンテーション</a>
    </nav>
  </header>
  <main>
${
    Indentdown.getHtml(Deno.readTextFileSync(
      `./system/web/pages${c.req.path.replace(/\/$/, "/index")}.id`,
    ))
  }
  </main>
  <footer>
    <p>&copy; 2025 8ppoi</p>
  </footer>
</body>
</html>
`;
