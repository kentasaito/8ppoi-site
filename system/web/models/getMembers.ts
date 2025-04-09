import { Member } from "../types/Member.ts";

async function getMembers(): Promise<Member[]> {
  const members: Member[] = [];

  for await (const entry of Deno.readDir("./members")) {
    if (entry.isDirectory) {
      const memberId = entry.name;
      const module = await import(
        `${Deno.cwd()}/members/${memberId}/Member.js`
      );
      const memberName = module.Member.displayName;
      members.push({
        memberId,
        memberName,
      });
    }
  }
  return members;
}

export { getMembers };
