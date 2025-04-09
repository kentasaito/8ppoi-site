import { connection } from "../connection.ts";

export const deleteMember = async (
  memberId: string,
) => {
  try {
    const cartridgesPath =
      `/home/kenta/8ppoi/8ppoiShell/remote/cartridges/${memberId}`;
    Deno.removeSync(cartridgesPath, { recursive: true });
  } catch (error) {
    console.error("Failed to delete cartridges directory:", error);
    Deno.exit(1);
  }

  await connection.query(
    "delete from `cartridges` where `memberId` = ?",
    [memberId],
  );

  try {
    const membersPath =
      `/home/kenta/8ppoi/8ppoiShell/remote/members/${memberId}`;
    Deno.removeSync(membersPath, { recursive: true });
  } catch (error) {
    console.error("Failed to delete members directory:", error);
    Deno.exit(1);
  }

  await connection.query(
    "delete from `members` where `memberId` = ?",
    [memberId],
  );

  connection.end();
};
