import { initMember } from "./system/tasks/initMember.ts";
import { deleteMember } from "./system/tasks/deleteMember.ts";
import { initCartridge } from "./system/tasks/initCartridge.ts";
import { deleteCartridge } from "./system/tasks/deleteCartridge.ts";

Deno.chdir(import.meta.dirname);

const memberId = Deno.args[0];
const sshOriginalCommand = Deno.env.get("SSH_ORIGINAL_COMMAND");
if (!sshOriginalCommand) {
  console.error("No SSH_ORIGINAL_COMMAND");
  Deno.exit(1);
}
const args = sshOriginalCommand.split(" ");

if (args[0].startsWith("git-")) {
  if (
    sshOriginalCommand.split(" ")[1] !==
      `'members/${memberId}'` &&
    !sshOriginalCommand.split(" ")[1].startsWith(
      `'cartridges/${memberId}/`,
    )
  ) {
    console.error("Unauthorized repo path");
    Deno.exit(1);
  }

  const proc = new Deno.Command("git-shell", {
    args: ["-c", sshOriginalCommand],
    stdin: "inherit",
    stdout: "inherit",
    stderr: "inherit",
  });
  const { code } = await proc.spawn().status;
  Deno.exit(code);
} else if (args[0] === "8ppoiShell") {
  switch (args[1]) {
    case "initMember": {
      await initMember(memberId);
      break;
    }
    case "deleteMember": {
      await deleteMember(memberId);
      break;
    }
    case "initCartridge": {
      await initCartridge(memberId, args[2]);
      break;
    }
    case "deleteCartridge": {
      await deleteCartridge(memberId, args[2]);
      break;
    }
    default: {
      console.error("Unknown command");
      Deno.exit(1);
    }
  }
  Deno.exit(0);
} else {
  console.log(`Rejected: ${sshOriginalCommand}`);
  console.log({ memberId, sshOriginalCommand, args });
  Deno.exit(1);
}
