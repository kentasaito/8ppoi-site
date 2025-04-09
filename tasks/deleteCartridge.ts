import { connection } from "../connection.ts";

export const deleteCartridge = async (
  memberId: string,
  cartridgeId: string,
) => {
  try {
    const path =
      `/home/kenta/8ppoi/8ppoiShell/remote/cartridges/${memberId}/${cartridgeId}`;
    Deno.removeSync(path, { recursive: true });
  } catch (error) {
    console.error("Failed to delete cartridge:", error);
    Deno.exit(1);
  }

  await connection.query(
    "delete from `cartridges` where `memberId` = ? and `cartridgeId` = ?",
    [memberId, cartridgeId],
  );

  connection.end();
};
