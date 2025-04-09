import { connection } from "../connection.ts";

export const initCartridge = async (memberId: string, cartridgeId: string) => {
  if (
    !(await new Deno.Command("mkdir", {
      args: [
        "-p",
        `/home/kenta/8ppoi/8ppoiShell/remote/cartridges/${memberId}/${cartridgeId}`,
      ],
    }).spawn().status).success
  ) {
    Deno.exit(1);
  }
  Deno.chdir(
    `/home/kenta/8ppoi/8ppoiShell/remote/cartridges/${memberId}/${cartridgeId}`,
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

  await connection.query(
    "insert into `cartridges` set `memberId` = ?, `cartridgeId` = ?",
    [memberId, cartridgeId],
  );

  connection.end();
};
