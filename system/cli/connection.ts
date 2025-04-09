import config from "../../deno.json" with { type: "json" };

import mysql from "npm:mysql2@^2.3.3/promise";

export const connection = await mysql.createConnection(config.connection);
