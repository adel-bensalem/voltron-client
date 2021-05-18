import { NodeSSH } from "node-ssh";
import { Hooks } from "../../core/adapters/hooks";
import { getPostUpdateScript } from "./getPostUpdateScript";

const createHooks = (connection: NodeSSH): Hooks => ({
  enablePostUpdateHook: (application) =>
    connection
      .execCommand(
        `echo "${getPostUpdateScript(application)}" > ~/${
          application.name
        }.git/hooks/post-update`
      )
      .then(() =>
        connection.execCommand(
          `chmod +x ~/${application.name}.git/hooks/post-update`
        )
      )
      .then(),
});

export { createHooks };
