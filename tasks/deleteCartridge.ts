import { connection } from "../connection.ts";

export const deleteCartridge = async (
  memberId: string,
  cartridgeId: string,
) => {
  if (
    !(await new Deno.Command("rm", {
      args: [
        "-rf",
        `/home/kenta/8ppoi/8ppoiShell/remote/cartridges/${memberId}/${cartridgeId}`,
      ],
    }).spawn().status).success
  ) {
    Deno.exit(1);
  }

  await connection.query(
    "delete from `cartridges` where `memberId` = ? and `cartridgeId` = ?",
    [memberId, cartridgeId],
  );

  connection.end();
};
