import mysql from "npm:mysql2@^2.3.3/promise";

export const connection = await mysql.createConnection({
  host: "localhost",
  user: "test",
  password: "test",
  database: "8ppoi",
});
