import { Cartridge } from "../types/Cartridge.ts";

async function getMemberCartridges(
  memberId: string,
  memberName: string,
): Promise<Cartridge[]> {
  const cartridges: Cartridge[] = [];

  for await (const entry of Deno.readDir(`./cartridges/${memberId}`)) {
    if (entry.isDirectory) {
      const cartridgeId = entry.name;
      const module = await import(
        `${Deno.cwd()}/cartridges/${memberId}/${cartridgeId}/Cartridge.js`
      );
      const cartridgeName = module.Cartridge.displayName;
      cartridges.push({
        memberId,
        memberName,
        cartridgeId,
        cartridgeName,
      });
    }
  }
  return cartridges;
}

async function getCartridges(): Promise<Cartridge[]> {
  const cartridges: Cartridge[] = [];

  for await (const entry of Deno.readDir("./cartridges")) {
    if (entry.isDirectory) {
      const memberId = entry.name;
      const module = await import(
        `${Deno.cwd()}/members/${memberId}/Member.js`
      );
      const memberName = module.Member.displayName;
      cartridges.push(...await getMemberCartridges(memberId, memberName));
    }
  }
  return cartridges;
}

export { getCartridges, getMemberCartridges };
