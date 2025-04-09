import { DetailedMember } from "../types/DetailedMember.ts";
import { getMemberCartridges } from "./getCartridges.ts";

async function getDetailedMember(
  memberId: string,
): Promise<DetailedMember> {
  const memberModule = await import(`${Deno.cwd()}/members/${memberId}/Member.js`);
  const memberName = memberModule.Member.displayName;
  const profile = memberModule.Member.profile;
  const memberCartridges = await getMemberCartridges(memberId, memberName);
  const detailedMember = {
    memberId,
    memberName,
    profile,
    memberCartridges,
  };
  return detailedMember;
}

export { getDetailedMember };
