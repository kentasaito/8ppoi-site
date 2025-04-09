import { getDetailedCartridge } from "../models/getDetailedCartridge.ts";
import { Context } from "@hono/hono";

export const content = async (c: Context) => {
  const detailedCartridge = await getDetailedCartridge(
    c.req.param("memberId"),
    c.req.param("cartridgeId"),
  );

  return `
    <img width="192" height="192" style="border: 1px solid hsl(0, 0%, 40%); border-radius: 5%;" src="/cartridges/${detailedCartridge.memberId}/${detailedCartridge.cartridgeId}/artwork.png">
    <h1>${detailedCartridge.cartridgeName}</h1>
    <div>
      <p>Posted by: <a href="/profile/${detailedCartridge.memberId}">${detailedCartridge.memberName}</a></p>
      <h2>Controls</h2>
      <div>
        <pre>${detailedCartridge.controls}</pre>
      </div>
    </div>
  `;
};
