import { Cartridge } from "./Cartridge.ts";

export type DetailedMember = {
  memberId: string;
  memberName: string;
  profile: string;
  memberCartridges: Cartridge[];
};
