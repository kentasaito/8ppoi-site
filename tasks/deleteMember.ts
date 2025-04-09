import { connection } from "../connection.ts";

export const deleteMember = async (
  memberId: string,
) => {
  if (
    !(await new Deno.Command("rm", {
      args: [
        "-rf",
        `/home/kenta/8ppoi/8ppoiShell/remote/cartridges/${memberId}`,
      ],
    }).spawn().status).success
  ) {
    Deno.exit(1);
  }

  await connection.query(
    "delete from `cartridge` where `memberId` = ?",
    [memberId],
  );

  if (
    !(await new Deno.Command("rm", {
      args: [
        "-rf",
        `/home/kenta/8ppoi/8ppoiShell/remote/members/${memberId}`,
      ],
    }).spawn().status).success
  ) {
    Deno.exit(1);
  }

  await connection.query(
    "delete from `member` where `memberId` = ?",
    [memberId],
  );

  connection.end();
};
