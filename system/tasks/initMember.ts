import { connection } from "../connection.ts";

export const initMember = async (memberId: string) => {
  try {
    const path = `/home/kenta/8ppoi/8ppoiShell/remote/members/${memberId}`;
    Deno.mkdirSync(path, { recursive: true });
  } catch (error) {
    console.error("Failed to create directory:", error);
    Deno.exit(1);
  }

  Deno.chdir(
    `/home/kenta/8ppoi/8ppoiShell/remote/members/${memberId}`,
  );

  if (
    !(await new Deno.Command("git", { args: ["init", "."] }).spawn().status)
      .success
  ) {
    Deno.exit(1);
  }
  if (
    !(await new Deno.Command("git", {
      args: [
        "config",
        "--local",
        "receive.denyCurrentBranch",
        "updateInstead",
      ],
    }).spawn().status).success
  ) {
    Deno.exit(1);
  }

  await connection.query("insert into members set memberId = ?", [memberId])
    .catch((_e) => Deno.exit(1));

  connection.end();
};
