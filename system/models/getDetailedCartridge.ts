import { DetailedCartridge } from "../types/DetailedCartridge.ts";

async function getDetailedCartridge(
  memberId: string,
  cartridgeId: string,
): Promise<DetailedCartridge> {
  const memberModule = await import(`${Deno.cwd()}/members/${memberId}/Member.js`);
  const memberName = memberModule.Member.displayName;
  const cartridgeModule = await import(
    `${Deno.cwd()}/cartridges/${memberId}/${cartridgeId}/Cartridge.js`
  );
  const cartridgeName = cartridgeModule.Cartridge.displayName;
  const controls = cartridgeModule.Cartridge.controls;
  const detailedCartridge = {
    memberId,
    memberName,
    cartridgeId,
    cartridgeName,
    controls,
  };
  return detailedCartridge;
}

export { getDetailedCartridge };
