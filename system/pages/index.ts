import { getCartridges } from "../models/getCartridges.ts";
import { Context } from "hono";

export const content = async (_c: Context) => {
  const cartridges = await getCartridges();

  return `
    <h1>Cartridges</h1>
    <div>
      <ul>
        ${
    cartridges.map((cartridge) => `
          <li>
            <a href="/play/${cartridge.memberId}/${cartridge.cartridgeId}">
              ${cartridge.cartridgeName}
            </a>
            by
            <a href="/profile/${cartridge.memberId}">
              ${cartridge.memberName}
            </a>
          </li>
        `).join("")
  }
      </ul>
    </div>
  `;
};
