import { Context } from "hono";

export const layout = async (c: Context) =>
  `<!DOCTYPE html>
${await import(
    `../pages/${c.req.path.replace(/\/$/, "/index").split("/")[1]}.ts`
  )
    .then((module) => module.content(c))}
`;
