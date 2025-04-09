import { getMembers } from "../models/getMembers.ts";
import { Context } from "hono";

export const content = async (_c: Context) => {
  const members = await getMembers();

  return `
    <h1>Members</h1>
    <div>
      <ul>
        ${
    members.map((member) => `
          <li>
            <a href="/profile/${member.memberId}">
              ${member.memberName}
            </a>
          </li>
        `).join("")
  }
      </ul>
    </div>
  `;
};
