import { getDetailedMember } from "../models/getDetailedMember.ts";
import { Context } from "@hono/hono";

export const content = async (c: Context) => {
  const detailedMember = await getDetailedMember(
    c.req.param("memberId"),
  );

  return `
    <img width="192" height="192" style="border: 1px solid hsl(0, 0%, 40%); border-radius: 50%;" src="/members/${detailedMember.memberId}/avatar.png">
    <h1>${detailedMember.memberName}</h1>
    <div>
      <h2>Profile</h2>
      <div>
        <pre>${detailedMember.profile}</pre>
      </div>
      <h2>Cartridges</h2>
      <div>
        <ul>
          ${
    detailedMember.memberCartridges.map((cartridge) => `
            <li>
              <a href="/play/${cartridge.memberId}/${cartridge.cartridgeId}">
                ${cartridge.cartridgeName}
              </a>
            </li>
          `).join("")
  }
        </ul>
      </div>
    </div>
  `;
};
