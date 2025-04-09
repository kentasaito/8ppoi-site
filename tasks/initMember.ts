import { connection } from "../connection.ts";

export const initMember = async (memberId: string) => {
  if (
    !(await new Deno.Command("mkdir", {
      args: [
        "-p",
        `/home/kenta/8ppoi/8ppoiShell/remote/members/${memberId}`,
      ],
    }).spawn().status).success
  ) {
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

  await connection.query("insert into member set memberId = ?", [memberId])
    .catch((_e) => Deno.exit(1));

  connection.end();
};
